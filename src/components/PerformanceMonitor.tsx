import React, { useEffect } from 'react';
import { usePerformance } from '@/hooks/usePerformance';

interface PerformanceMonitorProps {
  showInConsole?: boolean;
  showInUI?: boolean;
}

export function PerformanceMonitor({ showInConsole = true, showInUI = false }: PerformanceMonitorProps) {
  const { metrics, getPerformanceScore, logMetrics } = usePerformance();

  useEffect(() => {
    if (showInConsole) {
      // Log métricas após 3 segundos para permitir carregamento
      const timer = setTimeout(() => {
        logMetrics();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showInConsole, logMetrics]);

  if (!showInUI) {
    return null;
  }

  const score = getPerformanceScore();
  const getScoreColor = (score: number) => {
    if (score >= 90) {return 'text-green-600';}
    if (score >= 70) {return 'text-yellow-600';}
    return 'text-red-600';
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
        Performance Monitor
      </h3>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Score:</span>
          <span className={`font-semibold ${getScoreColor(score)}`}>
            {score}/100
          </span>
        </div>
        
        {metrics.lcp && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">LCP:</span>
            <span className={metrics.lcp < 2500 ? 'text-green-600' : 'text-red-600'}>
              {metrics.lcp.toFixed(0)}ms
            </span>
          </div>
        )}
        
        {metrics.fid && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">FID:</span>
            <span className={metrics.fid < 100 ? 'text-green-600' : 'text-red-600'}>
              {metrics.fid.toFixed(0)}ms
            </span>
          </div>
        )}
        
        {metrics.cls && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">CLS:</span>
            <span className={metrics.cls < 0.1 ? 'text-green-600' : 'text-red-600'}>
              {metrics.cls.toFixed(3)}
            </span>
          </div>
        )}
        
        {metrics.ttfb && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">TTFB:</span>
            <span className={metrics.ttfb < 600 ? 'text-green-600' : 'text-red-600'}>
              {metrics.ttfb.toFixed(0)}ms
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
