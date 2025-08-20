// src/pages/Index.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  PlayCircle, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  Check, 
  Star, 
  X, 
  Users, 
  TrendingUp, 
  Zap,
  Brain,
  MessageSquare,
  Smartphone,
  FileCheck,
  ArrowRight,
  Rocket,
  Target,
  Award,
  Sparkles
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- COMPONENTES DA PÁGINA ---

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-neutral-light bg-background/90 backdrop-blur-lg">
    <div className="container flex h-16 items-center">
      <div className="mr-6 flex">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-modern flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-foreground">GrowthScale</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link to="/#recursos" className="text-neutral-medium transition-colors hover:text-foreground">Recursos</Link>
        <Link to="/#precos" className="text-neutral-medium transition-colors hover:text-foreground">Preços</Link>
      </nav>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Button asChild variant="ghost">
          <Link to="/auth">Entrar</Link>
        </Button>
        <Button asChild className="bg-accent hover:bg-accent-light text-white">
          <Link to="/auth">Começar Agora</Link>
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative w-full py-24 md:py-32 lg:py-40 text-center bg-gradient-to-br from-neutral-light to-white overflow-hidden">
    <div className="absolute inset-0 z-0 bg-grid-modern opacity-5"></div>
    <div className="container relative z-10 mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="text-left">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Plataforma Inovadora
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 animate-fade-in-up text-foreground">
              Gestão de escalas <span className="bg-gradient-modern bg-clip-text text-transparent">simples e inteligente</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-medium max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Automatize escalas, reduza custos em 30% e garanta compliance CLT automaticamente com IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent-light text-white shadow-glow-warm">
                <Link to="/auth">
                  <Rocket className="mr-2 h-5 w-5" />
                  Começar Gratuitamente
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/#recursos">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Ver Demo
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mockup/Imagem */}
          <div className="relative animate-float-gentle">
            <div className="relative bg-white rounded-2xl shadow-soft p-6 border border-neutral-light">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm text-neutral-medium">Dashboard GrowthScale</div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gradient-modern rounded"></div>
                <div className="h-4 bg-neutral-light rounded w-3/4"></div>
                <div className="h-4 bg-neutral-light rounded w-1/2"></div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="h-8 bg-primary/20 rounded flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="h-8 bg-secondary/20 rounded flex items-center justify-center">
                    <Clock className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="h-8 bg-accent/20 rounded flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-accent text-white rounded-full p-3 shadow-glow-warm">
              <Check className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          <Target className="w-4 h-4 mr-2" />
          Por que escolher o GrowthScale?
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Transforme sua gestão de escalas
        </h2>
        <p className="text-lg text-neutral-medium">
          Uma plataforma completa que resolve todos os desafios
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">Compliance CLT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-medium">Automatize a criação de escalas respeitando todas as regras da CLT, evitando multas.</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle className="text-xl text-foreground">Economia de Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-medium">Reduza em 80% o tempo gasto na criação e gestão de escalas com nossa IA.</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-xl text-foreground">Análise Inteligente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-medium">Obtenha insights valiosos sobre produtividade, custos e otimização.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-20 bg-neutral-light">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          O que nossos clientes dizem
        </h2>
        <p className="text-lg text-neutral-medium">
          Empresas que confiam no GrowthScale
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-current" />
              ))}
            </div>
            <p className="text-neutral-medium mb-4">
              "Reduzimos 70% do tempo gasto com escalas e eliminamos completamente as multas CLT."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">João Silva</p>
                <p className="text-sm text-neutral-medium">Restaurante ABC</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-current" />
              ))}
            </div>
            <p className="text-neutral-medium mb-4">
              "A IA do GrowthScale é incrível. Sugestões perfeitas e economia real de 25% nos custos."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Maria Santos</p>
                <p className="text-sm text-neutral-medium">Café Express</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-current" />
              ))}
            </div>
            <p className="text-neutral-medium mb-4">
              "Implementação em 24h e funcionários adoram as notificações WhatsApp automáticas."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Carlos Lima</p>
                <p className="text-sm text-neutral-medium">Pizzaria Bella</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="recursos" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
          <Zap className="w-4 h-4 mr-2" />
          Recursos Principais
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Tudo que você precisa em uma plataforma
        </h2>
        <p className="text-lg text-neutral-medium">
          Funcionalidades poderosas para transformar sua gestão
        </p>
      </div>
      
      <div className="space-y-16">
        {/* Feature 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">IA Inteligente</h3>
            <p className="text-lg text-neutral-medium mb-6">
              Algoritmo que aprende com seus padrões e otimiza escalas automaticamente, reduzindo 90% do tempo de criação.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-neutral-medium">
                <Check className="w-5 h-5 text-secondary mr-3" />
                Otimização automática de custos
              </li>
              <li className="flex items-center text-neutral-medium">
                <Check className="w-5 h-5 text-secondary mr-3" />
                Previsão de demanda inteligente
              </li>
              <li className="flex items-center text-neutral-medium">
                <Check className="w-5 h-5 text-secondary mr-3" />
                Sugestões personalizadas
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-gradient-modern rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold">Dashboard IA</h4>
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Otimização de Custos</span>
                  <span className="font-bold">-30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tempo de Criação</span>
                  <span className="font-bold">-90%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Compliance CLT</span>
                  <span className="font-bold">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-warm rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold">Comunicação WhatsApp</h4>
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm">Olá João! Você está escalado para amanhã às 8h.</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm">Confirme sua presença respondendo SIM ou NÃO</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Comunicação Automática</h3>
            <p className="text-lg text-neutral-medium mb-6">
              Notificações automáticas e confirmações via WhatsApp para toda a equipe, reduzindo 90% das ausências.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-neutral-medium">
                <Check className="w-5 h-5 text-secondary mr-3" />
                Confirmação automática
              </li>
              <li className="flex items-center text-neutral-medium">
                <Check className="w-5 h-5 text-secondary mr-3" />
                Histórico completo
              </li>
              <li className="flex items-center text-neutral-medium">
                <Check className="w-5 h-5 text-secondary mr-3" />
                Integração nativa
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 bg-gradient-modern text-white">
    <div className="container mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para transformar sua gestão?
        </h2>
        <p className="text-xl mb-10 opacity-90">
          Junte-se a centenas de empresas que já otimizaram suas escalas com o GrowthScale
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-neutral-light shadow-glow">
            <Link to="/auth">
              <Rocket className="mr-2 h-5 w-5" />
              Começar Gratuitamente
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
            <Link to="/contact">
              <ArrowRight className="mr-2 h-5 w-5" />
              Falar com Especialista
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-neutral-dark text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-modern flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">GrowthScale</span>
          </div>
          <p className="text-neutral-medium">
            Transformando a gestão de escalas com inteligência artificial.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Produto</h4>
          <ul className="space-y-2 text-neutral-medium">
            <li><Link to="/#recursos" className="hover:text-white transition-colors">Recursos</Link></li>
            <li><Link to="/#precos" className="hover:text-white transition-colors">Preços</Link></li>
            <li><Link to="/auth" className="hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Suporte</h4>
          <ul className="space-y-2 text-neutral-medium">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contato</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/legal" className="hover:text-white transition-colors">Legal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Empresa</h4>
          <ul className="space-y-2 text-neutral-medium">
            <li><Link to="/about" className="hover:text-white transition-colors">Sobre</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Carreiras</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-medium mt-8 pt-8 text-center text-neutral-medium">
        <p>&copy; 2024 GrowthScale. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <SocialProofSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
