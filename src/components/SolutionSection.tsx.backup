import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, TrendingUp, Clock, Users, BarChart3, MessageSquare, Brain, Calendar, Settings } from 'lucide-react';

export function SolutionSection() {
  const solutions = [
    {
      id: "compliance",
      title: "Compliance CLT",
      subtitle: "Conformidade automática com a legislação",
      description: "Sistema que valida automaticamente todas as regras da CLT, incluindo jornadas de trabalho, intervalos e folgas obrigatórias.",
      benefits: [
        "Validação automática de jornadas",
        "Controle de horas extras",
        "Alertas de violações em tempo real",
        "Relatórios para auditoria"
      ],
      icon: Shield,
      color: "blue",
      features: [
        "Verificação de intervalos interjornada",
        "Controle de horas extras",
        "Validação de folgas semanais",
        "Relatórios de conformidade"
      ]
    },
    {
      id: "gestao",
      title: "Gestão Inteligente",
      subtitle: "Criação e otimização de escalas",
      description: "Interface intuitiva para criar, editar e otimizar escalas de trabalho considerando disponibilidade, habilidades e demandas.",
      benefits: [
        "Interface visual intuitiva",
        "Drag & drop para ajustes",
        "Templates personalizáveis",
        "Histórico de alterações"
      ],
      icon: Calendar,
      color: "green",
      features: [
        "Calendário visual interativo",
        "Templates de escalas",
        "Cópia de escalas anteriores",
        "Ajustes rápidos"
      ]
    },
    {
      id: "comunicacao",
      title: "Comunicação Integrada",
      subtitle: "Notificações e confirmações automáticas",
      description: "Sistema de comunicação que mantém a equipe informada sobre escalas, mudanças e permite confirmações de presença.",
      benefits: [
        "Notificações automáticas",
        "Confirmação de presença",
        "Histórico de comunicações",
        "Integração com WhatsApp"
      ],
      icon: MessageSquare,
      color: "purple",
      features: [
        "Notificações push",
        "Integração WhatsApp",
        "Confirmação de escalas",
        "Histórico de mensagens"
      ]
    },
    {
      id: "analytics",
      title: "Relatórios e Analytics",
      subtitle: "Insights para decisões estratégicas",
      description: "Relatórios detalhados sobre custos, produtividade e conformidade para embasar decisões gerenciais.",
      benefits: [
        "Relatórios de custos",
        "Análise de produtividade",
        "Métricas de conformidade",
        "Exportação de dados"
      ],
      icon: BarChart3,
      color: "orange",
      features: [
        "Dashboard executivo",
        "Relatórios personalizáveis",
        "Exportação em PDF/Excel",
        "Métricas em tempo real"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Solução{" "}
            <span className="text-blue-600 dark:text-blue-400">completa</span>{" "}
            para gestão de escalas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            Uma plataforma desenvolvida especificamente para o setor de alimentação, 
            combinando tecnologia e conhecimento em legislação trabalhista.
          </p>
        </div>

        <Tabs defaultValue="compliance" className="max-w-6xl mx-auto">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-6">
                      <solution.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Principais benefícios:</h4>
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Funcionalidades incluídas
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <Settings className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 max-w-4xl mx-auto shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              Pronto para otimizar sua gestão de escalas?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Agende uma demonstração gratuita e descubra como nossa plataforma 
              pode transformar a gestão do seu negócio.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
              Agendar Demonstração
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
