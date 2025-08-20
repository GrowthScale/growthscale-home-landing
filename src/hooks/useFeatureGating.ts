import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';

export type PlanType = 'freemium' | 'starter' | 'professional' | 'enterprise';

export interface PlanLimits {
  maxEmployees: number;
  maxBranches: number;
  maxSchedules: number;
  features: {
    aiSuggestions: boolean;
    advancedAnalytics: boolean;
    mobileApp: boolean;
    integrations: boolean;
    prioritySupport: boolean;
    customReports: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
  };
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  freemium: {
    maxEmployees: 3,
    maxBranches: 1,
    maxSchedules: 5,
    features: {
      aiSuggestions: false,
      advancedAnalytics: false,
      mobileApp: false,
      integrations: false,
      prioritySupport: false,
      customReports: false,
      apiAccess: false,
      whiteLabel: false,
    },
  },
  starter: {
    maxEmployees: 10,
    maxBranches: 2,
    maxSchedules: 20,
    features: {
      aiSuggestions: true,
      advancedAnalytics: false,
      mobileApp: true,
      integrations: true,
      prioritySupport: false,
      customReports: false,
      apiAccess: false,
      whiteLabel: false,
    },
  },
  professional: {
    maxEmployees: 25,
    maxBranches: 5,
    maxSchedules: 50,
    features: {
      aiSuggestions: true,
      advancedAnalytics: true,
      mobileApp: true,
      integrations: true,
      prioritySupport: true,
      customReports: true,
      apiAccess: true,
      whiteLabel: false,
    },
  },
  enterprise: {
    maxEmployees: -1, // Ilimitado
    maxBranches: -1, // Ilimitado
    maxSchedules: -1, // Ilimitado
    features: {
      aiSuggestions: true,
      advancedAnalytics: true,
      mobileApp: true,
      integrations: true,
      prioritySupport: true,
      customReports: true,
      apiAccess: true,
      whiteLabel: true,
    },
  },
};

export function useFeatureGating() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  // Determinar o plano atual do usuário
  const getCurrentPlan = (): PlanType => {
    // Por enquanto, vamos usar um plano padrão baseado no tenant
    // Em produção, isso viria do banco de dados ou de um sistema de billing
    if (!currentTenant) return 'freemium';
    
    // Lógica para determinar o plano baseado no tenant
    // Por exemplo, baseado no número de funcionários ou configurações
    const employeeCount = currentTenant.settings?.employee_count || 0;
    
    if (employeeCount <= 3) return 'freemium';
    if (employeeCount <= 10) return 'starter';
    if (employeeCount <= 25) return 'professional';
    return 'enterprise';
  };

  const currentPlan = getCurrentPlan();
  const planLimits = PLAN_LIMITS[currentPlan];

  // Verificar se uma funcionalidade está disponível
  const hasFeature = (feature: keyof PlanLimits['features']): boolean => {
    return planLimits.features[feature];
  };

  // Verificar se o usuário pode adicionar mais funcionários
  const canAddEmployee = (): boolean => {
    if (planLimits.maxEmployees === -1) return true;
    
    const currentEmployeeCount = currentTenant?.employees?.length || 0;
    return currentEmployeeCount < planLimits.maxEmployees;
  };

  // Verificar se o usuário pode adicionar mais filiais
  const canAddBranch = (): boolean => {
    if (planLimits.maxBranches === -1) return true;
    
    const currentBranchCount = currentTenant?.branches?.length || 0;
    return currentBranchCount < planLimits.maxBranches;
  };

  // Verificar se o usuário pode criar mais escalas
  const canCreateSchedule = (): boolean => {
    if (planLimits.maxSchedules === -1) return true;
    
    const currentScheduleCount = currentTenant?.schedules?.length || 0;
    return currentScheduleCount < planLimits.maxSchedules;
  };

  // Obter informações sobre o limite atual
  const getLimitInfo = (type: 'employees' | 'branches' | 'schedules') => {
    const limits = {
      employees: planLimits.maxEmployees,
      branches: planLimits.maxBranches,
      schedules: planLimits.maxSchedules,
    };
    
    const current = {
      employees: currentTenant?.employees?.length || 0,
      branches: currentTenant?.branches?.length || 0,
      schedules: currentTenant?.schedules?.length || 0,
    };

    return {
      current: current[type],
      limit: limits[type],
      isUnlimited: limits[type] === -1,
      remaining: limits[type] === -1 ? -1 : limits[type] - current[type],
      percentage: limits[type] === -1 ? 0 : (current[type] / limits[type]) * 100,
    };
  };

  // Verificar se o usuário está próximo do limite
  const isNearLimit = (type: 'employees' | 'branches' | 'schedules'): boolean => {
    const info = getLimitInfo(type);
    if (info.isUnlimited) return false;
    return info.percentage >= 80;
  };

  // Verificar se o usuário atingiu o limite
  const isAtLimit = (type: 'employees' | 'branches' | 'schedules'): boolean => {
    const info = getLimitInfo(type);
    if (info.isUnlimited) return false;
    return info.remaining <= 0;
  };

  return {
    currentPlan,
    planLimits,
    hasFeature,
    canAddEmployee,
    canAddBranch,
    canCreateSchedule,
    getLimitInfo,
    isNearLimit,
    isAtLimit,
    isAuthenticated: !!user,
    hasTenant: !!currentTenant,
  };
}
