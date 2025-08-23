// src/pages/Index.tsx
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, Check, Star, ArrowRight, Zap, Target, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
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
            <svg className="h-6 w-6 text-foreground-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground-dark shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link to="/auth" className="flex items-center space-x-2">
            <span>Começar Agora</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </header>
);

// --- HERO COM ELEMENTOS VISUAIS ESTRATÉGICOS ---
const HeroSection = () => (
  <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
    {/* Background com gradiente sutil */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background"></div>
    <div className="absolute inset-0 bg-hero-pattern"></div>
    
    {/* Elementos visuais flutuantes */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-float"></div>
    <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
    <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
    
    <div className="relative container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        {/* Conteúdo textual */}
        <div className="text-center lg:text-left">
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
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-12 animate-fade-in-up leading-relaxed">
            A plataforma que <strong className="text-foreground">elimina o stress</strong> da gestão de escalas e 
            <strong className="text-foreground"> protege seu negócio</strong> contra riscos trabalhistas. 
            <br />
            <span className="text-lg">Opere com a tranquilidade de quem tem tudo sob controle.</span>
          </p>
          
          {/* CTAs com psicologia de urgência e escassez */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16 animate-fade-in-up">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground-dark shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
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
        
        {/* Mockup principal da interface */}
        <div className="relative">
          {/* Efeito de profundidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
          
          {/* Mockup principal */}
          <div className="relative bg-gradient-to-br from-background-dark to-background-dark rounded-3xl p-6 border border-border/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* Header do mockup */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <div className="text-foreground-dark text-sm font-medium">GrowthScale Dashboard</div>
            </div>
            
            {/* Conteúdo do mockup */}
            <div className="space-y-4">
              {/* Barra de status */}
              <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-foreground-dark text-sm">Escala validada</span>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">Sem riscos</Badge>
              </div>
              
              {/* Cards de métricas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-foreground-dark text-xs text-muted-foreground">Funcionários</div>
                  <div className="text-foreground-dark text-lg font-bold">12</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-foreground-dark text-xs text-muted-foreground">Horas economizadas</div>
                  <div className="text-foreground-dark text-lg font-bold">8h</div>
                </div>
              </div>
              
              {/* Gráfico simplificado */}
              <div className="bg-muted rounded-lg p-3">
                <div className="text-foreground-dark text-xs text-muted-foreground mb-2">Produtividade</div>
                <div className="flex items-end space-x-1 h-8">
                  <div className="w-2 bg-primary rounded-t h-4"></div>
                  <div className="w-2 bg-primary rounded-t h-6"></div>
                  <div className="w-2 bg-accent rounded-t h-8"></div>
                  <div className="w-2 bg-primary rounded-t h-5"></div>
                  <div className="w-2 bg-accent rounded-t h-7"></div>
                </div>
              </div>
        </div>
      </div>
          
          {/* Elementos flutuantes decorativos */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PROBLEMA COM ELEMENTOS VISUAIS ---
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
            icon: AlertTriangle,
            title: "Riscos Ocultos",
            description: "Processos trabalhistas que surgem quando você menos espera, comprometendo lucros e reputação.",
            color: "text-destructive",
            bgColor: "bg-destructive/10"
          },
          {
            icon: Clock,
            title: "Tempo Perdido",
            description: "Horas desperdiçadas com gestão manual de escalas, quando poderiam estar focando no negócio.",
            color: "text-accent",
            bgColor: "bg-accent/10"
          },
          {
            icon: Users,
            title: "Conflitos Internos",
            description: "Desentendimentos entre funcionários e gestores por causa de escalas mal planejadas.",
            color: "text-primary",
            bgColor: "bg-primary/10"
          }
        ].map((item, index) => (
          <div key={index} className="text-center group">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${item.bgColor} ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE SOLUÇÃO COM BENEFÍCIOS ---
const SolutionSection = () => (
  <section id="solucao" className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          A <span className="text-primary">solução inteligente</span> que você precisa
        </h2>
        <p className="text-lg text-muted-foreground">
          GrowthScale combina IA avançada com compliance trabalhista para proteger seu negócio
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="space-y-8">
          {[
            {
              icon: ShieldCheck,
              title: "Proteção Legal Automática",
              description: "Nossa IA analisa cada escala em tempo real, identificando e prevenindo riscos trabalhistas antes que se tornem problemas.",
              color: "text-primary"
            },
            {
              icon: Zap,
              title: "Otimização Inteligente",
              description: "Algoritmos avançados criam escalas perfeitas, considerando disponibilidade, habilidades e legislação trabalhista.",
              color: "text-accent"
            },
            {
              icon: TrendingUp,
              title: "Resultados Mensuráveis",
              description: "Acompanhe em tempo real a produtividade, redução de custos e satisfação dos funcionários.",
              color: "text-primary"
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 ${item.color} flex items-center justify-center`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-background-dark to-background-dark rounded-3xl p-8 border border-border/20 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground-dark">Análise de Riscos</h3>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Seguro</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-foreground-dark text-sm">Horas extras</span>
                  <span className="text-green-500 text-sm font-medium">✓ Dentro do limite</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-foreground-dark text-sm">Intervalos</span>
                  <span className="text-green-500 text-sm font-medium">✓ Respeitados</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-foreground-dark text-sm">Folgas</span>
                  <span className="text-green-500 text-sm font-medium">✓ Adequadas</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Economia estimada</span>
                  <span className="text-foreground-dark font-bold">R$ 2.500/mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PROVA SOCIAL ---
const SocialProofSection = () => (
  <section className="py-20 md:py-28 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Gestores que <span className="text-primary">confiam</span> na GrowthScale
        </h2>
        <p className="text-lg text-muted-foreground">
          Empresas de sucesso que transformaram sua gestão de escalas
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            name: "Restaurante Bella Vista",
            role: "Proprietário",
            content: "Reduzimos 80% dos problemas trabalhistas e economizamos R$ 3.000 por mês com a GrowthScale.",
            rating: 5
          },
          {
            name: "Café Central",
            role: "Gerente",
            content: "A IA da GrowthScale identificou problemas que nem sabíamos que existiam. Agora dormimos tranquilos.",
            rating: 5
          },
          {
            name: "Pizzaria Express",
            role: "Diretor",
            content: "Implementamos em 2 dias e já vimos resultados na primeira semana. Funcionários mais satisfeitos.",
            rating: 5
          }
        ].map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE TESTEMUNHOS ---
const TestimonialsSection = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Histórias de <span className="text-primary">sucesso</span> reais
        </h2>
        <p className="text-lg text-muted-foreground">
          Veja como outros gestores transformaram seus negócios
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Caso: Restaurante Familiar</h3>
                <p className="text-sm text-muted-foreground">Antes: 3 processos trabalhistas/ano</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Processos trabalhistas</span>
                <span className="text-destructive font-bold">3 → 0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Economia mensal</span>
                <span className="text-primary font-bold">R$ 2.800</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tempo economizado</span>
                <span className="text-accent font-bold">15h/semana</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-xl bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Caso: Rede de Cafés</h3>
                <p className="text-sm text-muted-foreground">Antes: Rotatividade alta de funcionários</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Satisfação funcionários</span>
                <span className="text-primary font-bold">45% → 92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rotatividade</span>
                <span className="text-accent font-bold">-70%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Produtividade</span>
                <span className="text-primary font-bold">+35%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// --- SEÇÃO DE PREÇOS ---
const PricingSection = () => (
  <section id="precos" className="py-20 md:py-28 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Investimento que <span className="text-primary">se paga</span> sozinho
        </h2>
        <p className="text-lg text-muted-foreground">
          Escolha o plano ideal para o tamanho do seu negócio
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Plano Starter */}
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Starter</CardTitle>
            <CardDescription>Para pequenos negócios</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">R$ 97</p>
              <p className="text-sm text-muted-foreground">por mês</p>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Até 10 funcionários</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>IA de proteção legal</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Suporte por email</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link to="/auth">Começar Agora</Link>
            </Button>
          </div>
        </Card>

        {/* Plano Professional */}
        <Card className="border-2 border-primary shadow-xl bg-card/50 backdrop-blur-sm relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Professional</CardTitle>
            <CardDescription>Para negócios em crescimento</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">R$ 197</p>
              <p className="text-sm text-muted-foreground">por mês</p>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Até 50 funcionários</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>IA avançada + analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Integrações</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link to="/auth">Começar Agora</Link>
            </Button>
          </div>
        </Card>

        {/* Plano Enterprise */}
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
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
              <svg className="h-6 w-6 text-foreground-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lógica de redirecionamento para códigos de autenticação
  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (code) {
      // Se há um código de autenticação, redirecionar para o AuthCallback
      console.log('🔗 Código de autenticação detectado, redirecionando para AuthCallback...');
      navigate(`/auth/callback?code=${code}`, { replace: true });
    } else if (error) {
      // Se há um erro, redirecionar para a página de auth com mensagem de erro
      console.log('❌ Erro de autenticação detectado, redirecionando para Auth...');
      navigate(`/auth?error=${error}&error_description=${errorDescription || ''}`, { replace: true });
    }
  }, [searchParams, navigate]);

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
