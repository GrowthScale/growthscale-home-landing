import { Calendar, BarChart3, Shield, Trophy, TrendingDown, Clock } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Seu Co-Piloto CLT que não dorme.",
    description: "IA avançada que cria escalas otimizadas considerando disponibilidade, habilidades e preferências dos funcionários.",
    image: "🗓️"
  },
  {
    icon: BarChart3,
    title: "Escalas Perfeitas, sem Esforço.",
    description: "Algoritmos preditivos que antecipam ausências e sugerem substituições automaticamente.",
    image: "📊"
  },
  {
    icon: Shield,
    title: "Comunicação Clara e sem Desculpas.",
    description: "Verificação automática de conformidade com leis trabalhistas e alertas em tempo real.",
    image: "🛡️"
  }
];

const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-20 bg-muted/30">{/* Added id="recursos" for anchor navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            A tranquilidade que você nunca teve, em 3 cliques.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Conheça as ferramentas poderosas que tornarão a gestão da sua equipe mais eficiente e estratégica
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-1 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <article
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-6 p-8 bg-card rounded-2xl border border-border hover:shadow-card transition-smooth ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                role="article"
                aria-labelledby={`feature-title-${index}`}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center" 
                      role="img" 
                      aria-label={`Ícone da funcionalidade ${feature.title}`}
                    >
                      <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 id={`feature-title-${index}`} className="text-2xl font-semibold text-card-foreground font-roboto">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-roboto leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {/* TODO: Inserir aqui um GIF mostrando o alerta de risco aparecendo no calendário. */}
                  {index === 0 && (
                    <div 
                      className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl" 
                      role="img" 
                      aria-label={`Ilustração da funcionalidade ${feature.title}`}
                    >
                      <span aria-hidden="true">{feature.image}</span>
                    </div>
                  )}
                  
                  {/* TODO: Inserir aqui um GIF da IA preenchendo uma escala vazia após o clique no botão 'Sugerir'. */}
                  {index === 1 && (
                    <div 
                      className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl" 
                      role="img" 
                      aria-label={`Ilustração da funcionalidade ${feature.title}`}
                    >
                      <span aria-hidden="true">{feature.image}</span>
                    </div>
                  )}
                  
                  {/* TODO: Inserir aqui um GIF ou imagem de uma notificação da escala chegando em um celular via WhatsApp. */}
                  {index === 2 && (
                    <div 
                      className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl" 
                      role="img" 
                      aria-label={`Ilustração da funcionalidade ${feature.title}`}
                    >
                      <span aria-hidden="true">{feature.image}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Feature Highlight */}
        <section className="mt-20 bg-gradient-primary rounded-3xl p-8 lg:p-12 text-center" aria-labelledby="integration-title">
          <h3 id="integration-title" className="text-3xl font-bold text-white mb-4 font-roboto">
            Tudo Integrado em Uma Única Plataforma
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Não perca tempo alternando entre diferentes sistemas. O GrowthScale oferece 
            todas as ferramentas que você precisa em um só lugar.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-smooth" role="img" aria-label="App Mobile">
              <div className="text-3xl mb-3" aria-hidden="true">📱</div>
              <div className="text-white font-medium">App Mobile</div>
            </div>
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-smooth" role="img" aria-label="Integrações">
              <div className="text-3xl mb-3" aria-hidden="true">🔗</div>
              <div className="text-white font-medium">Integrações</div>
            </div>
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-smooth" role="img" aria-label="Relatórios">
              <div className="text-3xl mb-3" aria-hidden="true">📈</div>
              <div className="text-white font-medium">Relatórios</div>
            </div>
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-smooth" role="img" aria-label="Segurança">
              <div className="text-3xl mb-3" aria-hidden="true">🔒</div>
              <div className="text-white font-medium">Segurança</div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FeaturesSection;