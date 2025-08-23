import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Zap, 
  X, 
  ArrowRight, 
  Star,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { useTrialStatus } from '@/hooks/useTrialStatus';

interface TrialUpgradeBannerProps {
  variant?: 'trial-warning' | 'trial-expired' | 'trial-active';
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
    shouldShowUpgradeBanner,
    trialDuration
  } = useTrialStatus();

  // Se não deve mostrar o banner, não renderiza nada
  if (!shouldShowUpgradeBanner) {
    return null;
  }

  const handleUpgrade = () => {
    navigate('/pricing', { 
      state: { 
        highlightPlan: 'starter',
        reason: isTrialExpired ? 'trial_expired' : 'trial_warning'
      } 
    });
  };

  const getBannerContent = () => {
    if (isTrialExpired) {
      return {
        title: "Trial Expirado",
        description: `Seu período de teste de ${trialDuration} dias acabou. Faça upgrade para continuar usando todas as funcionalidades.`,
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        variant: "destructive" as const,
        features: [
          { icon: <Zap className="h-4 w-4" />, text: "IA para otimização de escalas" },
          { icon: <Shield className="h-4 w-4" />, text: "Compliance total com CLT" },
          { icon: <Users className="h-4 w-4" />, text: "Até 20 funcionários" },
        ],
        cta: "Fazer Upgrade Agora",
        urgency: "high"
      };
    }

    if (isTrialing && daysLeftInTrial <= 3) {
      return {
        title: `Apenas ${daysLeftInTrial} ${daysLeftInTrial === 1 ? 'dia' : 'dias'} restantes no trial`,
        description: `Não perca o acesso às funcionalidades premium. Faça upgrade agora e continue crescendo sem interrupções.`,
        icon: <Clock className="h-5 w-5 text-orange-500" />,
        variant: "warning" as const,
        features: [
          { icon: <Star className="h-4 w-4" />, text: "Funcionalidades premium" },
          { icon: <Calendar className="h-4 w-4" />, text: "Escalas ilimitadas" },
          { icon: <Users className="h-4 w-4" />, text: "Mais funcionários" },
        ],
        cta: "Fazer Upgrade",
        urgency: "medium"
      };
    }

    if (isTrialing) {
      return {
        title: `Trial Ativo - ${daysLeftInTrial} dias restantes`,
        description: `Aproveite ao máximo seu período de teste de ${trialDuration} dias. Descubra todas as funcionalidades premium.`,
        icon: <Star className="h-5 w-5 text-accent" />,
        variant: "default" as const,
        features: [
          { icon: <Zap className="h-4 w-4" />, text: "IA para otimização" },
          { icon: <Shield className="h-4 w-4" />, text: "Compliance avançado" },
          { icon: <Users className="h-4 w-4" />, text: "Gestão completa" },
        ],
        cta: "Ver Planos",
        urgency: "low"
      };
    }

    // Free plan (sem trial)
    return {
      title: "Desbloqueie o Potencial Completo",
      description: "Faça upgrade para acessar funcionalidades avançadas e escalar sua operação.",
      icon: <Zap className="h-5 w-5 text-primary" />,
      variant: "default" as const,
      features: [
        { icon: <Star className="h-4 w-4" />, text: "Funcionalidades premium" },
        { icon: <Calendar className="h-4 w-4" />, text: "Escalas ilimitadas" },
        { icon: <Users className="h-4 w-4" />, text: "Mais funcionários" },
      ],
      cta: "Ver Planos",
      urgency: "low"
    };
  };

  const content = getBannerContent();

  const getBannerStyle = () => {
    switch (content.variant) {
      case 'destructive':
        return 'border-l-4 border-l-destructive bg-gradient-to-r from-destructive/5 to-destructive/10';
      case 'warning':
        return 'border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20';
      default:
        return 'border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-primary/10';
    }
  };

  return (
    <Card className={`${getBannerStyle()} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {content.icon}
              <Badge variant="outline" className="border-primary/30 text-primary">
                {isTrialExpired ? 'Trial Expirado' : isTrialing ? 'Trial Ativo' : 'Upgrade'}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">
              {content.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-3">
              {content.description}
            </p>

            <div className="space-y-2 mb-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleUpgrade} 
                size="sm" 
                className={`${
                  content.urgency === 'high' 
                    ? 'bg-destructive hover:bg-destructive/90' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {content.cta}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              
              {onDismiss && (
                <Button 
                  onClick={onDismiss} 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="ml-4 text-right">
            <div className="text-2xl font-bold text-primary">
              {currentPlan === 'freemium' && isTrialing && 'R$ 49'}
              {currentPlan === 'freemium' && !isTrialing && 'R$ 49'}
            </div>
            <div className="text-xs text-muted-foreground">
              /mês
            </div>
            {isTrialing && (
              <div className="text-xs text-muted-foreground mt-1">
                Após trial
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
