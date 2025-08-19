import React from 'react';
import { AlertTriangle, Clock, BarChart3 } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30" aria-labelledby="problem-title">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <h2 id="problem-title" className="text-3xl md:text-4xl font-bold text-foreground">
            A gestão manual é o maior risco oculto do seu negócio.
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-destructive/10 mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Risco Jurídico Constante</h3>
            <p className="text-muted-foreground">Cada planilha é um convite a erros de cálculo de horas e intervalos, que se transformam em processos caros e inesperados.</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tempo que Não Volta</h3>
            <p className="text-muted-foreground">Horas gastas montando o quebra-cabeça das escalas são horas que você não dedica a treinar a sua equipe e a servir os seus clientes.</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/10 mb-4">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Decisões no Escuro</h3>
            <p className="text-muted-foreground">Sem visibilidade dos custos em tempo real, cada decisão de escala é um palpite que pode comprometer a sua margem de lucro.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
