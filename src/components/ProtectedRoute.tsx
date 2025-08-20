import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAccessControl } from '@/hooks/useAccessControl';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRoles?: ('owner' | 'manager' | 'employee')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  requiredRoles 
}) => {
  const { user, loading } = useAuth();
  const { can, hasAnyRole, getRole } = useAccessControl();
  const location = useLocation();
  
  // Hook para verificar status do onboarding
  const { 
    onboardingComplete, 
    isLoading: isLoadingOnboarding, 
    shouldShowOnboarding, 
    shouldShowAuth 
  } = useOnboardingStatus();

  // Se estiver carregando autenticação ou onboarding
  if (loading || isLoadingOnboarding) {
    return (
      <LoadingSpinner 
        message="Verificando autenticação..." 
        size="lg" 
      />
    );
  }

  // Se não há usuário autenticado
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Se deve mostrar auth (usuário autenticado mas sem tenant)
  if (shouldShowAuth) {
    return (
      <LoadingSpinner 
        message="Redirecionando para autenticação..." 
        size="lg" 
      />
    );
  }

  // Se deve mostrar onboarding (usuário autenticado com tenant mas setup incompleto)
  if (shouldShowOnboarding) {
    return (
      <LoadingSpinner 
        message="Redirecionando para configuração..." 
        size="lg" 
      />
    );
  }

  // Se onboarding não está completo
  if (!onboardingComplete) {
    return (
      <LoadingSpinner 
        message="Configurando sua empresa..." 
        size="lg" 
      />
    );
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