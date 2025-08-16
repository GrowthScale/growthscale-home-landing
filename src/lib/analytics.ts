// =====================================================
// ANALYTICS & MONITORING - GROWTHSCALE
// Sistema de analytics e monitoramento
// =====================================================

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Tipos para eventos de analytics
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp?: number;
  sessionId?: string;
}

export interface UserProperties extends Record<string, unknown> {
  userId: string;
  email: string;
  role: string;
  companyId?: string;
  plan?: string;
  signupDate: string;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  userId?: string;
  timestamp: number;
}

// Configuração do analytics
const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID,
  
  // Mixpanel
  MIXPANEL_TOKEN: import.meta.env.VITE_MIXPANEL_TOKEN,
  
  // Sentry (Error tracking)
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  
  // Hotjar (User behavior)
  HOTJAR_ID: import.meta.env.VITE_HOTJAR_ID,
  
  // Amplitude
  AMPLITUDE_API_KEY: import.meta.env.VITE_AMPLITUDE_API_KEY
};

class Analytics {
  private static instance: Analytics;
  private sessionId: string;
  private userId?: string;
  private isInitialized = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Inicializar analytics
  async initialize(userId?: string): Promise<void> {
    if (this.isInitialized) return;

    this.userId = userId;
    
    // Inicializar Google Analytics 4
    if (ANALYTICS_CONFIG.GA4_MEASUREMENT_ID) {
      await this.initializeGA4();
    }

    // Inicializar Mixpanel
    if (ANALYTICS_CONFIG.MIXPANEL_TOKEN) {
      await this.initializeMixpanel();
    }

    // Inicializar Sentry (comentado até instalar a dependência)
    // if (ANALYTICS_CONFIG.SENTRY_DSN) {
    //   await this.initializeSentry();
    // }

    // Inicializar Hotjar
    if (ANALYTICS_CONFIG.HOTJAR_ID) {
      this.initializeHotjar();
    }

    // Inicializar Amplitude
    if (ANALYTICS_CONFIG.AMPLITUDE_API_KEY) {
      await this.initializeAmplitude();
    }

    this.isInitialized = true;
    console.log('✅ Analytics initialized');
  }

