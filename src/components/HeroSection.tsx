import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Brain } from "lucide-react";

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-roboto leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                Deixe de perder tempo e dinheiro com escalas manuais.
              </h1>
              <p className="text-xl text-white/90 max-w-2xl font-roboto leading-relaxed">
                A plataforma com Inteligência Artificial que blinda seu restaurante contra riscos trabalhistas, otimiza sua equipe e prevê seus custos. Em minutos, não em horas.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-4 text-lg shadow-elegant group transition-smooth focus:ring-accent"
                aria-label="Começar gratuitamente no GrowthScale"
              >
                Começar Grátis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/80 text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-4 text-lg backdrop-blur-sm transition-smooth focus:ring-white"
                aria-label="Agendar demonstração do GrowthScale"
              >
                Agendar Demonstração
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
              <div className="text-white/80">
                <span className="text-sm font-medium">Solução inovadora para gestão de escalas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2" role="img" aria-label="Indicadores de usuários satisfeitos">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                      aria-hidden="true"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-white/80 text-sm ml-2" role="img" aria-label="Estrela de avaliação">
                  <span aria-hidden="true">⭐</span> Avaliação positiva
                </span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            {/* TODO: Substituir esta imagem estática por um GIF ou vídeo curto (5-10s) mostrando a interface da plataforma em ação, especificamente o alerta de risco aparecendo em tempo real no calendário. Isso é crucial para a prova visual. */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-elegant">
              <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4" role="img" aria-label="Ícone representando inteligência artificial">
                    <Brain className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <p className="text-lg font-semibold">Escalas Inteligentes</p>
                  <p className="text-sm opacity-80">Otimização com IA</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">IA</div>
                  <div className="text-xs text-white/80">Inteligente</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">Auto</div>
                  <div className="text-xs text-white/80">Compliance</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">Smart</div>
                  <div className="text-xs text-white/80">Previsões</div>
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