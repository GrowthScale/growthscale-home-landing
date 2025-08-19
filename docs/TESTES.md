# 🧪 **DOCUMENTAÇÃO DE TESTES - GROWTHSCALE**

## 📋 **VISÃO GERAL**

Este documento descreve a estratégia de testes implementada no sistema GrowthScale, incluindo testes unitários, e2e, performance e acessibilidade.

---

## 🎯 **ESTRATÉGIA DE TESTES**

### **1. Pirâmide de Testes**
```
    🔺 E2E Tests (10%)
   🔺🔺 Integration Tests (20%)
🔺🔺🔺 Unit Tests (70%)
```

### **2. Cobertura Alvo**
- **Unitários:** 80%+
- **Integração:** 60%+
- **E2E:** Fluxos críticos
- **Performance:** Core Web Vitals
- **Acessibilidade:** WCAG 2.1 AA

---

## 🧪 **TESTES UNITÁRIOS**

### **Configuração**
- **Framework:** Vitest
- **Environment:** jsdom
- **Coverage:** v8
- **Setup:** `src/test/setup.ts`

### **Estrutura**
```
src/
├── test/
│   ├── setup.ts                 # Configuração global
│   └── __tests__/
│       ├── auth.test.ts         # Testes de autenticação
│       └── components/
│           └── AccessibleButton.test.tsx
```

### **Comandos**
```bash
# Rodar todos os testes
npm run test

# Rodar com UI
npm run test:ui

# Rodar com coverage
npm run test -- --coverage
```

### **Exemplos de Testes**

#### **Teste de Validação**
```typescript
describe('AuthService', () => {
  it('should validate email format', async () => {
    const result = await authService.login('invalid-email', 'password123');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Email inválido');
  });
});
```

#### **Teste de Componente**
```typescript
describe('AccessibleButton', () => {
  it('renders correctly with default props', () => {
    render(<AccessibleButton>Click me</AccessibleButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 🌐 **TESTES E2E**

### **Configuração**
- **Framework:** Playwright
- **Browsers:** Chrome, Firefox, Safari, Mobile
- **Config:** `playwright.config.ts`

### **Estrutura**
```
src/tests/e2e/
├── critical-flows.spec.ts       # Fluxos críticos
├── auth-flows.spec.ts          # Fluxos de autenticação
├── schedule-flows.spec.ts      # Fluxos de escalas
└── accessibility.spec.ts       # Testes de acessibilidade
```

### **Comandos**
```bash
# Rodar todos os testes e2e
npm run e2e

# Rodar com interface gráfica
npm run e2e:headed

# Rodar em navegador específico
npx playwright test --project=chromium
```

### **Fluxos Críticos Testados**

#### **1. Cadastro e Onboarding**
```typescript
test('deve permitir cadastro completo de nova empresa', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Criar conta');
  // ... preenchimento do formulário
  await expect(page).toHaveURL(/\/dashboard/);
});
```

#### **2. Criação de Escalas**
```typescript
test('deve criar escala básica com funcionários', async ({ page }) => {
  await page.goto('/schedules');
  await page.click('text=Nova Escala');
  // ... criação da escala
  await expect(page.locator('[data-testid="shift-item"]')).toHaveCount(7);
});
```

#### **3. Envio WhatsApp**
```typescript
test('deve enviar confirmação via WhatsApp', async ({ page }) => {
  await page.goto('/schedules');
  await page.click('text=Enviar WhatsApp');
  await expect(page.locator('text=Mensagens enviadas com sucesso')).toBeVisible();
});
```

---

## ⚡ **TESTES DE PERFORMANCE**

### **Métricas Core Web Vitals**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### **Testes Automatizados**
```typescript
test('deve carregar página inicial rapidamente', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);
});
```

### **Lighthouse CI**
```yaml
- name: ⚡ Run Lighthouse tests
  run: |
    npx lighthouse http://localhost:5173 --output=json --output-path=./lighthouse-report.json
