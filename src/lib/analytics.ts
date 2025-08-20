// GrowthScale Analytics System - Foco em Conversão
// Sistema de analytics baseado em neuromarketing e psicologia de vendas

import { logger } from './logger';

// ===== TIPOS E INTERFACES =====
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

export interface ConversionEvent extends AnalyticsEvent {
  funnel: string;
  step: number;
  value?: number;
  currency?: string;
}

export interface UserBehavior {
  pageViews: number;
  timeOnSite: number;
  scrollDepth: number;
  clicks: number;
  conversions: number;
}

export interface FunnelStep {
  name: string;
  step: number;
  visitors: number;
  conversions: number;
  conversionRate: number;
}

// ===== CONFIGURAÇÃO DO SISTEMA =====
const ANALYTICS_CONFIG = {
  // Eventos de conversão principais
  conversionEvents: {
    // Funnel de Awareness
    PAGE_VIEW: 'page_view',
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page',
    
    // Funnel de Interest
    FEATURE_VIEW: 'feature_view',
    BENEFIT_CLICK: 'benefit_click',
    SOCIAL_PROOF_VIEW: 'social_proof_view',
    
    // Funnel de Consideration
    PRICING_VIEW: 'pricing_view',
    PLAN_COMPARISON: 'plan_comparison',
    FAQ_VIEW: 'faq_view',
    
    // Funnel de Decision
    CTA_CLICK: 'cta_click',
    SIGNUP_START: 'signup_start',
    TRIAL_START: 'trial_start',
    
    // Funnel de Conversion
    SIGNUP_COMPLETE: 'signup_complete',
    PAYMENT_START: 'payment_start',
    PAYMENT_COMPLETE: 'payment_complete',
    
    // Funnel de Retention
    LOGIN: 'login',
    FEATURE_USAGE: 'feature_usage',
    SUPPORT_CONTACT: 'support_contact'
  },
  
  // Categorias de eventos
  categories: {
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    REVENUE: 'revenue',
    RETENTION: 'retention',
    SUPPORT: 'support'
  },
  
  // Funnels de conversão
  funnels: {
    SIGNUP: 'signup_funnel',
    TRIAL: 'trial_funnel',
    UPGRADE: 'upgrade_funnel',
    RETENTION: 'retention_funnel'
  }
};

// ===== SISTEMA DE SESSÃO =====
class SessionManager {
  private sessionId: string;
  private startTime: number;
  private pageViews: number = 0;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.loadSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadSession(): void {
    const savedSession = localStorage.getItem('growthscale_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        this.sessionId = session.sessionId;
        this.startTime = session.startTime;
        this.pageViews = session.pageViews || 0;
        this.events = session.events || [];
      } catch (error) {
        logger.error('Erro ao carregar sessão:', error);
      }
    }
  }

  private saveSession(): void {
    try {
      const session = {
        sessionId: this.sessionId,
        startTime: this.startTime,
        pageViews: this.pageViews,
        events: this.events.slice(-50) // Mantém apenas os últimos 50 eventos
      };
      localStorage.setItem('growthscale_session', JSON.stringify(session));
    } catch (error) {
      logger.error('Erro ao salvar sessão:', error);
    }
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getSessionDuration(): number {
    return Date.now() - this.startTime;
  }

  incrementPageViews(): void {
    this.pageViews++;
    this.saveSession();
  }

  addEvent(event: AnalyticsEvent): void {
    this.events.push(event);
    this.saveSession();
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }
}

// ===== SISTEMA DE FUNNEL =====
class FunnelTracker {
  private currentFunnel: string | null = null;
  private funnelSteps: Map<string, number> = new Map();
  private funnelStartTime: number | null = null;

  startFunnel(funnelName: string): void {
    this.currentFunnel = funnelName;
    this.funnelStartTime = Date.now();
    this.funnelSteps.clear();
    this.trackFunnelStep(funnelName, 1, 'Funnel iniciado');
  }

  trackFunnelStep(funnelName: string, step: number, stepName: string): void {
    if (this.currentFunnel === funnelName) {
      this.funnelSteps.set(stepName, step);
      
      const event: ConversionEvent = {
        event: 'funnel_step',
        category: ANALYTICS_CONFIG.categories.CONVERSION,
        action: stepName,
        label: `Step ${step}`,
        value: step,
      properties: {
          funnel: funnelName,
          step: step,
          stepName: stepName,
          previousStep: this.getPreviousStep(step),
          timeInFunnel: this.funnelStartTime ? Date.now() - this.funnelStartTime : 0
        },
      timestamp: Date.now(),
        sessionId: sessionManager.getSessionId(),
        funnel: funnelName,
        step: step
      };

      trackEvent(event);
    }
  }

