import { EmployeeForCostCalculation, ShiftForCostCalculation } from '@/services/api';

// Dados mock para funcionários com salários/hora
export const mockEmployeesForCost: EmployeeForCostCalculation[] = [
  {
    id: '1',
    workload: 44, // 44 horas semanais (CLT padrão)
    hourlyRate: 15.50 // R$ 15,50 por hora
  },
  {
    id: '2',
    workload: 40, // 40 horas semanais
    hourlyRate: 18.75 // R$ 18,75 por hora
  },
  {
    id: '3',
    workload: 44,
    hourlyRate: 16.25 // R$ 16,25 por hora
  },
  {
    id: '4',
    workload: 36, // 36 horas semanais
    hourlyRate: 20.00 // R$ 20,00 por hora
  },
  {
    id: '5',
    workload: 44,
    hourlyRate: 14.80 // R$ 14,80 por hora
  }
];

// Dados mock para turnos da semana
export const mockShiftsForCost: ShiftForCostCalculation[] = [
  // Segunda-feira - Turno manhã (8h às 17h)
  {
    employeeId: '1',
    startTime: '2024-01-15T08:00:00.000Z',
    endTime: '2024-01-15T17:00:00.000Z'
  },
  {
    employeeId: '2',
    startTime: '2024-01-15T08:00:00.000Z',
    endTime: '2024-01-15T17:00:00.000Z'
  },
  
  // Segunda-feira - Turno tarde (14h às 23h)
  {
    employeeId: '3',
    startTime: '2024-01-15T14:00:00.000Z',
    endTime: '2024-01-15T23:00:00.000Z'
  },
  
  // Segunda-feira - Turno noite (22h às 7h do dia seguinte)
  {
    employeeId: '4',
    startTime: '2024-01-15T22:00:00.000Z',
    endTime: '2024-01-16T07:00:00.000Z'
  },
  
  // Terça-feira - Turno manhã
  {
    employeeId: '1',
    startTime: '2024-01-16T08:00:00.000Z',
    endTime: '2024-01-16T17:00:00.000Z'
  },
  {
    employeeId: '5',
    startTime: '2024-01-16T08:00:00.000Z',
    endTime: '2024-01-16T17:00:00.000Z'
  },
  
  // Terça-feira - Turno tarde
  {
    employeeId: '2',
    startTime: '2024-01-16T14:00:00.000Z',
    endTime: '2024-01-16T23:00:00.000Z'
  },
  
  // Quarta-feira - Turno manhã
  {
    employeeId: '3',
    startTime: '2024-01-17T08:00:00.000Z',
    endTime: '2024-01-17T17:00:00.000Z'
  },
  {
    employeeId: '4',
    startTime: '2024-01-17T08:00:00.000Z',
    endTime: '2024-01-17T17:00:00.000Z'
  },
  
  // Quarta-feira - Turno noite
  {
    employeeId: '1',
    startTime: '2024-01-17T22:00:00.000Z',
    endTime: '2024-01-18T07:00:00.000Z'
  },
  
  // Quinta-feira - Turno manhã
  {
    employeeId: '2',
    startTime: '2024-01-18T08:00:00.000Z',
    endTime: '2024-01-18T17:00:00.000Z'
  },
  {
    employeeId: '5',
    startTime: '2024-01-18T08:00:00.000Z',
    endTime: '2024-01-18T17:00:00.000Z'
  },
  
  // Sexta-feira - Turno manhã
  {
    employeeId: '1',
    startTime: '2024-01-19T08:00:00.000Z',
    endTime: '2024-01-19T17:00:00.000Z'
  },
  {
    employeeId: '3',
    startTime: '2024-01-19T08:00:00.000Z',
    endTime: '2024-01-19T17:00:00.000Z'
  },
  
  // Sábado - Turno manhã (horas extras)
  {
    employeeId: '2',
    startTime: '2024-01-20T08:00:00.000Z',
    endTime: '2024-01-20T17:00:00.000Z'
  },
  {
    employeeId: '4',
    startTime: '2024-01-20T08:00:00.000Z',
    endTime: '2024-01-20T17:00:00.000Z'
  }
];
