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
  Pizza,
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
        <Link to="/#solucao" className="text-muted-foreground transition-colors hover:text-foreground">Solução</Link>
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
  <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary-dark to-success overflow-hidden">
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
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-success/20 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 container mx-auto px-4 py-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
          <ShieldCheck className="h-5 w-5 text-white" />
          <span className="text-white font-medium">+500 restaurantes já confiam</span>
          <Star className="h-4 w-4 text-accent fill-accent" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight animate-fade-in-up">
          <span className="block">Transforme o caos das</span>
          <span className="block bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
            escalas em harmonia
          </span>
          <span className="block">com IA inteligente</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 animate-fade-in-up delay-200">
          Economize 15 horas por semana. Elimine multas CLT. 
          <span className="font-bold text-accent"> IA que entende o ritmo da sua cozinha.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up delay-400">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-12 w-12 text-accent" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">15h</div>
            <div className="text-white/80">Economizadas por semana</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-success" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-white/80">Compliance CLT</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-12 w-12 text-accent" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">R$ 2.5k</div>
            <div className="text-white/80">Economia mensal</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
          <Button className="bg-accent hover:bg-accent-dark text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105">
            <ChefHat className="mr-2 h-6 w-6" />
            Começar Gratuitamente
          </Button>
          <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <PlayCircle className="mr-2 h-6 w-6" />
            Ver Demonstração
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

