import React from 'react';
import { AlertTriangle, DollarSign, Clock, Users, FileText, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: DollarSign,
      title: "Perda de R$2.500/mês",
      description: "Multas trabalhistas e horas extras desnecessárias",
      impact: "Impacto direto no lucro",
    },
    {
      icon: Clock,
      title: "8 horas perdidas/semana",
      description: "Tempo gasto criando e ajustando escalas manualmente",
      impact: "Menos tempo para o negócio",
    },
    {
      icon: AlertTriangle,
      title: "Risco de multas CLT",
      description: "Violações trabalhistas que podem custar milhares",
      impact: "Segurança jurídica comprometida",
    },
    {
      icon: Users,
      title: "Funcionários insatisfeitos",
      description: "Escalas injustas e comunicação ineficiente",
      impact: "Rotatividade alta",
    },
    {
      icon: FileText,
      title: "Processos manuais",
      description: "Planilhas complexas e propensas a erros",
      impact: "Ineficiência operacional",
    },
    {
      icon: TrendingDown,
      title: "Produtividade baixa",
      description: "Equipe desmotivada e processos desorganizados",
      impact: "Resultados comprometidos",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            🚨 Problemas que estão{" "}
            <span className="text-red-600 dark:text-red-400">destruindo</span>{" "}
            seu restaurante
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            Se você está enfrentando esses problemas, saiba que{" "}
            <strong className="text-red-600 dark:text-red-400">não está sozinho</strong>. 
            Mas a solução existe e está ao seu alcance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 neuro-hover border border-red-100 dark:border-red-900/30"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4">
                  <problem.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {problem.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {problem.description}
              </p>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  💥 {problem.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-red-600 text-white rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              ⚠️ Estes problemas custam em média{" "}
              <span className="text-yellow-300">R$15.000/ano</span>{" "}
              para restaurantes
            </h3>
            <p className="text-lg opacity-90">
              Mas a boa notícia é que a solução está a apenas um clique de distância
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
