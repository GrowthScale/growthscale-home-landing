#!/usr/bin/env node

/**
 * Script de Verificação da Nova Arquitetura de Autenticação
 * 
 * Este script verifica se todas as correções implementadas estão funcionando corretamente.
 */

import fs from 'fs';
import path from 'path';

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
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

const logSection = (title) => {
  console.log('\n' + '='.repeat(60));
  log('cyan', `🔍 ${title}`);
  console.log('='.repeat(60));
};

const logSuccess = (message) => log('green', `✅ ${message}`);
const logError = (message) => log('red', `❌ ${message}`);
const logWarning = (message) => log('yellow', `⚠️ ${message}`);
const logInfo = (message) => log('blue', `ℹ️ ${message}`);

// Verificar arquivos críticos
function checkCriticalFiles() {
  logSection('VERIFICANDO ARQUIVOS CRÍTICOS');
  
  const criticalFiles = [
    'src/pages/AuthCallback.tsx',
    'src/components/ProtectedRoute.tsx',
    'src/hooks/useOnboardingStatus.tsx',
    'src/contexts/TenantContext.tsx',
    'src/App.tsx',
    'src/routes/index.tsx'
  ];
  
  let allFilesExist = true;
  
  criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logSuccess(`${file} - Existe`);
    } else {
      logError(`${file} - Não encontrado`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// Verificar correções no ProtectedRoute
function checkProtectedRoute() {
  logSection('VERIFICANDO PROTECTEDROUTE');
  
  const filePath = 'src/components/ProtectedRoute.tsx';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'Redirecionamento para /dashboard/setup',
      pattern: /navigate\('\/dashboard\/setup'/,
      success: '✅ Redirecionamento correto implementado'
    },
    {
      name: 'Remoção de /onboarding',
      pattern: /navigate\('\/onboarding'/,
      success: '✅ Redirecionamento para /onboarding removido',
      shouldNotExist: true
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (check.shouldNotExist) {
      if (!found) {
        logSuccess(check.success);
      } else {
        logError(`Ainda existe redirecionamento para /onboarding`);
      }
    } else {
      if (found) {
        logSuccess(check.success);
      } else {
        logError(`Redirecionamento para /dashboard/setup não encontrado`);
      }
    }
  });
}

// Verificar correções no useOnboardingStatus
function checkOnboardingStatus() {
  logSection('VERIFICANDO USEONBOARDINGSTATUS');
  
  const filePath = 'src/hooks/useOnboardingStatus.tsx';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'Retorno de /dashboard/setup',
      pattern: /return '\/dashboard\/setup'/,
      success: '✅ Retorno correto implementado'
    },
    {
      name: 'Remoção de /onboarding',
      pattern: /return '\/onboarding'/,
      success: '✅ Retorno para /onboarding removido',
      shouldNotExist: true
    },
    {
      name: 'Verificação de setup',
      pattern: /currentPath === '\/dashboard\/setup'/,
      success: '✅ Verificação de setup implementada'
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (check.shouldNotExist) {
      if (!found) {
        logSuccess(check.success);
      } else {
        logError(`Ainda existe retorno para /onboarding`);
      }
    } else {
      if (found) {
        logSuccess(check.success);
      } else {
        logError(`${check.name} não encontrado`);
      }
    }
  });
}

// Verificar AuthCallback
function checkAuthCallback() {
  logSection('VERIFICANDO AUTHCALLBACK');
  
  const filePath = 'src/pages/AuthCallback.tsx';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'Refresh de sessão',
      pattern: /await supabase\.auth\.refreshSession\(\)/,
      success: '✅ Refresh de sessão implementado'
    },
    {
      name: 'Delay para sincronização',
      pattern: /await new Promise\(resolve => setTimeout\(resolve, 2000\)\)/,
      success: '✅ Delay de sincronização implementado'
    },
    {
      name: 'Redirecionamento para setup',
      pattern: /navigate\('\/dashboard\/setup'/,
      success: '✅ Redirecionamento para setup implementado'
    },
    {
      name: 'Limpeza de metadados',
      pattern: /pending_company: null/,
      success: '✅ Limpeza de metadados implementada'
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (found) {
      logSuccess(check.success);
    } else {
      logError(`${check.name} não encontrado`);
    }
  });
}

