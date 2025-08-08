import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Plus, 
  CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  Save, 
  X,
  UserCheck,
  AlertCircle,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Bot,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useScheduleValidation } from '@/hooks/useScheduleValidation';
import { ValidationResults } from './ValidationResults';
import { ScheduleSuggestion, ScheduleSuggestionSkeleton } from './ScheduleSuggestion';
import { useScheduleSuggestion } from '@/hooks/useScheduleSuggestion';
import { scheduleService, type Shift, type EmployeeForValidation, type ScheduleSuggestionRequest, type ScheduleSuggestionResponse } from '@/services/api';
import { ScheduleCalendar } from './ScheduleCalendar';

interface Employee {
  id: string;
  name: string;
  department: string;
  skills: string[];
  workload?: number; // Adicionando workload opcional
}

interface ScheduleForm {
  date: Date | undefined;
  shift: string;
  employees: Employee[];
  notes: string;
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'João Silva', department: 'Vendas', skills: ['Atendimento', 'Caixa'] },
  { id: '2', name: 'Maria Santos', department: 'Vendas', skills: ['Supervisão', 'Caixa'] },
  { id: '3', name: 'Pedro Costa', department: 'Estoque', skills: ['Reposição', 'Conferência'] },
  { id: '4', name: 'Ana Lima', department: 'Vendas', skills: ['Atendimento'] },
  { id: '5', name: 'Carlos Oliveira', department: 'Segurança', skills: ['Vigilância'] }
];

