// GrowthScale APM System - Performance & Conversion Monitoring
// Sistema de monitoramento de performance e conversão

import { logger } from './logger';

// ===== TIPOS E INTERFACES =====
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  category: 'navigation' | 'resource' | 'paint' | 'layout' | 'conversion';
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
}

export interface ConversionMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  conversionRate: number;
  bounceRate: number;
  sessionDuration: number;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  sessionId: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'javascript' | 'network' | 'resource' | 'conversion';
}

// ===== CONFIGURAÇÃO DO SISTEMA =====
const APM_CONFIG = {
  // Thresholds de performance
  thresholds: {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    ttfb: 800, // 800ms
    fcp: 1800  // 1.8s
  },
  
  // Categorias de erro
  errorCategories: {
    JAVASCRIPT: 'javascript',
    NETWORK: 'network',
    RESOURCE: 'resource',
    CONVERSION: 'conversion'
  },
  
  // Severidades
  severities: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  }
};

// ===== SISTEMA DE PERFORMANCE =====
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.isInitialized || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      this.setupNavigationTiming();
      this.setupResourceTiming();
      this.setupPaintTiming();
      this.setupLayoutShift();
      this.setupLongTasks();
      
      this.isInitialized = true;
      logger.info('Performance Monitor inicializado');
    } catch (error) {
      logger.error('Erro ao inicializar Performance Monitor:', error);
    }
  }

  private setupNavigationTiming(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordNavigationMetrics(navEntry);
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  private setupResourceTiming(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordResourceMetrics(resourceEntry);
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private setupPaintTiming(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            const paintEntry = entry as PerformancePaintTiming;
            this.recordPaintMetrics(paintEntry);
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  private setupLayoutShift(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            const layoutEntry = entry as any;
            this.recordLayoutShiftMetrics(layoutEntry);
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  private setupLongTasks(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            const longTaskEntry = entry as any;
            this.recordLongTaskMetrics(longTaskEntry);
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    }
  }

  private recordNavigationMetrics(navEntry: PerformanceNavigationTiming): void {
    const metrics: PerformanceMetric[] = [
      {
        name: 'TTFB',
        value: navEntry.responseStart - navEntry.requestStart,
        unit: 'ms',
        timestamp: Date.now(),
        category: 'navigation'
      },
      {
        name: 'DOMContentLoaded',
        value: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
        unit: 'ms',
        timestamp: Date.now(),
        category: 'navigation'
      },
      {
        name: 'LoadComplete',
        value: navEntry.loadEventEnd - navEntry.loadEventStart,
        unit: 'ms',
        timestamp: Date.now(),
        category: 'navigation'
      }
    ];

    metrics.forEach(metric => this.recordMetric(metric));
  }

  private recordResourceMetrics(resourceEntry: PerformanceResourceTiming): void {
    const metric: PerformanceMetric = {
      name: `Resource_${resourceEntry.name}`,
      value: resourceEntry.duration,
      unit: 'ms',
      timestamp: Date.now(),
      category: 'resource'
    };

    this.recordMetric(metric);
  }

  private recordPaintMetrics(paintEntry: PerformancePaintTiming): void {
    const metric: PerformanceMetric = {
      name: paintEntry.name === 'first-paint' ? 'FCP' : 'LCP',
      value: paintEntry.startTime,
      unit: 'ms',
      timestamp: Date.now(),
      category: 'paint'
    };

    this.recordMetric(metric);
  }

  private recordLayoutShiftMetrics(layoutEntry: any): void {
    const metric: PerformanceMetric = {
      name: 'CLS',
      value: layoutEntry.value,
      unit: 'score',
      timestamp: Date.now(),
      category: 'layout'
    };

    this.recordMetric(metric);
  }

  private recordLongTaskMetrics(longTaskEntry: any): void {
    const metric: PerformanceMetric = {
      name: 'LongTask',
      value: longTaskEntry.duration,
      unit: 'ms',
      timestamp: Date.now(),
      category: 'navigation'
    };

    this.recordMetric(metric);
  }

  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);
    
    // Verifica se está acima do threshold
    this.checkThreshold(metric);
    
    // Log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      logger.info('Performance Metric:', metric);
    }
  }

  private checkThreshold(metric: PerformanceMetric): void {
    const threshold = APM_CONFIG.thresholds[metric.name as keyof typeof APM_CONFIG.thresholds];
    
    if (threshold && metric.value > threshold) {
      logger.warn(`Performance threshold exceeded: ${metric.name} = ${metric.value}${metric.unit} (threshold: ${threshold}${metric.unit})`);
      
      // Report para serviços externos
      this.reportPerformanceIssue(metric, threshold);
    }
  }

  private reportPerformanceIssue(metric: PerformanceMetric, threshold: number): void {
    const issue = {
      type: 'performance_threshold_exceeded',
      metric: metric.name,
      value: metric.value,
      threshold: threshold,
      unit: metric.unit,
      timestamp: metric.timestamp,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Enviar para serviços de monitoramento
    this.sendToMonitoringServices(issue);
  }

  getCoreWebVitals(): CoreWebVitals {
    const lcp = this.getMetricValue('LCP') || 0;
    const fid = this.getMetricValue('FID') || 0;
    const cls = this.getMetricValue('CLS') || 0;
    const ttfb = this.getMetricValue('TTFB') || 0;
    const fcp = this.getMetricValue('FCP') || 0;

    return { lcp, fid, cls, ttfb, fcp };
  }

  getConversionMetrics(): ConversionMetrics {
    const pageLoadTime = this.getMetricValue('LoadComplete') || 0;
    const timeToInteractive = this.getMetricValue('DOMContentLoaded') || 0;
    
    return {
      pageLoadTime,
      timeToInteractive,
      conversionRate: 0, // Será calculado pelo sistema de conversão
      bounceRate: 0,     // Será calculado pelo sistema de conversão
      sessionDuration: 0 // Será calculado pelo sistema de conversão
    };
  }

  private getMetricValue(name: string): number | null {
    const metric = this.metrics
      .filter(m => m.name === name)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    
    return metric ? metric.value : null;
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  private sendToMonitoringServices(issue: any): void {
    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'performance_issue', {
        event_category: 'performance',
        event_label: issue.metric,
        value: issue.value,
        custom_parameters: issue
      });
    }

    // Sentry (se disponível)
    if (typeof (window as any).Sentry !== 'undefined') {
      (window as any).Sentry.captureMessage(`Performance issue: ${issue.metric}`, {
        level: 'warning',
        extra: issue
      });
    }
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

// ===== SISTEMA DE ERROS =====
class ErrorMonitor {
  private errors: ErrorReport[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.isInitialized) return;

    try {
      this.setupGlobalErrorHandling();
      this.setupUnhandledRejectionHandling();
      this.setupResourceErrorHandling();
      
      this.isInitialized = true;
      logger.info('Error Monitor inicializado');
    } catch (error) {
      logger.error('Erro ao inicializar Error Monitor:', error);
    }
  }

  private setupGlobalErrorHandling(): void {
    window.addEventListener('error', (event) => {
      this.recordError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: event.filename,
        userAgent: navigator.userAgent,
        sessionId: '', // Será preenchido pelo sistema de sessão
        severity: this.calculateSeverity(event.error),
        category: APM_CONFIG.errorCategories.JAVASCRIPT
      });
    });
  }

  private setupUnhandledRejectionHandling(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        sessionId: '', // Será preenchido pelo sistema de sessão
        severity: this.calculateSeverity(event.reason),
        category: APM_CONFIG.errorCategories.JAVASCRIPT
      });
    });
  }

  private setupResourceErrorHandling(): void {
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        this.recordError({
          message: `Resource failed to load: ${target.tagName}`,
          timestamp: Date.now(),
          url: (target as any).src || (target as any).href || window.location.href,
          userAgent: navigator.userAgent,
          sessionId: '', // Será preenchido pelo sistema de sessão
          severity: APM_CONFIG.severities.MEDIUM,
          category: APM_CONFIG.errorCategories.RESOURCE
        });
      }
    }, true);
  }

  private calculateSeverity(error: Error | any): 'low' | 'medium' | 'high' | 'critical' {
    if (!error) return APM_CONFIG.severities.MEDIUM as 'medium';

    const message = error.message?.toLowerCase() || '';
    
    // Erros críticos
    if (message.includes('out of memory') || 
        message.includes('maximum call stack') ||
        message.includes('script timeout')) {
      return APM_CONFIG.severities.CRITICAL as 'critical';
    }

    // Erros altos
    if (message.includes('network') || 
        message.includes('fetch') ||
        message.includes('xhr')) {
      return APM_CONFIG.severities.HIGH as 'high';
    }

    // Erros médios
    if (message.includes('type') || 
        message.includes('reference') ||
        message.includes('syntax')) {
      return APM_CONFIG.severities.MEDIUM as 'medium';
    }

    return APM_CONFIG.severities.LOW as 'low';
  }

  recordError(error: ErrorReport): void {
    this.errors.push(error);
    
    // Log do erro
    logger.error('Error Report:', error);
    
    // Report para serviços externos
    this.reportError(error);
  }

  private reportError(error: ErrorReport): void {
    // Sentry (se disponível)
    if (typeof (window as any).Sentry !== 'undefined') {
      (window as any).Sentry.captureException(new Error(error.message), {
        level: error.severity,
        extra: {
          url: error.url,
          userAgent: error.userAgent,
          sessionId: error.sessionId,
          category: error.category
        }
      });
    }

    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: error.severity === APM_CONFIG.severities.CRITICAL,
        custom_parameters: {
          category: error.category,
          severity: error.severity,
          url: error.url
        }
      });
    }
  }

  getErrors(): ErrorReport[] {
    return this.errors;
  }

  getErrorRate(): number {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    const recentErrors = this.errors.filter(e => e.timestamp > oneHourAgo);
    
    return recentErrors.length;
  }
}

