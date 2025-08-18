import React from 'react';
import { 
  Brain, 
  Shield, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Users,
  Clock,
  TrendingUp,
  Smartphone,
  FileCheck
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "IA Inteligente",
      description: "Algoritmo que aprende com seus padrões e otimiza escalas automaticamente",
      benefits: ["90% menos tempo criando escalas", "Otimização automática de custos", "Previsão de demanda"]
    },
    {
      icon: Shield,
      title: "Compliance CLT",
      description: "Verificação automática de todas as regras trabalhistas em tempo real",
      benefits: ["Zero risco de multas", "Validação automática", "Relatórios para auditoria"]
    },
    {
      icon: MessageSquare,
      title: "Comunicação WhatsApp",
      description: "Notificações automáticas e confirmações via WhatsApp para toda a equipe",
      benefits: ["90% menos ausências", "Confirmação automática", "Histórico completo"]
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Dashboard com métricas de produtividade e insights para decisões inteligentes",
      benefits: ["Análise de produtividade", "Relatórios de custos", "Métricas em tempo real"]
    },
    {
      icon: Zap,
      title: "Implementação Rápida",
      description: "Configure tudo em 24 horas. Sem interrupção nas suas operações",
      benefits: ["Setup em 24h", "Migração de dados", "Treinamento incluído"]
    },
    {
      icon: Users,
      title: "Gestão de Equipe",
      description: "Controle total sobre funcionários, permissões e perfis de acesso",
      benefits: ["Perfis personalizados", "Controle de acesso", "Gestão de benefícios"]
    }
  ];

  return (
    <section id="recursos" className="w-full py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Funcionalidades que transformam sua operação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada funcionalidade foi desenvolvida para resolver problemas reais do food service. 
            Simples, eficiente e focado em resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 mr-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Seção de integração */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🔗 Integração perfeita com seus sistemas
            </h3>
            <p className="text-muted-foreground mb-6">
              O GrowthScale se conecta com suas ferramentas atuais. Sem migração complexa, sem perda de dados.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center p-3 bg-background rounded-lg border border-border/50">
                <span className="text-sm font-medium">Excel</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded-lg border border-border/50">
                <span className="text-sm font-medium">Google Sheets</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded-lg border border-border/50">
                <span className="text-sm font-medium">ERP</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded-lg border border-border/50">
                <span className="text-sm font-medium">API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
