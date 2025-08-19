// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, Check, X, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- COMPONENTES DA PÁGINA ---

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex"><Link to="/" className="flex items-center space-x-2"><svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg><span className="font-bold text-foreground">GrowthScale</span></Link></div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium"><Link to="/#recursos" className="text-muted-foreground transition-colors hover:text-foreground">Recursos</Link><Link to="/#precos" className="text-muted-foreground transition-colors hover:text-foreground">Preços</Link></nav>
      <div className="flex flex-1 items-center justify-end space-x-2"><Button asChild variant="ghost"><Link to="/auth">Entrar</Link></Button><Button asChild><Link to="/auth">Começar Agora</Link></Button></div>
              </div>
  </header>
);

const HeroSection = () => (
  <section className="relative w-full py-24 md:py-32 lg:py-40 text-center text-foreground-dark bg-[hsl(var(--background-dark))] overflow-hidden">
    <div className="absolute inset-0 z-0 bg-grid-dark opacity-5 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 animate-fade-in-up">Onde a gestão de escalas encontra a paz de espírito.</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>O GrowthScale é a plataforma de inteligência operacional que transforma o caos das escalas em controlo absoluto. Automatize, preveja custos e opere com clareza sobre as regras da CLT.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6"><Link to="/auth">Começar a Simplificar Agora</Link></Button>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/80"><Link to="/#recursos"><PlayCircle className="mr-2 h-5 w-5" />Ver a Magia</Link></Button>
            </div>
              </div>
      <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="relative rounded-xl p-2 bg-[hsl(var(--card-dark))] border border-[hsl(var(--border-dark))] shadow-2xl shadow-primary/10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur-xl opacity-20"></div>
          <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="relative rounded-lg" />
            </div>
          </div>
        </div>
      </section>
);

const SocialProofSection = () => (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-12">A ferramenta de confiança para gestores de restaurantes que valorizam o seu tempo e a sua tranquilidade</p>
            {/* ANOTAÇÃO: No futuro, substitua por logos reais de clientes */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
                <span className="font-medium text-muted-foreground/50">Restaurante Modelo</span>
                <span className="font-medium text-muted-foreground/50">Bistrô Fictício</span>
                <span className="font-medium text-muted-foreground/50">Grupo Sabor</span>
                <span className="font-medium text-muted-foreground/50">Café Central</span>
                <span className="font-medium text-muted-foreground/50">Rede de Pizzarias</span>
          </div>
        </div>
      </section>
);

const NarrativeSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-secondary" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-24">
      <div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold text-foreground">De um quebra-cabeças stressante a uma decisão de 5 minutos.</h2><p className="text-lg text-muted-foreground mt-4">Você sabe o quão caótico é: planilhas, grupos de WhatsApp, trocas de última hora e a preocupação constante com as regras da CLT. O GrowthScale foi desenhado para eliminar este caos.</p></div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div><div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><ShieldCheck className="h-4 w-4" /> Segurança Jurídica</div><h3 className="text-2xl font-bold mb-3">O seu Co-Piloto CLT, 24/7.</h3><p className="text-muted-foreground">Enquanto você arrasta e solta, a nossa IA audita cada turno, alertando-o para potenciais riscos de intervalos e excesso de jornada. Opere com a clareza de quem toma decisões informadas.</p></div>
        <div className="rounded-xl p-2 bg-background border shadow-lg"><img src="/placeholder-gif-1.png" alt="Demonstração do alerta de compliance" className="rounded-lg" /></div>
            </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl p-2 bg-background border shadow-lg md:order-last"><img src="/placeholder-gif-2.png" alt="Demonstração da sugestão de IA" className="rounded-lg" /></div>
        <div><div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><Clock className="h-4 w-4" /> Eficiência Máxima</div><h3 className="text-2xl font-bold mb-3">Recupere as suas horas.</h3><p className="text-muted-foreground">O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique. Mais tempo para si, para a sua equipa e para os seus clientes.</p></div>
          </div>
        </div>
      </section>
);

