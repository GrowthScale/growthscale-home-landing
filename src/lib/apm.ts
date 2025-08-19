// APM Configuration - Sentry and Basic Analytics
import * as Sentry from '@sentry/react';
import React from 'react';

// Sentry Configuration
export const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.VITE_SENTRY_DSN || 'https://your-sentry-dsn.ingest.sentry.io/project-id',
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: ['localhost', 'your-domain.vercel.app'],
        }),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        // Filter out sensitive data
        if (event.request?.headers) {
          delete event.request.headers['authorization'];
          delete event.request.headers['x-api-key'];
        }
        return event;
      },
    });
  }
};

// APM Service Class
export class APMService {
  private static instance: APMService;
  private isInitialized = false;
  private analyticsEvents: Array<{event: string; properties: any; timestamp: Date}> = [];

  static getInstance(): APMService {
    if (!APMService.instance) {
      APMService.instance = new APMService();
    }
    return APMService.instance;
  }

  init() {
    if (this.isInitialized) return;

    try {
      initSentry();
      this.isInitialized = true;
      console.log('APM services initialized successfully');
    } catch (error) {
      console.error('Failed to initialize APM services:', error);
    }
  }

  // Error Tracking
  captureError(error: Error, context?: Record<string, any>) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, {
        extra: context,
      });
    }
    console.error('APM Error:', error, context);
  }

  captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureMessage(message, level);
    }
    console.log(`APM ${level}:`, message);
  }

  // Performance Monitoring
  startTransaction(name: string, operation: string) {
    if (process.env.NODE_ENV === 'production') {
      return Sentry.startTransaction({
        name,
        op: operation,
      });
    }
    return null;
  }

  // User Tracking
  setUser(user: { id: string; email?: string; name?: string; role?: string }) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.setUser(user);
    }
    console.log('APM User Set:', user);
  }

  // Event Tracking (Local Analytics)
  trackEvent(eventName: string, properties?: Record<string, any>) {
    const event = {
      event: eventName,
      properties: properties || {},
      timestamp: new Date(),
    };

    this.analyticsEvents.push(event);
    
    // Keep only last 1000 events
    if (this.analyticsEvents.length > 1000) {
      this.analyticsEvents = this.analyticsEvents.slice(-1000);
    }

    console.log('APM Event:', event);
  }

  // Page View Tracking
  trackPageView(pageName: string, properties?: Record<string, any>) {
    this.trackEvent('page_view', {
      page_name: pageName,
      url: window.location.href,
      referrer: document.referrer,
      ...properties,
    });
  }

  // User Action Tracking
  trackUserAction(action: string, properties?: Record<string, any>) {
    this.trackEvent('user_action', {
      action,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  // Performance Tracking
  trackPerformance(metric: string, value: number, properties?: Record<string, any>) {
    this.trackEvent('performance_metric', {
      metric,
      value,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  // Get Analytics Events
  getAnalyticsEvents() {
    return this.analyticsEvents;
  }

  // Clear Analytics Events
  clearAnalyticsEvents() {
    this.analyticsEvents = [];
  }

  // Error Boundary
  withErrorBoundary<T extends React.ComponentType<any>>(
    Component: T
  ) {
    return Sentry.withErrorBoundary(Component, {
      beforeCapture: (scope) => {
        scope.setTag('component', Component.displayName || Component.name);
      },
    });
  }
}

// Export singleton instance
export const apm = APMService.getInstance();
