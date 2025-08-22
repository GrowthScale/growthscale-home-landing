// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, Check, Star } from 'lucide-react';
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
  <section className="w-full py-24 md:py-32 lg:py-40 text-center bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 animate-fade-in-up">
          Onde a gestão de escalas encontra a paz de espírito.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é a plataforma de inteligência operacional que transforma o caos das escalas em controlo absoluto. Automatize, preveja custos e opere com clareza sobre as regras da CLT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6"><Link to="/auth">Começar a Simplificar Agora</Link></Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6"><Link to="/#recursos"><PlayCircle className="mr-2 h-5 w-5" />Ver em Ação</Link></Button>
        </div>
      </div>
      <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up shadow-2xl rounded-xl" style={{ animationDelay: '0.6s' }}>
        <div className="bg-slate-900 rounded-xl p-2 border border-border/10">
          <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
    <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-12">A ferramenta de confiança para gestores de restaurantes que valorizam o seu tempo e a sua tranquilidade</p>
            {/* ANOTAÇÃO: No futuro, substitua por logos reais de clientes */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
                <span className="font-medium text-muted-foreground/50">Restaurante Modelo</span>
                <span className="font-medium text-muted-foreground/50">Bistrô Fictício</span>
                <span className="font-medium text-muted-foreground/50">Grupo Sabor</span>
            </div>
        </div>
    </section>
);

// --- SECÇÃO DE SOLUÇÃO (MODO CINEMA - ESCURO) ---
const SolutionSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-[hsl(var(--background-dark))] text-foreground-dark" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-24">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h2 id="solution-title" className="text-3xl md:text-4xl font-bold">A sua operação, finalmente sob controlo.</h2>
        <p className="text-lg text-muted-foreground mt-4">De um quebra-cabeças stressante a uma decisão de 5 minutos.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><ShieldCheck className="h-4 w-4" /> Segurança Jurídica</div>
          <h3 className="text-2xl font-bold mb-3">O seu Co-Piloto CLT, 24/7.</h3>
          <p className="text-muted-foreground">A nossa IA audita cada turno, alertando-o para potenciais riscos de intervalos e excesso de jornada. Opere com a clareza de quem toma decisões informadas.</p>
        </div>
        <div className="rounded-xl p-2 bg-black/20 border border-border-dark shadow-lg"><img src="/placeholder-gif-1-dark.png" alt="Demonstração do alerta de compliance" className="rounded-lg" /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl p-2 bg-black/20 border border-border-dark shadow-lg md:order-last"><img src="/placeholder-gif-2-dark.png" alt="Demonstração da sugestão de IA" className="rounded-lg" /></div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><Clock className="h-4 w-4" /> Eficiência Máxima</div>
          <h3 className="text-2xl font-bold mb-3">Recupere as suas horas.</h3>
          <p className="text-muted-foreground">O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique. Mais tempo para si, para a sua equipa e para os seus clientes.</p>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Não acredite apenas na nossa palavra.</h2>
        <Card className="p-8 text-center shadow-lg bg-secondary">
            <div className="flex justify-center mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}</div>
            <blockquote className="text-xl md:text-2xl font-medium text-foreground">"O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipa foi notificada não tem preço. Mudou o jogo para nós."</blockquote>
            <footer className="mt-6"><p className="font-semibold">Joana Silva</p><p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p></footer>
        </Card>
    </div>
  </section>
);

const PricingSection = () => (
    <section id="precos" className="py-20 md:py-28 bg-secondary" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto"><h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2></header>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="flex flex-col"><CardHeader><CardTitle>Free</CardTitle><CardDescription>Para equipas pequenas a começar.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$0</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 5 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Criação de escalas básica</li></ul></CardContent><Button asChild variant="outline" className="m-6"><Link to="/auth">Começar de Graça</Link></Button></Card>
                <Card className="flex flex-col border-primary ring-2 ring-primary"><CardHeader><div className="flex justify-between items-center"><CardTitle>Business</CardTitle><Badge className="bg-accent text-accent-foreground">Mais Popular</Badge></div><CardDescription>Para operações que precisam de poder total.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-muted-foreground">/mês</span></p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li></ul></CardContent><Button asChild className="m-6"><Link to="/auth">Escolher Business</Link></Button></Card>
                <Card className="flex flex-col"><CardHeader><CardTitle>Enterprise</CardTitle><CardDescription>Para redes e grandes operações.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">Contacto</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Funcionários ilimitados</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Suporte dedicado</li></ul></CardContent><Button asChild variant="outline" className="m-6"><Link to="/contato">Agendar Demonstração</Link></Button></Card>
            </div>
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
      <main>
        <HeroSection />
        <SocialProofSection />
        <SolutionSection />
        <TestimonialsSection />
        <PricingSection />
        {/* Adicione aqui a Tabela Comparativa e o FAQ quando necessário */}
      </main>
      <Footer />
    </>
  );
}