const ComparisonSection = () => (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="comparison-title">
        <div className="container mx-auto px-4 max-w-4xl">
            <header className="text-center mb-12"><h2 id="comparison-title" className="text-3xl md:text-4xl font-bold text-foreground">Chega de operar com base em "achismo".</h2><p className="text-lg text-muted-foreground mt-4">Veja porque as planilhas são o maior risco para o seu negócio.</p></header>
            <div className="border rounded-lg shadow-sm overflow-hidden bg-card">
                <table className="w-full">
                    <thead className="bg-muted/50"><tr><th className="p-4 text-left font-semibold text-foreground">A capacidade de...</th><th className="p-4 w-40 text-center font-semibold text-muted-foreground">Planilhas</th><th className="p-4 w-40 text-center font-semibold text-primary">GrowthScale</th></tr></thead>
                    <tbody>
                        <tr className="border-t"><td className="p-4 font-medium">Validar a CLT em tempo real</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                        <tr className="border-t"><td className="p-4 font-medium">Simular o custo antes de gastar</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                        <tr className="border-t"><td className="p-4 font-medium">Sugerir a escala ideal com IA</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                        <tr className="border-t"><td className="p-4 font-medium">Notificar a equipa de forma integrada</td><td className="p-4 text-center"><X className="mx-auto h-6 w-6 text-muted-foreground/50" /></td><td className="p-4 text-center"><Check className="mx-auto h-6 w-6 text-primary" /></td></tr>
                    </tbody>
                </table>
          </div>
        </div>
      </section>
);

const PricingSection = () => (
    <section id="precos" className="py-20 md:py-28 bg-secondary" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto"><h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2><p className="text-lg text-muted-foreground mt-4">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p></header>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="flex flex-col"><CardHeader><CardTitle>Free</CardTitle><CardDescription>Para equipas pequenas a começar.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$0</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 5 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Criação de escalas básica</li></ul></CardContent><Button asChild variant="outline" className="m-6"><Link to="/auth">Começar de Graça</Link></Button></Card>
                <Card className="flex flex-col border-primary ring-2 ring-primary"><CardHeader><div className="flex justify-between items-center"><CardTitle>Business</CardTitle><Badge className="bg-accent text-accent-foreground">Mais Popular</Badge></div><CardDescription>Para operações que precisam de poder total.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$99<span className="text-sm font-normal text-muted-foreground">/mês</span></p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Simulador de Custos</li></ul></CardContent><Button asChild className="m-6"><Link to="/auth">Escolher Business</Link></Button></Card>
                <Card className="flex flex-col"><CardHeader><CardTitle>Enterprise</CardTitle><CardDescription>Para redes e grandes operações.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">Contacto</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Funcionários ilimitados</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Múltiplas filiais</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Suporte dedicado</li></ul></CardContent><Button asChild variant="outline" className="m-6"><Link to="/contato">Agendar Demonstração</Link></Button></Card>
          </div>
        </div>
      </section>
);

const FaqSection = () => (
  <section className="py-20 md:py-28 bg-background" aria-labelledby="faq-title">
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

const Footer = () => (
  <footer className="py-12 bg-secondary border-t">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div><h3 className="font-semibold text-foreground mb-4">Produto</h3><ul className="space-y-2"><li><Link to="/#recursos" className="text-muted-foreground hover:text-foreground">Recursos</Link></li><li><Link to="/#precos" className="text-muted-foreground hover:text-foreground">Preços</Link></li></ul></div>
        <div><h3 className="font-semibold text-foreground mb-4">Empresa</h3><ul className="space-y-2"><li><Link to="/sobre" className="text-muted-foreground hover:text-foreground">Sobre Nós</Link></li><li><Link to="/contato" className="text-muted-foreground hover:text-foreground">Contato</Link></li></ul></div>
        <div><h3 className="font-semibold text-foreground mb-4">Legal</h3><ul className="space-y-2"><li><Link to="/legal/termos" className="text-muted-foreground hover:text-foreground">Termos de Uso</Link></li><li><Link to="/legal/privacidade" className="text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li></ul></div>
        <div className="col-span-2 md:col-span-1 text-right md:text-left"><Link to="/" className="flex items-center justify-end md:justify-start space-x-2 mb-4"><svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg><span className="font-bold text-foreground">GrowthScale</span></Link><p className="text-muted-foreground text-sm">© {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controlo.</p></div>
    </div>
  </footer>
);

// --- A PÁGINA PRINCIPAL QUE JUNTA TUDO ---
export default function Index() {
  return (
    <>
      <Header />
      <div className="w-full bg-yellow-400 p-2 text-center font-bold text-yellow-900">
        <p>AMBIENTE DE TESTE - Vanguarda v1.0 - Deploy OK!</p>
      </div>
      <main>
        <HeroSection />
        <SocialProofSection />
        <NarrativeSection />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
        {/* Adicione a seção de Testimonials aqui se desejar */}
      </main>
      <Footer />
    </>
  );
}
