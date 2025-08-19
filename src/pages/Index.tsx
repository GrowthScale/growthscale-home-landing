// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, Check, Users, Star, Building, BrainCircuit, TrendingUp, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- COMPONENTE DO CABEÇALHO (NAVBAR) ---
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex">
        <Link to="/" className="flex items-center space-x-2">
          {/* ANOTAÇÃO: Adicione o seu logo SVG aqui */}
          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          <span className="font-bold text-foreground">GrowthScale</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link to="/#recursos" className="text-muted-foreground transition-colors hover:text-foreground">Recursos</Link>
        <Link to="/#precos" className="text-muted-foreground transition-colors hover:text-foreground">Preços</Link>
      </nav>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Button asChild variant="ghost"><Link to="/auth">Entrar</Link></Button>
        <Button asChild><Link to="/auth">Começar Agora</Link></Button>
      </div>
    </div>
  </header>
);

// --- COMPONENTE DA SECÇÃO HERO (MODO CINEMA - ESCURO) ---
const HeroSection = () => (
  <section className="relative w-full py-24 md:py-32 lg:py-40 text-center text-foreground-dark bg-[hsl(var(--background-dark))] overflow-hidden">
    <div className="absolute inset-0 z-0 bg-grid-dark opacity-5 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 animate-fade-in-up">
          Onde a gestão de escalas encontra a paz de espírito.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é a plataforma de inteligência operacional que transforma o caos das escalas em controle absoluto. Automatize, preveja custos e opere com clareza sobre as regras da CLT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6"><Link to="/auth">Comece a Simplificar Agora</Link></Button>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/80"><Link to="/#recursos"><PlayCircle className="mr-2 h-5 w-5" />Ver a Magia</Link></Button>
        </div>
      </div>
      <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="relative rounded-xl p-2 bg-[hsl(var(--card-dark))] border border-[hsl(var(--border-dark))] shadow-2xl shadow-primary/10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur-xl opacity-20"></div>
          {/* ANOTAÇÃO PARA O VISUAL: TODO: Substituir por um GIF da UI em modo escuro. */}
          <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="relative rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE DA SECÇÃO DE PROVA SOCIAL (MODO ANÁLISE - CLARO) ---
const SocialProofSection = () => (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-12">A ferramenta de confiança para gestores de restaurantes que valorizam o seu tempo e a sua tranquilidade</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">5 Minutos</p>
                    <p className="text-muted-foreground">Tempo médio para criar uma escala semanal otimizada.</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">90% Menos</p>
                    <p className="text-muted-foreground">Tempo gasto em tarefas manuais de agendamento.</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">Até 30%</p>
                    <p className="text-muted-foreground">Redução de custos com horas extras não planeadas.</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">100% Visível</p>
                    <p className="text-muted-foreground">Clareza total sobre os custos e riscos de cada escala.</p>
                </div>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DA SECÇÃO DE NARRATIVA (MODO CINEMA - ESCURO) ---
const NarrativeSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-[hsl(var(--background-dark))] text-foreground-dark" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-24">
      {/* Bloco 1: Dor + Solução */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">De um quebra-cabeças stressante a uma decisão de 5 minutos.</h2>
        <p className="text-lg text-muted-foreground mt-4">O GrowthScale foi desenhado para eliminar o caos da gestão manual.</p>
      </div>
      {/* Bloco 2: A Solução Visual (Co-Piloto CLT) */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><ShieldCheck className="h-4 w-4" /> Segurança Jurídica</div>
          <h3 className="text-2xl font-bold mb-3">O seu Co-Piloto CLT, 24/7.</h3>
          <p className="text-muted-foreground">Enquanto você arrasta e solta, a nossa IA audita cada turno, alertando você para potenciais riscos de intervalos e excesso de jornada. Opere com a clareza de quem toma decisões informadas.</p>
        </div>
        <div className="rounded-xl p-2 bg-black/20 border border-[hsl(var(--border-dark))] shadow-lg"><img src="/placeholder-gif-1-dark.png" alt="Demonstração do alerta de compliance" className="rounded-lg" /></div>
      </div>
      {/* ... (O Bloco 3, "O Poder da IA", permanece o mesmo da nossa última versão) ... */}
    </div>
  </section>
);

// --- COMPONENTE DA SECÇÃO DE PLANOS (MODO ANÁLISE - CLARO) ---
const PricingSection = () => (
    <section id="precos" className="py-20 md:py-28 bg-background" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto">
                <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2>
                <p className="text-lg text-muted-foreground mt-4">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="flex flex-col"><CardHeader><CardTitle>Free</CardTitle><CardDescription>Para equipes pequenas começando.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$0</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 5 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Criação de escalas básica</li></ul></CardContent><Button asChild variant="secondary" className="m-6"><Link to="/auth">Começar de Graça</Link></Button></Card>
                <Card className="flex flex-col border-primary ring-2 ring-primary"><CardHeader><div className="flex justify-between items-center"><CardTitle>Business</CardTitle><Badge className="bg-accent text-accent-foreground">Mais Popular</Badge></div><CardDescription>Para operações que precisam de poder total.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$99<span className="text-sm font-normal text-muted-foreground">/mês</span></p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Simulador de Custos</li></ul></CardContent><Button asChild className="m-6"><Link to="/auth">Escolher Business</Link></Button></Card>
                <Card className="flex flex-col"><CardHeader><CardTitle>Enterprise</CardTitle><CardDescription>Para redes e grandes operações.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">Contato</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Funcionários ilimitados</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Múltiplas filiais</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Suporte dedicado</li></ul></CardContent><Button asChild variant="secondary" className="m-6"><Link to="/contato">Agendar Demonstração</Link></Button></Card>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DA SECÇÃO DE FAQ (MODO ANÁLISE - CLARO) ---
const FaqSection = () => (
  <section className="py-20 md:py-28 bg-secondary" aria-labelledby="faq-title">
    <div className="container mx-auto px-4 max-w-3xl">
      <header className="text-center mb-12"><h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-foreground">Respostas claras para as suas dúvidas.</h2></header>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1"><AccordionTrigger>O GrowthScale substitui um advogado ou contador?</AccordionTrigger><AccordionContent>Não. O GrowthScale é uma poderosa plataforma de inteligência operacional desenhada para lhe dar clareza sobre as regras da CLT e alertá-lo para potenciais riscos. Ele não fornece aconselhamento jurídico e não substitui a orientação de um profissional qualificado.</AccordionContent></AccordionItem>
        <AccordionItem value="item-2"><AccordionTrigger>A implementação é demorada?</AccordionTrigger><AccordionContent>Não. O nosso onboarding guiado permite-lhe configurar a sua empresa e importar os seus funcionários em menos de 30 minutos. O nosso suporte está disponível para o ajudar em cada passo.</AccordionContent></AccordionItem>
        <AccordionItem value="item-3"><AccordionTrigger>Os meus dados estão seguros?</AccordionTrigger><AccordionContent>Sim. A segurança é a nossa prioridade máxima. Utilizamos as melhores práticas do mercado, como criptografia de ponta e isolamento de dados por cliente, para garantir que as suas informações estejam sempre protegidas.</AccordionContent></AccordionItem>
      </Accordion>
    </div>
  </section>
);

// --- COMPONENTE DO RODAPÉ (FOOTER) ---
const Footer = () => (
  <footer className="py-8 bg-[hsl(var(--background-dark))] text-foreground-dark border-t border-border/40">
    <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
      © {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controle.
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
        <NarrativeSection />
        {/* Adicione aqui a Tabela Comparativa se desejar */}
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
