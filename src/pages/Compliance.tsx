// src/pages/Compliance.tsx
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getComplianceData } from '@/services/api'; // Ajustado para usar a função já implementada
import { useTenant } from '@/contexts/TenantContext'; // Ajustado para o contexto correto
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Schedule {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  shifts: Shift[];
}

interface Shift {
  id: string;
  start_time: string;
  end_time: string;
  date: string;
  employee_id: string;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  hourly_rate?: number;
}

interface ComplianceReport {
  criticalAlerts: number;
  warningAlerts: number;
  totalAlerts: number;
  violationTypes: Record<string, number>;
}

// Função auxiliar para processar as violações (pode ser movida para um arquivo de utils)
const processComplianceReport = (schedules: Schedule[], employees: Employee[]): ComplianceReport => {
    let criticalAlerts = 0;
    let warningAlerts = 0;
    const violationTypes: Record<string, number> = {};

    // Aqui, idealmente, você chamaria a sua função de validação para cada escala
    // Por simplicidade, vamos simular uma lógica de verificação
    schedules.forEach((schedule: Schedule) => {
        if (schedule.shifts && schedule.shifts.length > 10) { // Exemplo de regra simples
            criticalAlerts++;
            violationTypes['Jornada Excessiva'] = (violationTypes['Jornada Excessiva'] || 0) + 1;
        }
        if (schedule.shifts && schedule.shifts.some((s: Shift) => {
            const startTime = new Date(`2000-01-01T${s.start_time}`);
            const endTime = new Date(`2000-01-01T${s.end_time}`);
            if (endTime < startTime) endTime.setDate(endTime.getDate() + 1);
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            return duration > 8;
        })) { // Exemplo
            warningAlerts++;
            violationTypes['Turno Longo'] = (violationTypes['Turno Longo'] || 0) + 1;
        }
    });

    return { criticalAlerts, warningAlerts, totalAlerts: criticalAlerts + warningAlerts, violationTypes };
};

export default function Compliance() {
  const { currentTenant } = useTenant(); // Ajustado para usar currentTenant

  const { data, isLoading, isError } = useQuery({
    queryKey: ['complianceData', currentTenant?.id],
    queryFn: async () => {
      if (!currentTenant?.id) throw new Error('Empresa não configurada');
      const result = await getComplianceData(currentTenant.id);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    enabled: !!currentTenant?.id,
  });

  const report = useMemo(() => {
    if (!data?.schedules || !data?.employees) return null;
    return processComplianceReport(data.schedules, data.employees);
  }, [data]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  }

  if (isError || !report) {
    return <div className="text-center text-destructive">Ocorreu um erro ao gerar o relatório de compliance.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold">Relatório de Compliance</h1>
        <p className="text-muted-foreground">Uma visão geral da saúde trabalhista da sua operação.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Violações com alto risco de passivo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alertas</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.totalAlerts}</div>
            <p className="text-xs text-muted-foreground">Soma de todos os pontos de atenção.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Tipos de Violações Frequentes</CardTitle>
            <CardDescription>Principais pontos a serem corrigidos na sua operação.</CardDescription>
        </CardHeader>
        <CardContent>
            {Object.keys(report.violationTypes).length > 0 ? (
                <ul>
                                         {Object.entries(report.violationTypes).map(([type, count]) => (
                         <li key={type} className="flex justify-between py-2 border-b">
                             <span>{type}</span>
                             <span className="font-bold">{count as number} ocorrências</span>
                         </li>
                     ))}
                </ul>
            ) : (
                <div className="text-center py-10">
                    <ShieldCheck className="mx-auto h-12 w-12 text-green-500" />
                    <h3 className="mt-2 text-lg font-semibold">Parabéns!</h3>
                    <p className="text-muted-foreground">Não encontrámos nenhuma violação nas suas escalas.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}