  // Track de eventos
  track(event: string, properties?: Record<string, unknown>): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: Date.now()
      },
      userId: this.userId,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };

    // Enviar para todos os serviços configurados
    this.sendToGA4(analyticsEvent);
    this.sendToMixpanel(analyticsEvent);
    this.sendToAmplitude(analyticsEvent);
    
    // Log local em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsEvent);
    }
  }

  // Track de page views
  trackPageView(path: string, title: string, referrer?: string): void {
    const pageView: PageView = {
      path,
      title,
      referrer,
      userId: this.userId,
      timestamp: Date.now()
    };

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
        page_path: path,
        page_title: title
      });
    }

    // Mixpanel
    if (window.mixpanel && typeof window.mixpanel.track === 'function') {
      window.mixpanel.track('Page View', {
        path,
        title,
        referrer
      });
    }

    // Amplitude
    if (window.amplitude && typeof window.amplitude.getInstance === 'function') {
      const amplitudeInstance = window.amplitude.getInstance();
      if (amplitudeInstance && typeof amplitudeInstance.logEvent === 'function') {
        amplitudeInstance.logEvent('Page View', {
          path,
          title,
          referrer
        });
      }
    }

    // Log local
    if (process.env.NODE_ENV === 'development') {
      console.log('📄 Page View:', pageView);
    }
  }

  // Track de erros
  trackError(error: Error, context?: Record<string, unknown>): void {
    const errorEvent = {
      event: 'Error',
      properties: {
        message: error.message,
        stack: error.stack,
        context,
        sessionId: this.sessionId,
        timestamp: Date.now()
      },
      userId: this.userId
    };

    // Sentry (comentado até instalar a dependência)
    // if (window.Sentry && typeof window.Sentry.captureException === 'function') {
    //   window.Sentry.captureException(error, {
    //     extra: context,
    //     user: this.userId ? { id: this.userId } : undefined
    //   });
    // }

    // Enviar para outros serviços
    this.track('Error', errorEvent.properties);
  }

  // Track de performance
  trackPerformance(metric: string, value: number, properties?: Record<string, unknown>): void {
    const performanceEvent = {
      event: 'Performance',
      properties: {
        metric,
        value,
        ...properties,
        sessionId: this.sessionId,
        timestamp: Date.now()
      },
      userId: this.userId
    };

    this.track('Performance', performanceEvent.properties);
  }

  // Identificar usuário
  identify(userId: string, properties: UserProperties): void {
    this.userId = userId;

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
        user_id: userId
      });
    }

    // Mixpanel
    if (window.mixpanel) {
      if (typeof window.mixpanel.identify === 'function') {
        window.mixpanel.identify(userId);
      }
      if (window.mixpanel.people && typeof window.mixpanel.people.set === 'function') {
        window.mixpanel.people.set(properties);
      }
    }

    // Amplitude
    if (window.amplitude && typeof window.amplitude.getInstance === 'function') {
      const amplitudeInstance = window.amplitude.getInstance();
      if (amplitudeInstance) {
        if (typeof amplitudeInstance.setUserId === 'function') {
          amplitudeInstance.setUserId(userId);
        }
        if (typeof amplitudeInstance.setUserProperties === 'function') {
          amplitudeInstance.setUserProperties(properties);
        }
      }
    }

    // Sentry (comentado até instalar a dependência)
    // if (window.Sentry && typeof window.Sentry.setUser === 'function') {
    //   window.Sentry.setUser({ id: userId, email: properties.email });
    // }
  }

  // Eventos específicos do GrowthScale
  trackLogin(method: string, success: boolean): void {
    this.track('User Login', {
      method,
      success,
      timestamp: Date.now()
    });
  }

  trackEmployeeCreated(employeeData: Record<string, unknown>): void {
    this.track('Employee Created', {
      employeeId: employeeData.id,
      department: employeeData.department,
      position: employeeData.position
    });
  }

  trackScheduleCreated(scheduleData: Record<string, unknown>): void {
    this.track('Schedule Created', {
      scheduleId: scheduleData.id,
      employeeCount: Array.isArray(scheduleData.employees) ? scheduleData.employees.length : 0,
      weekStart: scheduleData.weekStart
    });
  }

  trackComplianceViolation(violationData: Record<string, unknown>): void {
    this.track('Compliance Violation', {
      violationType: violationData.type,
      severity: violationData.severity,
      employeeId: violationData.employeeId
    });
  }

  trackFeatureUsage(feature: string, action: string): void {
    this.track('Feature Usage', {
      feature,
      action,
      timestamp: Date.now()
    });
  }

  // Métodos privados para inicialização
  private async initializeGA4(): Promise<void> {
    if (!ANALYTICS_CONFIG.GA4_MEASUREMENT_ID) return;

    // Carregar script do GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID);
  }

  private async initializeMixpanel(): Promise<void> {
    if (!ANALYTICS_CONFIG.MIXPANEL_TOKEN) return;

    // Carregar script do Mixpanel
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.mxpnl.com/libs/mixpanel-2.2.0.min.js';
    document.head.appendChild(script);

    script.onload = () => {
      if (window.mixpanel && typeof window.mixpanel.init === 'function') {
        window.mixpanel.init(ANALYTICS_CONFIG.MIXPANEL_TOKEN);
      }
    };
  }

  // private async initializeSentry(): Promise<void> {
  //   if (!ANALYTICS_CONFIG.SENTRY_DSN) return;
  //   // Implementar quando instalar @sentry/react
  // }

  private initializeHotjar(): void {
    if (!ANALYTICS_CONFIG.HOTJAR_ID) return;

    // Carregar Hotjar
    (function(h: Record<string, unknown>, o: Document, t: string, j: string, a?: HTMLElement, r?: HTMLScriptElement) {
      h.hj = h.hj || function(...args: unknown[]) {
        (h.hj as Record<string, unknown[]>).q = (h.hj as Record<string, unknown[]>).q || [];
        (h.hj as Record<string, unknown[]>).q.push(args);
      };
      h._hjSettings = { hjid: ANALYTICS_CONFIG.HOTJAR_ID, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = true;
      r.src = t + (h._hjSettings as Record<string, unknown>).hjid + j + (h._hjSettings as Record<string, unknown>).hjsv;
      a.appendChild(r);
    })(window as unknown as Record<string, unknown>, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }

  private async initializeAmplitude(): Promise<void> {
    if (!ANALYTICS_CONFIG.AMPLITUDE_API_KEY) return;

    // Amplitude comentado até instalar a dependência
    console.log('Amplitude initialization skipped - dependency not installed');
  }

  // Métodos privados para envio de dados
  private sendToGA4(event: AnalyticsEvent): void {
    if (window.gtag && ANALYTICS_CONFIG.GA4_MEASUREMENT_ID) {
      window.gtag('event', event.event, {
        ...event.properties,
        user_id: event.userId
      });
    }
  }

  private sendToMixpanel(event: AnalyticsEvent): void {
    if (window.mixpanel && typeof window.mixpanel.track === 'function') {
      window.mixpanel.track(event.event, {
        ...event.properties,
        distinct_id: event.userId
      });
    }
  }

  private sendToAmplitude(event: AnalyticsEvent): void {
    if (window.amplitude && typeof window.amplitude.getInstance === 'function') {
      const amplitudeInstance = window.amplitude.getInstance();
      if (amplitudeInstance && typeof amplitudeInstance.logEvent === 'function') {
        amplitudeInstance.logEvent(event.event, {
          ...event.properties,
          user_id: event.userId
        });
      }
    }
  }

  // Gerar session ID
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Hook para usar analytics
export const useAnalytics = () => {
  const { user } = useAuth();
  const analytics = Analytics.getInstance();

  // Inicializar quando usuário mudar
  React.useEffect(() => {
    if (user) {
      analytics.initialize(user.id);
      analytics.identify(user.id, {
        userId: user.id,
        email: user.email,
        role: 'user', // Valor padrão
        companyId: undefined,
        plan: undefined,
        signupDate: new Date().toISOString()
      });
    }
  }, [user, analytics]);

  return analytics;
};

// Export da instância
export const analytics = Analytics.getInstance();

// Tipos globais
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    mixpanel: {
      init?: (token: string) => void;
      track?: (event: string, properties?: Record<string, unknown>) => void;
      identify?: (userId: string) => void;
      people?: {
        set?: (properties: Record<string, unknown>) => void;
      };
    };
    Sentry?: {
      captureException?: (error: Error, options?: Record<string, unknown>) => void;
      setUser?: (user: Record<string, unknown>) => void;
    };
    amplitude?: {
      getInstance?: () => {
        init?: (apiKey: string) => void;
        logEvent?: (event: string, properties?: Record<string, unknown>) => void;
        setUserId?: (userId: string) => void;
        setUserProperties?: (properties: Record<string, unknown>) => void;
      };
    };
  }
}
