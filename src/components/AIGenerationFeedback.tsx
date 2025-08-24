import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar,
  Zap,
  Loader2
} from 'lucide-react';

interface AIGenerationFeedbackProps {
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  employeesCount: number;
  onComplete?: () => void;
}

const steps = [
  { id: 1, name: 'Analisando funcionários', icon: Users, duration: 1000 },
  { id: 2, name: 'Calculando turnos', icon: Clock, duration: 1500 },
  { id: 3, name: 'Otimizando distribuição', icon: Brain, duration: 2000 },
  { id: 4, name: 'Aplicando regras CLT', icon: Sparkles, duration: 1200 },
  { id: 5, name: 'Gerando escala final', icon: Calendar, duration: 800 },
];

export function AIGenerationFeedback({ 
  isGenerating, 
  progress, 
  currentStep, 
  employeesCount,
  onComplete 
}: AIGenerationFeedbackProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < steps.length - 1) {
          const nextStep = prev + 1;
          setCompletedSteps(prev => [...prev, prev]);
          return nextStep;
        } else {
          setCompletedSteps(prev => [...prev, prev]);
          onComplete?.();
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isGenerating, onComplete]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-primary to-accent p-4 rounded-full">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              IA em Ação!
            </h2>
            <p className="text-muted-foreground">
              Criando sua primeira escala automaticamente
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {Math.round(progress)}% concluído
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = index === currentStepIndex;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-50 border border-green-200'
                      : isCurrent
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-muted/50 border border-muted'
                  }`}
                >
                  <div className={`flex-shrink-0 ${
                    isCompleted
                      ? 'text-green-600'
                      : isCurrent
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : isCurrent ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isCompleted
                        ? 'text-green-800'
                        : isCurrent
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  {isCurrent && (
                    <Badge variant="secondary" className="text-xs">
                      Em andamento
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted/30 rounded-lg p-3">
              <Users className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium">{employeesCount}</p>
              <p className="text-xs text-muted-foreground">Funcionários</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium">7 dias</p>
              <p className="text-xs text-muted-foreground">Próxima semana</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>Otimizando com inteligência artificial</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
