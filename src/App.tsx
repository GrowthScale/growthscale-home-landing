import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { AppStateProvider } from '@/hooks/useAppState';
import { AccessibilityProvider } from '@/components/AccessibilityProvider';
import { GlobalLoading } from '@/components/GlobalLoading';
import { initializeAPM } from '@/lib/apm';
import { ai } from '@/lib/ai';
import AppRoutes from '@/routes';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { AdvancedPerformanceMonitor } from '@/components/AdvancedPerformanceMonitor';
import { EdgeAnalyticsDashboard } from '@/components/EdgeAnalyticsDashboard';
import { SecurityDashboard } from '@/components/SecurityDashboard';
import { AIDashboard } from '@/components/AIDashboard';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize APM
    initializeAPM();
    
    // Initialize AI
    ai.init();
    
    // Log initial page view
    console.log('🚀 App: Inicializando aplicação', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      environment: import.meta.env.MODE,
      version: import.meta.env.VITE_APP_VERSION || '1.0.0'
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <ThemeProvider>
          <AuthProvider>
            <TenantProvider>
              <AppStateProvider>
                <div className="App">
                  <div id="main-content">
                    <AppRoutes />
                  </div>
                  <PWAInstallPrompt />
                
                {/* Development Monitors - Only show in development */}
                {import.meta.env.DEV && (
                  <div className="fixed bottom-4 right-4 space-y-2 z-50">
                    <PerformanceMonitor />
                    <AdvancedPerformanceMonitor />
                    <EdgeAnalyticsDashboard />
                    <SecurityDashboard />
                    <AIDashboard />
                  </div>
                )}
                
                <Toaster 
                  position="top-right"
                  richColors
                  closeButton
                  duration={4000}
                  toastOptions={{
                    style: {
                      background: 'hsl(var(--background))',
                      color: 'hsl(var(--foreground))',
                      border: '1px solid hsl(var(--border))',
                    },
                  }}
                />
                
                {/* ARIA live regions for accessibility */}
                <div aria-live="polite" aria-atomic="true" className="sr-only" id="status-updates"></div>
                <div aria-live="assertive" aria-atomic="true" className="sr-only" id="error-announcements"></div>
              </div>
            </AppStateProvider>
          </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}

export default App;
