import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Zap, 
  X, 
  ArrowRight, 
  Star,
  Users,
  Brain,
  Shield
} from 'lucide-react';
import { useFeatureGating, type PlanType } from '@/hooks/useFeatureGating';

interface UpgradeBannerProps {
  variant?: 'default' | 'feature-limit' | 'usage-limit';
  feature?: string;
  limitType?: 'employees' | 'branches' | 'schedules';
  className?: string;
}

export function UpgradeBanner({ 
  variant = 'default', 
  feature, 
  limitType,
  className = '' 
}: UpgradeBannerProps) {
  const navigate = useNavigate();
  const { currentPlan, planLimits, getLimitInfo } = useFeatureGating();
  const [isVisible, setIsVisible] = useState(true);

  const getUpgradeMessage = () => {
    switch (variant) {
      case 'feature-limit':
        return `Funcionalidade ${feature} disponível apenas em planos superiores`;
      case 'usage-limit':
        if (limitType) {
          const info = getLimitInfo(limitType);
          return `Você atingiu o limite de ${limitType} do seu plano atual`;
        }
        return 'Você atingiu um limite do seu plano atual';
      default:
        return 'Desbloqueie todo o potencial do GrowthScale';
    }
  };

  const getNextPlan = (): PlanType => {
    switch (currentPlan) {
      case 'freemium':
        return 'starter';
      case 'starter':
        return 'professional';
      case 'professional':
        return 'enterprise';
      default:
        return 'enterprise';
    }
  };

  const getPlanFeatures = (plan: PlanType) => {
    const features = {
      starter: [
        { icon: Users, text: 'Até 10 funcionários' },
        { icon: Brain, text: 'IA para escalas' },
        { icon: Shield, text: 'Compliance automático' },
      ],
      professional: [
        { icon: Users, text: 'Até 25 funcionários' },
        { icon: Brain, text: 'IA avançada' },
        { icon: Star, text: 'Analytics completos' },
      ],
      enterprise: [
        { icon: Users, text: 'Funcionários ilimitados' },
        { icon: Crown, text: 'Suporte dedicado' },
        { icon: Zap, text: 'API personalizada' },
      ],
    };
    return features[plan] || features.starter;
  };

  const handleUpgrade = () => {
    // Redirecionar para página de upgrade
            navigate('/#precos', { 
      state: { 
        highlightPlan: getNextPlan(),
        reason: variant 
      } 
    });
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const nextPlan = getNextPlan();
  const planFeatures = getPlanFeatures(nextPlan);

  return (
    <Card className={`bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 text-primary">
                {nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">
              {variant === 'default' ? 'Upgrade para' : 'Desbloqueie'} {nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-3">
              {getUpgradeMessage()}
            </p>

            <div className="space-y-2 mb-4">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button onClick={handleUpgrade} size="sm" className="bg-primary hover:bg-primary/90">
                Fazer Upgrade
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              
              <Button 
                onClick={handleDismiss} 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="ml-4 text-right">
            <div className="text-2xl font-bold text-primary">
              {nextPlan === 'starter' && 'R$ 49'}
              {nextPlan === 'professional' && 'R$ 99'}
              {nextPlan === 'enterprise' && 'Sob Consulta'}
            </div>
            <div className="text-xs text-muted-foreground">
              {nextPlan !== 'enterprise' && '/mês'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente específico para limite de funcionários
export function EmployeeLimitBanner() {
  const { getLimitInfo, isAtLimit, isNearLimit } = useFeatureGating();
  const info = getLimitInfo('employees');

  if (!isAtLimit('employees') && !isNearLimit('employees')) return null;

  return (
    <UpgradeBanner
      variant={isAtLimit('employees') ? 'usage-limit' : 'default'}
      limitType="employees"
      className="mb-4"
    />
  );
}

// Componente específico para funcionalidades premium
export function FeatureUpgradeBanner({ feature }: { feature: string }) {
  return (
    <UpgradeBanner
      variant="feature-limit"
      feature={feature}
      className="mb-4"
    />
  );
}