  private getPreviousStep(currentStep: number): number | null {
    const steps = Array.from(this.funnelSteps.values()).sort((a, b) => a - b);
    const currentIndex = steps.indexOf(currentStep);
    return currentIndex > 0 ? steps[currentIndex - 1] : null;
  }

  completeFunnel(funnelName: string, value?: number): void {
    if (this.currentFunnel === funnelName) {
      const event: ConversionEvent = {
        event: 'funnel_complete',
        category: ANALYTICS_CONFIG.categories.CONVERSION,
        action: 'Funnel completado',
        label: funnelName,
        value: value || 0,
        properties: {
          funnel: funnelName,
          totalSteps: this.funnelSteps.size,
          timeToComplete: this.funnelStartTime ? Date.now() - this.funnelStartTime : 0,
          steps: Array.from(this.funnelSteps.entries())
        },
        timestamp: Date.now(),
        sessionId: sessionManager.getSessionId(),
        funnel: funnelName,
        step: this.funnelSteps.size + 1
      };

      trackEvent(event);
      this.resetFunnel();
    }
  }

  private resetFunnel(): void {
    this.currentFunnel = null;
    this.funnelStartTime = null;
    this.funnelSteps.clear();
  }
}

// ===== SISTEMA DE COMPORTAMENTO DO USUÁRIO =====
class UserBehaviorTracker {
  private scrollDepth: number = 0;
  private timeOnPage: number = 0;
  private pageStartTime: number = Date.now();
  private clickCount: number = 0;
  private lastActivity: number = Date.now();

  constructor() {
    this.setupScrollTracking();
    this.setupClickTracking();
    this.setupActivityTracking();
  }

  private setupScrollTracking(): void {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.scrollDepth = maxScroll;
        
        // Track scroll milestones
        if (scrollPercent >= 25 && maxScroll < 50) {
          this.trackScrollMilestone(25);
        } else if (scrollPercent >= 50 && maxScroll < 75) {
          this.trackScrollMilestone(50);
        } else if (scrollPercent >= 75 && maxScroll < 100) {
          this.trackScrollMilestone(75);
        } else if (scrollPercent >= 100) {
          this.trackScrollMilestone(100);
        }
      }
    });
  }

  private setupClickTracking(): void {
    document.addEventListener('click', (event) => {
      this.clickCount++;
      this.lastActivity = Date.now();
      
      const target = event.target as HTMLElement;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        const className = target.className || '';
        const id = target.id || '';
        
        // Track important clicks
        if (tagName === 'button' || tagName === 'a') {
          this.trackClick(target.textContent || 'Unknown', className, id);
        }
      }
    });
  }

  private setupActivityTracking(): void {
    // Track time on page
    setInterval(() => {
      this.timeOnPage = Date.now() - this.pageStartTime;
      
      // Track time milestones
      if (this.timeOnPage >= 30000 && this.timeOnPage < 60000) { // 30s
        this.trackTimeMilestone(30);
      } else if (this.timeOnPage >= 60000 && this.timeOnPage < 120000) { // 1min
        this.trackTimeMilestone(60);
      } else if (this.timeOnPage >= 120000 && this.timeOnPage < 300000) { // 2min
        this.trackTimeMilestone(120);
      } else if (this.timeOnPage >= 300000) { // 5min
        this.trackTimeMilestone(300);
      }
    }, 1000);
  }

  private trackScrollMilestone(percent: number): void {
    const event: AnalyticsEvent = {
      event: ANALYTICS_CONFIG.conversionEvents.SCROLL_DEPTH,
      category: ANALYTICS_CONFIG.categories.ENGAGEMENT,
      action: 'Scroll milestone',
      label: `${percent}%`,
      value: percent,
      properties: {
        scrollDepth: percent,
        timeOnPage: this.timeOnPage
      },
      timestamp: Date.now(),
      sessionId: sessionManager.getSessionId()
    };
    
    trackEvent(event);
  }

  private trackTimeMilestone(seconds: number): void {
    const event: AnalyticsEvent = {
      event: ANALYTICS_CONFIG.conversionEvents.TIME_ON_PAGE,
      category: ANALYTICS_CONFIG.categories.ENGAGEMENT,
      action: 'Time milestone',
      label: `${seconds}s`,
      value: seconds,
      properties: {
        timeOnPage: seconds,
        scrollDepth: this.scrollDepth
      },
      timestamp: Date.now(),
      sessionId: sessionManager.getSessionId()
    };
    
    trackEvent(event);
  }

  private trackClick(elementText: string, className: string, id: string): void {
    const event: AnalyticsEvent = {
      event: 'click',
      category: ANALYTICS_CONFIG.categories.ENGAGEMENT,
      action: 'Element clicked',
      label: elementText,
      properties: {
        elementText: elementText,
        className: className,
        id: id,
        clickCount: this.clickCount
      },
      timestamp: Date.now(),
      sessionId: sessionManager.getSessionId()
    };
    
    trackEvent(event);
  }

  getUserBehavior(): UserBehavior {
    return {
      pageViews: sessionManager.getSessionDuration(),
      timeOnSite: this.timeOnPage,
      scrollDepth: this.scrollDepth,
      clicks: this.clickCount,
      conversions: 0 // Será calculado pelo sistema de conversão
    };
  }
}

