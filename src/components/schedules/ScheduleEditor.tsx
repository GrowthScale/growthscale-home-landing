// src/components/schedules/ScheduleEditor.tsx
import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createScheduleWithShifts, type ScheduleData, type ShiftData, validateSchedule, calculateScheduleCost } from '@/services/api';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getEmployees, type EmployeeData } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar, 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Loader2,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  Brain
} from 'lucide-react';

// Defina os tipos aqui se ainda não estiverem num arquivo global
interface EditorShiftData {
  id?: string;
  schedule_id?: string;
  date: string;
  startTime: string;
  endTime: string;
  employeeId: string;
  employeeName?: string;
  employeePosition?: string;
}

interface ScheduleFormData {
  name: string;
  start_date: string;
  end_date: string;
  status: 'draft' | 'published' | 'archived';
}

// Tipos para os resultados da IA
interface ValidationResult {
  isValid: boolean;
  riskScore?: number;
  violations?: Array<{
    employee_id: string;
    date: string;
    message: string;
  }>;
  recommendations?: Array<{
    message: string;
  }>;
}

interface CostResult {
  totalCost: number;
  totalHours: number;
  employeeCount: number;
  averageHourlyRate: number;
  costBreakdown?: Record<string, number>;
  recommendations?: Array<{
    message: string;
  }>;
}

