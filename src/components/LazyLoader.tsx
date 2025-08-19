import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export function LazyLoader({ children, fallback }: LazyLoaderProps) {
  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      {children}
    </Suspense>
  );
}

// Lazy components para otimização
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