// ===== INSTÂNCIAS GLOBAIS =====
const sessionManager = new SessionManager();
const funnelTracker = new FunnelTracker();
const behaviorTracker = new UserBehaviorTracker();

// ===== FUNÇÕES PRINCIPAIS DE TRACKING =====
export function trackEvent(event: AnalyticsEvent): void {
  try {
    // Adiciona informações da sessão
    event.sessionId = sessionManager.getSessionId();
    event.timestamp = Date.now();
    
    // Salva o evento na sessão
    sessionManager.addEvent(event);
    
    // Log do evento
    logger.info('Analytics Event:', {
      event: event.event,
      category: event.category,
      action: event.action,
      label: event.label,
      value: event.value
    });
    
    // Envia para serviços externos (se configurados)
    sendToAnalyticsServices(event);
    
  } catch (error) {
    logger.error('Erro ao trackear evento:', error);
  }
}

export function trackConversion(event: ConversionEvent): void {
  try {
    // Adiciona informações de conversão
    event.category = ANALYTICS_CONFIG.categories.CONVERSION;
    event.timestamp = Date.now();
    event.sessionId = sessionManager.getSessionId();
    
    // Track do evento
    trackEvent(event);
    
    // Atualiza funnels se aplicável
    if (event.funnel) {
      funnelTracker.trackFunnelStep(event.funnel, event.step, event.action);
    }
    
    logger.info('Conversion Event:', {
      event: event.event,
      funnel: event.funnel,
      step: event.step,
      value: event.value
    });
    
  } catch (error) {
    logger.error('Erro ao trackear conversão:', error);
  }
}

// ===== FUNÇÕES DE CONVERSÃO ESPECÍFICAS =====
export function trackPageView(pageName: string, properties?: Record<string, any>): void {
  sessionManager.incrementPageViews();
  
  const event: AnalyticsEvent = {
    event: ANALYTICS_CONFIG.conversionEvents.PAGE_VIEW,
    category: ANALYTICS_CONFIG.categories.ENGAGEMENT,
    action: 'Page viewed',
    label: pageName,
    properties: {
      pageName: pageName,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      ...properties
    },
    timestamp: Date.now(),
    sessionId: sessionManager.getSessionId()
  };
  
  trackEvent(event);
}

export function trackCTAClick(ctaText: string, ctaLocation: string, properties?: Record<string, any>): void {
  const event: AnalyticsEvent = {
    event: ANALYTICS_CONFIG.conversionEvents.CTA_CLICK,
    category: ANALYTICS_CONFIG.categories.CONVERSION,
    action: 'CTA clicked',
    label: ctaText,
    properties: {
      ctaText: ctaText,
      ctaLocation: ctaLocation,
      scrollDepth: behaviorTracker.getUserBehavior().scrollDepth,
      timeOnPage: behaviorTracker.getUserBehavior().timeOnSite,
      ...properties
    },
    timestamp: Date.now(),
    sessionId: sessionManager.getSessionId()
  };
  
  trackEvent(event);
}

