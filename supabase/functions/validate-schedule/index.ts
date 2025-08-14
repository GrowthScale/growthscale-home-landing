// supabase/functions/validate-schedule/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { differenceInHours, addDays, parseISO, compareAsc, getDay } from "https://deno.land/x/date_fns@v2.29.3/index.js";

// --- Tipos de Dados (Input/Output) ---
interface Shift { id: string; employeeId: string; startTime: string; endTime: string; }
interface Employee { id: string; name: string; workload: number; }
interface InputData { shifts: Shift[]; employees: Employee[]; }
interface Violation { code: string; message: string; severity: 'critical' | 'warning'; employeeId: string; shiftIds: string[]; }

// Nova estrutura de saída para incluir a equidade
interface OutputData {
  riskScore: number;
  equityScore: { value: number; message: string; };
  violations: Violation[];
}

// --- Funções de Validação Existentes (Interjornada, DSR, etc.) ---
function validateInterjornada(shifts: Shift[], employeeId: string): Violation[] {
  const violations: Violation[] = [];
  const employeeShifts = shifts.filter(s => s.employeeId === employeeId);
  
  for (let i = 0; i < employeeShifts.length - 1; i++) {
    const currentShift = employeeShifts[i];
    const nextShift = employeeShifts[i + 1];
    
    const currentEnd = parseISO(currentShift.endTime);
    const nextStart = parseISO(nextShift.startTime);
    
    const hoursBetween = differenceInHours(nextStart, currentEnd);
    
    if (hoursBetween < 11) {
      violations.push({
        code: 'INTERJORNADA',
        message: `Intervalo entre turnos de apenas ${hoursBetween}h (mínimo 11h)`,
        severity: 'critical',
        employeeId: employeeId,
        shiftIds: [currentShift.id, nextShift.id]
      });
    }
  }
  
  return violations;
}

function validateDSR(shifts: Shift[], employeeId: string): Violation[] {
  const violations: Violation[] = [];
  const employeeShifts = shifts.filter(s => s.employeeId === employeeId);
  
  // Agrupa turnos por semana
  const weeklyShifts: { [weekKey: string]: Shift[] } = {};
  
  employeeShifts.forEach(shift => {
    const date = parseISO(shift.startTime);
    const weekKey = `${date.getFullYear()}-W${Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)}`;
    
    if (!weeklyShifts[weekKey]) {
      weeklyShifts[weekKey] = [];
    }
    weeklyShifts[weekKey].push(shift);
  });
  
  // Verifica se há DSR em cada semana
  Object.entries(weeklyShifts).forEach(([weekKey, weekShifts]) => {
    const daysWorked = new Set();
    
    weekShifts.forEach(shift => {
      const date = parseISO(shift.startTime);
      daysWorked.add(date.toDateString());
    });
    
    if (daysWorked.size >= 7) {
      violations.push({
        code: 'DSR',
        message: `Semana ${weekKey}: Trabalhou 7 dias consecutivos sem DSR`,
        severity: 'critical',
        employeeId: employeeId,
        shiftIds: weekShifts.map(s => s.id)
      });
    }
  });
  
  return violations;
}

function validateWorkload(shifts: Shift[], employee: Employee): Violation[] {
  const violations: Violation[] = [];
  const employeeShifts = shifts.filter(s => s.employeeId === employee.id);
  
  let totalHours = 0;
  employeeShifts.forEach(shift => {
    const start = parseISO(shift.startTime);
    const end = parseISO(shift.endTime);
    totalHours += differenceInHours(end, start);
  });
  
  if (totalHours > employee.workload) {
    violations.push({
      code: 'WORKLOAD',
      message: `Carga horária excedida: ${totalHours}h (máximo ${employee.workload}h)`,
      severity: 'warning',
      employeeId: employee.id,
      shiftIds: employeeShifts.map(s => s.id)
    });
  }
  
  return violations;
}

// --- NOVA FUNÇÃO: Valida a Equidade na Distribuição ---
function validateEquity(shifts: Shift[], employees: Employee[]): { value: number; message: string; } {
  if (employees.length < 2) {
    return { value: 100, message: "A análise de equidade requer pelo menos 2 funcionários." };
  }

  const weekendShiftsPerEmployee: { [key: string]: number } = {};
  employees.forEach(e => weekendShiftsPerEmployee[e.id] = 0);

  shifts.forEach(shift => {
    const dayOfWeek = getDay(parseISO(shift.startTime)); // Domingo = 0, Sábado = 6
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (Object.prototype.hasOwnProperty.call(weekendShiftsPerEmployee, shift.employeeId)) {
        weekendShiftsPerEmployee[shift.employeeId]++;
      }
    }
  });

  const counts = Object.values(weekendShiftsPerEmployee);
  const totalShifts = counts.reduce((sum, count) => sum + count, 0);
  if (totalShifts === 0) {
      return { value: 100, message: "Distribuição perfeitamente equilibrada (sem turnos de fim de semana)." };
  }
  
  const mean = totalShifts / counts.length;
  const stdDev = Math.sqrt(counts.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / counts.length);
  
  // Normaliza o desvio padrão para uma pontuação de 0-100 (100 = perfeito)
  // Um desvio padrão de 2 ou mais é considerado muito injusto.
  const equityValue = Math.max(0, 100 - (stdDev * 50));
  
  let message = "Distribuição de turnos de fim de semana parece justa.";
  if (equityValue < 50) message = "A distribuição de turnos de fim de semana está muito desigual.";
  else if (equityValue < 75) message = "A distribuição de turnos de fim de semana pode ser melhorada.";

  return { value: Math.round(equityValue), message };
}

// --- Função Principal Atualizada ---
serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { shifts, employees }: InputData = await req.json();
    const allViolations: Violation[] = [];

    for (const employee of employees) {
      const violationsInterjornada = validateInterjornada(shifts, employee.id);
      const violationsDSR = validateDSR(shifts, employee.id);
      const violationsWorkload = validateWorkload(shifts, employee);
      allViolations.push(...violationsInterjornada, ...violationsDSR, ...violationsWorkload);
    }
    
    const riskScore = allViolations.reduce((score, v) => score + (v.severity === 'critical' ? 25 : 10), 0);

    // Chama a nova função de equidade
    const equityScore = validateEquity(shifts, employees);

    const response: OutputData = {
      riskScore: Math.min(riskScore, 100),
      equityScore: equityScore, // Adiciona o score de equidade à resposta
      violations: allViolations,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
