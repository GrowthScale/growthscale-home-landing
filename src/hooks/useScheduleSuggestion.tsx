import { useState, useCallback } from 'react';
import { scheduleService, type ScheduleSuggestionRequest, type ScheduleSuggestionResponse } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

interface UseScheduleSuggestionOptions {
  onSuggestionComplete?: (suggestion: ScheduleSuggestionResponse) => void;
  onError?: (error: string) => void;
}

export const useScheduleSuggestion = (options: UseScheduleSuggestionOptions = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<ScheduleSuggestionResponse | null>(null);
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  const generateSuggestion = useCallback(async (suggestionData: ScheduleSuggestionRequest) => {
    if (!suggestionData.employees || suggestionData.employees.length === 0) {
      const error = 'É necessário pelo menos um funcionário para gerar sugestões';
      toast({
        title: 'Erro na sugestão',
        description: error,
        variant: 'destructive',
      });
      options.onError?.(error);
      return null;
    }

    if (!suggestionData.shiftsToFill || suggestionData.shiftsToFill.length === 0) {
      const error = 'É necessário pelo menos um turno para gerar sugestões';
      toast({
        title: 'Erro na sugestão',
        description: error,
        variant: 'destructive',
      });
      options.onError?.(error);
      return null;
    }

    setIsGenerating(true);
    trackEvent('schedule_suggestion_started', { 
      employeesCount: suggestionData.employees.length,
      shiftsCount: suggestionData.shiftsToFill.length,
      rulesCount: suggestionData.rules.length
    });

    try {
      const response = await scheduleService.suggestSchedule(suggestionData);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setCurrentSuggestion(response.data);
        options.onSuggestionComplete?.(response.data);

        // Track successful suggestion
        trackEvent('schedule_suggestion_completed', {
          suggestionsCount: response.data.suggestion.length,
          employeesCount: suggestionData.employees.length,
          shiftsCount: suggestionData.shiftsToFill.length
        });

        // Show success toast
        toast({
          title: 'Sugestão Gerada!',
          description: `${response.data.suggestion.length} alocações sugeridas para ${suggestionData.shiftsToFill.length} turnos.`,
          variant: 'default',
        });

        return response.data;
      }

      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na sugestão';
      
      toast({
        title: 'Erro na Sugestão',
        description: errorMessage,
        variant: 'destructive',
      });

      trackEvent('schedule_suggestion_error', { error: errorMessage });
      options.onError?.(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [toast, trackEvent, options]);

  const clearSuggestion = useCallback(() => {
    setCurrentSuggestion(null);
    trackEvent('schedule_suggestion_cleared');
  }, [trackEvent]);

  const getSuggestionSummary = useCallback(() => {
    if (!currentSuggestion) return null;

    const totalSuggestions = currentSuggestion.suggestion.length;
    const uniqueEmployees = new Set(currentSuggestion.suggestion.map(s => s.employeeId)).size;
    const uniqueShifts = new Set(currentSuggestion.suggestion.map(s => s.shiftId)).size;

    return {
      totalSuggestions,
      uniqueEmployees,
      uniqueShifts,
      coverage: (uniqueShifts / totalSuggestions) * 100
    };
  }, [currentSuggestion]);

  return {
    isGenerating,
    currentSuggestion,
    generateSuggestion,
    clearSuggestion,
    getSuggestionSummary,
  };
};
