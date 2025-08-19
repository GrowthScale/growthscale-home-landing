// supabase/functions/send-weekly-report/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

// Função para gerar o resumo com a IA
async function getAISummary(metrics: Record<string, unknown>) {
  const openAIKey = Deno.env.get("OPENAI_API_KEY");
  if (!openAIKey) {return "Resumo da IA indisponível.";}

  const openai = new OpenAI(openAIKey);
  const totalCost = (metrics.totalCost as number) || 0;
  const overtimeCost = (metrics.overtimeCost as number) || 0;
  const criticalViolations = (metrics.criticalViolations as number) || 0;
  
  const prompt = `
    Analise as seguintes métricas semanais da escala de um restaurante:
    - Custo Total: R$ ${totalCost.toFixed(2)}
    - Custo com Horas Extras: R$ ${overtimeCost.toFixed(2)}
    - Violações Críticas da CLT: ${criticalViolations}
    
    Escreva um resumo executivo curto (2-3 frases) para o gestor, em tom profissional e informativo. Destaque um ponto positivo e um ponto de atenção.
  `;

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ "role": "user", "content": prompt }],
    temperature: 0.5,
  });

  return chatCompletion.choices[0].message.content;
}

// Interface para métricas semanais
interface WeeklyMetrics {
  totalCost: number;
  overtimeCost: number;
  criticalViolations: number;
  totalHours: number;
  employeeCount: number;
}

// Função para buscar métricas reais da semana passada
async function getWeeklyMetrics(supabaseAdmin: any, tenantId: string): Promise<WeeklyMetrics> {
  const lastWeekStart = new Date();
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastWeekEnd = new Date();
  lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);

  // Buscar escalas da semana passada
  const { data: schedules, error: schedulesError } = await supabaseAdmin
    .from('schedules')
    .select(`
      id,
      start_date,
      end_date,
      shifts (
        id,
        employee_id,
        start_time,
        end_time,
        date,
        hourly_rate
      )
    `)
    .eq('tenant_id', tenantId)
    .gte('start_date', lastWeekStart.toISOString().split('T')[0])
    .lte('end_date', lastWeekEnd.toISOString().split('T')[0]);

  if (schedulesError) {
    console.error('Erro ao buscar escalas:', schedulesError);
    return {
      totalCost: 0,
      overtimeCost: 0,
      criticalViolations: 0,
      totalHours: 0,
      employeeCount: 0
    };
  }

  let totalCost = 0;
  let overtimeCost = 0;
  let criticalViolations = 0;
  let totalHours = 0;
  const employeeIds = new Set();

  // Calcular métricas
  schedules?.forEach((schedule: Record<string, unknown>) => {
    const shifts = schedule.shifts as Array<Record<string, unknown>>;
    shifts?.forEach((shift: Record<string, unknown>) => {
      employeeIds.add(shift.employee_id);
      
      const startTime = new Date(`2024-01-01T${shift.start_time}`);
      const endTime = new Date(`2024-01-01T${shift.end_time}`);
      const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      
      totalHours += hoursWorked;
      const shiftCost = hoursWorked * (shift.hourly_rate || 15); // Taxa padrão se não definida
      totalCost += shiftCost;

      // Detectar horas extras (mais de 8h por dia)
      if (hoursWorked > 8) {
        const overtimeHours = hoursWorked - 8;
        overtimeCost += overtimeHours * (shift.hourly_rate || 15) * 1.5; // 50% extra
      }

      // Detectar violações críticas (mais de 44h por semana)
      if (totalHours > 44) {
        criticalViolations++;
      }
    });
  });

  return {
    totalCost,
    overtimeCost,
    criticalViolations,
    totalHours,
    employeeCount: employeeIds.size
  };
}

