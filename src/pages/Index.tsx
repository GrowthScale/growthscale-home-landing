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
  AlertTriangle, 
  Users, 
  Zap, 
  ArrowRight, 
  Sparkles,
  ChefHat,
  Utensils,
  Coffee,
  Wine,
  Hamburger,
  Brain,
  CheckCircle,
  MessageCircle,
  Headphones,
  DollarSign,
  Shield
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">GrowthScale</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link to="/#recursos" className="text-muted-foreground transition-colors hover:text-foreground">Recursos</Link>
        <Link to="/#precos" className="text-muted-foreground transition-colors hover:text-foreground">Preços</Link>
      </nav>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Button asChild variant="ghost">
          <Link to="/auth">Entrar</Link>
        </Button>
        <Button asChild>
          <Link to="/auth">Começar Agora</Link>
        </Button>
      </div>
    </div>
  </header>
);

const UrgencyBanner = () => (
  <div className="bg-accent/10 border-b border-accent/20">
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-accent">
        <AlertTriangle className="h-4 w-4" />
        <span>⚠️ Últimas 23 vagas para demonstração gratuita</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">⏰ Oferta expira em 2h 47min</span>
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section className="relative min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 animate-bounce">
        <ChefHat className="h-16 w-16 text-white/20" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <Utensils className="h-12 w-12 text-white/20" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce delay-1000">
        <Coffee className="h-14 w-14 text-white/20" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 container mx-auto px-4 py-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
          <ChefHat className="h-5 w-5 text-white" />
          <span className="text-white font-medium">+500 restaurantes já confiam</span>
          <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight animate-fade-in-up">
          <span className="block">Onde a</span>
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            paixão pela comida
          </span>
          <span className="block">encontra a</span>
          <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            eficiência operacional
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 animate-fade-in-up delay-200">
          Transforme o caos das escalas em harmonia. 
          <span className="font-bold text-yellow-300"> IA inteligente</span> que entende o ritmo da sua cozinha.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up delay-400">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-12 w-12 text-yellow-300" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">15h</div>
            <div className="text-white/80">Economizadas por semana</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-green-300" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-white/80">Compliance CLT</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-12 w-12 text-orange-300" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">R$ 2.5k</div>
            <div className="text-white/80">Economia mensal</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
          <Button className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105">
            <ChefHat className="mr-2 h-6 w-6" />
            Começar a Otimizar
          </Button>
          <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <PlayCircle className="mr-2 h-6 w-6" />
            Ver em Ação
          </Button>
        </div>

        <div className="mt-12 text-white/80 animate-fade-in-up delay-800">
          <ShieldCheck className="inline h-5 w-5 mr-2" />
          Teste grátis por 14 dias • Cancele quando quiser • Sem compromisso
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 animate-fade-in-up delay-1000">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
        <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="w-96 h-64 object-cover rounded-xl" />
      </div>
    </div>
  </section>
);

