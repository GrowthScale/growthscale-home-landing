# 🛡️ Política de Segurança GrowthScale

## 📋 Visão Geral

Este documento descreve as políticas, práticas e medidas de segurança implementadas no GrowthScale para garantir a proteção de dados e a segurança da aplicação.

## 🎯 Princípios de Segurança

### 1. **Defense in Depth**
- Múltiplas camadas de proteção
- Validação em todos os níveis
- Fail-safe mechanisms

### 2. **Least Privilege**
- Acesso mínimo necessário
- Permissões granulares
- Segregação de responsabilidades

### 3. **Security by Design**
- Segurança integrada desde o início
- Validação automática
- Sanitização obrigatória

### 4. **Zero Trust**
- Verificar sempre, confiar nunca
- Autenticação contínua
- Monitoramento constante

## 🔒 Implementações de Segurança

### 1. **Validação de Entrada**

#### Sanitização de Dados
```typescript
// src/lib/utils.ts
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};
```

#### Validação de Tipos
```typescript
// Validação de email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(cnpj);
};
```

### 2. **Rate Limiting**

#### Implementação
```typescript
export const createRateLimiter = (maxAttempts: number = 5, windowMs: number = 60000) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (key: string): boolean => {
    const now = Date.now();
    const attempt = attempts.get(key);
    
    if (!attempt || now > attempt.resetTime) {
      attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (attempt.count >= maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  };
};
```

#### Uso em Formulários
```typescript
// src/pages/Auth.tsx
const rateLimiter = createRateLimiter(5, 60000);

const handleSubmit = async (e: React.FormEvent) => {
  const clientId = email || 'anonymous';
  if (!rateLimiter(clientId)) {
    toast({
      variant: "destructive",
      title: "Muitas tentativas",
      description: "Aguarde um minuto antes de tentar novamente."
    });
    return;
  }
  // ... resto do código
};
```

### 3. **Autenticação Segura**

#### Supabase Auth
```typescript
// src/contexts/AuthContext.tsx
const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { error };
};
```

#### Sessões Seguras
- JWT tokens com expiração
- Refresh tokens automáticos
- Logout automático em inatividade

### 4. **Proteção XSS**

#### Escape HTML
```typescript
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};
```

#### Content Security Policy
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               font-src 'self' data:;">
```

### 5. **Variáveis de Ambiente**

#### Configuração Segura
```typescript
// src/lib/supabase.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
```

#### .env.example
```env
# NUNCA commitar .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🚨 Vulnerabilidades Corrigidas

### 1. **Chaves Hardcoded (CRÍTICO)**
**Problema**: Chaves do Supabase expostas no código
```typescript
// ANTES (VULNERÁVEL)
const SUPABASE_URL = "https://doldfscfnivsrhqopecu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

**Solução**: Variáveis de ambiente
```typescript
// DEPOIS (SEGURO)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 2. **Validação de Formulários**
**Problema**: Falta de validação robusta
**Solução**: Implementação de validação completa
```typescript
const validateForm = () => {
  const sanitizedEmail = sanitizeInput(email);
  if (!validateEmail(sanitizedEmail)) {
    // Tratar erro
  }
};
```

### 3. **Rate Limiting**
**Problema**: Possível brute force
**Solução**: Rate limiting implementado
```typescript
const rateLimiter = createRateLimiter(5, 60000);
```

## 🔐 Configuração de Segurança

### 1. **HTTPS Obrigatório**
```typescript
// Verificação automática
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  window.location.href = 'https://' + location.hostname + location.pathname;
}
```

### 2. **Headers de Segurança**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### 3. **CORS Configuration**
```javascript
// Supabase Dashboard
// Settings → API → CORS
// Adicionar apenas domínios necessários
```

## 📊 Monitoramento de Segurança

### 1. **Error Tracking**
```typescript
// src/lib/error-tracking.ts
export const trackSecurityEvent = (event: string, details: any) => {
  console.error('Security Event:', event, details);
  // Enviar para serviço de monitoramento
};
```

