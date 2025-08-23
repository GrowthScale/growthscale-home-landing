import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';

export interface OnboardingStatus {
  isComplete: boolean;
  hasCompany: boolean;
  hasPendingCompany: boolean;
  isLoading: boolean;
}

export const useOnboardingStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const { currentTenant, loading: tenantLoading } = useTenant();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<OnboardingStatus>({
    isComplete: false,
    hasCompany: false,
    hasPendingCompany: false,
    isLoading: true
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (authLoading || tenantLoading) {
        return;
      }

      if (!user) {
        setStatus({
          isComplete: false,
          hasCompany: false,
          hasPendingCompany: false,
          isLoading: false
        });
        return;
      }

      try {
        // Verificar se tem dados pendentes de empresa
        const pendingCompany = user.user_metadata?.pending_company;
        
        // Verificar se tem tenant configurado
        const hasCompany = !!currentTenant;

        const onboardingStatus: OnboardingStatus = {
          isComplete: hasCompany && !pendingCompany,
          hasCompany,
          hasPendingCompany: !!pendingCompany,
          isLoading: false
        };

        setStatus(onboardingStatus);

        // Lógica de redirecionamento
        if (hasCompany && !pendingCompany) {
          // Onboarding completo - pode acessar dashboard
          if (window.location.pathname === '/onboarding') {
            navigate('/dashboard', { replace: true });
          }
        } else if (pendingCompany) {
          // Tem dados pendentes - redirecionar para onboarding
          if (window.location.pathname !== '/onboarding') {
            navigate('/onboarding', { replace: true });
          }
        } else if (!hasCompany && !pendingCompany) {
          // Usuário logado mas sem empresa - redirecionar para onboarding
          if (window.location.pathname !== '/onboarding') {
            navigate('/onboarding', { replace: true });
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status de onboarding:', error);
        setStatus({
          isComplete: false,
          hasCompany: false,
          hasPendingCompany: false,
          isLoading: false
        });
      }
    };

    checkOnboardingStatus();
  }, [user, currentTenant, authLoading, tenantLoading, navigate]);

  return status;
};
