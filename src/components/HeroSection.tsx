import { SecondaryButton, OutlineButton } from "@/components/ui/accessible-button";
import { PlayCircle } from "lucide-react";
import { landingPageCopy } from "@/constants/neuromarketing";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden gradient-hero">
      {/* Background with overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* ANOTAÇÃO PARA O VISUAL: */}
        {/* TODO: Substituir este placeholder por um vídeo de fundo (com overlay escuro) ou GIF de alta qualidade mostrando a interface do GrowthScale em ação: o calendário sendo preenchido, os alertas aparecendo. Deve ser sutil e elegante. */}
        <div className="w-full h-full gradient-hero"></div>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-primary-900/50"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* Trust Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
            <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
            {landingPageCopy.hero.trustBadge}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-lg animate-fade-in">
          {landingPageCopy.hero.h1}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md animate-slide-up">
          {landingPageCopy.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8">
          <SecondaryButton 
            size="xl"
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            ariaLabel="Começar a usar GrowthScale gratuitamente"
          >
            {landingPageCopy.hero.ctaPrimary}
          </SecondaryButton>
          
          <OutlineButton 
            size="xl"
            icon={<PlayCircle className="h-6 w-6" />}
            className="border-white text-white hover:bg-white hover:text-primary-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            ariaLabel="Ver demonstração do GrowthScale"
          >
            {landingPageCopy.hero.ctaSecondary}
          </OutlineButton>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span>500+ restaurantes confiam</span>
          </div>
          
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>4.8/5 estrelas</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;