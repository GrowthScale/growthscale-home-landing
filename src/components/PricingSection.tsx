import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Crown, Users, Brain, AlertTriangle, Calendar, Smartphone, Shield, Clock, Star } from "lucide-react";

const plans = [
  {
    name: "Freemium",
    price: "Grátis",
    period: "",
    description: "Experimente as funcionalidades básicas",
    icon: Users,
    color: "bg-muted border-muted",
    features: [
      { text: "Até 5 funcionários", icon: Users },
      { text: "Escalas básicas", icon: Calendar },
      { text: "Recursos limitados", icon: Clock }
    ],
    buttonText: "Começar Grátis",
    popular: false,
    recommended: false
  },
  {
    name: "Essencial",
    price: "R$ 49",
    period: "/mês",
    description: "Ideal para pequenos estabelecimentos que querem dar o próximo passo na gestão de suas escalas",
    icon: Brain,
    color: "bg-secondary/10 border-secondary",
    features: [
      { text: "Até 10 funcionários", icon: Users },
      { text: "Escalas Inteligentes (IA básica)", icon: Brain },
      { text: "Previsão de Ausências (5 por mês)", icon: AlertTriangle },
      { text: "Suporte por email (24h)", icon: Clock },
      { text: "Acesso via Web", icon: Calendar }
    ],
    buttonText: "Experimentar Essencial",
    popular: false,
    recommended: true
  },
  {
    name: "Starter",
    price: "R$ 99",
    period: "/mês",
    description: "Perfeito para estabelecimentos pequenos",
    icon: Star,
    color: "bg-primary/10 border-primary",
    features: [
      { text: "Até 15 funcionários", icon: Users },
      { text: "Escalas inteligentes completas", icon: Brain },
      { text: "Previsão de ausências ilimitadas", icon: AlertTriangle },
      { text: "Compliance automático", icon: Shield },
      { text: "App mobile", icon: Smartphone }
    ],
    buttonText: "Assinar Starter",
    popular: true,
    recommended: false
  }
];

const comparisonFeatures = [
  { feature: "Número de funcionários", freemium: "Até 5", essencial: "Até 10", starter: "Até 15" },
  { feature: "Escalas inteligentes", freemium: "Básicas", essencial: "IA básica", starter: "IA completa" },
  { feature: "Previsão de ausências", freemium: "❌", essencial: "5 por mês", starter: "Ilimitadas" },
  { feature: "Compliance automático", freemium: "❌", essencial: "❌", starter: "✅" },
  { feature: "App mobile", freemium: "❌", essencial: "❌", starter: "✅" },
  { feature: "Suporte", freemium: "Comunidade", essencial: "Email (24h)", starter: "Prioritário" }
];

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de cobrança."
  },
  {
    question: "Existe desconto para pagamento anual?",
    answer: "Sim, oferecemos 20% de desconto para assinaturas anuais em todos os planos pagos. Entre em contato para mais detalhes."
  },
  {
    question: "O que acontece se eu exceder o limite de funcionários?",
    answer: "Você receberá uma notificação e poderá fazer upgrade para um plano superior ou gerenciar seus funcionários ativos."
  },
  {
    question: "Existe período de teste gratuito?",
    answer: "Sim! Todos os planos pagos têm 14 dias de teste gratuito. Você pode cancelar a qualquer momento sem cobrança."
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte por email para todos os planos. Planos Starter têm suporte prioritário com resposta em até 4 horas."
  }
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-xl bg-muted/30" aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 id="pricing-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto text-balance">
            Planos que Se <span className="text-primary">Adaptam</span> ao Seu Negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto leading-relaxed">
            Escolha o plano ideal para o tamanho da sua operação e comece a transformar 
            sua gestão hoje mesmo
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative p-8 transition-smooth hover:shadow-card focus-within:ring-2 focus-within:ring-primary ${
                  plan.popular ? 'border-primary shadow-elegant transform scale-105' : 
                  plan.recommended ? 'border-secondary shadow-soft' : 'border-border'
                } ${plan.color}`}
                role="article"
                aria-labelledby={`plan-title-${index}`}
                tabIndex={0}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Recomendado
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="mb-4" role="img" aria-label={`Ícone do plano ${plan.name}`}>
                    <IconComponent className="w-12 h-12 mx-auto text-primary mb-3" aria-hidden="true" />
                  </div>
                  <h3 id={`plan-title-${index}`} className="text-2xl font-bold text-card-foreground mb-2 font-roboto">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <FeatureIcon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-card-foreground text-sm">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground shadow-elegant' 
                      : plan.recommended
                      ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-soft'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <section className="mb-16" aria-labelledby="comparison-title">
          <h3 id="comparison-title" className="text-2xl font-bold text-center text-foreground mb-8 font-roboto">
            Compare os Recursos
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-full bg-card rounded-lg border shadow-card">
              <table className="w-full" role="table" aria-label="Comparação de recursos entre planos">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th scope="col" className="text-left p-4 font-semibold text-foreground min-w-[200px]">Recursos</th>
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Freemium</th>
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Essencial</th>
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Starter</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30 transition-smooth">
                      <th scope="row" className="p-4 font-medium text-card-foreground text-left">{item.feature}</th>
                      <td className="p-4 text-center text-muted-foreground">{item.freemium}</td>
                      <td className="p-4 text-center text-muted-foreground">{item.essencial}</td>
                      <td className="p-4 text-center text-muted-foreground">{item.starter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8 font-roboto">
            Perguntas Frequentes
          </h3>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Benefits Info */}
        <div className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-medium">Dados seguros e protegidos</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border">
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-medium">Suporte em português</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border">
              <Check className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-medium">Planos flexíveis</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              Sem taxa de setup
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              Cancele a qualquer momento
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              14 dias grátis
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              Garantia de satisfação
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;