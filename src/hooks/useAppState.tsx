// src/hooks/useAppState.tsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface AppState {
  isInitialized: boolean;
  isReady: boolean;
  currentStep: 'auth' | 'onboarding' | 'dashboard' | 'loading';
  hasError: boolean;
  errorMessage?: string;
  isOnline: boolean;
  lastSync: Date | null;
}

interface AppStateContextType extends AppState {
  setError: (message: string) => void;
  clearError: () => void;
  refreshApp: () => void;
  setCurrentStep: (step: AppState['currentStep']) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState deve ser usado dentro de um AppStateProvider');
  }
  return context;
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading: authLoading } = useAuth();
  const { 
    isComplete, 
    hasCompany, 
    hasPendingCompany, 
    isLoading: onboardingLoading,
    error: onboardingError
  } = useOnboardingStatus();

  const [state, setState] = useState<AppState>({
    isInitialized: false,
    isReady: false,
    currentStep: 'loading',
    hasError: false,
    isOnline: navigator.onLine,
    lastSync: null
  });

  // Monitorar conectividade
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 AppState: Conexão restaurada');
      setState(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      console.log('📡 AppState: Conexão perdida');
      setState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Determinar o passo atual baseado no estado da aplicação
  useEffect(() => {
    const determineCurrentStep = (): AppState['currentStep'] => {
      if (authLoading || onboardingLoading) {
        return 'loading';
      }

      if (!user || !session) {
        return 'auth';
      }

      if (onboardingError) {
        return 'auth';
      }

      if (hasPendingCompany || (!hasCompany && !hasPendingCompany)) {
        return 'onboarding';
      }

      if (isComplete && hasCompany) {
        return 'dashboard';
      }

      return 'loading';
    };

    const currentStep = determineCurrentStep();
    console.log('🎯 AppState: Passo atual determinado:', currentStep, {
      authLoading,
      onboardingLoading,
      hasUser: !!user,
      hasSession: !!session,
      isComplete,
      hasCompany,
      hasPendingCompany,
      onboardingError
    });

    setState(prev => ({ ...prev, currentStep }));
  }, [
    authLoading,
    onboardingLoading,
    user,
    session,
    isComplete,
    hasCompany,
    hasPendingCompany,
    onboardingError
  ]);

  // Determinar se a aplicação está pronta
  useEffect(() => {
    const isReady = !authLoading && !onboardingLoading && state.isInitialized;
    console.log('✅ AppState: Aplicação pronta:', isReady, {
      authLoading,
      onboardingLoading,
      isInitialized: state.isInitialized
    });

    setState(prev => ({ ...prev, isReady }));
  }, [authLoading, onboardingLoading, state.isInitialized]);

  // Marcar como inicializada após um delay
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🚀 AppState: Aplicação inicializada');
      setState(prev => ({ ...prev, isInitialized: true }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Gerenciar erros
  const setError = useCallback((message: string) => {
    console.error('❌ AppState: Erro definido:', message);
    setState(prev => ({
      ...prev,
      hasError: true,
      errorMessage: message
    }));
  }, []);

  const clearError = useCallback(() => {
    console.log('🧹 AppState: Erro limpo');
    setState(prev => ({
      ...prev,
      hasError: false,
      errorMessage: undefined
    }));
  }, []);

  // Refresh da aplicação
  const refreshApp = useCallback(() => {
    console.log('🔄 AppState: Refresh da aplicação');
    setState(prev => ({
      ...prev,
      isInitialized: false,
      isReady: false,
      currentStep: 'loading',
      hasError: false,
      errorMessage: undefined,
      lastSync: new Date()
    }));

    // Recarregar a página após um delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  // Definir passo atual
  const setCurrentStep = useCallback((step: AppState['currentStep']) => {
    console.log('🎯 AppState: Passo definido manualmente:', step);
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  // Limpar erro automaticamente após 5 segundos
  useEffect(() => {
    if (state.hasError) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.hasError, clearError]);

  const contextValue: AppStateContextType = {
    ...state,
    setError,
    clearError,
    refreshApp,
    setCurrentStep
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
