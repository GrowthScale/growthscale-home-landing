// =====================================================
// MONITORAMENTO - GROWTHSCALE
// Sistema de tracking de erros, performance e analytics
// =====================================================

import { log, auditLog } from './logger';

interface ErrorEvent {
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
  timestamp: number;
  userAgent: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceEvent {
  name: string;
  duration: number;
  timestamp: number;
  userId?: string;
  url: string;
}

interface UserEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: number;
  url: string;
}

// Store local para eventos (em produção, enviar para serviço externo)
const eventStore: {
  errors: ErrorEvent[];
  performance: PerformanceEvent[];
  userEvents: UserEvent[];
} = {
  errors: [],
  performance: [],
  userEvents: []
};

// Configurações
const MAX_EVENTS = 100; // Limite de eventos em memória
const BATCH_SIZE = 10; // Tamanho do lote para envio

// =====================================================
// ERROR MONITORING
// =====================================================

export function captureError(
  error: Error | string,
  context?: {
    component?: string;
    userId?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  }
) {
  const errorEvent: ErrorEvent = {
    message: typeof error === 'string' ? error : error.message,
    stack: error instanceof Error ? error.stack : undefined,
    component: context?.component,
    userId: context?.userId,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    severity: context?.severity || 'medium'
  };

  // Adicionar ao store
  eventStore.errors.push(errorEvent);
  
  // Manter limite
  if (eventStore.errors.length > MAX_EVENTS) {
    eventStore.errors.shift();
  }

  // Log local
  log.error('[ERROR_MONITORING]', errorEvent);

  // Em produção, enviar para serviço externo (Sentry, LogRocket, etc.)
  if (process.env.NODE_ENV === 'production') {
    sendToExternalService('error', errorEvent);
  }
}

// =====================================================
// PERFORMANCE MONITORING
// =====================================================

export function capturePerformance(
  name: string,
  duration: number,
  context?: {
    userId?: string;
  }
) {
  const performanceEvent: PerformanceEvent = {
    name,
    duration,
    timestamp: Date.now(),
    userId: context?.userId,
    url: window.location.href
  };

  // Adicionar ao store
  eventStore.performance.push(performanceEvent);
  
  // Manter limite
  if (eventStore.performance.length > MAX_EVENTS) {
    eventStore.performance.shift();
  }

  // Log local
  log.info('[PERFORMANCE_MONITORING]', performanceEvent);

  // Em produção, enviar para serviço externo
  if (process.env.NODE_ENV === 'production') {
    sendToExternalService('performance', performanceEvent);
  }
}

// Performance monitoring automático
export function startPerformanceMonitoring() {
  // Monitorar Core Web Vitals
  if ('PerformanceObserver' in window) {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      capturePerformance('LCP', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        capturePerformance('FID', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      capturePerformance('CLS', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}

// =====================================================
// USER ANALYTICS
// =====================================================

export function trackEvent(
  action: string,
  category: string,
  options?: {
    label?: string;
    value?: number;
    userId?: string;
  }
) {
  const userEvent: UserEvent = {
    action,
    category,
    label: options?.label,
    value: options?.value,
    userId: options?.userId,
    timestamp: Date.now(),
    url: window.location.href
  };

  // Adicionar ao store
  eventStore.userEvents.push(userEvent);
  
  // Manter limite
  if (eventStore.userEvents.length > MAX_EVENTS) {
    eventStore.userEvents.shift();
  }

  // Log local
  log.info('[USER_ANALYTICS]', userEvent);

  // Em produção, enviar para serviço externo
  if (process.env.NODE_ENV === 'production') {
    sendToExternalService('userEvent', userEvent);
  }
}

// Eventos pré-definidos
export const analytics = {
  // Navegação
  pageView: (page: string, userId?: string) => 
    trackEvent('page_view', 'navigation', { label: page, userId }),
  
  // Ações do usuário
  buttonClick: (button: string, userId?: string) => 
    trackEvent('button_click', 'interaction', { label: button, userId }),
  
  formSubmit: (form: string, userId?: string) => 
    trackEvent('form_submit', 'interaction', { label: form, userId }),
  
  // Funcionalidades específicas
  scheduleCreated: (userId?: string) => 
    trackEvent('schedule_created', 'feature', { userId }),
  
  employeeAdded: (userId?: string) => 
    trackEvent('employee_added', 'feature', { userId }),
  
  whatsappSent: (userId?: string) => 
    trackEvent('whatsapp_sent', 'feature', { userId }),
  
  // Conversões
  signup: (userId?: string) => 
    trackEvent('signup', 'conversion', { userId }),
  
  login: (userId?: string) => 
    trackEvent('login', 'conversion', { userId }),
  
  // Erros
  error: (error: string, userId?: string) => 
    trackEvent('error', 'system', { label: error, userId })
};

// =====================================================
// EXTERNAL SERVICE INTEGRATION
// =====================================================

async function sendToExternalService(type: string, data: any) {
  try {
    // Em produção, implementar integração com:
    // - Sentry (erros)
    // - Google Analytics (user events)
    // - Custom API (performance)
    
    const endpoint = process.env.REACT_APP_MONITORING_ENDPOINT;
    if (!endpoint) return;

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        timestamp: Date.now(),
        environment: process.env.NODE_ENV
      })
    });
  } catch (error) {
    // Fallback para log local
    log.error('[MONITORING_SEND_ERROR]', { type, error: error.message });
  }
}

// =====================================================
// UTILITIES
// =====================================================

// Obter estatísticas
export function getMonitoringStats() {
  return {
    errors: eventStore.errors.length,
    performance: eventStore.performance.length,
    userEvents: eventStore.userEvents.length,
    total: eventStore.errors.length + eventStore.performance.length + eventStore.userEvents.length
  };
}

// Limpar store (útil para testes)
export function clearMonitoringStore() {
  eventStore.errors = [];
  eventStore.performance = [];
  eventStore.userEvents = [];
}

// Exportar dados (útil para debug)
export function exportMonitoringData() {
  return {
    ...eventStore,
    stats: getMonitoringStats(),
    exportTime: new Date().toISOString()
  };
}

// =====================================================
// INITIALIZATION
// =====================================================

// Inicializar monitoramento quando o módulo for carregado
if (typeof window !== 'undefined') {
  startPerformanceMonitoring();
  
  // Capturar erros não tratados
  window.addEventListener('error', (event) => {
    captureError(event.error || event.message, {
      component: 'global',
      severity: 'high'
    });
  });

  // Capturar promises rejeitadas
  window.addEventListener('unhandledrejection', (event) => {
    captureError(event.reason, {
      component: 'global',
      severity: 'high'
    });
  });
}
