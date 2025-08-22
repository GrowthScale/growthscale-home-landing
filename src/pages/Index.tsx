// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, Check, Star, ArrowRight, Zap, Users, TrendingUp, Award, Globe, Lock, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- COMPONENTES DA PÁGINA ---

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl text-foreground">GrowthScale</span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
        <Link to="/#recursos" className="text-muted-foreground transition-colors hover:text-foreground hover:text-primary">Recursos</Link>
        <Link to="/#precos" className="text-muted-foreground transition-colors hover:text-foreground hover:text-primary">Preços</Link>
        <Link to="/#sobre" className="text-muted-foreground transition-colors hover:text-foreground hover:text-primary">Sobre</Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" className="font-medium">
          <Link to="/auth">Entrar</Link>
        </Button>
        <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
          <Link to="/auth" className="flex items-center">
            Começar Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative w-full py-32 md:py-40 lg:py-48 text-center bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <Badge className="mb-8 bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground border-accent/20 px-4 py-2 text-sm font-medium">
          <Zap className="mr-2 h-4 w-4" />
          Nova Versão 2.1.0 - Design System Vanguarda
        </Badge>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-8 animate-fade-in-up leading-tight">
          Onde a <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">gestão de escalas</span> encontra a 
          <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent"> paz de espírito</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é a plataforma de <strong>inteligência operacional</strong> que transforma o caos das escalas em 
          <strong> controle absoluto</strong>. Automatize, preveja custos e opere com clareza sobre as regras da CLT.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up mb-16" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Link to="/auth" className="flex items-center font-semibold">
              Começar a Simplificar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-secondary/50 shadow-lg">
            <Link to="/#recursos" className="flex items-center font-semibold">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver em Ação
            </Link>
          </Button>
        </div>
        
        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background"></div>
              ))}
            </div>
            <span>+500 gestores confiam</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-accent" />
            <span>99.9% uptime garantido</span>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="mt-20 max-w-7xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-3 border border-border/20 shadow-2xl">
            <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="rounded-2xl w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-16 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-lg text-muted-foreground font-medium">
          A ferramenta de confiança para gestores que valorizam o seu tempo e a sua tranquilidade
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Restaurante Modelo</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center">
            <Globe className="h-8 w-8 text-accent" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Bistrô Fictício</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Grupo Sabor</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center">
            <Lock className="h-8 w-8 text-accent" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Casa Gourmet</span>
        </div>
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section id="recursos" className="py-32 bg-gradient-to-br from-background-dark via-background-dark to-slate-900 text-foreground-dark" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-32">
      <header className="text-center mb-20 max-w-4xl mx-auto">
        <Badge className="mb-6 bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
          <Sparkles className="mr-2 h-4 w-4" />
          Solução Completa
        </Badge>
        <h2 id="solution-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          A sua operação, finalmente sob <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">controle</span>
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          De um quebra-cabeças stressante a uma decisão de 5 minutos. 
          <br />Transforme a gestão de escalas em uma experiência fluida e eficiente.
        </p>
      </header>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <Badge className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Segurança Jurídica
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold leading-tight">
            O seu <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Co-Piloto CLT</span>, 24/7
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A nossa IA audita cada turno, alertando-o para potenciais riscos de intervalos e excesso de jornada. 
            Opere com a clareza de quem toma decisões informadas e seguras.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>Auditoria automática CLT</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>Alertas em tempo real</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>Relatórios de compliance</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 border border-border-dark shadow-2xl">
            <img src="/placeholder-gif-1-dark.png" alt="Demonstração do alerta de compliance" className="rounded-2xl w-full" />
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative lg:order-last">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 border border-border-dark shadow-2xl">
            <img src="/placeholder-gif-2-dark.png" alt="Demonstração da sugestão de IA" className="rounded-2xl w-full" />
          </div>
        </div>
        <div className="space-y-6">
          <Badge className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-accent/20 px-4 py-2 text-sm font-medium">
            <Clock className="mr-2 h-4 w-4" />
            Eficiência Máxima
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold leading-tight">
            Recupere as suas <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">horas</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique. 
            Mais tempo para si, para a sua equipa e para os seus clientes.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>IA generativa de escalas</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>Otimização automática</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>Notificações inteligentes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-32 bg-gradient-to-br from-background via-secondary/30 to-background">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
          Não acredite apenas na nossa <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">palavra</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Veja o que os gestores estão dizendo sobre a transformação que o GrowthScale trouxe para suas operações
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-background to-secondary/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-accent fill-accent" />
            ))}
          </div>
          <blockquote className="text-lg font-medium text-foreground mb-6 leading-relaxed">
            "O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipa foi notificada não tem preço. Mudou o jogo para nós."
          </blockquote>
          <footer className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <span className="font-bold text-primary">JS</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Joana Silva</p>
              <p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p>
            </div>
          </footer>
        </Card>
        
        <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-background to-secondary/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-accent fill-accent" />
            ))}
          </div>
          <blockquote className="text-lg font-medium text-foreground mb-6 leading-relaxed">
            "A automação das escalas reduziu nossos custos em 30% e eliminou completamente os erros de compliance. O ROI foi imediato e a equipe adora a transparência."
          </blockquote>
          <footer className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
              <span className="font-bold text-accent">MC</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Miguel Costa</p>
              <p className="text-muted-foreground">Diretor, Grupo Gastronômico</p>
            </div>
          </footer>
        </Card>
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="precos" className="py-32 bg-secondary/50" aria-labelledby="pricing-title">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <Badge className="mb-6 bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-accent/20 px-4 py-2 text-sm font-medium">
          <TrendingUp className="mr-2 h-4 w-4" />
          Planos Flexíveis
        </Badge>
        <h2 id="pricing-title" className="text-4xl md:text-5xl font-black text-foreground mb-6">
          Escolha o plano que <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">cresce</span> com você
        </h2>
        <p className="text-xl text-muted-foreground">
          Comece grátis e escale conforme sua operação cresce. Sem surpresas, sem taxas ocultas.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="p-8 shadow-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">Starter</CardTitle>
            <CardDescription className="text-muted-foreground">Perfeito para pequenas operações</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-black text-foreground">R$ 0</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Até 10 funcionários</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Escalas básicas</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Alertas CLT</span>
              </div>
            </div>
            <Button asChild className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
              <Link to="/auth">Começar Grátis</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="p-8 shadow-2xl border-2 border-primary relative bg-gradient-to-br from-background to-primary/5">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-accent to-accent/90 text-white px-4 py-2 text-sm font-medium">
              Mais Popular
            </Badge>
          </div>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">Professional</CardTitle>
            <CardDescription className="text-muted-foreground">Para operações em crescimento</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-black text-foreground">R$ 99</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Até 50 funcionários</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">IA generativa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Analytics avançados</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Suporte prioritário</span>
              </div>
            </div>
            <Button asChild className="w-full mt-6 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white">
              <Link to="/auth">Escolher Professional</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="p-8 shadow-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">Enterprise</CardTitle>
            <CardDescription className="text-muted-foreground">Para grandes operações</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-black text-foreground">R$ 299</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Funcionários ilimitados</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Múltiplas filiais</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">API personalizada</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="text-foreground">Gerente de conta</span>
              </div>
            </div>
            <Button asChild className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
              <Link to="/auth">Falar com Vendas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 bg-gradient-to-br from-background-dark via-background-dark to-slate-900 text-foreground-dark">
    <div className="container mx-auto px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge className="mb-6 bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-accent/20 px-4 py-2 text-sm font-medium">
          <Sparkles className="mr-2 h-4 w-4" />
          Pronto para Transformar?
        </Badge>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">
          Comece sua <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">transformação</span> hoje
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Junte-se a centenas de gestores que já transformaram suas operações com o GrowthScale. 
          Sua jornada para a excelência operacional começa agora.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Link to="/auth" className="flex items-center font-semibold">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-12 py-6 border-2 border-foreground-dark hover:bg-foreground-dark/10">
            <Link to="/contact" className="flex items-center font-semibold">
              Falar com Especialista
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-16 bg-background border-t border-border/40">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">GrowthScale</span>
          </div>
          <p className="text-muted-foreground">
            Transformando a gestão de escalas em uma experiência fluida e eficiente.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Produto</h3>
          <div className="space-y-2">
            <Link to="/#recursos" className="block text-muted-foreground hover:text-foreground transition-colors">Recursos</Link>
            <Link to="/#precos" className="block text-muted-foreground hover:text-foreground transition-colors">Preços</Link>
            <Link to="/auth" className="block text-muted-foreground hover:text-foreground transition-colors">Login</Link>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Empresa</h3>
          <div className="space-y-2">
            <Link to="/#sobre" className="block text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">Contato</Link>
            <Link to="/legal" className="block text-muted-foreground hover:text-foreground transition-colors">Legal</Link>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Suporte</h3>
          <div className="space-y-2">
            <Link to="/faq" className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">Ajuda</Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border/40 mt-12 pt-8 text-center">
        <p className="text-muted-foreground">
          © 2024 GrowthScale. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

// --- PÁGINA PRINCIPAL ---
export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <SolutionSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}