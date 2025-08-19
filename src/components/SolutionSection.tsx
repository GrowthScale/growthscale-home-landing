import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, BrainCircuit, TrendingUp } from 'lucide-react';

export function SolutionSection() {
  return (
    <section id="recursos" className="py-20 md:py-28 bg-background" aria-labelledby="solution-title">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <h2 id="solution-title" className="text-3xl md:text-4xl font-bold text-foreground">
            A sua operação, finalmente sob controle.
          </h2>
        </header>
        <Tabs defaultValue="compliance" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-10">
            <TabsTrigger value="compliance">
              <ShieldCheck className="mr-2 h-4 w-4" /> Co-Piloto CLT
            </TabsTrigger>
            <TabsTrigger value="ia">
              <BrainCircuit className="mr-2 h-4 w-4" /> Escalas Inteligentes
            </TabsTrigger>
            <TabsTrigger value="custos">
              <TrendingUp className="mr-2 h-4 w-4" /> Previsão de Custos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compliance">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Opere com 100% de segurança jurídica.</h3>
                <p className="text-muted-foreground">A nossa IA audita cada turno em tempo real contra as regras da CLT. Receba alertas instantâneos sobre violações de intervalos, excesso de jornada e folgas obrigatórias, antes que se tornem um problema.</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-2 shadow-lg">
                {/* ANOTAÇÃO PARA O VISUAL: TODO: GIF do alerta de risco. */}
                <img src="/placeholder-gif-1.png" alt="Demonstração do alerta de compliance" className="rounded-lg" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ia">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Crie a escala perfeita em segundos.</h3>
                <p className="text-muted-foreground">Esqueça o quebra-cabeça. Com um clique, a nossa IA sugere a escala ideal, considerando custo, habilidades da equipe e equidade. O que levava horas, agora é resolvido no tempo de um café.</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-2 shadow-lg">
                {/* ANOTAÇÃO PARA O VISUAL: TODO: GIF da sugestão de IA. */}
                <img src="/placeholder-gif-2.png" alt="Demonstração da sugestão de IA" className="rounded-lg" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custos">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Saiba o seu custo antes de gastar.</h3>
                <p className="text-muted-foreground">Cada alteração na escala atualiza o seu custo em tempo real. Tenha uma visão de raio-x das suas despesas com horas extras e adicionais, assumindo o controle total da sua principal despesa operacional.</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-2 shadow-lg">
                {/* ANOTAÇÃO PARA O VISUAL: TODO: GIF do simulador de custo. */}
                <img src="/placeholder-gif-3.png" alt="Demonstração do simulador de custo" className="rounded-lg" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
