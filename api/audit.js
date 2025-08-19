// Edge function para audit logging e compliance GDPR
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { method } = req;

    if (method === 'POST') {
      // Coletar dados de auditoria
      const auditData = req.body;
      
      // Validar dados
      if (!auditData || !auditData.event) {
        return res.status(400).json({ error: 'Dados de auditoria inválidos' });
      }

      // Processar dados de auditoria
      const processedAuditData = {
        timestamp: new Date().toISOString(),
        event: auditData.event,
        category: auditData.category || 'general',
        severity: auditData.severity || 'info',
        user_id: auditData.userId,
        session_id: auditData.sessionId,
        ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
        url: auditData.url || req.url,
        method: req.method,
        resource: auditData.resource,
        action: auditData.action,
        details: auditData.details || {},
        metadata: {
          region: req.headers['x-vercel-region'] || 'unknown',
          country: req.headers['cf-ipcountry'] || 'unknown',
          referer: req.headers.referer,
          origin: req.headers.origin
        },
        compliance: {
          gdpr_article: auditData.gdprArticle,
          data_subject: auditData.dataSubject,
          legal_basis: auditData.legalBasis,
          retention_period: auditData.retentionPeriod || '7_years'
        }
      };

      // Enviar para Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        await supabase
          .from('audit_logs')
          .insert([processedAuditData]);
      }

      // Log para debugging
      if (process.env.NODE_ENV === 'development') {
        // console.log('Audit Event:', processedAuditData);
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Evento de auditoria registrado com sucesso',
        audit_id: processedAuditData.timestamp
      });
    }

    if (method === 'GET') {
      // Retornar logs de auditoria
      const { userId, event, category, startDate, endDate, limit = 100 } = req.query;

      const query = {
        timestamp: new Date().toISOString(),
        total_events: 0,
        events_by_category: {},
        events_by_severity: {},
        recent_events: [],
        compliance_summary: {
          gdpr_article_6: 0,
          gdpr_article_7: 0,
          gdpr_article_17: 0,
          data_retention: 'compliant'
        }
      };

      // Buscar dados do Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        let supabaseQuery = supabase
          .from('audit_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(parseInt(limit));

        // Aplicar filtros
        if (userId) {
          supabaseQuery = supabaseQuery.eq('user_id', userId);
        }
        if (event) {
          supabaseQuery = supabaseQuery.eq('event', event);
        }
        if (category) {
          supabaseQuery = supabaseQuery.eq('category', category);
        }
        if (startDate) {
          supabaseQuery = supabaseQuery.gte('timestamp', startDate);
        }
        if (endDate) {
          supabaseQuery = supabaseQuery.lte('timestamp', endDate);
        }

        const { data: auditEvents } = await supabaseQuery;

        if (auditEvents && auditEvents.length > 0) {
          query.recent_events = auditEvents;
          query.total_events = auditEvents.length;

          // Agrupar por categoria
          auditEvents.forEach(event => {
            query.events_by_category[event.category] = 
              (query.events_by_category[event.category] || 0) + 1;
            
            query.events_by_severity[event.severity] = 
              (query.events_by_severity[event.severity] || 0) + 1;

            // Contar compliance GDPR
            if (event.compliance && event.compliance.gdpr_article) {
              const article = event.compliance.gdpr_article;
              if (article.includes('6')) {query.compliance_summary.gdpr_article_6++;}
              if (article.includes('7')) {query.compliance_summary.gdpr_article_7++;}
              if (article.includes('17')) {query.compliance_summary.gdpr_article_17++;}
            }
          });
        }
      }

      return res.status(200).json(query);
    }

    if (method === 'DELETE') {
      // GDPR Right to be Forgotten (Article 17)
      const { userId, dataSubject } = req.body;

      if (!userId && !dataSubject) {
        return res.status(400).json({ 
          error: 'userId ou dataSubject é obrigatório para GDPR Article 17' 
        });
      }

      // Processar solicitação de exclusão
      const deletionRequest = {
        timestamp: new Date().toISOString(),
        type: 'gdpr_deletion_request',
        user_id: userId,
        data_subject: dataSubject,
        status: 'pending',
        compliance: {
          gdpr_article: '17',
          legal_basis: 'right_to_be_forgotten',
          retention_period: 'immediate'
        }
      };

      // Enviar para Supabase (se configurado)
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Registrar solicitação de exclusão
        await supabase
          .from('audit_logs')
          .insert([deletionRequest]);

        // Marcar dados para exclusão (não deletar imediatamente)
        await supabase
          .from('user_profiles')
          .update({ 
            gdpr_deletion_requested: true,
            gdpr_deletion_date: new Date().toISOString()
          })
          .eq('id', userId);
      }

      return res.status(200).json({
        success: true,
        message: 'Solicitação de exclusão GDPR registrada',
        compliance: 'GDPR Article 17 - Right to be Forgotten',
        status: 'pending_review'
      });
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
    console.error('Audit Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}
