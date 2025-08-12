import React from 'react';
import { useAccessControl } from '@/hooks/useAccessControl';

interface AccessControlProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente que renderiza conteúdo baseado em permissões
 * 
 * @example
 * <AccessControl permission="view:billing">
 *   <Button>Ver Faturamento</Button>
 * </AccessControl>
 */
export function AccessControl({ permission, children, fallback = null }: AccessControlProps) {
  const { can } = useAccessControl();

  if (!can(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Componente que renderiza conteúdo apenas para owners
 */
export function OwnerOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <AccessControl permission="manage:company_settings" fallback={fallback}>
      {children}
    </AccessControl>
  );
}

/**
 * Componente que renderiza conteúdo apenas para managers
 */
export function ManagerOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <AccessControl permission="manage:unit_employees" fallback={fallback}>
      {children}
    </AccessControl>
  );
}

/**
 * Componente que renderiza conteúdo apenas para employees
 */
export function EmployeeOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <AccessControl permission="view:own_schedule" fallback={fallback}>
      {children}
    </AccessControl>
  );
}
