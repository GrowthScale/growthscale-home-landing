// =====================================================
// MONITORAMENTO - GROWTHSCALE
// Sistema de tracking de erros, performance e analytics
// =====================================================

import { authService } from './auth';

// Tipos
export interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

export interface LogEntry {
  timestamp: string;
  level: keyof LogLevel;
  message: string;
  context?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  ipAddress?: string;
  stack?: string;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: string;
}

export interface PerformanceMetric {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  success: boolean;
  error?: string;
}

export interface ErrorReport {
  error: Error;
  context: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  userAgent: string;
  url: string;
  timestamp: string;
}

// Configuração
const CONFIG = {
  logLevel: (process.env.NODE_ENV === 'development' ? 'debug' : 'info') as keyof LogLevel,
  maxLogEntries: 1000,
  flushInterval: 5000, // 5 segundos
  enableConsole: process.env.NODE_ENV === 'development',
  enableRemote: process.env.NODE_ENV === 'production',
  remoteEndpoint: process.env.VITE_MONITORING_ENDPOINT || '/api/monitoring',
};

// Classe de Monitoramento
export class MonitoringService {
  private static instance: MonitoringService;
  private logBuffer: LogEntry[] = [];
  private metricsBuffer: Metric[] = [];
  private performanceBuffer: PerformanceMetric[] = [];
  private errorBuffer: ErrorReport[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.setupGlobalErrorHandling();
    this.setupPerformanceMonitoring();
    this.startFlushTimer();
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  // Logging
  log(level: keyof LogLevel, message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userId: authService.getCurrentUser()?.id,
      sessionId: authService.getCurrentSession()?.id,
      requestId: this.generateRequestId(),
      userAgent: navigator.userAgent,
      ipAddress: 'client-side', // Será obtido via API
    };

    this.logBuffer.push(entry);

    // Log imediato em desenvolvimento
    if (CONFIG.enableConsole) {
      this.logToConsole(entry);
    }

    // Limpar buffer se exceder limite
    if (this.logBuffer.length > CONFIG.maxLogEntries) {
      this.logBuffer = this.logBuffer.slice(-CONFIG.maxLogEntries);
    }
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      context: {
        ...context,
        errorName: error?.name,
        errorMessage: error?.message,
        stack: error?.stack,
      },
      userId: authService.getCurrentUser()?.id,
      sessionId: authService.getCurrentSession()?.id,
      requestId: this.generateRequestId(),
      userAgent: navigator.userAgent,
      ipAddress: 'client-side',
      stack: error?.stack,
    };

    this.logBuffer.push(entry);

    // Reportar erro crítico
    if (error) {
      this.reportError(error, context);
    }

