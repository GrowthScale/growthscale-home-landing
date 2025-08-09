# 🏗️ Arquitetura GrowthScale

## 📋 Visão Geral da Arquitetura

O GrowthScale é uma aplicação PWA (Progressive Web App) construída com arquitetura moderna, focada em performance, segurança e escalabilidade.

## 🎯 Princípios Arquiteturais

### 1. **Mobile-First**
- Design responsivo como prioridade
- PWA para experiência nativa
- Otimização para dispositivos móveis

### 2. **Segurança por Design**
- Validação em todas as camadas
- Sanitização de dados
- Rate limiting
- HTTPS obrigatório

### 3. **Performance First**
- Lazy loading
- Code splitting
- Cache inteligente
- Otimização de bundle

### 4. **Acessibilidade Universal**
- WCAG AA compliance
- Screen reader support
- Keyboard navigation
- High contrast support

## 🏛️ Estrutura de Camadas

```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│  (React Components + UI Library)   │
├─────────────────────────────────────┤
│           Business Logic            │
│     (Hooks + Context + Utils)     │
├─────────────────────────────────────┤
│           Data Layer               │
│    (Supabase + Local Storage)      │
├─────────────────────────────────────┤
│           Infrastructure           │
│   (PWA + Service Worker + Cache)  │
└─────────────────────────────────────┘
```

## 📁 Estrutura de Pastas

```
growthscale-home-landing/
├── 📁 src/
│   ├── 📁 components/           # Componentes reutilizáveis
│   │   ├── 📁 ui/              # shadcn/ui components
│   │   ├── 📁 dashboard/       # Dashboard components
│   │   ├── 📁 employees/       # Employee management
│   │   ├── 📁 schedules/       # Schedule management
│   │   ├── 📁 companies/       # Company management
│   │   └── 📁 wizard/          # Setup wizard
│   ├── 📁 pages/               # Páginas da aplicação
│   ├── 📁 hooks/               # Custom hooks
│   ├── 📁 contexts/            # React contexts
│   ├── 📁 lib/                 # Utilitários e configurações
│   └── 📁 integrations/        # Integrações externas
├── 📁 public/                  # Assets estáticos
├── 📁 docs/                    # Documentação
└── 📁 supabase/                # Configuração Supabase
```

## 🔧 Stack Tecnológico

### Frontend
- **React 18**: Biblioteca principal
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS
- **shadcn/ui**: Component library

### Backend & Infraestrutura
- **Supabase**: Backend as a Service
  - Authentication
  - Database (PostgreSQL)
  - Real-time subscriptions
  - Storage

### PWA & Performance
- **Service Worker**: Cache e offline
- **Manifest.json**: Configuração PWA
- **Lazy Loading**: Code splitting
- **Error Boundaries**: Tratamento de erros

## 🔄 Fluxo de Dados

### 1. **Autenticação**
```
User Input → Validation → Supabase Auth → Context → Protected Routes
```

### 2. **Gestão de Estado**
```
Local State → Context → Supabase → Real-time Updates → UI
```

### 3. **Cache Strategy**
```
Request → Service Worker → Cache → Network → Update Cache
```

### 4. **Simulador de Custo em Tempo Real**
```
Schedule Changes → React Query → costCalculationService → Supabase Edge Function → Real-time Cost Updates → UI
```

## 🛡️ Segurança

### Camadas de Segurança

1. **Input Validation**
   - Sanitização de dados
   - Validação de tipos
   - Rate limiting

2. **Authentication**
   - Supabase Auth
   - JWT tokens
   - Session management

3. **Data Protection**
   - HTTPS obrigatório
   - CORS configuration
   - XSS prevention

4. **Environment Security**
   - Variáveis de ambiente
   - Secrets management
   - No hardcoded keys

## 📱 PWA Architecture

### Service Worker Strategy
```javascript
// Cache Strategy: Cache First, Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

### Manifest Configuration
```json
{
  "name": "GrowthScale",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#0ea5e9",
  "background_color": "#ffffff"
}
```

## 🔍 Performance Architecture

### Code Splitting
- **Route-based**: Lazy loading de páginas
- **Component-based**: Componentes pesados
- **Vendor splitting**: Bibliotecas externas

## 💰 Simulador de Custo Architecture

### Component Integration
```
ScheduleEditor
    ↓
Painel de Análise de Risco + Painel de Custo (Grid Layout)
    ↓
React Query (scheduleCost) + costCalculationService
    ↓
Supabase Edge Function (calculate-schedule-cost)
    ↓
Real-time Cost Updates
```

### Performance Features
- **Query Optimization**: Habilitada apenas quando há dados de escala
- **Cache Strategy**: Chave baseada em `shifts` e `employees`
- **Real-time Updates**: Recálculo automático com cada alteração
- **Responsive Layout**: Grid de 2 colunas em telas grandes, empilhado em telas pequenas

### Caching Strategy
- **Static assets**: Cache longo
- **API responses**: Cache médio
- **User data**: Cache curto

### Bundle Optimization
- **Tree shaking**: Remoção de código não usado
- **Minification**: Compressão de código
- **Gzip compression**: Compressão de transferência

## 🎨 Design System Architecture

### Token System
```css
:root {
  --primary: 194 74% 45%;
  --secondary: 120 60% 35%;
  --accent: 25 95% 45%;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  /* ... */
}
```

### Component Hierarchy
```
Base Components (shadcn/ui)
    ↓
Domain Components (Dashboard, Employees, etc.)
    ↓
Page Components (Pages)
    ↓
App Component
```

## 🔄 State Management

### Context Pattern
```typescript
// AuthContext
const AuthContext = createContext<AuthContextType>();

// Usage
const { user, signIn, signOut } = useAuth();
```

### Local State Strategy
- **Form state**: React Hook Form
- **UI state**: useState/useReducer
- **Server state**: Supabase real-time

## 📊 Monitoring & Analytics

### Error Tracking
- Error boundaries
- Console logging
- User feedback

### Performance Monitoring
- Core Web Vitals
- Bundle analysis
- Runtime metrics

## 🚀 Deployment Architecture

### Build Process
```
Source Code → TypeScript Compilation → Bundle → Optimization → Static Files
```

### Deployment Strategy
- **Static hosting**: Vercel/Netlify
- **CDN**: Global distribution
- **HTTPS**: SSL/TLS obrigatório

## 🔮 Future Architecture

### Planned Improvements
- **Micro-frontends**: Modular architecture
- **GraphQL**: Flexible data fetching
- **WebAssembly**: Performance critical parts
- **Edge computing**: Serverless functions

### Scalability Considerations
- **Horizontal scaling**: Load balancing
- **Database optimization**: Indexing strategy
- **Caching layers**: Redis integration
- **Monitoring**: APM tools

---

## 📋 Checklist de Arquitetura

- ✅ **Separation of Concerns**: Camadas bem definidas
- ✅ **Security First**: Validação em todas as camadas
- ✅ **Performance Optimized**: Lazy loading e caching
- ✅ **Accessibility**: WCAG compliance
- ✅ **PWA Ready**: Service worker e manifest
- ✅ **Mobile First**: Responsive design
- ✅ **Type Safety**: TypeScript strict mode
- ✅ **Error Handling**: Boundaries e fallbacks 