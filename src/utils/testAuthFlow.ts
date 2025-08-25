// src/utils/testAuthFlow.ts
import { supabase } from '@/integrations/supabase/client';

export const runAuthDiagnostic = async () => {
  console.log('🔍 DIAGNÓSTICO DE AUTENTICAÇÃO');
  console.log('================================');
  
  // 1. Verificar configuração do Supabase
  console.log('\n1️⃣ CONFIGURAÇÃO DO SUPABASE:');
  console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Chave configurada:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  console.log('Site URL:', import.meta.env.VITE_SITE_URL);
  
  // 2. Verificar sessão atual
  console.log('\n2️⃣ SESSÃO ATUAL:');
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.log('❌ Erro ao obter sessão:', sessionError.message);
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
  
  // 3. Verificar URL de redirecionamento
  console.log('\n3️⃣ URL DE REDIRECIONAMENTO:');
  const currentPort = window.location.port || '3000';
  const redirectUrl = `http://localhost:${currentPort}/auth/callback`;
  console.log('URL atual:', window.location.href);
  console.log('Porta atual:', currentPort);
  console.log('Redirect URL:', redirectUrl);
  
  // 4. Verificar se estamos no callback
  console.log('\n4️⃣ VERIFICAÇÃO DE CALLBACK:');
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const error = urlParams.get('error');
  
  if (code) {
    console.log('✅ Código de autenticação encontrado');
  } else if (error) {
    console.log('❌ Erro de autenticação:', error);
  } else {
    console.log('ℹ️ Não estamos em um callback de autenticação');
  }
  
  // 5. Verificar contexto de tenant
  console.log('\n5️⃣ CONTEXTO DE TENANT:');
  try {
    // Simular verificação de empresas do usuário
    if (session?.user) {
      const { data: userCompanies, error: companiesError } = await supabase
        .from('company_users')
        .select('company_id, companies(*)')
        .eq('user_id', session.user.id);
      
      if (companiesError) {
        console.log('❌ Erro ao buscar empresas:', companiesError.message);
      } else {
        console.log('✅ Empresas encontradas:', userCompanies?.length || 0);
        userCompanies?.forEach((uc, index) => {
          console.log(`  ${index + 1}. ${uc.companies?.name} (${uc.companies?.id})`);
        });
      }
    } else {
      console.log('ℹ️ Usuário não autenticado, não é possível verificar empresas');
    }
  } catch (error) {
    console.log('❌ Erro ao verificar contexto de tenant:', error);
  }
  
  // 6. Verificar roteamento
  console.log('\n6️⃣ ROTEAMENTO:');
  console.log('Path atual:', window.location.pathname);
  console.log('Hash:', window.location.hash);
  console.log('Search:', window.location.search);
  
  // 7. Verificar localStorage
  console.log('\n7️⃣ LOCALSTORAGE:');
  const currentTenantId = localStorage.getItem('currentTenantId');
  const supabaseToken = localStorage.getItem('supabase.auth.token');
  console.log('Tenant ID salvo:', currentTenantId);
  console.log('Token Supabase:', supabaseToken ? 'Presente' : 'Ausente');
  
  // 8. Recomendações
  console.log('\n8️⃣ RECOMENDAÇÕES:');
  if (!session) {
    console.log('📋 Usuário não autenticado - deve ir para /auth');
  } else if (session.user.user_metadata?.pending_company) {
    console.log('📋 Usuário tem empresa pendente - deve ir para /dashboard/setup');
  } else {
    console.log('📋 Usuário autenticado sem empresa pendente - deve ir para /dashboard');
  }
  
  return {
    hasSession: !!session,
    hasPendingCompany: !!session?.user.user_metadata?.pending_company,
    currentPath: window.location.pathname,
    hasCode: !!code,
    hasError: !!error
  };
};

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
          if (company) {
            console.log(`  ${index + 1}. ${company.name} (${company.id}) - Status: ${company.status}`);
          }
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

export const testEmailConfirmation = async (email: string) => {
  console.log('📧 TESTE: CONFIRMAÇÃO DE EMAIL');
  console.log('==============================');
  
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_SITE_URL}/auth/callback`
      }
    });
    
    if (error) {
      console.log('❌ Erro ao reenviar email:', error.message);
    } else {
      console.log('✅ Email reenviado com sucesso');
      console.log('📧 Verifique sua caixa de entrada');
    }
  } catch (error) {
    console.log('❌ Erro inesperado:', error);
  }
};

export const testCompleteFlow = async () => {
  console.log('🧪 TESTE: FLUXO COMPLETO');
  console.log('========================');
  
  // 1. Verificar sessão atual
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    console.log('❌ Nenhuma sessão ativa');
    return;
  }
  
  console.log('✅ Sessão ativa:', session.user.email);
  
  // 2. Verificar empresas
  const { data: userCompanies } = await supabase
    .from('company_users')
    .select('company_id, companies(*)')
    .eq('user_id', session.user.id);
  
  console.log('🏢 Empresas encontradas:', userCompanies?.length || 0);
  
  // 3. Verificar metadados
  const pendingCompany = session.user.user_metadata?.pending_company;
  console.log('📋 Empresa pendente:', pendingCompany ? 'Sim' : 'Não');
  
  // 4. Determinar próximo passo
  if (pendingCompany) {
    console.log('🎯 Próximo passo: Criar empresa e ir para /dashboard/setup');
  } else if (userCompanies && userCompanies.length > 0) {
    console.log('🎯 Próximo passo: Ir para /dashboard');
  } else {
    console.log('🎯 Próximo passo: Ir para /dashboard/setup');
  }
};
