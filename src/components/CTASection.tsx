import { SecondaryButton } from "@/components/ui/accessible-button";
import { ShieldCheck } from "lucide-react";
import { landingPageCopy } from "@/constants/neuromarketing";

const CTASection = () => {
  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-24 gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in">
          {landingPageCopy.cta.title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto animate-slide-up">
          {landingPageCopy.cta.subtitle}
        </p>

        {/* CTA Button */}
        <div className="mb-8">
          <SecondaryButton 
            size="xl"
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            ariaLabel="Começar a usar GrowthScale gratuitamente"
          >
            {landingPageCopy.cta.cta}
          </SecondaryButton>
        </div>

        {/* Urgency Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white/90 animate-pulse">
          <span className="w-2 h-2 bg-destructive rounded-full mr-2 animate-ping"></span>
          {landingPageCopy.cta.urgency}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">14 dias grátis</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Cancele quando quiser</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Suporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;