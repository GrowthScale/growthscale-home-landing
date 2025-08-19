// Edge function para health check e monitoramento
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const startTime = Date.now();
    
    // Verificar conectividade com Supabase
    let supabaseStatus = 'unknown';
    let supabaseLatency = 0;
    
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const supabaseStart = Date.now();
        const { data, error } = await supabase
          .from('companies')
          .select('count')
          .limit(1);
        
        supabaseLatency = Date.now() - supabaseStart;
        supabaseStatus = error ? 'error' : 'healthy';
      } catch (error) {
        supabaseStatus = 'error';
        console.error('Supabase Health Check Error:', error);
      }
    }

    // Verificar conectividade com APIs externas
    const externalApis = {
      googleFonts: 'unknown',
      supabase: supabaseStatus,
    };

    // Testar Google Fonts
    try {
      const fontsStart = Date.now();
      const fontsResponse = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap', {
        method: 'HEAD',
        timeout: 5000,
      });
      externalApis.googleFonts = fontsResponse.ok ? 'healthy' : 'error';
    } catch (error) {
      externalApis.googleFonts = 'error';
    }

    // Coletar métricas do sistema
    const systemMetrics = {
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    };

    // Verificar variáveis de ambiente críticas
    const envCheck = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_REGION: process.env.VERCEL_REGION,
    };

    // Calcular tempo total de resposta
    const totalLatency = Date.now() - startTime;

    // Determinar status geral
    const isHealthy = supabaseStatus === 'healthy' && totalLatency < 1000;
    const status = isHealthy ? 'healthy' : 'degraded';

    const healthData = {
      status,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      region: process.env.VERCEL_REGION || 'unknown',
      latency: {
        total: totalLatency,
        supabase: supabaseLatency,
      },
      externalApis,
      system: systemMetrics,
      environment: envCheck,
      checks: {
        database: supabaseStatus,
        fonts: externalApis.googleFonts,
        responseTime: totalLatency < 1000,
      }
    };

    // Retornar status HTTP apropriado
    const statusCode = isHealthy ? 200 : 503;
    
    res.status(statusCode).json(healthData);

  } catch (error) {
    console.error('Health Check Error:', error);
    
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
      checks: {
        database: 'error',
        fonts: 'error',
        responseTime: false,
      }
    });
  }
}
