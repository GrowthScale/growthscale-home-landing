#!/usr/bin/env node

const https = require('https');

console.log('🔍 VERIFICANDO CONFIGURAÇÃO DO SUPABASE...\n');

// Verificar variáveis de ambiente
const envVars = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
  VITE_SITE_URL: process.env.VITE_SITE_URL
};

console.log('📋 Variáveis de Ambiente:');
Object.entries(envVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  const displayValue = value ? `${value.substring(0, 20)}...` : 'Não configurada';
  console.log(`  ${status} ${key}: ${displayValue}`);
});

console.log('\n🔧 CONFIGURAÇÕES NECESSÁRIAS NO SUPABASE:');
console.log('\n1. 📧 Email Templates:');
console.log('   - Vá para Authentication > Email Templates');
console.log('   - Template "Confirm signup" deve ter:');
console.log('   - Link: {{ .ConfirmationURL }}');
console.log('   - Botão com texto branco');

console.log('\n2. 🔗 URL Configuration:');
console.log('   - Site URL: https://growthscale-home-landing.vercel.app');
console.log('   - Redirect URLs:');
console.log('     * https://growthscale-home-landing.vercel.app/auth/callback');
console.log('     * https://growthscale-home-landing.vercel.app/auth');

console.log('\n3. ⏰ Email Link Expiry:');
console.log('   - Authentication > Settings > Email Link Expiry: 24 horas');

console.log('\n4. 🔐 Authentication Settings:');
console.log('   - Enable email confirmations: ✅');
console.log('   - Enable email change confirmations: ✅');
console.log('   - Enable phone confirmations: ❌');

console.log('\n🚨 PROBLEMA IDENTIFICADO:');
console.log('O erro "both auth code and code verifier should be non-empty" indica que:');
console.log('1. O PKCE não está sendo gerenciado corretamente');
console.log('2. O code_verifier não está sendo armazenado/recuperado');
console.log('3. Possível problema na configuração do Supabase');

console.log('\n💡 SOLUÇÕES:');
console.log('1. ✅ Já corrigido: Configuração do storage no client.ts');
console.log('2. ✅ Já corrigido: AuthCallback usando getSession()');
console.log('3. 🔄 Verificar configuração do Supabase Dashboard');

console.log('\n🎯 PRÓXIMOS PASSOS:');
console.log('1. Verificar se as configurações do Supabase estão corretas');
console.log('2. Testar o fluxo novamente');
console.log('3. Se persistir, pode ser necessário resetar as configurações');

console.log('\n📞 SUPORTE:');
console.log('Se o problema persistir, verifique:');
console.log('- Logs do Supabase Dashboard');
console.log('- Configuração de RLS (Row Level Security)');
console.log('- Permissões da tabela companies');
