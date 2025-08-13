import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Fundo com vídeo/GIF do produto em ação */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* ANOTAÇÃO PARA O VISUAL: */}
        {/* TODO: Substituir este placeholder por um vídeo de fundo (com overlay escuro) ou GIF de alta qualidade mostrando a interface do GrowthScale em ação: o calendário sendo preenchido, os alertas aparecendo. Deve ser sutil e elegante. */}
        <div className="bg-slate-900 w-full h-full"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 [text-shadow:0_2px_4px_hsl(var(--foreground)/0.4)]">
          Sua paz de espírito custa menos que um processo trabalhista.
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 [text-shadow:0_1px_2px_hsl(var(--foreground)/0.4)]">
          A plataforma com Inteligência Artificial que blinda seu restaurante, otimiza suas escalas em minutos e te dá o controle total dos custos. Sem planilhas, sem medo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">Comece a Simplificar Agora</Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
            <PlayCircle className="mr-2 h-5 w-5" />
            Ver em Ação (2 min)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;