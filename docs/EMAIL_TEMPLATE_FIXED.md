# 🎨 **TEMPLATE DE EMAIL CORRIGIDO - SUPABASE**

## 🚨 **PROBLEMA IDENTIFICADO:**
- Botão com texto azul em fundo roxo (baixo contraste)
- Link de confirmação expirando rapidamente

## 🔧 **SOLUÇÃO: TEMPLATE CORRIGIDO**

### **1. Acesse o Supabase Dashboard:**
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. **Authentication > Email Templates**
4. Clique em **"Confirm signup"**

### **2. Substitua o conteúdo pelo template abaixo:**

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
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 700; 
        }
        .header p { 
            margin: 10px 0 0 0; 
            opacity: 0.9; 
            font-size: 16px; 
        }
        .content { 
            padding: 40px 30px; 
            background-color: #ffffff; 
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
            transition: all 0.3s ease; 
        }
        .button:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4); 
        }
        .highlight { 
            background: #f8f9ff; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #667eea; 
            margin: 20px 0; 
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #666; 
            font-size: 14px; 
            padding: 20px; 
            background-color: #f8f9fa; 
        }
        .link-text { 
            word-break: break-all; 
            color: #667eea; 
            font-size: 14px; 
            background: #f8f9ff; 
            padding: 12px; 
            border-radius: 6px; 
            margin: 15px 0; 
        }
        .warning { 
            background: #fff3cd; 
            padding: 15px; 
            border-radius: 6px; 
            border-left: 4px solid #ffc107; 
            margin: 20px 0; 
        }
        .steps { 
            list-style: none; 
            padding: 0; 
        }
        .steps li { 
            padding: 8px 0; 
            position: relative; 
            padding-left: 30px; 
        }
        .steps li:before { 
            content: "✅"; 
            position: absolute; 
            left: 0; 
            color: #28a745; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 GrowthScale</h1>
            <p>Confirme sua conta e comece sua jornada</p>
        </div>
        
        <div class="content">
            <h2 style="color: #333; margin-top: 0;">Olá! 👋</h2>
            
            <p style="font-size: 16px; color: #555;">
                Obrigado por se cadastrar no <strong style="color: #333;">GrowthScale</strong>! 
                Estamos muito felizes em tê-lo conosco.
            </p>
            
            <p style="font-size: 16px; color: #555;">
                Para começar a usar nossa plataforma e transformar a gestão da sua empresa, 
                você precisa confirmar seu e-mail.
            </p>
            
            <div class="highlight">
                <strong style="color: #333;">🎯 Próximos passos:</strong>
                <ul class="steps">
                    <li>Clique no botão abaixo para confirmar sua conta</li>
                    <li>Sua empresa será criada automaticamente</li>
                    <li>Você será redirecionado para o setup inicial</li>
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="{{ .ConfirmationURL }}" class="button">
                    ✅ Confirmar Minha Conta
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
                <strong>Não consegue clicar no botão?</strong> 
                Copie e cole este link no seu navegador:
            </p>
            
            <div class="link-text">
                {{ .ConfirmationURL }}
            </div>
            
            <div class="warning">
                <strong>⏰ Importante:</strong> 
                Este link expira em 24 horas por segurança. 
                Se não conseguir acessar, solicite um novo link de confirmação.
            </div>
            
            <p style="font-size: 14px; color: #666;">
                Se você não se cadastrou no GrowthScale, pode ignorar este e-mail com segurança.
            </p>
        </div>
        
        <div class="footer">
            <p style="margin: 0;">© 2024 GrowthScale. Transformando a gestão empresarial.</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Este e-mail foi enviado para {{ .Email }}</p>
        </div>
    </div>
</body>
</html>
```

## 🔧 **CONFIGURAÇÕES ADICIONAIS:**

### **3. Configurar Expiração do Link:**
1. Vá para **Authentication > Settings**
2. Procure por **"Email Link Expiry"**
3. Configure para **24 horas** (ou mais se necessário)

### **4. Verificar URL Configuration:**
1. **Authentication > URL Configuration**
2. Confirme que está configurado:
   ```
   Site URL: https://growthscale-home-landing.vercel.app
   Redirect URLs:
   - https://growthscale-home-landing.vercel.app/auth/callback
   - https://growthscale-home-landing.vercel.app/auth
   ```

## ✅ **RESULTADO ESPERADO:**
- ✅ Botão com texto branco em fundo roxo (alto contraste)
- ✅ Design responsivo e profissional
- ✅ Links que não expiram rapidamente
- ✅ Redirecionamento correto para `/auth/callback`

## 🧪 **TESTE APÓS APLICAÇÃO:**
1. Faça um novo cadastro
2. Verifique se o email chega com o design correto
3. Clique no botão e confirme se redireciona corretamente
4. Verifique se não há mais erro de "link expirado"
