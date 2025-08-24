// src/utils/testAuthFlow.ts
import { supabase } from '@/integrations/supabase/client';

export const testAuthFlow = async () => {
  console.log('🧪 TESTE COMPLETO DO FLUXO DE AUTENTICAÇÃO');
  console.log('==========================================');
  
  // 1. Verificar configuração
  console.log('1️⃣ CONFIGURAÇÃO:');
  console.log('   - URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('   - Chave configurada:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  console.log('   - Porta atual:', window.location.port);
  console.log('   - Hostname:', window.location.hostname);
  
  // 2. Verificar URLs de redirecionamento
  console.log('\n2️⃣ URLs DE REDIRECIONAMENTO:');
  const currentPort = window.location.port || '3000';
  const expectedRedirect = `http://localhost:${currentPort}/auth?verified=true`;
  console.log('   - Esperado:', expectedRedirect);
  
  // 3. Testar conexão
  console.log('\n3️⃣ TESTE DE CONEXÃO:');
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log('   ❌ Erro na conexão:', error.message);
    } else {
      console.log('   ✅ Conexão OK');
      console.log('   - Sessão atual:', data.session ? 'Ativa' : 'Nenhuma');
    }
  } catch (err) {
    console.log('   ❌ Erro ao conectar:', err);
  }
  
  // 4. Verificar localStorage
  console.log('\n4️⃣ LOCALSTORAGE:');
  const savedEmail = localStorage.getItem('pendingEmailVerification');
  const savedPassword = localStorage.getItem('pendingPasswordVerification');
  console.log('   - Email salvo:', savedEmail ? 'Sim' : 'Não');
  console.log('   - Senha salva:', savedPassword ? 'Sim' : 'Não');
  
  // 5. Verificar URL atual
  console.log('\n5️⃣ URL ATUAL:');
  console.log('   - URL completa:', window.location.href);
  console.log('   - Parâmetros:', window.location.search);
  
  console.log('\n==========================================');
  console.log('🧪 TESTE CONCLUÍDO');
  
  return {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    currentPort: window.location.port,
    expectedRedirect,
    hasSavedData: !!(savedEmail && savedPassword),
    currentUrl: window.location.href
  };
};

export const simulateEmailConfirmation = async (email: string, password: string) => {
  console.log('🧪 SIMULANDO CONFIRMAÇÃO DE EMAIL');
  console.log('==================================');
  
  try {
    // Tentar fazer login para simular confirmação
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) {
      console.log('❌ Erro ao simular confirmação:', error.message);
      return { success: false, error: error.message };
    }
    
    if (data.session) {
      console.log('✅ Confirmação simulada com sucesso!');
      // Fazer logout para limpar
      await supabase.auth.signOut();
      return { success: true, message: 'Usuário confirmado' };
    }
    
    return { success: false, error: 'Nenhuma sessão criada' };
    
  } catch (err) {
    console.log('❌ Erro inesperado:', err);
    return { success: false, error: err };
  }
};

export const clearAuthData = () => {
  console.log('🧹 LIMPANDO DADOS DE AUTENTICAÇÃO');
  localStorage.removeItem('pendingEmailVerification');
  localStorage.removeItem('pendingPasswordVerification');
  localStorage.removeItem('pendingVerificationTimestamp');
  console.log('✅ Dados limpos com sucesso!');
  return { success: true, message: 'Dados de autenticação limpos' };
};
