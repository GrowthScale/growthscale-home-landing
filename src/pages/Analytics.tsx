import React from 'react';
import { EdgeAnalyticsDashboard } from '@/components/EdgeAnalyticsDashboard';
import { SEOHead } from '@/components/SEOHead';

export default function Analytics() {
  return (
    <>
      <SEOHead
        title="Analytics - GrowthScale"
        description="Dashboard de analytics e performance em tempo real com edge functions"
        keywords="analytics, performance, edge functions, monitoramento, métricas"
      />
      <div className="min-h-screen bg-background">
        <EdgeAnalyticsDashboard />
      </div>
    </>
  );
}
