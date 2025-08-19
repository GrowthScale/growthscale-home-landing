# 📋 **BACKLOG DE CORREÇÕES - GROWTHSCALE**

## 🎯 **METODOLOGIA MoSCoW**

**MUST HAVE** - Crítico para funcionamento  
**SHOULD HAVE** - Importante para qualidade  
**COULD HAVE** - Melhoria desejável  
**WON'T HAVE** - Não priorizado neste ciclo  

---

## 🚨 **MUST HAVE (Crítico - Imediato)**

### **M1 - Segurança TypeScript**
- **Tarefa:** Habilitar TypeScript strict mode
- **Esforço:** M (4h)
- **Owner:** Arquiteto-Chefe
- **Evidência:** `tsconfig.json` - configuração não estrita
- **Ação:** 
  ```json
  {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
  ```

### **M2 - Setup Wizard Funcional**
- **Tarefa:** Implementar salvamento no banco de dados
- **Esforço:** M (8h)
- **Owner:** Backend Lead
- **Evidência:** `src/components/wizard/SetupWizard.tsx` - não salva dados
- **Ação:** Implementar fluxo completo de criação de company, company_users, user_profiles

### **M3 - Unificar Sistema de Roles**
- **Tarefa:** Corrigir inconsistências de roles
- **Esforço:** M (6h)
- **Owner:** Backend Lead
- **Evidência:** Múltiplas definições conflitantes em `useAccessControl.ts`, `routes/index.tsx`, database schema
- **Ação:** Escolher uma abordagem (user_profiles) e unificar

### **M4 - Limpar Migrações Conflitantes**
- **Tarefa:** Unificar e corrigir migrações do Supabase
- **Esforço:** M (6h)
- **Owner:** DBA Lead
- **Evidência:** `supabase/migrations/` - múltiplas migrações com políticas conflitantes
- **Ação:** Criar migração única e limpa

---

## ✅ **SHOULD HAVE (Importante - Esta Semana)**

### **S1 - Validação Zod em Todas as Bordas**
- **Tarefa:** Implementar validação Zod em APIs e forms
- **Esforço:** M (8h)
- **Owner:** Full-Stack Lead
- **Evidência:** `src/contexts/AuthContext.tsx` - falta validação robusta
- **Ação:** Criar schemas Zod para todas as entradas

### **S2 - Testes Unit/Integration**
- **Tarefa:** Implementar cobertura de testes mínima
- **Esforço:** H (16h)
- **Owner:** QA Lead
- **Evidência:** Apenas 3 testes existentes (1.3% cobertura)
- **Ação:** Configurar Vitest e implementar testes críticos

### **S3 - CI/CD Pipeline**
- **Tarefa:** Configurar GitHub Actions
- **Esforço:** M (8h)
- **Owner:** DevOps Lead
- **Evidência:** Falta de CI/CD
- **Ação:** Criar workflows para build, test, deploy

### **S4 - Restringir CSP**
- **Tarefa:** Ajustar Content Security Policy
- **Esforço:** B (2h)
- **Owner:** Security Lead
- **Evidência:** `vercel.json` - CSP muito permissivo
- **Ação:** Restringir `script-src` e `style-src`

---

## 🔧 **COULD HAVE (Desejável - Próximas 2 Semanas)**

### **C1 - Otimizar Bundle Size**
- **Tarefa:** Lazy load de componentes pesados
- **Esforço:** M (6h)
- **Owner:** Performance Lead
- **Evidência:** `dist/assets/charts-D2KMjVIn.js` - 419KB
- **Ação:** Implementar lazy loading para charts e componentes pesados

### **C2 - Error Tracking (Sentry)**
- **Tarefa:** Configurar monitoramento de erros
- **Esforço:** B (4h)
- **Owner:** DevOps Lead
- **Evidência:** Falta de error tracking
- **Ação:** Configurar Sentry e error boundaries

### **C3 - Loading States e UX**
- **Tarefa:** Melhorar experiência do usuário
- **Esforço:** M (8h)
- **Owner:** UX Lead
- **Evidência:** `src/pages/Auth.tsx` - falta loading states
- **Ação:** Adicionar loading, error states e validação em tempo real

