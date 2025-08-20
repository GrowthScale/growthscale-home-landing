import { useMemo } from 'react';
import { useTenant } from '@/contexts/TenantContext';

export type PlanType = 'free' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired';

export interface TrialStatus {
  isTrialing: boolean;
  isTrialExpired: boolean;
  daysLeftInTrial: number;
  trialEndDate: Date | null;
  currentPlan: PlanType;
  subscriptionStatus: SubscriptionStatus;
  canAccessFeature: (feature: string) => boolean;
  shouldShowUpgradeBanner: boolean;
  isOnFreePlan: boolean;
}

export function useTrialStatus(): TrialStatus {
  const { currentTenant } = useTenant();

  const trialStatus = useMemo((): TrialStatus => {
    if (!currentTenant) {
      return {
        isTrialing: false,
        isTrialExpired: false,
        daysLeftInTrial: 0,
        trialEndDate: null,
        currentPlan: 'free',
        subscriptionStatus: 'expired',
        canAccessFeature: () => false,
        shouldShowUpgradeBanner: false,
        isOnFreePlan: true,
      };
    }

    const plan = (currentTenant.settings?.plan as PlanType) || 'free';
    const subscriptionStatus = (currentTenant.settings?.subscription_status as SubscriptionStatus) || 'expired';
    const trialEndDate = currentTenant.settings?.trial_ends_at ? new Date(currentTenant.settings.trial_ends_at) : null;
    
    const now = new Date();
    const isTrialing = subscriptionStatus === 'trialing' && trialEndDate && trialEndDate > now;
    const isTrialExpired = subscriptionStatus === 'trialing' && trialEndDate && trialEndDate <= now;
    
    const daysLeftInTrial = trialEndDate && trialEndDate > now 
      ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    // Definir limites por plano
    const planLimits = {
      free: {
        maxEmployees: 5,
        maxBranches: 1,
        maxSchedules: 3,
        features: ['basic_scheduling', 'employee_management', 'basic_reports'],
      },
      starter: {
        maxEmployees: 20,
        maxBranches: 3,
        maxSchedules: 10,
        features: ['basic_scheduling', 'employee_management', 'basic_reports', 'ai_suggestions', 'whatsapp_notifications'],
      },
      professional: {
        maxEmployees: 100,
        maxBranches: 10,
        maxSchedules: 50,
        features: ['basic_scheduling', 'employee_management', 'basic_reports', 'ai_suggestions', 'whatsapp_notifications', 'advanced_analytics', 'custom_templates', 'api_access'],
      },
      enterprise: {
        maxEmployees: -1, // Ilimitado
        maxBranches: -1, // Ilimitado
        maxSchedules: -1, // Ilimitado
        features: ['basic_scheduling', 'employee_management', 'basic_reports', 'ai_suggestions', 'whatsapp_notifications', 'advanced_analytics', 'custom_templates', 'api_access', 'priority_support', 'custom_integrations', 'white_label'],
      },
    };

    const currentPlanLimits = planLimits[plan];

    const canAccessFeature = (feature: string): boolean => {
      // Se está em trial, tem acesso a todas as features do plano starter
      if (isTrialing) {
        return planLimits.starter.features.includes(feature);
      }
      
      // Se o trial expirou e está no plano free, só tem acesso às features básicas
      if (isTrialExpired && plan === 'free') {
        return planLimits.free.features.includes(feature);
      }
      
      // Caso contrário, verifica se a feature está disponível no plano atual
      return currentPlanLimits.features.includes(feature);
    };

    const shouldShowUpgradeBanner = isTrialing && daysLeftInTrial <= 3 || isTrialExpired || (plan === 'free' && !isTrialing);
    const isOnFreePlan = plan === 'free' && !isTrialing;

    return {
      isTrialing,
      isTrialExpired,
      daysLeftInTrial,
      trialEndDate,
      currentPlan: plan,
      subscriptionStatus,
      canAccessFeature,
      shouldShowUpgradeBanner,
      isOnFreePlan,
    };
  }, [currentTenant]);

  return trialStatus;
}
