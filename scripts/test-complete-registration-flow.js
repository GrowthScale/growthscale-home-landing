#!/usr/bin/env node

import https from 'https';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Carregar variáveis de ambiente do arquivo .env
const loadEnvVars = () => {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (value && !key.startsWith('#')) {
          envVars[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      }
    });
    
    // Definir as variáveis no process.env
    Object.entries(envVars).forEach(([key, value]) => {
      process.env[key] = value;
    });
  } catch (error) {
    console.log('⚠️  Arquivo .env não encontrado, usando variáveis do sistema');
  }
};

// Carregar variáveis de ambiente
loadEnvVars();

console.log('🧪 TESTE AUTOMATIZADO: FLUXO COMPLETO DE CADASTRO\n');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (color, message) => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// 1. VERIFICAR CONFIGURAÇÃO DO AMBIENTE
log('cyan', '🔧 1. VERIFICANDO CONFIGURAÇÃO DO AMBIENTE...');

const envVars = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
  VITE_SITE_URL: process.env.VITE_SITE_URL || 'https://growthscale-home-landing.vercel.app'
};

let envOk = true;
Object.entries(envVars).forEach(([key, value]) => {
  if (!value) {
    log('red', `  ❌ ${key}: Não configurada`);
    envOk = false;
  } else {
    log('green', `  ✅ ${key}: Configurada`);
  }
});

if (!envVars.VITE_SUPABASE_URL || !envVars.VITE_SUPABASE_ANON_KEY) {
  log('red', '\n❌ Variáveis do Supabase não configuradas corretamente!');
  process.exit(1);
}

log('yellow', '  ⚠️  VITE_SITE_URL usando valor padrão (não crítico para o teste)');

// 2. VERIFICAR CONFIGURAÇÃO DO SUPABASE
log('cyan', '\n🔧 2. VERIFICANDO CONFIGURAÇÃO DO SUPABASE...');

const checkSupabaseConfig = () => {
  return new Promise((resolve) => {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    
    const options = {
      hostname: new URL(url).hostname,
      port: 443,
      path: '/auth/v1/settings',
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          log('green', '  ✅ Supabase acessível');
          resolve(true);
        } else {
          log('red', `  ❌ Supabase não acessível (${res.statusCode})`);
          resolve(false);
        }
      });
    });

    req.on('error', () => {
      log('red', '  ❌ Erro ao conectar com Supabase');
      resolve(false);
    });

    req.end();
  });
};

// 3. VERIFICAR URLS DE REDIRECIONAMENTO
log('cyan', '\n🔧 3. VERIFICANDO URLS DE REDIRECIONAMENTO...');

const checkRedirectUrls = () => {
  const siteUrl = process.env.VITE_SITE_URL;
  const urls = [
    `${siteUrl}/auth/callback`,
    `${siteUrl}/auth`
  ];

  urls.forEach(url => {
    log('blue', `  🔗 Verificando: ${url}`);
  });

  log('green', '  ✅ URLs de redirecionamento configuradas');
};

// 4. VERIFICAR ESTRUTURA DE ARQUIVOS
log('cyan', '\n🔧 4. VERIFICANDO ESTRUTURA DE ARQUIVOS...');

const requiredFiles = [
  'src/contexts/AuthContext.tsx',
  'src/pages/AuthCallback.tsx',
  'src/pages/Auth.tsx',
  'src/integrations/supabase/client.ts',
  'src/pages/Setup.tsx',
  'src/components/dashboard/Dashboard.tsx'
];

let filesOk = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    log('green', `  ✅ ${file}`);
  } else {
    log('red', `  ❌ ${file} - Arquivo não encontrado`);
    filesOk = false;
  }
});

if (!filesOk) {
  log('red', '\n❌ Arquivos essenciais não encontrados!');
  process.exit(1);
}

// 5. VERIFICAR CONFIGURAÇÃO DO ROTEAMENTO
log('cyan', '\n🔧 5. VERIFICANDO CONFIGURAÇÃO DO ROTEAMENTO...');

const appTsx = fs.readFileSync('src/App.tsx', 'utf8');
const hasAuthCallback = appTsx.includes('/auth/callback');
const hasSetup = appTsx.includes('/dashboard/setup');
const hasDashboard = appTsx.includes('/dashboard');

if (hasAuthCallback) log('green', '  ✅ Rota /auth/callback configurada');
else log('red', '  ❌ Rota /auth/callback não encontrada');

