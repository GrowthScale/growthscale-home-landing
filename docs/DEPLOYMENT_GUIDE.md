# GrowthScale - Guia de Deploy Enterprise

## 🚀 **Visão Geral do Deploy**

Este guia fornece instruções completas para deploy do GrowthScale em ambiente de produção enterprise, incluindo configurações de segurança, performance e compliance.

## 📋 **Pré-requisitos**

### **Ambiente de Produção**
- **Node.js**: 18+ (LTS recomendado)
- **npm/pnpm/yarn**: Gerenciador de pacotes
- **Git**: Controle de versão
- **Vercel CLI**: Para deploy (opcional)

### **Serviços Externos**
- **Supabase**: Database PostgreSQL e Auth
- **OpenAI**: Para funcionalidades de AI (opcional)
- **Sentry**: Monitoring e error tracking (opcional)
- **CDN**: Cloudflare ou similar (recomendado)

## 🔧 **Configuração do Environment**

### **1. Variáveis de Ambiente (.env.production)**

```bash
# === CORE CONFIGURATION ===
NODE_ENV=production
VITE_APP_NAME=GrowthScale
VITE_APP_VERSION=2.0.0
VITE_APP_ENVIRONMENT=production

# === SUPABASE CONFIGURATION ===
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# === OPENAI CONFIGURATION (OPTIONAL) ===
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_OPENAI_ORGANIZATION=your-org-id

# === SENTRY CONFIGURATION (OPTIONAL) ===
VITE_SENTRY_DSN=https://your-sentry-dsn.ingest.sentry.io/project-id
VITE_SENTRY_ENVIRONMENT=production

# === SECURITY CONFIGURATION ===
VITE_SECURITY_MODE=strict
VITE_RATE_LIMIT_ENABLED=true
VITE_CSP_ENABLED=true

# === PERFORMANCE CONFIGURATION ===
VITE_PWA_ENABLED=true
VITE_SW_ENABLED=true
VITE_COMPRESSION_ENABLED=true

# === ANALYTICS CONFIGURATION ===
VITE_ANALYTICS_ENABLED=true
VITE_PERFORMANCE_MONITORING=true

# === ENTERPRISE FEATURES ===
VITE_SSO_ENABLED=true
VITE_LDAP_ENABLED=true
VITE_RBAC_ENABLED=true
VITE_AUDIT_LOGGING=true

# === COMPLIANCE ===
VITE_GDPR_ENABLED=true
VITE_DATA_RETENTION_DAYS=2557
VITE_COOKIE_CONSENT=true
```

### **2. Configuração do Supabase**

#### **Database Setup**
```sql
-- Execute as migrações na ordem:
-- 1. 20240812_rbac_setup.sql
-- 2. 20241219_rls_granular.sql

-- Configurar RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Configurar triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

#### **Edge Functions**
```bash
# Deploy das Edge Functions
supabase functions deploy calculate-schedule-cost
supabase functions deploy clt-assistant
supabase functions deploy send-schedule-notification
supabase functions deploy suggest-schedule
supabase functions deploy validate-schedule
supabase functions deploy generate-weekly-drafts
supabase functions deploy send-weekly-report
```

## 🏗️ **Build e Deploy**

### **1. Build de Produção**

```bash
# Instalar dependências
npm ci --production=false

# Executar linting e testes
npm run lint
npm run type-check
npm run test

# Build otimizado
npm run build

# Verificar bundle
npm run build:analyze
```

### **2. Deploy no Vercel**

#### **Via Vercel CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy inicial
vercel

# Deploy de produção
vercel --prod

# Configurar domínio customizado
vercel domains add yourdomain.com
```

#### **Via GitHub Integration**
1. Conectar repositório ao Vercel
2. Configurar variáveis de ambiente
3. Deploy automático em cada push

### **3. Configuração do vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "api/analytics.js": { "maxDuration": 10 },
    "api/performance.js": { "maxDuration": 10 },
    "api/health.js": { "maxDuration": 5 },
    "api/security.js": { "maxDuration": 5 },
    "api/audit.js": { "maxDuration": 10 }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; connect-src 'self' https://*.supabase.co https://api.openai.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/:path((?!api/|sw.js|favicon.ico|assets/).*)", "destination": "/" }
  ],
  "redirects": [
    { "source": "/admin", "destination": "/dashboard", "permanent": true },
    { "source": "/login", "destination": "/auth", "permanent": true }
  ]
}
```

## 🔐 **Configuração de Segurança**

### **1. SSL/TLS Certificate**
```bash
# Configurar SSL no Vercel (automático)
# Para domínio customizado:
vercel certs add yourdomain.com
```

### **2. Content Security Policy**
```javascript
// Configuração CSP rigorosa
const csp = `
  default-src 'self';
  connect-src 'self' https://*.supabase.co https://api.openai.com https://*.vercel.app;
  img-src 'self' data: blob: https:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
`;
```

### **3. Rate Limiting**
```javascript
// Configuração de rate limiting
const rateLimits = {
  api: { requests: 1000, window: 3600 }, // 1000 req/hora
  auth: { requests: 10, window: 300 },   // 10 login/5min
  uploads: { requests: 100, window: 3600 }, // 100 uploads/hora
  exports: { requests: 10, window: 3600 }   // 10 exports/hora
};
```

## 🏢 **Configuração Enterprise**

### **1. SSO Configuration**

#### **SAML Setup**
```javascript
// Configuração SAML para Azure AD
const samlConfig = {
  name: "Azure AD SSO",
  entityId: "https://sts.windows.net/tenant-id/",
  ssoUrl: "https://login.microsoftonline.com/tenant-id/saml2",
  x509cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  domains: ["empresa.com", "subsidiary.com"]
};
```

#### **OIDC Setup**
```javascript
// Configuração OIDC
const oidcConfig = {
  name: "Google SSO",
  issuer: "https://accounts.google.com",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  domains: ["empresa.com"]
};
```

### **2. LDAP Configuration**
```javascript
// Configuração LDAP/Active Directory
const ldapConfig = {
  name: "Active Directory",
  server: "ldap.empresa.com",
  port: 636,
  bindDN: "cn=admin,dc=empresa,dc=com",
  baseDN: "dc=empresa,dc=com",
  userFilter: "(objectClass=user)",
  groupFilter: "(objectClass=group)",
  tls: true,
  syncInterval: 60 // minutos
};
```

### **3. API Keys Management**
```bash
# Gerar API keys para integrações
curl -X POST https://yourdomain.com/api/keys \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile App Integration",
    "permissions": ["api:read", "api:write"],
    "rateLimit": 1000,
    "expiresAt": "2024-12-31T23:59:59Z"
  }'
