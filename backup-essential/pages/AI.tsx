import React from 'react';
import { AIDashboard } from '@/components/AIDashboard';
import { SEOHead } from '@/components/SEOHead';

export default function AI() {
  return (
    <>
      <SEOHead
        title="AI Intelligence - GrowthScale"
        description="Dashboard de inteligência artificial com análise preditiva e detecção de anomalias"
        keywords="ai, machine learning, predictive analytics, anomaly detection, smart alerts, recommendations"
      />
      <div className="min-h-screen bg-background">
        <AIDashboard />
      </div>
    </>
  );
}
