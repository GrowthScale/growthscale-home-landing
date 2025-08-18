import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Smartphone, FileText, BarChart3, Users, Zap, Globe, CheckCircle, ExternalLink, Settings, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  status: 'available' | 'connected' | 'coming-soon';
  benefits: string[];
  setupSteps: string[];
  documentation: string;
  popularity: number;
  featured: boolean;
}

const integrations: Integration[] = [
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business API',
    description: 'Envie notificações automáticas de escalas e alterações diretamente para o WhatsApp dos funcionários',
    category: 'Comunicação',
    icon: Smartphone,
    status: 'available',
    benefits: [
      'Notificações instantâneas de escalas',
      'Confirmação de recebimento automática',
      'Redução de faltas por falta de comunicação',
      'Integração com grupos de equipe'
    ],
    setupSteps: [
      'Solicite acesso à API do WhatsApp Business',
      'Configure o webhook no painel de integrações',
      'Valide os números de telefone dos funcionários',
      'Teste o envio de mensagens',
      'Ative as notificações automáticas'
    ],
    documentation: '/docs/whatsapp-integration',
    popularity: 95,
    featured: true
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Integre com seu workspace Slack para notificações e colaboração em equipe',
    category: 'Comunicação',
    icon: Zap,
    status: 'available',
    benefits: [
      'Notificações de escalas em canais específicos',
      'Comandos rápidos para consultar horários',
      'Integração com bots personalizados',
      'Facilita comunicação entre turnos'
    ],
    setupSteps: [
      'Instale o app GrowthScale no seu workspace Slack',
      'Autorize as permissões necessárias',
      'Configure os canais de notificação',
      'Teste a integração',
      'Configure comandos personalizados'
    ],
    documentation: '/docs/slack-integration',
    popularity: 78,
    featured: false
  },
  {
    id: 'excel-export',
    name: 'Exportação Excel/CSV',
    description: 'Exporte relatórios detalhados de escalas, presença e horas trabalhadas para Excel',
    category: 'Relatórios',
    icon: FileText,
    status: 'connected',
    benefits: [
      'Relatórios personalizáveis',
      'Dados sempre atualizados',
      'Compatível com Excel e Google Sheets',
      'Automação de envio por email'
    ],
    setupSteps: [
      'Acesse a seção de Relatórios',
      'Selecione os dados para exportação',
      'Configure o formato desejado',
      'Agende exportações automáticas',
      'Configure destinatários por email'
    ],
    documentation: '/docs/excel-export',
    popularity: 89,
    featured: true
  },
  {
    id: 'power-bi',
    name: 'Microsoft Power BI',
    description: 'Conecte seus dados de escalas e RH com Power BI para análises avançadas',
    category: 'Relatórios',
    icon: BarChart3,
    status: 'available',
    benefits: [
      'Dashboards interativos avançados',
      'Análise preditiva de padrões',
      'Integração com outros dados empresariais',
      'Relatórios executivos automatizados'
    ],
    setupSteps: [
      'Configure um conector de dados',
      'Autentique a conexão com o Power BI',
      'Mapeie os campos de dados',
      'Configure atualizações automáticas',
      'Crie seus dashboards personalizados'
    ],
    documentation: '/docs/powerbi-integration',
    popularity: 67,
    featured: false
  },
  {
    id: 'contabilidade-api',
    name: 'API de Contabilidade',
    description: 'Integre com sistemas contábeis para automatizar o envio de dados de folha de pagamento',
    category: 'Contabilidade',
    icon: FileText,
    status: 'available',
    benefits: [
      'Automatização da folha de pagamento',
      'Redução de erros manuais',
      'Compliance automático',
      'Integração com principais ERPs'
    ],
    setupSteps: [
      'Configure as credenciais da API contábil',
      'Mapeie os campos necessários',
      'Configure regras de sincronização',
      'Teste a integração com dados de exemplo',
      'Ative a sincronização automática'
    ],
    documentation: '/docs/accounting-integration',
    popularity: 72,
    featured: false
  },
  {
    id: 'webhook-ponto',
    name: 'Webhook Sistemas de Ponto',
    description: 'Receba dados em tempo real de sistemas de ponto eletrônico para validação automática',
    category: 'Sistemas de Ponto',
    icon: Settings,
    status: 'available',
    benefits: [
      'Validação automática de presença',
      'Detecção de discrepâncias',
      'Integração com múltiplos sistemas',
      'Relatórios de conformidade'
    ],
    setupSteps: [
      'Configure o endpoint do webhook',
      'Defina os formatos de dados aceitos',
      'Configure autenticação e segurança',
      'Teste com dados do sistema de ponto',
      'Ative o monitoramento automático'
    ],
    documentation: '/docs/timecard-webhook',
    popularity: 81,
    featured: true
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sincronize escalas automaticamente com Google Calendar dos funcionários',
    category: 'Produtividade',
    icon: Globe,
    status: 'coming-soon',
    benefits: [
      'Sincronização bidirecional de calendários',
      'Lembretes automáticos',
      'Visualização unificada de compromissos',
      'Detecção de conflitos de horário'
    ],
    setupSteps: [
      'Autorize acesso ao Google Calendar',
      'Configure permissões de sincronização',
      'Selecione calendários para integração',
      'Defina regras de sincronização',
      'Teste a integração'
    ],
    documentation: '/docs/google-calendar-integration',
    popularity: 85,
    featured: false
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Integre com Microsoft Teams para notificações e colaboração empresarial',
    category: 'Comunicação',
    icon: Users,
    status: 'coming-soon',
    benefits: [
      'Notificações em canais do Teams',
      'Bots interativos para consultas',
      'Integração com Office 365',
      'Reuniões automáticas de briefing'
    ],
    setupSteps: [
      'Instale o app GrowthScale no Teams',
      'Configure permissões organizacionais',
      'Autorize acesso aos canais',
      'Configure bots e comandos',
      'Teste funcionalidades'
    ],
    documentation: '/docs/teams-integration',
    popularity: 76,
    featured: false
  }
];

