import React from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { SEOHead } from '@/components/SEOHead';

const OnboardingPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Configuração Inicial - GrowthScale"
        description="Configure sua empresa e comece a usar o GrowthScale para gestão inteligente de escalas."
      />
      <OnboardingFlow />
    </>
  );
};

export default OnboardingPage;