    if (CONFIG.enableConsole) {
      this.logToConsole(entry);
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('WARN', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('INFO', message, context);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (CONFIG.logLevel === 'debug') {
      this.log('DEBUG', message, context);
    }
  }

  // Métricas
  recordMetric(name: string, value: number, unit: string, tags: Record<string, string> = {}): void {
    const metric: Metric = {
      name,
      value,
      unit,
      tags: {
        ...tags,
        userId: authService.getCurrentUser()?.id || 'anonymous',
        sessionId: authService.getCurrentSession()?.id || 'none',
        environment: process.env.NODE_ENV || 'development',
      },
      timestamp: new Date().toISOString(),
    };

    this.metricsBuffer.push(metric);
  }

  // Performance
  startTimer(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        startTime,
        endTime,
        success: true,
      };

      this.performanceBuffer.push(metric);
    };
  }

  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        startTime,
        endTime,
        success: true,
      };

      this.performanceBuffer.push(metric);
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        startTime,
        endTime,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };

      this.performanceBuffer.push(metric);
      throw error;
    }
  }

  // Relatórios de Erro
  reportError(error: Error, context?: Record<string, unknown>): void {
    const report: ErrorReport = {
      error,
      context: {
        ...context,
        url: window.location.href,
        referrer: document.referrer,
      },
      userId: authService.getCurrentUser()?.id,
      sessionId: authService.getCurrentSession()?.id,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    this.errorBuffer.push(report);

    // Enviar erro crítico imediatamente
    if (CONFIG.enableRemote) {
      this.sendErrorReport(report);
    }
  }

  // Eventos de Negócio
  trackEvent(eventName: string, properties?: Record<string, unknown>): void {
    this.info(`Event: ${eventName}`, {
      eventName,
      properties,
      category: 'business',
    });

    // Enviar para analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
  }

  trackPageView(page: string, properties?: Record<string, unknown>): void {
    this.info(`Page View: ${page}`, {
      page,
      properties,
      category: 'navigation',
    });

    // Enviar para analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: page,
        page_location: window.location.href,
        ...properties,
      });
    }
  }

  trackConversion(conversionType: string, value?: number, currency = 'BRL'): void {
    this.info(`Conversion: ${conversionType}`, {
      conversionType,
      value,
      currency,
      category: 'conversion',
    });

    // Enviar para analytics
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `AW-CONVERSION_ID/${conversionType}`,
        value,
        currency,
      });
    }
  }

  // Utilitários
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logToConsole(entry: LogEntry): void {
    const { level, message, context, timestamp } = entry;
    const prefix = `[${timestamp}] [${level}]`;
    
    switch (level) {
      case 'ERROR':
        console.error(prefix, message, context);
        break;
      case 'WARN':
        console.warn(prefix, message, context);
        break;
      case 'INFO':
        console.info(prefix, message, context);
        break;
      case 'DEBUG':
        console.debug(prefix, message, context);
        break;
    }
  }

  private setupGlobalErrorHandling(): void {
    // Capturar erros não tratados
    window.addEventListener('error', (event) => {
      this.error('Unhandled Error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Capturar promessas rejeitadas
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled Promise Rejection', new Error(event.reason), {
        reason: event.reason,
      });
    });

    // Capturar erros de recursos
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.error('Resource Error', new Error(`Failed to load ${event.target}`), {
          target: event.target,
          type: event.type,
        });
      }
    }, true);
  }

  private setupPerformanceMonitoring(): void {
    // Monitorar Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('lcp', lastEntry.startTime, 'ms', { type: 'web-vital' });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('fid', entry.processingStart - entry.startTime, 'ms', { type: 'web-vital' });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('cls', clsValue, 'unit', { type: 'web-vital' });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Monitorar tempo de carregamento da página
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.recordMetric('page_load_time', navigation.loadEventEnd - navigation.loadEventStart, 'ms', { type: 'navigation' });
        this.recordMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms', { type: 'navigation' });
      }
    });
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, CONFIG.flushInterval);
  }

  private async flush(): Promise<void> {
    if (!CONFIG.enableRemote) {return;}

    try {
      const data = {
        logs: this.logBuffer,
        metrics: this.metricsBuffer,
        performance: this.performanceBuffer,
        errors: this.errorBuffer,
        timestamp: new Date().toISOString(),
      };

      // Enviar dados para servidor
      await fetch(CONFIG.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Limpar buffers após envio bem-sucedido
      this.logBuffer = [];
      this.metricsBuffer = [];
      this.performanceBuffer = [];
      this.errorBuffer = [];
    } catch (error) {
      console.error('Failed to flush monitoring data:', error);
    }
  }

  private async sendErrorReport(report: ErrorReport): Promise<void> {
    try {
      await fetch(`${CONFIG.remoteEndpoint}/errors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
    } catch (error) {
      console.error('Failed to send error report:', error);
    }
  }

  // Métodos públicos para acesso aos dados
  getLogs(): LogEntry[] {
    return [...this.logBuffer];
  }

  getMetrics(): Metric[] {
    return [...this.metricsBuffer];
  }

  getPerformanceMetrics(): PerformanceMetric[] {
    return [...this.performanceBuffer];
  }

  getErrors(): ErrorReport[] {
    return [...this.errorBuffer];
  }

  // Limpeza
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// Instância singleton
export const monitoring = MonitoringService.getInstance();

// Helpers para uso direto
export const log = {
  error: (message: string, error?: Error, context?: Record<string, unknown>) => monitoring.error(message, error, context),
  warn: (message: string, context?: Record<string, unknown>) => monitoring.warn(message, context),
  info: (message: string, context?: Record<string, unknown>) => monitoring.info(message, context),
  debug: (message: string, context?: Record<string, unknown>) => monitoring.debug(message, context),
};

export const metrics = {
  record: (name: string, value: number, unit: string, tags?: Record<string, string>) => monitoring.recordMetric(name, value, unit, tags),
  timer: (name: string) => monitoring.startTimer(name),
  measure: <T>(name: string, fn: () => Promise<T>) => monitoring.measureAsync(name, fn),
};

export const events = {
  track: (eventName: string, properties?: Record<string, unknown>) => monitoring.trackEvent(eventName, properties),
  pageView: (page: string, properties?: Record<string, unknown>) => monitoring.trackPageView(page, properties),
  conversion: (conversionType: string, value?: number, currency?: string) => monitoring.trackConversion(conversionType, value, currency),
};
