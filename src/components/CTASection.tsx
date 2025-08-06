import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-roboto">
                Pronto para <span className="text-secondary">Transformar</span> a Gestão da Sua Equipe?
              </h2>
              <p className="text-xl text-white/90 font-roboto leading-relaxed">
                Comece agora mesmo e veja os resultados em menos de 24 horas. 
                Junte-se a centenas de estabelecimentos que já revolucionaram sua gestão.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6">
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
                  <div className="font-semibold">Suporte 24/7</div>
                  <div className="text-sm text-white/80">Sempre à disposição</div>
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
            <div className="flex flex-wrap items-center gap-6">
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
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-roboto">
                Experimente Grátis por 14 Dias
              </h3>
              <p className="text-white/80">
                Sem cartão de crédito • Sem compromisso • Cancele quando quiser
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email Profissional
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              
              <div>
                <Label htmlFor="employees" className="text-white mb-2 block">
                  Número de Funcionários
                </Label>
                <Input
                  id="employees"
                  placeholder="Ex: 25"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 group"
              >
                Começar Teste Grátis Agora
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                Ao se cadastrar, você concorda com nossos{" "}
                <a href="#" className="text-secondary hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-secondary hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;