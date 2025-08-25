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
    currentPort: window.location.port,
    redirectUrl
  };
};

export const testEmailConfirmation = async (email: string) => {
  console.log('🧪 TESTE DE CONFIRMAÇÃO DE EMAIL');
  console.log('================================');
  
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `http://localhost:${window.location.port || '3000'}/auth/callback`
      }
    });
    
    if (error) {
      console.log('❌ Erro ao reenviar email:', error.message);
      return { success: false, error: error.message };
    } else {
      console.log('✅ Email reenviado com sucesso');
      return { success: true, data };
    }
  } catch (err) {
    console.log('❌ Erro inesperado:', err);
    return { success: false, error: err };
  }
};

export const testCompleteFlow = async () => {
  console.log('🚀 TESTE COMPLETO DO FLUXO');
  console.log('==========================');
  
  // 1. Verificar estado inicial
  console.log('\n1️⃣ Estado inicial:');
  const { data: { session } } = await supabase.auth.getSession();
  console.log('Sessão ativa:', !!session);
  
  // 2. Simular logout se necessário
  if (session) {
    console.log('\n2️⃣ Fazendo logout para testar fluxo completo...');
    await supabase.auth.signOut();
  }
  
  // 3. Verificar se logout funcionou
  const { data: { session: sessionAfterLogout } } = await supabase.auth.getSession();
  console.log('Sessão após logout:', !!sessionAfterLogout);
  
  // 4. Redirecionar para auth
  console.log('\n3️⃣ Redirecionando para /auth...');
  window.location.href = '/auth';
  
  return {
    success: true,
    message: 'Teste iniciado - verifique a página de auth'
  };
};
