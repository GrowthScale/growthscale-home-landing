// Edge function para analytics em tempo real
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
      // Coletar dados de analytics
      const analyticsData = req.body;
      
      // Validar dados
      if (!analyticsData || !analyticsData.event) {
        return res.status(400).json({ error: 'Dados inválidos' });
      }

      // Processar analytics
      const processedData = {
        timestamp: new Date().toISOString(),
        event: analyticsData.event,
        properties: analyticsData.properties || {},
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        referer: req.headers.referer,
        url: req.headers['x-url'] || analyticsData.url,
        sessionId: analyticsData.sessionId,
        userId: analyticsData.userId,
      };

      // Enviar para Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        await supabase
          .from('analytics_events')
          .insert([processedData]);
      }

      // Log para debugging
      console.log('Analytics Event:', processedData);

      return res.status(200).json({ 
        success: true, 
        message: 'Evento registrado com sucesso' 
      });
    }

    if (method === 'GET') {
      // Retornar métricas de analytics
      const metrics = {
        totalEvents: 0,
        eventsByType: {},
        recentEvents: [],
        performance: {
          avgResponseTime: 0,
          errorRate: 0,
        }
      };

      // Buscar dados do Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Buscar eventos recentes
        const { data: recentEvents } = await supabase
          .from('analytics_events')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);

        if (recentEvents) {
          metrics.recentEvents = recentEvents;
          metrics.totalEvents = recentEvents.length;

          // Agrupar por tipo de evento
          recentEvents.forEach(event => {
            metrics.eventsByType[event.event] = (metrics.eventsByType[event.event] || 0) + 1;
          });
        }
      }

      return res.status(200).json(metrics);
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
    console.error('Analytics Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}
