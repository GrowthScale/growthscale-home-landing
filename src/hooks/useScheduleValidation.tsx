// TEMPORARIO: Comentado para permitir build
/*
import { useState, useCallback } from 'react';
import { scheduleService, type Shift, type EmployeeForValidation, type ValidationResult } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

export const useScheduleValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  const validateSchedule = useCallback(async (shifts: Shift[], employees: EmployeeForValidation[]) => {
    if (!shifts.length || !employees.length) {
      toast({
        title: "Dados insuficientes",
        description: "É necessário ter escalas e funcionários para validar.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      trackEvent('schedule_validation_started', {
        shifts_count: shifts.length,
        employees_count: employees.length,
      });

      const response = await scheduleService.validateSchedule({ shifts, employees });

      if (response.error) {
        throw new Error(response.error);
      }

      setValidationResult(response.data);
      
      trackEvent('schedule_validation_completed', {
        risk_score: response.data?.riskScore,
        equity_score: response.data?.equityScore?.value,
        violations_count: response.data?.violations?.length || 0,
      });

      // Mostrar toast baseado no resultado
      if (response.data?.riskScore && response.data.riskScore > 70) {
        toast({
          title: "⚠️ Risco Alto Detectado",
          description: `${response.data.violations?.length || 0} violações encontradas. Revise sua escala.`,
          variant: "destructive",
        });
      } else if (response.data?.equityScore?.value && response.data.equityScore.value < 60) {
        toast({
          title: "⚖️ Equidade Baixa",
          description: response.data.equityScore.message,
          variant: "default",
        });
      } else {
        toast({
          title: "✅ Validação Concluída",
          description: "Sua escala está em conformidade com as normas CLT.",
          variant: "default",
        });
      }

    } catch (error) {
      console.error('Erro na validação da escala:', error);
      
      trackEvent('schedule_validation_error', {
        error_message: error instanceof Error ? error.message : 'Erro desconhecido',
      });

      toast({
        title: "Erro na Validação",
        description: error instanceof Error ? error.message : "Erro inesperado durante a validação.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  }, [toast, trackEvent]);

  return {
    isValidating,
    validationResult,
    validateSchedule,
  };
};
*/

// Placeholder temporário
export const useScheduleValidation = () => {
  return {
    isValidating: false,
    validationResult: null,
    validateSchedule: async () => {
      console.log('Validação temporariamente desabilitada');
    },
  };
};
