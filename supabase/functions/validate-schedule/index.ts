// supabase/functions/validate-schedule/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { differenceInHours, addDays, eachDayOfInterval, parseISO, compareAsc } from "https://deno.land/x/date_fns@v2.29.3/index.js";

// --- Tipos de Dados (Input/Output) ---
interface Shift {
  id: string;
  employeeId: string;
  startTime: string; // Formato ISO 8601
  endTime: string;   // Formato ISO 8601
}

interface Employee {
  id: string;
  workload: number; // Carga horária semanal contratada
}

interface InputData {
  shifts: Shift[];
  employees: Employee[];
}

interface Violation {
  code: string;
  message: string;
  severity: 'critical' | 'warning';
  employeeId: string;
  shiftIds: string[];
}

interface OutputData {
  riskScore: number;
  violations: Violation[];
}

// --- Funções de Validação (Lógica Principal) ---

// 1. Valida o intervalo de 11h entre turnos
function validateInterjornada(shifts: Shift[], employeeId: string): Violation[] {
  const violations: Violation[] = [];
  const employeeShifts = shifts
    .filter(s => s.employeeId === employeeId)
    .sort((a, b) => compareAsc(parseISO(a.startTime), parseISO(b.startTime)));

  for (let i = 0; i < employeeShifts.length - 1; i++) {
    const currentShift = employeeShifts[i];
    const nextShift = employeeShifts[i + 1];

    const hoursBetween = differenceInHours(parseISO(nextShift.startTime), parseISO(currentShift.endTime));

    if (hoursBetween < 11) {
      violations.push({
        code: "ERR_INTERJORNADA_11H",
        message: `Intervalo entre turnos inferior a 11 horas.`,
        severity: 'critical',
        employeeId: employeeId,
        shiftIds: [currentShift.id, nextShift.id],
      });
    }
  }
  return violations;
}

// 2. Valida o Descanso Semanal Remunerado (DSR)
function validateDSR(shifts: Shift[], employeeId: string): Violation[] {
  const violations: Violation[] = [];
  const employeeShifts = shifts.filter(s => s.employeeId === employeeId);
  if (employeeShifts.length === 0) return [];

  const firstDay = parseISO(employeeShifts.sort((a, b) => compareAsc(parseISO(a.startTime), parseISO(b.startTime)))[0].startTime);

  // Analisa em janelas de 7 dias
  for (let i = 0; i < 3; i++) { // Analisa 3 semanas para cobrir o mês
      const startOfWeek = addDays(firstDay, i * 7);
      const endOfWeek = addDays(startOfWeek, 6);

      const shiftsInWindow = employeeShifts.filter(s => {
          const shiftStart = parseISO(s.startTime);
          return compareAsc(shiftStart, startOfWeek) >= 0 && compareAsc(shiftStart, endOfWeek) <= 0;
      });

      if (shiftsInWindow.length > 0) {
          const daysWithShifts = new Set(shiftsInWindow.map(s => parseISO(s.startTime).getUTCDate()));
          if (daysWithShifts.size > 6) {
               violations.push({
                  code: "ERR_DSR_7D",
                  message: `Mais de 6 dias trabalhados em um período de 7 dias.`,
                  severity: 'critical',
                  employeeId: employeeId,
                  shiftIds: shiftsInWindow.map(s => s.id),
              });
          }
      }
  }
  return violations;
}


// 3. Valida a carga horária semanal
function validateWorkload(shifts: Shift[], employee: Employee): Violation[] {
    // Lógica simplificada: Soma todas as horas e compara com a média.
    // Uma implementação real agruparia por semana do calendário.
    const totalHours = shifts
        .filter(s => s.employeeId === employee.id)
        .reduce((acc, shift) => {
            return acc + differenceInHours(parseISO(shift.endTime), parseISO(shift.startTime));
        }, 0);
    
    // Assumindo um período de 4 semanas para a média
    if ((totalHours / 4) > employee.workload) {
        return [{
            code: "WARN_OVERTIME",
            message: `Carga horária semanal média superior a ${employee.workload} horas.`,
            severity: 'warning',
            employeeId: employee.id,
            shiftIds: shifts.filter(s => s.employeeId === employee.id).map(s => s.id),
        }];
    }
    return [];
}


// --- Função Principal ---
serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { shifts, employees }: InputData = await req.json();
    let allViolations: Violation[] = [];

    for (const employee of employees) {
      const violationsInterjornada = validateInterjornada(shifts, employee.id);
      const violationsDSR = validateDSR(shifts, employee.id);
      const violationsWorkload = validateWorkload(shifts, employee);

      allViolations = [
        ...allViolations,
        ...violationsInterjornada,
        ...violationsDSR,
        ...violationsWorkload
      ];
    }
    
    // Calcula o Risk Score
    const riskScore = allViolations.reduce((score, violation) => {
        return score + (violation.severity === 'critical' ? 25 : 10);
    }, 0);

    const response: OutputData = {
      riskScore: Math.min(riskScore, 100), // Limita o score a 100
      violations: allViolations,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
