// src/components/schedules/ScheduleEditor.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createScheduleWithShifts, type ScheduleData, type ShiftData, validateSchedule, calculateScheduleCost } from '@/services/api';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getEmployees, type EmployeeData } from '@/services/api';
import { 
  Calendar, 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Loader2,
  Brain,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  ShieldCheck,
  Lightbulb
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

  // 🧠 QUERIES DE INTELIGÊNCIA ARTIFICIAL - ATIVADAS EM TEMPO REAL
  const { data: validationResult, isLoading: isValidating, error: validationError } = useQuery({
    queryKey: ['validateSchedule', shifts, employees], // A chave reage a mudanças em turnos e funcionários
    queryFn: () => validateSchedule(shifts, employees || []),
    enabled: Boolean(shifts.length > 0 && employees && employees.length > 0), // Só executa se houver dados
    refetchInterval: 5000, // Revalida a cada 5 segundos
  });

  const { data: costResult, isLoading: isCalculatingCost, error: costError } = useQuery({
    queryKey: ['calculateScheduleCost', shifts, employees],
    queryFn: () => {
      const employeesWithRate = employees?.map(e => ({ 
        ...e, 
        hourly_rate: e.hourly_rate || 20 
      })) || [];
      return calculateScheduleCost(shifts, employeesWithRate);
    },
    enabled: Boolean(shifts.length > 0 && employees && employees.length > 0),
    refetchInterval: 3000, // Recalcula a cada 3 segundos
  });

  // Tratar erros das queries de IA
  useEffect(() => {
    if (validationError) {
      toast({ 
        title: "Erro na Validação", 
        description: "Não foi possível validar a escala em tempo real.", 
        variant: "destructive" 
      });
    }
  }, [validationError, toast]);

  useEffect(() => {
    if (costError) {
      toast({ 
        title: "Erro no Cálculo de Custo", 
        description: "Não foi possível calcular o custo em tempo real.", 
        variant: "destructive" 
      });
    }
  }, [costError, toast]);

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
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Criar Nova Escala</span>
            </div>
            
            {/* Indicador de Custo Total */}
            {costResult?.data && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-md">
                <DollarSign className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent-foreground">
                  R$ {costResult.data.totalCost?.toFixed(2) || '0.00'}
                </span>
                {isCalculatingCost && <Loader2 className="h-3 w-3 animate-spin text-accent" />}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Conteúdo */}
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

            {/* Adicionar Turnos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Adicionar Turnos</span>
                  {(isValidating || isCalculatingCost) && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Analisando em tempo real...</span>
                    </div>
                  )}
                </CardTitle>
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

            {/* Cockpit de Decisão Inteligente */}
            {(shifts.length > 0 || isValidating || isCalculatingCost) && (
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>Cockpit de Decisão Inteligente</span>
                    {(isValidating || isCalculatingCost) && (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Resumo Executivo */}
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{shifts.length}</div>
                        <div className="text-xs text-muted-foreground">Turnos</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {new Set(shifts.map(s => s.employeeId)).size}
                        </div>
                        <div className="text-xs text-muted-foreground">Funcionários</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {validationResult?.data?.violations?.length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Violações</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          R$ {costResult?.data?.totalCost?.toFixed(0) || '0'}
                        </div>
                        <div className="text-xs text-muted-foreground">Custo Total</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {validationResult?.data?.violations?.length === 0 ? (
                            <span className="text-accent">✓</span>
                          ) : (
                            <span className="text-destructive">⚠</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">Qualidade</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          R$ {(costResult?.data?.totalCost / costResult?.data?.totalHours)?.toFixed(0) || '0'}
                        </div>
                        <div className="text-xs text-muted-foreground">Custo/Hora</div>
                      </div>
                    </div>
                  </div>

                  {/* Validação em Tempo Real */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="font-medium">Validação CLT</span>
                        {isValidating && <Loader2 className="h-3 w-3 animate-spin" />}
                      </div>
                      
                      {validationResult?.data ? (
                        <div className="space-y-2">
                          {validationResult.data.violations?.length > 0 ? (
                            <Alert variant="destructive">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>{validationResult.data.violations.length}</strong> violação(ões) detectada(s)
                              </AlertDescription>
                            </Alert>
                          ) : (
                            <Alert className="border-green-200 bg-green-50">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <AlertDescription className="text-green-800">
                                Escala em conformidade com a CLT
                              </AlertDescription>
                            </Alert>
                          )}
                          
                          {validationResult.data.violations?.map((violation: any, index: number) => (
                            <div key={index} className="text-sm p-2 bg-red-50 border border-red-200 rounded">
                              <strong className="text-red-800">{violation.type}:</strong> {violation.message}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {isValidating ? "Validando..." : "Adicione turnos para validar"}
                        </div>
                      )}
                    </div>

                    {/* Análise de Custos */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-medium">Análise de Custos</span>
                        {isCalculatingCost && <Loader2 className="h-3 w-3 animate-spin" />}
                      </div>
                      
                      {costResult?.data ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                              <div className="font-medium text-blue-800">Custo Total</div>
                              <div className="text-lg font-bold text-blue-900">
                                R$ {costResult.data.totalCost?.toFixed(2) || '0.00'}
                              </div>
                            </div>
                            <div className="p-2 bg-green-50 border border-green-200 rounded">
                              <div className="font-medium text-green-800">Horas Totais</div>
                              <div className="text-lg font-bold text-green-900">
                                {costResult.data.totalHours?.toFixed(1) || '0'}h
                              </div>
                            </div>
                          </div>
                          
                          {costResult.data.breakdown && (
                            <div className="text-xs space-y-1">
                              <div className="font-medium text-muted-foreground">Detalhamento:</div>
                              {Object.entries(costResult.data.breakdown).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">{key}:</span>
                                  <span className="font-medium">R$ {value?.toFixed(2) || '0.00'}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {isCalculatingCost ? "Calculando..." : "Adicione turnos para calcular custos"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sugestões de Otimização */}
                  {validationResult?.data?.suggestions && validationResult.data.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="font-medium">Sugestões de Otimização</span>
                      </div>
                      <div className="space-y-1">
                        {validationResult.data.suggestions.map((suggestion: any, index: number) => (
                          <div key={index} className="text-sm p-2 bg-accent/10 border border-accent/20 rounded">
                            <span className="text-accent-foreground">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Indicadores de Performance */}
                  {costResult?.data && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="font-medium">Custo/Hora</div>
                        <div className="text-lg font-bold text-primary">
                          R$ {(costResult.data.totalCost / costResult.data.totalHours)?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="font-medium">Turnos</div>
                        <div className="text-lg font-bold text-primary">{shifts.length}</div>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="font-medium">Funcionários</div>
                        <div className="text-lg font-bold text-primary">
                          {new Set(shifts.map(s => s.employeeId)).size}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Lista de Turnos */}
            {shifts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Turnos Adicionados ({shifts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shifts.map((shift, index) => {
                      // Verificar se este turno tem violações
                      const shiftViolations = validationResult?.data?.violations?.filter((v: any) => 
                        v.employeeId === shift.employeeId && v.date === shift.date
                      ) || [];
                      
                      const hasViolations = shiftViolations.length > 0;
                      
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-3 border rounded-lg ${
                            hasViolations 
                              ? 'border-destructive/50 bg-destructive/5' 
                              : 'border-border'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {hasViolations && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{shift.employeeName}</p>
                              <p className="text-sm text-muted-foreground">
                                {shift.date} • {shift.startTime} - {shift.endTime}
                              </p>
                              {hasViolations && (
                                <div className="mt-1">
                                  <Badge variant="destructive" className="text-xs">
                                    {shiftViolations.length} violação(ões)
                                  </Badge>
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

          {/* Coluna Lateral - Painéis de Análise */}
          <div className="lg:col-span-1 space-y-6">
            {/* Painel de Custo */}
            <Card>
              <CardHeader>
                <CardTitle>Custo Estimado</CardTitle>
              </CardHeader>
              <CardContent>
                {isCalculatingCost ? <p>Calculando...</p> : (
                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(costResult?.data?.totalCost || 0)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Painel de Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>Análise de Risco CLT</CardTitle>
              </CardHeader>
              <CardContent>
                {isValidating ? <p>Analisando...</p> : (
                  <div>
                    <p>Score de Risco: {validationResult?.data?.riskScore || 0}%</p>
                    <ul className="mt-2 space-y-1">
                      {validationResult?.data?.violations?.map((v: any, i: number) => (
                        <li key={i} className="text-xs text-destructive">{v.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Validação CLT */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Validação CLT</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Análise de Horário</span>
                  {isValidating && <Loader2 className="h-3 w-3 animate-spin" />}
                </div>
                
                {validationResult?.data ? (
                  <div className="space-y-2">
                    {validationResult.data.violations?.length > 0 ? (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{validationResult.data.violations.length}</strong> violação(ões) detectada(s)
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Escala em conformidade com a CLT
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {validationResult.data.violations?.map((violation: any, index: number) => (
                      <div key={index} className="text-sm p-2 bg-red-50 border border-red-200 rounded">
                        <strong className="text-red-800">{violation.type}:</strong> {violation.message}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    {isValidating ? "Validando..." : "Adicione turnos para validar"}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Análise de Custos */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Análise de Custos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Custo/Hora</span>
                  {isCalculatingCost && <Loader2 className="h-3 w-3 animate-spin" />}
                </div>
                
                {costResult?.data ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                        <div className="font-medium text-blue-800">Custo Total</div>
                        <div className="text-lg font-bold text-blue-900">
                          R$ {costResult.data.totalCost?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                      <div className="p-2 bg-green-50 border border-green-200 rounded">
                        <div className="font-medium text-green-800">Horas Totais</div>
                        <div className="text-lg font-bold text-green-900">
                          {costResult.data.totalHours?.toFixed(1) || '0'}h
                        </div>
                      </div>
                    </div>
                    
                    {costResult.data.breakdown && (
                      <div className="text-xs space-y-1">
                        <div className="font-medium text-muted-foreground">Detalhamento:</div>
                        {Object.entries(costResult.data.breakdown).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium">R$ {value?.toFixed(2) || '0.00'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    {isCalculatingCost ? "Calculando..." : "Adicione turnos para calcular custos"}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sugestões de Otimização */}
            {validationResult?.data?.suggestions && validationResult.data.suggestions.length > 0 && (
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Sugestões de Otimização</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span className="font-medium">Sugestões de Otimização</span>
                  </div>
                  <div className="space-y-1">
                    {validationResult.data.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="text-sm p-2 bg-accent/10 border border-accent/20 rounded">
                        <span className="text-accent-foreground">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancel} disabled={createScheduleMutation.isPending}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          
          {/* Status da Validação */}
          {validationResult?.data && (
            <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-muted">
              {validationResult.data.violations?.length > 0 ? (
                <>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive font-medium">
                    {validationResult.data.violations.length} violação(ões)
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm text-accent font-medium">Validado</span>
                </>
              )}
            </div>
          )}
          
          <Button 
            onClick={handleSaveSchedule} 
            disabled={
              createScheduleMutation.isPending || 
              shifts.length === 0 || 
              isValidating || 
              isCalculatingCost ||
              (validationResult?.data?.violations?.length > 0)
            }
            className={`${
              validationResult?.data?.violations?.length > 0 
                ? 'bg-destructive hover:bg-destructive/90' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            size="lg"
          >
            {createScheduleMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : isValidating || isCalculatingCost ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : validationResult?.data?.violations?.length > 0 ? (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Salvar com Violações
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar e Publicar Escala
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}