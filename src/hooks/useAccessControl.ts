import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

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

  // Acessa o 'role' que deve estar nos metadados do usuário no Supabase Auth
  const userRole = user?.user_metadata?.role as Role || 'employee';

  // Função que verifica se o usuário tem uma permissão específica
  const can = (permission: string): boolean => {
    return rolesPermissions[userRole]?.includes(permission) || false;
  };

  return { role: userRole, can };
}
