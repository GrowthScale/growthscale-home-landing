import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bot, 
  Send, 
  MessageSquare, 
  Trash2, 
  Lightbulb,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useCLTAssistant } from '@/hooks/useCLTAssistant';
import { cn } from '@/lib/utils';

interface CLTAssistantProps {
  className?: string;
  title?: string;
  placeholder?: string;
}

const SUGGESTED_QUESTIONS = [
  "O que é intervalo interjornada?",
  "Como funciona o DSR?",
  "Quantas horas extras posso pagar por mês?",
  "O que acontece se não pagar horas extras?",
  "Como calcular férias de funcionário?",
  "Qual é o limite de horas de trabalho por dia?",
  "Como funciona o trabalho noturno?",
  "O que é adicional de periculosidade?"
];

export const CLTAssistant: React.FC<CLTAssistantProps> = ({
  className = '',
  title = 'Assistente de IA - CLT',
  placeholder = 'Digite sua dúvida sobre legislação trabalhista...'
}) => {
  const [question, setQuestion] = useState('');
  const { 
    isLoading, 
    currentAnswer, 
    conversationHistory, 
    askQuestion, 
    clearConversation 
  } = useCLTAssistant({
    onAnswerReceived: (answer) => {
      // Auto-scroll to bottom when answer is received
      setTimeout(() => {
        const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollArea) {
          scrollArea.scrollTop = scrollArea.scrollHeight;
        }
      }, 100);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    
    await askQuestion(question);
    setQuestion('');
  };

  const handleSuggestedQuestion = async (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion);
    await askQuestion(suggestedQuestion);
  };

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tire suas dúvidas sobre legislação trabalhista brasileira com foco em food service
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Histórico da Conversa</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={clearConversation}
                className="text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            </div>
            
            <ScrollArea className="h-96 border rounded-lg p-4">
              <div className="space-y-4">
                {conversationHistory.map((conversation, index) => (
                  <div key={index} className="space-y-2">
                    {/* Question */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <MessageSquare className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {conversation.question}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.timestamp.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Answer */}
                    <div className="flex items-start gap-2 ml-8">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {conversation.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2 ml-8">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Suggested Questions */}
        {conversationHistory.length === 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <h3 className="text-sm font-medium">Perguntas Sugeridas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map((suggestedQuestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(suggestedQuestion)}
                  disabled={isLoading}
                  className="justify-start text-left h-auto p-3"
                >
                  <span className="text-xs">{suggestedQuestion}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 min-h-[80px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              disabled={!question.trim() || isLoading}
              className="self-end"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {conversationHistory.length > 0 && (
                `${conversationHistory.length} pergunta${conversationHistory.length > 1 ? 's' : ''} nesta sessão`
              )}
            </span>
            <span>Pressione Enter para enviar, Shift+Enter para nova linha</span>
          </div>
        </form>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <strong>Importante:</strong> Este assistente fornece orientações informativas sobre a CLT. 
            Para questões específicas ou conselhos jurídicos, consulte um profissional de direito ou contabilidade.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
