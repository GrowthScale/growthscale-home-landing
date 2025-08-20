// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, Check, Star, X } from 'lucide-react';
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 animate-fade-in-up">
          Onde a gestão de escalas encontra a paz de espírito.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          O GrowthScale é a plataforma de inteligência operacional que transforma o caos das escalas em controlo absoluto. Automatize, preveja custos e opere com clareza sobre as regras da CLT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6"><Link to="/auth">Começar a Simplificar Agora</Link></Button>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"><Link to="/#recursos"><PlayCircle className="mr-2 h-5 w-5" />Ver Recursos</Link></Button>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Por que escolher o GrowthScale?
        </h2>
        <p className="text-lg text-muted-foreground">
          Uma plataforma completa que resolve todos os desafios da gestão de escalas
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Conformidade CLT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Automatize a criação de escalas respeitando todas as regras da CLT, evitando multas e processos trabalhistas.</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Economia de Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Reduza em 80% o tempo gasto na criação e gestão de escalas com nossa IA especializada.</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Análise Inteligente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Obtenha insights valiosos sobre produtividade, custos e otimização de recursos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {landingPageCopy.socialProof.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {landingPageCopy.socialProof.subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {landingPageCopy.socialProof.testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-background to-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.restaurant}</p>
                </div>
                <Badge variant="secondary">{testimonial.savings}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Estabelecimentos confiam no sistema</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Melhoria na gestão de escalas</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="recursos" className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {landingPageCopy.features.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {landingPageCopy.features.subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="space-y-8">
            {landingPageCopy.features.items.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-2">{feature.description}</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {feature.benefit}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="rounded-2xl p-2 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
            <div className="rounded-xl bg-background p-8 shadow-xl">
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm text-primary font-medium">Interface intuitiva e fácil de usar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="precos" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos adaptados para seu negócio</h2>
        <p className="text-lg text-muted-foreground">
          Escolha o plano ideal para o tamanho do seu estabelecimento
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="flex flex-col border-2 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Para estabelecimentos pequenos</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$0</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Até 5 funcionários
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Criação de escalas básica
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Suporte por email
              </li>
            </ul>
          </CardContent>
          <div className="p-6">
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth">Começar de Graça</Link>
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col border-2 border-primary ring-2 ring-primary/20 relative hover:-translate-y-2 transition-all duration-300">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Business</CardTitle>
            <CardDescription>Para operações que precisam de mais recursos</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Até 25 funcionários
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Sugestões de escala inteligentes
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Alertas de conformidade
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Relatórios detalhados
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Suporte prioritário
              </li>
            </ul>
          </CardContent>
          <div className="p-6">
            <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Link to="/auth">Escolher Business</Link>
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col border-2 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>Para redes e grandes operações</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-4xl font-bold">Sob consulta</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Funcionários ilimitados
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Múltiplas filiais
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                Suporte dedicado
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-success" />
                API personalizada
              </li>
            </ul>
          </CardContent>
          <div className="p-6">
            <Button asChild variant="outline" className="w-full">
              <Link to="/contato">Agendar Demonstração</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {landingPageCopy.urgency.title}
      </h2>
      <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
        {landingPageCopy.urgency.subtitle}
      </p>
      <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <Link to="/auth">{landingPageCopy.urgency.cta}</Link>
      </Button>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <header className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas frequentes</h2>
        <p className="text-lg text-muted-foreground">Respostas para as principais dúvidas</p>
      </header>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border rounded-lg px-6">
          <AccordionTrigger className="text-left">O GrowthScale substitui um advogado ou contador?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Não. O GrowthScale é uma plataforma de gestão de escalas que ajuda a manter a conformidade trabalhista. 
            Ele não substitui o aconselhamento jurídico ou contábil profissional.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border rounded-lg px-6">
          <AccordionTrigger className="text-left">A implementação é demorada?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Não. O sistema é intuitivo e permite configuração rápida. 
            Nossa equipe oferece suporte durante todo o processo de implementação.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border rounded-lg px-6">
          <AccordionTrigger className="text-left">Os meus dados estão seguros?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Sim. Utilizamos as melhores práticas de segurança do mercado, 
            incluindo criptografia e isolamento de dados por cliente.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border rounded-lg px-6">
          <AccordionTrigger className="text-left">Posso cancelar a qualquer momento?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Sim. Não há fidelidade e você pode cancelar sua assinatura a qualquer momento 
            através do painel de controle.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-secondary border-t">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-foreground mb-4">Produto</h3>
          <ul className="space-y-2">
            <li><Link to="/#recursos" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</Link></li>
            <li><Link to="/#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</Link></li>
            <li><Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
          <ul className="space-y-2">
            <li><Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
          <ul className="space-y-2">
            <li><Link to="/ajuda" className="text-muted-foreground hover:text-foreground transition-colors">Central de Ajuda</Link></li>
            <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentação</Link></li>
            <li><Link to="/status" className="text-muted-foreground hover:text-foreground transition-colors">Status do Sistema</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/legal/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link></li>
            <li><Link to="/legal/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/legal/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Política de Cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-foreground">GrowthScale</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} GrowthScale. Sistema de gestão de escalas para food service.
        </p>
      </div>
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
        <BenefitsSection />
        <SocialProofSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
