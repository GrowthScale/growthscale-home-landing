import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Employee {
  id: string;
  name: string;
  department: string;
  skills: string[];
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
  const [form, setForm] = useState<ScheduleForm>({
    date: undefined,
    shift: '',
    employees: [],
    notes: ''
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
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Auto-select optimal employees based on shift and skills
    const optimalEmployees = mockEmployees.slice(0, 3);
    setForm(prev => ({
      ...prev,
      employees: optimalEmployees,
      notes: 'Escala otimizada pela IA considerando habilidades e disponibilidade dos funcionários.'
    }));
    
    setIsGenerating(false);
    toast({
      title: "Escala Otimizada com Sucesso! ✨",
      description: "A IA selecionou os funcionários ideais para este turno.",
    });
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
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Otimização com IA</p>
                    <p className="text-sm text-muted-foreground">
                      Deixe a IA selecionar os funcionários ideais
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleGenerateWithAI}
                  disabled={!form.date || !form.shift || isGenerating}
                  className="bg-gradient-primary"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Gerar com IA
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
            <Button onClick={handleSave} className="shadow-soft">
              <Save className="h-4 w-4 mr-2" />
              Salvar Escala
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}