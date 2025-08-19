// =====================================================
// RATE LIMITING - GROWTHSCALE
// Proteção com Redis/Upstash para produção
// =====================================================

import { Redis } from '@upstash/redis';

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  keyGenerator?: (req: Record<string, unknown>) => string;
}

// Configuração do Redis (fallback para memória em desenvolvimento)
const redis = process.env.NODE_ENV === 'production' 
  ? new Redis({
      url: import.meta.env.VITE_UPSTASH_REDIS_URL,
      token: import.meta.env.VITE_UPSTASH_REDIS_TOKEN,
    })
  : null;

// Store em memória (para desenvolvimento)
const memoryStore: Record<string, { count: number; resetTime: number }> = {};

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
export async function createRateLimiter(config: RateLimitConfig) {
  return async function rateLimit(req: Record<string, unknown>, res?: Record<string, unknown>): Promise<{ success: boolean; remaining: number; resetTime: number; message?: string }> {
    const key = config.keyGenerator ? config.keyGenerator(req) : 'default';
    const now = Date.now();
    
    if (redis) {
      // Usar Redis em produção
      try {
        const current = await redis.get<{ count: number; resetTime: number }>(`rate_limit:${key}`);
        
        if (current && current.resetTime < now) {
          await redis.del(`rate_limit:${key}`);
          await redis.set(`rate_limit:${key}`, { count: 1, resetTime: now + config.windowMs }, { ex: Math.floor(config.windowMs / 1000) });
        } else if (current) {
          await redis.set(`rate_limit:${key}`, { count: current.count + 1, resetTime: current.resetTime }, { ex: Math.floor(config.windowMs / 1000) });
        } else {
          await redis.set(`rate_limit:${key}`, { count: 1, resetTime: now + config.windowMs }, { ex: Math.floor(config.windowMs / 1000) });
        }
        
        const updated = await redis.get<{ count: number; resetTime: number }>(`rate_limit:${key}`);
        const remaining = Math.max(0, config.max - (updated?.count || 0));
        
        if ((updated?.count || 0) > config.max) {
          return {
            success: false,
            remaining: 0,
            resetTime: updated?.resetTime || now,
            message: config.message
          };
        }
        
        return {
          success: true,
          remaining,
          resetTime: updated?.resetTime || now
        };
      } catch (error) {
        console.error('Redis rate limiting error:', error);
        // Fallback para memória em caso de erro
      }
    }
    
    // Fallback para memória (desenvolvimento ou erro Redis)
    if (memoryStore[key] && memoryStore[key].resetTime < now) {
      delete memoryStore[key];
    }
    
    if (!memoryStore[key]) {
      memoryStore[key] = {
        count: 1,
        resetTime: now + config.windowMs
      };
    } else {
      memoryStore[key].count++;
    }
    
    const { count, resetTime } = memoryStore[key];
    const remaining = Math.max(0, config.max - count);
    
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

// Função para limpar rate limits (útil para testes)
export async function clearRateLimits(): Promise<void> {
  if (redis) {
    const keys = await redis.keys('rate_limit:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } else {
    Object.keys(memoryStore).forEach(key => delete memoryStore[key]);
  }
}

// Função para obter estatísticas de rate limiting
export async function getRateLimitStats(): Promise<Record<string, { count: number; remaining: number; resetTime: number }>> {
  const stats: Record<string, { count: number; remaining: number; resetTime: number }> = {};
  
  if (redis) {
    const keys = await redis.keys('rate_limit:*');
    for (const key of keys) {
      const data = await redis.get<{ count: number; resetTime: number }>(key);
      if (data) {
        const configKey = key.replace('rate_limit:', '');
        const config = rateLimitConfigs[configKey];
        if (config) {
          stats[configKey] = {
            count: data.count,
            remaining: Math.max(0, config.max - data.count),
            resetTime: data.resetTime
          };
        }
      }
    }
  } else {
    Object.keys(memoryStore).forEach(key => {
      const config = rateLimitConfigs[key];
      if (config) {
        stats[key] = {
          count: memoryStore[key].count,
          remaining: Math.max(0, config.max - memoryStore[key].count),
          resetTime: memoryStore[key].resetTime
        };
      }
    });
  }
  
  return stats;
}

// Middleware para uso em APIs
export function rateLimitMiddleware(type: keyof typeof rateLimitConfigs) {
  return async function(req: Record<string, unknown>, res: Record<string, unknown>, next: () => void) {
    const limiter = await createRateLimiter(rateLimitConfigs[type]);
    const result = await limiter(req);
    
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
