import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  url?: string;
  sessionId?: string;
  userId?: string;
}

interface PerformanceData {
  metrics: {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    ttfb: number | null;
    fcp: number | null;
    loadTime: number | null;
    bundleSize: number | null;
    chunkCount: number | null;
  };
  score: number;
  url: string;
  environment: string;
}

export function useEdgeAnalytics() {
  const { user } = useAuth();
  const sessionId = useRef<string>(generateSessionId());
  const isOnline = useRef<boolean>(navigator.onLine);

  // Gerar session ID único
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Detectar mudanças de conectividade
  useEffect(() => {
    const handleOnline = () => {
      isOnline.current = true;
      console.log('Analytics: Conexão restaurada');
    };

    const handleOffline = () => {
      isOnline.current = false;
      console.log('Analytics: Conexão perdida');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Enviar evento de analytics
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    if (!isOnline.current) {
      // Armazenar offline para envio posterior
      storeOfflineEvent(event);
      return;
    }

    try {
      const analyticsData = {
        ...event,
        sessionId: sessionId.current,
        userId: user?.id,
        url: event.url || window.location.href,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
      });

      if (!response.ok) {
        throw new Error(`Analytics error: ${response.status}`);
      }

      console.log('Analytics Event:', analyticsData);
    } catch (error) {
      console.error('Analytics Error:', error);
      // Armazenar para retry
      storeOfflineEvent(event);
    }
  }, [user]);

  // Enviar métricas de performance
  const trackPerformance = useCallback(async (data: PerformanceData) => {
    if (!isOnline.current) {
      storeOfflinePerformance(data);
      return;
    }

    try {
      const performanceData = {
        ...data,
        sessionId: sessionId.current,
        userId: user?.id,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceData),
      });

      if (!response.ok) {
        throw new Error(`Performance tracking error: ${response.status}`);
      }

      console.log('Performance Data:', performanceData);
    } catch (error) {
      console.error('Performance Tracking Error:', error);
      storeOfflinePerformance(data);
    }
  }, [user]);

  // Verificar health status
  const checkHealth = useCallback(async () => {
    try {
      const response = await fetch('/api/health');
      const healthData = await response.json();
      
      console.log('Health Check:', healthData);
      return healthData;
    } catch (error) {
      console.error('Health Check Error:', error);
      return { status: 'error', error: error.message };
    }
  }, []);

  // Buscar métricas agregadas
  const getAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics');
      const analyticsData = await response.json();
      
      return analyticsData;
    } catch (error) {
      console.error('Analytics Fetch Error:', error);
      return null;
    }
  }, []);

  // Buscar métricas de performance
  const getPerformanceMetrics = useCallback(async () => {
    try {
      const response = await fetch('/api/performance');
      const performanceData = await response.json();
      
      return performanceData;
    } catch (error) {
      console.error('Performance Metrics Fetch Error:', error);
      return null;
    }
  }, []);

  // Armazenar eventos offline
  const storeOfflineEvent = (event: AnalyticsEvent) => {
    try {
      const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics') || '[]');
      offlineEvents.push({
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: sessionId.current,
        userId: user?.id,
      });
      localStorage.setItem('offline_analytics', JSON.stringify(offlineEvents.slice(-50))); // Manter apenas os últimos 50
    } catch (error) {
      console.error('Error storing offline event:', error);
    }
  };

  // Armazenar performance offline
  const storeOfflinePerformance = (data: PerformanceData) => {
    try {
      const offlinePerformance = JSON.parse(localStorage.getItem('offline_performance') || '[]');
      offlinePerformance.push({
        ...data,
        timestamp: new Date().toISOString(),
        sessionId: sessionId.current,
        userId: user?.id,
      });
      localStorage.setItem('offline_performance', JSON.stringify(offlinePerformance.slice(-10))); // Manter apenas os últimos 10
    } catch (error) {
      console.error('Error storing offline performance:', error);
    }
  };

  // Sincronizar dados offline
  const syncOfflineData = useCallback(async () => {
    if (!isOnline.current) return;

    try {
      // Sincronizar eventos offline
      const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics') || '[]');
      if (offlineEvents.length > 0) {
        for (const event of offlineEvents) {
          await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
          });
        }
        localStorage.removeItem('offline_analytics');
        console.log(`Synced ${offlineEvents.length} offline analytics events`);
      }

      // Sincronizar performance offline
      const offlinePerformance = JSON.parse(localStorage.getItem('offline_performance') || '[]');
      if (offlinePerformance.length > 0) {
        for (const data of offlinePerformance) {
          await fetch('/api/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        }
        localStorage.removeItem('offline_performance');
        console.log(`Synced ${offlinePerformance.length} offline performance events`);
      }
    } catch (error) {
      console.error('Offline sync error:', error);
    }
  }, []);

  // Sincronizar quando voltar online
  useEffect(() => {
    if (isOnline.current) {
      syncOfflineData();
    }
  }, [syncOfflineData]);

  // Eventos pré-definidos
  const trackPageView = useCallback((page: string) => {
    trackEvent({
      event: 'page_view',
      properties: {
        page,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
    });
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonId: string, page: string) => {
    trackEvent({
      event: 'button_click',
      properties: {
        buttonId,
        page,
        timestamp: Date.now(),
      },
    });
  }, [trackEvent]);

  const trackFormSubmission = useCallback((formId: string, success: boolean) => {
    trackEvent({
      event: 'form_submission',
      properties: {
        formId,
        success,
        timestamp: Date.now(),
      },
    });
  }, [trackEvent]);

  const trackError = useCallback((error: string, context: string) => {
    trackEvent({
      event: 'error',
      properties: {
        error,
        context,
        timestamp: Date.now(),
        url: window.location.href,
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPerformance,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackError,
    checkHealth,
    getAnalytics,
    getPerformanceMetrics,
    syncOfflineData,
    isOnline: isOnline.current,
    sessionId: sessionId.current,
  };
}
