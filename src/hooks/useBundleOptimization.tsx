import { useEffect, useCallback, useState } from 'react';

interface BundleMetrics {
  totalSize: number;
  chunkCount: number;
  loadTime: number;
  parseTime: number;
  executionTime: number;
}

interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  type?: 'script' | 'style' | 'image' | 'font';
  crossorigin?: 'anonymous' | 'use-credentials';
}

export function useBundleOptimization() {
  const [metrics, setMetrics] = useState<BundleMetrics | null>(null);

  // Medir performance do bundle
  const measureBundlePerformance = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigationEntry) return;

    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const scriptEntries = resourceEntries.filter(entry => entry.initiatorType === 'script');

    const totalSize = scriptEntries.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
    const loadTime = scriptEntries.reduce((sum, entry) => sum + entry.duration, 0);
    const parseTime = scriptEntries.reduce((sum, entry) => {
      return sum + (entry.responseEnd - entry.responseStart);
    }, 0);

    setMetrics({
      totalSize,
      chunkCount: scriptEntries.length,
      loadTime,
      parseTime,
      executionTime: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
    });
  }, []);

  // Pré-carregar recursos críticos
  const preloadResource = useCallback((url: string, options: PreloadOptions = {}) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = options.type || 'script';
    
    if (options.priority) {
      link.setAttribute('importance', options.priority);
    }
    
    if (options.crossorigin) {
      link.crossOrigin = options.crossorigin;
    }

    document.head.appendChild(link);
  }, []);

  // Pré-carregar múltiplos recursos
  const preloadMultiple = useCallback((resources: Array<{ url: string; options?: PreloadOptions }>) => {
    resources.forEach(({ url, options }) => {
      preloadResource(url, options);
    });
  }, [preloadResource]);

  // Pré-carregar chunks baseado na navegação
  const preloadRouteChunks = useCallback((route: string) => {
    const routeChunks: Record<string, string[]> = {
      '/dashboard': ['/assets/Dashboard-*.js'],
      '/schedules': ['/assets/Schedules-*.js'],
      '/employees': ['/assets/Employees-*.js'],
      '/companies': ['/assets/Companies-*.js'],
      '/settings': ['/assets/Settings-*.js'],
    };

    const chunks = routeChunks[route] || [];
    chunks.forEach(chunk => {
      preloadResource(chunk, { type: 'script', priority: 'low' });
    });
  }, [preloadResource]);

  // Otimizar carregamento de fontes
  const optimizeFontLoading = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Preload fontes críticas
    preloadResource('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap', {
      type: 'style',
      priority: 'high',
    });

    // Font display swap
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `;
    document.head.appendChild(style);
  }, [preloadResource]);

  // Otimizar carregamento de CSS crítico
  const optimizeCriticalCSS = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Inline CSS crítico
    const criticalCSS = `
      .bg-background { background-color: hsl(var(--background)); }
      .text-foreground { color: hsl(var(--foreground)); }
      .bg-primary { background-color: hsl(var(--primary)); }
      .text-primary-foreground { color: hsl(var(--primary-foreground)); }
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .min-h-screen { min-height: 100vh; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);
  }, []);

  // Lazy load não crítico
  const lazyLoadNonCritical = useCallback(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const lazySrc = element.getAttribute('data-lazy-src');
          
          if (lazySrc) {
            if (element.tagName === 'IMG') {
              (element as HTMLImageElement).src = lazySrc;
            } else if (element.tagName === 'SCRIPT') {
              const script = document.createElement('script');
              script.src = lazySrc;
              document.head.appendChild(script);
            }
            
            element.removeAttribute('data-lazy-src');
            observer.unobserve(element);
          }
        }
      });
    }, {
      rootMargin: '50px',
    });

    // Observar elementos com data-lazy-src
    document.querySelectorAll('[data-lazy-src]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Otimizar carregamento de ícones
  const optimizeIconLoading = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Preload ícones críticos
    const criticalIcons = [
      'chevron-right',
      'play',
      'shield',
      'zap',
      'arrow-right',
      'arrow-left',
      'search',
      'award',
      'check-circle',
      'eye',
      'user',
      'map-pin',
      'x-circle',
      'trending-up',
      'credit-card',
      'bell',
      'dollar-sign',
      'book-open',
      'copy',
      'globe',
      'menu',
      'pen-square',
      'download',
      'alert-triangle',
      'separator',
      'external-link',
      'save',
      'refresh-cw',
      'trash-2',
      'textarea',
      'sparkles',
    ];

    criticalIcons.forEach(icon => {
      preloadResource(`/assets/${icon}-*.js`, {
        type: 'script',
        priority: 'low',
      });
    });
  }, [preloadResource]);

  // Medir e otimizar performance
  useEffect(() => {
    const optimize = () => {
      optimizeFontLoading();
      optimizeCriticalCSS();
      optimizeIconLoading();
      
      // Medir após carregamento
      window.addEventListener('load', () => {
        setTimeout(measureBundlePerformance, 100);
      });
    };

    optimize();
  }, [optimizeFontLoading, optimizeCriticalCSS, optimizeIconLoading, measureBundlePerformance]);

  // Lazy load não crítico após carregamento inicial
  useEffect(() => {
    const timer = setTimeout(lazyLoadNonCritical, 1000);
    return () => clearTimeout(timer);
  }, [lazyLoadNonCritical]);

  return {
    metrics,
    preloadResource,
    preloadMultiple,
    preloadRouteChunks,
    measureBundlePerformance,
  };
}

// Hook para otimização específica de rotas
export function useRouteOptimization(route: string) {
  const { preloadRouteChunks } = useBundleOptimization();

  useEffect(() => {
    preloadRouteChunks(route);
  }, [route, preloadRouteChunks]);
}

// Hook para otimização de componentes pesados
export function useComponentOptimization(componentName: string) {
  const { preloadResource } = useBundleOptimization();

  useEffect(() => {
    // Preload componentes específicos
    const componentChunks: Record<string, string> = {
      'Dashboard': '/assets/Dashboard-*.js',
      'Schedules': '/assets/Schedules-*.js',
      'Employees': '/assets/Employees-*.js',
      'Companies': '/assets/Companies-*.js',
      'Settings': '/assets/Settings-*.js',
      'CLTAssistant': '/assets/CLTAssistant-*.js',
      'Templates': '/assets/Templates-*.js',
      'Integrations': '/assets/Integrations-*.js',
      'Compliance': '/assets/Compliance-*.js',
      'Setup': '/assets/Setup-*.js',
    };

    const chunk = componentChunks[componentName];
    if (chunk) {
      preloadResource(chunk, { type: 'script', priority: 'low' });
    }
  }, [componentName, preloadResource]);
}
