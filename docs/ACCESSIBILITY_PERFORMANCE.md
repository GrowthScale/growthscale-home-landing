# Diretrizes de Acessibilidade e Performance
## GrowthScale - Plataforma de Gestão de Escalas

---

## 1. ACESSIBILIDADE (WCAG AA)

### 1.1 Contraste e Cores

#### Contraste Mínimo
- **Texto normal**: 4.5:1 (WCAG AA)
- **Texto grande**: 3:1 (WCAG AA)
- **Elementos de interface**: 3:1 (WCAG AA)

#### Cores da GrowthScale
```css
/* ✅ Contraste adequado */
.text-primary { color: #2C2C2C; } /* 15.6:1 em fundo branco */
.text-secondary { color: #6B7280; } /* 4.6:1 em fundo branco */
.text-tertiary { color: #9CA3AF; } /* 2.8:1 - NÃO ATENDE */

/* ❌ Contraste insuficiente */
.text-light { color: #D1D5DB; } /* 1.4:1 - NÃO ATENDE */
```

#### Estados de Foco
```css
/* Foco visível em todos elementos interativos */
.focus-visible {
  outline: 2px solid #004AAD;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Para elementos sem outline nativo */
.focus-visible {
  box-shadow: 0 0 0 3px #E6F0FF;
}
```

### 1.2 Navegação por Teclado

#### Ordem de Tab
```html
<!-- Ordem lógica de navegação -->
<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#schedules">Escalas</a>
    <a href="#employees">Funcionários</a>
  </nav>
</header>

<main>
  <button>Gerar Escala</button>
  <table>
    <!-- Tabela acessível -->
  </table>
</main>
```

#### Atalhos de Teclado
```javascript
// Atalhos essenciais
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + N = Nova escala
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    createNewSchedule();
  }
  
  // Ctrl/Cmd + S = Salvar
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveSchedule();
  }
  
  // Escape = Fechar modal
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

### 1.3 Tabelas Acessíveis

#### Estrutura de Tabela
```html
<table role="table" aria-label="Escalas da semana">
  <thead>
    <tr>
      <th scope="col">Funcionário</th>
      <th scope="col">Segunda</th>
      <th scope="col">Terça</th>
      <th scope="col">Quarta</th>
      <th scope="col">Quinta</th>
      <th scope="col">Sexta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">João Silva</th>
      <td>08:00-16:00</td>
      <td>08:00-16:00</td>
      <td>Folga</td>
      <td>08:00-16:00</td>
      <td>08:00-16:00</td>
    </tr>
  </tbody>
</table>
```

#### Tabela Responsiva
```css
/* Para mobile, transformar em cards */
@media (max-width: 768px) {
  table {
    display: block;
  }
  
  thead {
    display: none;
  }
  
  tbody {
    display: block;
  }
  
  tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 1rem;
  }
  
  td {
    display: block;
    text-align: left;
    padding: 0.5rem 0;
    border: none;
  }
  
  td::before {
    content: attr(data-label) ": ";
    font-weight: 600;
  }
}
```

### 1.4 Formulários Acessíveis

#### Labels e Descrições
```html
<!-- ✅ Correto -->
<label for="employee-name">Nome do Funcionário</label>
<input 
  id="employee-name" 
  type="text" 
  aria-describedby="name-help"
  required
/>
<div id="name-help">Digite o nome completo do funcionário</div>

<!-- ❌ Incorreto -->
<input type="text" placeholder="Nome" />
```

#### Validação Acessível
```javascript
// Validação com feedback acessível
function validateEmployeeForm() {
  const name = document.getElementById('employee-name');
  const nameError = document.getElementById('name-error');
  
  if (!name.value.trim()) {
    name.setAttribute('aria-invalid', 'true');
    nameError.textContent = 'Nome é obrigatório';
    nameError.style.display = 'block';
    name.focus();
    return false;
  }
  
  name.setAttribute('aria-invalid', 'false');
  nameError.style.display = 'none';
  return true;
}
```

### 1.5 Modais Acessíveis

#### Estrutura de Modal
```html
<div 
  class="modal" 
  role="dialog" 
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <div class="modal-content">
    <h2 id="modal-title">Publicar Escala</h2>
    <p id="modal-description">Confirme os detalhes antes de publicar</p>
    
    <button 
      class="close-button" 
      aria-label="Fechar modal"
      onclick="closeModal()"
    >
      ×
    </button>
    
    <div class="modal-body">
      <!-- Conteúdo do modal -->
    </div>
    
    <div class="modal-footer">
      <button onclick="closeModal()">Cancelar</button>
      <button onclick="publishSchedule()">Publicar</button>
    </div>
  </div>
