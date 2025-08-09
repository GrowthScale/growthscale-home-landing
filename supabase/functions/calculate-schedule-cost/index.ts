// supabase/functions/calculate-schedule-cost/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { differenceInHours, getDay } from "https://deno.land/x/date_fns@v2.29.3/index.js";

// --- Tipos de Dados ---
interface Shift {
  employeeId: string;
  startTime: string; // Formato ISO 8601
  endTime: string;
}

interface Employee {
  id: string;
  workload: number;
  hourlyRate: number; // Valor da hora do funcionário
}

interface InputData {
  shifts: Shift[];
  employees: Employee[];
}

const OVERTIME_MULTIPLIER = 1.5;
const NIGHTLY_MULTIPLIER = 1.2;

serve(async (req) => {
  try {
    const { shifts, employees }: InputData = await req.json();
    let totalCost = 0;
    let baseCost = 0;
    let overtimeCost = 0;
    let nightlyCost = 0;

    for (const employee of employees) {
      const employeeShifts = shifts.filter(s => s.employeeId === employee.id);
      let weeklyHours = 0;

      for (const shift of employeeShifts) {
        const start = new Date(shift.startTime);
        const end = new Date(shift.endTime);
        const shiftDuration = differenceInHours(end, start);
        
        let shiftBaseHours = shiftDuration;
        let shiftOvertimeHours = 0;

        // Lógica de Horas Extras (simplificada)
        if (weeklyHours + shiftDuration > employee.workload) {
          shiftOvertimeHours = (weeklyHours + shiftDuration) - employee.workload;
          shiftBaseHours = shiftDuration - shiftOvertimeHours;
        }
        weeklyHours += shiftDuration;

        baseCost += shiftBaseHours * employee.hourlyRate;
        overtimeCost += shiftOvertimeHours * employee.hourlyRate * OVERTIME_MULTIPLIER;

        // Lógica de Adicional Noturno (simplificada)
        // Checa se parte do turno ocorre entre 22h e 5h
        if (start.getHours() >= 22 || end.getHours() <= 5) {
            // Assume 100% do custo base do turno como noturno para simplificar
            nightlyCost += (shiftBaseHours + shiftOvertimeHours) * employee.hourlyRate * (NIGHTLY_MULTIPLIER - 1);
        }
      }
    }

    totalCost = baseCost + overtimeCost + nightlyCost;

    return new Response(JSON.stringify({
      totalCost,
      breakdown: { baseCost, overtimeCost, nightlyCost }
    }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
