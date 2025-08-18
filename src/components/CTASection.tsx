import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Shield, Zap, Users } from 'lucide-react';

export function CTASection() {
  const benefits = [
    {
      icon: Clock,
      text: "Setup em 24 horas"
    },
    {
      icon: Shield,
      text: "Garantia de 30 dias"
    },
    {
      icon: CheckCircle,
      text: "Suporte especializado incluído"
    }
  ];

  const socialProof = [
    "500+ restaurantes ativos",
    "98% de satisfação",
    "Economia média de R$ 2.500/mês"
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Comece a economizar hoje mesmo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Junte-se a centenas de restaurantes que já economizam tempo e dinheiro com o GrowthScale. 
            Comece grátis, sem cartão de crédito.
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {socialProof.map((proof, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{proof}</span>
              </div>
            ))}
          </div>

          {/* Benefícios rápidos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <benefit.icon className="w-4 h-4 text-primary" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => window.location.href = '/signup?plan=freemium'}
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = '/#precos'}
            >
              Ver Todos os Planos
            </Button>
          </div>

          {/* Urgency Banner */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-red-800">Oferta Limitada</h3>
            </div>
            <p className="text-sm text-red-700 mb-4">
              Primeiros 100 usuários ganham 30 dias de Professional grátis
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-red-600">
              <Clock className="w-4 h-4" />
              <span>Restam apenas 23 vagas</span>
            </div>
          </div>

          {/* Garantia */}
          <div className="bg-background rounded-xl p-6 border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              🛡️ Garantia de 30 dias
            </h3>
            <p className="text-sm text-muted-foreground">
              Se em 30 dias você não estiver satisfeito, devolvemos 100% do seu dinheiro. 
              Sem perguntas, sem complicações.
            </p>
          </div>

          {/* Social proof final */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Confiado por restaurantes em todo o Brasil
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">Restaurante XYZ</div>
              <div className="text-sm font-medium">Bar & Grill ABC</div>
              <div className="text-sm font-medium">Café Central</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}