</div>
```

#### Gerenciamento de Foco
```javascript
// Capturar foco no modal
function openModal() {
  const modal = document.querySelector('.modal');
  const firstFocusable = modal.querySelector('button, input, select, textarea');
  
  // Salvar elemento que tinha foco
  previouslyFocusedElement = document.activeElement;
  
  // Mostrar modal
  modal.style.display = 'block';
  
  // Focar no primeiro elemento
  firstFocusable.focus();
  
  // Prevenir foco fora do modal
  trapFocus(modal);
}

// Restaurar foco ao fechar
function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  
  // Restaurar foco
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
}
```

### 1.6 Imagens e Ícones

#### Imagens Decorative
```html
<!-- ✅ Imagem decorativa -->
<img src="background.jpg" alt="" role="presentation" />

<!-- ✅ Imagem informativa -->
<img src="schedule-icon.png" alt="Ícone de escala de trabalho" />

<!-- ✅ Imagem complexa -->
<img src="schedule-chart.png" alt="Gráfico de escalas da semana" />
<figcaption>Distribuição de turnos por dia da semana</figcaption>
```

#### Ícones Acessíveis
```html
<!-- ✅ Ícone com texto -->
<button>
  <svg aria-hidden="true">
    <path d="..." />
  </svg>
  <span>Adicionar Funcionário</span>
</button>

<!-- ✅ Ícone sem texto (precisa de aria-label) -->
<button aria-label="Editar escala">
  <svg aria-hidden="true">
    <path d="..." />
  </svg>
</button>
```

---

## 2. PERFORMANCE

### 2.1 Carregamento de Páginas

#### Métricas Alvo
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

#### Otimização de Imagens
```javascript
// Lazy loading de imagens
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

#### Compressão de Imagens
```html
<!-- WebP com fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Descrição da imagem">
</picture>
```

### 2.2 Otimização de Fontes

#### Carregamento de Fontes
```css
/* Preload de fontes críticas */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Bold.woff2') format('woff2');
  font-display: swap;
  font-weight: 700;
}
```

#### Fallback de Fontes
```css
/* Sistema de fontes com fallback */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
```

### 2.3 Code Splitting

#### Lazy Loading de Componentes
```javascript
// React com lazy loading
import React, { lazy, Suspense } from 'react';

const ScheduleEditor = lazy(() => import('./ScheduleEditor'));
const EmployeeManager = lazy(() => import('./EmployeeManager'));
const Reports = lazy(() => import('./Reports'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/schedules" element={<ScheduleEditor />} />
        <Route path="/employees" element={<EmployeeManager />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  );
}
```

#### Bundle Splitting
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

### 2.4 Cache e Storage

#### Service Worker
```javascript
// sw.js
const CACHE_NAME = 'growthscale-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/static/media/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

#### Local Storage para Dados Críticos
```javascript
// Cache de dados essenciais
const cacheData = {
  employees: [],
  schedules: [],
  settings: {}
};

// Salvar no localStorage
function saveToCache(key, data) {
  try {
    localStorage.setItem(`growthscale_${key}`, JSON.stringify(data));
  } catch (error) {
    console.warn('Erro ao salvar no cache:', error);
  }
}

