import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Users, CreditCard, Settings, Wrench, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQ[] = [
  // Geral
  {
    id: 'geral-1',
    question: 'O que é o GrowthScale?',
    answer: 'O GrowthScale é uma plataforma de gestão de escalas baseada em inteligência artificial que automatiza a criação de escalas de trabalho, garante compliance trabalhista e otimiza a alocação de recursos humanos.',
    category: 'Geral'
  },
  {
    id: 'geral-2',
    question: 'Como começar a usar o GrowthScale?',
    answer: 'Para começar, cadastre-se gratuitamente em nossa plataforma, adicione as informações dos seus funcionários, configure as regras de trabalho da sua empresa e deixe nossa IA criar as escalas automaticamente.',
    category: 'Geral'
  },
  {
    id: 'geral-3',
    question: 'O GrowthScale funciona para que tipos de empresa?',
    answer: 'Nossa plataforma é ideal para restaurantes, lojas de varejo, clínicas, hospitais, call centers, academias e qualquer empresa que precise gerenciar escalas de trabalho com múltiplos funcionários e turnos.',
    category: 'Geral'
  },

  // Funcionalidades
  {
    id: 'func-1',
    question: 'Como a IA gera as escalas?',
    answer: 'Nossa inteligência artificial analisa a disponibilidade dos funcionários, suas habilidades específicas, demanda histórica e preferências pessoais para criar escalas otimizadas automaticamente, garantindo máxima eficiência operacional.',
    category: 'Funcionalidades'
  },
  {
    id: 'func-2',
    question: 'Como funciona a previsão de ausências?',
    answer: 'Utilizamos algoritmos preditivos que analisam padrões históricos de ausências e comportamentos da equipe para prever possíveis faltas e sugerir substituições proativas.',
    category: 'Funcionalidades'
  },
  {
    id: 'func-3',
    question: 'O sistema garante compliance trabalhista?',
    answer: 'Sim, o GrowthScale monitora automaticamente jornadas de trabalho, intervalos obrigatórios e limites de horas extras, enviando alertas em tempo real para manter total conformidade com a legislação.',
    category: 'Funcionalidades'
  },
  {
    id: 'func-4',
    question: 'Posso personalizar as regras de escala?',
    answer: 'Absolutamente! Você pode configurar regras específicas como intervalos mínimos entre turnos, preferências de funcionários, restrições de horários e critérios de distribuição de escalas.',
    category: 'Funcionalidades'
  },

  // Preços
  {
    id: 'preco-1',
    question: 'O que está incluso em cada plano?',
    answer: 'O plano Freemium oferece funcionalidades básicas para até 5 funcionários. O plano Essencial (R$ 49/mês) inclui IA básica e suporte para até 10 funcionários. O plano Starter (R$ 99/mês) oferece todas as funcionalidades para até 15 funcionários.',
    category: 'Preços'
  },
  {
    id: 'preco-2',
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e a cobrança é ajustada proporcionalmente.',
    category: 'Preços'
  },
  {
    id: 'preco-3',
    question: 'Existe desconto para pagamento anual?',
    answer: 'Sim, oferecemos 20% de desconto para assinatura anual em todos os nossos planos pagos. Entre em contato conosco para mais detalhes.',
    category: 'Preços'
  },
  {
    id: 'preco-4',
    question: 'Como funciona o período de teste?',
    answer: 'Oferecemos 14 dias de teste gratuito para todos os planos pagos, sem necessidade de cartão de crédito. Você pode cancelar a qualquer momento durante o período de teste.',
    category: 'Preços'
  },

  // Integração
  {
    id: 'integ-1',
    question: 'O GrowthScale se integra com outros sistemas?',
    answer: 'Sim, oferecemos integrações com os principais sistemas de RH, folha de pagamento e gestão empresarial. Nossa API permite conectar com ferramentas personalizadas.',
    category: 'Integração'
  },
  {
    id: 'integ-2',
    question: 'Como importar dados de funcionários?',
    answer: 'Você pode importar dados através de planilhas Excel/CSV ou conectar diretamente com seu sistema de RH existente. Nosso suporte te ajuda no processo de migração.',
    category: 'Integração'
  },
  {
    id: 'integ-3',
    question: 'Existe app mobile?',
    answer: 'Sim, temos aplicativo mobile para iOS e Android onde funcionários podem visualizar escalas, solicitar trocas de turno e receber notificações importantes.',
    category: 'Integração'
  },

  // Suporte Técnico
  {
    id: 'suporte-1',
    question: 'Que tipo de suporte está disponível?',
    answer: 'Oferecemos suporte por email, chat ao vivo e telefone (planos pagos). Também temos uma central de ajuda completa com tutoriais e documentação.',
    category: 'Suporte Técnico'
  },
  {
    id: 'suporte-2',
    question: 'Meus dados estão seguros?',
    answer: 'Sim, utilizamos criptografia de nível bancário, backup automático e seguimos as melhores práticas de segurança. Somos totalmente compatíveis com a LGPD.',
    category: 'Suporte Técnico'
  },
  {
    id: 'suporte-3',
    question: 'E se eu precisar de treinamento?',
    answer: 'Oferecemos treinamento gratuito para todos os usuários, incluindo webinars, tutoriais em vídeo e sessões personalizadas para planos corporativos.',
    category: 'Suporte Técnico'
  }
];

const categories = [
  { name: 'Geral', icon: BookOpen, color: 'bg-primary' },
  { name: 'Funcionalidades', icon: Settings, color: 'bg-secondary' },
  { name: 'Preços', icon: CreditCard, color: 'bg-accent' },
  { name: 'Integração', icon: Users, color: 'bg-muted' },
  { name: 'Suporte Técnico', icon: Wrench, color: 'bg-primary' }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const groupedFAQs = useMemo(() => {
    const grouped: { [key: string]: FAQ[] } = {};
    filteredFAQs.forEach(faq => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [filteredFAQs]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-roboto text-balance">
              Perguntas <span className="text-primary">Frequentes</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-roboto leading-relaxed">
              Encontre respostas para as dúvidas mais comuns sobre o uso do GrowthScale
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Digite sua dúvida ou palavra-chave"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
                aria-label="Buscar perguntas frequentes"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="transition-all duration-200"
              >
                Todas as Categorias
              </Button>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    )}
                    className="flex items-center gap-2 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            {Object.keys(groupedFAQs).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhuma pergunta encontrada para sua busca.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              Object.entries(groupedFAQs).map(([categoryName, faqs]) => (
                <div key={categoryName} className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    {(() => {
                      const categoryData = categories.find(cat => cat.name === categoryName);
                      const Icon = categoryData?.icon || BookOpen;
                      return <Icon className="h-6 w-6 text-primary" />;
                    })()}
                    <h2 className="text-2xl font-bold text-foreground font-roboto">
                      {categoryName}
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                      {faqs.length} pergunta{faqs.length > 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={faq.id}
                        className="bg-card border border-border rounded-lg px-6 shadow-card hover:shadow-elegant transition-smooth"
                      >
                        <AccordionTrigger 
                          className="text-left font-semibold text-card-foreground hover:text-primary transition-smooth focus:text-primary"
                          aria-expanded="false"
                        >
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-muted/30 rounded-lg p-8">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4 font-roboto">
                Não encontrou sua resposta?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nossa equipe de suporte está pronta para te ajudar com qualquer dúvida
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contato">
                    Entre em Contato
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/central-de-ajuda">
                    Central de Ajuda
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;