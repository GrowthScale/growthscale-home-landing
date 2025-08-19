import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apm } from '@/lib/apm';

interface UserBehavior {
  sessionId: string;
  userId?: string;
  startTime: Date;
  pageViews: PageView[];
  interactions: Interaction[];
  performance: PerformanceMetric[];
  errors: ErrorEvent[];
  conversions: Conversion[];
}

interface PageView {
  url: string;
  title: string;
  timestamp: Date;
  timeSpent: number;
  referrer: string;
}

interface Interaction {
  type: 'click' | 'scroll' | 'form_submit' | 'navigation' | 'hover';
  element: string;
  timestamp: Date;
  properties: Record<string, any>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  category: 'navigation' | 'resource' | 'paint' | 'layout';
}

interface ErrorEvent {
  message: string;
  stack?: string;
  timestamp: Date;
  severity: 'error' | 'warning' | 'info';
}

interface Conversion {
  type: string;
  value: number;
  timestamp: Date;
  properties: Record<string, any>;
}

interface FunnelStep {
  name: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
}

interface CohortData {
  cohort: string;
  size: number;
  retention: number[];
  churn: number;
}

export function useAdvancedAnalytics() {
  const { user } = useAuth();
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    sessionId: generateSessionId(),
    userId: user?.id,
    startTime: new Date(),
    pageViews: [],
    interactions: [],
    performance: [],
    errors: [],
    conversions: [],
  });

  const sessionStartTime = useRef<Date>(new Date());
  const lastPageView = useRef<Date>(new Date());
  const isTracking = useRef<boolean>(true);

  // Generate unique session ID
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track page view
  const trackPageView = useCallback((url: string, title: string) => {
    if (!isTracking.current) {return;}

    const now = new Date();
    const timeSpent = now.getTime() - lastPageView.current.getTime();
    
    const pageView: PageView = {
      url,
      title,
      timestamp: now,
      timeSpent,
      referrer: document.referrer,
    };

    setUserBehavior(prev => ({
      ...prev,
      pageViews: [...prev.pageViews, pageView],
    }));

    lastPageView.current = now;

    // Send to APM
    apm.trackPageView(title, {
      url,
      timeSpent,
      referrer: document.referrer,
    });
  }, []);

  // Track user interaction
  const trackInteraction = useCallback((
    type: Interaction['type'],
    element: string,
    properties: Record<string, any> = {}
  ) => {
    if (!isTracking.current) {return;}

    const interaction: Interaction = {
      type,
      element,
      timestamp: new Date(),
      properties,
    };

    setUserBehavior(prev => ({
      ...prev,
      interactions: [...prev.interactions, interaction],
    }));

    // Send to APM
    apm.trackUserAction(type, {
      element,
      ...properties,
    });
  }, []);

  // Track performance metric
  const trackPerformance = useCallback((
    name: string,
    value: number,
    category: PerformanceMetric['category'] = 'navigation'
  ) => {
    if (!isTracking.current) {return;}

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      category,
    };

    setUserBehavior(prev => ({
      ...prev,
      performance: [...prev.performance, metric],
    }));

    // Send to APM
    apm.trackPerformance(name, value, { category });
  }, []);

  // Track error
  const trackError = useCallback((
    message: string,
    stack?: string,
    severity: ErrorEvent['severity'] = 'error'
  ) => {
    if (!isTracking.current) {return;}

    const error: ErrorEvent = {
      message,
      stack,
      timestamp: new Date(),
      severity,
    };

    setUserBehavior(prev => ({
      ...prev,
      errors: [...prev.errors, error],
    }));

    // Send to APM
    apm.captureError(new Error(message), { stack, severity });
  }, []);

  // Track conversion
  const trackConversion = useCallback((
    type: string,
    value: number,
    properties: Record<string, any> = {}
  ) => {
    if (!isTracking.current) {return;}

    const conversion: Conversion = {
      type,
      value,
      timestamp: new Date(),
      properties,
    };

    setUserBehavior(prev => ({
      ...prev,
      conversions: [...prev.conversions, conversion],
    }));

    // Send to APM
    apm.trackEvent('conversion', {
      type,
      value,
      ...properties,
    });
  }, []);

  // Calculate funnel analysis
  const calculateFunnel = useCallback((steps: string[]): FunnelStep[] => {
    const pageViews = userBehavior.pageViews;
    const funnel: FunnelStep[] = [];

    steps.forEach((step, index) => {
      const stepViews = pageViews.filter(pv => 
        pv.url.includes(step) || pv.title.toLowerCase().includes(step.toLowerCase())
      ).length;

      const previousStep = funnel[index - 1];
      const conversionRate = previousStep 
        ? (stepViews / previousStep.count) * 100 
        : 100;
      
      const dropoffRate = previousStep 
        ? ((previousStep.count - stepViews) / previousStep.count) * 100 
        : 0;

      funnel.push({
        name: step,
        count: stepViews,
        conversionRate,
        dropoffRate,
      });
    });

    return funnel;
  }, [userBehavior.pageViews]);

  // Calculate cohort analysis
  const calculateCohorts = useCallback((days: number = 30): CohortData[] => {
    const now = new Date();
    const cohorts: CohortData[] = [];

    for (let i = 0; i < days; i += 7) {
      const cohortDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const cohort = cohortDate.toISOString().split('T')[0];
      
      // Simulate cohort data (in real app, this would come from database)
      const size = Math.floor(Math.random() * 100) + 10;
      const retention = Array.from({ length: 4 }, () => 
        Math.random() * 100
      );
      const churn = Math.random() * 20;

      cohorts.push({
        cohort,
        size,
        retention,
        churn,
      });
    }

    return cohorts;
  }, []);

  // Get user engagement metrics
  const getEngagementMetrics = useCallback(() => {
    const sessionDuration = new Date().getTime() - sessionStartTime.current.getTime();
    const pageViews = userBehavior.pageViews.length;
    const interactions = userBehavior.interactions.length;
    const errors = userBehavior.errors.length;
    const conversions = userBehavior.conversions.length;

    return {
      sessionDuration,
      pageViews,
      interactions,
      errors,
      conversions,
      avgTimePerPage: pageViews > 0 ? sessionDuration / pageViews : 0,
      interactionRate: pageViews > 0 ? interactions / pageViews : 0,
      errorRate: pageViews > 0 ? errors / pageViews : 0,
      conversionRate: pageViews > 0 ? conversions / pageViews : 0,
    };
  }, [userBehavior]);

  // Get performance insights
  const getPerformanceInsights = useCallback(() => {
    const metrics = userBehavior.performance;
    
    const avgLoadTime = metrics
      .filter(m => m.name === 'load_time')
      .reduce((sum, m) => sum + m.value, 0) / 
      Math.max(metrics.filter(m => m.name === 'load_time').length, 1);

    const avgRenderTime = metrics
      .filter(m => m.name === 'render_time')
      .reduce((sum, m) => sum + m.value, 0) / 
      Math.max(metrics.filter(m => m.name === 'render_time').length, 1);

    const slowPages = metrics
      .filter(m => m.value > 3000)
      .map(m => ({ name: m.name, value: m.value, timestamp: m.timestamp }));

    return {
      avgLoadTime,
      avgRenderTime,
      slowPages,
      totalMetrics: metrics.length,
    };
  }, [userBehavior.performance]);

  // Start/stop tracking
  const startTracking = useCallback(() => {
    isTracking.current = true;
    sessionStartTime.current = new Date();
    lastPageView.current = new Date();
  }, []);

  const stopTracking = useCallback(() => {
    isTracking.current = false;
  }, []);

  // Export user behavior data
  const exportUserBehavior = useCallback(() => {
    return {
      ...userBehavior,
      sessionDuration: new Date().getTime() - sessionStartTime.current.getTime(),
      exportTimestamp: new Date().toISOString(),
    };
  }, [userBehavior]);

  // Auto-track performance metrics
  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            trackPerformance('load_time', navEntry.loadEventEnd - navEntry.loadEventStart);
            trackPerformance('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
          } else if (entry.entryType === 'paint') {
            const paintEntry = entry as PerformancePaintTiming;
            trackPerformance(paintEntry.name, paintEntry.startTime, 'paint');
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'paint'] });

      return () => observer.disconnect();
    }
  }, [trackPerformance]);

  // Auto-track errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(event.message, event.error?.stack);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(event.reason?.message || 'Unhandled Promise Rejection', event.reason?.stack);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackError]);

  return {
    userBehavior,
    trackPageView,
    trackInteraction,
    trackPerformance,
    trackError,
    trackConversion,
    calculateFunnel,
    calculateCohorts,
    getEngagementMetrics,
    getPerformanceInsights,
    startTracking,
    stopTracking,
    exportUserBehavior,
  };
}
