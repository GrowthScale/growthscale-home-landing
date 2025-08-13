import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Users, Brain, AlertTriangle, Calendar, Smartphone, Shield, Clock, Star, Building, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Grátis",
    period: "",
    description: "Experimente o poder da IA sem compromisso",
    icon: Users,
    color: "bg-white border-slate-200",
    features: [
      { text: "Até 5 funcionários", icon: Users },
      { text: "Escalas básicas com IA", icon: Brain },
      { text: "Validação CLT básica", icon: Shield },
      { text: "Suporte por email", icon: Clock }
    ],
    buttonText: "Começar Gratuitamente",
    popular: false,
    recommended: false,
    savings: null
  },
  {
    name: "Professional",
    price: "R$ 49",
    period: "/mês",
    description: "Para restaurantes que querem crescer sem riscos",
    icon: Brain,
    color: "bg-white border-green-200 shadow-lg",
    features: [
      { text: "Até 15 funcionários", icon: Users },
      { text: "IA completa para escalas", icon: Brain },
      { text: "Compliance automático total", icon: Shield },
      { text: "Previsão de ausências", icon: AlertTriangle },
      { text: "App mobile completo", icon: Smartphone },
      { text: "Suporte prioritário", icon: Clock }
    ],
    buttonText: "Escolher Plano Professional",
    popular: true,
    recommended: false,
    savings: "Economia de R$ 2.000/mês"
  },
  {
    name: "Business",
    price: "R$ 99",
    period: "/mês",
    description: "Para operações em crescimento que precisam de poder total",
    icon: Star,
    color: "bg-white border-blue-200 shadow-lg",
    features: [
      { text: "Até 30 funcionários", icon: Users },
      { text: "IA avançada + personalização", icon: Brain },
      { text: "Relatórios de lucratividade", icon: Calendar },
      { text: "Integrações automáticas", icon: Smartphone },
      { text: "Suporte dedicado 24/7", icon: Clock },
      { text: "Consultoria especializada", icon: Shield }
    ],
    buttonText: "Escolher Plano Business",
    popular: false,
    recommended: true,
    savings: "Economia de R$ 5.000/mês"
  },
  {
    name: "Enterprise",
    price: "Sob Consulta",
    period: "",
    description: "Para redes e grandes operações com necessidades únicas",
    icon: Building,
    color: "bg-white border-slate-300 shadow-lg",
    features: [
      { text: "Múltiplas filiais", icon: Building },
      { text: "IA customizada para seu negócio", icon: Brain },
      { text: "Integrações exclusivas", icon: Smartphone },
      { text: "Suporte executivo", icon: Clock },
      { text: "SLA garantido", icon: Shield }
    ],
    buttonText: "Agendar Demonstração",
    popular: false,
    recommended: false,
    enterprise: true,
    savings: "ROI médio de 300%"
  }
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-16 sm:py-20 lg:py-24 bg-slate-50" aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 sm:mb-20">
          <h2 id="pricing-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Um plano para cada tamanho de ambição.
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comece de graça. Cresça sem medo. Sem taxas escondidas, sem surpresas.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-green-500 scale-105' : 
                  plan.recommended ? 'ring-2 ring-blue-500' : 
                  plan.enterprise ? 'ring-2 ring-slate-500' : ''
                } ${plan.color}`}
                role="article"
                aria-labelledby={`plan-title-${index}`}
                tabIndex={0}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Recomendado
                    </Badge>
                  </div>
                )}

                {plan.enterprise && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-slate-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Enterprise
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="mb-4" role="img" aria-label={`Ícone do plano ${plan.name}`}>
                    <IconComponent className="w-12 h-12 mx-auto text-blue-600 mb-3" aria-hidden="true" />
                  </div>
                  <h3 id={`plan-title-${index}`} className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{plan.description}</p>
                  {plan.savings && (
                    <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <FeatureIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                      : plan.recommended
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                      : plan.enterprise
                      ? 'bg-slate-600 hover:bg-slate-700 text-white shadow-lg'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;