```

---

## ♿ **TESTES DE ACESSIBILIDADE**

### **Padrões WCAG 2.1 AA**
- **Contraste:** 4.5:1 mínimo
- **Navegação por teclado:** Completa
- **Screen readers:** Compatível
- **Labels:** Todos os inputs

### **Testes Automatizados**
```typescript
test('deve ser navegável por teclado', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});
```

### **Ferramentas**
- **axe-core:** Detecção automática
- **Playwright:** Simulação de usuários
- **Manual:** Auditoria regular

---

## 🔄 **CI/CD PIPELINE**

### **Workflow de Testes**
```yaml
name: 🧪 Testes & CI/CD
on: [push, pull_request, schedule]

jobs:
  unit-tests:      # Testes unitários
  e2e-tests:       # Testes e2e
  performance-tests: # Testes de performance
  accessibility-tests: # Testes de acessibilidade
  test-report:     # Relatório final
```

### **Execução**
- **Push/PR:** Todos os testes
- **Schedule:** Testes diários às 3h
- **Timeout:** 10-20 minutos por job
- **Retry:** 2 tentativas em CI

### **Relatórios**
- **Coverage:** Codecov
- **E2E:** Playwright HTML Report
- **Performance:** Lighthouse CI
- **Acessibilidade:** axe-core reports

---

## 🛠️ **FERRAMENTAS E DEPENDÊNCIAS**

### **Testes Unitários**
```json
{
  "vitest": "^3.2.4",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.7.0",
  "jsdom": "^24.0.0"
}
```

### **Testes E2E**
```json
{
  "@playwright/test": "^1.54.2"
}
```

### **Performance**
```json
{
  "lighthouse": "^11.6.0",
  "lighthouse-ci": "^0.4.0"
}
```

---

## 📊 **MÉTRICAS E RELATÓRIOS**

### **Cobertura de Código**
- **Linhas:** 80%+
- **Funções:** 85%+
- **Branches:** 75%+
- **Statements:** 80%+

### **Performance**
- **Build Time:** < 2 minutos
- **Test Time:** < 10 minutos
- **Bundle Size:** < 500KB gzipped

### **Qualidade**
- **Bugs por Release:** < 5
- **Test Flakiness:** < 2%
- **Acessibilidade Score:** 95%+

---

## 🚀 **PRÓXIMOS PASSOS**

### **ETAPA 4 - Performance & UX**
1. **Otimizar Bundle Size**
   - Code splitting
   - Tree shaking
   - Lazy loading

2. **Melhorar Performance**
   - Image optimization
   - Caching strategies
   - CDN implementation

3. **Acessibilidade Avançada**
   - ARIA labels
   - Keyboard navigation
   - Screen reader testing

4. **PWA Features**
   - Service worker
   - Offline support
   - Push notifications

---

## 📝 **CHECKLIST DE TESTES**

### **Antes do Deploy**
- [ ] Todos os testes unitários passando
- [ ] Testes e2e críticos passando
- [ ] Performance dentro dos limites
- [ ] Acessibilidade validada
- [ ] Coverage > 80%
- [ ] Build sem warnings

### **Pós-Deploy**
- [ ] Smoke tests passando
- [ ] Performance monitorada
- [ ] Error tracking ativo
- [ ] User feedback coletado

---

## 🔧 **TROUBLESHOOTING**

### **Problemas Comuns**

#### **Testes Unitários Falhando**
```bash
# Limpar cache
npm run test -- --clearCache

# Rodar com debug
npm run test -- --reporter=verbose
```

#### **E2E Tests Flaky**
```bash
# Rodar com retry
npx playwright test --retries=3

# Debug mode
npx playwright test --debug
```

#### **Performance Degradada**
```bash
# Analisar bundle
npm run build -- --analyze

# Lighthouse audit
npx lighthouse http://localhost:5173
```

---

## 📚 **REFERÊNCIAS**

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)
