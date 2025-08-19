import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import AppRoutes from '@/routes';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { AdvancedPerformanceMonitor } from '@/components/AdvancedPerformanceMonitor';
import { SEOHead } from '@/components/SEOHead';
import './App.css';

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TenantProvider>
            <SEOHead />
            <AppRoutes />
            <PWAInstallPrompt />
            <PerformanceMonitor showInConsole={true} showInUI={process.env.NODE_ENV === 'development'} />
            <AdvancedPerformanceMonitor />
            <Toaster />
          </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