const EstablishmentTypes = () => (
  <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Para todos os tipos de estabelecimento
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Do pequeno café ao grande restaurante, o GrowthScale se adapta ao seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Utensils className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Restaurantes</h3>
          <p className="text-gray-400 text-center text-sm">
            Escalas complexas com múltiplos turnos e especialidades
          </p>
        </div>

        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Wine className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Bares</h3>
          <p className="text-gray-400 text-center text-sm">
            Gestão de equipes para horários noturnos e eventos
          </p>
        </div>

        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Coffee className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Cafés</h3>
          <p className="text-gray-400 text-center text-sm">
            Equipes menores com horários flexíveis e sazonalidade
          </p>
        </div>

        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Hamburger className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Fast Food</h3>
          <p className="text-gray-400 text-center text-sm">
            Alta rotatividade e múltiplas filiais com padrões
          </p>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-24 bg-gradient-to-br from-blue-900 to-purple-900">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Como funciona
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Simples, rápido e eficiente. Como deve ser na cozinha
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Configure sua equipe</h3>
            <p className="text-gray-300 mb-6">
              Adicione seus funcionários com horários, habilidades e preferências
            </p>
            <div className="flex items-center justify-center">
              <Users className="h-12 w-12 text-blue-300" />
            </div>
          </div>
          <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
            <ArrowRight className="h-8 w-8 text-white/50" />
          </div>
        </div>

        <div className="relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">IA otimiza automaticamente</h3>
            <p className="text-gray-300 mb-6">
              Nossa IA cria a escala perfeita em segundos, respeitando todas as regras
            </p>
            <div className="flex items-center justify-center">
              <Brain className="h-12 w-12 text-purple-300" />
            </div>
          </div>
          <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
            <ArrowRight className="h-8 w-8 text-white/50" />
          </div>
        </div>

        <div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Aprove e relaxe</h3>
            <p className="text-gray-300 mb-6">
              Aprove a escala otimizada e tenha tempo para o que realmente importa
            </p>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-pink-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-24 bg-gradient-to-br from-slate-100 to-slate-200">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Benefícios que fazem a diferença
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Cada funcionalidade foi pensada para resolver problemas reais do food service
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Economia de Tempo</h3>
          <p className="text-slate-600 text-center mb-6">
            Transforme 4 horas de trabalho em 5 minutos com IA inteligente
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-blue-600">90%</div>
            <div className="text-slate-500 ml-2">menos tempo</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Compliance CLT</h3>
          <p className="text-slate-600 text-center mb-6">
            Validação automática de todas as regras trabalhistas
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="text-slate-500 ml-2">conformidade</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Economia de Dinheiro</h3>
          <p className="text-slate-600 text-center mb-6">
            Reduza custos operacionais e evite multas trabalhistas
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-orange-600">R$ 2.5k</div>
            <div className="text-slate-500 ml-2">economia/mês</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Comunicação</h3>
          <p className="text-slate-600 text-center mb-6">
            Notificações automáticas via WhatsApp para toda a equipe
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-purple-600">90%</div>
            <div className="text-slate-500 ml-2">menos ausências</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Analytics</h3>
          <p className="text-slate-600 text-center mb-6">
            Dashboard com métricas de produtividade e insights
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-red-600">24/7</div>
            <div className="text-slate-500 ml-2">monitoramento</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Headphones className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Suporte</h3>
          <p className="text-slate-600 text-center mb-6">
            Implementação em 24h com treinamento incluído
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-teal-600">24h</div>
            <div className="text-slate-500 ml-2">setup completo</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4 text-center">
      <div className="mb-8">
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Confiado por +500 restaurantes
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Gestores que já recuperaram suas noites de domingo
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto mb-12">
        <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
          <img src="/assets/logo-bistro.png" alt="Logo do Bistrô Sabor & Arte" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
          <img src="/assets/logo-sabores.png" alt="Logo do Grupo Sabores do Brasil" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
          <img src="/assets/logo-pizzaria.png" alt="Logo da Pizzaria Napolitana" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
          <img src="/assets/logo-cafe.png" alt="Logo do Café Central" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
          <img src="/assets/logo-hamburgueria.png" alt="Logo da Rede de Hamburguerias" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <div className="font-semibold text-foreground">Maria Silva</div>
              <div className="text-sm text-muted-foreground">Dona do Bistrô Sabor & Arte</div>
            </div>
          </div>
          <p className="text-muted-foreground italic mb-4">
            "Antes do GrowthScale, eu perdia 4 horas todo domingo criando escalas. Agora leva 5 minutos. 
            E a tranquilidade de saber que estamos sempre em conformidade com a CLT é inestimável. 
            Economizamos R$ 3.200 por mês em horas extras."
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span><Check className="inline h-4 w-4 text-accent mr-1" />15h economizadas por semana</span>
            <span><Check className="inline h-4 w-4 text-accent mr-1" />100% conformidade CLT</span>
            <span><Check className="inline h-4 w-4 text-accent mr-1" />R$ 3.2k economia mensal</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Não acredite apenas na nossa palavra.</h2>
      <Card className="p-8 text-center shadow-lg bg-secondary">
        <div className="flex justify-center mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}</div>
        <blockquote className="text-xl md:text-2xl font-medium text-foreground">"O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipa foi notificada não tem preço. Mudou o jogo para nós."</blockquote>
        <footer className="mt-6"><p className="font-semibold">Joana Silva</p><p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p></footer>
      </Card>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="py-20 md:py-28 bg-secondary" aria-labelledby="faq-title">
    <div className="container mx-auto px-4 max-w-3xl">
      <header className="text-center mb-12">
        <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-foreground">Respostas claras para as suas dúvidas.</h2>
        <p className="text-lg text-muted-foreground mt-4">Tudo que você precisa saber antes de começar</p>
      </header>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>O GrowthScale substitui um advogado ou contador?</AccordionTrigger>
          <AccordionContent>
            Não. O GrowthScale é uma poderosa plataforma de inteligência operacional desenhada para lhe dar clareza sobre as regras da CLT e alertá-lo para potenciais riscos. Ele não fornece aconselhamento jurídico e não substitui a orientação de um profissional qualificado.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>A implementação é demorada?</AccordionTrigger>
          <AccordionContent>
            Não. O nosso onboarding guiado permite-lhe configurar a sua empresa e importar os seus funcionários em menos de 30 minutos. O nosso suporte está disponível para o ajudar em cada passo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Os meus dados estão seguros?</AccordionTrigger>
          <AccordionContent>
            Sim. A segurança é a nossa prioridade máxima. Utilizamos as melhores práticas do mercado, como criptografia de ponta e isolamento de dados por cliente, para garantir que as suas informações estejam sempre protegidas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Posso cancelar quando quiser?</AccordionTrigger>
          <AccordionContent>
            Sim. Não há contratos de longo prazo. Você pode cancelar a qualquer momento através da sua conta. O seu acesso permanecerá ativo até o final do período de faturação.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Quanto tempo leva para ver resultados?</AccordionTrigger>
          <AccordionContent>
            A maioria dos nossos clientes vê resultados imediatos. No primeiro mês, você economizará em média 15 horas por semana e reduzirá significativamente o stress relacionado com a gestão de escalas.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="precos" className="py-20 md:py-28 bg-background" aria-labelledby="pricing-title">
    <div className="container mx-auto px-4">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2>
        <p className="text-lg text-muted-foreground mt-4">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Para equipas pequenas a começar.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$0</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 5 funcionários</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Criação de escalas básica</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Validação CLT básica</li>
            </ul>
          </CardContent>
          <Button asChild variant="outline" className="m-6">
            <Link to="/auth">Começar de Graça</Link>
          </Button>
        </Card>
        
        <Card className="flex flex-col border-primary ring-2 ring-primary relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-accent text-accent-foreground">Mais Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle>Business</CardTitle>
            <CardDescription>Para operações que precisam de poder total.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Simulador de Custos</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Integração WhatsApp</li>
            </ul>
          </CardContent>
          <Button asChild className="m-6">
            <Link to="/auth">Escolher Business</Link>
          </Button>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Para redes e grandes operações.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">Contacto</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Funcionários ilimitados</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Múltiplas filiais</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Suporte dedicado</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />API personalizada</li>
            </ul>
          </CardContent>
          <Button asChild variant="outline" className="m-6">
            <Link to="/contato">Agendar Demonstração</Link>
          </Button>
        </Card>
      </div>
      
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 border border-primary/20">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Teste grátis por 14 dias • Cancele quando quiser</span>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-secondary border-t">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div><h3 className="font-semibold text-foreground mb-4">Produto</h3><ul className="space-y-2"><li><Link to="/#recursos" className="text-muted-foreground hover:text-foreground">Recursos</Link></li><li><Link to="/#precos" className="text-muted-foreground hover:text-foreground">Preços</Link></li></ul></div>
      <div><h3 className="font-semibold text-foreground mb-4">Empresa</h3><ul className="space-y-2"><li><Link to="/sobre" className="text-muted-foreground hover:text-foreground">Sobre Nós</Link></li><li><Link to="/contato" className="text-muted-foreground hover:text-foreground">Contato</Link></li></ul></div>
      <div><h3 className="font-semibold text-foreground mb-4">Legal</h3><ul className="space-y-2"><li><Link to="/legal/termos" className="text-muted-foreground hover:text-foreground">Termos de Uso</Link></li><li><Link to="/legal/privacidade" className="text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li></ul></div>
      <div className="col-span-2 md:col-span-1 text-right md:text-left"><Link to="/" className="flex items-center justify-end md:justify-start space-x-2 mb-4"><ChefHat className="h-6 w-6 text-primary" /><span className="font-bold text-foreground">GrowthScale</span></Link><p className="text-muted-foreground text-sm">© {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controlo.</p></div>
    </div>
  </footer>
);

export default function Index() {
  return (
    <>
      <Header />
      <UrgencyBanner />
      <main>
        <HeroSection />
        <EstablishmentTypes />
        <HowItWorks />
        <BenefitsSection />
        <SocialProofSection />
        <TestimonialsSection />
        <FaqSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}