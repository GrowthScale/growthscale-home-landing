import { Brain, Zap, Shield, Users, Clock, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const coreFeatures = [
  {
    icon: Brain,
    title: "IA que Pensa como Você",
    description: "Nossa inteligência artificial aprende com seus padrões e cria escalas que fazem sentido para o seu negócio. Sem configurações complexas.",
    benefit: "Escalas perfeitas em 30 segundos",
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: Shield,
    title: "Proteção Automática CLT",
    description: "Cada escala é validada contra 47 regras trabalhistas em tempo real. Receba alertas antes de cometer erros caros.",
    benefit: "Zero multas trabalhistas",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Zap,
    title: "Otimização Inteligente",
    description: "Algoritmos preditivos que antecipam ausências, otimizam custos e garantem a melhor distribuição de turnos.",
    benefit: "Redução de 30% nos custos",
    color: "from-orange-500 to-red-600"
  }
];

const powerFeatures = [
  {
    title: "Previsão de Ausências",
    description: "Antecipe faltas com 85% de precisão",
    icon: TrendingUp
  },
  {
    title: "Comunicação Automática",
    description: "WhatsApp integrado para notificações",
    icon: Users
  },
  {
    title: "Relatórios Inteligentes",
    description: "Insights que geram economia real",
    icon: CheckCircle
  },
  {
    title: "Compliance Total",
    description: "Cobertura completa da legislação",
    icon: Shield
  }
];

const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Impactante */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Tecnologia que Transforma <span className="text-primary">Resultados Reais</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Não é apenas software. É seu parceiro estratégico para dominar a gestão de escalas 
            e maximizar o lucro do seu restaurante.
          </p>
        </div>

        {/* Core Features - Grid 3 Colunas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <article
                key={index}
                className="group relative p-8 bg-card rounded-2xl border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary"
                role="article"
                aria-labelledby={`feature-title-${index}`}
              >
                <div className="mb-6">
                  <div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    role="img" 
                    aria-label={`Ícone da funcionalidade ${feature.title}`}
                  >
                    <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 id={`feature-title-${index}`} className="text-2xl font-semibold text-card-foreground mb-3 font-roboto">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-roboto leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="text-lg font-bold text-primary">
                    {feature.benefit}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Power Features - Grid 2x2 */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-roboto">
              Funcionalidades que Fazem a Diferença
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recursos avançados que transformam a gestão de escalas em vantagem competitiva
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {powerFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-md transition-smooth">
                  <IconComponent className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-card-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Proof com Métricas */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Restaurantes Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50.000+</div>
            <div className="text-muted-foreground">Escalas Geradas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">R$ 2M+</div>
            <div className="text-muted-foreground">Economia Gerada</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Avaliação dos Clientes</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-3xl p-8 lg:p-12 text-white">
          <h3 className="text-3xl font-bold mb-4 font-roboto">
            Pronto para Transformar sua Operação?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se aos restaurantes que já economizam tempo e dinheiro com o GrowthScale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;