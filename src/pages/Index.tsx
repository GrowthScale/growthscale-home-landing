// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { PlayCircle, ShieldCheck, Clock, BarChart3, Check, X, Star, AlertTriangle, Users, Zap, ArrowRight, Sparkles } from 'lucide-react';
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

// Banner de Urgência
const UrgencyBanner = () => (
  <div className="bg-accent/10 border-b border-accent/20">
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-accent">
        <AlertTriangle className="h-4 w-4" />
        <span>⚠️ Últimas 23 vagas para demonstração gratuita</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">⏰ Oferta expira em 2h 47min</span>
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section className="w-full py-24 md:py-32 lg:py-40 text-center bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Badge de Destaque */}
        <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-4 py-2 text-sm font-medium text-destructive mb-6 animate-fade-in-up">
          <AlertTriangle className="h-4 w-4" />
          ATENÇÃO: 73% dos restaurantes perdem dinheiro com escalas mal feitas
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 animate-fade-in-up">
          Chega de perder noites de domingo criando escalas
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-accent mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Transforme 4 horas de stress em 5 minutos de paz
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Você já perdeu dinheiro por escalas mal feitas? Já ficou acordado até 2h da manhã tentando resolver trocas? 
          O GrowthScale resolve isso com IA que entende a CLT melhor que você.
        </p>
        
        {/* Estatísticas de Impacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">15h</div>
            <div className="text-sm text-muted-foreground">Economizadas por semana</div>
          </div>
          <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/10">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Redução de stress</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">R$ 2.5k</div>
            <div className="text-sm text-muted-foreground">Economia mensal média</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Link to="/auth">Começar a Economizar Tempo Agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105">
            <Link to="/#recursos"><PlayCircle className="mr-2 h-5 w-5" />Ver Como Funciona</Link>
          </Button>
        </div>
        
        {/* Garantia de Risco Zero */}
        <div className="mt-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <ShieldCheck className="inline h-4 w-4 mr-1" />
          Teste grátis por 14 dias • Cancele quando quiser • Sem compromisso
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
            <div className="mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Confiado por +500 restaurantes
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Gestores que já recuperaram suas noites de domingo
              </h2>
            </div>
            
            {/* Logos com efeito hover */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto mb-12">
                <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/assets/logo-bistro.png" alt="Logo do Bistrô Sabor & Arte" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/assets/logo-sabores.png" alt="Logo do Grupo Sabores do Brasil" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/assets/logo-pizzaria.png" alt="Logo da Pizzaria Napolitana" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/assets/logo-cafe.png" alt="Logo do Café Central" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/assets/logo-hamburgueria.png" alt="Logo da Rede de Hamburguerias" className="h-16 w-auto mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            
            {/* Testimonial Principal */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <div>
                            <div className="font-semibold text-foreground">Maria Silva</div>
                            <div className="text-sm text-muted-foreground">Dona do Bistrô Sabor & Arte</div>
                        </div>
                    </div>
                    <p className="text-muted-foreground italic mb-4">
                        "Antes do GrowthScale, eu perdia 4 horas todo domingo criando escalas. Agora leva 5 minutos. 
                        E a tranquilidade de saber que estamos sempre em conformidade com a CLT é inestimável. 
                        Economizamos R$ 3.200 por mês em horas extras."
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span><Check className="inline h-4 w-4 text-accent mr-1" />15h economizadas por semana</span>
                        <span><Check className="inline h-4 w-4 text-accent mr-1" />100% conformidade CLT</span>
                        <span><Check className="inline h-4 w-4 text-accent mr-1" />R$ 3.2k economia mensal</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECÇÃO DE SOLUÇÃO (MODO CINEMA - ESCURO) ---
const SolutionSection = () => (
  <section id="recursos" className="py-20 md:py-28 bg-[hsl(var(--background-dark))] text-foreground-dark" aria-labelledby="solution-title">
    <div className="container mx-auto px-4 space-y-24">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h2 id="solution-title" className="text-3xl md:text-4xl font-bold">De um quebra-cabeças stressante a uma decisão de 5 minutos.</h2>
        <p className="text-lg text-muted-foreground mt-4">Veja como o GrowthScale resolve os problemas que você enfrenta todos os dias</p>
      </header>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><ShieldCheck className="h-4 w-4" /> Segurança Jurídica</div>
          <h3 className="text-2xl font-bold mb-3">O seu Co-Piloto CLT, 24/7.</h3>
          <p className="text-muted-foreground mb-4">Enquanto você arrasta e solta, a nossa IA audita cada turno, alertando-o para potenciais riscos de intervalos e excesso de jornada.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent"><Check className="h-4 w-4" /><span>Validação automática da CLT</span></div>
            <div className="flex items-center gap-2 text-accent"><Check className="h-4 w-4" /><span>Alertas em tempo real</span></div>
            <div className="flex items-center gap-2 text-accent"><Check className="h-4 w-4" /><span>Relatórios de compliance</span></div>
          </div>
        </div>
        <div className="rounded-xl p-2 bg-black/20 border border-border-dark shadow-lg"><img src="/placeholder-gif-1-dark.png" alt="Demonstração do alerta de compliance" className="rounded-lg" /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl p-2 bg-black/20 border border-border-dark shadow-lg md:order-last"><img src="/placeholder-gif-2-dark.png" alt="Demonstração da sugestão de IA" className="rounded-lg" /></div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"><Clock className="h-4 w-4" /> Eficiência Máxima</div>
          <h3 className="text-2xl font-bold mb-3">Recupere as suas horas.</h3>
          <p className="text-muted-foreground mb-4">O que levava horas, agora leva segundos. Deixe a IA criar a escala otimizada com um clique.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent"><Check className="h-4 w-4" /><span>IA inteligente que aprende</span></div>
            <div className="flex items-center gap-2 text-accent"><Check className="h-4 w-4" /><span>Otimização automática</span></div>
            <div className="flex items-center gap-2 text-accent"><Check className="h-4 w-4" /><span>Integração com WhatsApp</span></div>
          </div>
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

const FaqSection = () => (
  <section className="py-20 md:py-28 bg-secondary" aria-labelledby="faq-title">
    <div className="container mx-auto px-4 max-w-3xl">
      <header className="text-center mb-12">
        <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-foreground">Respostas claras para as suas dúvidas.</h2>
        <p className="text-lg text-muted-foreground mt-4">Tudo que você precisa saber antes de começar</p>
      </header>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>O GrowthScale substitui um advogado ou contador?</AccordionTrigger>
          <AccordionContent>
            Não. O GrowthScale é uma poderosa plataforma de inteligência operacional desenhada para lhe dar clareza sobre as regras da CLT e alertá-lo para potenciais riscos. Ele não fornece aconselhamento jurídico e não substitui a orientação de um profissional qualificado.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>A implementação é demorada?</AccordionTrigger>
          <AccordionContent>
            Não. O nosso onboarding guiado permite-lhe configurar a sua empresa e importar os seus funcionários em menos de 30 minutos. O nosso suporte está disponível para o ajudar em cada passo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Os meus dados estão seguros?</AccordionTrigger>
          <AccordionContent>
            Sim. A segurança é a nossa prioridade máxima. Utilizamos as melhores práticas do mercado, como criptografia de ponta e isolamento de dados por cliente, para garantir que as suas informações estejam sempre protegidas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Posso cancelar quando quiser?</AccordionTrigger>
          <AccordionContent>
            Sim. Não há contratos de longo prazo. Você pode cancelar a qualquer momento através da sua conta. O seu acesso permanecerá ativo até o final do período de faturação.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Quanto tempo leva para ver resultados?</AccordionTrigger>
          <AccordionContent>
            A maioria dos nossos clientes vê resultados imediatos. No primeiro mês, você economizará em média 15 horas por semana e reduzirá significativamente o stress relacionado com a gestão de escalas.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

const PricingSection = () => (
    <section id="precos" className="py-20 md:py-28 bg-background" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
            <header className="text-center mb-16 max-w-3xl mx-auto">
              <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2>
              <p className="text-lg text-muted-foreground mt-4">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>Para equipas pequenas a começar.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-4xl font-bold">R$0</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 5 funcionários</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Criação de escalas básica</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Validação CLT básica</li>
                    </ul>
                  </CardContent>
                  <Button asChild variant="outline" className="m-6">
                    <Link to="/auth">Começar de Graça</Link>
                  </Button>
                </Card>
                
                <Card className="flex flex-col border-primary ring-2 ring-primary relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">Mais Popular</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Business</CardTitle>
                    <CardDescription>Para operações que precisam de poder total.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Simulador de Custos</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Integração WhatsApp</li>
                    </ul>
                  </CardContent>
                  <Button asChild className="m-6">
                    <Link to="/auth">Escolher Business</Link>
                  </Button>
                </Card>
                
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>Para redes e grandes operações.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-4xl font-bold">Contacto</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Funcionários ilimitados</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Múltiplas filiais</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Suporte dedicado</li>
                      <li><Check className="inline-block mr-2 h-4 w-4 text-primary" />API personalizada</li>
                    </ul>
                  </CardContent>
                  <Button asChild variant="outline" className="m-6">
                    <Link to="/contato">Agendar Demonstração</Link>
                  </Button>
                </Card>
            </div>
            
            {/* Garantia de Risco Zero */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Teste grátis por 14 dias • Cancele quando quiser</span>
              </div>
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
      <UrgencyBanner />
      <main>
        <HeroSection />
        <SocialProofSection />
        <SolutionSection />
        <TestimonialsSection />
        <FaqSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}