export function ScheduleEditor() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentTenant: tenant } = useTenant();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  // Estados com a tipagem correta
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleName, setScheduleName] = useState('Escala Semanal');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [shifts, setShifts] = useState<EditorShiftData[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [shiftStartTime, setShiftStartTime] = useState('08:00');
  const [shiftEndTime, setShiftEndTime] = useState('17:00');
  const [shiftDate, setShiftDate] = useState(new Date().toISOString().split('T')[0]);

  // Buscar funcionários
  const { data: employees } = useQuery({
    queryKey: ['employees', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) throw new Error('Empresa não configurada');
      const result = await getEmployees(tenant.id);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    enabled: !!tenant?.id && isOpen,
  });

  // =====================================================
  // INTELIGÊNCIA ARTIFICIAL EM TEMPO REAL
  // =====================================================

  // =====================================================
  // INTELIGÊNCIA ARTIFICIAL EM TEMPO REAL
  // =====================================================

  // Validar escala em tempo real
  const { data: validationResult, isLoading: isValidating } = useQuery<ValidationResult | null>({
    queryKey: ['validateSchedule', shifts, employees], // A chave reage a mudanças em turnos e funcionários
    queryFn: async () => {
      if (!shifts.length || !employees?.length) return null;
      
      // Preparar dados para validação
      const shiftsForValidation = shifts.map(shift => ({
        date: shift.date,
        start_time: shift.startTime,
        end_time: shift.endTime,
        employee_id: shift.employeeId
      }));

      const employeesForValidation = employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        position: emp.position,
        hourly_rate: emp.hourly_rate || 20
      }));

      const result = await validateSchedule(shiftsForValidation, employeesForValidation);
      if (result.error) throw new Error(result.error);
      return result.data as ValidationResult;
    },
    enabled: Boolean(shifts.length > 0 && employees && employees.length > 0), // Só executa se houver dados
  });

  // Calcular custo da escala em tempo real
  const { data: costResult, isLoading: isCalculatingCost } = useQuery<CostResult | null>({
    queryKey: ['calculateScheduleCost', shifts, employees],
    queryFn: async () => {
      if (!shifts.length || !employees?.length) return null;
      
      // Preparar dados para cálculo de custo
      const shiftsForCost = shifts.map(shift => ({
        date: shift.date,
        start_time: shift.startTime,
        end_time: shift.endTime,
        employee_id: shift.employeeId
      }));

      const employeesWithRate = employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        position: emp.position,
        hourly_rate: emp.hourly_rate || 20
      }));

      const result = await calculateScheduleCost(shiftsForCost, employeesWithRate);
      if (result.error) throw new Error(result.error);
      return result.data as CostResult;
    },
    enabled: Boolean(shifts.length > 0 && employees && employees.length > 0),
  });

  const createScheduleMutation = useMutation({
    mutationFn: async (data: { 
      schedule: Omit<ScheduleData, 'id' | 'created_at' | 'updated_at'>; 
      shifts: Omit<ShiftData, 'id' | 'schedule_id' | 'created_at'>[] 
    }) => {
      if (!tenant?.id) throw new Error('Empresa não configurada');
      const result = await createScheduleWithShifts(data.schedule, data.shifts);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast({
        title: "✅ Sucesso!",
        description: "A sua nova escala foi salva e publicada.",
      });
      queryClient.invalidateQueries({ queryKey: ['schedules', tenant?.id] });
      setIsOpen(false);
      resetForm();
      navigate('/schedules');
      trackEvent('schedule_created', {
        schedule_name: scheduleName,
        shifts_count: shifts.length,
      });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Erro ao Salvar",
        description: error.message || "Não foi possível salvar a escala. Tente novamente.",
        variant: 'destructive',
      });
    }
  });

  const handleSaveSchedule = useCallback(() => {
    if (!tenant?.id || !startDate || !endDate) {
      toast({ 
        title: "Dados incompletos", 
        description: "Por favor, preencha todos os campos da escala.", 
        variant: 'destructive' 
      });
      return;
    }

    if (shifts.length === 0) {
      toast({
        title: "Nenhum turno adicionado",
        description: "Adicione pelo menos um turno à escala.",
        variant: "destructive"
      });
      return;
    }

    // Formata os dados para a estrutura exata que o backend espera
    const scheduleToSave: Omit<ScheduleData, 'id' | 'created_at' | 'updated_at'> = {
      name: scheduleName,
      start_date: startDate,
      end_date: endDate,
      company_id: tenant.id,
      status: status
    };

    // Converter shifts para o formato da API
    const shiftsPayload: Omit<ShiftData, 'id' | 'schedule_id' | 'created_at'>[] = shifts.map(shift => ({
      employee_id: shift.employeeId,
      start_time: shift.startTime,
      end_time: shift.endTime,
      date: shift.date,
      position: shift.employeePosition || '',
      hourly_rate: employees?.find(emp => emp.id === shift.employeeId)?.hourly_rate || 0
    }));

    createScheduleMutation.mutate({
      schedule: scheduleToSave,
      shifts: shiftsPayload
    });
  }, [tenant, startDate, endDate, scheduleName, status, shifts, employees, createScheduleMutation, navigate, queryClient, toast, trackEvent]);

  const handleAddShift = () => {
    if (!selectedEmployee || !shiftStartTime || !shiftEndTime || !shiftDate) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos do turno.",
        variant: "destructive"
      });
      return;
    }

    // Validar se o funcionário já tem turno nesta data
    const existingShift = shifts.find(
      shift => shift.employeeId === selectedEmployee && shift.date === shiftDate
    );

    if (existingShift) {
      toast({
        title: "Funcionário já tem turno",
        description: "Este funcionário já possui um turno nesta data.",
        variant: "destructive"
      });
      return;
    }

    const selectedEmp = employees?.find(emp => emp.id === selectedEmployee);
    const newShift: EditorShiftData = {
      date: shiftDate,
      startTime: shiftStartTime,
      endTime: shiftEndTime,
      employeeId: selectedEmployee,
      employeeName: selectedEmp?.name || 'Funcionário não encontrado',
      employeePosition: selectedEmp?.position || 'Cargo não definido'
    };

    setShifts(prev => [...prev, newShift]);
    setSelectedEmployee('');
    setShiftStartTime('08:00');
    setShiftEndTime('17:00');
  };

  const handleRemoveShift = (index: number) => {
    setShifts(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setScheduleName('Escala Semanal');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate(new Date().toISOString().split('T')[0]);
    setStatus('draft');
    setShifts([]);
    setSelectedEmployee('');
    setShiftStartTime('08:00');
    setShiftEndTime('17:00');
    setShiftDate(new Date().toISOString().split('T')[0]);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nova Escala
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Criar Nova Escala</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Formulário */}
          <div className="lg:col-span-2 space-y-6">
          {/* Informações da Escala */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Escala</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-name">Nome da Escala *</Label>
                <Input
                  id="schedule-name"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                  placeholder="Ex: Escala Semanal - Janeiro 2024"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Data de Início *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Data de Fim *</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as 'draft' | 'published' | 'archived')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicada</SelectItem>
                    <SelectItem value="archived">Arquivada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* =====================================================
               COCKPIT DE INTELIGÊNCIA ARTIFICIAL EM TEMPO REAL
               ===================================================== */}
          
          {/* Painel de Validação e Custos */}
          {(validationResult || costResult || isValidating || isCalculatingCost) && (
            <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Análise Inteligente em Tempo Real</span>
                  {(isValidating || isCalculatingCost) && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Validação CLT */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Validação CLT</span>
                      {isValidating && <Loader2 className="h-3 w-3 animate-spin" />}
                    </div>
                    
                    {validationResult ? (
                      <div className="space-y-2">
                        {validationResult.isValid ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Escala em conformidade com a CLT</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-red-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm font-medium">Problemas detectados:</span>
                            </div>
                            <ul className="text-sm text-red-600 space-y-1 ml-6">
                              {validationResult.violations?.map((violation: any, index: number) => (
                                <li key={index} className="list-disc">
                                  {violation.message}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {isValidating ? 'Analisando conformidade...' : 'Adicione turnos para validar'}
                      </div>
                    )}
                  </div>

                  {/* Análise de Custos */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Análise de Custos</span>
                      {isCalculatingCost && <Loader2 className="h-3 w-3 animate-spin" />}
                    </div>
                    
                    {costResult ? (
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-green-600">
                          R$ {costResult.totalCost?.toFixed(2) || '0.00'}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>• {costResult.totalHours || 0} horas totais</div>
                          <div>• {costResult.employeeCount || 0} funcionários</div>
                          <div>• Média: R$ {(costResult.averageHourlyRate || 0).toFixed(2)}/hora</div>
                        </div>
                        {costResult.costBreakdown && (
                          <div className="text-xs text-muted-foreground">
                            <div className="font-medium">Detalhamento por funcionário:</div>
                            {Object.entries(costResult.costBreakdown).map(([employeeId, cost]: [string, any]) => {
                              const employee = employees?.find(emp => emp.id === employeeId);
                              return (
                                <div key={employeeId} className="ml-2">
                                  • {employee?.name || 'Funcionário'}: R$ {cost.toFixed(2)}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {isCalculatingCost ? 'Calculando custos...' : 'Adicione turnos para calcular'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Recomendações de IA */}
                {(validationResult?.recommendations || costResult?.recommendations) && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Recomendações da IA</span>
                    </div>
                    <div className="text-sm text-blue-700 space-y-1">
                      {validationResult?.recommendations?.map((rec: any, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>{rec.message}</span>
                        </div>
                      ))}
                      {costResult?.recommendations?.map((rec: any, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>{rec.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Adicionar Turnos */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Turnos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-select">Funcionário *</Label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id || ''}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shift-date">Data *</Label>
                  <Input
                    id="shift-date"
                    type="date"
                    value={shiftDate}
                    onChange={(e) => setShiftDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start-time">Início *</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={shiftStartTime}
                    onChange={(e) => setShiftStartTime(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-time">Fim *</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={shiftEndTime}
                    onChange={(e) => setShiftEndTime(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button onClick={handleAddShift} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Turnos */}
          {shifts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Turnos Adicionados ({shifts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shifts.map((shift, index) => {
                    // Verificar se este turno tem problemas de validação
                    const shiftViolations = validationResult?.violations?.filter((v: any) => 
                      v.employee_id === shift.employeeId && v.date === shift.date
                    ) || [];
                    
                    const hasViolations = shiftViolations.length > 0;
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          hasViolations ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {hasViolations ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <Users className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{shift.employeeName}</p>
                            <p className="text-sm text-muted-foreground">
                              {shift.date} • {shift.startTime} - {shift.endTime}
                            </p>
                            {hasViolations && (
                              <div className="mt-1">
                                {shiftViolations.map((violation: any, vIndex: number) => (
                                  <p key={vIndex} className="text-xs text-red-600">
                                    ⚠️ {violation.message}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveShift(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
          </div>

          {/* =====================================================
               COLUNA LATERAL - COCKPIT DE IA EM TEMPO REAL
               ===================================================== */}
          <div className="space-y-4">
            {/* Painel de Custo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>Custo Estimado</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isCalculatingCost ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm text-muted-foreground">Calculando...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      }).format(costResult?.totalCost || 0)}
                    </p>
                    {costResult && (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>• {costResult.totalHours || 0} horas totais</div>
                        <div>• {costResult.employeeCount || 0} funcionários</div>
                        <div>• Média: R$ {(costResult.averageHourlyRate || 0).toFixed(2)}/hora</div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Painel de Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>Análise de Risco CLT</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isValidating ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm text-muted-foreground">Analisando...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {validationResult ? (
                      <>
                        <div className="flex items-center space-x-2">
                          {validationResult.isValid ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium">
                            Score de Risco: {validationResult.riskScore || 0}%
                          </span>
                        </div>
                        
                        {validationResult.violations && validationResult.violations.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-red-600">Violações detectadas:</p>
                            <ul className="text-xs text-red-600 space-y-1">
                              {validationResult.violations.map((v, i) => (
                                <li key={i} className="flex items-start space-x-1">
                                  <span>•</span>
                                  <span>{v.message}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {validationResult.isValid && (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Escala em conformidade</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Adicione turnos para análise
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Painel de Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Estatísticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total de Turnos:</span>
                    <span className="font-medium">{shifts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Funcionários:</span>
                    <span className="font-medium">{employees?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dias da Escala:</span>
                    <span className="font-medium">
                      {startDate && endDate ? 
                        Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 
                        0
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recomendações da IA */}
            {(validationResult?.recommendations || costResult?.recommendations) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    <span>Recomendações IA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {validationResult?.recommendations?.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <span className="text-purple-500">•</span>
                        <span>{rec.message}</span>
                      </div>
                    ))}
                    {costResult?.recommendations?.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <span className="text-purple-500">•</span>
                        <span>{rec.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6">
          {/* Botão de Otimização IA */}
          {shifts.length > 0 && (
            <Button 
              variant="outline" 
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => {
                toast({
                  title: "🤖 Otimização IA",
                  description: "Funcionalidade de otimização automática será implementada em breve!",
                });
              }}
            >
              <Brain className="mr-2 h-4 w-4" />
              Otimizar com IA
            </Button>
          )}
          
          {/* Botões de Ação */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel} disabled={createScheduleMutation.isPending}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveSchedule} 
              disabled={createScheduleMutation.isPending || shifts.length === 0}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              {createScheduleMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar e Publicar Escala
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}