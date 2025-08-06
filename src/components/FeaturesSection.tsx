import { Calendar, BarChart3, Shield, Trophy, TrendingDown, Clock } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Escalas Inteligentes",
    description: "IA avançada que cria escalas otimizadas considerando disponibilidade, habilidades e preferências dos funcionários.",
    image: "🗓️"
  },
  {
    icon: BarChart3,
    title: "Previsão de Ausências",
    description: "Algoritmos preditivos que antecipam ausências e sugerem substituições automaticamente.",
    image: "📊"
  },
  {
    icon: Shield,
    title: "Compliance Automático",
    description: "Verificação automática de conformidade com leis trabalhistas e alertas em tempo real.",
    image: "🛡️"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Funcionalidades que <span className="text-primary">Impulsionam</span> o Seu Sucesso
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Conheça as ferramentas poderosas que tornarão a gestão da sua equipe mais eficiente e estratégica
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-6 p-6 bg-card rounded-2xl border border-border hover:shadow-soft transition-all duration-300 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-card-foreground font-roboto">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground font-roboto leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl">
                  {feature.image}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 bg-gradient-primary rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4 font-roboto">
            Tudo Integrado em Uma Única Plataforma
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Não perca tempo alternando entre diferentes sistemas. O GrowthScale oferece 
            todas as ferramentas que você precisa em um só lugar.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-white font-medium">App Mobile</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">🔗</div>
              <div className="text-white font-medium">Integrações</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-white font-medium">Relatórios</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-white font-medium">Segurança</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;