// Edge function para performance monitoring
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { method } = req;

    if (method === 'POST') {
      // Coletar dados de performance
      const performanceData = req.body;
      
      // Validar dados
      if (!performanceData || !performanceData.metrics) {
        return res.status(400).json({ error: 'Dados de performance inválidos' });
      }

      // Processar métricas de performance
      const processedData = {
        timestamp: new Date().toISOString(),
        url: performanceData.url,
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        sessionId: performanceData.sessionId,
        userId: performanceData.userId,
        metrics: {
          lcp: performanceData.metrics.lcp,
          fid: performanceData.metrics.fid,
          cls: performanceData.metrics.cls,
          ttfb: performanceData.metrics.ttfb,
          fcp: performanceData.metrics.fcp,
          loadTime: performanceData.metrics.loadTime,
          bundleSize: performanceData.metrics.bundleSize,
          chunkCount: performanceData.metrics.chunkCount,
        },
        score: performanceData.score,
        environment: performanceData.environment || 'production',
        region: req.headers['x-vercel-region'] || 'unknown',
      };

      // Enviar para Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        await supabase
          .from('performance_metrics')
          .insert([processedData]);
      }

      // Log para debugging
      if (process.env.NODE_ENV === 'development') {
        // console.log('Performance Metrics:', processedData);
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Métricas registradas com sucesso' 
      });
    }

    if (method === 'GET') {
      // Retornar métricas de performance agregadas
      const aggregatedMetrics = {
        averageScores: {
          lcp: 0,
          fid: 0,
          cls: 0,
          ttfb: 0,
          overall: 0,
        },
        performanceDistribution: {
          excellent: 0, // 90-100
          good: 0,      // 70-89
          needsImprovement: 0, // 50-69
          poor: 0,      // 0-49
        },
        recentMetrics: [],
        alerts: [],
      };

      // Buscar dados do Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Buscar métricas recentes (últimas 24h)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        
        const { data: recentMetrics } = await supabase
          .from('performance_metrics')
          .select('*')
          .gte('timestamp', twentyFourHoursAgo)
          .order('timestamp', { ascending: false })
          .limit(1000);

        if (recentMetrics && recentMetrics.length > 0) {
          aggregatedMetrics.recentMetrics = recentMetrics.slice(0, 100);

          // Calcular médias
          const totalMetrics = recentMetrics.length;
          const sums = recentMetrics.reduce((acc, metric) => {
            acc.lcp += metric.metrics.lcp || 0;
            acc.fid += metric.metrics.fid || 0;
            acc.cls += metric.metrics.cls || 0;
            acc.ttfb += metric.metrics.ttfb || 0;
            acc.overall += metric.score || 0;
            return acc;
          }, { lcp: 0, fid: 0, cls: 0, ttfb: 0, overall: 0 });

          aggregatedMetrics.averageScores = {
            lcp: Math.round(sums.lcp / totalMetrics),
            fid: Math.round(sums.fid / totalMetrics),
            cls: Math.round((sums.cls / totalMetrics) * 1000) / 1000,
            ttfb: Math.round(sums.ttfb / totalMetrics),
            overall: Math.round(sums.overall / totalMetrics),
          };

          // Distribuição de performance
          recentMetrics.forEach(metric => {
            const score = metric.score || 0;
            if (score >= 90) {aggregatedMetrics.performanceDistribution.excellent++;}
            else if (score >= 70) {aggregatedMetrics.performanceDistribution.good++;}
            else if (score >= 50) {aggregatedMetrics.performanceDistribution.needsImprovement++;}
            else {aggregatedMetrics.performanceDistribution.poor++;}
          });

          // Gerar alertas
          const avgLCP = aggregatedMetrics.averageScores.lcp;
          const avgFID = aggregatedMetrics.averageScores.fid;
          const avgCLS = aggregatedMetrics.averageScores.cls;

          if (avgLCP > 2500) {
            aggregatedMetrics.alerts.push({
              type: 'warning',
              metric: 'LCP',
              message: `LCP médio (${avgLCP}ms) está acima do threshold recomendado (2500ms)`,
              severity: 'high'
            });
          }

          if (avgFID > 100) {
            aggregatedMetrics.alerts.push({
              type: 'warning',
              metric: 'FID',
              message: `FID médio (${avgFID}ms) está acima do threshold recomendado (100ms)`,
              severity: 'medium'
            });
          }

          if (avgCLS > 0.1) {
            aggregatedMetrics.alerts.push({
              type: 'warning',
              metric: 'CLS',
              message: `CLS médio (${avgCLS}) está acima do threshold recomendado (0.1)`,
              severity: 'medium'
            });
          }
        }
      }

      return res.status(200).json(aggregatedMetrics);
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
            // console.error('Performance Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}
