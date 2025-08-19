// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  PlayCircle, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  Check, 
  X, 
  Star, 
  Zap,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Target,
  DollarSign,
  Calendar,
  MessageSquare,
  Bot,
  Globe,
  Lock,
  Headphones,
  AlertTriangle,
  FileText,
  Scale,
  Building2,
  CheckCircle
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- HEADER VANGUARDA ---
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-30"></div>
          <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          GrowthScale
        </span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/#solucao" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Solução
        </Link>
        <Link to="/#recursos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Recursos
        </Link>
        <Link to="/#precos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Preços
        </Link>
        <Link to="/#contato" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Contato
        </Link>
      </nav>
      
      <div className="flex items-center space-x-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/auth">Entrar</Link>
        </Button>
        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Link to="/auth">Começar Agora</Link>
        </Button>
      </div>
    </div>
  </header>
);

// --- HERO SECTION VANGUARDA ---
const HeroSection = () => (
  <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
    
    <div className="container relative z-10 mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge de Destaque */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Plataforma de Inteligência Operacional</span>
        </div>
        
        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 animate-fade-in-up">
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Gestão Inteligente
          </span>
          <br />
          <span className="text-foreground">de Escalas</span>
          <br />
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            com Compliance CLT
          </span>
        </h1>
        
        {/* Subtítulo Juridicamente Seguro */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Plataforma de <span className="font-semibold text-foreground">inteligência operacional</span> que oferece 
          <span className="font-semibold text-primary"> ferramentas de gestão</span> para 
          <span className="font-semibold text-accent"> otimização de escalas</span> com 
          <span className="font-semibold text-foreground"> recursos de compliance</span> para legislação trabalhista brasileira.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl shadow-primary/25">
            <Link to="/auth" className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Experimentar Gratuitamente
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-secondary">
            <Link to="/#demo" className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Ver Demonstração
            </Link>
          </Button>
        </div>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Empresas Utilizam</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">30%</div>
            <div className="text-muted-foreground">Redução de Custos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8h</div>
            <div className="text-muted-foreground">Economizadas por Semana</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PROVA SOCIAL VANGUARDA ---
const SocialProofSection = () => (
  <section className="py-20 bg-background-dark text-foreground-dark">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Confiado por Empresas de Destaque
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empresas que otimizaram suas operações com ferramentas de gestão inteligente
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Rede Gastronômica</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">Grupo Hoteleiro</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Cadeia de Restaurantes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">Empresa de Catering</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Rede de Fast-Food</div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PROBLEMA VANGUARDA ---
const ProblemSection = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Desafios Operacionais
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Desafios Comuns na <span className="text-destructive">Gestão de Escalas</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Muitas empresas enfrentam dificuldades na organização de turnos e controle de custos operacionais
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-destructive">Gestão Manual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Processos manuais que consomem tempo valioso que poderia ser dedicado ao crescimento do negócio.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-destructive">Controle de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dificuldade em prever e controlar custos operacionais relacionados à mão de obra.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-destructive">Conformidade Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Necessidade de garantir que as práticas estejam alinhadas com a legislação trabalhista vigente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE SOLUÇÃO VANGUARDA ---
const SolutionSection = () => (
  <section id="solucao" className="py-20 bg-background-dark text-foreground-dark">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          <Sparkles className="h-4 w-4 mr-2" />
          Solução Inteligente
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ferramentas de <span className="text-primary">Gestão Inteligente</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Recursos avançados para otimização de escalas e controle operacional
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Recursos de Inteligência</h3>
              <p className="text-muted-foreground">
                Ferramentas que oferecem sugestões para otimização de escalas baseadas em dados operacionais.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Automação de Processos</h3>
              <p className="text-muted-foreground">
                Recursos que automatizam tarefas repetitivas, permitindo foco em atividades estratégicas.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Recursos de Compliance</h3>
              <p className="text-muted-foreground">
                Ferramentas que auxiliam na verificação de conformidade com a legislação trabalhista brasileira.
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <img src="/placeholder-dashboard-dark.png" alt="Interface da plataforma" className="rounded-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE RECURSOS VANGUARDA ---
const FeaturesSection = () => (
  <section id="recursos" className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Recursos <span className="text-primary">Avançados</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Ferramentas desenvolvidas para otimizar a gestão operacional
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Gestão de Escalas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ferramentas para criação e gerenciamento de escalas de trabalho de forma eficiente.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Análise de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Recursos para análise e controle de custos operacionais relacionados à mão de obra.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Comunicação Integrada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ferramentas de comunicação para facilitar a coordenação entre equipes.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Verificação de Conformidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Recursos que auxiliam na verificação de conformidade com regulamentações trabalhistas.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Relatórios e Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ferramentas de análise que fornecem insights para otimização de processos.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Gestão de Equipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Recursos para gerenciamento eficiente de equipes e colaboradores.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE COMPARAÇÃO VANGUARDA ---
const ComparisonSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Por que Escolher <span className="text-primary">Ferramentas Inteligentes</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Compare métodos tradicionais com soluções modernas de gestão
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-muted-foreground mb-4">Métodos Tradicionais</div>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <X className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex items-center justify-center">
              <X className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex items-center justify-center">
              <X className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex items-center justify-center">
              <X className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-4">GrowthScale</div>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-4">Benefícios</div>
          <div className="space-y-4 text-sm">
            <div className="text-muted-foreground">Gestão automatizada</div>
            <div className="text-muted-foreground">Controle de custos</div>
            <div className="text-muted-foreground">Recursos de compliance</div>
            <div className="text-muted-foreground">Comunicação integrada</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PREÇOS VANGUARDA ---
const PricingSection = () => (
  <section id="precos" className="py-20 bg-background-dark text-foreground-dark">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
          <Award className="h-4 w-4 mr-2" />
          Planos Disponíveis
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Escolha o Plano <span className="text-accent">Ideal</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Soluções adaptadas para diferentes necessidades operacionais
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Starter</CardTitle>
            <CardDescription>Para pequenas operações</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold mb-4">R$ 0</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Até 5 colaboradores
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Recursos básicos de gestão
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Suporte por email
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth">Começar Gratuitamente</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-primary bg-gradient-to-b from-primary/5 to-transparent relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-accent text-accent-foreground">Mais Popular</Badge>
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Professional</CardTitle>
            <CardDescription>Para operações em crescimento</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold mb-4">R$ 99<span className="text-lg font-normal text-muted-foreground">/mês</span></div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Até 25 colaboradores
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Recursos avançados de gestão
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Ferramentas de compliance
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Análise de custos
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Suporte prioritário
              </li>
            </ul>
            <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
              <Link to="/auth">Escolher Professional</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>Para grandes operações</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold mb-4">Sob Consulta</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Colaboradores ilimitados
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Múltiplas unidades
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Suporte dedicado 24/7
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Recursos personalizados
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contato">Falar com Vendas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// --- SEÇÃO FAQ VANGUARDA ---
const FaqSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Perguntas <span className="text-primary">Frequentes</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Respostas para dúvidas comuns sobre nossa plataforma
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            A plataforma oferece aconselhamento jurídico?
          </AccordionTrigger>
          <AccordionContent>
            Não. Nossa plataforma oferece ferramentas de gestão operacional e recursos que auxiliam na verificação de conformidade. Para aconselhamento jurídico específico, recomendamos consultar profissionais qualificados.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            Quanto tempo leva para implementar a plataforma?
          </AccordionTrigger>
          <AccordionContent>
            A implementação é rápida! Nossas ferramentas de onboarding permitem configurar sua operação e importar dados em menos de 30 minutos. Nossa equipe de suporte está disponível para auxiliar em cada etapa.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            Como garantem a segurança dos dados?
          </AccordionTrigger>
          <AccordionContent>
            A segurança é nossa prioridade. Utilizamos práticas avançadas de segurança, incluindo criptografia e isolamento de dados por cliente, para garantir que suas informações estejam sempre protegidas.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">
            Posso cancelar minha assinatura a qualquer momento?
          </AccordionTrigger>
          <AccordionContent>
            Sim! Não há contratos de longo prazo. Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento ou penalidades.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

// --- FOOTER VANGUARDA ---
const Footer = () => (
  <footer className="py-16 bg-background-dark text-foreground-dark border-t border-border/20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-4">Plataforma</h3>
          <ul className="space-y-2">
            <li><Link to="/#solucao" className="text-muted-foreground hover:text-foreground transition-colors">Solução</Link></li>
            <li><Link to="/#recursos" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</Link></li>
            <li><Link to="/#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Empresa</h3>
          <ul className="space-y-2">
            <li><Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</Link></li>
            <li><Link to="/#contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</Link></li>
            <li><Link to="/carreiras" className="text-muted-foreground hover:text-foreground transition-colors">Carreiras</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Suporte</h3>
          <ul className="space-y-2">
            <li><Link to="/ajuda" className="text-muted-foreground hover:text-foreground transition-colors">Central de Ajuda</Link></li>
            <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentação</Link></li>
            <li><Link to="/status" className="text-muted-foreground hover:text-foreground transition-colors">Status do Sistema</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/legal/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link></li>
            <li><Link to="/legal/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/legal/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="font-bold text-lg">GrowthScale</span>
        </div>
        
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} GrowthScale. Ferramentas de gestão inteligente para otimização operacional.
        </p>
      </div>
    </div>
  </footer>
);

// --- PÁGINA PRINCIPAL VANGUARDA ---
export default function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
