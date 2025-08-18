import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSection } from '@/components/ProblemSection';
import { SolutionSection } from '@/components/SolutionSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ComparisonSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
