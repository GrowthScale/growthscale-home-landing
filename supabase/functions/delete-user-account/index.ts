// supabase/functions/delete-user-account/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface DeleteUserRequest {
  user: {
    id: string;
    email: string;
  };
  reason?: string;
  permanent?: boolean;
}

serve(async (req) => {
  try {
    // Configurar CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Verificar método HTTP
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método não permitido' }), { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // É crucial usar a chave de Service Role para ter permissões de administrador
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!serviceRoleKey) {
      throw new Error("Chave de serviço do Supabase não configurada.");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    if (!supabaseUrl) {
      throw new Error("URL do Supabase não configurada.");
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Obtém os dados da requisição
    const { user, reason, permanent = false }: DeleteUserRequest = await req.json();
    
    if (!user || !user.id) {
      throw new Error("Utilizador não autenticado ou dados inválidos.");
    }

    if (process.env.NODE_ENV === 'development') { console.log(`🔒 Iniciando exclusão de conta para usuário: ${user.email} (${user.id}) }`);
    if (process.env.NODE_ENV === 'development') { console.log(`📝 Motivo: ${reason || 'Não informado'}`); }
    if (process.env.NODE_ENV === 'development') { console.log(`🗑️ Exclusão permanente: ${permanent}`); }

    // A ORDEM É IMPORTANTE: Primeiro elimina os dados relacionados, depois o utilizador.
    
    // 1. Eliminar logs de comunicação
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Eliminando logs de comunicação..."); }
    const { error: commLogsError } = await supabaseAdmin
      .from('communication_logs')
      .delete()
      .eq('user_id', user.id);
    
    if (commLogsError) {
      console.error("Erro ao eliminar logs de comunicação:", commLogsError);
    }

    // 2. Eliminar rascunhos de escalas
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Eliminando rascunhos de escalas..."); }
    const { error: draftsError } = await supabaseAdmin
      .from('schedule_drafts')
      .delete()
      .eq('created_by', user.id);
    
    if (draftsError) {
      console.error("Erro ao eliminar rascunhos:", draftsError);
    }

    // 3. Eliminar escalas
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Eliminando escalas..."); }
    const { error: schedulesError } = await supabaseAdmin
      .from('schedules')
      .delete()
      .eq('created_by', user.id);
    
    if (schedulesError) {
      console.error("Erro ao eliminar escalas:", schedulesError);
    }

    // 4. Eliminar turnos
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Eliminando turnos..."); }
    const { error: shiftsError } = await supabaseAdmin
      .from('shifts')
      .delete()
      .eq('created_by', user.id);
    
    if (shiftsError) {
      console.error("Erro ao eliminar turnos:", shiftsError);
    }

    // 5. Eliminar funcionários
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Eliminando funcionários..."); }
    const { error: employeesError } = await supabaseAdmin
      .from('employees')
      .delete()
      .eq('created_by', user.id);
    
    if (employeesError) {
      console.error("Erro ao eliminar funcionários:", employeesError);
    }

    // 6. Eliminar associações de usuário com empresas
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Eliminando associações com empresas..."); }
    const { error: companyUsersError } = await supabaseAdmin
      .from('company_users')
      .delete()
      .eq('user_id', user.id);
    
    if (companyUsersError) {
      console.error("Erro ao eliminar associações:", companyUsersError);
    }

    // 7. Eliminar empresas (se o usuário for o proprietário)
    if (process.env.NODE_ENV === 'development') { console.log("🗑️ Verificando e eliminando empresas..."); }
    const { data: userCompanies, error: companiesQueryError } = await supabaseAdmin
      .from('companies')
      .select('id, name')
      .eq('owner_id', user.id);
    
    if (companiesQueryError) {
      console.error("Erro ao consultar empresas:", companiesQueryError);
    } else if (userCompanies && userCompanies.length > 0) {
      if (process.env.NODE_ENV === 'development') { console.log(`🏢 Eliminando ${userCompanies.length} empresa(s) do usuário...`); }
      
      for (const company of userCompanies) {
        if (process.env.NODE_ENV === 'development') { console.log(`🗑️ Eliminando empresa: ${company.name} (${company.id})`); }
        
        // Eliminar funcionários da empresa
        await supabaseAdmin
          .from('employees')
          .delete()
          .eq('company_id', company.id);
        
        // Eliminar escalas da empresa
        await supabaseAdmin
          .from('schedules')
          .delete()
          .eq('company_id', company.id);
        
        // Eliminar a empresa
        await supabaseAdmin
          .from('companies')
          .delete()
          .eq('id', company.id);
      }
    }

    // 8. Log da exclusão para auditoria
    if (process.env.NODE_ENV === 'development') { console.log("📝 Registrando log de auditoria..."); }
    const { error: auditError } = await supabaseAdmin
      .from('audit_logs')
      .insert({
        action: 'USER_ACCOUNT_DELETION',
        user_id: user.id,
        user_email: user.email,
        details: {
          reason: reason || 'Solicitação do usuário',
          permanent: permanent,
          timestamp: new Date().toISOString(),
          data_deleted: [
            'communication_logs',
            'schedule_drafts', 
            'schedules',
            'shifts',
            'employees',
            'company_users',
            'companies'
          ]
        }
      });
    
    if (auditError) {
      console.error("Erro ao registrar log de auditoria:", auditError);
    }

    // 9. Finalmente, elimina o utilizador do sistema de autenticação do Supabase
    if (process.env.NODE_ENV === 'development') { console.log("👤 Eliminando usuário do sistema de autenticação..."); }
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    
    if (deleteError) {
      console.error("Erro ao eliminar usuário:", deleteError);
      throw deleteError;
    }

    if (process.env.NODE_ENV === 'development') { console.log("✅ Conta eliminada com sucesso!"); }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Conta eliminada com sucesso.",
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

  } catch (error) {
    console.error("❌ Erro ao eliminar a conta do utilizador:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
});
