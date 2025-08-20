import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { AccessibilityProvider } from '@/components/AccessibilityProvider';
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
    console.log('App Initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <ThemeProvider>
          <AuthProvider>
                      <TenantProvider>
            <div className="App">
              <a href="#main-content" className="skip-link">
                Pular para o conteúdo principal
              </a>
              <div id="main-content">
                <AppRoutes />
              </div>
              <PWAInstallPrompt />
            
            {/* Development Monitors - Only show in development */}
            {process.env.NODE_ENV === 'development' && (
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
            />
            
            {/* ARIA live regions for accessibility */}
            <div aria-live="polite" aria-atomic="true" className="sr-only" id="status-updates"></div>
            <div aria-live="assertive" aria-atomic="true" className="sr-only" id="error-announcements"></div>
          </div>
        </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}

export default App;
// Force deploy - Tue Aug 19 13:57:04 -03 2025
// Force deploy - Tue Aug 19 14:16:09 -03 2025
// ULTIMO DEPLOY FORÇADO - Tue Aug 19 14:40:22 -03 2025 - Vercel não está aplicando deploys
// DEPLOY FORÇADO - Tue Aug 19 15:00:35 -03 2025 - Cache reduzido para 5 minutos
// DEPLOY OTIMIZADO - Tue Aug 19 15:12:39 -03 2025 - Correções aplicadas: console.log, vite config, bundle size
// DEPLOY FINAL - Tue Aug 19 15:26:11 -03 2025 - vercel.json corrigido e validado
// DEPLOY RADICAL - Tue Aug 19 15:41:22 -03 2025 - vercel.json removido para resolver conflito
// DEPLOY FORÇADO - Tue Aug 19 16:06:33 -03 2025 - vercel.json aplicado
// DEPLOY FINAL - Tue Aug 19 16:14:58 -03 2025 - vercel.json definitivo aplicado
// DEPLOY DEFINITIVO - Tue Aug 19 16:23:46 -03 2025 - vercel.json perfeito aplicado
