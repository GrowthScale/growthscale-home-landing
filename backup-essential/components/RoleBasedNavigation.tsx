import React from 'react';
import { useAccessControl } from '@/hooks/useAccessControl';
import { AccessControl, OwnerOnly, ManagerOnly } from '@/components/AccessControl';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  Building2, 
  Settings, 
  Shield, 
  BarChart3,
  Zap,
  Crown,
  UserCheck
} from 'lucide-react';

const RoleBasedNavigation: React.FC = () => {
  const { can, getRole, isOwner, isManager } = useAccessControl();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: BarChart3,
      permission: 'view:full_dashboard' as const,
      href: '/dashboard'
    },
    {
      label: 'Escalas',
      icon: Calendar,
      permission: 'manage:schedules' as const,
      href: '/schedules'
    },
    {
      label: 'Funcionários',
      icon: Users,
      permission: 'manage:users' as const,
      href: '/employees'
    },
    {
      label: 'Empresas',
      icon: Building2,
      permission: 'manage:companies' as const,
      href: '/companies'
    },
    {
      label: 'Compliance',
      icon: Shield,
      permission: 'view:compliance' as const,
      href: '/compliance'
    },
    {
      label: 'Configurações',
      icon: Settings,
      permission: 'manage:settings' as const,
      href: '/settings'
    },
    {
      label: 'Integrações',
      icon: Zap,
      permission: 'manage:integrations' as const,
      href: '/integracoes'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Indicador de Role */}
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          {isOwner() && <Crown className="h-4 w-4 text-yellow-600" />}
          {isManager() && <UserCheck className="h-4 w-4 text-blue-600" />}
          <span className="text-sm font-medium">
            Papel: {getRole()}
          </span>
        </div>
      </div>

      {/* Navegação Baseada em Permissões */}
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <AccessControl key={item.href} permission={item.permission}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => window.location.href = item.href}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </AccessControl>
        ))}
      </nav>

      {/* Seções Específicas por Role */}
      <div className="space-y-4 pt-4 border-t">
        <OwnerOnly>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Área do Proprietário</h3>
            <p className="text-sm text-yellow-700">
              Você tem acesso total a todas as funcionalidades do sistema.
            </p>
          </div>
        </OwnerOnly>

        <ManagerOnly>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Área do Gerente</h3>
            <p className="text-sm text-blue-700">
              Você pode gerenciar funcionários e escalas da sua unidade.
            </p>
          </div>
        </ManagerOnly>

        <AccessControl permission="view:billing">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Faturamento</h3>
            <p className="text-sm text-green-700">
              Acesso às informações de faturamento e cobrança.
            </p>
          </div>
        </AccessControl>
      </div>

      {/* Debug Info (apenas para desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-xs">
          <h4 className="font-semibold mb-2">Debug - Permissões:</h4>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <div key={item.permission} className="flex justify-between">
                <span>{item.permission}:</span>
                <span className={can(item.permission) ? 'text-green-600' : 'text-red-600'}>
                  {can(item.permission) ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleBasedNavigation;