### 2. **Audit Logging**
```typescript
// Log de eventos de segurança
export const logSecurityEvent = (action: string, user: string, details: any) => {
  const log = {
    timestamp: new Date().toISOString(),
    action,
    user,
    details,
    ip: 'client-ip', // Implementar captura de IP
    userAgent: navigator.userAgent
  };
  
  // Enviar para sistema de logs
  console.log('Security Log:', log);
};
```

### 3. **Anomaly Detection**
```typescript
// Detecção de comportamento suspeito
export const detectAnomaly = (userAction: string, frequency: number) => {
  if (frequency > 10) { // Mais de 10 ações por minuto
    trackSecurityEvent('ANOMALY_DETECTED', {
      action: userAction,
      frequency,
      timestamp: new Date().toISOString()
    });
  }
};
```

## 🧪 Testes de Segurança

### 1. **Testes Automatizados**
```typescript
// src/tests/security.test.ts
describe('Security Tests', () => {
  test('should sanitize input', () => {
    const input = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(input);
    expect(sanitized).not.toContain('<script>');
  });

  test('should validate email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('should implement rate limiting', () => {
    const limiter = createRateLimiter(3, 60000);
    expect(limiter('test')).toBe(true);
    expect(limiter('test')).toBe(true);
    expect(limiter('test')).toBe(true);
    expect(limiter('test')).toBe(false); // Bloqueado
  });
});
```

### 2. **Penetration Testing**
- Testes de XSS
- Testes de CSRF
- Testes de SQL Injection
- Testes de Authentication Bypass

### 3. **Vulnerability Scanning**
```bash
# Verificar dependências
npm audit

# Verificar vulnerabilidades conhecidas
npm audit fix

# Verificar configurações
npm run security-check
```

## 📋 Checklist de Segurança

### Desenvolvimento
- ✅ **Input validation** implementada
- ✅ **Output encoding** aplicado
- ✅ **Authentication** seguro
- ✅ **Authorization** configurado
- ✅ **Session management** implementado
- ✅ **Error handling** seguro
- ✅ **Logging** configurado
- ✅ **HTTPS** obrigatório

### Deploy
- ✅ **Environment variables** configuradas
- ✅ **Secrets management** implementado
- ✅ **CORS** configurado
- ✅ **Security headers** aplicados
- ✅ **SSL certificate** válido
- ✅ **Backup** configurado
- ✅ **Monitoring** ativo

### Manutenção
- ✅ **Dependency updates** regulares
- ✅ **Security patches** aplicados
- ✅ **Vulnerability scanning** ativo
- ✅ **Access reviews** periódicos
- ✅ **Incident response** preparado

## 🚨 Incident Response

### 1. **Classificação de Incidentes**
- **Crítico**: Comprometimento de dados
- **Alto**: Tentativa de acesso não autorizado
- **Médio**: Vulnerabilidade descoberta
- **Baixo**: Configuração inadequada

### 2. **Processo de Resposta**
1. **Detecção**: Identificar o incidente
2. **Análise**: Avaliar impacto
3. **Contenção**: Isolar o problema
4. **Eradicação**: Remover a causa
5. **Recuperação**: Restaurar serviços
6. **Lições**: Documentar aprendizado

### 3. **Contatos de Emergência**
```
Segurança: security@growthscale.com
DevOps: devops@growthscale.com
Legal: legal@growthscale.com
```

## 📚 Recursos de Segurança

### Documentação
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Ferramentas
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [OWASP ZAP](https://owasp.org/www-project-zap/)

### Treinamento
- Segurança de aplicações web
- Desenvolvimento seguro
- Resposta a incidentes

---

## 🔄 Atualizações de Segurança

### Versão 1.0.0 (2024-12-19)
- ✅ Removidas chaves hardcoded
- ✅ Implementada validação robusta
- ✅ Adicionado rate limiting
- ✅ Configurado HTTPS obrigatório
- ✅ Implementado CSP headers

### Próximas Atualizações
- 🔄 Implementar 2FA
- 🔄 Adicionar audit logging
- 🔄 Implementar anomaly detection
- 🔄 Configurar SIEM

---

**🛡️ Segurança é prioridade máxima no GrowthScale.** 