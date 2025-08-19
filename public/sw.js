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

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache de assets estáticos
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache de recursos críticos
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(CRITICAL_ASSETS);
      })
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Tomar controle imediato
      self.clients.claim()
    ])
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia Cache First para assets estáticos
  if (request.method === 'GET' && 
      (url.pathname.endsWith('.css') || 
       url.pathname.endsWith('.js') || 
       url.pathname.endsWith('.png') || 
       url.pathname.endsWith('.jpg') || 
       url.pathname.endsWith('.svg') || 
       url.pathname.endsWith('.ico') || 
       url.pathname.endsWith('.woff') || 
       url.pathname.endsWith('.woff2'))) {
    
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          return caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Estratégia Network First para APIs
  if (request.method === 'GET' && url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Estratégia Stale While Revalidate para HTML
  if (request.method === 'GET' && 
      (url.pathname === '/' || url.pathname.endsWith('.html'))) {
    
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });
        
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Fallback para outras requisições
  event.respondWith(fetch(request));
});

// Sincronização em background
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implementar sincronização de dados offline
      Promise.resolve()
    );
  }
});

// Push notifications
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
        title: 'Ver detalhes',
        icon: '/icons/icon-192x192.png'
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

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Gerenciamento de cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATED') {
    // Limpar caches antigos
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== API_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    });
  }
});
