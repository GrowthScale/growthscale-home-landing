# 🔧 Guia de Solução de Problemas - Autenticação

## ❌ Problema: "invalid_code" ao confirmar email

### 🔍 Diagnóstico

1. **Abra o console do navegador** (F12)
2. **Acesse** `http://localhost:3001/auth`
3. **Clique no botão "Diagnóstico de Auth"** (apenas em desenvolvimento)
4. **Verifique os logs** no console

### 🛠️ Soluções

#### **Solução 1: Configuração do Supabase Dashboard**

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para **Authentication > URL Configuration**
4. Configure:
   - **Site URL**: `http://localhost:3001`
   - **Redirect URLs**: `http://localhost:3001/auth/callback`

#### **Solução 2: Verificar Variáveis de Ambiente**

Certifique-se de que o arquivo `.env` contém:

```env
VITE_SUPABASE_URL=https://doldfscfnivsrhqopecu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Solução 3: Limpar Cache e Cookies**

1. Abra o DevTools (F12)
2. Vá para **Application > Storage**
3. Clique em **Clear site data**
4. Recarregue a página

#### **Solução 4: Testar com Novo Email**

1. Use um email completamente novo
2. Faça o cadastro novamente
3. Verifique se o email chega na caixa de entrada

### 🔍 Logs de Debug

Quando o erro ocorrer, verifique no console:

```javascript
// Deve mostrar:
🔧 Configuração Supabase:
  url: https://doldfscfnivsrhqopecu.supabase.co
  hasKey: true
  currentPort: 3001
  hostname: localhost
```

### 📞 Suporte

Se o problema persistir:

1. **Cole os logs** do console
2. **Verifique** se o Supabase está funcionando
3. **Teste** com um email diferente
4. **Entre em contato** com o suporte

### ✅ Fluxo Correto

```
1. Cadastro → Email enviado
2. Clique no link → /auth/callback?code=...
3. Código processado → Sessão criada
4. Redirecionamento → /onboarding ou /dashboard
```
