# 🚀 Guia de Deploy GrowthScale

## 📋 Visão Geral

Este guia cobre todas as etapas necessárias para fazer deploy do GrowthScale em diferentes plataformas, desde desenvolvimento até produção.

## 🎯 Estratégias de Deploy

### 1. **Lovable (Recomendado para No-Code)**
- Deploy automático
- Integração com Git
- Configuração simples
- SSL automático

### 2. **Vercel (Recomendado para Desenvolvedores)**
- Performance otimizada
- Edge functions
- Analytics integrado
- Deploy preview

### 3. **Netlify (Alternativa)**
- Build automático
- Form handling
- A/B testing
- CDN global

## 🚀 Deploy no Lovable

### 1. **Preparação**
```bash
# Certifique-se de que tudo está funcionando
npm run build
npm run lint
```

### 2. **Configuração no Lovable**
1. Acesse [lovable.dev](https://lovable.dev)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_APP_NAME=GrowthScale
   VITE_APP_VERSION=1.0.0
   VITE_APP_ENVIRONMENT=production
   ```

### 3. **Deploy Automático**
- Push para `main` branch
- Deploy automático em 2-3 minutos
- URL disponível automaticamente

## 🌐 Deploy no Vercel

### 1. **Instalação do Vercel CLI**
```bash
npm install -g vercel
```

### 2. **Login e Configuração**
```bash
# Login no Vercel
vercel login

# Configurar projeto
vercel
```

### 3. **Configuração do Projeto**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### 4. **Variáveis de Ambiente**
```bash
# Configurar via CLI
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Ou via dashboard
# Settings → Environment Variables
```

### 5. **Deploy**
```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

## 🌍 Deploy no Netlify

### 1. **Configuração via Git**
1. Conecte repositório no Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 2. **Configuração via CLI**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### 3. **netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## 🔒 Configuração de Segurança

### 1. **HTTPS (Obrigatório para PWA)**
- **Lovable**: Automático
- **Vercel**: Automático
- **Netlify**: Automático

### 2. **Headers de Segurança**
```json
// vercel.json ou netlify.toml
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
        }
      ]
    }
  ]
}
```

### 3. **CORS Configuration**
```javascript
// No Supabase Dashboard
// Settings → API → CORS
// Adicionar domínios de produção:
// https://your-app.vercel.app
// https://your-app.netlify.app
// https://your-app.lovable.dev
```

## 📱 Configuração PWA

### 1. **Verificar Manifest**
```json
// public/manifest.json
{
  "name": "GrowthScale",
  "short_name": "GrowthScale",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0ea5e9",
  "background_color": "#ffffff"
}
```

### 2. **Verificar Service Worker**
```javascript
// public/sw.js
// Certifique-se de que está funcionando
// Teste offline functionality
```

### 3. **Testar PWA Features**
- ✅ Install prompt aparece
- ✅ Offline funciona
- ✅ App icon aparece
- ✅ Splash screen funciona

## 📊 Monitoramento

### 1. **Analytics (Google Analytics)**
```typescript
// src/lib/analytics.ts
export const initAnalytics = () => {
  if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
    // Configurar GA4
    gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
  }
};
```

### 2. **Error Tracking (Sentry)**
```typescript
// src/lib/error-tracking.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENVIRONMENT,
});
```

### 3. **Performance Monitoring**
```typescript
// src/lib/performance.ts
export const trackPerformance = () => {
  if ('performance' in window) {
    // Track Core Web Vitals
    // Track custom metrics
  }
};
```

## 🔄 CI/CD Pipeline

### 1. **GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. **Automatic Testing**
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## 🌍 Domínio Customizado

### 1. **Configurar DNS**
```bash
# Exemplo para Vercel
# Adicionar CNAME record:
# your-domain.com → your-app.vercel.app
```

### 2. **SSL Certificate**
- **Lovable**: Automático
- **Vercel**: Automático
- **Netlify**: Automático

### 3. **Verificar Configuração**
```bash
# Testar SSL
curl -I https://your-domain.com

# Testar PWA
# Abrir em navegador e verificar install prompt
```

## 📈 Performance Optimization

### 1. **Bundle Analysis**
```bash
# Analisar bundle
npm install -g vite-bundle-analyzer
vite-bundle-analyzer dist/stats.html
```

### 2. **Core Web Vitals**
```typescript
// src/lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 3. **Image Optimization**
```typescript
// src/lib/image-optimization.ts
export const optimizeImage = (src: string, width: number) => {
  // Implementar lazy loading
  // Implementar WebP support
  // Implementar responsive images
};
```

## 🔍 Troubleshooting

### Problema: "Build fails"
```bash
# Verificar logs
npm run build 2>&1 | tee build.log

# Verificar dependências
npm audit
npm audit fix
```

### Problema: "PWA not working"
```bash
# Verificar HTTPS
curl -I https://your-domain.com

# Verificar manifest
curl https://your-domain.com/manifest.json

# Verificar service worker
curl https://your-domain.com/sw.js
```

### Problema: "Environment variables not working"
```bash
# Verificar no runtime
console.log(import.meta.env.VITE_SUPABASE_URL);

# Verificar build time
# Variáveis devem estar disponíveis no build
```

## ✅ Checklist de Deploy

### Pré-Deploy
- ✅ **Build funciona** localmente
- ✅ **Linting passa** sem erros
- ✅ **Variáveis de ambiente** configuradas
- ✅ **Supabase** configurado para produção
- ✅ **CORS** configurado para domínio

### Pós-Deploy
- ✅ **Site carrega** sem erros
- ✅ **HTTPS funciona** corretamente
- ✅ **PWA install prompt** aparece
- ✅ **Offline functionality** funciona
- ✅ **Analytics** está funcionando
- ✅ **Error tracking** está configurado

## 🚀 Próximos Passos

1. **Configurar Monitoramento**
   - Uptime monitoring
   - Performance monitoring
   - Error tracking

2. **Configurar Backup**
   - Database backup
   - File storage backup
   - Configuration backup

3. **Configurar Scaling**
   - CDN configuration
   - Load balancing
   - Database optimization

---

**🎉 Deploy concluído! O GrowthScale está online e funcionando.** 