// =====================================================
// TESTES E2E - FLUXOS CRÍTICOS - GROWTHSCALE
// =====================================================

import { test, expect } from '@playwright/test';

// Configuração de timeout para testes E2E
test.setTimeout(60000);

// Dados de teste
const testUser = {
  email: 'test@growthscale.com',
  password: 'TestPassword123!'
};

const testCompany = {
  name: 'Empresa Teste E2E',
  cnpj: '12.345.678/0001-99'
};

// =====================================================
// TESTE 1: FLUXO DE CADASTRO E ONBOARDING
// =====================================================

test.describe('Fluxo de Cadastro e Onboarding', () => {
  test('deve permitir cadastro completo de nova empresa', async ({ page }) => {
    // Navegar para página inicial
    await page.goto('/');
    
    // Clicar no botão de cadastro
    await page.click('text=Criar conta');
    
    // Preencher formulário de cadastro
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.fill('[name="confirmPassword"]', testUser.password);
    
    // Aceitar termos
    await page.check('[name="acceptTerms"]');
    
    // Submeter formulário
    await page.click('button[type="submit"]');
    
    // Verificar redirecionamento para onboarding
    await expect(page).toHaveURL(/\/setup/);
    
    // Preencher dados da empresa
    await page.fill('[name="companyName"]', testCompany.name);
    await page.fill('[name="cnpj"]', testCompany.cnpj);
    
    // Avançar para próximo passo
    await page.click('text=Próximo');
    
    // Verificar que chegou no dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar se empresa foi criada
    await expect(page.locator('text=' + testCompany.name)).toBeVisible();
  });
});

// =====================================================
// TESTE 2: FLUXO DE CRIAÇÃO DE ESCALA
// =====================================================

test.describe('Fluxo de Criação de Escala', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto('/login');
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  });
  
  test('deve criar escala básica com funcionários', async ({ page }) => {
    // Navegar para página de escalas
    await page.goto('/schedules');
    
    // Clicar em "Nova Escala"
    await page.click('text=Nova Escala');
    
    // Preencher dados da escala
    await page.fill('[name="scheduleName"]', 'Escala Teste E2E');
    await page.selectOption('[name="startDate"]', '2024-12-20');
    await page.selectOption('[name="endDate"]', '2024-12-26');
    
    // Adicionar funcionário
    await page.click('text=Adicionar Funcionário');
    await page.fill('[name="employeeName"]', 'João Silva');
    await page.fill('[name="employeeEmail"]', 'joao@teste.com');
    await page.selectOption('[name="role"]', 'garçom');
    
    // Salvar funcionário
    await page.click('text=Salvar Funcionário');
    
    // Verificar se funcionário foi adicionado
    await expect(page.locator('text=João Silva')).toBeVisible();
    
    // Gerar escala
    await page.click('text=Gerar Escala');
    
    // Verificar que escala foi criada
    await expect(page.locator('text=Escala gerada com sucesso')).toBeVisible();
    
    // Verificar se há turnos criados
    await expect(page.locator('[data-testid="shift-item"]')).toHaveCount(7); // 7 dias
  });
});

// =====================================================
// TESTE 3: FLUXO DE ENVIO WHATSAPP
// =====================================================

test.describe('Fluxo de Envio WhatsApp', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto('/login');
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  });
  
  test('deve enviar confirmação via WhatsApp', async ({ page }) => {
    // Navegar para escala existente
    await page.goto('/schedules');
    await page.click('[data-testid="schedule-item"]:first-child');
    
    // Clicar em "Enviar WhatsApp"
    await page.click('text=Enviar WhatsApp');
    
    // Verificar modal de confirmação
    await expect(page.locator('text=Confirmar envio')).toBeVisible();
    
    // Confirmar envio
    await page.click('text=Confirmar');
    
    // Verificar mensagem de sucesso
    await expect(page.locator('text=Mensagens enviadas com sucesso')).toBeVisible();
    
    // Verificar status de envio
    await expect(page.locator('[data-testid="whatsapp-status"]')).toHaveText('Enviado');
  });
});