### **C4 - ESLint + Prettier Padronizado**
- **Tarefa:** Configurar linting e formatação
- **Esforço:** B (3h)
- **Owner:** Code Quality Lead
- **Evidência:** `eslint.config.js` - configuração básica
- **Ação:** Configurar Prettier e regras mais rigorosas

---

## 📚 **WON'T HAVE (Não Priorizado)**

### **W1 - Testes E2E (Playwright)**
- **Justificativa:** Focar primeiro em testes unit/integration
- **Ciclo:** Próximo sprint

### **W2 - Analytics Avançado**
- **Justificativa:** Não crítico para MVP
- **Ciclo:** Post-MVP

### **W3 - PWA Completo**
- **Justificativa:** Funcionalidade não essencial
- **Ciclo:** Futuro

### **W4 - Multi-tenancy Avançado**
- **Justificativa:** Complexidade desnecessária para MVP
- **Ciclo:** Post-MVP

---

## 📊 **PLANO DE EXECUÇÃO**

### **Semana 1 - Crítico (MUST HAVE)**
```
Segunda: M1 (TypeScript strict) + M4 (Migrações)
Terça: M2 (Setup Wizard) - Parte 1
Quarta: M2 (Setup Wizard) - Parte 2
Quinta: M3 (Unificar Roles)
Sexta: Testes e validação
```

### **Semana 2 - Importante (SHOULD HAVE)**
```
Segunda: S1 (Validação Zod) - Parte 1
Terça: S1 (Validação Zod) - Parte 2
Quarta: S2 (Testes) - Configuração
Quinta: S2 (Testes) - Implementação
Sexta: S3 (CI/CD) + S4 (CSP)
```

### **Semana 3 - Desejável (COULD HAVE)**
```
Segunda: C1 (Bundle optimization)
Terça: C2 (Error tracking)
Quarta: C3 (UX improvements)
Quinta: C4 (Code quality)
Sexta: Validação e documentação
```

---

## 🎯 **CRITÉRIOS DE ACEITAÇÃO**

### **MUST HAVE:**
- [ ] TypeScript strict mode habilitado
- [ ] Setup Wizard salvando dados no banco
- [ ] Sistema de roles unificado
- [ ] Migrações limpas e funcionais
- [ ] Build passando sem erros

### **SHOULD HAVE:**
- [ ] Validação Zod em todas as APIs
- [ ] Cobertura de testes >= 60%
- [ ] CI/CD pipeline funcionando
- [ ] CSP restrito e seguro
- [ ] Deploy automático funcionando

### **COULD HAVE:**
- [ ] Bundle size otimizado
- [ ] Error tracking configurado
- [ ] UX melhorada com loading states
- [ ] Code quality tools configurados
- [ ] Performance otimizada

---

## 📈 **MÉTRICAS DE SUCESSO**

### **Segurança:**
- ✅ 0 vulnerabilidades críticas
- ✅ TypeScript strict mode
- ✅ CSP restrito
- ✅ Validação em todas as bordas

### **Qualidade:**
- ✅ Cobertura de testes >= 60%
- ✅ Build sem warnings
- ✅ Lint sem erros
- ✅ Type check passando

### **Performance:**
- ✅ Bundle size < 1.5MB
- ✅ Build time < 10s
- ✅ Core Web Vitals otimizados

### **Funcionalidade:**
- ✅ Setup Wizard funcional
- ✅ Fluxo de cadastro completo
- ✅ RBAC funcionando
- ✅ Deploy automático

---

## 🔄 **PROCESSO DE VALIDAÇÃO**

### **Antes de cada PR:**
1. ✅ TypeScript strict check
2. ✅ Lint sem erros
3. ✅ Testes passando
4. ✅ Build funcionando
5. ✅ Deploy preview OK

### **Após cada PR:**
1. ✅ Code review aprovado
2. ✅ Testes de integração
3. ✅ Deploy em staging
4. ✅ Validação manual
5. ✅ Merge para main

---

**Backlog criado em:** 19/08/2024  
**Próxima revisão:** 26/08/2024  
**Owner:** Arquiteto-Chefe - Squad de Alto Desempenho
