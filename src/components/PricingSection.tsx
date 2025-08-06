import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown } from "lucide-react";

const plans = [
  {
    name: "Freemium",
    price: "Grátis",
    period: "",
    description: "Experimente as funcionalidades básicas",
    features: [
      "Até 5 funcionários",
      "Escalas básicas",
      "Recursos limitados"
    ],
    buttonText: "Começar Grátis",
    popular: false
  },
  {
    name: "Starter",
    price: "R$ 99",
    period: "/mês",
    description: "Perfeito para estabelecimentos pequenos",
    features: [
      "Até 15 funcionários",
      "Escalas inteligentes completas",
      "Previsão de ausências",
      "Compliance automático",
      "App mobile"
    ],
    buttonText: "Assinar Plano",
    popular: true
  }
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Planos que Se <span className="text-primary">Adaptam</span> ao Seu Negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Escolha o plano ideal para o tamanho da sua operação e comece a transformar 
            sua gestão hoje mesmo
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-8 ${plan.popular ? 'border-primary shadow-elegant scale-105' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2 font-roboto">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular 
                  ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            💳 Planos flexíveis • 
            📞 Suporte em português • 
            🔒 Dados seguros e protegidos
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>✅ Sem taxa de setup</span>
            <span>✅ Cancele a qualquer momento</span>
            <span>✅ Garantia de satisfação</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;