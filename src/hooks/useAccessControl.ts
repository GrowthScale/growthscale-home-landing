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
  ],
  manager: [
    'manage:unit_schedules',
    'view:unit_dashboard',
    'manage:unit_employees',
  ],
  employee: [
    'view:own_schedule',
  ],
};

type Role = keyof typeof rolesPermissions;

export function useAccessControl() {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState<Role>('employee');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole('employee');
        setLoading(false);
        return;
      }

      try {
        // Primeiro tenta buscar da tabela user_profiles
        const { data: profile } = await userProfileService.getUserProfile(user.id);
        
        if (profile?.role) {
          setUserRole(profile.role as Role);
        } else {
          // Fallback para user_metadata
          const metadataRole = user.user_metadata?.role as Role;
          setUserRole(metadataRole || 'employee');
          
          // Se não tem perfil, cria um com role padrão
          if (!profile) {
            await userProfileService.createUserProfile({
              id: user.id,
              role: metadataRole || 'employee'
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar role do usuário:', error);
        // Fallback para user_metadata
        const metadataRole = user.user_metadata?.role as Role;
        setUserRole(metadataRole || 'employee');
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

  return { role: userRole, can, loading };
}
