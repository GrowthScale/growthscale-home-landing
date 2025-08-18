import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Zap, Shield, TrendingUp, Clock, Users, BarChart3, MessageSquare, Brain, Target } from 'lucide-react';

export function SolutionSection() {
  const solutions = [
    {
      id: "ai",
      title: "🧠 IA Inteligente",
      subtitle: "Algoritmo que aprende com seu negócio",
      description: "Nossa IA analisa padrões, otimiza escalas e aprende com suas necessidades específicas.",
      benefits: [
        "Escalas 40% mais eficientes",
        "Redução de 60% no tempo de criação",
        "Otimização automática de custos",
        "Previsão de demanda inteligente"
      ],
      icon: Brain,
      color: "blue",
      stats: {
        value: "40%",
        label: "Mais eficiência"
      }
    },
    {
      id: "compliance",
      title: "⚖️ Compliance Automático",
      subtitle: "100% dentro da lei, sempre",
      description: "Validação em tempo real de todas as regras da CLT, garantindo total conformidade.",
      benefits: [
        "Zero multas trabalhistas",
        "Validação automática de jornadas",
        "Controle de horas extras",
        "Relatórios para auditoria"
      ],
      icon: Shield,
      color: "green",
      stats: {
        value: "100%",
        label: "Compliance garantido"
      }
    },
    {
      id: "communication",
      title: "📱 Comunicação Integrada",
      subtitle: "WhatsApp + notificações automáticas",
      description: "Sistema de comunicação que mantém todos informados e reduz ausências drasticamente.",
      benefits: [
        "Redução de 90% em ausências",
        "Confirmação automática via WhatsApp",
        "Notificações em tempo real",
        "Histórico de comunicações"
      ],
      icon: MessageSquare,
      color: "purple",
      stats: {
        value: "90%",
        label: "Menos ausências"
      }
    },
    {
      id: "analytics",
      title: "📊 Analytics Avançado",
      subtitle: "Insights que transformam decisões",
      description: "Relatórios detalhados e insights que ajudam você a tomar decisões baseadas em dados.",
      benefits: [
        "Análise de produtividade",
        "Relatórios de custos",
        "Métricas de performance",
        "Previsões de demanda"
      ],
      icon: BarChart3,
      color: "orange",
      stats: {
        value: "8h",
        label: "Tempo economizado"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            🚀 A{" "}
            <span className="text-blue-600 dark:text-blue-400">solução completa</span>{" "}
            para seus problemas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            Uma plataforma que combina IA avançada, compliance automático e comunicação integrada 
            para transformar completamente sua gestão de escalas.
          </p>
        </div>

        <Tabs defaultValue="ai" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            {solutions.map((solution) => (
              <TabsTrigger
                key={solution.id}
                value={solution.id}
                className="text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {solution.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {solutions.map((solution) => (
            <TabsContent key={solution.id} value={solution.id} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-${solution.color}-100 dark:bg-${solution.color}-900/30 rounded-2xl flex items-center justify-center mr-6`}>
                      <solution.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {solution.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {solution.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-4">
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Resultados comprovados
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {solution.stats.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {solution.stats.label}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                          R$2.500
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Economia/mês
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          90%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Menos ausências
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                          8h
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Tempo economizado
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              🎯 Pronto para transformar seu restaurante?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Junte-se a 500+ restaurantes que já economizam R$2.500/mês
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 neuro-hover">
              🚀 Começar agora - 30 dias grátis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
