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
  salary?: number;
  workload_hours?: number;
}

interface CostCalculationResult {
  totalCost: number;
  breakdown: {
    baseCost: number;
    overtimeCost: number;
    nightShiftCost: number;
    holidayCost: number;
  };
  employeeCosts: Array<{
    employeeId: string;
    employeeName: string;
    hoursWorked: number;
    regularHours: number;
    overtimeHours: number;
    nightHours: number;
    totalCost: number;
  }>;
  summary: {
    totalHours: number;
    totalRegularHours: number;
    totalOvertimeHours: number;
    averageHourlyRate: number;
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

    // Executar cálculo
    const result = calculateScheduleCost(shifts, employees)

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Erro no cálculo:', error)
    
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

function calculateScheduleCost(shifts: Shift[], employees: Employee[]): CostCalculationResult {
  // Criar mapa de funcionários para busca rápida
  const employeeMap = new Map(employees.map(emp => [emp.id, emp]))
  
  const employeeCosts: CostCalculationResult['employeeCosts'] = []
  let totalBaseCost = 0
  let totalOvertimeCost = 0
  let totalNightShiftCost = 0
  const totalHolidayCost = 0
  let totalHours = 0
  let totalRegularHours = 0
  let totalOvertimeHours = 0
  
  // Agrupar turnos por funcionário
  const employeeShifts = new Map<string, Shift[]>()
  shifts.forEach(shift => {
    if (!employeeShifts.has(shift.employee_id)) {
      employeeShifts.set(shift.employee_id, [])
    }
    employeeShifts.get(shift.employee_id)!.push(shift)
  })
  
  // Calcular custo para cada funcionário
  employeeShifts.forEach((empShifts, employeeId) => {
    const employee = employeeMap.get(employeeId)
    if (!employee) return
    
    // Salário base (usar salário mínimo se não especificado)
    const monthlySalary = employee.salary || 1412 // Salário mínimo 2024
    const dailyRate = monthlySalary / 30
    const hourlyRate = dailyRate / 8 // Assumindo 8h por dia
    
    let employeeTotalHours = 0
    let employeeRegularHours = 0
    let employeeOvertimeHours = 0
    let employeeNightHours = 0
    
    // Calcular horas para cada turno do funcionário
    empShifts.forEach(shift => {
      const startTime = new Date(shift.start_time)
      const endTime = new Date(shift.end_time)
      
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        return // Pular turnos com horários inválidos
      }
      
      const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
      employeeTotalHours += hoursWorked
      
      // Determinar se há horas noturnas (22h às 5h)
      const startHour = startTime.getHours()
      const endHour = endTime.getHours()
      
      let nightHours = 0
      if (startHour >= 22 || startHour < 5 || endHour >= 22 || endHour < 5) {
        // Cálculo simplificado - pode ser refinado
        nightHours = Math.min(hoursWorked, 2) // Máximo 2h noturnas por simplicidade
      }
      
      employeeNightHours += nightHours
    })
    
    // Calcular horas regulares e extras
    const maxRegularHours = employee.workload_hours || 8
    if (employeeTotalHours <= maxRegularHours) {
      employeeRegularHours = employeeTotalHours
      employeeOvertimeHours = 0
    } else {
      employeeRegularHours = maxRegularHours
      employeeOvertimeHours = employeeTotalHours - maxRegularHours
    }
    
    // Calcular custos
    const regularCost = employeeRegularHours * hourlyRate
    const overtimeCost = employeeOvertimeHours * hourlyRate * 1.5 // 50% adicional
    const nightCost = employeeNightHours * hourlyRate * 0.2 // 20% adicional noturno
    const employeeTotalCost = regularCost + overtimeCost + nightCost
    
    // Acumular totais
    totalBaseCost += regularCost
    totalOvertimeCost += overtimeCost
    totalNightShiftCost += nightCost
    totalHours += employeeTotalHours
    totalRegularHours += employeeRegularHours
    totalOvertimeHours += employeeOvertimeHours
    
    // Adicionar aos custos por funcionário
    employeeCosts.push({
      employeeId: employee.id,
      employeeName: employee.name,
      hoursWorked: Number(employeeTotalHours.toFixed(2)),
      regularHours: Number(employeeRegularHours.toFixed(2)),
      overtimeHours: Number(employeeOvertimeHours.toFixed(2)),
      nightHours: Number(employeeNightHours.toFixed(2)),
      totalCost: Number(employeeTotalCost.toFixed(2))
    })
  })
  
  const totalCost = totalBaseCost + totalOvertimeCost + totalNightShiftCost + totalHolidayCost
  const averageHourlyRate = totalHours > 0 ? totalCost / totalHours : 0
  
  return {
    totalCost: Number(totalCost.toFixed(2)),
    breakdown: {
      baseCost: Number(totalBaseCost.toFixed(2)),
      overtimeCost: Number(totalOvertimeCost.toFixed(2)),
      nightShiftCost: Number(totalNightShiftCost.toFixed(2)),
      holidayCost: Number(totalHolidayCost.toFixed(2))
    },
    employeeCosts,
    summary: {
      totalHours: Number(totalHours.toFixed(2)),
      totalRegularHours: Number(totalRegularHours.toFixed(2)),
      totalOvertimeHours: Number(totalOvertimeHours.toFixed(2)),
      averageHourlyRate: Number(averageHourlyRate.toFixed(2))
    }
  }
}