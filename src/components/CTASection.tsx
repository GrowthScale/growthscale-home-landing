import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";

const CTASection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('precos');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contato" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Content */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-roboto">
                Pronto para ter o controle total da sua operação?
              </h2>
              <p className="text-xl text-white/90 font-roboto leading-relaxed max-w-3xl mx-auto">
                Junte-se a centenas de restaurantes que já transformaram sua gestão de escalas 
                com o GrowthScale. Escolha o plano ideal para o seu negócio.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Setup em 5 min</div>
                  <div className="text-sm text-white/80">Rápido e fácil</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Suporte Técnico</div>
                  <div className="text-sm text-white/80">Sempre disponível</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Resultados imediatos</div>
                  <div className="text-sm text-white/80">Em até 24h</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-sm">Certificado ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm">LGPD Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-sm">4.9/5 estrelas</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Button 
                onClick={scrollToPricing}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 px-8 text-lg group shadow-elegant"
              >
                Ver Nossos Planos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;