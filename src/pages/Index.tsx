// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, Check, Star, ArrowRight, Zap, Target, Users, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ComparisonSection } from '@/components/ComparisonSection';
import { FaqSection } from '@/components/FAQSection';

// --- HEADER COM PSICOLOGIA DE AUTORIDADE ---
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl shadow-sm">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg opacity-20 blur-sm"></div>
          <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
        </div>
        <span className="font-bold text-xl text-foreground">GrowthScale</span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
        <Link to="/#problema" className="text-muted-foreground transition-colors hover:text-primary relative group">
          O Problema
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></div>
        </Link>
        <Link to="/#solucao" className="text-muted-foreground transition-colors hover:text-primary relative group">
          A Solução
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></div>
        </Link>
        <Link to="/#precos" className="text-muted-foreground transition-colors hover:text-primary relative group">
          Investimento
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></div>
        </Link>
      </nav>
      
      <div className="flex items-center space-x-3">
        <Button asChild variant="ghost" className="font-medium">
          <Link to="/auth">Entrar</Link>
        </Button>
        <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link to="/auth" className="flex items-center space-x-2">
            <span>Começar Agora</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </header>
);

// --- HERO COM GATILHOS DE DOPAMINA ---
const HeroSection = () => (
  <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
    {/* Background com gradiente sutil */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
    
    <div className="relative container mx-auto px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge de urgência */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 px-4 py-2 text-sm font-medium text-accent mb-8 animate-fade-in-up">
          <Zap className="h-4 w-4" />
          <span>Nova tecnologia de IA para gestão de escalas</span>
        </div>
        
        {/* Título principal com psicologia de transformação */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 animate-fade-in-up">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Transforme o caos
          </span>
          <br />
          <span className="text-foreground">em controle absoluto</span>
        </h1>
        
        {/* Subtítulo com benefício emocional */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up leading-relaxed">
          A plataforma que <strong className="text-foreground">elimina o stress</strong> da gestão de escalas e 
          <strong className="text-foreground"> protege seu negócio</strong> contra riscos trabalhistas. 
          <br />
          <span className="text-lg">Opere com a tranquilidade de quem tem tudo sob controle.</span>
        </p>
        
        {/* CTAs com psicologia de urgência e escassez */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <Link to="/auth" className="flex items-center space-x-3">
              <span>Começar Gratuitamente</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary transition-all duration-300">
            <Link to="/#solucao" className="flex items-center space-x-3">
              <PlayCircle className="h-5 w-5" />
              <span>Ver Como Funciona</span>
            </Link>
          </Button>
        </div>
        
        {/* Prova social sutil */}
        <div className="text-sm text-muted-foreground animate-fade-in-up">
          <span className="font-medium text-foreground">Gestores experientes</span> já confiam na tecnologia GrowthScale
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PROBLEMA (AGITAÇÃO) ---
const ProblemSection = () => (
  <section id="problema" className="py-20 md:py-28 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          O que está <span className="text-destructive">destruindo</span> sua tranquilidade?
        </h2>
        <p className="text-lg text-muted-foreground">
          Gestores de restaurantes enfrentam desafios invisíveis que comprometem o sucesso do negócio
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            icon: ShieldCheck,
            title: "Riscos Ocultos",
            description: "Processos trabalhistas que surgem quando você menos espera, comprometendo lucros e reputação.",
            color: "text-destructive"
          },
          {
            icon: Clock,
            title: "Tempo Perdido",
            description: "Horas desperdiçadas criando escalas manualmente, quando poderiam ser investidas no crescimento.",
            color: "text-destructive"
          },
          {
            icon: Users,
            title: "Gestão Ineficiente",
            description: "Decisões baseadas em 'achismo' em vez de dados, levando a custos desnecessários.",
            color: "text-destructive"
          }
        ].map((item, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-destructive/10"></div>
            <CardContent className="relative p-8 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6 ${item.color}`}>
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE SOLUÇÃO (TRANSFORMAÇÃO) ---
const SolutionSection = () => (
  <section id="solucao" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 text-sm font-medium text-primary mb-6">
          <Target className="h-4 w-4" />
          <span>A Solução GrowthScale</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Transforme <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">problemas em vantagens</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Tecnologia avançada que transforma a gestão de escalas em uma vantagem competitiva
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="space-y-8">
          {[
            {
              icon: ShieldCheck,
              title: "Proteção Inteligente",
              description: "IA que monitora cada escala em tempo real, alertando sobre riscos antes que se tornem problemas.",
              benefit: "Durma tranquilo sabendo que está protegido"
            },
            {
              icon: Zap,
              title: "Eficiência Radical",
              description: "Crie escalas otimizadas em segundos, não em horas. Recupere seu tempo mais valioso.",
              benefit: "Mais tempo para focar no que realmente importa"
            },
            {
              icon: TrendingUp,
              title: "Decisões Informadas",
              description: "Dados claros e insights acionáveis para tomar decisões que reduzem custos e aumentam produtividade.",
              benefit: "Transforme dados em vantagem competitiva"
            }
          ].map((item, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                <p className="text-sm font-medium text-primary">{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 border border-border/20 shadow-2xl">
            <img src="/placeholder-dashboard-dark.png" alt="Interface GrowthScale" className="rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PROVA SOCIAL (AUTORIDADE) ---
const SocialProofSection = () => (
  <section className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4 text-center">
      <p className="text-muted-foreground mb-8 text-lg">
        Gestores que transformaram suas operações com GrowthScale
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-60">
        <span className="font-medium text-muted-foreground">Restaurante Modelo</span>
        <span className="font-medium text-muted-foreground">Bistrô Fictício</span>
        <span className="font-medium text-muted-foreground">Grupo Sabor</span>
      </div>
    </div>
  </section>
);

// --- TESTIMONIAL COM PSICOLOGIA DE PROVA ---
const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Não acredite apenas na nossa palavra
        </h2>
        <p className="text-lg text-muted-foreground">
          Veja como outros gestores transformaram suas operações
        </p>
      </div>
      
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-secondary to-background">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16"></div>
        <CardContent className="relative p-12 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-accent fill-accent" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-8 leading-relaxed">
            "O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipa foi notificada não tem preço. Mudou o jogo para nós."
          </blockquote>
          <footer className="space-y-2">
            <p className="font-bold text-lg text-foreground">Joana Silva</p>
            <p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p>
          </footer>
        </CardContent>
      </Card>
    </div>
  </section>
);

// --- PRICING COM PSICOLOGIA DE VALOR ---
const PricingSection = () => (
  <section id="precos" className="py-20 md:py-28 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Investimento que se paga sozinho
        </h2>
        <p className="text-lg text-muted-foreground">
          Escolha o plano que melhor se adapta ao seu momento de crescimento
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free - Ancoragem */}
        <Card className="flex flex-col relative border-2 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Para começar com segurança</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">R$0</p>
              <p className="text-sm text-muted-foreground">Para sempre</p>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Até 5 funcionários</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Criação de escalas básica</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Suporte por email</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth">Começar Gratuitamente</Link>
            </Button>
          </div>
        </Card>

        {/* Business - Plano Principal */}
        <Card className="flex flex-col relative border-2 border-primary shadow-xl transform scale-105">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2">
              Mais Popular
            </Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Business</CardTitle>
            <CardDescription>Para operações que crescem</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">R$97</p>
              <p className="text-sm text-muted-foreground">por mês</p>
              <p className="text-xs text-muted-foreground mt-1">Economia de R$500+ em tempo</p>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Até 25 funcionários</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Sugestões de IA</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Alertas de risco CLT</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg">
              <Link to="/auth">Escolher Business</Link>
            </Button>
          </div>
        </Card>

        {/* Enterprise - Aspiração */}
        <Card className="flex flex-col relative border-2 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>Para grandes operações</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">Sob consulta</p>
              <p className="text-sm text-muted-foreground">Plano personalizado</p>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Funcionários ilimitados</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Suporte dedicado</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Integrações avançadas</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link to="/contato">Agendar Demonstração</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

// --- FOOTER COM AUTORIDADE ---
const Footer = () => (
  <footer className="py-12 bg-secondary border-t">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Produto</h3>
        <ul className="space-y-2">
          <li><Link to="/#solucao" className="text-muted-foreground hover:text-foreground transition-colors">Solução</Link></li>
          <li><Link to="/#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
        <ul className="space-y-2">
          <li><Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</Link></li>
          <li><Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
        <ul className="space-y-2">
          <li><Link to="/legal/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link></li>
          <li><Link to="/legal/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link></li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg opacity-20 blur-sm"></div>
            <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
          </div>
          <span className="font-bold text-foreground">GrowthScale</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} GrowthScale. Transformando gestão de escalas em vantagem competitiva.
        </p>
      </div>
    </div>
  </footer>
);

// --- PÁGINA PRINCIPAL COM JORNADA DE VENDAS ---
export default function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <SocialProofSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}