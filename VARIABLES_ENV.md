# 🔧 VARIÁVEIS DE AMBIENTE - CONFIGURAÇÃO CRÍTICA

## 📋 VARIÁVEIS OBRIGATÓRIAS

### **1. VITE_SITE_URL (CRÍTICA)**
- **Nome da Chave:** `VITE_SITE_URL`
- **Valor:** `https://growthscale-home-landing.vercel.app`
- **Descrição:** URL principal do site para redirecionamentos de autenticação
- **Onde Configurar:** Vercel Dashboard > Settings > Environment Variables
- **Impacto:** Resolve problemas de redirecionamento e localhost

### **2. VITE_SUPABASE_URL**
- **Nome da Chave:** `VITE_SUPABASE_URL`
- **Valor:** `https://your-project.supabase.co`
- **Descrição:** URL do projeto Supabase
- **Onde Configurar:** Vercel Dashboard > Settings > Environment Variables

### **3. VITE_SUPABASE_ANON_KEY**
- **Nome da Chave:** `VITE_SUPABASE_ANON_KEY`
- **Valor:** `your-anon-key`
- **Descrição:** Chave anônima do Supabase
- **Onde Configurar:** Vercel Dashboard > Settings > Environment Variables

## 🚀 CONFIGURAÇÃO NO VERCEL

### **Passo 1: Acessar o Dashboard**
1. Vá para [vercel.com](https://vercel.com)
2. Acesse seu projeto `growthscale-home-landing`
3. Clique em "Settings" no menu lateral

### **Passo 2: Configurar Environment Variables**
1. Clique em "Environment Variables"
2. Adicione as seguintes variáveis:

```
VITE_SITE_URL = https://growthscale-home-landing.vercel.app
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key
```

### **Passo 3: Deploy**
1. Após adicionar as variáveis, faça um novo deploy
2. As variáveis estarão disponíveis na aplicação

## 🔍 VERIFICAÇÃO

### **No Console do Navegador:**
Procure por estes logs na inicialização:
```
🔧 Configuração do Supabase Client:
📍 URL: https://your-project.supabase.co
🔑 Chave: Configurada
🌐 Site URL: https://growthscale-home-landing.vercel.app
🔄 Redirect URL: https://growthscale-home-landing.vercel.app/auth/callback
```

### **No App.tsx:**
Procure por este log:
```
🚀 App: Inicializando aplicação
siteUrl: https://growthscale-home-landing.vercel.app
```

## ⚠️ PROBLEMAS RESOLVIDOS

### **1. Problema do localhost**
- **Antes:** URLs hardcoded para localhost
- **Depois:** URLs dinâmicas baseadas em VITE_SITE_URL

### **2. Problema de Redirecionamento**
- **Antes:** Redirecionamentos quebrados em produção
- **Depois:** Redirecionamentos corretos para o domínio principal

### **3. Problema de Autenticação**
- **Antes:** Callbacks de autenticação falhando
- **Depois:** Callbacks funcionando corretamente

## 🔧 CONFIGURAÇÃO LOCAL (.env.local)

Para desenvolvimento local, crie um arquivo `.env.local`:

```env
VITE_SITE_URL=http://localhost:3000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 IMPACTO NAS FUNCIONALIDADES

### **✅ Autenticação**
- Cadastro funcionando corretamente
- Confirmação de email funcionando
- Redirecionamentos automáticos

### **✅ Onboarding**
- Criação automática de empresa
- Redirecionamento para setup
- Fluxo completo funcionando

### **✅ Callbacks**
- AuthCallback processando corretamente
- URLs de redirecionamento corretas
- Sessões sendo criadas

## 🚨 IMPORTANTE

**A variável `VITE_SITE_URL` é CRÍTICA** para o funcionamento da autenticação. Sem ela, os redirecionamentos falharão e a experiência do usuário será quebrada.

**Sempre configure esta variável antes de fazer deploy em produção!**