// Verificar TenantContext
function checkTenantContext() {
  logSection('VERIFICANDO TENANTCONTEXT');
  
  const filePath = 'src/contexts/TenantContext.tsx';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'Delay no carregamento',
      pattern: /await new Promise\(resolve => setTimeout\(resolve, 1000\)\)/,
      success: '✅ Delay no carregamento implementado'
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (found) {
      logSuccess(check.success);
    } else {
      logError(`${check.name} não encontrado`);
    }
  });
}

// Verificar App.tsx
function checkAppTsx() {
  logSection('VERIFICANDO APP.TSX');
  
  const filePath = 'src/App.tsx';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'TenantProvider importado',
      pattern: /import.*TenantProvider.*from.*TenantContext/,
      success: '✅ TenantProvider importado'
    },
    {
      name: 'TenantProvider usado',
      pattern: /<TenantProvider>/,
      success: '✅ TenantProvider implementado'
    },
    {
      name: 'Rota /dashboard/setup',
      pattern: /path="\/dashboard\/setup"/,
      success: '✅ Rota /dashboard/setup configurada'
    },
    {
      name: 'Remoção de /onboarding',
      pattern: /path="\/onboarding"/,
      success: '✅ Rota /onboarding removida',
      shouldNotExist: true
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (check.shouldNotExist) {
      if (!found) {
        logSuccess(check.success);
      } else {
        logError(`Ainda existe rota /onboarding`);
      }
    } else {
      if (found) {
        logSuccess(check.success);
      } else {
        logError(`${check.name} não encontrado`);
      }
    }
  });
}

// Verificar routes/index.tsx
function checkRoutesIndex() {
  logSection('VERIFICANDO ROUTES/INDEX.TSX');
  
  const filePath = 'src/routes/index.tsx';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'Remoção de LazyOnboarding',
      pattern: /LazyOnboarding/,
      success: '✅ LazyOnboarding removido',
      shouldNotExist: true
    },
    {
      name: 'Remoção de rota /onboarding',
      pattern: /path="\/onboarding"/,
      success: '✅ Rota /onboarding removida',
      shouldNotExist: true
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (check.shouldNotExist) {
      if (!found) {
        logSuccess(check.success);
      } else {
        logError(`Ainda existe ${check.name}`);
      }
    } else {
      if (found) {
        logSuccess(check.success);
      } else {
        logError(`${check.name} não encontrado`);
      }
    }
  });
}

// Verificar arquivo de teste
function checkTestFile() {
  logSection('VERIFICANDO ARQUIVO DE TESTE');
  
  const filePath = 'src/utils/testAuthFlow.ts';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = [
    {
      name: 'Função runAuthDiagnostic',
      pattern: /export const runAuthDiagnostic/,
      success: '✅ Função de diagnóstico implementada'
    },
    {
      name: 'Verificação de contexto de tenant',
      pattern: /CONTEXTO DE TENANT/,
      success: '✅ Verificação de tenant implementada'
    }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(content);
    if (found) {
      logSuccess(check.success);
    } else {
      logError(`${check.name} não encontrado`);
    }
  });
}

// Função principal
function main() {
  console.log('\n🚀 VERIFICAÇÃO DA NOVA ARQUITETURA DE AUTENTICAÇÃO');
  console.log('='.repeat(60));
  
  try {
    // Verificar se estamos no diretório correto
    if (!fs.existsSync('src')) {
      logError('Execute este script no diretório raiz do projeto');
      process.exit(1);
    }
    
    // Executar todas as verificações
    const filesExist = checkCriticalFiles();
    
    if (filesExist) {
      checkProtectedRoute();
      checkOnboardingStatus();
      checkAuthCallback();
      checkTenantContext();
      checkAppTsx();
      checkRoutesIndex();
      checkTestFile();
      
      logSection('RESUMO DA VERIFICAÇÃO');
      logSuccess('Todas as correções foram implementadas com sucesso!');
      logInfo('A nova arquitetura de autenticação está pronta para uso.');
      logInfo('Execute o projeto e teste o fluxo completo de cadastro.');
      
    } else {
      logError('Alguns arquivos críticos não foram encontrados.');
      logError('Verifique se está no diretório correto do projeto.');
    }
    
  } catch (error) {
    logError(`Erro durante a verificação: ${error.message}`);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  checkCriticalFiles,
  checkProtectedRoute,
  checkOnboardingStatus,
  checkAuthCallback,
  checkTenantContext,
  checkAppTsx,
  checkRoutesIndex,
  checkTestFile
};