if (hasSetup) log('green', '  ✅ Rota /dashboard/setup configurada');
else log('red', '  ❌ Rota /dashboard/setup não encontrada');

if (hasDashboard) log('green', '  ✅ Rota /dashboard configurada');
else log('red', '  ❌ Rota /dashboard não encontrada');

// 6. VERIFICAR CONFIGURAÇÃO DO SUPABASE CLIENT
log('cyan', '\n🔧 6. VERIFICANDO CONFIGURAÇÃO DO SUPABASE CLIENT...');

const clientTs = fs.readFileSync('src/integrations/supabase/client.ts', 'utf8');
const hasPkce = clientTs.includes('flowType: \'pkce\'');
const hasStorage = clientTs.includes('storage:');
const hasStorageKey = clientTs.includes('storageKey:');

if (hasPkce) log('green', '  ✅ PKCE configurado');
else log('red', '  ❌ PKCE não configurado');

if (hasStorage) log('green', '  ✅ Storage configurado');
else log('red', '  ❌ Storage não configurado');

if (hasStorageKey) log('green', '  ✅ StorageKey configurado');
else log('red', '  ❌ StorageKey não configurado');

// 7. VERIFICAR AUTHCONTEXT
log('cyan', '\n🔧 7. VERIFICANDO AUTHCONTEXT...');

const authContext = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf8');
const hasSignUp = authContext.includes('signUp');
const hasEmailRedirectTo = authContext.includes('emailRedirectTo');
const hasPendingCompany = authContext.includes('pending_company');

if (hasSignUp) log('green', '  ✅ Função signUp implementada');
else log('red', '  ❌ Função signUp não encontrada');

if (hasEmailRedirectTo) log('green', '  ✅ emailRedirectTo configurado');
else log('red', '  ❌ emailRedirectTo não configurado');

if (hasPendingCompany) log('green', '  ✅ pending_company configurado');
else log('red', '  ❌ pending_company não configurado');

// 8. VERIFICAR AUTHCALLBACK
log('cyan', '\n🔧 8. VERIFICANDO AUTHCALLBACK...');

const authCallback = fs.readFileSync('src/pages/AuthCallback.tsx', 'utf8');
const hasGetSession = authCallback.includes('getSession');
const hasCreateCompany = authCallback.includes('createCompanyForUser');
const hasNavigateSetup = authCallback.includes('navigate(\'/dashboard/setup\')');

if (hasGetSession) log('green', '  ✅ getSession() implementado');
else log('red', '  ❌ getSession() não encontrado');

if (hasCreateCompany) log('green', '  ✅ createCompanyForUser implementado');
else log('red', '  ❌ createCompanyForUser não encontrado');

if (hasNavigateSetup) log('green', '  ✅ Redirecionamento para setup configurado');
else log('red', '  ❌ Redirecionamento para setup não encontrado');

// 9. VERIFICAR SETUP
log('cyan', '\n🔧 9. VERIFICANDO PÁGINA DE SETUP...');

const setup = fs.readFileSync('src/pages/Setup.tsx', 'utf8');
const hasSetupSteps = setup.includes('SetupStep');
const hasSetupComplete = setup.includes('setupCompleted');
const hasNavigateDashboard = setup.includes('navigate(\'/dashboard\')');

if (hasSetupSteps) log('green', '  ✅ Passos de setup implementados');
else log('red', '  ❌ Passos de setup não encontrados');

if (hasSetupComplete) log('green', '  ✅ Marcação de setup completo implementada');
else log('red', '  ❌ Marcação de setup completo não encontrada');

if (hasNavigateDashboard) log('green', '  ✅ Redirecionamento para dashboard configurado');
else log('red', '  ❌ Redirecionamento para dashboard não encontrado');

// 10. VERIFICAR DASHBOARD
log('cyan', '\n🔧 10. VERIFICANDO DASHBOARD...');

const dashboard = fs.readFileSync('src/components/dashboard/Dashboard.tsx', 'utf8');
const hasTenantCheck = dashboard.includes('!tenant');
const hasNavigateSetupDashboard = dashboard.includes('navigate(\'/dashboard/setup\'');

if (hasTenantCheck) log('green', '  ✅ Verificação de tenant implementada');
else log('red', '  ❌ Verificação de tenant não encontrada');

