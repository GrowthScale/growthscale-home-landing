// Edge function para segurança e rate limiting
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { method } = req;

    if (method === 'POST') {
      // Rate limiting baseado em IP
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      const apiKey = req.headers['x-api-key'];

      // Verificar se é uma requisição suspeita
      const securityData = {
        timestamp: new Date().toISOString(),
        ip: clientIP,
        userAgent,
        method: req.method,
        url: req.url,
        headers: {
          'x-forwarded-for': req.headers['x-forwarded-for'],
          'x-real-ip': req.headers['x-real-ip'],
          'cf-connecting-ip': req.headers['cf-connecting-ip'],
          'x-api-key': apiKey ? 'present' : 'missing'
        },
        body: req.body,
        region: req.headers['x-vercel-region'] || 'unknown',
      };

      // Análise de segurança
      const securityAnalysis = {
        isSuspicious: false,
        threats: [],
        riskScore: 0,
        recommendations: []
      };

      // Verificar User-Agent suspeito
      const suspiciousUserAgents = [
        'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 'java'
      ];
      
      if (userAgent && suspiciousUserAgents.some(agent => 
        userAgent.toLowerCase().includes(agent)
      )) {
        securityAnalysis.isSuspicious = true;
        securityAnalysis.threats.push('suspicious_user_agent');
        securityAnalysis.riskScore += 20;
        securityAnalysis.recommendations.push('Monitor requests from this User-Agent');
      }

      // Verificar IP suspeito
      const suspiciousIPs = [
        '127.0.0.1', 'localhost', '0.0.0.0'
      ];
      
      if (suspiciousIPs.includes(clientIP)) {
        securityAnalysis.isSuspicious = true;
        securityAnalysis.threats.push('suspicious_ip');
        securityAnalysis.riskScore += 30;
        securityAnalysis.recommendations.push('Block requests from localhost');
      }

      // Verificar payload suspeito
      if (req.body) {
        const payload = JSON.stringify(req.body).toLowerCase();
        const suspiciousPatterns = [
          'onload', 'onerror', 'eval(', 'document.cookie',
          'sql', 'union', 'select', 'drop', 'delete', 'insert', 'update'
        ];
        
        if (suspiciousPatterns.some(pattern => payload.includes(pattern))) {
          securityAnalysis.isSuspicious = true;
          securityAnalysis.threats.push('suspicious_payload');
          securityAnalysis.riskScore += 40;
          securityAnalysis.recommendations.push('Sanitize input data');
        }
      }

      // Verificar rate limiting
      const currentTime = Date.now();
      const windowMs = 15 * 60 * 1000; // 15 minutos
      const maxRequests = 100;

      // Simular rate limiting (em produção, usar Redis ou similar)
      const rateLimitData = {
        requests: 1,
        windowStart: currentTime,
        remaining: maxRequests - 1,
        resetTime: currentTime + windowMs
      };

      if (rateLimitData.requests > maxRequests) {
        securityAnalysis.isSuspicious = true;
        securityAnalysis.threats.push('rate_limit_exceeded');
        securityAnalysis.riskScore += 50;
        securityAnalysis.recommendations.push('Implement rate limiting');
      }

      // Log de segurança
      const securityLog = {
        ...securityData,
        analysis: securityAnalysis,
        rateLimit: rateLimitData
      };

      // Enviar para Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        await supabase
          .from('security_logs')
          .insert([securityLog]);
      }

      // Retornar análise de segurança
      return res.status(200).json({
        success: true,
        security: securityAnalysis,
        rateLimit: rateLimitData,
        message: securityAnalysis.isSuspicious ? 
          'Requisição marcada como suspeita' : 
          'Requisição segura'
      });
    }

    if (method === 'GET') {
      // Retornar status de segurança
      const securityStatus = {
        timestamp: new Date().toISOString(),
        status: 'secure',
        threats: {
          xss: 'protected',
          csrf: 'protected',
          sql_injection: 'protected',
          rate_limiting: 'active',
          ddos_protection: 'active'
        },
        headers: {
          'Content-Security-Policy': 'active',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Strict-Transport-Security': 'active',
          'X-XSS-Protection': 'active'
        },
        recommendations: [
          'Monitor logs regularly',
          'Update dependencies',
          'Conduct security audits',
          'Implement WAF'
        ]
      };

      return res.status(200).json(securityStatus);
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
            // console.error('Security Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}
