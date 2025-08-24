# 🔧 **CORREÇÃO DO PROBLEMA: LINK EXPIRADO/ACCESS_DENIED**

## 🚨 **PROBLEMA IDENTIFICADO:**
```
https://growthscale-home-landing.vercel.app/auth?error=access_denied&error_description=Email%20link%20is%20invalid%20or%20has%20expired
```

## 🔍 **CAUSA RAIZ:**
O Supabase está rejeitando o link de confirmação devido a configuração incorreta.

## 🛠️ **SOLUÇÃO PASSO A PASSO:**

### **1. CONFIGURAR SUPABASE DASHBOARD**

#### **1.1 URL Configuration:**
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. **Authentication > URL Configuration**

**Configure exatamente:**
```
Site URL: https://growthscale-home-landing.vercel.app

Redirect URLs:
- https://growthscale-home-landing.vercel.app/auth/callback
- https://growthscale-home-landing.vercel.app/auth
```

#### **1.2 Authentication Settings:**
1. **Authentication > Settings**
2. Procure por **"Email Link Expiry"**
3. Configure para **24 horas** (ou mais)
4. **Enable email confirmations** deve estar ativado

#### **1.3 Email Templates:**
1. **Authentication > Email Templates**
2. Clique em **"Confirm signup"**
3. Aplique o template corrigido de `docs/EMAIL_TEMPLATE_FIXED.md`

### **2. VERIFICAR CONFIGURAÇÃO DO VERCEL**

#### **2.1 Environment Variables:**
1. Vá para: https://vercel.com/dashboard
2. Selecione: `growthscale-home-landing`
3. **Settings > Environment Variables**

**Confirme que estão configuradas:**
```
VITE_SITE_URL = https://growthscale-home-landing.vercel.app
VITE_SUPABASE_URL = https://[seu-projeto].supabase.co
VITE_SUPABASE_ANON_KEY = [sua-chave-anonima]
```

### **3. TESTE DE VERIFICAÇÃO**

#### **3.1 Teste Manual:**
1. Faça um novo cadastro com email diferente
2. Verifique se o email chega
3. Clique no link imediatamente
4. Verifique se redireciona corretamente

#### **3.2 Verificar Logs:**
1. Abra o console do navegador (F12)
2. Faça o cadastro
3. Clique no link de confirmação
4. Verifique os logs de erro

## 🔧 **CONFIGURAÇÕES ESPECÍFICAS:**

### **4. TEMPLATE DE EMAIL CORRIGIDO**

**Aplique este template no Supabase:**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirme sua conta - GrowthScale</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: #ffffff !important; 
            padding: 16px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            font-size: 16px; 
            margin: 20px 0; 
            text-align: center; 
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 GrowthScale</h1>
            <p>Confirme sua conta e comece sua jornada</p>
        </div>
        
        <div style="padding: 40px 30px;">
            <h2>Olá! 👋</h2>
            <p>Obrigado por se cadastrar no <strong>GrowthScale</strong>!</p>
            <p>Para começar a usar nossa plataforma, confirme seu e-mail:</p>
            
            <div style="text-align: center;">
                <a href="{{ .ConfirmationURL }}" class="button">
                    ✅ Confirmar Minha Conta
                </a>
            </div>
            
            <p><strong>Não consegue clicar no botão?</strong> Copie este link:</p>
            <p style="word-break: break-all; color: #667eea;">{{ .ConfirmationURL }}</p>
            
            <p>⏰ Este link expira em 24 horas.</p>
        </div>
    </div>
</body>
</html>
```

### **5. VERIFICAÇÃO FINAL**

#### **5.1 Checklist:**
- ✅ Site URL configurado corretamente
- ✅ Redirect URLs configuradas
- ✅ Email Link Expiry: 24 horas
- ✅ Template de email aplicado
- ✅ Variáveis de ambiente configuradas

#### **5.2 Teste Completo:**
1. **Cadastro:** Faça um novo cadastro
2. **Email:** Verifique se chega com design correto
3. **Link:** Clique imediatamente
4. **Redirecionamento:** Deve ir para `/auth/callback`
5. **Callback:** Deve processar e criar empresa
6. **Setup:** Deve redirecionar para `/dashboard/setup`

## 🚀 **RESULTADO ESPERADO:**
- ✅ Email com botão de alto contraste
- ✅ Link que não expira rapidamente
- ✅ Redirecionamento correto
- ✅ Empresa criada automaticamente
- ✅ Usuário vai para setup

## 📞 **SE O PROBLEMA PERSISTIR:**
1. Verifique os logs no console do navegador
2. Teste com email completamente diferente
3. Verifique se o Supabase está funcionando
4. Confirme todas as configurações acima
