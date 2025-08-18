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
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-fade-in">
            Solução{" "}
            <span className="text-blue-600 dark:text-blue-400">completa</span>{" "}
            para gestão de escalas
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up px-4">
            Uma plataforma desenvolvida especificamente para o setor de alimentação, 
            combinando tecnologia e conhecimento em legislação trabalhista.
          </p>
        </div>

        <Tabs defaultValue="compliance" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
            {solutions.map((solution) => (
              <TabsTrigger
                key={solution.id}
                value={solution.id}
                className="text-xs sm:text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <span className="hidden sm:inline">{solution.title}</span>
                <span className="sm:hidden">{solution.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {solutions.map((solution) => (
            <TabsContent key={solution.id} value={solution.id} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                <div>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 sm:mr-6">
                      <solution.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {solution.title}
                      </h3>
                      <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
                        {solution.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Principais benefícios:</h4>
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-4">
                      {solution.id === 'compliance' && 'Alerta de Compliance em Tempo Real'}
                      {solution.id === 'ia' && 'IA Sugerindo Escala Perfeita'}
                      {solution.id === 'custos' && 'Painel de Custos Atualizado'}
                    </h4>
                  </div>
                  
                  {/* Demonstração visual da plataforma */}
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    {solution.id === 'compliance' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-900 dark:text-white text-sm font-medium">Alerta de Compliance CLT</span>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-red-700 dark:text-red-300 text-xs font-medium">VIOLAÇÃO DETECTADA</span>
                          </div>
                          <p className="text-red-600 dark:text-red-200 text-xs">João Silva - Intervalo insuficiente (45min < 60min obrigatório)</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-yellow-700 dark:text-yellow-300 text-xs font-medium">ATENÇÃO</span>
                          </div>
                          <p className="text-yellow-600 dark:text-yellow-200 text-xs">Maria Santos - Jornada próxima ao limite (8h45min)</p>
                        </div>
                      </div>
                    )}
                    
                    {solution.id === 'ia' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-900 dark:text-white text-sm font-medium">IA Sugerindo Escala</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-blue-700 dark:text-blue-300 text-xs font-medium">SUGESTÃO IA</span>
                          </div>
                          <p className="text-blue-600 dark:text-blue-200 text-xs">Segunda: João (8h) + Maria (6h) = Custo: R$ 280</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-700 dark:text-green-300 text-xs font-medium">OTIMIZADO</span>
                          </div>
                          <p className="text-green-600 dark:text-green-200 text-xs">Economia de R$ 45 vs. escala manual</p>
                        </div>
                      </div>
                    )}
                    
                    {solution.id === 'custos' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-900 dark:text-white text-sm font-medium">Painel de Custos em Tempo Real</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                            <p className="text-green-700 dark:text-green-300 text-xs font-medium">Custo Semanal</p>
                            <p className="text-green-600 dark:text-green-200 text-lg font-bold">R$ 2.450</p>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <p className="text-blue-700 dark:text-blue-300 text-xs font-medium">Economia</p>
                            <p className="text-blue-600 dark:text-blue-200 text-lg font-bold">R$ 320</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-600 dark:text-gray-300 text-xs">Projeção mensal: R$ 9.800 (vs. R$ 11.200 anterior)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Pronto para operar com 100% de segurança?
            </h3>
            <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6">
              Comece grátis hoje mesmo e descubra como nossa plataforma 
              pode transformar a gestão do seu negócio.
            </p>
            <button 
              onClick={() => window.location.href = '/signup?plan=freemium'}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300 min-h-[44px]"
            >
              Começar Gratuitamente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
