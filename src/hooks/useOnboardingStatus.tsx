// src/hooks/useOnboardingStatus.tsx
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface OnboardingStatus {
  isComplete: boolean;
  hasCompany: boolean;
  hasPendingCompany: boolean;
  isLoading: boolean;
  error?: string;
}

export const useOnboardingStatus = () => {
  const { user, session, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<OnboardingStatus>({
    isComplete: false,
    hasCompany: false,
    hasPendingCompany: false,
    isLoading: true
  });

  const checkOnboardingStatus = useCallback(async () => {
    if (!user || !session) {
      setStatus({
        isComplete: false,
        hasCompany: false,
        hasPendingCompany: false,
        isLoading: false
      });
      return;
    }

    try {
      console.log('🔍 useOnboardingStatus: Verificando status...', {
        userId: user.id,
        hasMetadata: !!user.user_metadata
      });

      // Verificar se tem dados pendentes de empresa
      const pendingCompany = user.user_metadata?.pending_company;
      console.log('🏢 useOnboardingStatus: Dados pendentes de empresa:', pendingCompany);

      // Verificar se tem empresa no banco
      const { data: userCompanies, error } = await supabase
        .from('company_users')
        .select('company_id, companies(*)')
        .eq('user_id', user.id);

      if (error) {
        console.error('❌ useOnboardingStatus: Erro ao buscar empresas:', error);
        setStatus({
          isComplete: false,
          hasCompany: false,
          hasPendingCompany: !!pendingCompany,
          isLoading: false,
          error: error.message
        });
        return;
      }

      const hasCompany = userCompanies && userCompanies.length > 0;
      console.log('🏢 useOnboardingStatus: Empresas encontradas:', userCompanies?.length || 0);

      const onboardingStatus: OnboardingStatus = {
        isComplete: hasCompany && !pendingCompany,
        hasCompany,
        hasPendingCompany: !!pendingCompany,
        isLoading: false
      };

      console.log('📊 useOnboardingStatus: Status final:', onboardingStatus);
      setStatus(onboardingStatus);

    } catch (error: any) {
      console.error('❌ useOnboardingStatus: Erro ao verificar status:', error);
      setStatus({
        isComplete: false,
        hasCompany: false,
        hasPendingCompany: !!user.user_metadata?.pending_company,
        isLoading: false,
        error: error.message
      });
    }
  }, [user, session]);

  useEffect(() => {
    if (!authLoading) {
      checkOnboardingStatus();
    }
  }, [authLoading, checkOnboardingStatus]);

  // Função para forçar verificação de status
  const refreshStatus = useCallback(async () => {
    console.log('🔄 useOnboardingStatus: Forçando verificação de status...');
    setStatus(prev => ({ ...prev, isLoading: true }));
    await checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  // Função para verificar se o usuário pode acessar uma rota específica
  const canAccessRoute = useCallback((route: string): boolean => {
    if (status.isLoading) return false;
    
    switch (route) {
      case '/dashboard':
        return status.isComplete && status.hasCompany;
      case '/dashboard/setup':
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
