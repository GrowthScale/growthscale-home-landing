import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Zap, CheckCircle, Star } from "lucide-react";

const CTASection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('precos');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Content Impactante */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-roboto">
                Pare de Perder Dinheiro. Comece a Ganhar Controle.
              </h2>
              <p className="text-xl text-white/90 font-roboto leading-relaxed max-w-3xl mx-auto">
                Enquanto você lê isso, outros restaurantes estão economizando tempo e dinheiro com o GrowthScale. 
                Não seja o último a descobrir como transformar sua operação.
              </p>
            </div>

            {/* Urgency Indicators */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Oferta Limitada</span>
              </div>
              <p className="text-white/90 text-sm">
                Primeiros 100 clientes ganham 30 dias de consultoria gratuita + setup personalizado
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Setup em 5 min</div>
                  <div className="text-sm text-white/80">Sem complicações</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Suporte Brasileiro</div>
                  <div className="text-sm text-white/80">24/7 em português</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Resultados em 7 dias</div>
                  <div className="text-sm text-white/80">Ou seu dinheiro de volta</div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-white/80">4.9/5 de 500+ clientes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-sm text-white/80">Garantia de 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm text-white/80">LGPD Compliant</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToPricing}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold py-6 px-8 text-lg group shadow-elegant"
                >
                  Começar Agora - É Grátis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/80 text-white bg-white/10 hover:bg-white hover:text-slate-900 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
                >
                  Ver Demonstração (2 min)
                </Button>
              </div>
              
              <p className="text-sm text-white/60">
                ⚡ Setup instantâneo • 💳 Sem cartão de crédito • 🔄 Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;