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
import { useEdgeAnalytics } from '@/hooks/useEdgeAnalytics';
import { useSecurity } from '@/hooks/useSecurity';
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

function AppContent() {
  const { trackPageView, trackPerformance } = useEdgeAnalytics();
  const { logLoginAttempt, logDataAccess, logSecurityIncident } = useSecurity();

  // Track page views
  React.useEffect(() => {
    trackPageView(window.location.pathname);
  }, [trackPageView]);

  // Track performance metrics
  React.useEffect(() => {
    const trackPerformanceMetrics = () => {
      if ('performance' in window) {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const metrics = {
            lcp: null,
            fid: null,
            cls: null,
            ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
            fcp: null,
            loadTime: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            bundleSize: 0,
            chunkCount: 0,
          };

          // Get bundle size from resource timing
          const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
          const scriptEntries = resourceEntries.filter(entry => entry.initiatorType === 'script');
          metrics.bundleSize = scriptEntries.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
          metrics.chunkCount = scriptEntries.length;

          trackPerformance({
            metrics,
            score: 85, // Default score
            url: window.location.href,
            environment: process.env.NODE_ENV || 'production',
          });
        }
      }
    };

    // Track after page load
    window.addEventListener('load', trackPerformanceMetrics);
    return () => window.removeEventListener('load', trackPerformanceMetrics);
  }, [trackPerformance]);

  // Security monitoring
  React.useEffect(() => {
    // Monitor for security incidents
    const handleSecurityIncident = (event: ErrorEvent) => {
      logSecurityIncident('javascript_error', 'error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.toString()
      });
    };

    window.addEventListener('error', handleSecurityIncident);
    return () => window.removeEventListener('error', handleSecurityIncident);
  }, [logSecurityIncident]);

  return (
    <>
      <SEOHead />
      <AppRoutes />
      <PWAInstallPrompt />
      <PerformanceMonitor showInConsole={true} showInUI={process.env.NODE_ENV === 'development'} />
      <AdvancedPerformanceMonitor />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TenantProvider>
            <AppContent />
          </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
