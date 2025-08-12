// supabase/functions/generate-weekly-drafts/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  try {
    // Use a chave de Service Role para ter acesso total ao banco
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!serviceRoleKey) throw new Error("Chave de serviço do Supabase não encontrada.");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceRoleKey
    );

    // 1. Buscar todos os tenants (empresas) ativos
    const { data: tenants, error: tenantsError } = await supabaseAdmin
      .from('companies') // Garanta que o nome da sua tabela de empresas/tenants está correto
      .select('id');
    if (tenantsError) throw tenantsError;

    console.log(`Encontrados ${tenants.length} tenants para processar.`);

    // 2. Para cada tenant, gerar um rascunho
    for (const tenant of tenants) {
      console.log(`Processando tenant: ${tenant.id}`);
      
      // Lógica para determinar a data de início da próxima semana (próxima segunda-feira)
      const today = new Date();
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
      if (today.getDay() === 1) nextMonday.setDate(today.getDate() + 7); // Se hoje é segunda, pegue a próxima
      const targetWeekStart = nextMonday.toISOString().split('T')[0];

      // Verificar se já não existe um rascunho para esta semana para este tenant
      const { data: existingDraft, error: checkError } = await supabaseAdmin
        .from('schedule_drafts')
        .select('id')
        .eq('tenant_id', tenant.id)
        .eq('target_week_start', targetWeekStart)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // Ignora erro de "nenhuma linha encontrada"
          console.error(`Erro ao verificar rascunho existente para ${tenant.id}:`, checkError);
          continue; // Pula para o próximo tenant
      }

      if (existingDraft) {
        console.log(`Rascunho para a semana de ${targetWeekStart} já existe para o tenant ${tenant.id}. Pulando.`);
        continue;
      }
      
      // Buscar funcionários do tenant
      const { data: employees, error: employeesError } = await supabaseAdmin
        .from('employees')
        .select('id, name, department, skills')
        .eq('company_id', tenant.id);
      
      if (employeesError) {
        console.error(`Erro ao buscar funcionários para o tenant ${tenant.id}:`, employeesError);
        continue;
      }

      if (!employees || employees.length === 0) {
        console.log(`Nenhum funcionário encontrado para o tenant ${tenant.id}. Pulando.`);
        continue;
      }

      // Buscar modelos de escala padrão do tenant
      const { data: templates, error: templatesError } = await supabaseAdmin
        .from('schedule_templates')
        .select('template_data')
        .eq('tenant_id', tenant.id)
        .limit(1);
      
      if (templatesError) {
        console.error(`Erro ao buscar templates para o tenant ${tenant.id}:`, templatesError);
        continue;
      }

      // Preparar dados para a sugestão de IA
      const employeesForSuggestion = employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        workload: 44, // Default workload
        constraints: emp.skills || []
      }));

      // Gerar turnos padrão para a próxima semana baseado no template ou padrão 5x2
      const shiftsToFill = [];
      const weekDays = [1, 2, 3, 4, 5]; // Segunda a Sexta
      const templateShifts = templates?.[0]?.template_data?.shifts || [
        { dayOfWeek: 1, startTime: '08:00', endTime: '17:00', requiredEmployees: 2 },
        { dayOfWeek: 2, startTime: '08:00', endTime: '17:00', requiredEmployees: 2 },
        { dayOfWeek: 3, startTime: '08:00', endTime: '17:00', requiredEmployees: 2 },
        { dayOfWeek: 4, startTime: '08:00', endTime: '17:00', requiredEmployees: 2 },
        { dayOfWeek: 5, startTime: '08:00', endTime: '17:00', requiredEmployees: 2 }
      ];

      weekDays.forEach((dayOfWeek, index) => {
        const shiftDate = new Date(nextMonday);
        shiftDate.setDate(nextMonday.getDate() + index);
        
        const templateShift = templateShifts.find(ts => ts.dayOfWeek === dayOfWeek);
        if (templateShift) {
          shiftsToFill.push({
            id: `shift-${dayOfWeek}-${targetWeekStart}`,
            startTime: `${shiftDate.toISOString().split('T')[0]}T${templateShift.startTime}:00`,
            endTime: `${shiftDate.toISOString().split('T')[0]}T${templateShift.endTime}:00`,
            requiredSkill: 'Qualquer'
          });
        }
      });

      // Invocar a função suggest-schedule para gerar a sugestão
      const { data: suggestionPayload, error: suggestionError } = await supabaseAdmin.functions.invoke('suggest-schedule', {
        body: { 
          employees: employeesForSuggestion,
          shiftsToFill: shiftsToFill,
          rules: ["Respeitar a CLT rigorosamente.", "Distribuir carga de trabalho equitativamente."]
        }
      });
      
      if (suggestionError || !suggestionPayload || suggestionPayload.error) {
        console.error(`Erro ao gerar sugestão de IA para o tenant ${tenant.id}:`, suggestionError || suggestionPayload?.error);
        continue;
      }

      // 3. Salvar o rascunho real gerado pela IA no banco
      const { error: insertError } = await supabaseAdmin.from('schedule_drafts').insert({
        tenant_id: tenant.id,
        target_week_start: targetWeekStart,
        draft_data: suggestionPayload.suggestion,
        status: 'pending_review'
      });

      if (insertError) {
        console.error(`Erro ao salvar rascunho para o tenant ${tenant.id}:`, insertError);
        continue;
      }

      console.log(`Rascunho para a semana de ${targetWeekStart} criado com sucesso para o tenant ${tenant.id}.`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Rascunhos semanais gerados com sucesso.",
      processedTenants: tenants?.length || 0
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Erro geral na função agendada:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
