// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, Check, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// ===== HEADER =====
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
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
        <Button asChild>
          <Link to="/auth">Começar Agora</Link>
        </Button>
      </div>
    </div>
  </header>
);

// ===== HERO SECTION =====
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
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/auth">Começar a Simplificar Agora</Link>
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
        <img 
          src="/placeholder-dashboard.png" 
          alt="Dashboard GrowthScale" 
          className="w-full h-auto rounded-xl"
        />
      </div>
    </div>
  </section>
);

// ===== SOCIAL PROOF SECTION =====
const SocialProofSection = () => (
  <section className="w-full py-16 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Confiança de quem já transformou</h2>
        <p className="text-muted-foreground text-lg">Empresas que já descobriram o poder da gestão inteligente</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-accent fill-current" />
            </div>
            <h3 className="text-xl font-semibold mb-2">5/5</h3>
            <p className="text-muted-foreground">Avaliações</p>
          </CardContent>
        </Card>
        <Card className="text-center p-6">
          <CardContent>
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100%</h3>
            <p className="text-muted-foreground">Compliance CLT</p>
          </CardContent>
        </Card>
        <Card className="text-center p-6">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Clock className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">80%</h3>
            <p className="text-muted-foreground">Menos tempo</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ===== SOLUTION SECTION =====
const SolutionSection = () => (
  <section className="w-full py-24 bg-background-dark text-foreground-dark">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">Solução para todos os segmentos</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Do pequeno café ao grande restaurante, o GrowthScale adapta-se às suas necessidades
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="bg-background-dark border-border-dark text-center p-6 hover:scale-105 transition-transform">
          <CardContent>
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Restaurantes</h3>
            <p className="text-muted-foreground">Gestão completa de equipes de cozinha e serviço</p>
          </CardContent>
        </Card>
        <Card className="bg-background-dark border-border-dark text-center p-6 hover:scale-105 transition-transform">
          <CardContent>
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bares</h3>
            <p className="text-muted-foreground">Controle de turnos e gestão de bartenders</p>
          </CardContent>
        </Card>
        <Card className="bg-background-dark border-border-dark text-center p-6 hover:scale-105 transition-transform">
          <CardContent>
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cafés</h3>
            <p className="text-muted-foreground">Organização de equipes e horários flexíveis</p>
          </CardContent>
        </Card>
        <Card className="bg-background-dark border-border-dark text-center p-6 hover:scale-105 transition-transform">
          <CardContent>
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Food</h3>
            <p className="text-muted-foreground">Gestão de alta performance para equipes dinâmicas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ===== TESTIMONIAL SECTION =====
const TestimonialSection = () => (
  <section className="w-full py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Star className="h-12 w-12 text-accent mx-auto mb-4" />
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6">
            "O GrowthScale transformou completamente a forma como gerimos nossa equipe. O que antes era um caos diário agora é uma operação suave e eficiente."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-accent font-semibold">MS</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Maria Silva</p>
              <p className="text-muted-foreground">Proprietária, Bistrô Sabor & Arte</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ===== PRICING SECTION =====
const PricingSection = () => (
  <section id="precos" className="w-full py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-foreground mb-6">Planos que crescem com você</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Escolha o plano ideal para o tamanho da sua operação
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Para começar</CardDescription>
            <div className="text-4xl font-bold text-foreground">R$ 0<span className="text-lg text-muted-foreground">/mês</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Até 5 funcionários</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Escalas básicas</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Suporte por email</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link to="/auth">Começar Grátis</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="p-8 text-center border-2 border-primary relative">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
            Mais Popular
          </Badge>
          <CardHeader>
            <CardTitle className="text-2xl">Business</CardTitle>
            <CardDescription>Para crescer</CardDescription>
            <div className="text-4xl font-bold text-foreground">R$ 99<span className="text-lg text-muted-foreground">/mês</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Até 25 funcionários</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Escalas avançadas</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Relatórios detalhados</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Suporte prioritário</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link to="/auth">Escolher Business</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>Para grandes operações</CardDescription>
            <div className="text-4xl font-bold text-foreground">R$ 299<span className="text-lg text-muted-foreground">/mês</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Funcionários ilimitados</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Múltiplas filiais</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>API personalizada</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-accent mr-2" />
                <span>Gerente de conta</span>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact">Falar com Vendas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ===== FOOTER =====
const Footer = () => (
  <footer className="w-full py-12 bg-background-dark text-foreground-dark border-t border-border-dark">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-bold">GrowthScale</span>
          </div>
          <p className="text-muted-foreground">
            Transformando a gestão de escalas com inteligência artificial.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Produto</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/#recursos" className="hover:text-foreground-dark transition-colors">Recursos</Link></li>
            <li><Link to="/#precos" className="hover:text-foreground-dark transition-colors">Preços</Link></li>
            <li><Link to="/contact" className="hover:text-foreground-dark transition-colors">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Suporte</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/docs" className="hover:text-foreground-dark transition-colors">Documentação</Link></li>
            <li><Link to="/help" className="hover:text-foreground-dark transition-colors">Central de Ajuda</Link></li>
            <li><Link to="/contact" className="hover:text-foreground-dark transition-colors">Suporte</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground-dark transition-colors">Privacidade</Link></li>
            <li><Link to="/terms" className="hover:text-foreground-dark transition-colors">Termos</Link></li>
            <li><Link to="/cookies" className="hover:text-foreground-dark transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border-dark mt-8 pt-8 text-center text-muted-foreground">
        <p>&copy; 2024 GrowthScale. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

// ===== MAIN COMPONENT =====
export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <SolutionSection />
        <TestimonialSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}