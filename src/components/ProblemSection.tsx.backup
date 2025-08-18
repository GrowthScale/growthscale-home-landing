import React from 'react';
import { AlertTriangle, DollarSign, Clock, Users, FileText, TrendingDown, Shield, Calendar } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Riscos trabalhistas constantes",
      description: "Violações da CLT podem resultar em multas pesadas e processos trabalhistas que comprometem a viabilidade do negócio.",
      impact: "Segurança jurídica em risco",
      color: "red",
      urgency: "ALTO"
    },
    {
      icon: Clock,
      title: "Tempo excessivo na gestão",
      description: "Horas dedicadas à criação e ajuste manual de escalas que poderiam ser investidas em melhorias operacionais.",
      impact: "Recursos mal alocados",
      color: "orange",
      urgency: "MÉDIO"
    },
    {
      icon: DollarSign,
      title: "Custos ocultos elevados",
      description: "Horas extras desnecessárias, multas por não conformidade e ineficiência operacional impactam diretamente o lucro.",
      impact: "Margem de lucro comprometida",
      color: "red",
      urgency: "ALTO"
    },
    {
      icon: Users,
      title: "Insatisfação da equipe",
      description: "Escalas desequilibradas e comunicação ineficiente geram conflitos e aumentam a rotatividade de funcionários.",
      impact: "Ambiente de trabalho prejudicado",
      color: "purple",
      urgency: "MÉDIO"
    },
    {
      icon: FileText,
      title: "Processos manuais propensos a erros",
      description: "Planilhas complexas e métodos tradicionais aumentam a probabilidade de erros de cálculo e conformidade.",
      impact: "Precisão comprometida",
      color: "blue",
      urgency: "MÉDIO"
    },
    {
      icon: Calendar,
      title: "Falta de visibilidade operacional",
      description: "Dificuldade para visualizar custos em tempo real e tomar decisões baseadas em dados concretos.",
      impact: "Decisões baseadas em suposições",
      color: "blue",
      urgency: "MÉDIO"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Desafios comuns na{" "}
            <span className="text-blue-600 dark:text-blue-400">gestão de escalas</span>{" "}
            do setor de alimentação
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            Identificamos os principais obstáculos que gestores enfrentam diariamente. 
            Nossa solução foi desenvolvida para resolver esses problemas específicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <problem.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {problem.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                {problem.description}
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {problem.impact}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  problem.urgency === 'ALTO' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                  problem.urgency === 'MÉDIO' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {problem.urgency}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 max-w-4xl mx-auto shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              Esses desafios afetam a competitividade do seu negócio
            </h3>
            <p className="text-lg opacity-90">
              Nossa plataforma foi desenvolvida especificamente para resolver esses problemas 
              e permitir que você foque no que realmente importa: seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
