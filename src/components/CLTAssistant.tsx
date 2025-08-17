import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCLTAssistant } from '@/hooks/useCLTAssistant';
import { cn } from '@/lib/utils';

// Importar componentes modulares
import { 
  CLTChatHeader, 
  CLTChatBubble, 
  CLTChatInput, 
  CLTSuggestions,
  CLTSources,
  CLTConfidence
} from '@/components/features';
import type { CLTMessage, CLTSource } from '@/types/clt';

interface CLTAssistantProps {
  className?: string;
  title?: string;
  placeholder?: string;
  showConfidence?: boolean;
  showSources?: boolean;
}

export const CLTAssistant: React.FC<CLTAssistantProps> = ({
  className = '',
  title = 'Assistente de IA - CLT',
  placeholder = 'Digite sua dúvida sobre legislação trabalhista...',
  showConfidence = true,
  showSources = true
}) => {
  const [messages, setMessages] = useState<CLTMessage[]>([]);
  const [currentSources, setCurrentSources] = useState<CLTSource[]>([]);
  const [currentConfidence, setCurrentConfidence] = useState(0.85);
  
  const { 
    isLoading, 
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

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;
    
    // Adicionar mensagem do usuário
    const userMessage: CLTMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simular resposta do bot (substituir pela chamada real da API)
    const botMessage: CLTMessage = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: 'Esta é uma resposta simulada. Implemente a integração real com a API do CLT Assistant.',
      timestamp: new Date().toISOString()
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
      setCurrentConfidence(0.85);
      setCurrentSources([
        {
          title: 'Art. 71 da CLT',
          content: 'Intervalo para repouso e alimentação',
          relevance: 0.9,
          url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm'
        }
      ]);
    }, 1000);
    
    await askQuestion(message);
  }, [isLoading, askQuestion]);

  const handleReset = useCallback(() => {
    setMessages([]);
    setCurrentSources([]);
    setCurrentConfidence(0.85);
    clearConversation();
  }, [clearConversation]);

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Header */}
      <CLTChatHeader
        onReset={handleReset}
        isOnline={true}
        lastUpdated={new Date().toLocaleDateString('pt-BR')}
      />
      
      <CardContent className="p-0">
        {/* Chat Messages */}
        <ScrollArea className="h-96">
          <div className="p-4 space-y-4">
            {messages.length === 0 ? (
              <CLTSuggestions onSuggestionClick={handleSendMessage} />
            ) : (
              <>
                {/* Messages */}
                {messages.map((message) => (
                  <CLTChatBubble
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={new Date(message.timestamp).toLocaleTimeString('pt-BR')}
                  />
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <CLTChatBubble
                    role="bot"
                    content=""
                    isLoading={true}
                  />
                )}
                
                {/* Confidence indicator for last bot message */}
                {showConfidence && messages.length > 0 && 
                 messages[messages.length - 1].role === 'bot' && 
                 !isLoading && (
                  <CLTConfidence confidence={currentConfidence} />
                )}
                
                {/* Sources for last bot message */}
                {showSources && currentSources.length > 0 && 
                 messages.length > 0 && 
                 messages[messages.length - 1].role === 'bot' && 
                 !isLoading && (
                  <CLTSources sources={currentSources} />
                )}
              </>
            )}
          </div>
        </ScrollArea>
        
        {/* Input */}
        <CLTChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={placeholder}
        />
      </CardContent>
    </Card>
  );
};
