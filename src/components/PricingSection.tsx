import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Users, Brain, AlertTriangle, Calendar, Smartphone, Shield, Clock, Star, Building, ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

const plans = [
  {
    name: "Freemium",
    price: "Grátis",
    period: "",
    description: "Experimente o poder da IA sem compromisso",
    icon: Users,
    color: "bg-white border-slate-200",
    features: [
      { text: "Até 3 funcionários", icon: Users, included: true },
      { text: "Escalas básicas com IA", icon: Brain, included: true },
      { text: "Validação CLT básica", icon: Shield, included: true },
      { text: "Suporte por email", icon: Clock, included: true },
      { text: "Relatórios básicos", icon: Calendar, included: false },
      { text: "App mobile completo", icon: Smartphone, included: false },
      { text: "Integrações", icon: Zap, included: false },
      { text: "Suporte prioritário", icon: Clock, included: false }
    ],
    buttonText: "Começar Gratuitamente",
    popular: false,
    recommended: false,
    savings: null,
    cta: "start-free"
  },
  {
    name: "Starter",
    price: "R$ 49",
    period: "/mês",
    description: "Para restaurantes que querem crescer sem riscos",
    icon: Target,
    color: "bg-white border-green-200 shadow-lg",
    features: [
      { text: "Até 10 funcionários", icon: Users, included: true },
      { text: "IA completa para escalas", icon: Brain, included: true },
      { text: "Compliance automático total", icon: Shield, included: true },
      { text: "Previsão de ausências", icon: AlertTriangle, included: true },
      { text: "App mobile completo", icon: Smartphone, included: true },
      { text: "Relatórios avançados", icon: Calendar, included: true },
      { text: "Integrações básicas", icon: Zap, included: true },
      { text: "Suporte prioritário", icon: Clock, included: false }
    ],
    buttonText: "Escolher Starter",
    popular: true,
    recommended: false,
    savings: "Economia de R$ 1.500/mês",
    cta: "choose-starter"
  },
  {
    name: "Professional",
    price: "R$ 99",
    period: "/mês",
    description: "Para operações em crescimento que precisam de poder total",
    icon: Star,
    color: "bg-white border-blue-200 shadow-lg",
    features: [
      { text: "Até 25 funcionários", icon: Users, included: true },
      { text: "IA avançada + personalização", icon: Brain, included: true },
      { text: "Relatórios de lucratividade", icon: Calendar, included: true },
      { text: "Integrações automáticas", icon: Smartphone, included: true },
      { text: "Suporte dedicado 24/7", icon: Clock, included: true },
      { text: "Consultoria especializada", icon: Shield, included: true },
      { text: "Analytics avançados", icon: TrendingUp, included: true },
      { text: "API personalizada", icon: Zap, included: true }
    ],
    buttonText: "Escolher Professional",
    popular: false,
    recommended: true,
    savings: "Economia de R$ 3.000/mês",
    cta: "choose-professional"
  },
  {
    name: "Enterprise",
    price: "Sob Consulta",
    period: "",
    description: "Para redes e grandes operações com necessidades únicas",
    icon: Building,
    color: "bg-white border-slate-300 shadow-lg",
    features: [
      { text: "Múltiplas filiais", icon: Building, included: true },
      { text: "IA customizada para seu negócio", icon: Brain, included: true },
      { text: "Integrações exclusivas", icon: Smartphone, included: true },
      { text: "Suporte executivo", icon: Clock, included: true },
      { text: "SLA garantido", icon: Shield, included: true },
      { text: "Consultoria dedicada", icon: Star, included: true },
      { text: "Treinamento personalizado", icon: Users, included: true },
      { text: "Roadmap exclusivo", icon: Target, included: true }
    ],
    buttonText: "Falar com Consultor",
    popular: false,
    recommended: false,
    enterprise: true,
    savings: "ROI médio de 300%",
    cta: "contact-consultant"
  }
];

export function PricingSection() {
  const handlePlanSelection = (planName: string, cta: string) => {
    // Analytics tracking
    console.log(`Plan selected: ${planName}, CTA: ${cta}`);
    
    // Redirect based on plan
    if (cta === 'start-free') {
      window.location.href = '/signup?plan=freemium';
    } else if (cta === 'contact-consultant') {
      window.location.href = '/contact?plan=enterprise';
    } else {
      window.location.href = `/signup?plan=${cta}`;
    }
  };

  return (
    <section id="precos" className="py-16 sm:py-20 lg:py-24 bg-slate-50" aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 sm:mb-20">
          <h2 id="pricing-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Escolha o plano ideal para seu negócio
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comece grátis hoje mesmo. Sem cartão de crédito, sem compromisso. 
            Escale conforme seu negócio cresce.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.color} hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-green-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1">
                  Mais Popular
                </Badge>
              )}
              
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                  Recomendado
                </Badge>
              )}

              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-600">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{plan.description}</p>
                  
                  {plan.savings && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                      <p className="text-sm font-medium text-green-800">{plan.savings}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-slate-300 rounded flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-slate-900' : 'text-slate-400'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handlePlanSelection(plan.name, plan.cta)}
                  className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700' : plan.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-500 mb-3" />
              <h4 className="font-semibold text-slate-900 mb-2">Garantia de 30 dias</h4>
              <p className="text-sm text-slate-600">Se não estiver satisfeito, devolvemos 100% do seu dinheiro</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-blue-500 mb-3" />
              <h4 className="font-semibold text-slate-900 mb-2">Setup em 24h</h4>
              <p className="text-sm text-slate-600">Comece a usar em menos de 1 dia, sem complicações</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-purple-500 mb-3" />
              <h4 className="font-semibold text-slate-900 mb-2">Suporte especializado</h4>
              <p className="text-sm text-slate-600">Equipe dedicada para ajudar você a ter sucesso</p>
            </div>
          </div>
        </div>

        {/* FAQ Quick */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Ainda tem dúvidas? 
            <a href="/faq" className="text-primary hover:underline ml-1">Veja nossas perguntas frequentes</a>
          </p>
        </div>
      </div>
    </section>
  );
}