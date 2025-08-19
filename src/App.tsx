import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { apm } from '@/lib/apm';
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
    apm.init();
    
    // Initialize AI
    ai.init();
    
    // Track initial page view
    apm.trackPageView('App Initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TenantProvider>
            <Router>
              <div className="App">
                <AppRoutes />
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
              </div>
            </Router>
          </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
