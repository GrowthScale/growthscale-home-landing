import { AlertTriangle, Clock, DollarSign, CheckCircle, TrendingUp, Shield } from "lucide-react";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Você já perdeu dinheiro com processos da CLT?",
    description: "Nossa IA detecta e previne violações trabalhistas em tempo real. Não espere receber uma multa para agir.",
    impact: "Evite multas de até R$ 50.000",
    color: "text-red-500"
  },
  {
    icon: Clock,
    title: "Quantas horas você perde criando escalas?",
    description: "Transforme 4 horas de trabalho manual em 5 minutos de revisão. Nossa IA faz o trabalho pesado.",
    impact: "Economize 20h por mês",
    color: "text-orange-500"
  },
  {
    icon: DollarSign,
    title: "Seus custos fogem do controle?",
    description: "Veja o custo exato de cada escala antes de publicá-la. Sem surpresas, sem estresse.",
    impact: "Reduza custos em até 30%",
    color: "text-green-500"
  }
];

const transformations = [
  {
    icon: CheckCircle,
    title: "Compliance Automático",
    description: "100% das escalas validadas contra a CLT",
    metric: "0 multas"
  },
  {
    icon: TrendingUp,
    title: "Eficiência Operacional",
    description: "Escalas otimizadas em minutos",
    metric: "90% mais rápido"
  },
  {
    icon: Shield,
    title: "Proteção Total",
    description: "Cobertura completa contra riscos",
    metric: "100% seguro"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Impactante */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Pare de perder dinheiro. Comece a ganhar controle.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Identificamos os 3 maiores assassinos de lucro no seu restaurante. 
            Veja como o GrowthScale transforma cada um deles em vantagem competitiva.
          </p>
        </div>

        {/* Pain Points - Grid 3 Colunas */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <article
                key={index}
                className="group p-8 bg-card rounded-2xl border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary"
                tabIndex={0}
                role="article"
                aria-labelledby={`pain-title-${index}`}
              >
                <div className="mb-6">
                  <div 
                    className={`w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    role="img" 
                    aria-label={`Ícone representando ${point.title}`}
                  >
                    <IconComponent className={`h-8 w-8 ${point.color}`} aria-hidden="true" />
                  </div>
                  <h3 id={`pain-title-${index}`} className="text-xl font-semibold text-card-foreground mb-3 font-roboto">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground font-roboto leading-relaxed mb-4">
                    {point.description}
                  </p>
                  <div className={`text-lg font-bold ${point.color}`}>
                    {point.impact}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Transformação - Seção de Resultados */}
        <div className="bg-gradient-primary rounded-3xl p-8 lg:p-12 text-center text-white mb-16">
          <h3 className="text-3xl font-bold mb-8 font-roboto">
            A Transformação em Números
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {transformations.map((transformation, index) => {
              const IconComponent = transformation.icon;
              return (
                <div key={index} className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-smooth">
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h4 className="text-xl font-semibold mb-2">{transformation.title}</h4>
                  <p className="text-white/80 mb-3">{transformation.description}</p>
                  <div className="text-2xl font-bold text-white">{transformation.metric}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Junte-se a mais de 500 restaurantes que já transformaram suas operações
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Setup em 5 minutos
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Suporte 24/7
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Garantia de 30 dias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;