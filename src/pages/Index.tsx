// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, Check, X, Star, ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- COMPONENTES DA PÁGINA ---

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
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
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/auth">Começar Agora</Link>
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
    
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        {/* Badge de Destaque */}
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent mb-8 animate-fade-in-up">
          <Sparkles className="h-4 w-4" />
          Plataforma de Inteligência Operacional
        </div>
        
        {/* Título Principal */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 animate-fade-in-up leading-tight">
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Onde a gestão de escalas
          </span>
          <br />
          <span className="text-foreground">
            encontra a paz de espírito
          </span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é a plataforma que transforma o 
          <span className="text-accent font-semibold"> caos das escalas </span>
          em 
          <span className="text-primary font-semibold"> controlo absoluto</span>. 
          Automatize, preveja custos e opere com clareza sobre as regras da CLT.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105">
            <Link to="/auth">Começar a Simplificar Agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold transition-all duration-300 hover:scale-105">
            <Link to="/#recursos">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver a Magia
            </Link>
          </Button>
        </div>
        
        {/* Estatísticas de Confiança */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Redução de Stress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5min</div>
            <div className="text-sm text-muted-foreground">Para Criar Escalas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Conformidade CLT</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
        <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-24 bg-secondary relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
    
    <div className="container mx-auto px-4 text-center relative z-10">
      {/* Badge de Confiança */}
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-8">
        <ShieldCheck className="h-4 w-4" />
        Confiado por +500 Restaurantes
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        A ferramenta de confiança para gestores que valorizam o seu tempo
      </h2>
      
      <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
        Junte-se aos restaurantes que já transformaram a gestão de escalas com o GrowthScale
      </p>
      
      {/* Logos com efeito hover */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto">
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
      
      {/* Testimonial */}
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <div className="font-semibold text-foreground">Maria Silva</div>
              <div className="text-sm text-muted-foreground">Gestora do Bistrô Sabor & Arte</div>
            </div>
          </div>
          <p className="text-muted-foreground italic">
            "O GrowthScale transformou completamente a nossa gestão. O que antes levava horas, agora leva minutos. E a tranquilidade de saber que estamos sempre em conformidade com a CLT é inestimável."
          </p>
        </div>
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section id="recursos" className="py-24 md:py-32 bg-background relative overflow-hidden" aria-labelledby="solution-title">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-accent/5"></div>
    
    <div className="container mx-auto px-4 space-y-32 relative z-10">
      {/* Header da Seção */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent mb-6">
          <Zap className="h-4 w-4" />
          Transformação Digital
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          De um quebra-cabeças stressante a uma decisão de 5 minutos.
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Você sabe o quão caótico é: planilhas, grupos de WhatsApp, trocas de última hora e a preocupação constante com as regras da CLT. O GrowthScale foi desenhado para eliminar este caos.
        </p>
      </div>
      
      {/* Bloco 1: Segurança Jurídica */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" /> Segurança Jurídica
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            O seu Co-Piloto CLT, 24/7.
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Enquanto você arrasta e solta, a nossa IA audita cada turno, alertando-o para potenciais riscos de intervalos e excesso de jornada. Opere com a clareza de quem toma decisões informadas.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-accent">
              <Check className="h-5 w-5" />
              <span className="font-medium">Validação automática</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Check className="h-5 w-5" />
              <span className="font-medium">Alertas em tempo real</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
          <div className="relative rounded-2xl p-4 bg-white border border-border shadow-2xl">
            <img src="/assets/img-solution-security.png" alt="Demonstração do GrowthScale a analisar as regras da CLT e a garantir a segurança jurídica da escala" className="rounded-xl shadow-xl" />
          </div>
        </div>
      </div>
      
      {/* Bloco 2: Eficiência Máxima */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative md:order-last">
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-xl"></div>
          <div className="relative rounded-2xl p-4 bg-white border border-border shadow-2xl">
            <img src="/assets/img-solution-efficiency.png" alt="Demonstração da Inteligência Artificial do GrowthScale a preencher uma escala de trabalho automaticamente" className="rounded-xl shadow-xl" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent">
            <Clock className="h-4 w-4" /> Eficiência Máxima
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Recupere as suas horas.
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique. Mais tempo para si, para a sua equipa e para os seus clientes.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-primary">
              <Check className="h-5 w-5" />
              <span className="font-medium">IA inteligente</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Check className="h-5 w-5" />
              <span className="font-medium">Otimização automática</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bloco 3: Controle Financeiro */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
          <div className="relative rounded-2xl p-4 bg-white border border-border shadow-2xl">
            <img src="/assets/img-solution-costs.png" alt="Demonstração do simulador de custos do GrowthScale" className="rounded-xl shadow-xl" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary">
            <BarChart3 className="h-4 w-4" /> Controle Financeiro
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Decisões baseadas em dados, não em achismo.
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Saiba o custo exato de cada escala antes mesmo de a publicar. O nosso simulador em tempo real mostra o impacto de cada decisão nas suas horas extras e no seu orçamento, dando-lhe o poder de otimizar a sua lucratividade.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-accent">
              <Check className="h-5 w-5" />
              <span className="font-medium">Simulador em tempo real</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Check className="h-5 w-5" />
              <span className="font-medium">Otimização de custos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 md:py-32 bg-secondary">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Não acredite apenas na nossa palavra.</h2>
      <Card className="p-8 text-center shadow-lg bg-background">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-accent fill-accent" />
          ))}
        </div>
        <blockquote className="text-xl md:text-2xl font-medium text-foreground">
          "O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipa foi notificada não tem preço. Mudou o jogo para nós."
        </blockquote>
        <footer className="mt-6">
          <p className="font-semibold">Joana Silva</p>
          <p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p>
        </footer>
      </Card>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="precos" className="py-24 md:py-32 bg-background" aria-labelledby="pricing-title">
    <div className="container mx-auto px-4">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">
          Um plano para cada tamanho de ambição.
        </h2>
        <p className="text-lg text-muted-foreground mt-4">
          Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.
        </p>
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
            </ul>
          </CardContent>
          <Button asChild variant="outline" className="m-6">
            <Link to="/auth">Começar de Graça</Link>
          </Button>
        </Card>
        
        <Card className="flex flex-col border-primary ring-2 ring-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Business</CardTitle>
              <Badge className="bg-accent text-accent-foreground">Mais Popular</Badge>
            </div>
            <CardDescription>Para operações que precisam de poder total.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li>
              <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Simulador de Custos</li>
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
            </ul>
          </CardContent>
          <Button asChild variant="outline" className="m-6">
            <Link to="/contato">Agendar Demonstração</Link>
          </Button>
        </Card>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-secondary border-t">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Produto</h3>
        <ul className="space-y-2">
          <li><Link to="/#recursos" className="text-muted-foreground hover:text-foreground">Recursos</Link></li>
          <li><Link to="/#precos" className="text-muted-foreground hover:text-foreground">Preços</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
        <ul className="space-y-2">
          <li><Link to="/sobre" className="text-muted-foreground hover:text-foreground">Sobre Nós</Link></li>
          <li><Link to="/contato" className="text-muted-foreground hover:text-foreground">Contato</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
        <ul className="space-y-2">
          <li><Link to="/legal/termos" className="text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
          <li><Link to="/legal/privacidade" className="text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1 text-right md:text-left">
        <Link to="/" className="flex items-center justify-end md:justify-start space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="font-bold text-foreground">GrowthScale</span>
        </Link>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controlo.
        </p>
      </div>
    </div>
  </footer>
);

// --- A PÁGINA PRINCIPAL QUE JUNTA TUDO ---
export default function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <SolutionSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}