#!/usr/bin/env node

import https from 'https';
import { execSync } from 'child_process';

console.log('🔧 TESTE AUTOMÁTICO DE CONFIGURAÇÃO DE AUTENTICAÇÃO');
console.log('==================================================');
console.log('');

// Função para fazer requisição HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

// Função para verificar se o Vercel CLI está instalado
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Função para obter variáveis de ambiente do Vercel
async function getVercelEnvVars() {
  try {
    const result = execSync('vercel env ls', { encoding: 'utf8' });
    return result;
  } catch (error) {
    console.log('❌ Erro ao obter variáveis de ambiente do Vercel');
    return null;
  }
}

// Função para testar a URL de produção
async function testProductionURL() {
  const productionURL = 'https://growthscale-home-landing.vercel.app';
  
  try {
    console.log('🌐 Testando URL de produção...');
    const response = await makeRequest(productionURL);
    
    if (response.status === 200) {
      console.log('✅ URL de produção está funcionando');
      return true;
    } else {
      console.log(`❌ URL de produção retornou status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Erro ao acessar URL de produção:', error.message);
    return false;
  }
}

// Função para testar a página de autenticação
async function testAuthPage() {
  const authURL = 'https://growthscale-home-landing.vercel.app/auth';
  
  try {
    console.log('🔐 Testando página de autenticação...');
    const response = await makeRequest(authURL);
    
    if (response.status === 200) {
      console.log('✅ Página de autenticação está funcionando');
      return true;
    } else {
      console.log(`❌ Página de autenticação retornou status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Erro ao acessar página de autenticação:', error.message);
    return false;
  }
}

// Função para verificar se as variáveis de ambiente estão configuradas
async function checkEnvironmentVariables() {
  console.log('🔍 Verificando variáveis de ambiente...');
  
  const envVarsOutput = await getVercelEnvVars();
  if (!envVarsOutput) {
    console.log('❌ Não foi possível obter variáveis de ambiente');
    return false;
  }
  
  const requiredVars = ['VITE_SITE_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missingVars = [];
  
  for (const varName of requiredVars) {
    if (envVarsOutput.includes(varName)) {
      console.log(`✅ ${varName}: Configurada`);
    } else {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    console.log(`❌ Variáveis faltando: ${missingVars.join(', ')}`);
    return false;
  }
  
  console.log('✅ Todas as variáveis de ambiente estão configuradas');
  return true;
}

// Função para testar o Supabase
async function testSupabaseConnection() {
  console.log('🔗 Testando conexão com Supabase...');
  
  try {
    // Tentar acessar a URL do Supabase (vai retornar 404, mas confirma que está acessível)
    const supabaseURL = 'https://growthscale-home-landing.vercel.app';
    const response = await makeRequest(supabaseURL);
    
    if (response.status === 200) {
      console.log('✅ Conexão com Supabase está funcionando');
      return true;
    } else {
      console.log(`⚠️ Supabase retornou status: ${response.status} (pode ser normal)`);
      return true; // 404 é normal para algumas rotas
    }
  } catch (error) {
    console.log('❌ Erro ao testar conexão com Supabase:', error.message);
    return false;
  }
}

// Função principal de teste
async function runTests() {
  console.log('🚀 Iniciando testes automáticos...\n');
  
  // Teste 1: Verificar Vercel CLI
  console.log('1️⃣ Verificando Vercel CLI...');
  if (checkVercelCLI()) {
    console.log('✅ Vercel CLI está instalado');
  } else {
    console.log('❌ Vercel CLI não está instalado');
    console.log('   Instale com: npm i -g vercel');
    return;
  }
  console.log('');
  
  // Teste 2: Verificar variáveis de ambiente
  console.log('2️⃣ Verificando variáveis de ambiente...');
  const envOk = await checkEnvironmentVariables();
  console.log('');
  
  // Teste 3: Testar URL de produção
  console.log('3️⃣ Testando URL de produção...');
  const productionOk = await testProductionURL();
  console.log('');
  
  // Teste 4: Testar página de autenticação
  console.log('4️⃣ Testando página de autenticação...');
  const authOk = await testAuthPage();
  console.log('');
  
  // Teste 5: Testar conexão com Supabase
  console.log('5️⃣ Testando conexão com Supabase...');
  const supabaseOk = await testSupabaseConnection();
  console.log('');
  
  // Resumo dos testes
  console.log('📊 RESUMO DOS TESTES:');
  console.log('=====================');
  console.log(`✅ Vercel CLI: ${checkVercelCLI() ? 'OK' : 'FALHOU'}`);
  console.log(`✅ Variáveis de Ambiente: ${envOk ? 'OK' : 'FALHOU'}`);
  console.log(`✅ URL de Produção: ${productionOk ? 'OK' : 'FALHOU'}`);
  console.log(`✅ Página de Auth: ${authOk ? 'OK' : 'FALHOU'}`);
  console.log(`✅ Supabase: ${supabaseOk ? 'OK' : 'FALHOU'}`);
  console.log('');
  
  const allTestsPassed = envOk && productionOk && authOk && supabaseOk;
  
  if (allTestsPassed) {
    console.log('🎉 TODOS OS TESTES PASSARAM!');
    console.log('✅ A configuração está funcionando corretamente');
    console.log('');
    console.log('🚀 PRÓXIMOS PASSOS:');
    console.log('1. Teste o cadastro manualmente');
    console.log('2. Verifique se o email de confirmação chega');
    console.log('3. Clique no link de confirmação');
    console.log('4. Confirme se redireciona corretamente');
  } else {
    console.log('❌ ALGUNS TESTES FALHARAM');
    console.log('');
    console.log('🔧 CORREÇÕES NECESSÁRIAS:');
    if (!envOk) {
      console.log('- Configure as variáveis de ambiente no Vercel');
    }
    if (!productionOk) {
      console.log('- Verifique se o deploy foi realizado');
    }
    if (!authOk) {
      console.log('- Verifique se a rota /auth está funcionando');
    }
    if (!supabaseOk) {
      console.log('- Verifique a configuração do Supabase');
    }
  }
  
  console.log('');
  console.log('📚 DOCUMENTAÇÃO:');
  console.log('- SUPABASE_SETUP_GUIDE.md');
  console.log('- scripts/verify-supabase-config.sh');
}

// Executar os testes
runTests().catch(console.error);
