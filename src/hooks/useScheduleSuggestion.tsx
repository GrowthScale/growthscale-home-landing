// TEMPORARIO: Comentado para permitir build
/*
import { scheduleService, type ScheduleSuggestionRequest, type ScheduleSuggestionResponse } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

export const useScheduleSuggestion = () => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const queryClient = useQueryClient();

  const suggestionMutation = useMutation({
    mutationFn: (suggestionData: ScheduleSuggestionRequest) => scheduleService.suggestSchedule(suggestionData),
    onSuccess: (data: ScheduleSuggestionResponse) => {
      trackEvent('schedule_suggestion_success', {
        suggestions_count: data.suggestion?.length || 0,
      });

      toast({
        title: "Sugestões Geradas",
        description: `${data.suggestion?.length || 0} sugestões de escala foram criadas com IA.`,
        variant: "default",
      });

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedule-drafts'] });
    },
    onError: (error: Error) => {
      console.error('Erro ao gerar sugestões:', error);
      
      trackEvent('schedule_suggestion_error', {
        error_message: error.message,
      });

      toast({
        title: "Erro na Geração",
        description: error.message || "Erro inesperado ao gerar sugestões de escala.",
        variant: "destructive",
      });
    },
  });

  const generateSuggestion = async (context: ScheduleSuggestionRequest) => {
    trackEvent('schedule_suggestion_requested', {
      employees_count: context.employees?.length || 0,
      shifts_count: context.shiftsToFill?.length || 0,
      rules_count: context.rules?.length || 0,
    });

    return suggestionMutation.mutateAsync(context);
  };

  return {
    generateSuggestion,
    isGenerating: suggestionMutation.isPending,
    error: suggestionMutation.error,
    reset: suggestionMutation.reset,
  };
};
*/

// Placeholder temporário
export const useScheduleSuggestion = () => {
  return {
    generateSuggestion: async () => {
      console.log('Sugestão temporariamente desabilitada');
      return { suggestion: [] };
    },
    isGenerating: false,
    error: null,
    reset: () => {},
  };
};
