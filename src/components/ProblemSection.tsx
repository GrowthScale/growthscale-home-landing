import React from 'react';
import { AlertTriangle, DollarSign, Clock, Users, FileText, Calendar } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Riscos trabalhistas constantes",
      description: "Violações da CLT podem resultar em multas pesadas e processos trabalhistas que comprometem a viabilidade do negócio.",
      impact: "Segurança jurídica em risco"
    },
    {
      icon: Clock,
      title: "Tempo excessivo na gestão",
      description: "Horas dedicadas à criação e ajuste manual de escalas que poderiam ser investidas em melhorias operacionais.",
      impact: "Recursos mal alocados"
    },
    {
      icon: DollarSign,
      title: "Custos ocultos elevados",
      description: "Horas extras desnecessárias, multas por não conformidade e ineficiência operacional impactam diretamente o lucro.",
      impact: "Margem de lucro comprometida"
    },
    {
      icon: Users,
      title: "Insatisfação da equipe",
      description: "Escalas desequilibradas e comunicação ineficiente geram conflitos e aumentam a rotatividade de funcionários.",
      impact: "Ambiente de trabalho prejudicado"
    },
    {
      icon: FileText,
      title: "Processos manuais propensos a erros",
      description: "Planilhas complexas e métodos tradicionais aumentam a probabilidade de erros de cálculo e conformidade.",
      impact: "Precisão comprometida"
    },
    {
      icon: Calendar,
      title: "Falta de visibilidade operacional",
      description: "Dificuldade para visualizar custos em tempo real e tomar decisões baseadas em dados concretos.",
      impact: "Decisões baseadas em suposições"
    }
  ];

  return (
    <section id="problemas" className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in">
            Desafios comuns na{" "}
            <span className="text-primary">gestão de escalas</span>{" "}
            do setor de alimentação
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up px-4">
            Identificamos os principais obstáculos que gestores enfrentam diariamente. 
            Nossa solução foi desenvolvida para resolver esses problemas específicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {problem.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {problem.description}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm font-medium text-foreground">
                  {problem.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto border border-border/50">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
              Esses desafios afetam a competitividade do seu negócio
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground">
              Nossa plataforma foi desenvolvida especificamente para resolver esses problemas 
              e permitir que você foque no que realmente importa: seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
