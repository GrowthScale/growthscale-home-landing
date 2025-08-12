import { AlertTriangle, Clock, DollarSign } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Medo de Processos da CLT?",
    description: "Nossa IA valida cada turno contra as regras da CLT em tempo real, evitando multas por erros em intervalos, horas extras e folgas."
  },
  {
    icon: Clock,
    title: "Horas Perdidas em Planilhas?",
    description: "Crie escalas otimizadas em minutos. Use modelos prontos ou deixe nossa IA fazer o trabalho pesado para você focar no que importa: seu cliente."
  },
  {
    icon: DollarSign,
    title: "Custos que Fogem do Controle?",
    description: "Com nosso simulador, você sabe o custo exato da sua escala antes mesmo de publicá-la. Sem surpresas no fim do mês."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Sua operação de food service sofre com isso?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Identificamos os principais desafios que afetam a gestão de escalas no seu setor. 
            Veja como o GrowthScale resolve cada um deles
          </p>
        </div>

        {/* Problems Grid - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <article
                key={index}
                className="group p-8 bg-card rounded-2xl border border-border hover:shadow-card transition-smooth hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary"
                tabIndex={0}
                role="article"
                aria-labelledby={`problem-title-${index}`}
              >
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-normal" 
                    role="img" 
                    aria-label={`Ícone representando ${problem.title}`}
                  >
                    <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 id={`problem-title-${index}`} className="text-xl font-semibold text-card-foreground mb-3 font-roboto">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground font-roboto leading-relaxed">
                    {problem.description}
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