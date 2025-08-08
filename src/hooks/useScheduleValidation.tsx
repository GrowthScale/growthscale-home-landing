import { useState, useCallback } from 'react';
import { scheduleService, type Shift, type EmployeeForValidation, type ValidationResult } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

interface UseScheduleValidationOptions {
  onValidationComplete?: (result: ValidationResult) => void;
  onError?: (error: string) => void;
}

export const useScheduleValidation = (options: UseScheduleValidationOptions = {}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  const validateSchedule = useCallback(async (
    shifts: Shift[],
    employees: EmployeeForValidation[]
  ) => {
    if (shifts.length === 0 || employees.length === 0) {
      const error = 'Dados insuficientes para validação';
      toast({
        title: 'Erro na validação',
        description: error,
        variant: 'destructive',
      });
      options.onError?.(error);
      return null;
    }

    setIsValidating(true);
    trackEvent('schedule_validation_started', { 
      shiftsCount: shifts.length, 
      employeesCount: employees.length 
    });

    try {
      const response = await scheduleService.validateSchedule({ shifts, employees });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setValidationResult(response.data);
        options.onValidationComplete?.(response.data);

        // Track validation result
        trackEvent('schedule_validation_completed', {
          riskScore: response.data.riskScore,
          violationsCount: response.data.violations.length,
          criticalViolations: response.data.violations.filter(v => v.severity === 'critical').length,
          warningViolations: response.data.violations.filter(v => v.severity === 'warning').length,
        });

        // Show toast based on risk score
        if (response.data.riskScore > 75) {
          toast({
            title: '⚠️ Alto risco de violações',
            description: `${response.data.violations.length} violações encontradas. Revise a escala.`,
            variant: 'destructive',
          });
        } else if (response.data.riskScore > 50) {
          toast({
            title: '⚠️ Risco moderado',
            description: `${response.data.violations.length} violações encontradas.`,
            variant: 'default',
          });
        } else {
          toast({
            title: '✅ Baixo risco',
            description: 'Escala em conformidade com a legislação.',
            variant: 'default',
          });
        }

        return response.data;
      }

      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na validação';
      
      toast({
        title: 'Erro na validação',
        description: errorMessage,
        variant: 'destructive',
      });

      trackEvent('schedule_validation_error', { error: errorMessage });
      options.onError?.(errorMessage);
      return null;
    } finally {
      setIsValidating(false);
    }
  }, [toast, trackEvent, options]);

  const clearValidation = useCallback(() => {
    setValidationResult(null);
  }, []);

  const getRiskLevel = useCallback((riskScore: number) => {
    if (riskScore > 75) return 'high';
    if (riskScore > 50) return 'medium';
    return 'low';
  }, []);

  const getRiskColor = useCallback((riskScore: number) => {
    if (riskScore > 75) return 'text-red-600';
    if (riskScore > 50) return 'text-yellow-600';
    return 'text-green-600';
  }, []);

  const getRiskLabel = useCallback((riskScore: number) => {
    if (riskScore > 75) return 'Alto Risco';
    if (riskScore > 50) return 'Risco Moderado';
    return 'Baixo Risco';
  }, []);

  return {
    isValidating,
    validationResult,
    validateSchedule,
    clearValidation,
    getRiskLevel,
    getRiskColor,
    getRiskLabel,
  };
};
