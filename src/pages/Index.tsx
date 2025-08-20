// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

// --- COMPONENTES DA PÁGINA ---

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex"><Link to="/" className="flex items-center space-x-2"><svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg><span className="font-bold text-foreground">GrowthScale</span></Link></div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium"><Link to="/#recursos" className="text-muted-foreground transition-colors hover:text-foreground">Recursos</Link><Link to="/#precos" className="text-muted-foreground transition-colors hover:text-foreground">Preços</Link></nav>
      <div className="flex flex-1 items-center justify-end space-x-2"><Button asChild variant="ghost" className="text-foreground"><Link to="/auth">Entrar</Link></Button><Button asChild><Link to="/auth">Começar Agora</Link></Button></div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative w-full py-24 md:py-32 lg:py-40 text-center bg-background overflow-hidden">
    {/* Aurora Background Effect */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl"></div>
    </div>
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-6 animate-fade-in-up">
          O Futuro da Gestão de Escalas. Agora.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Troque o stress das planilhas pela inteligência da nossa IA. Crie escalas perfeitas, preveja custos e opere com 100% de segurança jurídica.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6"><Link to="/auth">Comece a Simplificar</Link></Button>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6"><Link to="/#recursos"><PlayCircle className="mr-2 h-5 w-5" />Ver a Magia</Link></Button>
        </div>
      </div>
      <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="relative rounded-xl p-2 bg-card/60 border border-border/20 shadow-2xl shadow-primary/10 backdrop-blur-md">
          <img src="/placeholder-dashboard-dark.png" alt="Interface do GrowthScale" className="relative rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Não acredite apenas na nossa palavra.</h2>
        <Card className="p-8 text-center shadow-lg bg-card/60 backdrop-blur-md border-border/20">
            <div className="flex justify-center mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}</div>
            <blockquote className="text-xl md:text-2xl font-medium text-foreground">"O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipa foi notificada não tem preço. Mudou o jogo para nós."</blockquote>
            <footer className="mt-6"><p className="font-semibold">Joana Silva</p><p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p></footer>
        </Card>
    </div>
  </section>
);

const SolutionSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-background" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-24">
      <header className="text-center max-w-3xl mx-auto"><h2 id="solution-title" className="text-3xl md:text-4xl font-bold text-foreground">A sua operação, finalmente sob controlo.</h2></header>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><ShieldCheck className="h-4 w-4" /> Segurança Jurídica</div>
          <h3 className="text-2xl font-bold mb-3">O seu Co-Piloto CLT, 24/7.</h3><p className="text-muted-foreground">A nossa IA audita cada turno, alertando-o para potenciais riscos de intervalos e excesso de jornada. Opere com a clareza de quem toma decisões informadas.</p>
        </div>
        <div className="rounded-xl p-2 bg-secondary shadow-lg"><img src="/placeholder-gif-1.png" alt="Demonstração do alerta de compliance" className="rounded-lg" /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl p-2 bg-secondary shadow-lg md:order-last"><img src="/placeholder-gif-2.png" alt="Demonstração da sugestão de IA" className="rounded-lg" /></div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><Clock className="h-4 w-4" /> Eficiência Máxima</div>
          <h3 className="text-2xl font-bold mb-3">Recupere as suas horas.</h3><p className="text-muted-foreground">O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique. Mais tempo para si, para a sua equipa e para os seus clientes.</p>
        </div>
      </div>
    </div>
  </section>
);


const Footer = () => (
  <footer className="py-12 bg-secondary border-t">
    <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
      © {new Date().getFullYear()} GrowthScale. A tranquilidade de uma operação sob controlo.
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
        <TestimonialsSection />
        <SolutionSection />
        {/* Adicione aqui as seções de Preços e FAQ com este mesmo padrão visual */}
      </main>
      <Footer />
    </>
  );
}
