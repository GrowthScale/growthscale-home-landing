# 🔧 GUIA COMPLETO: CONFIGURAÇÃO DO SUPABASE

## 🚨 PROBLEMA IDENTIFICADO

O redirecionamento para `localhost:3000` indica que a configuração do Supabase está incorreta. Vamos resolver isso passo a passo.

## 📋 CONFIGURAÇÃO DO SUPABASE DASHBOARD

### **1. Acessar o Supabase Dashboard**
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá para: **Authentication > URL Configuration**

### **2. Configurar URLs de Redirecionamento**

#### **Site URL:**
```
https://growthscale-home-landing.vercel.app
```

#### **Redirect URLs:**
```
https://growthscale-home-landing.vercel.app/auth/callback
https://growthscale-home-landing.vercel.app/auth
http://localhost:3000/auth/callback
http://localhost:3000/auth
```

### **3. Configurar Email Templates**

#### **Vá para: Authentication > Email Templates**

#### **Template: Confirm signup**
- **Subject:** `Confirme seu cadastro no GrowthScale`
- **Content:** Manter o padrão, mas verificar se o link está correto

### **4. Verificar Providers**

#### **Vá para: Authentication > Providers**
- ✅ **Email** deve estar ativado
- ✅ **Confirm email** deve estar ativado

## 🔧 CONFIGURAÇÃO DO VERCEL

### **1. Acessar o Vercel Dashboard**
1. Vá para: https://vercel.com/dashboard
2. Selecione: `growthscale-home-landing`
3. Vá para: **Settings > Environment Variables**

### **2. Adicionar/Atualizar Variáveis**

#### **VITE_SITE_URL**
```
Nome: VITE_SITE_URL
Valor: https://growthscale-home-landing.vercel.app
Environment: Production, Preview, Development
```

#### **VITE_SUPABASE_URL**
```
Nome: VITE_SUPABASE_URL
Valor: https://[seu-projeto].supabase.co
Environment: Production, Preview, Development
```

#### **VITE_SUPABASE_ANON_KEY**
```
Nome: VITE_SUPABASE_ANON_KEY
Valor: [sua-chave-anonima]
Environment: Production, Preview, Development
```

## 🔍 VERIFICAÇÃO DE CONFIGURAÇÃO

### **1. Testar no Console do Navegador**

Abra o console do navegador e verifique:

```javascript
// Deve mostrar a URL correta
console.log(import.meta.env.VITE_SITE_URL);
// Resultado esperado: https://growthscale-home-landing.vercel.app

// Deve mostrar a URL do Supabase
console.log(import.meta.env.VITE_SUPABASE_URL);
// Resultado esperado: https://[seu-projeto].supabase.co
```

### **2. Verificar Logs do AuthCallback**

No console, procure por:

```
🔧 Configuração do Supabase Client:
📍 URL: https://[seu-projeto].supabase.co
🌐 Site URL: https://growthscale-home-landing.vercel.app
🔄 Redirect URL: https://growthscale-home-landing.vercel.app/auth/callback
```

## 🎯 FLUXO CORRETO

### **1. Cadastro**
- Usuário se cadastra
- Supabase envia email com link correto

### **2. Confirmação**
- Link no email: `https://growthscale-home-landing.vercel.app/auth/callback?code=...`
- AuthCallback processa o código
- Cria empresa automaticamente
- Redireciona para `/dashboard/setup`

## ⚠️ PROBLEMAS COMUNS

### **1. URL de Redirecionamento Incorreta**
- **Sintoma:** Redirecionamento para localhost
- **Solução:** Configurar `VITE_SITE_URL` no Vercel

### **2. Supabase não reconhece a URL**
- **Sintoma:** Erro de autenticação
- **Solução:** Adicionar URL nas "Redirect URLs" do Supabase

### **3. Email não chega**
- **Sintoma:** Email não recebido
- **Solução:** Verificar configuração de email no Supabase

## 🚀 DEPLOY APÓS CONFIGURAÇÃO

```bash
# Fazer novo deploy após configurar as variáveis
vercel --prod
```

## 📞 SUPORTE

Se ainda houver problemas:

1. **Verificar logs do console**
2. **Confirmar configuração do Supabase**
3. **Verificar variáveis de ambiente no Vercel**
4. **Testar em modo incógnito**

## ✅ CHECKLIST FINAL

- [ ] Supabase: URLs de redirecionamento configuradas
- [ ] Vercel: Variáveis de ambiente configuradas
- [ ] Email templates verificados
- [ ] Deploy realizado
- [ ] Teste de cadastro realizado
