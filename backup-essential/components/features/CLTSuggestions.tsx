import React from 'react';
import { Lightbulb, Clock, Users, Calculator, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CLTSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
  maxSuggestions?: number;
}

interface SuggestionItem {
  text: string;
  icon: React.ElementType;
  category: 'interval' | 'overtime' | 'breaks' | 'payroll' | 'compliance' | 'general';
}

export function CLTSuggestions({ 
  onSuggestionClick, 
  className = '',
  maxSuggestions = 6 
}: CLTSuggestionsProps) {
  const allSuggestions: SuggestionItem[] = [
    {
      text: "Qual o intervalo mínimo para refeição?",
      icon: Clock,
      category: 'interval'
    },
    {
      text: "Como funciona o cálculo de hora extra?",
      icon: Calculator,
      category: 'overtime'
    },
    {
      text: "Posso dar duas folgas seguidas para um funcionário?",
      icon: Users,
      category: 'breaks'
    },
    {
      text: "Qual o limite de horas extras por mês?",
      icon: Clock,
      category: 'overtime'
    },
    {
      text: "Como calcular adicional noturno?",
      icon: Calculator,
      category: 'payroll'
    },
    {
      text: "Quais são as obrigações do empregador na CLT?",
      icon: Shield,
      category: 'compliance'
    },
    {
      text: "Como funciona o banco de horas?",
      icon: Clock,
      category: 'overtime'
    },
    {
      text: "Qual a documentação obrigatória para funcionários?",
      icon: FileText,
      category: 'compliance'
    },
    {
      text: "Como calcular férias e 1/3?",
      icon: Calculator,
      category: 'payroll'
    },
    {
      text: "Posso demitir um funcionário sem justa causa?",
      icon: Shield,
      category: 'compliance'
    },
    {
      text: "Como funciona o trabalho aos domingos?",
      icon: Clock,
      category: 'general'
    },
    {
      text: "Qual o prazo para pagar salário?",
      icon: Calculator,
      category: 'payroll'
    }
  ];

  const suggestions = allSuggestions.slice(0, maxSuggestions);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lightbulb className="w-4 h-4 text-yellow-500" />
        <span className="font-medium">Sugestões de perguntas:</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="h-auto p-3 text-left justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start gap-3 w-full">
                <Icon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  {suggestion.text}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
      
      {suggestions.length < allSuggestions.length && (
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Aqui você pode implementar lógica para mostrar mais sugestões
              if (process.env.NODE_ENV === 'development') { console.log('Mostrar mais sugestões'); }
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            Ver mais sugestões
          </Button>
        </div>
      )}
    </div>
  );
}
