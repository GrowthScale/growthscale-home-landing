# ⚡ **DOCUMENTAÇÃO DE PERFORMANCE - GROWTHSCALE**

## 📋 **VISÃO GERAL**

Este documento descreve as otimizações de performance implementadas no sistema GrowthScale, incluindo PWA, lazy loading, bundle optimization e monitoramento de métricas.

---

## 🎯 **ESTRATÉGIA DE PERFORMANCE**

### **1. Pirâmide de Performance**
```
    🔺 Core Web Vitals (LCP, FID, CLS)
   🔺🔺 Bundle Optimization (Code Splitting, Tree Shaking)
🔺🔺🔺 PWA Features (Caching, Offline, Install)
```

### **2. Metas de Performance**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Bundle Size:** < 500KB gzipped
- **TTFB (Time to First Byte):** < 600ms

---

## 🚀 **OTIMIZAÇÕES IMPLEMENTADAS**

### **1. Bundle Optimization**

#### **Code Splitting**
```typescript
// vite.config.ts
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'router': ['react-router-dom'],
  'supabase': ['@supabase/supabase-js'],
  'ui-core': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  'ui-forms': ['@radix-ui/react-checkbox', '@radix-ui/react-radio-group'],
  'ui-layout': ['@radix-ui/react-accordion', '@radix-ui/react-collapsible'],
  'utils': ['date-fns', 'clsx', 'tailwind-merge'],
  'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
  'charts': ['recharts'],
  'icons': ['lucide-react'],
  'analytics': ['@tanstack/react-query'],
}
```

#### **Resultados do Bundle**
```
📦 Bundle Analysis (Build atual)
├── charts-Dw9zs_kV.js         419.83 kB (112.94 kB gzipped)
├── react-vendor-Ckhrjn13.js   142.38 kB (45.67 kB gzipped)
├── supabase-BXDbY0M4.js       123.28 kB (34.25 kB gzipped)
├── ui-core-CFnrwuTh.js        100.02 kB (33.00 kB gzipped)
├── index-CTmsGpLM.js          203.73 kB (52.49 kB gzipped)
└── Total: ~1.2MB (350KB gzipped)
```

### **2. Lazy Loading**

#### **Componentes Lazy**
```typescript
// src/components/LazyLoader.tsx
export const LazyDashboard = lazy(() => import('@/pages/Dashboard'));
export const LazySchedules = lazy(() => import('@/pages/Schedules'));
export const LazyEmployees = lazy(() => import('@/pages/Employees'));
export const LazyCompanies = lazy(() => import('@/pages/Companies'));
export const LazySettings = lazy(() => import('@/pages/Settings'));
export const LazyCLTAssistant = lazy(() => import('@/pages/CLTAssistant'));
export const LazyTemplates = lazy(() => import('@/pages/Templates'));
export const LazyIntegrations = lazy(() => import('@/pages/Integrations'));
export const LazyCompliance = lazy(() => import('@/pages/Compliance'));
export const LazySetup = lazy(() => import('@/pages/Setup'));
```

#### **Skeleton Loading**
```typescript
const DefaultFallback = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);
```

### **3. PWA (Progressive Web App)**

#### **Manifest Configuration**
```json
{
  "name": "GrowthScale - Gestão de Escalas",
  "short_name": "GrowthScale",
  "description": "Sistema inteligente de gestão de escalas para restaurantes",
  "theme_color": "#f59e0b",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/"
}
```

#### **Service Worker Caching**
```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
      }
    },
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'supabase-cache',
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }
      }
    }
  ]
}
```

#### **PWA Features**
- ✅ **Install Prompt:** Prompt automático para instalação
- ✅ **Offline Support:** Funcionalidade offline básica
- ✅ **Update Notifications:** Notificações de atualização
- ✅ **Background Sync:** Sincronização em background

### **4. Performance Monitoring**

#### **Core Web Vitals Tracking**
```typescript
// src/hooks/usePerformance.tsx
export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    loadTime: null,
  });

  // Observers para métricas
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const fcp = entries[entries.length - 1];
    setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
  });

  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lcp = entries[entries.length - 1];
    setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
  });

  // ... outros observers
}
```