// Recuperar do localStorage
function getFromCache(key) {
  try {
    const data = localStorage.getItem(`growthscale_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Erro ao recuperar do cache:', error);
    return null;
  }
}
```

### 2.5 Estados Offline

#### Detecção de Conectividade
```javascript
// Detectar status da conexão
function updateOnlineStatus() {
  const status = document.getElementById('connection-status');
  
  if (navigator.onLine) {
    status.textContent = 'Online';
    status.className = 'status-online';
    syncOfflineData();
  } else {
    status.textContent = 'Offline';
    status.className = 'status-offline';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
```

#### Sincronização de Dados
```javascript
// Sincronizar dados offline quando online
function syncOfflineData() {
  const offlineActions = JSON.parse(
    localStorage.getItem('growthscale_offline_actions') || '[]'
  );
  
  if (offlineActions.length > 0) {
    offlineActions.forEach(action => {
      // Executar ação
      executeAction(action);
    });
    
    // Limpar ações processadas
    localStorage.removeItem('growthscale_offline_actions');
  }
}

// Salvar ação para execução offline
function saveOfflineAction(action) {
  const offlineActions = JSON.parse(
    localStorage.getItem('growthscale_offline_actions') || '[]'
  );
  
  offlineActions.push({
    ...action,
    timestamp: Date.now()
  });
  
  localStorage.setItem('growthscale_offline_actions', JSON.stringify(offlineActions));
}
```

---

## 3. CHECKLIST DE TESTES

### 3.1 Testes de Acessibilidade

#### Teste Manual
- [ ] Navegação completa por teclado
- [ ] Contraste de cores adequado
- [ ] Foco visível em todos elementos
- [ ] Labels em todos formulários
- [ ] Textos alternativos em imagens
- [ ] Estrutura de cabeçalhos correta
- [ ] Tabelas com headers apropriados
- [ ] Modais com escape e foco adequado

#### Teste com Leitor de Tela
- [ ] NVDA (Windows)
- [ ] VoiceOver (macOS)
- [ ] TalkBack (Android)
- [ ] Screen Reader (iOS)

#### Ferramentas Automatizadas
- [ ] axe-core
- [ ] Lighthouse Accessibility
- [ ] WAVE Web Accessibility Evaluator
- [ ] pa11y

### 3.2 Testes de Performance

#### Métricas Core Web Vitals
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

#### Testes de Carga
- [ ] 100 usuários simultâneos
- [ ] Tempo de resposta < 2s
- [ ] Taxa de erro < 1%

#### Testes Mobile
- [ ] 3G lento (1.6 Mbps)
- [ ] CPU limitado (4x throttling)
- [ ] Memória limitada (512MB)

### 3.3 Testes de Usabilidade

#### Tarefas Críticas
- [ ] Criar escala em < 3 cliques
- [ ] Adicionar funcionário em < 2 minutos
- [ ] Publicar escala em < 30 segundos
- [ ] Encontrar relatório em < 10 segundos

#### Testes de Usuário
- [ ] 5 usuários completam tarefas sem ajuda
- [ ] Taxa de sucesso > 90%
- [ ] Tempo médio de conclusão < 5 minutos
- [ ] Satisfação > 4.5/5

---

## 4. MONITORAMENTO

### 4.1 Métricas de Acessibilidade
```javascript
// Tracking de uso de recursos de acessibilidade
function trackAccessibilityUsage() {
  // Detectar uso de leitor de tela
  const screenReader = window.speechSynthesis || 
                      window.webkitSpeechSynthesis;
  
  if (screenReader) {
    analytics.track('accessibility_screen_reader_used');
  }
  
  // Detectar navegação por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      analytics.track('accessibility_keyboard_navigation');
    }
  });
}
```

### 4.2 Métricas de Performance
```javascript
// Core Web Vitals
function trackCoreWebVitals() {
  // FCP
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        analytics.track('performance_fcp', { value: entry.startTime });
      }
    }
  }).observe({ entryTypes: ['paint'] });
  
  // LCP
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        analytics.track('performance_lcp', { value: entry.startTime });
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}
```

---

## 5. DOCUMENTAÇÃO PARA DESENVOLVEDORES

### 5.1 Checklist de Implementação

#### Para Cada Componente
- [ ] Contraste de cores adequado
- [ ] Navegação por teclado
- [ ] Labels e aria-labels
- [ ] Estados de foco visíveis
- [ ] Textos alternativos
- [ ] Performance otimizada

#### Para Cada Página
- [ ] Estrutura de cabeçalhos
- [ ] Skip links
- [ ] Breadcrumbs
- [ ] Navegação principal
- [ ] Conteúdo principal
- [ ] Rodapé

### 5.2 Recursos e Ferramentas

#### Ferramentas de Desenvolvimento
- [ ] axe DevTools
- [ ] Lighthouse
- [ ] WebPageTest
- [ ] GTmetrix

#### Bibliotecas Recomendadas
- [ ] @axe-core/react
- [ ] react-aria
- [ ] @radix-ui/react-dialog
- [ ] @radix-ui/react-select

#### Documentação
- [ ] WCAG 2.1 Guidelines
- [ ] Web.dev Performance
- [ ] MDN Web Docs
- [ ] A11y Project

---

Este documento garante que a GrowthScale seja acessível, performática e ofereça uma experiência de usuário excepcional para todos os usuários, independentemente de suas capacidades ou condições de conectividade.
