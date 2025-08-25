// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  requiredOnboarding?: boolean;
  allowedRoles?: string[];
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredAuth = true,
  requiredOnboarding = false,
  allowedRoles = [],
  fallbackPath
}) => {
  const { user, session, loading: authLoading } = useAuth();
  const { 
    isComplete, 
    hasCompany, 
    hasPendingCompany, 
    isLoading: onboardingLoading,
    canAccessRoute,
    error: onboardingError
  } = useOnboardingStatus();
  
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      console.log('🔒 ProtectedRoute: Verificando acesso...', {
        path: location.pathname,
        requiredAuth,
        requiredOnboarding,
        hasUser: !!user,
        hasSession: !!session,
        authLoading,
        onboardingLoading,
        isComplete,
        hasCompany,
        hasPendingCompany
      });

      // Aguardar carregamento dos contextos
      if (authLoading || onboardingLoading) {
        console.log('⏳ ProtectedRoute: Aguardando carregamento...');
        return;
      }

      // Verificar se precisa de autenticação
      if (requiredAuth && (!user || !session)) {
        console.log('🚪 ProtectedRoute: Usuário não autenticado, redirecionando para auth');
        navigate('/auth', { 
          replace: true,
          state: { from: location.pathname }
        });
        return;
      }

      // Se não precisa de autenticação e usuário está logado, verificar redirecionamento
      if (!requiredAuth && user && session) {
        const targetPath = canAccessRoute(location.pathname) ? location.pathname : '/dashboard';
        if (targetPath !== location.pathname) {
          console.log('🔄 ProtectedRoute: Usuário autenticado, redirecionando para:', targetPath);
          navigate(targetPath, { replace: true });
          return;
        }
      }

      // Verificar roles se especificadas
      if (allowedRoles.length > 0 && user) {
        const userRole = user.user_metadata?.role || 'user';
        if (!allowedRoles.includes(userRole)) {
          console.log('🚫 ProtectedRoute: Usuário sem permissão, role:', userRole);
          navigate(fallbackPath || '/auth', { replace: true });
          return;
        }
      }

      // Verificar onboarding se necessário
      if (requiredOnboarding && user) {
        if (!isComplete || !hasCompany) {
          console.log('🏢 ProtectedRoute: Onboarding incompleto, redirecionando para setup');
          navigate('/dashboard/setup', { replace: true });
          return;
        }
      }

      // Verificar se está na rota correta baseado no status
      if (user && session) {
        const currentPath = location.pathname;
        const canAccess = canAccessRoute(currentPath);
        
        if (!canAccess) {
          let targetPath = '/auth';
          
          if (isComplete && hasCompany) {
            targetPath = '/dashboard';
          } else if (hasPendingCompany || (!hasCompany && !hasPendingCompany)) {
            targetPath = '/dashboard/setup';
          }
          
          console.log('🔄 ProtectedRoute: Rota incorreta, redirecionando para:', targetPath);
          navigate(targetPath, { replace: true });
          return;
        }
      }

      console.log('✅ ProtectedRoute: Acesso permitido');
      setIsChecking(false);
    };

    checkAccess();
  }, [
    user,
    session,
    authLoading,
    onboardingLoading,
    isComplete,
    hasCompany,
    hasPendingCompany,
    location.pathname,
    navigate,
    requiredAuth,
    requiredOnboarding,
    allowedRoles,
    fallbackPath,
    canAccessRoute
  ]);

  // Loading state
  if (authLoading || onboardingLoading || isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Verificando acesso...</h2>
          <p className="text-muted-foreground">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  // Error state
  if (onboardingError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Erro de Verificação</h2>
          <p className="text-muted-foreground mb-4">{onboardingError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

// Componentes específicos para diferentes tipos de proteção
export const AuthRequired: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredAuth={true}>
    {children}
  </ProtectedRoute>
);

export const OnboardingRequired: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredAuth={true} requiredOnboarding={true}>
    {children}
  </ProtectedRoute>
);

export const PublicOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredAuth={false}>
    {children}
  </ProtectedRoute>
);