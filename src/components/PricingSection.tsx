import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Crown, Users, Brain, AlertTriangle, Calendar, Smartphone, Shield, Clock, Star, Building, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Grátis",
    period: "",
    description: "Experimente o poder da IA sem compromisso",
    icon: Users,
    color: "bg-muted border-muted",
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
    color: "bg-secondary/10 border-secondary",
    features: [
      { text: "Até 15 funcionários", icon: Users },
      { text: "IA completa para escalas", icon: Brain },
      { text: "Compliance automático total", icon: Shield },
      { text: "Previsão de ausências", icon: AlertTriangle },
      { text: "App mobile completo", icon: Smartphone },
      { text: "Suporte prioritário", icon: Clock }
    ],
    buttonText: "Começar Agora",
    popular: true,
    recommended: false,
    savings: "Economia de R$ 2.000/mês"
  },
  {
    name: "Business",
    price: "R$ 99",
    period: "/mês",
    description: "Para operações que querem dominar o mercado",
    icon: Star,
    color: "bg-primary/10 border-primary",
    features: [
      { text: "Até 30 funcionários", icon: Users },
      { text: "IA avançada + personalização", icon: Brain },
      { text: "Relatórios de lucratividade", icon: Calendar },
      { text: "Integrações automáticas", icon: Smartphone },
      { text: "Suporte dedicado 24/7", icon: Clock },
      { text: "Consultoria especializada", icon: Shield }
    ],
    buttonText: "Escalar Agora",
    popular: false,
    recommended: true,
    savings: "Economia de R$ 5.000/mês"
  },
  {
    name: "Enterprise",
    price: "Sob Consulta",
    period: "",
    description: "Soluções personalizadas para grandes operações",
    icon: Building,
    color: "bg-accent/10 border-primary",
    features: [
      { text: "Múltiplas filiais", icon: Building },
      { text: "IA customizada para seu negócio", icon: Brain },
      { text: "Integrações exclusivas", icon: Smartphone },
      { text: "Suporte executivo", icon: Clock },
      { text: "SLA garantido", icon: Shield }
    ],
    buttonText: "Falar com Especialista",
    popular: false,
    recommended: false,
    enterprise: true,
    savings: "ROI médio de 300%"
  }
];

const comparisonFeatures = [
  { feature: "Funcionários", starter: "Até 5", professional: "Até 15", business: "Até 30", enterprise: "Ilimitado" },
  { feature: "IA para Escalas", starter: "Básica", professional: "Completa", business: "Avançada", enterprise: "Customizada" },
  { feature: "Compliance CLT", starter: "Básico", professional: "Automático", business: "Total", enterprise: "Personalizado" },
  { feature: "Previsão de Ausências", starter: "Não", professional: "Sim", business: "Avançada", enterprise: "Customizada" },
  { feature: "App Mobile", starter: "Não", professional: "Sim", business: "Completo", enterprise: "Exclusivo" },
  { feature: "Suporte", starter: "Email", professional: "Prioritário", business: "Dedicado", enterprise: "Executivo" },
  { feature: "Integrações", starter: "Não", professional: "Básicas", business: "Avançadas", enterprise: "Exclusivas" },
  { feature: "Relatórios", starter: "Básicos", professional: "Completos", business: "Avançados", enterprise: "Customizados" }
];

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer: "Sim! Você pode fazer upgrade ou downgrade instantaneamente. As mudanças são aplicadas imediatamente, sem taxas extras."
  },
  {
    question: "Existe desconto para pagamento anual?",
    answer: "Sim! Economize 20% com pagamento anual em todos os planos pagos. É como ganhar 2 meses de graça."
  },
  {
    question: "O que acontece se eu exceder o limite de funcionários?",
    answer: "Você receberá um alerta amigável e poderá fazer upgrade para um plano superior. Sem interrupções na operação."
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Starter: Email (24h). Professional: Chat + Email (4h). Business: WhatsApp + Telefone (1h). Enterprise: Gerente dedicado."
  },
  {
    question: "O plano Enterprise é realmente personalizado?",
    answer: "Absolutamente! Nossa equipe de especialistas analisa sua operação e cria uma solução sob medida para suas necessidades específicas."
  }
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-xl bg-muted/30" aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Impactante */}
        <header className="text-center mb-16">
          <h2 id="pricing-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto text-balance">
            Escolha seu <span className="text-primary">Caminho para o Sucesso</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto leading-relaxed">
            Planos que crescem junto com seu negócio. Comece grátis e escale conforme sua operação evolui.
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative p-8 transition-all duration-300 hover:shadow-card focus-within:ring-2 focus-within:ring-primary ${
                  plan.popular ? 'border-primary shadow-elegant transform scale-105' : 
                  plan.recommended ? 'border-secondary shadow-soft' : 
                  plan.enterprise ? 'border-primary shadow-elegant' : 'border-border'
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

                {plan.enterprise && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Enterprise
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
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
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
                      : plan.enterprise
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
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

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-roboto">
              Calcule seu ROI
            </h3>
            <p className="text-lg text-muted-foreground">
              Veja quanto você pode economizar com o GrowthScale
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">R$ 2.000</div>
              <div className="text-muted-foreground">Economia média mensal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">20h</div>
              <div className="text-muted-foreground">Tempo economizado por mês</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">300%</div>
              <div className="text-muted-foreground">ROI médio em 6 meses</div>
            </div>
          </div>
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
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Starter</th>
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Professional</th>
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Business</th>
                    <th scope="col" className="text-center p-4 font-semibold text-foreground min-w-[120px]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30 transition-smooth">
                      <th scope="row" className="p-4 font-medium text-card-foreground text-left">{item.feature}</th>
                      <td className="p-4 text-center text-muted-foreground">{item.starter}</td>
                      <td className="p-4 text-center text-muted-foreground">{item.professional}</td>
                      <td className="p-4 text-center text-muted-foreground">{item.business}</td>
                      <td className="p-4 text-center text-muted-foreground">{item.enterprise}</td>
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
              Garantia de satisfação
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              Suporte técnico incluído
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;