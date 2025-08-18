import React from 'react';
import { Button } from './button-v2';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { Badge } from './badge';
import { Check, Star, TrendingUp, Building, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'gradient' | 'success';
}

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, className }) => {
  const IconComponent = plan.icon;
  
  return (
    <Card className={cn(
      "relative transition-all duration-300 hover:scale-105 hover:shadow-xl",
      plan.popular && "border-primary shadow-glow",
      className
    )}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-pulse-glow">
          Mais Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-6">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-4">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-bold">{plan.price}</span>
          {plan.period && (
            <span className="text-lg text-muted-foreground">/{plan.period}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className={cn(
              "flex items-center text-sm",
              feature.highlight && "font-medium text-primary"
            )}>
              {feature.included ? (
                <Check className="h-4 w-4 text-success mr-3 flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 mr-3 flex-shrink-0" />
              )}
              <span className={cn(
                feature.included ? "text-foreground" : "text-muted-foreground line-through"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={plan.variant || "default"} 
          size="lg" 
          className="w-full"
        >
          {plan.cta}
        </Button>
      </CardContent>
    </Card>
  );
};

// Planos pré-definidos
export const pricingPlans: PricingPlan[] = [
  {
    name: "Freemium",
    price: "Grátis",
    description: "Experimente sem compromisso",
    icon: Users,
    features: [
      { text: "Até 3 funcionários", included: true },
      { text: "Escalas básicas", included: true },
      { text: "Validação CLT básica", included: true },
      { text: "Suporte por email", included: true },
      { text: "IA completa", included: false },
      { text: "App mobile", included: false },
    ],
    cta: "Começar Grátis",
    variant: "outline"
  },
  {
    name: "Starter",
    price: "R$ 49",
    period: "mês",
    description: "Para restaurantes em crescimento",
    icon: Star,
    popular: true,
    features: [
      { text: "Até 10 funcionários", included: true, highlight: true },
      { text: "IA completa", included: true, highlight: true },
      { text: "Compliance automático", included: true },
      { text: "App mobile", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Analytics avançados", included: false },
    ],
    cta: "Escolher Starter",
    variant: "gradient"
  },
  {
    name: "Professional",
    price: "R$ 99",
    period: "mês",
    description: "Para operações em expansão",
    icon: TrendingUp,
    features: [
      { text: "Até 25 funcionários", included: true, highlight: true },
      { text: "IA avançada", included: true },
      { text: "Analytics avançados", included: true },
      { text: "Integrações", included: true },
      { text: "Suporte dedicado", included: true },
      { text: "Múltiplas filiais", included: false },
    ],
    cta: "Escolher Professional",
    variant: "default"
  },
  {
    name: "Enterprise",
    price: "Sob Consulta",
    description: "Para grandes operações",
    icon: Building,
    features: [
      { text: "Múltiplas filiais", included: true, highlight: true },
      { text: "IA customizada", included: true },
      { text: "Integrações exclusivas", included: true },
      { text: "Suporte executivo", included: true },
      { text: "SLA garantido", included: true },
      { text: "Onboarding dedicado", included: true },
    ],
    cta: "Falar com Consultor",
    variant: "outline"
  }
];
