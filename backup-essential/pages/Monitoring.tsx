import React from 'react';
import { AdvancedMonitoringDashboard } from '@/components/AdvancedMonitoringDashboard';
import { SEOHead } from '@/components/SEOHead';

export default function Monitoring() {
  return (
    <>
      <SEOHead
        title="Advanced Monitoring & APM - GrowthScale"
        description="Dashboard de monitoramento avançado, analytics e performance tracking"
        keywords="monitoring, apm, analytics, performance, tracking, user behavior"
      />
      <div className="min-h-screen bg-background">
        <AdvancedMonitoringDashboard />
      </div>
    </>
  );
}
