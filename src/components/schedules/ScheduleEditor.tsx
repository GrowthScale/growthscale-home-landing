import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getEmployees, createScheduleWithShifts, validateSchedule, calculateScheduleCost } from '@/services/api';
import { 
  Calendar, 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  X, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Loader2
} from 'lucide-react';

interface ScheduleFormData {
  name: string;
  date: string;
  description: string;
  notes: string;
}

interface ShiftData {
  employee_id: string;
  start_time: string;
  end_time: string;
  notes?: string;
}

export const ScheduleEditor: React.FC = () => {
  const { currentTenant: tenant } = useTenant();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const queryClient = useQueryClient();

  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleFormData>({
    name: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    notes: ''
  });
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [shiftStartTime, setShiftStartTime] = useState('08:00');
  const [shiftEndTime, setShiftEndTime] = useState('17:00');

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

  // Mutation para criar escala
  const createScheduleMutation = useMutation({
    mutationFn: async (data: { schedule: ScheduleFormData; shifts: ShiftData[] }) => {
      if (!tenant?.id) throw new Error('Empresa não configurada');
      const result = await createScheduleWithShifts({
        name: data.schedule.name,
        date: data.schedule.date,
        description: data.schedule.description,
        notes: data.schedule.notes,
        shifts: data.shifts
      }, tenant.id);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast({
        title: "Escala criada com sucesso!",
        description: "A escala foi salva e está disponível no calendário.",
      });
      setIsOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['schedules', tenant?.id] });
      trackEvent('schedule_created', {
        schedule_name: scheduleData.name,
        shifts_count: shifts.length,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar escala",
        description: error.message || "Ocorreu um erro ao criar a escala.",
        variant: "destructive"
      });
    }
  });

  // Validar escala
  const { data: validationResult, refetch: validateScheduleData } = useQuery({
    queryKey: ['validate-schedule', shifts],
    queryFn: async () => {
      if (shifts.length === 0 || !employees) return null;
      const result = await validateSchedule(shifts, employees);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    enabled: Boolean(shifts.length > 0 && employees && employees.length > 0),
  });

  // Calcular custo da escala
  const { data: costResult, refetch: calculateCost } = useQuery({
    queryKey: ['calculate-cost', shifts],
    queryFn: async () => {
      if (shifts.length === 0 || !employees) return null;
      const result = await calculateScheduleCost(shifts, employees);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    enabled: Boolean(shifts.length > 0 && employees && employees.length > 0),
  });

  // Handlers
  const handleAddShift = () => {
    if (!selectedEmployee || !shiftStartTime || !shiftEndTime) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos do turno.",
        variant: "destructive"
      });
      return;
    }

    const newShift: ShiftData = {
      employee_id: selectedEmployee,
      start_time: `${scheduleData.date}T${shiftStartTime}`,
      end_time: `${scheduleData.date}T${shiftEndTime}`,
      notes: ''
    };

    setShifts(prev => [...prev, newShift]);
    setSelectedEmployee('');
    setShiftStartTime('08:00');
    setShiftEndTime('17:00');

    // Revalidar e recalcular custos
    validateScheduleData();
    calculateCost();
  };

  const handleRemoveShift = (index: number) => {
    setShifts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveSchedule = () => {
    if (!scheduleData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite um nome para a escala.",
        variant: "destructive"
      });
      return;
    }

    if (shifts.length === 0) {
      toast({
        title: "Turnos obrigatórios",
        description: "Adicione pelo menos um turno à escala.",
        variant: "destructive"
      });
      return;
    }

    createScheduleMutation.mutate({
      schedule: scheduleData,
      shifts: shifts
    });
  };

  const resetForm = () => {
    setScheduleData({
      name: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      notes: ''
    });
    setShifts([]);
    setSelectedEmployee('');
    setShiftStartTime('08:00');
    setShiftEndTime('17:00');
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForm();
  };

  const getEmployeeName = (employeeId: string) => {
    return employees?.find(emp => emp.id === employeeId)?.name || 'Funcionário não encontrado';
  };

  const formatTime = (timeString: string) => {
    return timeString.split('T')[1]?.substring(0, 5) || timeString;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nova Escala
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Criar Nova Escala
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações da Escala */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Escala</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-name">Nome da Escala *</Label>
                  <Input
                    id="schedule-name"
                    value={scheduleData.name}
                    onChange={(e) => setScheduleData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Escala Semanal - Loja Centro"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">Data *</Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-description">Descrição</Label>
                <Input
                  id="schedule-description"
                  value={scheduleData.description}
                  onChange={(e) => setScheduleData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Breve descrição da escala"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-notes">Observações</Label>
                <Textarea
                  id="schedule-notes"
                  value={scheduleData.notes}
                  onChange={(e) => setScheduleData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Observações adicionais sobre a escala"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Adicionar Turnos */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Turnos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-select">Funcionário *</Label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  {shifts.map((shift, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{getEmployeeName(shift.employee_id)}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                          </p>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validação e Custos */}
          {(validationResult || costResult) && (
            <Card>
              <CardHeader>
                <CardTitle>Análise da Escala</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                 {validationResult && (
                   <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                       <CheckCircle className="h-4 w-4 text-success" />
                       <span className="font-medium">Validação CLT</span>
                     </div>
                     <div className="pl-6 space-y-1">
                       {(validationResult as any)?.violations?.length > 0 ? (
                         (validationResult as any).violations.map((violation: any, index: number) => (
                           <div key={index} className="flex items-center space-x-2 text-sm text-destructive">
                             <AlertTriangle className="h-3 w-3" />
                             <span>{violation.message}</span>
                           </div>
                         ))
                       ) : (
                         <p className="text-sm text-success">Nenhuma violação encontrada</p>
                       )}
                     </div>
                   </div>
                 )}

                 {costResult && (
                   <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                       <BarChart3 className="h-4 w-4 text-primary" />
                       <span className="font-medium">Custos Estimados</span>
                     </div>
                     <div className="pl-6 space-y-1 text-sm">
                       <p>Custo Total: R$ {(costResult as any)?.totalCost?.toLocaleString('pt-BR') || '0'}</p>
                       <p>Custo Base: R$ {(costResult as any)?.breakdown?.baseCost?.toLocaleString('pt-BR') || '0'}</p>
                       <p>Horas Extras: R$ {(costResult as any)?.breakdown?.overtimeCost?.toLocaleString('pt-BR') || '0'}</p>
                     </div>
                   </div>
                 )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancel} disabled={createScheduleMutation.isPending}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveSchedule} 
            disabled={createScheduleMutation.isPending || shifts.length === 0}
            className="bg-primary hover:bg-primary/90"
          >
            {createScheduleMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Escala
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};