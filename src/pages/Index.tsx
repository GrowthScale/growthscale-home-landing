import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollToTop from "@/components/ScrollToTop";
import ProgressIndicator from "@/components/ProgressIndicator";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="GrowthScale - Gestão Inteligente de Escalas para Food Service"
        description="Transforme a gestão da sua equipe com IA. Otimize escalas, reduza custos operacionais em até 30% e garanta compliance trabalhista automaticamente."
      />
      <div className="min-h-screen bg-background font-roboto">
        <ProgressIndicator />
        <Header />
        <main id="main-content">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <ComparisonSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
