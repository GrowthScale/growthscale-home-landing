// src/utils/debugAuthFlow.ts
import { supabase } from '@/integrations/supabase/client';

export const debugAuthFlow = async () => {
  console.log('🔍 DEBUG: FLUXO DE AUTENTICAÇÃO');
  console.log('================================');
  
  // 1. Verificar configuração atual
  console.log('\n1️⃣ CONFIGURAÇÃO ATUAL:');
  console.log('Site URL:', import.meta.env.VITE_SITE_URL);
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('URL atual:', window.location.href);
  console.log('Path atual:', window.location.pathname);
  console.log('Search params:', window.location.search);
  
  // 2. Verificar sessão
  console.log('\n2️⃣ SESSÃO ATUAL:');
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.log('❌ Erro na sessão:', sessionError.message);
  } else if (session) {
    console.log('✅ Sessão ativa:', {
      userId: session.user.id,
      email: session.user.email,
      hasMetadata: !!session.user.user_metadata,
      pendingCompany: session.user.user_metadata?.pending_company
    });
  } else {
    console.log('ℹ️ Nenhuma sessão ativa');
  }
  
  // 3. Verificar empresas do usuário
  console.log('\n3️⃣ EMPRESAS DO USUÁRIO:');
  if (session?.user) {
    try {
      const { data: userCompanies, error: companiesError } = await supabase
        .from('company_users')
        .select(`
          company_id,
          role,
          companies (*)
        `)
        .eq('user_id', session.user.id);
      
      if (companiesError) {
        console.log('❌ Erro ao buscar empresas:', companiesError.message);
      } else {
        console.log('✅ Empresas encontradas:', userCompanies?.length || 0);
        userCompanies?.forEach((uc, index) => {
          console.log(`  ${index + 1}. ${uc.companies?.name} (${uc.companies?.id}) - Role: ${uc.role}`);
        });
      }
    } catch (error) {
      console.log('❌ Erro ao verificar empresas:', error);
    }
  } else {
    console.log('ℹ️ Usuário não autenticado');
  }
  
  // 4. Verificar localStorage
  console.log('\n4️⃣ LOCALSTORAGE:');
  const currentTenantId = localStorage.getItem('currentTenantId');
  const supabaseToken = localStorage.getItem('supabase.auth.token');
  console.log('Tenant ID salvo:', currentTenantId);
  console.log('Token Supabase:', supabaseToken ? 'Presente' : 'Ausente');
  
  // 5. Verificar se estamos no callback
  console.log('\n5️⃣ VERIFICAÇÃO DE CALLBACK:');
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const error = urlParams.get('error');
  
  if (code) {
    console.log('✅ Código de autenticação encontrado:', code.substring(0, 20) + '...');
  } else if (error) {
    console.log('❌ Erro de autenticação:', error);
  } else {
    console.log('ℹ️ Não estamos em um callback de autenticação');
  }
  
  // 6. Determinar onde deveria ir
  console.log('\n6️⃣ ONDE DEVERIA IR:');
  if (!session) {
    console.log('📋 Usuário não autenticado → /auth');
  } else if (session.user.user_metadata?.pending_company) {
    console.log('📋 Usuário tem empresa pendente → /dashboard/setup');
  } else {
    // Verificar se tem empresa
    try {
      const { data: userCompanies } = await supabase
        .from('company_users')
        .select('company_id')
        .eq('user_id', session.user.id);
      
      if (userCompanies && userCompanies.length > 0) {
        console.log('📋 Usuário tem empresa → /dashboard');
      } else {
        console.log('📋 Usuário sem empresa → /dashboard/setup');
      }
    } catch (error) {
      console.log('📋 Erro ao verificar empresa → /dashboard/setup');
    }
  }
  
  // 7. Verificar contexto de tenant
  console.log('\n7️⃣ CONTEXTO DE TENANT:');
  try {
    if (session?.user) {
      const { data: userCompanies } = await supabase
        .from('company_users')
        .select('company_id, companies(*)')
        .eq('user_id', session.user.id);
      
      if (userCompanies && userCompanies.length > 0) {
        const companies = userCompanies.map(uc => uc.companies).filter(Boolean);
        console.log('✅ Tenants encontrados:', companies.length);
        companies.forEach((company, index) => {
          console.log(`  ${index + 1}. ${company.name} (${company.id}) - Status: ${company.status}`);
        });
      } else {
        console.log('ℹ️ Nenhum tenant encontrado');
      }
    }
  } catch (error) {
    console.log('❌ Erro ao verificar contexto de tenant:', error);
  }
  
  // 8. Recomendações
  console.log('\n8️⃣ RECOMENDAÇÕES:');
  if (code) {
    console.log('🔧 Ação: Aguardar processamento do AuthCallback');
  } else if (session?.user.user_metadata?.pending_company) {
    console.log('🔧 Ação: Verificar se empresa foi criada no AuthCallback');
  } else if (session && !session.user.user_metadata?.pending_company) {
    console.log('🔧 Ação: Verificar se usuário tem empresa associada');
  } else {
    console.log('🔧 Ação: Verificar se sessão foi criada corretamente');
  }
  
  return {
    hasSession: !!session,
    hasPendingCompany: !!session?.user.user_metadata?.pending_company,
    currentPath: window.location.pathname,
    hasCode: !!code,
    hasError: !!error
  };
};

export const testAuthCallback = async () => {
  console.log('🧪 TESTE: SIMULAÇÃO DE AUTH CALLBACK');
  console.log('====================================');
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    console.log('❌ Nenhuma sessão ativa para testar');
    return;
  }
  
  const pendingCompany = session.user.user_metadata?.pending_company;
  
  if (pendingCompany) {
    console.log('🏢 Simulando criação de empresa...');
    console.log('Dados da empresa:', pendingCompany);
    
    try {
      // Simular criação de empresa
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 14);
      
      const companyData = {
        name: pendingCompany.name,
        cnpj: `TEMP-${Date.now()}`,
        trade_name: pendingCompany.name,
        description: `Empresa criada automaticamente para ${pendingCompany.name}`,
        status: 'active',
        owner_id: session.user.id,
        plan: 'free',
        subscription_status: 'trialing',
        trial_ends_at: trialEndDate.toISOString(),
        settings: {
          employee_count: pendingCompany.employee_count,
          created_at: new Date().toISOString()
        }
      };
      
      console.log('📝 Dados para inserção:', companyData);
      
      const { data, error } = await supabase
        .from('companies')
        .insert(companyData)
        .select()
        .single();
        
      if (error) {
        console.log('❌ Erro ao criar empresa:', error);
      } else {
        console.log('✅ Empresa criada com sucesso:', data);
        
        // Limpar metadados
        await supabase.auth.updateUser({ data: { pending_company: null } });
        console.log('✅ Metadados limpos');
        
        // Refresh da sessão
        await supabase.auth.refreshSession();
        console.log('✅ Sessão atualizada');
        
        console.log('🎉 Processo concluído! Usuário deve ir para /dashboard/setup');
      }
    } catch (error) {
      console.log('❌ Erro no teste:', error);
    }
  } else {
    console.log('ℹ️ Usuário não tem empresa pendente');
  }
};
