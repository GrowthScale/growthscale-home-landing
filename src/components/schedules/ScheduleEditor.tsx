// src/components/schedules/ScheduleEditor.tsx
import { useState, useCallback } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createScheduleWithShifts, validateSchedule, calculateScheduleCost } from '@/services/api';
import { useTenant } from '@/contexts/TenantContext';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getEmployees } from '@/services/api';
import { ScheduleHeader } from './ScheduleHeader';
import { ScheduleCalendarView } from './ScheduleCalendarView';
import { IntelligencePanel } from './IntelligencePanel';

// Tipos compartilhados
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

interface Employee {
  id: string;
  name: string;
  position: string;
  department?: string;
  hourly_rate?: number;
}

export function ScheduleEditor() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentTenant: tenant } = useTenant();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  // Estados principais
  const [scheduleName, setScheduleName] = useState('Escala Semanal');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [shifts, setShifts] = useState<EditorShiftData[]>([]);

  // Buscar funcionários
  const { data: employeesData = [] } = useQuery({
    queryKey: ['employees', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) throw new Error('Empresa não configurada');
      const result = await getEmployees(tenant.id);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    enabled: !!tenant?.id,
  });

  // Converter para o tipo Employee
  const employees: Employee[] = employeesData.map(emp => ({
    id: emp.id || '',
    name: emp.name || '',
    position: emp.position || '',
    department: (emp as any).department,
    hourly_rate: emp.hourly_rate
  }));

  // 🧠 QUERIES DE INTELIGÊNCIA ARTIFICIAL - ATIVADAS EM TEMPO REAL
  const { data: validationResult, isLoading: isValidating, error: validationError } = useQuery({
    queryKey: ['validateSchedule', shifts, employees],
    queryFn: () => validateSchedule(shifts, employees),
    enabled: Boolean(shifts.length > 0 && employees.length > 0),
    refetchInterval: 5000, // Revalida a cada 5 segundos
  });

  const { data: costResult, isLoading: isCalculatingCost, error: costError } = useQuery({
    queryKey: ['calculateScheduleCost', shifts, employees],
    queryFn: () => {
      const employeesWithRate = employees.map(e => ({ 
        ...e, 
        hourly_rate: e.hourly_rate || 20 
      }));
      return calculateScheduleCost(shifts, employeesWithRate);
    },
    enabled: Boolean(shifts.length > 0 && employees.length > 0),
    refetchInterval: 3000, // Recalcula a cada 3 segundos
  });

  // Mutation para salvar a escala
  const createScheduleMutation = useMutation({
    mutationFn: async (data: { 
      schedule: { 
        name: string;
        start_date: string;
        end_date: string;
        company_id: string;
        status: 'draft' | 'published' | 'archived';
      }; 
      shifts: {
        employee_id: string;
        start_time: string;
        end_time: string;
        date: string;
        position: string;
        hourly_rate: number;
      }[] 
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
      navigate('/dashboard/schedules');
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

  const handleSave = useCallback(() => {
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
    const scheduleToSave = {
      name: scheduleName,
      start_date: startDate,
      end_date: endDate,
      company_id: tenant.id,
      status: status
    };

    // Converter shifts para o formato da API
    const shiftsPayload = shifts.map(shift => ({
      employee_id: shift.employeeId,
      start_time: shift.startTime,
      end_time: shift.endTime,
      date: shift.date,
      position: shift.employeePosition || '',
      hourly_rate: employees.find(emp => emp.id === shift.employeeId)?.hourly_rate || 0
    }));

    createScheduleMutation.mutate({
      schedule: scheduleToSave,
      shifts: shiftsPayload
    });
  }, [tenant, startDate, endDate, scheduleName, status, shifts, employees, createScheduleMutation, navigate, queryClient, toast, trackEvent]);

  // Renderizar a nova estrutura modular
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ScheduleHeader 
          scheduleName={scheduleName}
          onScheduleNameChange={setScheduleName}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          status={status}
          onStatusChange={setStatus}
          onSave={handleSave}
          isSaving={createScheduleMutation.isPending}
          shiftsCount={shifts.length}
          employeesCount={employees.length}
        />
        <ScheduleCalendarView 
          shifts={shifts}
          employees={employees}
          onShiftsChange={setShifts}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="lg:col-span-1 space-y-6">
                 <IntelligencePanel 
           validationResult={{
             data: validationResult as any,
             isLoading: isValidating,
             error: validationError
           }}
           costResult={{
             data: costResult as any,
             isLoading: isCalculatingCost,
             error: costError
           }}
         />
      </div>
    </div>
  );
}