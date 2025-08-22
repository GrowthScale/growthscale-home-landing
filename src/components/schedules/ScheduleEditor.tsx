// src/components/schedules/ScheduleEditor.tsx
import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createScheduleWithShifts, type ScheduleData, type ShiftData } from '@/services/api';
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
  Loader2
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Criar Nova Escala</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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
                  {shifts.map((shift, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{shift.employeeName}</p>
                          <p className="text-sm text-muted-foreground">
                            {shift.date} • {shift.startTime} - {shift.endTime}
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
      </DialogContent>
    </Dialog>
  );
}