import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { useAuth } from '@/contexts/AuthContext';

export function useOnboardingStatus() {
  const { user } = useAuth();
  const { currentTenant, isLoadingTenants } = useTenant();
  const navigate = useNavigate();

  // Verificar se o onboarding está completo
  const onboardingComplete = currentTenant?.settings?.setup_completed === true;
  
  // Verificar se o usuário está autenticado
  const isAuthenticated = !!user;
  
  // Verificar se tem tenant carregado
  const hasTenant = !!currentTenant;

  useEffect(() => {
    // Só verificar redirecionamento se não estiver carregando e usuário estiver autenticado
    if (!isLoadingTenants && isAuthenticated) {
      // Se não tem tenant, redirecionar para auth
      if (!hasTenant) {
        navigate('/auth', { replace: true });
        return;
      }
      
      // Se tem tenant mas onboarding não está completo, redirecionar para setup
      if (!onboardingComplete) {
        navigate('/dashboard/setup', { replace: true });
        return;
      }
    }
  }, [isLoadingTenants, isAuthenticated, hasTenant, onboardingComplete, navigate]);

  return {
    onboardingComplete,
    isAuthenticated,
    hasTenant,
    isLoading: isLoadingTenants,
    shouldShowOnboarding: isAuthenticated && hasTenant && !onboardingComplete,
    shouldShowAuth: isAuthenticated && !hasTenant,
  };
}
