import React from 'react';
import { Button } from './button-v2';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight, ShieldCheck, BrainCircuit, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionV2Props {
  className?: string;
}

export const HeroSectionV2: React.FC<HeroSectionV2Props> = ({ className }) => {
  return (
    <section className={cn(
      "relative w-full py-24 md:py-32 lg:py-40 overflow-hidden",
      "bg-hero", // Gradiente do design system
      className
    )}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8 animate-fade-in-down">
            <ShieldCheck className="h-4 w-4" />
            IA para Gestão de Escalas
            <span className="ml-2 px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">
              Beta
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 animate-fade-in-down delay-100">
            Assuma o controle total das suas{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              escalas
            </span>
            . Sem o stress.
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-down delay-200">
            O GrowthScale é o seu consultor de operações digital. Crie escalas otimizadas com IA, 
            preveja custos e evite riscos da CLT, de forma simples e visual.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-down delay-300">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full" />
              Reduza custos em até 30%
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full" />
              Compliance 100% automático
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Setup em 30 minutos
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-400">
            <Button asChild size="xl" variant="gradient" className="group">
              <Link to="/auth">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="group">
              <Link to="/#recursos">
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver em Ação
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-in-up delay-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              LGPD Compliant
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-accent" />
              IA Avançada
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              99.9% Uptime
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up delay-600">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
            <div className="relative bg-surface-card rounded-2xl p-2 border border-border/10 shadow-2xl">
              <div className="bg-slate-900 rounded-xl p-2">
                <img 
                  src="/placeholder-dashboard.png" 
                  alt="Interface do GrowthScale mostrando o calendário de escalas inteligente" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
