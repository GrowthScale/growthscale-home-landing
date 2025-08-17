// Script de teste para validar cadastro
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://doldfscfnivsrhqopecu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbGRmc2Nmbml2c3JocW9wZWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTI1NzAsImV4cCI6MjA3MDA2ODU3MH0.KqOpLR5f-57BHVsjzrGT-FR7zAhoRYXqM7auRoiODWc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSignUp() {
  console.log('🧪 Testando cadastro...');
  
  const testEmail = `teste-${Date.now()}@growthscale.com`;
  const testPassword = 'Teste123!';
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'João Silva',
          company_name: 'Empresa Teste',
          company_email: 'contato@empresateste.com',
          employee_count: 50,
        },
      },
    });

    if (error) {
      console.error('❌ Erro no cadastro:', error.message);
      return false;
    }

    console.log('✅ Cadastro realizado com sucesso!');
    console.log('📧 Email:', testEmail);
    console.log('👤 User ID:', data.user?.id);
    console.log('📋 Metadata:', data.user?.user_metadata);
    
    return { success: true, email: testEmail };
  } catch (error) {
    console.error('❌ Erro:', error.message);
    return { success: false, email: testEmail };
  }
}

async function testSignIn(email, password) {
  console.log('🔐 Testando login...');
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Erro no login:', error.message);
      return false;
    }

    console.log('✅ Login realizado com sucesso!');
    console.log('👤 User:', data.user?.email);
    console.log('🔑 Session:', !!data.session);
    
    return true;
  } catch (error) {
    console.error('❌ Erro:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Iniciando testes de autenticação...\n');
  
  // Teste 1: Cadastro
  const signUpResult = await testSignUp();
  
  if (signUpResult.success) {
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Teste 2: Login (com email criado)
    await testSignIn(signUpResult.email, 'Teste123!');
  }
  
  console.log('\n✅ Testes concluídos!');
}

// Executar testes
runTests();
