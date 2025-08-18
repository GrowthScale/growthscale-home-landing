import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSection } from '@/components/ProblemSection';
import { SolutionSection } from '@/components/SolutionSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PricingSection } from '@/components/PricingSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { MobileUrgencyBanner } from '@/components/mobile/MobileUrgencyBanner';
import { MobileCTASection } from '@/components/mobile/MobileCTASection';
import { useMobileDetection } from '@/hooks/useMobileDetection';

export default function Index() {
  const { isMobile } = useMobileDetection();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Urgency Banner */}
      {isMobile && <MobileUrgencyBanner />}
      
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ComparisonSection />
      <FeaturesSection />
      <PricingSection />
      
      {/* Mobile-Optimized CTA Section */}
      {isMobile ? <MobileCTASection /> : <CTASection />}
      
      <Footer />
    </div>
  );
}
