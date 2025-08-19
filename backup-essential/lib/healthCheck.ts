// =====================================================
// HEALTH CHECKS - GROWTHSCALE
// Sistema de monitoramento e health checks
// =====================================================

import { supabase } from './supabase';

export interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  lastChecked: Date;
  error?: string;
  details?: Record<string, any>;
}

export interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'down';
  services: HealthCheckResult[];
  timestamp: Date;
  uptime: number;
  version: string;
}

class HealthChecker {
  private static instance: HealthChecker;
  private checkInterval?: NodeJS.Timeout;
  private lastResults: HealthCheckResult[] = [];
  private startTime: Date = new Date();

  static getInstance(): HealthChecker {
    if (!HealthChecker.instance) {
      HealthChecker.instance = new HealthChecker();
    }
    return HealthChecker.instance;
  }

  // Verificar saúde do sistema
  async checkSystemHealth(): Promise<SystemHealth> {
    const services = await Promise.all([
      this.checkDatabase(),
      this.checkAPI(),
      this.checkExternalServices(),
      this.checkStorage(),
      this.checkAuthentication()
    ]);

    const overall = this.determineOverallHealth(services);
    const uptime = Date.now() - this.startTime.getTime();

    const systemHealth: SystemHealth = {
      overall,
      services,
      timestamp: new Date(),
      uptime,
      version: import.meta.env.VITE_APP_VERSION || '2.0.0'
    };

    this.lastResults = services;
    return systemHealth;
  }

  // Verificar banco de dados
  private async checkDatabase(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase
        .from('health_check')
        .select('*')
        .limit(1);

      const responseTime = Date.now() - startTime;
      
      if (error) {
        return {
          service: 'Database',
          status: 'down',
          responseTime,
          lastChecked: new Date(),
          error: error.message,
          details: { error }
        };
      }

      return {
        service: 'Database',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: { connected: true }
      };
    } catch (error) {
      return {
        service: 'Database',
        status: 'down',
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
        details: { error }
      };
    }
  }

  // Verificar API
  private async checkAPI(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        return {
          service: 'API',
          status: 'degraded',
          responseTime,
          lastChecked: new Date(),
          error: `HTTP ${response.status}: ${response.statusText}`,
          details: { status: response.status }
        };
      }

      const data = await response.json();
      
      return {
        service: 'API',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: data
      };
    } catch (error) {
      return {
        service: 'API',
        status: 'down',
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Network error',
        details: { error }
      };
    }
  }

  // Verificar serviços externos
  private async checkExternalServices(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    const services = [
      { name: 'Supabase', url: 'https://api.supabase.com' },
      { name: 'OpenAI', url: 'https://api.openai.com' },
      { name: 'WhatsApp', url: 'https://graph.facebook.com' }
    ];

    const results = await Promise.allSettled(
      services.map(async (service) => {
        try {
          const response = await fetch(service.url, { 
            method: 'HEAD',
            mode: 'no-cors'
          });
          return { name: service.name, status: 'healthy' };
        } catch (error) {
          return { name: service.name, status: 'down', error };
        }
      })
    );

    const responseTime = Date.now() - startTime;
    const healthyServices = results.filter(r => 
      r.status === 'fulfilled' && r.value.status === 'healthy'
    ).length;

    const status = healthyServices === services.length ? 'healthy' : 
                   healthyServices > 0 ? 'degraded' : 'down';

    return {
      service: 'External Services',
      status,
      responseTime,
      lastChecked: new Date(),
      details: {
        total: services.length,
        healthy: healthyServices,
        services: results.map((r, i) => ({
          name: services[i].name,
          status: r.status === 'fulfilled' ? r.value.status : 'down'
        }))
      }
    };
  }

  // Verificar storage
  private async checkStorage(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      // Verificar localStorage
      const testKey = 'health_check_storage';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);

      // Verificar sessionStorage
      sessionStorage.setItem(testKey, 'test');
      sessionStorage.removeItem(testKey);

      const responseTime = Date.now() - startTime;

      return {
        service: 'Storage',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: { 
          localStorage: 'available',
          sessionStorage: 'available'
        }
      };
    } catch (error) {
      return {
        service: 'Storage',
        status: 'down',
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Storage error',
        details: { error }
      };
    }
  }

  // Verificar autenticação
  private async checkAuthentication(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      const responseTime = Date.now() - startTime;
      
      if (error) {
        return {
          service: 'Authentication',
          status: 'degraded',
          responseTime,
          lastChecked: new Date(),
          error: error.message,
          details: { error }
        };
      }

      return {
        service: 'Authentication',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: { 
          hasSession: !!session,
          userId: session?.user?.id
        }
      };
    } catch (error) {
      return {
        service: 'Authentication',
        status: 'down',
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Auth error',
        details: { error }
      };
    }
  }

  // Determinar saúde geral
  private determineOverallHealth(services: HealthCheckResult[]): 'healthy' | 'degraded' | 'down' {
    const downServices = services.filter(s => s.status === 'down').length;
    const degradedServices = services.filter(s => s.status === 'degraded').length;
    
    if (downServices > 0) {
      return 'down';
    } else if (degradedServices > 0) {
      return 'degraded';
    } else {
      return 'healthy';
    }
  }

  // Iniciar monitoramento contínuo
  startMonitoring(intervalMs: number = 30000): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(async () => {
      try {
        const health = await this.checkSystemHealth();
        
        // Log em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          if (process.env.NODE_ENV === 'development') { console.log('🏥 Health Check:', health); }
        }

        // Alertar se sistema estiver down
        if (health.overall === 'down') {
          this.alertSystemDown(health);
        }

        // Enviar métricas para analytics
        this.sendHealthMetrics(health);
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, intervalMs);
  }

  // Parar monitoramento
  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = undefined;
    }
  }

  // Alertar sistema down
  private alertSystemDown(health: SystemHealth): void {
    // Em produção, enviar para serviço de alertas
    if (process.env.NODE_ENV === 'production') {
      // Integrar com PagerDuty, Slack, etc.
      console.error('🚨 SYSTEM DOWN ALERT:', health);
    }
  }

  // Enviar métricas de saúde
  private sendHealthMetrics(health: SystemHealth): void {
    // Enviar para serviço de métricas (DataDog, New Relic, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Implementar envio de métricas
      if (process.env.NODE_ENV === 'development') { console.log('📊 Health Metrics:', {
        overall: health.overall,
        uptime: health.uptime,
        services: health.services.length
      }); }
    }
  }

  // Obter último resultado
  getLastResults(): HealthCheckResult[] {
    return this.lastResults;
  }

  // Verificar se sistema está saudável
  isHealthy(): boolean {
    return this.lastResults.every(service => service.status === 'healthy');
  }

  // Obter uptime
  getUptime(): number {
    return Date.now() - this.startTime.getTime();
  }
}

// Hook para usar health checks
export const useHealthCheck = () => {
  const [health, setHealth] = React.useState<SystemHealth | null>(null);
  const [loading, setLoading] = React.useState(false);
  const healthChecker = HealthChecker.getInstance();

  const checkHealth = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await healthChecker.checkSystemHealth();
      setHealth(result);
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkHealth();
    
    // Verificar a cada 5 minutos
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkHealth]);

  return {
    health,
    loading,
    checkHealth,
    isHealthy: health?.overall === 'healthy',
    getUptime: () => healthChecker.getUptime()
  };
};

// Export da instância
export const healthChecker = HealthChecker.getInstance();
