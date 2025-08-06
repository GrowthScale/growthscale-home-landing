import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-roboto leading-tight">
                GrowthScale: A Revolução na{" "}
                <span className="text-secondary">Gestão de Escalas</span> para o Food Service
              </h1>
              <p className="text-xl text-white/90 max-w-2xl font-roboto leading-relaxed">
                Simplifique a gestão da sua equipe, reduza custos e impulsione o crescimento 
                do seu negócio com a nossa plataforma inovadora.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-elegant group"
              >
                Experimente Grátis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Saiba Mais
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
              <div className="text-white/80">
                <span className="text-sm font-medium">Solução inovadora para gestão de escalas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-white/80 text-sm ml-2">⭐ Avaliação positiva</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-elegant">
              <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-semibold">Vídeo Demonstração</p>
                  <p className="text-sm opacity-80">2:30 min</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">IA</div>
                  <div className="text-xs text-white/80">Inteligente</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">24/7</div>
                  <div className="text-xs text-white/80">Disponível</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">Fácil</div>
                  <div className="text-xs text-white/80">de Usar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;