#!/usr/bin/env node

import https from 'https';
import { execSync } from 'child_process';

console.log('🔍 DIAGNÓSTICO DO ERRO DE AUTENTICAÇÃO');
console.log('=======================================');
console.log('');

console.log('🚨 PROBLEMA IDENTIFICADO:');
console.log('Link de confirmação está expirando ou retornando erro "access_denied"');
console.log('');

console.log('🔧 POSSÍVEIS CAUSAS:');
console.log('1. Configuração incorreta do Supabase');
console.log('2. URLs de redirecionamento mal configuradas');
console.log('3. Tempo de expiração muito curto');
console.log('4. Problema na configuração do email template');
console.log('');

console.log('📋 VERIFICAÇÕES NECESSÁRIAS:');
console.log('============================');
console.log('');

// Função para fazer requisições HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

// Verificar configuração do Supabase
async function checkSupabaseConfig() {
  console.log('1️⃣ CONFIGURAÇÃO DO SUPABASE:');
  console.log('===========================');
  console.log('');
  console.log('✅ Verificar no Dashboard do Supabase:');
  console.log('   - Authentication > URL Configuration');
  console.log('   - Site URL: https://growthscale-home-landing.vercel.app');
  console.log('   - Redirect URLs:');
  console.log('     * https://growthscale-home-landing.vercel.app/auth/callback');
  console.log('     * https://growthscale-home-landing.vercel.app/auth');
  console.log('');
  console.log('✅ Verificar Authentication > Settings:');
  console.log('   - Email Link Expiry: Deve ser 24 horas ou mais');
  console.log('   - Enable email confirmations: Deve estar ativado');
  console.log('');
  console.log('✅ Verificar Authentication > Email Templates:');
  console.log('   - Template "Confirm signup" deve usar {{ .ConfirmationURL }}');
  console.log('   - Verificar se o link está correto no template');
  console.log('');
}

// Verificar variáveis de ambiente
async function checkEnvironmentVariables() {
  console.log('2️⃣ VARIÁVEIS DE AMBIENTE:');
  console.log('=========================');
  
  try {
    const envVarsOutput = execSync('vercel env ls', { encoding: 'utf8' });
    
    const requiredVars = ['VITE_SITE_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    
    for (const varName of requiredVars) {
      if (envVarsOutput.includes(varName)) {
        console.log(`✅ ${varName}: Configurada`);
      } else {
        console.log(`❌ ${varName}: Não encontrada`);
      }
    }
    
    console.log('');
  } catch (error) {
    console.log('❌ Erro ao verificar variáveis de ambiente:', error.message);
  }
}

// Testar URLs de redirecionamento
async function testRedirectURLs() {
  console.log('3️⃣ TESTE DE URLs DE REDIRECIONAMENTO:');
  console.log('=====================================');
  
  const urls = [
    'https://growthscale-home-landing.vercel.app/auth/callback',
    'https://growthscale-home-landing.vercel.app/auth'
  ];
  
  for (const url of urls) {
    try {
      const response = await makeRequest(url);
      if (response.status === 200) {
        console.log(`✅ ${url}`);
      } else {
        console.log(`⚠️ ${url} (status: ${response.status})`);
      }
    } catch (error) {
      console.log(`❌ ${url} (erro: ${error.message})`);
    }
  }
  
  console.log('');
}

// Verificar configuração do AuthCallback
function checkAuthCallbackConfig() {
  console.log('4️⃣ CONFIGURAÇÃO DO AUTH CALLBACK:');
  console.log('==================================');
  console.log('');
  console.log('✅ Verificar src/pages/AuthCallback.tsx:');
  console.log('   - Função exchangeCodeForSession implementada');
  console.log('   - Tratamento de erro adequado');
  console.log('   - Redirecionamento correto');
  console.log('');
  console.log('✅ Verificar src/contexts/AuthContext.tsx:');
  console.log('   - URL de redirecionamento correta');
  console.log('   - Configuração do emailRedirectTo');
  console.log('');
}

// Soluções recomendadas
function provideSolutions() {
  console.log('🛠️ SOLUÇÕES RECOMENDADAS:');
  console.log('==========================');
  console.log('');
  console.log('1️⃣ CORREÇÃO IMEDIATA:');
  console.log('   - Aplicar template de email corrigido');
  console.log('   - Verificar configuração do Supabase');
  console.log('   - Testar com novo cadastro');
  console.log('');
  console.log('2️⃣ CONFIGURAÇÃO DO SUPABASE:');
  console.log('   - Authentication > URL Configuration');
  console.log('   - Site URL: https://growthscale-home-landing.vercel.app');
  console.log('   - Redirect URLs:');
  console.log('     * https://growthscale-home-landing.vercel.app/auth/callback');
  console.log('     * https://growthscale-home-landing.vercel.app/auth');
  console.log('');
  console.log('3️⃣ CONFIGURAÇÃO DE EXPIRAÇÃO:');
  console.log('   - Authentication > Settings');
  console.log('   - Email Link Expiry: 24 horas');
  console.log('');
  console.log('4️⃣ TEMPLATE DE EMAIL:');
  console.log('   - Usar template corrigido com alto contraste');
  console.log('   - Verificar se {{ .ConfirmationURL }} está correto');
  console.log('');
}

// Função principal
async function runDiagnostic() {
  console.log('🚀 INICIANDO DIAGNÓSTICO...\n');
  
  await checkSupabaseConfig();
  await checkEnvironmentVariables();
  await testRedirectURLs();
  checkAuthCallbackConfig();
  provideSolutions();
  
  console.log('📊 RESUMO DO DIAGNÓSTICO:');
  console.log('==========================');
  console.log('');
  console.log('🎯 PRÓXIMOS PASSOS:');
  console.log('1. Aplicar template de email corrigido');
  console.log('2. Verificar configuração do Supabase');
  console.log('3. Testar com novo cadastro');
  console.log('4. Verificar logs no console do navegador');
  console.log('');
  console.log('📚 DOCUMENTAÇÃO:');
  console.log('- docs/EMAIL_TEMPLATE_FIXED.md');
  console.log('- SUPABASE_SETUP_GUIDE.md');
  console.log('');
  console.log('🔍 SE O PROBLEMA PERSISTIR:');
  console.log('- Verificar logs detalhados no console');
  console.log('- Testar com email diferente');
  console.log('- Verificar configuração do Vercel');
  console.log('');
  console.log('🎉 DIAGNÓSTICO CONCLUÍDO!');
}

// Executar diagnóstico
runDiagnostic().catch(console.error);