const categories = [
  'Todas',
  'Comunicação',
  'Relatórios',
  'Contabilidade',
  'Sistemas de Ponto',
  'Produtividade'
];

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSavingWebhook, setIsSavingWebhook] = useState(false);

  const filteredIntegrations = useMemo(() => {
    let filtered = integrations;

    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(integration => integration.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(integration =>
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.popularity - a.popularity;
    });
  }, [searchTerm, selectedCategory]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-success text-success-foreground">Conectado</Badge>;
      case 'available':
        return <Badge variant="secondary">Disponível</Badge>;
      case 'coming-soon':
        return <Badge variant="outline">Em Breve</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return null;
    }
  };

  const handleSaveWebhook = async () => {
    if (!webhookUrl.trim()) return;
    
    setIsSavingWebhook(true);
    try {
      // Aqui você pode implementar a lógica para salvar no banco de dados
      // Por enquanto, vamos simular salvando no localStorage
      localStorage.setItem('whatsapp-webhook-url', webhookUrl);
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar feedback de sucesso (você pode usar um toast aqui)
      alert('Webhook salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar webhook:', error);
      alert('Erro ao salvar webhook. Tente novamente.');
    } finally {
      setIsSavingWebhook(false);
    }
  };

  // Carregar webhook salvo ao montar o componente
  useEffect(() => {
    const savedWebhook = localStorage.getItem('whatsapp-webhook-url');
    if (savedWebhook) {
      setWebhookUrl(savedWebhook);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-body text-balance">
              <span className="text-primary">Integrações</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
              Conecte o GrowthScale com as ferramentas que você já utiliza e potencialize sua gestão
            </p>
          </header>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Buscar integrações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
                aria-label="Buscar integrações disponíveis"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Integrations */}
          {selectedCategory === 'Todas' && searchTerm === '' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Integrações em Destaque</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.filter(i => i.featured).map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card 
                    key={integration.id} 
                    className="relative overflow-hidden bg-gradient-primary text-white focus-within:ring-2 focus-within:ring-accent transition-smooth"
                    role="article"
                    aria-labelledby={`featured-integration-${integration.id}`}
                  >
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Destaque
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="bg-white/20 p-3 rounded-lg" role="img" aria-label={`Ícone da integração ${integration.name}`}>
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <CardTitle id={`featured-integration-${integration.id}`} className="text-white">{integration.name}</CardTitle>
                          <CardDescription className="text-white/80">
                            {integration.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-white/80">
                            {integration.category}
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary" size="sm" onClick={() => setSelectedIntegration(integration)}>
                                Ver Detalhes
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* WhatsApp Webhook Configuration */}
          <div className="mb-12">
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Smartphone className="h-6 w-6" />
                  Notificações via WhatsApp
                </CardTitle>
                <CardDescription>
                  Configure o webhook para receber notificações de escalas e enviá-las automaticamente via WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Insira a URL do seu webhook (criado no Make.com ou Zapier) para enviar as escalas.
                  </p>
                  <Input 
                    placeholder="https://hook.make.com/sua-url-aqui" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Exemplo: https://hook.make.com/abc123/def456
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSaveWebhook}
                    disabled={isSavingWebhook || !webhookUrl.trim()}
                    className="flex-1"
                  >
                    {isSavingWebhook ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Salvando...
                      </>
                    ) : (
                      'Salvar Webhook'
                    )}
                  </Button>
                  
                  {webhookUrl && (
                    <Button 
                      variant="outline" 
                      onClick={() => setWebhookUrl('')}
                      disabled={isSavingWebhook}
                    >
                      Limpar
                    </Button>
                  )}
                </div>

                {webhookUrl && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-2">Status da Configuração:</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">
                        Webhook configurado e pronto para uso
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* All Integrations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {selectedCategory === 'Todas' ? 'Todas as Integrações' : `Categoria: ${selectedCategory}`}
            </h2>
            
            {filteredIntegrations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhuma integração encontrada para sua busca.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todas');
                  }}
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <Card 
                      key={integration.id} 
                      className="relative hover:shadow-card transition-smooth focus-within:ring-2 focus-within:ring-primary"
                      role="article"
                      aria-labelledby={`integration-${integration.id}`}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-3 rounded-lg" role="img" aria-label={`Ícone da integração ${integration.name}`}>
                            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <CardTitle id={`integration-${integration.id}`} className="text-lg">{integration.name}</CardTitle>
                              {getStatusIcon(integration.status)}
                            </div>
                            <CardDescription className="text-sm">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {integration.category}
                            </Badge>
                            {getStatusBadge(integration.status)}
                          </div>
                          
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => setSelectedIntegration(integration)}
                                >
                                  Ver Detalhes
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                            
                            <Button 
                              size="sm" 
                              className="flex-1"
                              disabled={integration.status === 'coming-soon'}
                            >
                              {integration.status === 'connected' ? 'Configurar' : 
                               integration.status === 'coming-soon' ? 'Em Breve' : 'Conectar'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Integration Details Modal */}
          {selectedIntegration && (
            <Dialog open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
              <DialogContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <selectedIntegration.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedIntegration.name}</DialogTitle>
                      <DialogDescription className="text-base mt-2">
                        {selectedIntegration.description}
                      </DialogDescription>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">{selectedIntegration.category}</Badge>
                        {getStatusBadge(selectedIntegration.status)}
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="benefits" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="benefits">Benefícios</TabsTrigger>
                    <TabsTrigger value="setup">Configuração</TabsTrigger>
                    <TabsTrigger value="docs">Documentação</TabsTrigger>
                  </TabsList>

                  <TabsContent value="benefits" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Principais Benefícios</h3>
                      <ul className="space-y-3">
                        {selectedIntegration.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="setup" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Guia de Configuração</h3>
                      <div className="space-y-4">
                        {selectedIntegration.setupSteps.map((step, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="docs" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Documentação e Recursos</h3>
                      <div className="grid gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Documentação Técnica</h4>
                                <p className="text-sm text-muted-foreground">
                                  Guia completo de implementação e API
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Acessar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">FAQ da Integração</h4>
                                <p className="text-sm text-muted-foreground">
                                  Perguntas frequentes e solução de problemas
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Ver FAQ
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <Button 
                    className="flex-1"
                    disabled={selectedIntegration.status === 'coming-soon'}
                  >
                    {selectedIntegration.status === 'connected' ? 'Reconfigurar' : 
                     selectedIntegration.status === 'coming-soon' ? 'Em Breve' : 'Conectar Agora'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                    Fechar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Help Section */}
          <div className="mt-16">
            <Card className="bg-muted/30">
              <CardContent className="pt-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Precisa de uma integração personalizada?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Nossa equipe pode desenvolver integrações customizadas para atender às necessidades específicas da sua empresa
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      Solicitar Integração
                    </Button>
                    <Button variant="outline" size="lg">
                      Falar com Especialista
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Integrations;