import { useMemo } from 'react';
import { useTenant } from '@/contexts/TenantContext';

export type PlanType = 'freemium' | 'starter' | 'professional' | 'enterprise';
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
  trialDuration: number; // 14 dias
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
        currentPlan: 'freemium',
        subscriptionStatus: 'expired',
        canAccessFeature: () => false,
        shouldShowUpgradeBanner: false,
        isOnFreePlan: true,
        trialDuration: 14,
      };
    }

    const plan = (currentTenant.settings?.plan as PlanType) || 'freemium';
    const subscriptionStatus = (currentTenant.settings?.subscription_status as SubscriptionStatus) || 'trialing';
    
    // Calcular data de fim do trial baseado na criação da empresa
    const companyCreatedAt = currentTenant.created_at ? new Date(currentTenant.created_at) : new Date();
    const trialEndDate = new Date(companyCreatedAt.getTime() + (14 * 24 * 60 * 60 * 1000)); // 14 dias
    
    const now = new Date();
    const isTrialing = plan === 'freemium' && trialEndDate > now;
    const isTrialExpired = plan === 'freemium' && trialEndDate <= now;
    
    const daysLeftInTrial = isTrialing 
      ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    // Definir limites por plano
    const planLimits = {
      freemium: {
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
      
      // Se o trial expirou e está no plano freemium, só tem acesso às features básicas
      if (isTrialExpired && plan === 'freemium') {
        return planLimits.freemium.features.includes(feature);
      }
      
      // Caso contrário, verifica se a feature está disponível no plano atual
      return currentPlanLimits.features.includes(feature);
    };

    // Mostrar banner de upgrade quando:
    // 1. Está em trial e faltam 3 dias ou menos
    // 2. Trial expirou
    // 3. Está no plano freemium sem trial ativo
    const shouldShowUpgradeBanner = (isTrialing && daysLeftInTrial <= 3) || isTrialExpired || (plan === 'freemium' && !isTrialing);
    const isOnFreePlan = plan === 'freemium';

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
      trialDuration: 14,
    };
  }, [currentTenant]);

  return trialStatus;
}
