import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

interface PageView {
  path: string;
  title: string;
  tenantId?: string;
  userId?: string;
  timestamp: number;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private pageViews: PageView[] = [];
  private isEnabled: boolean = false;

  constructor() {
    // Check if analytics is enabled
    this.isEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
    
    // Load existing data from localStorage
    this.loadFromStorage();
    
    // Save data periodically
    setInterval(() => {
      this.saveToStorage();
    }, 30000); // Save every 30 seconds
  }

  private loadFromStorage() {
    try {
      const savedEvents = localStorage.getItem('analytics_events');
      const savedPageViews = localStorage.getItem('analytics_pageviews');
      
      if (savedEvents) {
        this.events = JSON.parse(savedEvents);
      }
      
      if (savedPageViews) {
        this.pageViews = JSON.parse(savedPageViews);
      }
    } catch (error) {
      console.warn('Failed to load analytics data from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('analytics_events', JSON.stringify(this.events));
      localStorage.setItem('analytics_pageviews', JSON.stringify(this.pageViews));
    } catch (error) {
      console.warn('Failed to save analytics data to storage:', error);
    }
  }

  trackEvent(event: string, properties?: Record<string, unknown>) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    
    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    // Send to analytics service if configured
    this.sendToAnalyticsService(analyticsEvent);
  }

  trackPageView(path: string, title: string, tenantId?: string, userId?: string) {
    if (!this.isEnabled) return;

    const pageView: PageView = {
      path,
      title,
      tenantId,
      userId,
      timestamp: Date.now(),
    };

    this.pageViews.push(pageView);
    
    // Keep only last 1000 page views
    if (this.pageViews.length > 1000) {
      this.pageViews = this.pageViews.slice(-1000);
    }

    // Send to analytics service if configured
    this.sendPageViewToAnalyticsService(pageView);
  }

  private sendToAnalyticsService(event: AnalyticsEvent) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', event.event, {
        ...event.properties,
        event_timestamp: event.timestamp,
      });
    }

    // Custom analytics endpoint
    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (analyticsEndpoint) {
      fetch(analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).catch(error => {
        console.warn('Failed to send analytics event:', error);
      });
    }
  }

  private sendPageViewToAnalyticsService(pageView: PageView) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
        page_path: pageView.path,
        page_title: pageView.title,
        custom_map: {
          tenant_id: 'tenant_id',
          user_id: 'user_id',
        },
        tenant_id: pageView.tenantId,
        user_id: pageView.userId,
      });
    }

    // Custom analytics endpoint
    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (analyticsEndpoint) {
      fetch(`${analyticsEndpoint}/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageView),
      }).catch(error => {
        console.warn('Failed to send page view to analytics:', error);
      });
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getPageViews(): PageView[] {
    return [...this.pageViews];
  }

  clearData() {
    this.events = [];
    this.pageViews = [];
    localStorage.removeItem('analytics_events');
    localStorage.removeItem('analytics_pageviews');
  }

  exportData() {
    return {
      events: this.events,
      pageViews: this.pageViews,
      exportedAt: new Date().toISOString(),
    };
  }
}

// Global analytics service instance
const analyticsService = new AnalyticsService();

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const useAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  // Track page views automatically
  useEffect(() => {
    const path = location.pathname;
    const title = document.title || 'GrowthScale';
    
    analyticsService.trackPageView(
      path,
      title,
      currentTenant?.id,
      user?.id
    );
  }, [location.pathname, currentTenant?.id, user?.id]);

  const trackEvent = useCallback((event: string, properties?: Record<string, unknown>) => {
    analyticsService.trackEvent(event, {
      ...properties,
      tenant_id: currentTenant?.id,
      user_id: user?.id,
      path: location.pathname,
    });
  }, [currentTenant?.id, user?.id, location.pathname]);

  const trackUserAction = useCallback((action: string, details?: Record<string, unknown>) => {
    trackEvent('user_action', {
      action,
      ...details,
    });
  }, [trackEvent]);

  const trackFeatureUsage = useCallback((feature: string, details?: Record<string, unknown>) => {
    trackEvent('feature_usage', {
      feature,
      ...details,
    });
  }, [trackEvent]);

  const trackError = useCallback((error: Error, context?: Record<string, unknown>) => {
    trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      ...context,
    });
  }, [trackEvent]);

  const trackPerformance = useCallback((metric: string, value: number, details?: Record<string, unknown>) => {
    trackEvent('performance', {
      metric,
      value,
      ...details,
    });
  }, [trackEvent]);

  const trackConversion = useCallback((funnel: string, step: string, details?: Record<string, unknown>) => {
    trackEvent('conversion', {
      funnel,
      step,
      ...details,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackUserAction,
    trackFeatureUsage,
    trackError,
    trackPerformance,
    trackConversion,
    getEvents: analyticsService.getEvents.bind(analyticsService),
    getPageViews: analyticsService.getPageViews.bind(analyticsService),
    clearData: analyticsService.clearData.bind(analyticsService),
    exportData: analyticsService.exportData.bind(analyticsService),
  };
};

// Predefined analytics events
export const AnalyticsEvents = {
  // User actions
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_REGISTER: 'user_register',
  USER_PROFILE_UPDATE: 'user_profile_update',
  
  // Feature usage
  EMPLOYEE_CREATED: 'employee_created',
  EMPLOYEE_UPDATED: 'employee_updated',
  EMPLOYEE_DELETED: 'employee_deleted',
  SCHEDULE_CREATED: 'schedule_created',
  SCHEDULE_UPDATED: 'schedule_updated',
  SCHEDULE_DELETED: 'schedule_deleted',
  COMPANY_CREATED: 'company_created',
  COMPANY_UPDATED: 'company_updated',
  COMPANY_DELETED: 'company_deleted',
  
  // Navigation
  NAVIGATION: 'navigation',
  SEARCH_PERFORMED: 'search_performed',
  FILTER_APPLIED: 'filter_applied',
  
  // Performance
  PAGE_LOAD_TIME: 'page_load_time',
  API_RESPONSE_TIME: 'api_response_time',
  
  // Errors
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
  NETWORK_ERROR: 'network_error',
  
  // Conversions
  SETUP_COMPLETED: 'setup_completed',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  FEATURE_ENABLED: 'feature_enabled',
} as const;

export default useAnalytics; 