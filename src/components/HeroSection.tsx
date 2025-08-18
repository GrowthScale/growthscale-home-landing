import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-48 text-center bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 animate-fade-in-down">
            Assuma o controlo total das suas escalas. Sem o stress.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
            O GrowthScale é o seu consultor de operações digital. Crie escalas otimizadas com IA, preveja custos e evite riscos da CLT, de forma simples e visual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="text-lg px-8 py-6">Começar Agora</Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver em Ação
            </Button>
          </div>
        </div>
        <div className="mt-20 max-w-6xl mx-auto animate-fade-in-up shadow-2xl rounded-xl" style={{ animationDelay: '0.6s' }}>
          {/* ANOTAÇÃO PARA O VISUAL: */}
          {/* TODO: Substituir este placeholder por uma imagem ou GIF de alta qualidade da UI principal do GrowthScale em modo escuro. Deve mostrar o calendário de escalas, limpo e organizado, com destaques visuais nos alertas de IA. A imagem deve ter um efeito de sombra suave para 'flutuar' sobre o fundo. */}
          <div className="bg-slate-800 rounded-xl p-2 border border-border/10">
            <img src="/placeholder-dashboard.png" alt="Interface do GrowthScale mostrando o calendário de escalas inteligente" className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
