#!/usr/bin/env node

/**
 * Script para automatizar correções de linting
 * Executa correções automáticas e gera relatório
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔧 Iniciando correções automáticas de linting...\n');

// 1. Executar correções automáticas do ESLint
try {
  console.log('📝 Executando correções automáticas do ESLint...');
  execSync('npm run lint -- --fix', { stdio: 'inherit' });
  console.log('✅ Correções automáticas concluídas\n');
} catch (error) {
  console.log('⚠️  Algumas correções automáticas falharam\n');
}

// 2. Remover console.log statements em produção
console.log('🗑️  Removendo console.log statements...');

const removeConsoleLogs = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Remover console.log statements (mantendo apenas em desenvolvimento)
    content = content.replace(
      /console\.log\([^)]*\);?/g,
      (match) => {
        // Se já tem verificação de NODE_ENV, manter
        if (match.includes('NODE_ENV') || match.includes('process.env')) {
          return match;
        }
        // Adicionar verificação de desenvolvimento
        return `if (process.env.NODE_ENV === 'development') { ${match} }`;
      }
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// 3. Lista de arquivos para processar
const filesToProcess = [
  'src/components/employees/EmployeeTable.tsx',
  'src/components/layouts/MainLayout.tsx',
  'src/contexts/AuthContext.tsx',
  'src/hooks/usePWA.tsx',
  'src/lib/ai.ts',
  'src/lib/analytics.ts',
  'src/lib/apm.ts',
  'src/lib/auditLog.ts',
  'src/lib/auth.ts',
  'src/lib/enterprise.ts',
  'src/lib/exportUtils.ts',
  'src/lib/gamification.ts',
  'src/lib/healthCheck.ts',
  'src/lib/logger.ts',
  'src/lib/monitoring.ts',
  'src/lib/rateLimit.ts',
  'src/lib/rbac.ts',
  'src/services/accountService.ts',
  'src/services/api.ts',
  'src/services/userProfileService.ts',
  'src/pages/NotFound.tsx',
  'src/pages/Integrations.tsx',
  'src/pages/PricingSection.tsx',
  'src/pages/CompanySettings.tsx',
  'src/pages/Compliance.tsx',
  'src/pages/Contact.tsx',
  'src/pages/DraftReviewPage.tsx',
  'src/pages/Employees.tsx',
  'src/pages/FAQ.tsx',
  'src/pages/Index.tsx',
  'src/pages/ScheduleDraft.tsx',
  'src/pages/Schedules.tsx',
  'src/pages/Settings.tsx',
  'src/pages/Templates.tsx',
  'src/components/error-boundaries/FeatureErrorBoundary.tsx',
  'src/components/features/CLTSources.tsx',
  'src/components/features/CLTSuggestions.tsx',
  'src/components/schedules/ScheduleEditor.tsx',
  'src/components/settings/DataManagement.tsx',
  'src/components/ui/error-boundary.tsx',
  'src/components/wizard/SetupWizard.tsx',
  'src/components/wizard/steps/CompanyStep.tsx',
  'src/hooks/useAdvancedAnalytics.tsx',
  'src/hooks/useAdvancedCaching.tsx',
  'src/hooks/useAnalytics.tsx',
  'src/hooks/useEdgeAnalytics.tsx',
  'src/hooks/useForm.ts',
  'src/hooks/useNotifications.tsx',
  'src/hooks/usePerformance.tsx',
  'src/hooks/useSecurity.tsx',
  'src/test/__tests__/auth.test.ts',
  'src/tests/e2e/critical-flows.spec.ts',
  'supabase/functions/clt-assistant/index.ts',
  'supabase/functions/delete-user-account/index.ts',
  'supabase/functions/generate-weekly-drafts/index.ts',
  'supabase/functions/send-schedule-notification/index.ts',
  'supabase/functions/send-weekly-report/index.ts',
  'supabase/functions/suggest-schedule/index.ts',
  'supabase/functions/validate-schedule/index.ts',
  'supabase/seed.js'
];

let processedFiles = 0;
let modifiedFiles = 0;

filesToProcess.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    processedFiles++;
    if (removeConsoleLogs(filePath)) {
      modifiedFiles++;
      console.log(`✅ Processado: ${filePath}`);
    }
  }
});

console.log(`\n📊 Resumo:`);
console.log(`   - Arquivos processados: ${processedFiles}`);
console.log(`   - Arquivos modificados: ${modifiedFiles}`);

// 4. Executar lint novamente para verificar melhorias
console.log('\n🔍 Executando verificação final...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
} catch (error) {
  console.log('\n⚠️  Ainda existem problemas de linting que precisam de correção manual');
}

console.log('\n✨ Processo de correção concluído!');
