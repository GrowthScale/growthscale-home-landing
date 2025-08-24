import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  Brain, 
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';

interface OnboardingSuccessProps {
  employeesCount: number;
  scheduleName: string;
  shiftsCount: number;
  onViewSchedule: () => void;
  onGoToDashboard: () => void;
}

export function OnboardingSuccess({
  employeesCount,
  scheduleName,
  shiftsCount,
  onViewSchedule,
  onGoToDashboard
}: OnboardingSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-gradient-to-br from-white to-green-50/50">
        <CardHeader className="text-center pb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-full">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-foreground mb-4">
            🎉 Setup Concluído com Sucesso!
          </CardTitle>
          
          <p className="text-lg text-muted-foreground">
            Sua empresa está pronta para começar a usar o GrowthScale
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* AI Success Highlight */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  IA em Ação!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sua primeira escala foi criada automaticamente
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{scheduleName}</p>
                  <p className="text-sm text-muted-foreground">Escala criada</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{employeesCount}</p>
                  <p className="text-sm text-muted-foreground">Funcionários</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{shiftsCount}</p>
                  <p className="text-sm text-muted-foreground">Turnos gerados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Próximos passos recomendados:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Ver Escala Gerada</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Revise e ajuste a escala criada pela IA
                  </p>
                  <Button 
                    onClick={onViewSchedule}
                    className="w-full"
                    size="sm"
                  >
                    Ver Escala
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Zap className="h-5 w-5 text-accent" />
                    <h4 className="font-medium">Ir para Dashboard</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Acesse todas as funcionalidades da plataforma
                  </p>
                  <Button 
                    onClick={onGoToDashboard}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Highlight */}
          <div className="bg-muted/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              O que você pode fazer agora:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Gerenciar funcionários</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Criar novas escalas</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Usar IA para otimização</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Ver relatórios de compliance</span>
              </div>
            </div>
          </div>

          {/* Success Badge */}
          <div className="text-center">
            <Badge variant="secondary" className="px-6 py-3 text-base">
              <CheckCircle className="h-4 w-4 mr-2" />
              Empresa configurada com sucesso!
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
