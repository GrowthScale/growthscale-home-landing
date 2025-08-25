// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  requiredOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredAuth = true,
  requiredOnboarding = false
}) => {
  const { user, session, loading: authLoading } = useAuth();
  const { 
    isComplete, 
    hasCompany, 
    hasPendingCompany, 
    isLoading: onboardingLoading,
    canAccessRoute
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