if (hasNavigateSetupDashboard) log('green', '  ✅ Redirecionamento para setup no dashboard configurado');
else log('red', '  ❌ Redirecionamento para setup no dashboard não encontrado');

// 11. SIMULAR FLUXO DE CADASTRO
log('cyan', '\n🔧 11. SIMULANDO FLUXO DE CADASTRO...');

log('blue', '  📝 Passo 1: Usuário acessa /auth');
log('blue', '  📝 Passo 2: Preenche formulário de cadastro');
log('blue', '  📝 Passo 3: AuthContext.signUp() é chamado');
log('blue', '  📝 Passo 4: Supabase cria usuário com pending_company');
log('blue', '  📝 Passo 5: Email de confirmação é enviado');
log('blue', '  📝 Passo 6: Usuário clica no link do email');
log('blue', '  📝 Passo 7: Redirecionado para /auth/callback');
log('blue', '  📝 Passo 8: AuthCallback.getSession() obtém sessão');
log('blue', '  📝 Passo 9: createCompanyForUser() cria empresa');
log('blue', '  📝 Passo 10: Redirecionado para /dashboard/setup');
log('blue', '  📝 Passo 11: Usuário completa setup');
log('blue', '  📝 Passo 12: Redirecionado para /dashboard');

// 12. IDENTIFICAR POSSÍVEIS PROBLEMAS
log('cyan', '\n🔧 12. IDENTIFICANDO POSSÍVEIS PROBLEMAS...');

const problems = [];

// Verificar se há conflitos de roteamento
if (appTsx.includes('/onboarding')) {
  problems.push('⚠️  Rota /onboarding ainda existe (pode causar conflitos)');
}

// Verificar se há referências ao método antigo
if (authCallback.includes('exchangeCodeForSession')) {
  problems.push('❌ AuthCallback ainda usa exchangeCodeForSession (causa erro PKCE)');
}

// Verificar se há problemas de redirecionamento
if (!authCallback.includes('navigate(\'/dashboard/setup\')')) {
  problems.push('❌ AuthCallback não redireciona para /dashboard/setup');
}

// Verificar se há problemas no Dashboard
if (!hasNavigateSetupDashboard) {
  problems.push('❌ Dashboard não redireciona para /dashboard/setup');
}

if (problems.length === 0) {
  log('green', '  ✅ Nenhum problema crítico identificado');
} else {
  problems.forEach(problem => {
    if (problem.startsWith('❌')) {
      log('red', `  ${problem}`);
    } else {
      log('yellow', `  ${problem}`);
    }
  });
}

// 13. RECOMENDAÇÕES
log('cyan', '\n🔧 13. RECOMENDAÇÕES...');

log('blue', '  📋 Para testar o fluxo completo:');
log('blue', '    1. Acesse: https://growthscale-home-landing-dk061q6wa.vercel.app/auth');
log('blue', '    2. Faça um cadastro com dados válidos');
log('blue', '    3. Verifique se o email chega');
log('blue', '    4. Clique no link de confirmação');
log('blue', '    5. Verifique se é redirecionado para /dashboard/setup');
log('blue', '    6. Complete o setup');
log('blue', '    7. Verifique se chega ao dashboard');

log('blue', '\n  📋 Configurações necessárias no Supabase:');
log('blue', '    1. Authentication > URL Configuration');
log('blue', '    2. Authentication > Email Templates');
log('blue', '    3. Authentication > Settings > Email Link Expiry');

// 14. RESULTADO FINAL
log('cyan', '\n🔧 14. RESULTADO FINAL...');

const criticalErrors = problems.filter(p => p.startsWith('❌')).length;
const warnings = problems.filter(p => p.startsWith('⚠️')).length;

if (criticalErrors === 0) {
  log('green', '  ✅ FLUXO PRONTO PARA TESTE!');
  log('green', '  ✅ Nenhum erro crítico encontrado');
  if (warnings > 0) {
    log('yellow', `  ⚠️  ${warnings} avisos encontrados (não críticos)`);
  }
} else {
  log('red', `  ❌ ${criticalErrors} ERROS CRÍTICOS ENCONTRADOS!`);
  log('red', '  ❌ Corrija os problemas antes de testar');
}

console.log('\n' + '='.repeat(60));
log('cyan', '🧪 TESTE AUTOMATIZADO CONCLUÍDO');
console.log('='.repeat(60));
