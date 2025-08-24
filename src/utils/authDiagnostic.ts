// src/utils/authDiagnostic.ts
import { supabase } from '@/integrations/supabase/client';

export const runAuthDiagnostic = async () => {
  console.log('🔍 INICIANDO DIAGNÓSTICO DE AUTENTICAÇÃO');
  console.log('==========================================');
  
  // 1. Verificar configuração do ambiente
  console.log('1️⃣ CONFIGURAÇÃO DO AMBIENTE:');
  console.log('   - VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('   - VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Não configurada');
  console.log('   - Porta atual:', window.location.port);
  console.log('   - Hostname:', window.location.hostname);
  
  // 2. Verificar configuração do cliente Supabase
  console.log('\n2️⃣ CONFIGURAÇÃO DO CLIENTE SUPABASE:');
  console.log('   - URL do cliente:', supabase.supabaseUrl);
  console.log('   - Chave anônima:', supabase.supabaseKey ? '✅ Configurada' : '❌ Não configurada');
  
  // 3. Testar conexão com Supabase
  console.log('\n3️⃣ TESTE DE CONEXÃO:');
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log('   ❌ Erro na conexão:', error.message);
    } else {
      console.log('   ✅ Conexão bem-sucedida');
      console.log('   - Sessão atual:', data.session ? 'Ativa' : 'Nenhuma');
    }
  } catch (err) {
    console.log('   ❌ Erro ao testar conexão:', err);
  }
  
  // 4. Verificar URLs de redirecionamento
  console.log('\n4️⃣ URLs DE REDIRECIONAMENTO:');
  const currentPort = window.location.port || '3000';
  const redirectUrl = `http://localhost:${currentPort}/auth/callback`;
  console.log('   - URL atual:', redirectUrl);
  console.log('   - Origin:', window.location.origin);
  
  console.log('\n==========================================');
  console.log('🔍 DIAGNÓSTICO CONCLUÍDO');
  
  return {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
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
