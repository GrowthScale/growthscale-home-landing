import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, DollarSign } from 'lucide-react';

export function CTASection() {
  const benefits = [
    {
      icon: Clock,
      text: "Comece a usar em 24 horas"
    },
    {
      icon: DollarSign,
      text: "30 dias grátis, sem compromisso"
    },
    {
      icon: CheckCircle,
      text: "Suporte especializado incluído"
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Transforme suas escalas hoje mesmo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Junte-se a centenas de restaurantes que já economizam tempo e dinheiro com o GrowthScale. 
            A transformação começa agora.
          </p>

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
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Agendar Demonstração
            </Button>
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

          {/* Social proof */}
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