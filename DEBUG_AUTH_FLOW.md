# 🔍 **DEBUG: FLUXO DE AUTENTICAÇÃO**

## 🚨 **PROBLEMA ATUAL**

Mesmo após atualizar a variável de ambiente no Vercel, o cadastro ainda está redirecionando para a home em vez de ir para `/dashboard/setup`.

## 🛠️ **FERRAMENTAS DE DEBUG**

### **1. Função de Debug Principal:**
```javascript
// No console do navegador
debugAuthFlow()
```

### **2. Função de Diagnóstico:**
```javascript
// No console do navegador
runAuthDiagnostic()
```

### **3. Teste de AuthCallback:**
```javascript
// No console do navegador
testAuthCallback()
```

---

## 🔍 **COMO USAR O DEBUG**

### **Passo 1: Abrir o Console**
1. Acesse: `https://growthscale-home-landing-60dy6g4if.vercel.app`
2. Pressione `F12` para abrir DevTools
3. Vá para a aba **Console**

### **Passo 2: Executar Debug**
```javascript
debugAuthFlow()
```

### **Passo 3: Analisar Resultados**
O debug vai mostrar:
- ✅ Configuração atual
- ✅ Sessão ativa
- ✅ Empresas do usuário
- ✅ LocalStorage
- ✅ Status do callback
- ✅ Onde deveria ir
- ✅ Contexto de tenant
- ✅ Recomendações

---

## 🎯 **O QUE PROCURAR**

### **✅ CONFIGURAÇÃO CORRETA:**
```
Site URL: https://growthscale-home-landing-60dy6g4if.vercel.app
Supabase URL: https://[seu-projeto].supabase.co
```

### **✅ SESSÃO ATIVA:**
```
Sessão ativa: {
  userId: "...",
  email: "usuario@email.com",
  hasMetadata: true,
  pendingCompany: { name: "Empresa", employee_count: 10 }
}
```

### **✅ EMPRESAS:**
```
Empresas encontradas: 0
```

### **✅ ONDE DEVERIA IR:**
```
Usuário tem empresa pendente → /dashboard/setup
```

---

## 🚨 **PROBLEMAS POSSÍVEIS**

### **1. ❌ SITE_URL INCORRETA:**
```
Site URL: https://growthscale-home-landing.vercel.app
```
**Solução:** Atualizar para `https://growthscale-home-landing-60dy6g4if.vercel.app`

### **2. ❌ SEM SESSÃO:**
```
Nenhuma sessão ativa
```
**Solução:** Verificar se o AuthCallback está processando

### **3. ❌ SEM EMPRESA PENDENTE:**
```
Empresa pendente: Não
```
**Solução:** Verificar se os metadados foram salvos no cadastro

### **4. ❌ EMPRESA JÁ CRIADA:**
```
Empresas encontradas: 1
```
**Solução:** Verificar se a empresa foi criada mas não está sendo detectada

---

## 🔧 **AÇÕES CORRETIVAS**

### **Se Site URL está incorreta:**
1. Vá para Vercel Dashboard
2. Settings > Environment Variables
3. Atualize `VITE_SITE_URL`
4. Faça novo deploy

### **Se sem sessão:**
1. Verificar se o AuthCallback está sendo chamado
2. Verificar logs do AuthCallback no console
3. Verificar se há erros de rede

### **Se sem empresa pendente:**
1. Verificar se o cadastro salvou os metadados
2. Verificar se o email de confirmação foi enviado
3. Verificar se o link de confirmação está correto

### **Se empresa já criada:**
1. Verificar se o TenantContext está carregando
2. Verificar se há delay suficiente
3. Verificar se a empresa está ativa

---

## 📋 **CHECKLIST DE VERIFICAÇÃO**

### **✅ Configuração:**
- [ ] VITE_SITE_URL configurada corretamente
- [ ] Supabase URLs configuradas
- [ ] Deploy realizado após mudanças

### **✅ Cadastro:**
- [ ] Formulário preenchido corretamente
- [ ] Email enviado
- [ ] Link de confirmação clicado

### **✅ AuthCallback:**
- [ ] Página carrega
- [ ] Logs aparecem no console
- [ ] Empresa é criada
- [ ] Metadados são limpos

### **✅ Redirecionamento:**
- [ ] Usuário vai para `/dashboard/setup`
- [ ] Setup wizard carrega
- [ ] Processo completo

---

## 🚀 **TESTE COMPLETO**

### **1. Fazer novo cadastro:**
```
1. Acesse: https://growthscale-home-landing-60dy6g4if.vercel.app
2. Clique em "Começar Gratuitamente"
3. Preencha o formulário
4. Verifique se o email chega
```

### **2. Executar debug:**
```javascript
debugAuthFlow()
```

### **3. Clicar no link de confirmação:**
```
1. Abra o email
2. Clique no link de confirmação
3. Aguarde o processamento
4. Verifique se vai para /dashboard/setup
```

### **4. Verificar logs:**
```
1. Abra o console (F12)
2. Procure por logs do AuthCallback
3. Verifique se há erros
4. Execute debugAuthFlow() novamente
```

---

## 📞 **SUPORTE**

Se o problema persistir:

1. **Cole os logs** do `debugAuthFlow()`
2. **Descreva o comportamento** observado
3. **Informe a URL** que está sendo usada
4. **Mencione se há erros** no console

---

**Data:** 25 de Agosto de 2024  
**Status:** 🔍 **EM INVESTIGAÇÃO**  
**Prioridade:** 🔴 **ALTA**
