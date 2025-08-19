import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  loadTime: number | null;
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    loadTime: null,
  });

  useEffect(() => {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
    });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fid = entries[0];
      setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });

    // Observar métricas
    fcpObserver.observe({ entryTypes: ['paint'] });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    fidObserver.observe({ entryTypes: ['first-input'] });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics(prev => ({ 
        ...prev, 
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
        loadTime: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
      }));
    }

    // Cleanup
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

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

  const logMetrics = () => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log('FCP:', metrics.fcp?.toFixed(2), 'ms');
      console.log('LCP:', metrics.lcp?.toFixed(2), 'ms');
      console.log('FID:', metrics.fid?.toFixed(2), 'ms');
      console.log('CLS:', metrics.cls?.toFixed(3));
      console.log('TTFB:', metrics.ttfb?.toFixed(2), 'ms');
      console.log('Load Time:', metrics.loadTime?.toFixed(2), 'ms');
      console.log('Performance Score:', getPerformanceScore(), '/100');
      console.groupEnd();
    }
  };

  return {
    metrics,
    getPerformanceScore,
    logMetrics,
  };
}
