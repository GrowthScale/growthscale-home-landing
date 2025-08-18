// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, BrainCircuit, TrendingUp, AlertTriangle, Check, X } from 'lucide-react';

// --- COMPONENTE DO CABEÇALHO (NAVBAR) ---
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center">
      <div className="mr-4 flex">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="h-6 w-6 text-primary" /* Adicione o seu logo SVG aqui */ viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          <span className="font-bold">GrowthScale</span>
        </Link>
      </div>
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

// --- COMPONENTE DA SECÇÃO HERO ---
const HeroSection = () => (
  <section className="w-full py-24 md:py-32 lg:py-40 text-center bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 animate-fade-in-down">
          Assuma o controlo total das suas escalas. Sem o stress.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é o seu consultor de operações digital. Crie escalas otimizadas com IA, preveja custos e evite riscos da CLT, de forma simples e visual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/auth">Começar Agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
            <Link to="/#recursos">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver em Ação
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up shadow-2xl rounded-xl" style={{ animationDelay: '0.6s' }}>
        <div className="bg-slate-900 rounded-xl p-2 border border-border/10">
          <img src="/placeholder-dashboard.png" alt="Interface do GrowthScale mostrando o calendário de escalas inteligente" className="rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE DA SECÇÃO DE PROBLEMAS ---
const ProblemSection = () => (
    <section className="py-20 md:py-28 bg-secondary" aria-labelledby="problem-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto">
                <h2 id="problem-title" className="text-3xl md:text-4xl font-bold text-foreground">
                    A gestão manual é o maior risco oculto do seu negócio.
                </h2>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-destructive/10 mb-4"><AlertTriangle className="h-6 w-6 text-destructive" /></div>
                    <h3 className="text-xl font-semibold mb-2">Risco Jurídico Constante</h3>
                    <p className="text-muted-foreground">Cada planilha é um convite a erros de cálculo de horas e intervalos, que se transformam em processos caros e inesperados.</p>
                </div>
                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4"><Clock className="h-6 w-6 text-primary" /></div>
                    <h3 className="text-xl font-semibold mb-2">Tempo que Não Volta</h3>
                    <p className="text-muted-foreground">Horas gastas a montar o quebra-cabeça das escalas são horas que você não dedica a treinar a sua equipa e a servir os seus clientes.</p>
                </div>
                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4"><BarChart3 className="h-6 w-6 text-primary" /></div>
                    <h3 className="text-xl font-semibold mb-2">Decisões no Escuro</h3>
                    <p className="text-muted-foreground">Sem visibilidade dos custos em tempo real, cada decisão de escala é um palpite que pode comprometer a sua margem de lucro.</p>
                </div>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DA SECÇÃO DE SOLUÇÕES (COM GIFS) ---
const SolutionSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-background space-y-24" aria-labelledby="solution-title">
    <div className="container mx-auto px-4">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h2 id="solution-title" className="text-3xl md:text-4xl font-bold text-foreground">A sua operação, finalmente sob controlo.</h2>
      </header>

      {/* Solução 1: Co-Piloto CLT */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><ShieldCheck className="h-4 w-4" /> Segurança Jurídica</div>
          <h3 className="text-2xl font-bold mb-3">Opere com 100% de segurança.</h3>
          <p className="text-muted-foreground">A nossa IA audita cada turno em tempo real contra as regras da CLT. Receba alertas instantâneos sobre violações de intervalos e excesso de jornada, antes que se tornem um problema.</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-2 shadow-lg border border-border/10">
          <img src="/placeholder-gif-1.png" alt="Demonstração do alerta de compliance" className="rounded-lg" />
        </div>
      </div>

      {/* Solução 2: Escala Inteligente */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-slate-900 rounded-xl p-2 shadow-lg border border-border/10 md:order-last">
          <img src="/placeholder-gif-2.png" alt="Demonstração da sugestão de IA" className="rounded-lg" />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><BrainCircuit className="h-4 w-4" /> Eficiência Máxima</div>
          <h3 className="text-2xl font-bold mb-3">Crie a escala perfeita em segundos.</h3>
          <p className="text-muted-foreground">Esqueça o quebra-cabeça. Com um clique, a nossa IA sugere a escala ideal, considerando custo, habilidades e equidade. O que levava horas, agora é resolvido no tempo de um café.</p>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE DA TABELA COMPARATIVA ---
const ComparisonSection = () => (
    <section className="py-20 md:py-28 bg-secondary" aria-labelledby="comparison-title">
        <div className="container mx-auto px-4 max-w-4xl">
            <header className="text-center mb-12">
                <h2 id="comparison-title" className="text-3xl md:text-4xl font-bold text-foreground">Chega de operar com base em "achismo".</h2>
                <p className="text-lg text-muted-foreground mt-4">Veja porque as planilhas são o maior risco para o seu negócio.</p>
            </header>
            <div className="border border-border rounded-lg shadow-sm overflow-hidden bg-background">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-4 text-left font-semibold text-foreground">A capacidade de...</th>
                            <th className="p-4 w-40 text-center font-semibold text-muted-foreground">Planilhas</th>
                            <th className="p-4 w-40 text-center font-semibold text-primary">GrowthScale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-border"><td className="p-4 font-medium">Validar a CLT em tempo real</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                        <tr className="border-t border-border"><td className="p-4 font-medium">Simular o custo antes de gastar</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                        <tr className="border-t border-border"><td className="p-4 font-medium">Sugerir a escala ideal com IA</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                        <tr className="border-t border-border"><td className="p-4 font-medium">Notificar a equipa de forma integrada</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DO RODAPÉ ---
const Footer = () => (
  <footer className="py-8 bg-background border-t">
    <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
      © {new Date().getFullYear()} GrowthScale. Todos os direitos reservados.
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
        {/* Adicione aqui as seções de Prova Social e Preços quando estiverem prontas */}
      </main>
      <Footer />
    </>
  );
}
