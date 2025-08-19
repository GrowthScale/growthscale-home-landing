import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
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

type Role = 'owner' | 'admin' | 'manager' | 'employee';

export function useAccessControl() {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState<Role>('employee');
  const [userCompanyId, setUserCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
  const can = (permission: string): boolean => {
    return rolesPermissions[userRole]?.includes(permission) || false;
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

  return { 
    role: userRole, 
    companyId: userCompanyId,
    can, 
    hasAnyRole,
    getRole,
    getCompanyId,
    loading 
  };
}
