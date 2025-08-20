// TEMPORARILY COMMENTED OUT - cltAssistantService was removed during refactoring
// This file will be restored when the CLT assistant functionality is reimplemented

/*
import { useState, useCallback } from 'react';
import { cltAssistantService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

interface UseCLTAssistantOptions {
  onAnswerReceived?: (answer: string) => void;
  onError?: (error: string) => void;
}

export const useCLTAssistant = (options: UseCLTAssistantOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    question: string;
    answer: string;
    timestamp: Date;
  }>>([]);
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim()) {
      const error = 'A pergunta não pode estar vazia';
      toast({
        title: 'Erro',
        description: error,
        variant: 'destructive',
      });
      options.onError?.(error);
      return null;
    }

    setIsLoading(true);
    trackEvent('clt_assistant_question_asked', { 
      questionLength: question.length,
      questionPreview: question.substring(0, 50)
    });

    try {
      const response = await cltAssistantService.askQuestion(question.trim());

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        const answer = response.data.answer;
        setCurrentAnswer(answer);
        
        // Add to conversation history
        const newConversation = {
          question: question.trim(),
          answer,
          timestamp: new Date(),
        };
        
        setConversationHistory(prev => [...prev, newConversation]);
        
        options.onAnswerReceived?.(answer);

        // Track successful answer
        trackEvent('clt_assistant_answer_received', {
          answerLength: answer.length,
          conversationLength: conversationHistory.length + 1
        });

        return answer;
      }

      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no assistente';
      
      toast({
        title: 'Erro no Assistente',
        description: errorMessage,
        variant: 'destructive',
      });

      trackEvent('clt_assistant_error', { error: errorMessage });
      options.onError?.(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast, trackEvent, options, conversationHistory.length]);

  const clearConversation = useCallback(() => {
    setConversationHistory([]);
    setCurrentAnswer(null);
    trackEvent('clt_assistant_conversation_cleared');
  }, [trackEvent]);

  const getConversationSummary = useCallback(() => {
    return {
      totalQuestions: conversationHistory.length,
      lastQuestion: conversationHistory[conversationHistory.length - 1]?.question || null,
      lastAnswer: conversationHistory[conversationHistory.length - 1]?.answer || null,
      lastTimestamp: conversationHistory[conversationHistory.length - 1]?.timestamp || null,
    };
  }, [conversationHistory]);

  return {
    isLoading,
    currentAnswer,
    conversationHistory,
    askQuestion,
    clearConversation,
    getConversationSummary,
  };
};
*/

// Temporary placeholder export
export const useCLTAssistant = () => {
  return {
    isLoading: false,
    currentAnswer: null,
    conversationHistory: [],
    askQuestion: async () => null,
    clearConversation: () => {},
    getConversationSummary: () => ({
      totalQuestions: 0,
      lastQuestion: null,
      lastAnswer: null,
      lastTimestamp: null,
    }),
  };
};
