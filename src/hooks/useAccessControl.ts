import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { userProfileService } from '@/services/userProfileService';

// Defina os papéis e permissões da sua aplicação
const rolesPermissions = {
  owner: [
    'view:billing',
    'manage:company_settings',
    'manage:all_schedules',
    'view:full_dashboard',
    'manage:all_employees',
    'manage:company_users',
    'delete:company',
  ],
  admin: [
    'view:billing',
    'manage:company_settings',
    'manage:all_schedules',
    'view:full_dashboard',
    'manage:all_employees',
    'manage:company_users',
  ],
  manager: [
    'manage:unit_schedules',
    'view:unit_dashboard',
    'manage:unit_employees',
    'view:reports',
  ],
  employee: [
    'view:own_schedule',
    'view:own_profile',
  ],
};

// Defina as permissões para cada plano
const planPermissions = {
  free: [
    'create:basic_schedule',
    'view:basic_reports',
    'manage:basic_employees',
    'view:own_schedule',
    'view:own_profile',
  ],
  starter: [
    'create:basic_schedule',
    'use:ai_suggestion',
    'view:cost_simulator',
    'view:clt_alerts',
    'use:whatsapp_notifications',
    'view:basic_reports',
    'manage:basic_employees',
    'view:own_schedule',
    'view:own_profile',
  ],
  professional: [
    'create:basic_schedule',
    'use:ai_suggestion',
    'view:cost_simulator',
    'view:clt_alerts',
    'use:whatsapp_notifications',
    'view:advanced_analytics',
    'use:custom_templates',
    'use:api_access',
    'view:basic_reports',
    'manage:basic_employees',
    'view:own_schedule',
    'view:own_profile',
  ],
  enterprise: [
    // Todas as permissões
    'create:basic_schedule',
    'use:ai_suggestion',
    'view:cost_simulator',
    'view:clt_alerts',
    'use:whatsapp_notifications',
    'view:advanced_analytics',
    'use:custom_templates',
    'use:api_access',
    'use:priority_support',
    'use:custom_integrations',
    'use:white_label',
    'view:basic_reports',
    'manage:basic_employees',
    'view:own_schedule',
    'view:own_profile',
  ],
};

type Role = 'owner' | 'admin' | 'manager' | 'employee';
type Plan = keyof typeof planPermissions;

export function useAccessControl() {
  const { user } = useContext(AuthContext);
  const { currentTenant } = useTenant();
  const [userRole, setUserRole] = useState<Role>('employee');
  const [userCompanyId, setUserCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Obter informações do plano e trial
  const plan = (currentTenant?.plan as Plan) || 'free';
  const status = currentTenant?.subscription_status;
  const trialEndsAt = currentTenant?.trial_ends_at ? new Date(currentTenant.trial_ends_at) : null;
  
  const isTrialActive = status === 'trialing' && trialEndsAt && trialEndsAt > new Date();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole('employee');
        setUserCompanyId(null);
        setLoading(false);
        return;
      }

      try {
        // Buscar role e company_id da tabela user_profiles
        const { data: profile } = await userProfileService.getUserProfile(user.id);
        
        if (profile?.role) {
          setUserRole(profile.role as Role);
          setUserCompanyId(profile.tenant_id || null);
        } else {
          // Fallback para user_metadata
          const metadataRole = user.user_metadata?.role as Role;
          const metadataCompanyId = user.user_metadata?.company_id as string;
          
          setUserRole(metadataRole || 'employee');
          setUserCompanyId(metadataCompanyId || null);
          
          // Se não tem perfil, cria um com role padrão
          if (!profile) {
            await userProfileService.createUserProfile({
              id: user.id,
              role: metadataRole || 'employee',
              tenant_id: metadataCompanyId
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar role do usuário:', error);
        // Fallback para user_metadata
        const metadataRole = user.user_metadata?.role as Role;
        const metadataCompanyId = user.user_metadata?.company_id as string;
        
        setUserRole(metadataRole || 'employee');
        setUserCompanyId(metadataCompanyId || null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  // Função que verifica se o usuário tem uma permissão específica
  // Agora combina permissões de role E plano
  const can = (permission: string): boolean => {
    // Verificar permissões baseadas no role
    const hasRolePermission = rolesPermissions[userRole]?.includes(permission) || false;
    
    // Verificar permissões baseadas no plano
    let hasPlanPermission = false;
    
    if (isTrialActive) {
      // Durante o trial, o utilizador tem acesso a tudo do plano Starter
      hasPlanPermission = planPermissions.starter.includes(permission);
    } else {
      // Fora do trial, as permissões são baseadas no plano atual
      hasPlanPermission = planPermissions[plan]?.includes(permission) || false;
    }
    
    // O usuário precisa ter tanto a permissão de role quanto a de plano
    return hasRolePermission && hasPlanPermission;
  };

  // Função que verifica se o usuário tem qualquer um dos roles especificados
  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.includes(userRole);
  };

  // Função que retorna o role atual do usuário
  const getRole = (): Role => {
    return userRole;
  };

  // Função que retorna o company_id do usuário
  const getCompanyId = (): string | null => {
    return userCompanyId;
  };

  // Função que verifica se o usuário pode acessar uma feature específica
  const canAccessFeature = (feature: string): boolean => {
    return can(feature);
  };

  // Função que retorna o plano atual
  const getCurrentPlan = (): Plan => {
    return plan;
  };

  // Função que verifica se está em trial
  const getTrialStatus = () => {
    return {
      isTrialActive,
      trialEndsAt,
      daysLeftInTrial: trialEndsAt && trialEndsAt > new Date() 
        ? Math.ceil((trialEndsAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0
    };
  };

  return { 
    role: userRole, 
    companyId: userCompanyId,
    plan,
    isTrialActive,
    trialEndsAt,
    can, 
    hasAnyRole,
    getRole,
    getCompanyId,
    canAccessFeature,
    getCurrentPlan,
    getTrialStatus,
    loading 
  };
}