serve(async (req) => {
  try {
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!serviceRoleKey) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurada");
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceRoleKey
    );

    // 1. Buscar tenants que devem receber o relatório
    const { data: tenants, error: tenantsError } = await supabaseAdmin
      .from('companies')
      .select('id, name, owner_email')
      .not('owner_email', 'is', null);

    if (tenantsError) {
      console.error('Erro ao buscar tenants:', tenantsError);
      throw tenantsError;
    }

    if (process.env.NODE_ENV === 'development') { console.log(`Encontrados ${tenants?.length || 0} tenants para processar relatórios`); }

    // 2. Para cada tenant, processar o relatório
    for (const tenant of tenants || []) {
      try {
        if (process.env.NODE_ENV === 'development') { console.log(`Processando relatório para tenant: ${tenant.id} (${tenant.name}) }`);

        // 3. Obter os dados reais da semana passada
        const weeklyMetrics = await getWeeklyMetrics(supabaseAdmin, tenant.id);

        // 4. Gerar o resumo com a IA
        const summary = await getAISummary(weeklyMetrics);

        // 5. Montar o HTML do e-mail
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Relatório Semanal - GrowthScale</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .metric { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
              .summary { background: #e8f4fd; padding: 20px; border-radius: 5px; margin: 20px 0; }
              .cta { text-align: center; margin: 30px 0; }
              .btn { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📊 Relatório Semanal de Escalas</h1>
                <p>${tenant.name}</p>
              </div>
              
              <div class="content">
                <div class="summary">
                  <h3>🤖 Resumo da IA:</h3>
                  <p><em>"${summary}"</em></p>
                </div>

                <h3>📈 Métricas da Semana:</h3>
                
                <div class="metric">
                  <strong>💰 Custo Total da Escala:</strong> R$ ${weeklyMetrics.totalCost.toFixed(2)}
                </div>
                
                <div class="metric">
                  <strong>⏰ Custo com Horas Extras:</strong> R$ ${weeklyMetrics.overtimeCost.toFixed(2)}
                </div>
                
                <div class="metric">
                  <strong>👥 Funcionários Ativos:</strong> ${weeklyMetrics.employeeCount}
                </div>
                
                <div class="metric">
                  <strong>🕒 Total de Horas Trabalhadas:</strong> ${weeklyMetrics.totalHours.toFixed(1)}h
                </div>
                
                <div class="metric">
                  <strong>⚠️ Violações Críticas Evitadas:</strong> ${weeklyMetrics.criticalViolations}
                </div>

                <div class="cta">
                  <a href="${Deno.env.get('FRONTEND_URL') || 'https://growthscale-home-landing.vercel.app'}/dashboard" class="btn">
                    📊 Ver Dashboard Completo
                  </a>
                </div>

                <div class="footer">
                  <p>Este relatório foi gerado automaticamente pela GrowthScale</p>
                  <p>Para dúvidas, entre em contato conosco</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        // 6. Enviar e-mail usando Resend (recomendado)
        const resendApiKey = Deno.env.get("RESEND_API_KEY");
        if (resendApiKey) {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              from: 'GrowthScale <relatorios@growthscale.com>',
              to: [tenant.owner_email],
              subject: `📊 Seu Relatório Semanal de Escalas - ${tenant.name}`,
              html: emailHtml,
            })
          });

          if (emailResponse.ok) {
            if (process.env.NODE_ENV === 'development') { console.log(`✅ E-mail enviado com sucesso para ${tenant.owner_email}`); }
          } else {
            const errorData = await emailResponse.text();
            console.error(`❌ Erro ao enviar e-mail para ${tenant.owner_email}:`, errorData);
          }
        } else {
          // Fallback: usar Supabase Auth (limitado)
          if (process.env.NODE_ENV === 'development') { console.log(`⚠️ RESEND_API_KEY não configurada. E-mail não enviado para ${tenant.owner_email}`); }
          if (process.env.NODE_ENV === 'development') { console.log(`📧 Conteúdo do e-mail que seria enviado:`); }
          if (process.env.NODE_ENV === 'development') { console.log(`Para: ${tenant.owner_email}`); }
          if (process.env.NODE_ENV === 'development') { console.log(`Assunto: 📊 Seu Relatório Semanal de Escalas - ${tenant.name}`); }
        }
      } catch (tenantError) {
        console.error(`❌ Erro ao processar tenant ${tenant.id}:`, tenantError);
        // Continua processando outros tenants
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Relatórios semanais processados",
        tenantsProcessed: tenants?.length || 0
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("❌ Erro geral na função:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