// ===== SISTEMA DE CONVERSÃO =====
class ConversionMonitor {
  private conversionEvents: any[] = [];
  private sessionStartTime: number = Date.now();

  recordConversionEvent(event: any): void {
    this.conversionEvents.push({
      ...event,
      timestamp: Date.now(),
      sessionDuration: Date.now() - this.sessionStartTime
    });

    // Log da conversão
    logger.info('Conversion Event:', event);

    // Report para serviços externos
    this.reportConversion(event);
  }

  private reportConversion(event: any): void {
    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: event.value,
        currency: event.currency || 'BRL',
        transaction_id: event.transactionId
      });
    }

    // Facebook Pixel
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Purchase', {
        value: event.value,
        currency: event.currency || 'BRL'
      });
    }
  }

  getConversionRate(): number {
    // Implementar lógica de cálculo de conversão
    return 0;
  }

  getConversionEvents(): any[] {
    return this.conversionEvents;
  }
}

// ===== INSTÂNCIAS GLOBAIS =====
const performanceMonitor = new PerformanceMonitor();
const errorMonitor = new ErrorMonitor();
const conversionMonitor = new ConversionMonitor();

// ===== FUNÇÕES PRINCIPAIS =====
export function initializeAPM(): void {
  try {
    // Os monitores já são inicializados automaticamente
    logger.info('APM System inicializado com sucesso');
  } catch (error) {
    logger.error('Erro ao inicializar APM System:', error);
  }
}

export function recordConversion(event: any): void {
  conversionMonitor.recordConversionEvent(event);
}

export function getPerformanceMetrics(): {
  coreWebVitals: CoreWebVitals;
  conversionMetrics: ConversionMetrics;
  errors: ErrorReport[];
  errorRate: number;
} {
  return {
    coreWebVitals: performanceMonitor.getCoreWebVitals(),
    conversionMetrics: performanceMonitor.getConversionMetrics(),
    errors: errorMonitor.getErrors(),
    errorRate: errorMonitor.getErrorRate()
  };
}

export function reportCustomError(message: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium', category: 'javascript' | 'network' | 'resource' | 'conversion' = 'javascript'): void {
  errorMonitor.recordError({
    message,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    sessionId: '', // Será preenchido pelo sistema de sessão
    severity,
    category
  });
}

// ===== EXPORTAÇÕES =====
export {
  APM_CONFIG,
  performanceMonitor,
  errorMonitor,
  conversionMonitor
};
