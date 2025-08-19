// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, Check, X, BrainCircuit, TrendingUp, AlertTriangle, Zap, Users, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- COMPONENTE DO CABEÇALHO (NAVBAR) ---
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl">
    <div className="container flex h-16 items-center">
      <div className="mr-4 flex">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20"></div>
            <svg className="relative h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="font-bold text-foreground">GrowthScale</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Button asChild variant="ghost" className="hover:bg-accent/10 hover:text-accent">
          <Link to="/auth">Entrar</Link>
        </Button>
        <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Link to="/auth">Começar Agora</Link>
        </Button>
      </div>
    </div>
  </header>
);

// --- COMPONENTE DA SECÇÃO HERO (MODO CINEMA - ESCURO) ---
const HeroSection = () => (
  <section className="relative w-full py-24 md:py-32 lg:py-40 text-center text-foreground-dark bg-gradient-to-br from-background-dark via-background-dark to-primary/20 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-grid-dark opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-6 animate-fade-in-up">
          <Sparkles className="h-4 w-4" />
          Revolução na Gestão de Escalas
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 animate-fade-in-up bg-gradient-to-r from-foreground-dark via-foreground-dark to-accent bg-clip-text text-transparent">
          Onde a gestão de escalas encontra a paz de espírito.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é a plataforma de inteligência operacional que transforma o caos das escalas em controle absoluto. Automatize, preveja custos e opere com clareza sobre as regras da CLT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25">
            <Link to="/auth">Começar a Simplificar Agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-accent/30 text-accent hover:bg-accent/10">
            <Link to="/#recursos">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver a Magia
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="relative rounded-xl p-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20 shadow-2xl shadow-primary/20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur-xl opacity-30"></div>
          <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="relative rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE DA SECÇÃO DE PROBLEMAS (MODO ANÁLISE - CLARO) ---
const ProblemSection = () => (
    <section className="py-20 md:py-28 bg-gradient-to-br from-background via-secondary to-background" aria-labelledby="problem-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    Risco Oculto
                </div>
                <h2 id="problem-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">A gestão manual é o maior risco oculto do seu negócio.</h2>
                <p className="text-lg text-muted-foreground">Descubra como as planilhas estão comprometendo sua operação</p>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-6">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Risco Jurídico Constante</h3>
                    <p className="text-muted-foreground">Cada planilha é um convite a erros de cálculo de horas e intervalos, que se transformam em processos caros e inesperados.</p>
                </div>
                <div className="text-center p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                        <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Tempo que Não Volta</h3>
                    <p className="text-muted-foreground">Horas gastas montando o quebra-cabeça das escalas são horas que você não dedica a treinar a sua equipe e a servir os seus clientes.</p>
                </div>
                <div className="text-center p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-6">
                        <BarChart3 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Decisões no Escuro</h3>
                    <p className="text-muted-foreground">Sem visibilidade dos custos em tempo real, cada decisão de escala é um palpite que pode comprometer a sua margem de lucro.</p>
                </div>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DA SECÇÃO DE SOLUÇÕES (MODO CINEMA - ESCURO) ---
const SolutionSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-gradient-to-br from-background-dark via-background-dark to-primary/10 text-foreground-dark" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-24">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent mb-4">
          <Zap className="h-4 w-4" />
          Solução Inteligente
        </div>
        <h2 id="solution-title" className="text-3xl md:text-4xl font-bold mb-4">A sua operação, finalmente sob controle.</h2>
        <p className="text-lg text-muted-foreground">Descubra como a IA transforma sua gestão de escalas</p>
      </header>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6">
            <ShieldCheck className="h-4 w-4" /> 
            Segurança Jurídica
          </div>
          <h3 className="text-2xl font-bold mb-4">O seu Co-Piloto CLT, 24/7.</h3>
          <p className="text-muted-foreground mb-6">A nossa IA audita cada turno, alertando você para potenciais riscos de intervalos e excesso de jornada. Opere com a clareza de quem toma decisões informadas.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Validação automática
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Alertas em tempo real
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-30"></div>
          <div className="relative rounded-xl p-2 bg-card-dark border border-border-dark shadow-2xl">
            <img src="/placeholder-gif-1-dark.png" alt="Demonstração do alerta de compliance" className="rounded-lg" />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative md:order-last">
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl blur-xl opacity-30"></div>
          <div className="relative rounded-xl p-2 bg-card-dark border border-border-dark shadow-2xl">
            <img src="/placeholder-gif-2-dark.png" alt="Demonstração da sugestão de IA" className="rounded-lg" />
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent mb-6">
            <Clock className="h-4 w-4" /> 
            Eficiência Máxima
          </div>
          <h3 className="text-2xl font-bold mb-4">Recupere as suas horas.</h3>
          <p className="text-muted-foreground mb-6">O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique. Mais tempo para você, para a sua equipe e para os seus clientes.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Otimização automática
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Sugestões inteligentes
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE DA TABELA COMPARATIVA (MODO ANÁLISE - CLARO) ---
const ComparisonSection = () => (
    <section className="py-20 md:py-28 bg-gradient-to-br from-background via-secondary to-background" aria-labelledby="comparison-title">
        <div className="container mx-auto px-4 max-w-4xl">
            <header className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
                    <TrendingUp className="h-4 w-4" />
                    Comparação Objetiva
                </div>
                <h2 id="comparison-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">Chega de operar com base em "achismo".</h2>
                <p className="text-lg text-muted-foreground">Veja por que as planilhas são o maior risco para o seu negócio.</p>
            </header>
            <div className="border border-border rounded-xl shadow-xl overflow-hidden bg-card">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-primary/5 to-accent/5">
                        <tr>
                            <th className="p-6 text-left font-semibold text-foreground">A capacidade de...</th>
                            <th className="p-6 w-40 text-center font-semibold text-muted-foreground">Planilhas</th>
                            <th className="p-6 w-40 text-center font-semibold text-primary">GrowthScale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-border hover:bg-muted/30 transition-colors">
                            <td className="p-6 font-medium">Validar a CLT em tempo real</td>
                            <td className="p-6 text-center">
                                <X className="mx-auto h-6 w-6 text-muted-foreground/50" />
                            </td>
                            <td className="p-6 text-center">
                                <Check className="mx-auto h-6 w-6 text-accent" />
                            </td>
                        </tr>
                        <tr className="border-t border-border hover:bg-muted/30 transition-colors">
                            <td className="p-6 font-medium">Simular o custo antes de gastar</td>
                            <td className="p-6 text-center">
                                <X className="mx-auto h-6 w-6 text-muted-foreground/50" />
                            </td>
                            <td className="p-6 text-center">
                                <Check className="mx-auto h-6 w-6 text-accent" />
                            </td>
                        </tr>
                        <tr className="border-t border-border hover:bg-muted/30 transition-colors">
                            <td className="p-6 font-medium">Sugerir a escala ideal com IA</td>
                            <td className="p-6 text-center">
                                <X className="mx-auto h-6 w-6 text-muted-foreground/50" />
                            </td>
                            <td className="p-6 text-center">
                                <Check className="mx-auto h-6 w-6 text-accent" />
                            </td>
                        </tr>
                        <tr className="border-t border-border hover:bg-muted/30 transition-colors">
                            <td className="p-6 font-medium">Notificar a equipe de forma integrada</td>
                            <td className="p-6 text-center">
                                <X className="mx-auto h-6 w-6 text-muted-foreground/50" />
                            </td>
                            <td className="p-6 text-center">
                                <Check className="mx-auto h-6 w-6 text-accent" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DA SECÇÃO DE PLANOS (MODO ANÁLISE - CLARO) ---
const PricingSection = () => (
    <section id="precos" className="py-20 md:py-28 bg-gradient-to-br from-background via-secondary to-background" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-4">
                    <Star className="h-4 w-4" />
                    Planos Flexíveis
                </div>
                <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">Um plano para cada tamanho de ambição.</h2>
                <p className="text-lg text-muted-foreground">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="flex flex-col border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <CardDescription>Para equipes pequenas começando.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">R$0</p>
                            <p className="text-sm text-muted-foreground">Para sempre</p>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Até 5 funcionários
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Criação de escalas básica
                            </li>
                        </ul>
                    </CardContent>
                    <div className="p-6">
                        <Button asChild variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
                            <Link to="/auth">Começar de Graça</Link>
                        </Button>
                    </div>
                </Card>
                
                <Card className="flex flex-col border-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                            Mais Popular
                        </Badge>
                    </div>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Business</CardTitle>
                        <CardDescription>Para operações que precisam de poder total.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">R$99<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
                            <p className="text-sm text-muted-foreground">Cancele quando quiser</p>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Até 25 funcionários
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Sugestões de Escala com IA
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Alertas de Risco CLT
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Simulador de Custos
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Notificações por WhatsApp
                            </li>
                        </ul>
                    </CardContent>
                    <div className="p-6">
                        <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25">
                            <Link to="/auth">Escolher Business</Link>
                        </Button>
                    </div>
                </Card>
                
                <Card className="flex flex-col border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>Para redes e grandes operações.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">Contato</p>
                            <p className="text-sm text-muted-foreground">Preço personalizado</p>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Funcionários ilimitados
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Múltiplas filiais
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Regras sindicais
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                Suporte dedicado
                            </li>
                        </ul>
                    </CardContent>
                    <div className="p-6">
                        <Button asChild variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
                            <Link to="/contato">Agendar Demonstração</Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DO RODAPÉ ---
const Footer = () => (
  <footer className="py-12 bg-gradient-to-br from-background-dark via-background-dark to-primary/5 border-t border-border-dark/40">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20"></div>
          <svg className="relative h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <span className="font-bold text-foreground-dark">GrowthScale</span>
      </div>
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controle.
      </p>
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
        <ProblemSection />
        <SolutionSection />
        <ComparisonSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
