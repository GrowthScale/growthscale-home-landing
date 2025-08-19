import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Função principal
serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  try {
    const { employeeIds, scheduleId, webhookUrl, tenantId } = await req.json();

    if (!webhookUrl) {throw new Error("Webhook URL não configurada.");}

    // 1. Buscar os dados dos funcionários
    const { data: employeesData, error: empError } = await supabaseClient
      .from('employees')
      .select('id, name, phone_number')
      .in('id', employeeIds);
    if (empError) {throw empError;}

    // 2. Buscar os turnos da escala
    const { data: shiftsData, error: shiftError } = await supabaseClient
      .from('shifts') // Assumindo que sua tabela de turnos se chama 'shifts'
      .select('employee_id, startTime, endTime')
      .eq('schedule_id', scheduleId);
    if (shiftError) {throw shiftError;}

    const logsToInsert = [];

    // 3. Formatar e enviar a mensagem para cada funcionário
    for (const employee of employeesData) {
      const employeeShifts = shiftsData
        .filter(s => s.employee_id === employee.id)
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      let message = `Olá, ${employee.name}! Sua escala da semana está pronta:\n\n`;
      employeeShifts.forEach(shift => {
        const date = new Date(shift.startTime).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
        const start = new Date(shift.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const end = new Date(shift.endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        message += `- ${date}: das ${start} às ${end}\n`;
      });
      
      const payload = { phoneNumber: employee.phone_number, message };

      // 4. Disparar o Webhook
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const logStatus = webhookResponse.ok ? 'SUCCESS' : 'FAILED';
      logsToInsert.push({
          employee_id: employee.id,
          tenant_id: tenantId,
          type: 'WHATSAPP_SCHEDULE_NOTIFICATION',
          status: logStatus,
          details: { message, responseStatus: webhookResponse.status }
      });
    }

    // 5. Salvar logs no banco
    await supabaseClient.from('communication_logs').insert(logsToInsert);

    return new Response(JSON.stringify({ success: true, message: "Notificações enviadas." }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
