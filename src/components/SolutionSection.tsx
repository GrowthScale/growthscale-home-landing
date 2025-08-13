import { ShieldCheck, BrainCircuit, TrendingUp } from "lucide-react";

const SolutionSection = () => {
  return (
    <section id="recursos" className="py-xl bg-muted/30" aria-labelledby="solution-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <header className="text-center">
          <h2 id="solution-title" className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            A tranquilidade de uma operação sob controle.
          </h2>
        </header>
        
        {/* Solução 1: Co-Piloto CLT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Seu Co-Piloto CLT 24/7</h3>
            <p className="text-muted-foreground">Enquanto você monta a escala, nossa IA audita cada turno contra as regras da CLT. Se houver um risco de violação de intervalo, excesso de jornada ou folga, você é alertado instantaneamente, antes que o erro aconteça.</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 shadow-lg">
            {/* ANOTAÇÃO PARA O VISUAL: */}
            {/* TODO: Substituir este placeholder por um GIF de 5s mostrando um turno sendo arrastado no calendário, criando um conflito, e um alerta vermelho aparecendo com a descrição do erro. */}
            <img src="/placeholder-gif-1.png" alt="Demonstração do alerta de compliance em tempo real" className="rounded-md" />
          </div>
        </div>

        {/* Solução 2: Escala Inteligente */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-800 rounded-lg p-2 shadow-lg md:order-last">
            {/* ANOTAÇÃO PARA O VISUAL: */}
            {/* TODO: Substituir este placeholder por um GIF de 5s mostrando um calendário semanal vazio e, após o clique no botão "Sugerir com IA", ele sendo preenchido automaticamente com os nomes dos funcionários. */}
            <img src="/placeholder-gif-2.png" alt="Demonstração da criação de escala com um clique" className="rounded-md" />
          </div>
          <div>
            <BrainCircuit className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Sua melhor escala, em um clique.</h3>
            <p className="text-muted-foreground">Esqueça o quebra-cabeça. Informe os turnos que precisam ser preenchidos e deixe nossa IA encontrar a combinação ideal, considerando habilidades, custo e equidade. O que levava horas, agora leva segundos.</p>
          </div>
        </div>

        {/* Solução 3: Previsão Financeira */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <TrendingUp className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Visão de Raio-X dos seus Custos.</h3>
            <p className="text-muted-foreground">Cada alteração na escala atualiza seu custo em tempo real. Saiba exatamente quanto vai gastar com horas extras e adicionais noturnos antes de publicar. Assuma o controle total da sua principal despesa.</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 shadow-lg">
            {/* ANOTAÇÃO PARA O VISUAL: */}
            {/* TODO: Substituir este placeholder por um GIF de 5s mostrando o painel de "Custo Estimado" atualizando os valores à medida que um turno é adicionado ou alterado no calendário. */}
            <img src="/placeholder-gif-3.png" alt="Demonstração do simulador de custo em tempo real" className="rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