export function trackSignupStart(plan?: string, properties?: Record<string, any>): void {
  // Inicia o funnel de signup
  funnelTracker.startFunnel(ANALYTICS_CONFIG.funnels.SIGNUP);
  
  const event: AnalyticsEvent = {
    event: ANALYTICS_CONFIG.conversionEvents.SIGNUP_START,
    category: ANALYTICS_CONFIG.categories.CONVERSION,
    action: 'Signup started',
    label: plan || 'No plan selected',
    properties: {
      plan: plan,
      userBehavior: behaviorTracker.getUserBehavior(),
      ...properties
    },
    timestamp: Date.now(),
    sessionId: sessionManager.getSessionId()
  };
  
  trackEvent(event);
}

export function trackSignupComplete(userId: string, plan: string, value?: number): void {
  const event: ConversionEvent = {
    event: ANALYTICS_CONFIG.conversionEvents.SIGNUP_COMPLETE,
    category: ANALYTICS_CONFIG.categories.CONVERSION,
    action: 'Signup completed',
    label: plan,
    value: value || 0,
    properties: {
      userId: userId,
      plan: plan,
      value: value || 0,
      userBehavior: behaviorTracker.getUserBehavior()
    },
    timestamp: Date.now(),
    sessionId: sessionManager.getSessionId(),
    userId: userId,
    funnel: ANALYTICS_CONFIG.funnels.SIGNUP,
    step: 5,
    currency: 'BRL'
  };
  
  trackConversion(event);
  funnelTracker.completeFunnel(ANALYTICS_CONFIG.funnels.SIGNUP, value);
}

export function trackTrialStart(userId: string, plan: string): void {
  funnelTracker.startFunnel(ANALYTICS_CONFIG.funnels.TRIAL);
  
  const event: AnalyticsEvent = {
    event: ANALYTICS_CONFIG.conversionEvents.TRIAL_START,
    category: ANALYTICS_CONFIG.categories.CONVERSION,
    action: 'Trial started',
    label: plan,
    properties: {
      userId: userId,
      plan: plan,
      userBehavior: behaviorTracker.getUserBehavior()
    },
    timestamp: Date.now(),
    sessionId: sessionManager.getSessionId(),
    userId: userId
  };
  
  trackEvent(event);
}

// ===== FUNÇÕES DE ANÁLISE =====
export function getSessionData(): {
  sessionId: string;
  duration: number;
  pageViews: number;
  events: AnalyticsEvent[];
  userBehavior: UserBehavior;
} {
  return {
    sessionId: sessionManager.getSessionId(),
    duration: sessionManager.getSessionDuration(),
    pageViews: sessionManager.getSessionDuration(),
    events: sessionManager.getEvents(),
    userBehavior: behaviorTracker.getUserBehavior()
  };
}

export function getConversionRate(funnelName: string, step: number): number {
  const events = sessionManager.getEvents();
  const funnelEvents = events.filter(e => 
    e.properties?.funnel === funnelName && e.properties?.step === step
  );
  
  if (funnelEvents.length === 0) return 0;
  
  const conversions = funnelEvents.filter(e => e.event === 'funnel_complete').length;
  return (conversions / funnelEvents.length) * 100;
}

// ===== INTEGRAÇÃO COM SERVIÇOS EXTERNOS =====
function sendToAnalyticsServices(event: AnalyticsEvent): void {
  // Google Analytics 4
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      custom_parameters: event.properties
    });
  }
  
  // Facebook Pixel
  if (typeof (window as any).fbq !== 'undefined') {
    (window as any).fbq('track', event.event, {
      content_name: event.label,
      content_category: event.category,
      value: event.value,
      currency: 'BRL'
    });
  }
  
  // Hotjar
  if (typeof (window as any).hj !== 'undefined') {
    (window as any).hj('event', event.event);
  }
  
  // Mixpanel
  if (typeof (window as any).mixpanel !== 'undefined') {
    (window as any).mixpanel.track(event.event, {
      category: event.category,
      action: event.action,
      label: event.label,
      value: event.value,
      ...event.properties
      });
    }
  }

// ===== INICIALIZAÇÃO =====
export function initializeAnalytics(): void {
  try {
    // Track da página inicial
    trackPageView(window.location.pathname, {
      title: document.title,
      url: window.location.href
    });
    
    logger.info('Analytics inicializado com sucesso');
  } catch (error) {
    logger.error('Erro ao inicializar analytics:', error);
  }
}

// ===== EXPORTAÇÕES =====
export {
  ANALYTICS_CONFIG,
  sessionManager,
  funnelTracker,
  behaviorTracker
};
