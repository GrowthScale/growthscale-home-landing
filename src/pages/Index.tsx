// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, BrainCircuit, TrendingUp, AlertTriangle, Check, X, Users, Star, Building } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// --- COMPONENTE DO CABEÇALHO (NAVBAR) ---
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center">
      <div className="mr-4 flex">
        <Link to="/" className="flex items-center space-x-2">
          {/* ANOTAÇÃO: Adicione o seu logo SVG aqui */}
          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
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
                <h2 id="problem-title" className="text-3xl md:text-4xl font-bold text-foreground">A gestão manual é o maior risco oculto do seu negócio.</h2>
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

// --- COMPONENTE DA SECÇÃO DE PREÇOS ---
const PricingSection = () => (
    <section id="precos" className="py-20 md:py-28 bg-background" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto">
                <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2>
                <p className="text-lg text-muted-foreground mt-4">Comece de graça. Cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Plano Freemium */}
                <Card className="relative">
                    <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Freemium</CardTitle>
                        <div className="text-3xl font-bold">Grátis</div>
                        <p className="text-sm text-muted-foreground">Experimente sem compromisso</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Até 3 funcionários</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Escalas básicas</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Validação CLT básica</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Suporte por email</li>
                        </ul>
                        <Button className="w-full mt-6" variant="outline">Começar Grátis</Button>
                    </CardContent>
                </Card>

                {/* Plano Starter */}
                <Card className="relative border-primary">
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Mais Popular</Badge>
                    <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                            <Star className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Starter</CardTitle>
                        <div className="text-3xl font-bold">R$ 49<span className="text-lg text-muted-foreground">/mês</span></div>
                        <p className="text-sm text-muted-foreground">Para restaurantes em crescimento</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Até 10 funcionários</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />IA completa</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Compliance automático</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />App mobile</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Suporte prioritário</li>
                        </ul>
                        <Button className="w-full mt-6">Escolher Starter</Button>
                    </CardContent>
                </Card>

                {/* Plano Professional */}
                <Card className="relative">
                    <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Professional</CardTitle>
                        <div className="text-3xl font-bold">R$ 99<span className="text-lg text-muted-foreground">/mês</span></div>
                        <p className="text-sm text-muted-foreground">Para operações em expansão</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Até 25 funcionários</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />IA avançada</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Analytics avançados</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Integrações</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Suporte dedicado</li>
                        </ul>
                        <Button className="w-full mt-6" variant="outline">Escolher Professional</Button>
                    </CardContent>
                </Card>

                {/* Plano Enterprise */}
                <Card className="relative">
                    <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                            <Building className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Enterprise</CardTitle>
                        <div className="text-3xl font-bold">Sob Consulta</div>
                        <p className="text-sm text-muted-foreground">Para grandes operações</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Múltiplas filiais</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />IA customizada</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Integrações exclusivas</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />Suporte executivo</li>
                            <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" />SLA garantido</li>
                        </ul>
                        <Button className="w-full mt-6" variant="outline">Falar com Consultor</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
);

// --- COMPONENTE DA SECÇÃO DE FAQ ---
const FaqSection = () => (
  <section className="py-20 md:py-28 bg-secondary" aria-labelledby="faq-title">
    <div className="container mx-auto px-4 max-w-3xl">
      <header className="text-center mb-12">
        <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-foreground">Perguntas Frequentes</h2>
      </header>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Como é que a IA garante a conformidade com a CLT?</AccordionTrigger>
          <AccordionContent>A nossa IA é constantemente atualizada com as regras da CLT e analisa cada turno em tempo real, alertando sobre violações de intervalos, DSR e limites de jornada antes de a escala ser publicada.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Isto substitui o meu relógio de ponto?</AccordionTrigger>
          <AccordionContent>Não. O GrowthScale é uma ferramenta de planeamento e prevenção. Ele integra-se com sistemas de ponto para comparar o planeado com o realizado, mas não substitui o registo oficial de ponto.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>A implementação é demorada?</AccordionTrigger>
          <AccordionContent>Não. O nosso onboarding guiado permite-lhe configurar a sua empresa e importar os seus funcionários em menos de 30 minutos. O nosso suporte está disponível para o ajudar.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>E se eu me arrepender?</AccordionTrigger>
          <AccordionContent>Oferecemos uma política de cancelamento simples e sem burocracia. Você pode cancelar a sua subscrição a qualquer momento, sem multas.</AccordionContent>
        </AccordionItem>
      </Accordion>
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
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
