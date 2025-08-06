import { Brain, DollarSign, TrendingUp, Shield, Heart } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Otimização de Escalas com IA",
    description: "Algoritmos inteligentes criam escalas perfeitas automaticamente, considerando disponibilidade, habilidades e preferências da equipe."
  },
  {
    icon: DollarSign,
    title: "Redução de Custos Operacionais",
    description: "Elimine gastos desnecessários com horas extras e otimize a alocação de recursos humanos para máxima eficiência."
  },
  {
    icon: TrendingUp,
    title: "Aumento da Produtividade da Equipe",
    description: "Equipes mais organizadas e motivadas resultam em maior produtividade e melhor atendimento ao cliente."
  },
  {
    icon: Shield,
    title: "Garantia de Compliance Trabalhista",
    description: "Mantenha-se sempre em conformidade com as leis trabalhistas com verificações automáticas e alertas em tempo real."
  },
  {
    icon: Heart,
    title: "Engajamento e Retenção de Funcionários",
    description: "Funcionários mais satisfeitos com escalas justas e transparentes permanecem mais tempo na empresa."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Descubra os Benefícios que o <span className="text-primary">GrowthScale</span> Oferece
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Transforme a gestão da sua equipe e alcance resultados extraordinários 
            com nossa plataforma inovadora
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <article
                key={index}
                className="group p-8 bg-card rounded-2xl border border-border hover:shadow-card transition-smooth hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary"
                tabIndex={0}
                role="article"
                aria-labelledby={`benefit-title-${index}`}
              >
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-normal" 
                    role="img" 
                    aria-label={`Ícone representando ${benefit.title}`}
                  >
                    <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 id={`benefit-title-${index}`} className="text-xl font-semibold text-card-foreground mb-3 font-roboto">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-roboto leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;