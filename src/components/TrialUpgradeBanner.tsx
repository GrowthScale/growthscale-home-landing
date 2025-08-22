import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Clock, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Calendar,
  ArrowRight,
  X
} from 'lucide-react';
import { useTrialStatus } from '@/hooks/useTrialStatus';

interface TrialUpgradeBannerProps {
  variant?: 'trial-warning' | 'trial-expired' | 'free-plan' | 'feature-limit';
  onDismiss?: () => void;
  className?: string;
}

export function TrialUpgradeBanner({ 
  variant = 'trial-warning', 
  onDismiss,
  className = ''
}: TrialUpgradeBannerProps) {
  const navigate = useNavigate();
  const { 
    isTrialing, 
    isTrialExpired, 
    daysLeftInTrial, 
    currentPlan,
    shouldShowUpgradeBanner 
  } = useTrialStatus();

  // Se não deve mostrar o banner, não renderiza nada
  if (!shouldShowUpgradeBanner) {
    return null;
  }

  const handleUpgrade = () => {
    navigate('/dashboard/billing');
  };

  const getBannerContent = () => {
    if (isTrialExpired) {
      return {
        title: "Trial Expirado",
        description: "Seu período de teste acabou. Faça upgrade para continuar usando todas as funcionalidades.",
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        variant: "destructive" as const,
        features: [
          { icon: <Zap className="h-4 w-4" />, text: "IA para otimização de escalas" },
          { icon: <Shield className="h-4 w-4" />, text: "Compliance total com CLT" },
          { icon: <Users className="h-4 w-4" />, text: "Até 100 funcionários" },
        ]
      };
    }

    if (isTrialing && daysLeftInTrial <= 3) {
      return {
        title: `Apenas ${daysLeftInTrial} ${daysLeftInTrial === 1 ? 'dia' : 'dias'} restantes no trial`,
        description: "Não perca o acesso às funcionalidades premium. Faça upgrade agora e continue crescendo.",
        icon: <Clock className="h-5 w-5 text-orange-500" />,
        variant: "default" as const,
        features: [
          { icon: <Star className="h-4 w-4" />, text: "Funcionalidades premium" },
          { icon: <Calendar className="h-4 w-4" />, text: "Escalas ilimitadas" },
          { icon: <Users className="h-4 w-4" />, text: "Mais funcionários" },
        ]
      };
    }

    if (isTrialing) {
      return {
        title: `Trial Ativo - ${daysLeftInTrial} dias restantes`,
        description: "Aproveite ao máximo seu período de teste. Descubra todas as funcionalidades premium.",
        icon: <Star className="h-5 w-5 text-accent" />,
        variant: "default" as const,
        features: [
          { icon: <Zap className="h-4 w-4" />, text: "IA para otimização" },
          { icon: <Shield className="h-4 w-4" />, text: "Compliance avançado" },
          { icon: <Users className="h-4 w-4" />, text: "Gestão completa" },
        ]
      };
    }

    // Free plan
    return {
      title: "Desbloqueie o Potencial Completo",
      description: "Faça upgrade para acessar funcionalidades avançadas e escalar sua operação.",
      icon: <Zap className="h-5 w-5 text-primary" />,
      variant: "default" as const,
      features: [
        { icon: <Star className="h-4 w-4" />, text: "Funcionalidades premium" },
        { icon: <Calendar className="h-4 w-4" />, text: "Escalas ilimitadas" },
        { icon: <Users className="h-4 w-4" />, text: "Mais funcionários" },
      ]
    };
  };

  const content = getBannerContent();

  return (
    <Card className={`border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              {content.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {content.title}
                </h3>
                {isTrialing && (
                  <Badge variant="secondary" className="text-xs">
                    Trial
                  </Badge>
                )}
                {isTrialExpired && (
                  <Badge variant="destructive" className="text-xs">
                    Expirado
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {content.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Button 
                  onClick={handleUpgrade}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  {isTrialExpired ? 'Fazer Upgrade Agora' : 'Ver Planos'}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
                
                {!isTrialExpired && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/dashboard/billing')}
                  >
                    Comparar Planos
                  </Button>
                )}
              </div>
            </div>
          </div>

          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
