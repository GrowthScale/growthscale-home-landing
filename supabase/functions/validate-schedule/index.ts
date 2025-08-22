import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface Shift {
  employee_id: string;
  start_time: string;
  end_time: string;
  notes?: string;
}

interface Employee {
  id: string;
  name: string;
  workload_hours?: number;
}

interface ValidationResult {
  isValid: boolean;
  violations: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    employeeId?: string;
  }>;
  summary: {
    totalShifts: number;
    totalViolations: number;
    highSeverityViolations: number;
  };
}

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validar método
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Método não permitido' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parsear dados da requisição
    const { shifts, employees }: { shifts: Shift[], employees: Employee[] } = await req.json()

    if (!shifts || !Array.isArray(shifts)) {
      return new Response(
        JSON.stringify({ error: 'Turnos são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!employees || !Array.isArray(employees)) {
      return new Response(
        JSON.stringify({ error: 'Funcionários são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Executar validação
    const result = validateSchedule(shifts, employees)

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Erro na validação:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function validateSchedule(shifts: Shift[], employees: Employee[]): ValidationResult {
  const violations: ValidationResult['violations'] = []
  
  // Criar mapa de funcionários para busca rápida
  const employeeMap = new Map(employees.map(emp => [emp.id, emp]))
  
  // Validar cada turno
  shifts.forEach((shift, index) => {
    const employee = employeeMap.get(shift.employee_id)
    
    if (!employee) {
      violations.push({
        type: 'EMPLOYEE_NOT_FOUND',
        message: `Funcionário não encontrado para o turno ${index + 1}`,
        severity: 'high',
        employeeId: shift.employee_id
      })
      return
    }
    
    // Validar horários
    const startTime = new Date(shift.start_time)
    const endTime = new Date(shift.end_time)
    
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      violations.push({
        type: 'INVALID_TIME',
        message: `Horários inválidos para ${employee.name}`,
        severity: 'high',
        employeeId: employee.id
      })
      return
    }
    
    if (endTime <= startTime) {
      violations.push({
        type: 'INVALID_TIME_ORDER',
        message: `Horário de fim deve ser após o início para ${employee.name}`,
        severity: 'high',
        employeeId: employee.id
      })
      return
    }
    
    // Calcular horas trabalhadas
    const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
    
    // Validar carga horária excessiva (mais de 12h)
    if (hoursWorked > 12) {
      violations.push({
        type: 'EXCESSIVE_HOURS',
        message: `${employee.name} trabalhará ${hoursWorked.toFixed(1)}h (máximo: 12h)`,
        severity: 'high',
        employeeId: employee.id
      })
    }
    
    // Validar turnos muito curtos (menos de 2h)
    if (hoursWorked < 2) {
      violations.push({
        type: 'SHORT_SHIFT',
        message: `${employee.name} trabalhará apenas ${hoursWorked.toFixed(1)}h (mínimo recomendado: 2h)`,
        severity: 'medium',
        employeeId: employee.id
      })
    }
  })
  
  // Validar turnos duplicados para o mesmo funcionário
  const employeeShifts = new Map<string, Shift[]>()
  shifts.forEach(shift => {
    if (!employeeShifts.has(shift.employee_id)) {
      employeeShifts.set(shift.employee_id, [])
    }
    employeeShifts.get(shift.employee_id)!.push(shift)
  })
  
  employeeShifts.forEach((empShifts, employeeId) => {
    const employee = employeeMap.get(employeeId)
    if (!employee) return
    
    if (empShifts.length > 1) {
      violations.push({
        type: 'MULTIPLE_SHIFTS',
        message: `${employee.name} tem ${empShifts.length} turnos no mesmo dia`,
        severity: 'medium',
        employeeId: employeeId
      })
    }
  })
  
  const highSeverityViolations = violations.filter(v => v.severity === 'high').length
  
  return {
    isValid: violations.length === 0,
    violations,
    summary: {
      totalShifts: shifts.length,
      totalViolations: violations.length,
      highSeverityViolations
    }
  }
}