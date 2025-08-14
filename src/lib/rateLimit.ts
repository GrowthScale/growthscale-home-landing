// =====================================================
// RATE LIMITING - GROWTHSCALE
// Proteção básica para APIs sensíveis
// =====================================================

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  keyGenerator?: (req: Record<string, unknown>) => string;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Store em memória (para desenvolvimento)
// Em produção, usar Redis/Upstash
const store: RateLimitStore = {};

// Configurações por rota
export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  // Login - 5 tentativas por 15 minutos
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
  },
  
  // WhatsApp - 10 envios por hora
  whatsapp: {
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10,
    message: 'Limite de envios WhatsApp atingido. Tente novamente em 1 hora.'
  },
  
  // IA - 50 requests por hora
  ai: {
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 50,
    message: 'Limite de requests de IA atingido. Tente novamente em 1 hora.'
  },
  
  // API geral - 100 requests por 15 minutos
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: 'Muitas requisições. Tente novamente em 15 minutos.'
  }
};

// Função principal de rate limiting
export function createRateLimiter(config: RateLimitConfig) {
  return function rateLimit(req: Record<string, unknown>, res?: Record<string, unknown>): { success: boolean; remaining: number; resetTime: number; message?: string } {
    const key = config.keyGenerator ? config.keyGenerator(req) : 'default';
    const now = Date.now();
    
    // Limpar registros expirados
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }
    
    // Inicializar ou incrementar contador
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + config.windowMs
      };
    } else {
      store[key].count++;
    }
    
    const { count, resetTime } = store[key];
    const remaining = Math.max(0, config.max - count);
    
    // Verificar se excedeu o limite
    if (count > config.max) {
      return {
        success: false,
        remaining: 0,
        resetTime,
        message: config.message
      };
    }
    
    return {
      success: true,
      remaining,
      resetTime
    };
  };
}

// Rate limiters específicos
export const authRateLimit = createRateLimiter(rateLimitConfigs.auth);
export const whatsappRateLimit = createRateLimiter(rateLimitConfigs.whatsapp);
export const aiRateLimit = createRateLimiter(rateLimitConfigs.ai);
export const apiRateLimit = createRateLimiter(rateLimitConfigs.api);

// Função para limpar store (útil para testes)
export function clearRateLimitStore(): void {
  Object.keys(store).forEach(key => delete store[key]);
}

// Função para obter estatísticas (útil para monitoramento)
export function getRateLimitStats(): Record<string, { count: number; resetTime: number }> {
  return { ...store };
}

// Middleware para uso em APIs
export function rateLimitMiddleware(type: keyof typeof rateLimitConfigs) {
  return function(req: Record<string, unknown>, res: Record<string, unknown>, next: () => void) {
    const limiter = createRateLimiter(rateLimitConfigs[type]);
    const result = limiter(req);
    
    if (!result.success) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: result.message,
        resetTime: result.resetTime
      });
    }
    
    // Adicionar headers de rate limit
    res.setHeader('X-RateLimit-Limit', rateLimitConfigs[type].max);
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    res.setHeader('X-RateLimit-Reset', result.resetTime);
    
    next();
  };
}