const SolutionSection = () => (
  <section id="solucao" className="py-24 bg-gradient-to-br from-neutral-light to-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral mb-6">
          A solução completa para sua operação
        </h2>
        <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
          Do pequeno café ao grande restaurante, resolvemos todos os problemas de escala
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group bg-white rounded-2xl p-8 shadow-xl border border-neutral/10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Utensils className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral text-center mb-4">Restaurantes</h3>
          <p className="text-neutral/60 text-center text-sm">
            Escalas complexas com múltiplos turnos e especialidades
          </p>
        </div>

        <div className="group bg-white rounded-2xl p-8 shadow-xl border border-neutral/10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-success-light rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Wine className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral text-center mb-4">Bares</h3>
          <p className="text-neutral/60 text-center text-sm">
            Gestão de equipes para horários noturnos e eventos
          </p>
        </div>

        <div className="group bg-white rounded-2xl p-8 shadow-xl border border-neutral/10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Coffee className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral text-center mb-4">Cafés</h3>
          <p className="text-neutral/60 text-center text-sm">
            Equipes menores com horários flexíveis e sazonalidade
          </p>
        </div>

        <div className="group bg-white rounded-2xl p-8 shadow-xl border border-neutral/10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-dark to-neutral rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Pizza className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral text-center mb-4">Fast Food</h3>
          <p className="text-neutral/60 text-center text-sm">
            Alta rotatividade e múltiplas filiais com padrões
          </p>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-24 bg-gradient-to-br from-neutral to-neutral-light">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Benefícios que transformam sua operação
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Cada funcionalidade resolve um problema real do food service
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">Economia de Tempo</h3>
          <p className="text-white/80 text-center mb-6">
            Transforme 4 horas de trabalho em 5 minutos com IA inteligente
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-accent">90%</div>
            <div className="text-white/60 ml-2">menos tempo</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-success-light rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">Compliance CLT</h3>
          <p className="text-white/80 text-center mb-6">
            Validação automática de todas as regras trabalhistas
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-success">100%</div>
            <div className="text-white/60 ml-2">conformidade</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">Economia de Dinheiro</h3>
          <p className="text-white/80 text-center mb-6">
            Reduza custos operacionais e evite multas trabalhistas
          </p>
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-primary">R$ 2.5k</div>
            <div className="text-white/60 ml-2">economia/mês</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <div className="mb-8">
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Confiado por +500 restaurantes
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
          Gestores que já recuperaram suas noites de domingo
        </h2>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-neutral-light rounded-2xl p-8 shadow-xl border border-neutral/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <div className="font-semibold text-neutral">Maria Silva</div>
              <div className="text-sm text-neutral/60">Dona do Bistrô Sabor & Arte</div>
            </div>
          </div>
          <p className="text-neutral/70 italic mb-4">
            "Antes do GrowthScale, eu perdia 4 horas todo domingo criando escalas. Agora leva 5 minutos. 
            E a tranquilidade de saber que estamos sempre em conformidade com a CLT é inestimável. 
            Economizamos R$ 3.200 por mês em horas extras."
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral/60">
            <span><Check className="inline h-4 w-4 text-success mr-1" />15h economizadas por semana</span>
            <span><Check className="inline h-4 w-4 text-success mr-1" />100% conformidade CLT</span>
            <span><Check className="inline h-4 w-4 text-success mr-1" />R$ 3.2k economia mensal</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="precos" className="py-20 md:py-28 bg-neutral-light" aria-labelledby="pricing-title">
    <div className="container mx-auto px-4">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-neutral">Um plano para cada tamanho de ambição.</h2>
        <p className="text-lg text-neutral/70 mt-4">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Para equipas pequenas a começar.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$0</p>
            <ul className="space-y-2 text-neutral/60">
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Até 5 funcionários</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Criação de escalas básica</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Validação CLT básica</li>
            </ul>
          </CardContent>
          <Button asChild variant="outline" className="m-6">
            <Link to="/auth">Começar de Graça</Link>
          </Button>
        </Card>
        
        <Card className="flex flex-col border-primary ring-2 ring-primary relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-accent text-white">Mais Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle>Business</CardTitle>
            <CardDescription>Para operações que precisam de poder total.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-neutral/60">/mês</span></p>
            <ul className="space-y-2 text-neutral/60">
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Até 25 funcionários</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Sugestões de Escala com IA</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Alertas de Risco CLT</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Simulador de Custos</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Integração WhatsApp</li>
            </ul>
          </CardContent>
          <Button asChild className="m-6 bg-accent hover:bg-accent-dark">
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
            <ul className="space-y-2 text-neutral/60">
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Funcionários ilimitados</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Múltiplas filiais</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />Suporte dedicado</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-success" />API personalizada</li>
            </ul>
          </CardContent>
          <Button asChild variant="outline" className="m-6">
            <Link to="/contato">Agendar Demonstração</Link>
          </Button>
        </Card>
      </div>
      
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-success/10 rounded-full px-6 py-3 border border-success/20">
          <ShieldCheck className="h-5 w-5 text-success" />
          <span className="text-sm font-medium text-success">Teste grátis por 14 dias • Cancele quando quiser</span>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-neutral border-t border-neutral/20">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div><h3 className="font-semibold text-white mb-4">Produto</h3><ul className="space-y-2"><li><Link to="/#solucao" className="text-white/60 hover:text-white">Solução</Link></li><li><Link to="/#precos" className="text-white/60 hover:text-white">Preços</Link></li></ul></div>
      <div><h3 className="font-semibold text-white mb-4">Empresa</h3><ul className="space-y-2"><li><Link to="/sobre" className="text-white/60 hover:text-white">Sobre Nós</Link></li><li><Link to="/contato" className="text-white/60 hover:text-white">Contato</Link></li></ul></div>
      <div><h3 className="font-semibold text-white mb-4">Legal</h3><ul className="space-y-2"><li><Link to="/legal/termos" className="text-white/60 hover:text-white">Termos de Uso</Link></li><li><Link to="/legal/privacidade" className="text-white/60 hover:text-white">Política de Privacidade</Link></li></ul></div>
      <div className="col-span-2 md:col-span-1 text-right md:text-left"><Link to="/" className="flex items-center justify-end md:justify-start space-x-2 mb-4"><ChefHat className="h-6 w-6 text-accent" /><span className="font-bold text-white">GrowthScale</span></Link><p className="text-white/60 text-sm">© {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controlo.</p></div>
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
        <SolutionSection />
        <BenefitsSection />
        <SocialProofSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}