export function ScheduleEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState<ScheduleSuggestionResponse | null>(null);
  const [isSuggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [form, setForm] = useState<ScheduleForm>({
    date: undefined,
    shift: '',
    employees: [],
    notes: ''
  });

  // Mutation para chamar a IA
  const suggestionMutation = useMutation({
    mutationFn: (context: ScheduleSuggestionRequest) => scheduleService.suggestSchedule(context),
    onSuccess: (data) => {
      if (data.data) {
        setSuggestion(data.data);
        setSuggestionModalOpen(true);
        toast({
          title: "✨ Sugestão Gerada!",
          description: "A IA criou uma sugestão otimizada para sua escala.",
        });
      }
    },
    onError: (error) => {
      console.error("Erro na sugestão:", error);
      toast({
        title: "Erro na sugestão",
        description: "Ocorreu um erro ao gerar a sugestão. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const { 
    isValidating, 
    validationResult, 
    validateSchedule, 
    clearValidation 
  } = useScheduleValidation({
    onValidationComplete: (result) => {
      setShowValidation(true);
    },
    onError: (error) => {
      toast({
        title: "Erro na validação",
        description: error,
        variant: "destructive",
      });
    }
  });

  // Convert form data to validation format
  const shifts = useMemo(() => {
    if (!form.date || !form.shift || form.employees.length === 0) return [];
    
    return form.employees.map((employee, index) => ({
      id: `shift-${index + 1}`,
      employeeId: employee.id,
      startTime: format(form.date!, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      endTime: format(form.date!, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    }));
  }, [form.date, form.shift, form.employees]);

  const employees = useMemo(() => {
    return form.employees.map(employee => ({
      id: employee.id,
      workload: 44, // Default workload - should come from employee data
    }));
  }, [form.employees]);

  // Real-time validation query
  const { data: realTimeValidation, isLoading: isRealTimeValidating } = useQuery({
    queryKey: ['scheduleValidation', shifts, employees],
    queryFn: () => scheduleService.validateSchedule({ shifts, employees }),
    enabled: shifts.length > 0 && employees.length > 0,
    staleTime: 30000, // 30 seconds
    gcTime: 60000, // 1 minute (cacheTime was renamed to gcTime in v4)
  });

  const handleEmployeeToggle = (employee: Employee) => {
    const isSelected = form.employees.some(emp => emp.id === employee.id);
    if (isSelected) {
      setForm(prev => ({
        ...prev,
        employees: prev.employees.filter(emp => emp.id !== employee.id)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        employees: [...prev.employees, employee]
      }));
    }
  };

  const handleGenerateWithAI = async () => {
    if (!form.date || !form.shift) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione uma data e turno antes de gerar sugestões.",
        variant: "destructive",
      });
      return;
    }

    // Preparar dados para a sugestão
    const suggestionData: ScheduleSuggestionRequest = {
      employees: mockEmployees.map(emp => ({
        id: emp.id,
        name: emp.name,
        workload: 44, // Default workload - should come from employee data
        constraints: emp.skills.length > 0 ? emp.skills : undefined
      })),
      shiftsToFill: [
        {
          id: `shift-${form.date?.toISOString()}-${form.shift}`,
          startTime: form.date ? format(form.date, "yyyy-MM-dd'T'HH:mm:ss'Z'") : new Date().toISOString(),
          endTime: form.date ? format(form.date, "yyyy-MM-dd'T'HH:mm:ss'Z'") : new Date().toISOString(),
          requiredSkill: form.shift === 'manhã' ? 'Atendimento' : form.shift === 'tarde' ? 'Caixa' : 'Qualquer'
        }
      ],
      rules: [
        "Mínimo 1, máximo 3 funcionários por turno",
        "Intervalo mínimo de 11 horas entre turnos",
        "Respeitar carga horária semanal de cada funcionário",
        "Distribuir turnos de forma equitativa",
        "Considerar habilidades e restrições dos funcionários"
      ]
    };

    await suggestionMutation.mutate(suggestionData);
  };

  const handleValidateSchedule = async () => {
    if (!form.date || !form.shift || form.employees.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha data, turno e selecione pelo menos um funcionário.",
        variant: "destructive",
      });
      return;
    }

    // Convert form data to validation format
    const shifts: Shift[] = form.employees.map((employee, index) => ({
      id: `shift-${index + 1}`,
      employeeId: employee.id,
      startTime: form.date ? format(form.date, "yyyy-MM-dd'T'HH:mm:ss'Z'") : new Date().toISOString(),
      endTime: form.date ? format(form.date, "yyyy-MM-dd'T'HH:mm:ss'Z'") : new Date().toISOString(),
    }));

    const employees: EmployeeForValidation[] = form.employees.map(employee => ({
      id: employee.id,
      workload: 44, // Default workload - should come from employee data
    }));

    await validateSchedule(shifts, employees);
  };

  const handleSave = () => {
    if (!form.date || !form.shift || form.employees.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha data, turno e selecione pelo menos um funcionário.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Escala salva com sucesso! ✅",
      description: `Escala criada para ${format(form.date, 'dd/MM/yyyy', { locale: ptBR })}`,
    });
    
    setIsOpen(false);
    setForm({
      date: undefined,
      shift: '',
      employees: [],
      notes: ''
    });
  };

  const resetForm = () => {
    setForm({
      date: undefined,
      shift: '',
      employees: [],
      notes: ''
    });
  };

  const handleApplySuggestion = (suggestion: ScheduleSuggestionResponse) => {
    if (!suggestion || !suggestion.suggestion) return;

    // Converter sugestões para funcionários
    const suggestedEmployees = suggestion.suggestion.map((item) => {
      const employee = mockEmployees.find(emp => emp.id === item.employeeId);
      return employee;
    }).filter(Boolean) as Employee[];

    setForm(prev => ({
      ...prev,
      employees: suggestedEmployees,
      notes: 'Escala aplicada com base na sugestão da IA.'
    }));

    setShowSuggestion(false);
    setSuggestion(null);
    setSuggestionModalOpen(false);

    toast({
      title: "✅ Sugestão Aplicada!",
      description: `${suggestedEmployees.length} funcionários foram alocados automaticamente.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Nova Escala
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Editor de Escalas</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date and Shift Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(form.date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => setForm(prev => ({ ...prev, date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shift">Turno *</Label>
              <Select value={form.shift} onValueChange={(value) => setForm(prev => ({ ...prev, shift: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">
                    <div className="flex items-center space-x-2">
                      <span>☀️</span>
                      <span>Manhã (6h - 14h)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="afternoon">
                    <div className="flex items-center space-x-2">
                      <span>🌤️</span>
                      <span>Tarde (14h - 22h)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="night">
                    <div className="flex items-center space-x-2">
                      <span>🌙</span>
                      <span>Noite (22h - 6h)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* AI Generation Button */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Sugestão de Escala com IA</p>
                    <p className="text-sm text-muted-foreground">
                      Deixe a IA sugerir as melhores alocações
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleGenerateWithAI}
                  disabled={!form.date || !form.shift || suggestionMutation.isPending}
                  className="bg-gradient-primary"
                >
                  {suggestionMutation.isPending ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Gerando sugestão...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Sugerir com IA
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Employee Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Funcionários *</Label>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <UserCheck className="h-4 w-4" />
                <span>{form.employees.length} selecionados</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto border rounded-lg p-3">
              {mockEmployees.map((employee) => {
                const isSelected = form.employees.some(emp => emp.id === employee.id);
                return (
                  <div
                    key={employee.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleEmployeeToggle(employee)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center",
                        isSelected ? "border-primary bg-primary" : "border-border"
                      )}>
                        {isSelected && <UserCheck className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre esta escala..."
              value={form.notes}
              onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Validation Alert */}
          {form.employees.length < 2 && form.employees.length > 0 && (
            <div className="flex items-center space-x-2 p-3 bg-accent/10 border border-accent rounded-lg">
              <AlertCircle className="h-4 w-4 text-accent" />
              <p className="text-sm text-accent-foreground">
                Recomendamos pelo menos 2 funcionários por turno para garantir cobertura adequada.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={resetForm}>
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            <Button 
              variant="outline" 
              onClick={handleValidateSchedule}
              disabled={isValidating || !form.date || !form.shift || form.employees.length === 0}
            >
              {isValidating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                  Validando...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Validar CLT
                </>
              )}
            </Button>
            <Button onClick={handleSave} className="shadow-soft">
              <Save className="h-4 w-4 mr-2" />
              Salvar Escala
            </Button>
          </div>

          {/* Validation Results */}
          {showValidation && validationResult && (
            <div className="mt-6 border-t pt-6">
              <ValidationResults
                result={validationResult}
                onClose={() => {
                  setShowValidation(false);
                  clearValidation();
                }}
                onFixViolations={() => {
                  setShowValidation(false);
                  clearValidation();
                  // TODO: Implement violation fixing logic
                }}
              />
            </div>
          )}

          {/* Sugestão de Escala */}
          {suggestion && (
            <div className="mt-6 border-t pt-6">
              <ScheduleSuggestion
                suggestion={suggestion}
                employees={mockEmployees.map(emp => ({
                  id: emp.id,
                  name: emp.name,
                  workload: emp.workload || 44
                }))}
                shifts={[
                  {
                    id: `shift-${form.date?.toISOString()}-${form.shift}`,
                    startTime: form.date ? format(form.date, "yyyy-MM-dd'T'HH:mm:ss'Z'") : new Date().toISOString(),
                    endTime: form.date ? format(form.date, "yyyy-MM-dd'T'HH:mm:ss'Z'") : new Date().toISOString(),
                    requiredSkill: form.shift === 'manhã' ? 'Atendimento' : form.shift === 'tarde' ? 'Caixa' : 'Qualquer'
                  }
                ]}
                onApplySuggestion={handleApplySuggestion}
                onClearSuggestion={() => {
                  setSuggestion(null);
                  setSuggestionModalOpen(false);
                }}
              />
            </div>
          )}

          {/* Novo Painel de Análise de Risco em Tempo Real */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Análise de Risco em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isRealTimeValidating && (
                <div>
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              )}
              {!isRealTimeValidating && !realTimeValidation && (
                <p className="text-sm text-muted-foreground">Faça alterações na escala para iniciar a análise.</p>
              )}
              {realTimeValidation?.data && (
                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium">Score de Risco: {realTimeValidation.data.riskScore}</label>
                    <Progress 
                      value={realTimeValidation.data.riskScore} 
                      className={
                        realTimeValidation.data.riskScore > 75 ? '[&>div]:bg-red-500' :
                        realTimeValidation.data.riskScore > 40 ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-green-500'
                      }
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Pontos de Atenção:</h4>
                    {realTimeValidation.data.violations.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Nenhuma violação encontrada.</p>
                    ) : (
                      <ul className="space-y-2">
                        {realTimeValidation.data.violations.map((v, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className={v.severity === 'critical' ? 'text-red-500 h-4 w-4 mt-0.5' : 'text-yellow-500 h-4 w-4 mt-0.5'} />
                            <span>
                              {v.message} (Funcionário: { (form.employees.find(e => e.id === v.employeeId) || {}).name || v.employeeId })
                              <Badge variant={v.severity === 'critical' ? 'destructive' : 'secondary'} className="ml-2">{v.severity}</Badge>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>

      {/* Modal de Sugestão de IA */}
      <Dialog open={isSuggestionModalOpen} onOpenChange={setSuggestionModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              Sugestão de Escala da IA
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {suggestionMutation.isPending && (
              <div className="flex flex-col items-center justify-center gap-4 h-40">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Aguarde, nossa IA está montando a escala perfeita...</p>
              </div>
            )}
            {suggestion && !suggestionMutation.isPending && (
              <div>
                <p className="mb-4">Analisamos as regras e perfis e criamos esta sugestão para você. Visualize no calendário e aplique para adicioná-la ao editor.</p>
                
                {/* Calendário com pré-visualização */}
                <div className="mb-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Pré-visualização da Sugestão
                  </h4>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <ScheduleCalendar
                      previewShifts={suggestion.suggestion}
                      employees={mockEmployees}
                      onPreviewClick={(event) => {
                        console.log('Sugestão clicada:', event);
                        // Aqui você pode adicionar lógica adicional se necessário
                      }}
                    />
                  </div>
                </div>

                {/* Estatísticas da sugestão */}
                <div className="rounded-md border p-4 bg-muted/20">
                  <h4 className="font-medium mb-2">Resumo da Sugestão:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Funcionários alocados:</span>
                      <span className="ml-2 font-medium">{suggestion.suggestion.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Turno:</span>
                      <span className="ml-2 font-medium">{form.shift}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Data:</span>
                      <span className="ml-2 font-medium">
                        {form.date ? form.date.toLocaleDateString('pt-BR') : 'Não definida'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="ml-2">Sugestão IA</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSuggestionModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              disabled={!suggestion} 
              onClick={() => {
                if (suggestion) {
                  handleApplySuggestion(suggestion);
                }
              }}
            >
              Aplicar Sugestão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}