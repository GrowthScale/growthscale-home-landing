import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Crown, 
  Zap, 
  Star, 
  Users, 
  Brain, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useFeatureGating, type PlanType } from '@/hooks/useFeatureGating';
import { useTrialStatus } from '@/hooks/useTrialStatus';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: 'employee_limit' | 'feature_limit' | 'usage_limit' | 'trial_expired';
  message?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  trigger,
  message = "Parabéns, sua equipe está crescendo!"
}) => {
  const { currentPlan, planLimits } = useFeatureGating();
  const { isTrialing, isTrialExpired, daysLeftInTrial, trialDuration } = useTrialStatus();

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

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'employee_limit':
        return 'Para continuar crescendo, está na hora do próximo nível!';
      case 'feature_limit':
        return 'Desbloqueie funcionalidades avançadas para otimizar sua operação!';
      case 'usage_limit':
        return 'Expanda sua capacidade e aproveite ao máximo o GrowthScale!';
      case 'trial_expired':
        return `Seu período de teste de ${trialDuration} dias expirou. Faça upgrade para continuar!`;
      default:
        return 'Faça upgrade para acessar mais funcionalidades!';
    }
  };

  const getModalIcon = () => {
    switch (trigger) {
      case 'trial_expired':
        return <AlertTriangle className="h-8 w-8 text-white" />;
      case 'employee_limit':
        return <Users className="h-8 w-8 text-white" />;
      default:
        return <Sparkles className="h-8 w-8 text-white" />;
    }
  };

  const getModalColor = () => {
    switch (trigger) {
      case 'trial_expired':
        return 'from-red-400 to-red-500';
      case 'employee_limit':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-yellow-400 to-orange-500';
    }
  };

  const getPlanFeatures = (plan: PlanType) => {
    const features = {
      starter: [
        { icon: Users, text: 'Até 10 funcionários', highlight: true },
        { icon: Brain, text: 'IA para escalas', highlight: true },
        { icon: Shield, text: 'Compliance automático', highlight: false },
        { icon: Zap, text: 'App mobile', highlight: false },
      ],
      professional: [
        { icon: Users, text: 'Até 25 funcionários', highlight: true },
        { icon: Brain, text: 'IA avançada', highlight: true },
        { icon: Star, text: 'Analytics completos', highlight: true },
        { icon: Shield, text: 'Suporte dedicado', highlight: false },
      ],
      enterprise: [
        { icon: Users, text: 'Funcionários ilimitados', highlight: true },
        { icon: Crown, text: 'Suporte dedicado', highlight: true },
        { icon: Zap, text: 'API personalizada', highlight: true },
        { icon: Sparkles, text: 'White label', highlight: false },
      ],
    };
    return features[plan] || features.starter;
  };

  const handleUpgrade = () => {
    // Aqui você integraria com o Stripe
    console.log('Iniciando upgrade para:', getNextPlan());
    onClose();
  };

  const nextPlan = getNextPlan();
  const planFeatures = getPlanFeatures(nextPlan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-center">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${getModalColor()} rounded-full flex items-center justify-center mb-4`}>
            {getModalIcon()}
          </div>
          <DialogTitle className="text-2xl font-bold">
            {trigger === 'trial_expired' ? '⏰' : '🎉'} {message}
          </DialogTitle>
          <p className="text-muted-foreground">
            {getTriggerMessage()}
          </p>
          
          {isTrialing && trigger !== 'trial_expired' && (
            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                <Clock className="h-4 w-4" />
                <span>Trial ativo: {daysLeftInTrial} dias restantes</span>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Plano Recomendado */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Plano {nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)}
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Recomendado
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {planFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 text-sm ${
                      feature.highlight ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    <feature.icon className={`h-4 w-4 ${
                      feature.highlight ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {nextPlan === 'starter' && 'R$ 49'}
                    {nextPlan === 'professional' && 'R$ 99'}
                    {nextPlan === 'enterprise' && 'Sob Consulta'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {nextPlan !== 'enterprise' && '/mês'}
                  </div>
                </div>
                
                <Button onClick={handleUpgrade} className="bg-primary hover:bg-primary/90">
                  {trigger === 'trial_expired' ? 'Fazer Upgrade Agora' : 'Fazer Upgrade'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefícios do Upgrade */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Por que fazer upgrade agora?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Acesso imediato a todas as funcionalidades</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Sem interrupção no seu fluxo de trabalho</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Suporte prioritário incluído</span>
              </div>
              {trigger === 'trial_expired' && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Continue usando sem perder dados</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={onClose}>
              {trigger === 'trial_expired' ? 'Lembrar depois' : 'Talvez depois'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
