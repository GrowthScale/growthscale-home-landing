import React from 'react';
import { SecurityDashboard } from '@/components/SecurityDashboard';
import { SEOHead } from '@/components/SEOHead';

export default function Security() {
  return (
    <>
      <SEOHead
        title="Security & Compliance - GrowthScale"
        description="Dashboard de segurança e compliance GDPR com monitoramento avançado"
        keywords="security, compliance, gdpr, audit, privacy, data protection"
      />
      <div className="min-h-screen bg-background">
        <SecurityDashboard />
      </div>
    </>
  );
}