```

## 📊 **Monitoring e Observabilidade**

### **1. Sentry Setup**
```javascript
// sentry.client.config.js
import { init } from "@sentry/react";

init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_SENTRY_ENVIRONMENT,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});
```

### **2. Performance Monitoring**
```javascript
// Performance monitoring setup
const performanceConfig = {
  coreWebVitals: true,
  userTiming: true,
  resourceTiming: true,
  navigationTiming: true,
  customMetrics: true
};
```

### **3. Health Checks**
```bash
# Health check endpoints
GET /api/health          # Status geral
GET /api/health/database # Status do banco
GET /api/health/external # Serviços externos
GET /api/health/security # Status de segurança
```

## 🔄 **CI/CD Pipeline**

### **1. GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### **2. Quality Gates**
```bash
# Quality gates obrigatórios
- ESLint: 0 errors
- TypeScript: 0 errors
- Tests: 95%+ coverage
- E2E: All critical flows pass
- Performance: Lighthouse > 90
- Security: 0 vulnerabilities
```

## 📈 **Performance Optimization**

### **1. CDN Configuration**
```javascript
// Cloudflare/CDN settings
const cdnConfig = {
  cacheLevel: "aggressive",
  browserTTL: 31536000, // 1 year
  edgeTTL: 2592000,     // 30 days
  minify: {
    css: true,
    js: true,
    html: true
  },
  compression: "gzip"
};
```

### **2. Image Optimization**
```bash
# Image optimization automática
- WebP conversion
- AVIF support
- Responsive images
- Lazy loading
- Progressive JPEG
```

### **3. Bundle Analysis**
```bash
# Análise do bundle
npm run build:analyze

# Resultado esperado:
# Total bundle size: < 500KB gzipped
# First Load JS: < 250KB
# Lighthouse Score: > 90
```

## 🛡️ **Backup e Recovery**

### **1. Database Backup**
```bash
# Backup automático do Supabase
# Point-in-time recovery disponível
# Retention: 7 days (Pro), 30 days (Enterprise)

# Backup manual
supabase db dump > backup-$(date +%Y%m%d).sql
```

### **2. Asset Backup**
```bash
# Backup de assets estáticos
aws s3 sync ./dist s3://backup-bucket/$(date +%Y%m%d)/

# CDN purge se necessário
curl -X POST "https://api.cloudflare.com/client/v4/zones/zone-id/purge_cache" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
```

## 📝 **Compliance Checklist**

### **✅ GDPR Compliance**
- [x] Data export functionality
- [x] Right to be forgotten
- [x] Consent management
- [x] Data retention policies
- [x] Privacy policy updated
- [x] Audit trails complete

### **✅ Security Compliance**
- [x] HTTPS enforced
- [x] Security headers configured
- [x] Input validation implemented
- [x] Rate limiting active
- [x] Error handling secure
- [x] Logging comprehensive

### **✅ Performance Standards**
- [x] Core Web Vitals < targets
- [x] Bundle size optimized
- [x] PWA configured
- [x] Caching strategy implemented
- [x] CDN integrated
- [x] Monitoring active

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Check for conflicting dependencies
npm ls --depth=0
```

#### **Environment Issues**
```bash
# Validate environment variables
node -e "console.log(process.env)" | grep VITE_

# Test Supabase connection
curl -H "apikey: your-anon-key" \
  "https://your-project.supabase.co/rest/v1/"
```

#### **Performance Issues**
```bash
# Analyze bundle
npm run build:analyze

# Check lighthouse scores
npm run analyze:performance

# Monitor Core Web Vitals
# Use Chrome DevTools > Performance
```

### **Emergency Procedures**

#### **Rollback**
```bash
# Rollback no Vercel
vercel rollback https://deployment-url.vercel.app

# Rollback no GitHub
git revert HEAD
git push origin main
```

#### **Database Recovery**
```bash
# Point-in-time recovery
# Via Supabase Dashboard ou CLI
supabase db reset --db-url "your-db-url"
```

## 📞 **Support e Manutenção**

### **Monitoring Dashboards**
- **Vercel Analytics**: Performance e errors
- **Sentry**: Error tracking e performance
- **Supabase**: Database metrics
- **Custom Dashboard**: Business metrics

### **Alerting**
- **Uptime**: StatusPage ou similar
- **Performance**: Core Web Vitals alerts
- **Errors**: Sentry notifications
- **Security**: Failed auth attempts

### **Regular Maintenance**
- **Weekly**: Dependency updates
- **Monthly**: Security audit
- **Quarterly**: Performance review
- **Annually**: Full security audit

---

**🎉 Deploy concluído! O GrowthScale está pronto para produção enterprise com todos os recursos de segurança, performance e compliance implementados.**