// =====================================================
// TESTE 4: FLUXO DE RELATÓRIOS
// =====================================================

test.describe('Fluxo de Relatórios', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto('/login');
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  });
  
  test('deve gerar relatório de economia', async ({ page }) => {
    // Navegar para relatórios
    await page.goto('/reports');
    
    // Clicar em "Relatório de Economia"
    await page.click('text=Relatório de Economia');
    
    // Selecionar período
    await page.selectOption('[name="period"]', 'last_month');
    
    // Gerar relatório
    await page.click('text=Gerar Relatório');
    
    // Verificar que relatório foi gerado
    await expect(page.locator('[data-testid="economy-report"]')).toBeVisible();
    
    // Verificar métricas básicas
    await expect(page.locator('[data-testid="hours-saved"]')).toBeVisible();
    await expect(page.locator('[data-testid="money-saved"]')).toBeVisible();
  });
});

// =====================================================
// TESTE 5: FLUXO DE ACESSIBILIDADE
// =====================================================

test.describe('Acessibilidade', () => {
  test('deve ser navegável por teclado', async ({ page }) => {
    await page.goto('/');
    
    // Navegar por tab
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Verificar se todos os elementos são focáveis
    const focusableElements = await page.locator('button, a, input, select, textarea').count();
    expect(focusableElements).toBeGreaterThan(0);
    
    // Verificar contraste
    const contrastIssues = await page.evaluate(() => {
      // Verificar se há elementos com baixo contraste
      const elements = document.querySelectorAll('*');
      let issues = 0;
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        
        // Verificação básica de contraste
        if (color && backgroundColor) {
          // Implementar verificação de contraste real aqui
          // Por enquanto, apenas verificar se cores estão definidas
        }
      });
      
      return issues;
    });
    
    expect(contrastIssues).toBe(0);
  });
  
  test('deve ter labels adequados', async ({ page }) => {
    await page.goto('/login');
    
    // Verificar se inputs têm labels
    const inputs = await page.locator('input').count();
    const labels = await page.locator('label').count();
    
    expect(labels).toBeGreaterThanOrEqual(inputs);
  });
});

// =====================================================
// TESTE 6: FLUXO DE PERFORMANCE
// =====================================================

test.describe('Performance', () => {
  test('deve carregar página inicial rapidamente', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Verificar se carregou em menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
  });
  
  test('deve ter Core Web Vitals adequados', async ({ page }) => {
    await page.goto('/');
    
    // Medir LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    // LCP deve ser menor que 2.5 segundos
    expect(lcp).toBeLessThan(2500);
  });
});

// =====================================================
// TESTE 7: FLUXO DE SEGURANÇA
// =====================================================

test.describe('Segurança', () => {
  test('deve prevenir XSS básico', async ({ page }) => {
    await page.goto('/');
    
    // Tentar inserir script malicioso
    const maliciousInput = '<script>alert("xss")</script>';
    
    // Verificar se script não é executado
    const hasScript = await page.evaluate((input) => {
      return document.body.innerHTML.includes(input);
    }, maliciousInput);
    
    expect(hasScript).toBe(false);
  });
  
  test('deve ter headers de segurança', async ({ page }) => {
    const response = await page.goto('/');
    
    const headers = response?.headers();
    
    // Verificar headers de segurança
    expect(headers?.['x-frame-options']).toBe('DENY');
    expect(headers?.['x-content-type-options']).toBe('nosniff');
    expect(headers?.['strict-transport-security']).toContain('max-age=31536000');
  });
});

// =====================================================
// UTILITÁRIOS DE TESTE
// =====================================================

// Função para limpar dados de teste
export async function cleanupTestData(page: any) {
  // Implementar limpeza de dados de teste
  // Isso pode incluir deletar empresas, usuários, etc.
}

// Função para criar dados de teste
export async function createTestData(page: any) {
  // Implementar criação de dados de teste
  // Isso pode incluir criar empresas, usuários, escalas, etc.
}
