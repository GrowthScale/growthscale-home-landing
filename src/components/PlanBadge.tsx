import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Crown, Star, Zap, Clock } from 'lucide-react';
import { useFeatureGating } from '@/hooks/useFeatureGating';
import { useTrialStatus } from '@/hooks/useTrialStatus';

interface PlanBadgeProps {
  className?: string;
  showTooltip?: boolean;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({ 
  className = '', 
  showTooltip = true 
}) => {
  const { currentPlan, planLimits, getLimitInfo } = useFeatureGating();
  const { isTrialing, isTrialExpired, daysLeftInTrial, trialDuration } = useTrialStatus();
  
  const getPlanIcon = () => {
    switch (currentPlan) {
      case 'freemium':
        return isTrialing ? <Clock className="h-3 w-3" /> : <Star className="h-3 w-3" />;
      case 'starter':
        return <Zap className="h-3 w-3" />;
      case 'professional':
        return <Crown className="h-3 w-3" />;
      case 'enterprise':
        return <Crown className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  const getPlanColor = () => {
    if (currentPlan === 'freemium' && isTrialing) {
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
    }
    
    switch (currentPlan) {
      case 'freemium':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      case 'starter':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
      case 'professional':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700';
      case 'enterprise':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-200 dark:from-yellow-900 dark:to-orange-900 dark:text-orange-300 dark:border-orange-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPlanText = () => {
    if (currentPlan === 'freemium' && isTrialing) {
      return `Trial (${daysLeftInTrial}d)`;
    }
    return `Plano ${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}`;
  };

  const getPlanLimits = () => {
    const employeeInfo = getLimitInfo('employees');
    const branchInfo = getLimitInfo('branches');
    const scheduleInfo = getLimitInfo('schedules');

    return {
      employees: employeeInfo.isUnlimited ? 'Ilimitado' : `${employeeInfo.current}/${employeeInfo.limit}`,
      branches: branchInfo.isUnlimited ? 'Ilimitado' : `${branchInfo.current}/${branchInfo.limit}`,
      schedules: scheduleInfo.isUnlimited ? 'Ilimitado' : `${scheduleInfo.current}/${scheduleInfo.limit}`,
    };
  };

  const planLimits = getPlanLimits();

  const badge = (
    <Badge 
      variant="outline" 
      className={`text-xs font-medium ${getPlanColor()} ${className}`}
    >
      <div className="flex items-center gap-1">
        {getPlanIcon()}
        <span>{getPlanText()}</span>
      </div>
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {badge}
            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-64">
          <div className="space-y-2">
            <div className="font-medium">
              {currentPlan === 'freemium' && isTrialing 
                ? `Trial Ativo - ${daysLeftInTrial} dias restantes`
                : `Plano ${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}`
              }
            </div>
            
            {currentPlan === 'freemium' && isTrialing && (
              <div className="text-xs text-muted-foreground pb-2 border-b">
                Período de teste de {trialDuration} dias
              </div>
            )}
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Funcionários:</span>
                <span className="font-medium">{planLimits.employees}</span>
              </div>
              <div className="flex justify-between">
                <span>Filiais:</span>
                <span className="font-medium">{planLimits.branches}</span>
              </div>
              <div className="flex justify-between">
                <span>Escalas:</span>
                <span className="font-medium">{planLimits.schedules}</span>
              </div>
            </div>
            
            {currentPlan === 'freemium' && (
              <div className="text-xs text-muted-foreground pt-1 border-t">
                {isTrialing 
                  ? 'Faça upgrade antes do fim do trial para continuar usando todas as funcionalidades'
                  : 'Faça upgrade para acessar mais funcionalidades'
                }
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Componente para mostrar em funcionalidades premium
export const PremiumFeatureBadge: React.FC<{ feature: string }> = ({ feature }) => {
  const { currentPlan } = useFeatureGating();
  const { isTrialing } = useTrialStatus();
  
  const isPremium = currentPlan !== 'freemium' || isTrialing;
  
  if (isPremium) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Premium</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-sm">
            <div className="font-medium">Funcionalidade Premium</div>
            <div className="text-xs text-muted-foreground">
              Disponível nos planos Starter e superiores
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
