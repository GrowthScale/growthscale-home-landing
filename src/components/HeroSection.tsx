import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background with overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* ANOTAÇÃO PARA O VISUAL: */}
        {/* TODO: Substituir este placeholder por um vídeo de fundo (com overlay escuro) ou GIF de alta qualidade mostrando a interface do GrowthScale em ação: o calendário sendo preenchido, os alertas aparecendo. Deve ser sutil e elegante. */}
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
          Sua paz de espírito custa menos que um processo trabalhista.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          A plataforma com Inteligência Artificial que blinda seu restaurante, otimiza suas escalas em minutos e te dá o controle total dos custos. Sem planilhas, sem medo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white hover:bg-gray-100 text-slate-900 text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
          >
            Comece a Simplificar Agora
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-transparent"
          >
            <PlayCircle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Ver em Ação (2 min)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;