#### **Performance Score Calculation**
```typescript
const getPerformanceScore = () => {
  let score = 100;
  
  // LCP penalty (target: < 2.5s)
  if (metrics.lcp && metrics.lcp > 2500) {
    score -= Math.min(30, (metrics.lcp - 2500) / 100);
  }
  
  // FID penalty (target: < 100ms)
  if (metrics.fid && metrics.fid > 100) {
    score -= Math.min(30, (metrics.fid - 100) / 10);
  }
  
  // CLS penalty (target: < 0.1)
  if (metrics.cls && metrics.cls > 0.1) {
    score -= Math.min(30, metrics.cls * 300);
  }
  
  return Math.max(0, Math.round(score));
};
```

---

## 📊 **MÉTRICAS ATUAIS**

### **Build Performance**
- **Build Time:** 7.59s ✅
- **Bundle Size:** 1.2MB (350KB gzipped) ✅
- **Chunks:** 25 chunks otimizados ✅
- **PWA:** 61 entries precached (3.4MB) ✅

### **Core Web Vitals (Targets)**
- **LCP:** < 2.5s (Monitorado)
- **FID:** < 100ms (Monitorado)
- **CLS:** < 0.1 (Monitorado)
- **TTFB:** < 600ms (Monitorado)

### **Caching Strategy**
- **Fonts:** CacheFirst (1 ano)
- **API:** NetworkFirst (1 dia)
- **Assets:** CacheFirst (1 semana)
- **HTML:** NetworkFirst (1 hora)

---

## 🛠️ **FERRAMENTAS E DEPENDÊNCIAS**

### **Performance Tools**
```json
{
  "vite-plugin-pwa": "^0.19.0",
  "rollup-plugin-visualizer": "^5.12.0",
  "workbox-window": "^7.0.0"
}
```

### **Monitoring Tools**
- **Performance Observer API:** Core Web Vitals
- **Lighthouse CI:** Automated testing
- **Bundle Analyzer:** Visual analysis
- **PWA Builder:** Manifest validation

---

## 🔧 **COMANDOS E SCRIPTS**

### **Build e Análise**
```bash
# Build normal
npm run build

# Build com análise
npm run build:analyze

# Preview build
npm run preview

# Análise de bundle
open dist/stats.html
```

### **Performance Testing**
```bash
# Lighthouse audit
npx lighthouse http://localhost:5173 --output=json

# Bundle analysis
npm run build:analyze

# Performance monitoring
# (Automático via usePerformance hook)
```

---

## 📈 **OTIMIZAÇÕES FUTURAS**

### **ETAPA 5 - Performance Avançada**
1. **Image Optimization**
   - WebP/AVIF conversion
   - Responsive images
   - Lazy loading de imagens

2. **Advanced Caching**
   - Stale-while-revalidate
   - Background sync
   - Push notifications

3. **Bundle Optimization**
   - Dynamic imports
   - Module federation
   - Tree shaking avançado

4. **CDN Implementation**
   - Edge caching
   - Global distribution
   - Compression otimizada

---

## 📝 **CHECKLIST DE PERFORMANCE**

### **Antes do Deploy**
- [ ] Bundle size < 500KB gzipped
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] PWA manifest válido
- [ ] Service worker funcionando
- [ ] Lazy loading implementado
- [ ] Caching configurado

### **Pós-Deploy**
- [ ] Core Web Vitals monitorados
- [ ] Performance score > 90
- [ ] Offline functionality testada
- [ ] Install prompt funcionando
- [ ] Update notifications ativas

---

## 🔧 **TROUBLESHOOTING**

### **Problemas Comuns**

#### **Bundle Size Alto**
```bash
# Analisar bundle
npm run build:analyze

# Identificar chunks grandes
# Otimizar imports
# Implementar tree shaking
```

#### **LCP Lento**
```bash
# Verificar font loading
# Otimizar imagens
# Implementar preload
# Reduzir CSS crítico
```

#### **PWA Não Funciona**
```bash
# Verificar manifest
# Testar service worker
# Validar HTTPS
# Check browser support
```

---

## 📚 **REFERÊNCIAS**

- [Web Vitals](https://web.dev/vitals/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
