import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { LoadingSpinner } from '@/components/ui/loading';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAccessControl } from '@/hooks/useAccessControl';
import { Permission } from '@/hooks/useAccessControl';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredRoles?: ('owner' | 'manager' | 'employee')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  requiredRoles 
}) => {
  const { user, loading } = useAuth();
  const { tenants, loading: isLoadingTenants } = useTenant();
  const { can, hasAnyRole, getRole } = useAccessControl();
  const location = useLocation();
  const navigate = useNavigate();

  // Verificação de setup de empresa
  useEffect(() => {
    // Espera o carregamento do usuário e dos tenants
    if (isLoadingTenants || !user) {
      return;
    }

    // Se o usuário está logado e a lista de tenants está vazia, redireciona para setup
    // Mas apenas se não estiver já na página de setup para evitar redirecionamento infinito
    if (user && !isLoadingTenants && tenants.length === 0 && location.pathname !== ROUTES.SETUP) {
      navigate(ROUTES.SETUP);
    }
  }, [user, tenants, isLoadingTenants, navigate, location.pathname]);

  if (loading || isLoadingTenants) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Verificando autenticação..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificação de permissão específica
  if (requiredPermission && !can(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="text-sm text-muted-foreground">
            Seu papel atual: <span className="font-semibold">{getRole()}</span>
          </p>
        </div>
      </div>
    );
  }

  // Verificação de roles específicos
  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">
            Esta página requer um papel específico.
          </p>
          <p className="text-sm text-muted-foreground">
            Seu papel atual: <span className="font-semibold">{getRole()}</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;