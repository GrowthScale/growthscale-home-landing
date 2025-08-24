import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';

export interface OnboardingStatus {
  isComplete: boolean;
  hasCompany: boolean;
  hasPendingCompany: boolean;
  isLoading: boolean;
  error?: string;
  shouldRedirect: boolean;
  targetPath: string;
}

export const useOnboardingStatus = () => {
  const { user, session, loading: authLoading } = useAuth();
  const { currentTenant, loading: tenantLoading } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [status, setStatus] = useState<OnboardingStatus>({
    isComplete: false,
    hasCompany: false,
    hasPendingCompany: false,
    isLoading: true,
    shouldRedirect: false,
    targetPath: '/auth'
  });

  // Função para determinar o caminho correto baseado no status
  const determineTargetPath = useCallback((
    hasCompany: boolean, 
    hasPendingCompany: boolean,
    isVerified: boolean
  ): string => {
    if (hasCompany && !hasPendingCompany) {
      return '/dashboard';
    } else if (hasPendingCompany || (!hasCompany && !hasPendingCompany)) {
      return '/onboarding';
    } else {
      return '/auth';
    }
  }, []);

  // Função para verificar se deve redirecionar
  const shouldRedirect = useCallback((
    currentPath: string,
    targetPath: string,
    isLoading: boolean
  ): boolean => {
    if (isLoading) return false;
    
    // Se estamos no callback, não redirecionar ainda
    if (currentPath === '/auth/callback') return false;
    
    // Se estamos na página correta, não redirecionar
    if (currentPath === targetPath) return false;
    
    // Se estamos em auth mas deveríamos estar em outro lugar
    if (currentPath === '/auth' && targetPath !== '/auth') return true;
    
    // Se estamos em onboarding mas deveríamos estar em dashboard
    if (currentPath === '/onboarding' && targetPath === '/dashboard') return true;
    
    // Se estamos em dashboard mas deveríamos estar em onboarding
    if (currentPath === '/dashboard' && targetPath === '/onboarding') return true;
    
    return false;
  }, []);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      console.log('🔍 useOnboardingStatus: Verificando status...', {
        hasUser: !!user,
        hasSession: !!session,
        authLoading,
        tenantLoading,
        currentPath: window.location.pathname
      });

      // Aguardar carregamento dos contextos
      if (authLoading || tenantLoading) {
        console.log('⏳ useOnboardingStatus: Aguardando carregamento dos contextos...');
        return;
      }

      // Se não há usuário, redirecionar para auth
      if (!user || !session) {
        console.log('🚪 useOnboardingStatus: Usuário não autenticado');
        setStatus({
          isComplete: false,
          hasCompany: false,
          hasPendingCompany: false,
          isLoading: false,
          shouldRedirect: true,
          targetPath: '/auth'
        });
        return;
      }

      try {
        console.log('👤 useOnboardingStatus: Usuário autenticado:', {
          userId: user.id,
          email: user.email,
          hasMetadata: !!user.user_metadata
        });

        // Verificar se tem dados pendentes de empresa
        const pendingCompany = user.user_metadata?.pending_company;
        console.log('🏢 useOnboardingStatus: Dados pendentes de empresa:', pendingCompany);
        
        // Verificar se tem tenant configurado
        const hasCompany = !!currentTenant;
        console.log('🏢 useOnboardingStatus: Tenant configurado:', {
          hasCompany,
          tenantId: currentTenant?.id
        });

        // Verificar se veio de uma confirmação de email
        const isVerified = searchParams.get('verified') === 'true';
        console.log('✅ useOnboardingStatus: Verificação de email:', isVerified);

        const onboardingStatus: OnboardingStatus = {
          isComplete: hasCompany && !pendingCompany,
          hasCompany,
          hasPendingCompany: !!pendingCompany,
          isLoading: false,
          shouldRedirect: false,
          targetPath: determineTargetPath(hasCompany, !!pendingCompany, isVerified)
        };

        // Determinar se deve redirecionar
        const currentPath = window.location.pathname;
        onboardingStatus.shouldRedirect = shouldRedirect(
          currentPath, 
          onboardingStatus.targetPath, 
          onboardingStatus.isLoading
        );

        console.log('📊 useOnboardingStatus: Status final:', onboardingStatus);

        setStatus(onboardingStatus);

        // Executar redirecionamento se necessário
        if (onboardingStatus.shouldRedirect) {
          console.log('🔄 useOnboardingStatus: Redirecionando para:', onboardingStatus.targetPath);
          
          // Adicionar parâmetros de contexto se necessário
          let targetUrl = onboardingStatus.targetPath;
          if (isVerified && onboardingStatus.targetPath === '/onboarding') {
            targetUrl += '?verified=true';
          }
          
          navigate(targetUrl, { replace: true });
        }

      } catch (error) {
        console.error('❌ useOnboardingStatus: Erro ao verificar status:', error);
        setStatus({
          isComplete: false,
          hasCompany: false,
          hasPendingCompany: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          shouldRedirect: true,
          targetPath: '/auth'
        });
      }
    };

    checkOnboardingStatus();
  }, [
    user, 
    session, 
    currentTenant, 
    authLoading, 
    tenantLoading, 
    navigate, 
    searchParams,
    determineTargetPath,
    shouldRedirect
  ]);

  // Função para forçar verificação de status
  const refreshStatus = useCallback(async () => {
    console.log('🔄 useOnboardingStatus: Forçando verificação de status...');
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    // Aguardar um pouco para permitir que os contextos se atualizem
    setTimeout(() => {
      setStatus(prev => ({ ...prev, isLoading: false }));
    }, 1000);
  }, []);

  // Função para verificar se o usuário pode acessar uma rota específica
  const canAccessRoute = useCallback((route: string): boolean => {
    if (status.isLoading) return false;
    
    switch (route) {
      case '/dashboard':
        return status.isComplete && status.hasCompany;
      case '/onboarding':
        return !status.isComplete || status.hasPendingCompany;
      case '/auth':
        return !status.hasCompany && !status.hasPendingCompany;
      default:
        return true;
    }
  }, [status]);

  return {
    ...status,
    refreshStatus,
    canAccessRoute
  };
};
