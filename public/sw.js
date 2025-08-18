// =====================================================
// SERVICE WORKER - GROWTHSCALE PWA
// Cache offline e funcionalidades PWA
// =====================================================

const CACHE_NAME = 'growthscale-v2.0.0';
const STATIC_CACHE = 'growthscale-static-v2.0.0';
const DYNAMIC_CACHE = 'growthscale-dynamic-v2.0.0';
const API_CACHE = 'growthscale-api-v2.0.0';

// Arquivos essenciais para cache offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/placeholder.svg'
];

// Recursos estáticos importantes
const CRITICAL_ASSETS = [
  '/src/index.css',
  '/src/App.css',
  '/src/main.tsx',
  '/src/App.tsx'
];

// APIs que devem ser cacheadas
const CACHEABLE_APIS = [
  '/api/companies',
  '/api/employees',
  '/api/schedules',
  '/api/templates',
  '/api/settings'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Cache First para assets estáticos
  STATIC_FIRST: 'static-first',
  // Network First para APIs
  NETWORK_FIRST: 'network-first',
  // Stale While Revalidate para dados dinâmicos
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  // Cache Only para recursos críticos
  CACHE_ONLY: 'cache-only'
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.all([
      // Cache de assets estáticos
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 Cacheando assets estáticos...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache de recursos críticos
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('🔑 Cacheando recursos críticos...');
        return cache.addAll(CRITICAL_ASSETS);
      })
    ]).then(() => {
      console.log('✅ Service Worker: Instalação concluída');
      return self.skipWaiting();
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Ativando...');
  
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('🗑️ Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Tomar controle imediato
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker: Ativação concluída');
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Estratégia baseada no tipo de recurso
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(url.pathname)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// Verificar se é asset estático
function isStaticAsset(pathname) {
  return STATIC_ASSETS.includes(pathname) || 
         CRITICAL_ASSETS.some(asset => pathname.includes(asset)) ||
         pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
}

// Verificar se é requisição de API
function isAPIRequest(pathname) {
  return CACHEABLE_APIS.some(api => pathname.includes(api)) ||
         pathname.startsWith('/api/');
}

// Verificar se é requisição HTML
function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

// Estratégia Cache First para assets estáticos
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Erro no cache de assets estáticos:', error);
    return new Response('Offline - Asset não disponível', { status: 503 });
  }
}

// Estratégia Network First para APIs
async function handleAPIRequest(request) {
  try {
    // Tentar network primeiro
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache da resposta
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('🌐 API offline, tentando cache...');
    
    // Fallback para cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Resposta offline para APIs
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Dados não disponíveis offline',
      timestamp: new Date().toISOString()
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Estratégia para requisições HTML
async function handleHTMLRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      return networkResponse;
    }
    
    throw new Error('HTML network response not ok');
  } catch (error) {
    // Fallback para página offline
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Página offline básica
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GrowthScale - Offline</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; }
            .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
          </style>
        </head>
        <body>
          <div class="offline-icon">📱</div>
          <h1>Você está offline</h1>
          <p>Algumas funcionalidades podem não estar disponíveis.</p>
          <button onclick="window.location.reload()">Tentar Novamente</button>
        </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Estratégia Stale While Revalidate para requisições dinâmicas
async function handleDynamicRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Retornar cache imediatamente se disponível
    if (cachedResponse) {
      // Revalidar em background
      fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok) {
          const cache = await caches.open(DYNAMIC_CACHE);
          cache.put(request, networkResponse.clone());
        }
      }).catch(() => {
        // Ignorar erros de revalidação
      });
      
      return cachedResponse;
    }
    
    // Se não há cache, tentar network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Erro em requisição dinâmica:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('🔄 Sincronização em background:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync());
  }
});

// Sincronização de dados offline
async function performBackgroundSync() {
  try {
    // Aqui você pode implementar sincronização de dados offline
    console.log('🔄 Executando sincronização em background...');
    
    // Exemplo: sincronizar dados salvos offline
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncOfflineData(offlineData);
    }
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
  }
}

// Obter dados salvos offline
async function getOfflineData() {
  // Implementar lógica para obter dados salvos offline
  return [];
}

// Sincronizar dados offline
async function syncOfflineData(data) {
  // Implementar lógica de sincronização
  console.log('📤 Sincronizando dados offline:', data);
}

// Notificações push
self.addEventListener('push', (event) => {
  console.log('📱 Push notification recebida');
  
  const options = {
    body: event.data?.text() || 'Nova notificação do GrowthScale',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver',
        icon: '/favicon.ico'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/favicon.ico'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('GrowthScale', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notificação clicada:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  console.log('💬 Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});

console.log('✅ Service Worker carregado'); 
// =====================================================
// MOBILE OPTIMIZATIONS
// =====================================================

// Mobile-specific cache strategy
const MOBILE_CACHE_STRATEGY = {
  CRITICAL: 'cache-first',
  API: 'network-first',
  IMAGES: 'stale-while-revalidate'
};

// Mobile assets to cache
const MOBILE_ASSETS = [
  '/mobile-hero.jpg',
  '/mobile-icons/',
  '/mobile-css/'
];

// Mobile performance monitoring
const mobilePerformanceMetrics = {
  LCP: 'largest-contentful-paint',
  FID: 'first-input-delay',
  CLS: 'cumulative-layout-shift',
  mobileLoadTime: 'mobile-load-time',
  touchResponseTime: 'touch-response-time'
};

// Mobile-specific fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Mobile-specific caching for images
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          // Return cached image immediately
          return response;
        }
        
        // Fetch and cache new image
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
  
  // Mobile-specific caching for CSS/JS
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});

// Mobile push notification handler
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do GrowthScale',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Demo',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GrowthScale', options)
  );
});

// Mobile notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/demo')
    );
  }
});
