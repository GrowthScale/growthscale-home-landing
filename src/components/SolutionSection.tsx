import { ShieldCheck, BrainCircuit, TrendingUp } from "lucide-react";

const SolutionSection = () => {
  return (
    <section id="recursos" className="py-16 sm:py-20 lg:py-24 bg-slate-50" aria-labelledby="solution-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 sm:mb-20">
          <h2 id="solution-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            A tranquilidade de uma operação sob controle.
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Descubra como nossa IA transforma a gestão de escalas
          </p>
        </header>
        
        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          {/* Solução 1: Co-Piloto CLT */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">Seu Co-Piloto CLT 24/7</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Enquanto você monta a escala, nossa IA audita cada turno contra as regras da CLT. Se houver um risco de violação de intervalo, excesso de jornada ou folga, você é alertado instantaneamente, antes que o erro aconteça.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200">
              {/* ANOTAÇÃO PARA O VISUAL: */}
              {/* TODO: Substituir este placeholder por um GIF de 5s mostrando um turno sendo arrastado no calendário, criando um conflito, e um alerta vermelho aparecendo com a descrição do erro. */}
              <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <p className="text-slate-500 font-medium">Demonstração do Alerta de Compliance</p>
              </div>
            </div>
          </div>

          {/* Solução 2: Escala Inteligente */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 lg:order-last">
              {/* ANOTAÇÃO PARA O VISUAL: */}
              {/* TODO: Substituir este placeholder por um GIF de 5s mostrando um calendário semanal vazio e, após o clique no botão "Sugerir com IA", ele sendo preenchido automaticamente com os nomes dos funcionários. */}
              <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <p className="text-slate-500 font-medium">Demonstração da Criação de Escala</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <BrainCircuit className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">Sua melhor escala, em um clique.</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Esqueça o quebra-cabeça. Informe os turnos que precisam ser preenchidos e deixe nossa IA encontrar a combinação ideal, considerando habilidades, custo e equidade. O que levava horas, agora leva segundos.
              </p>
            </div>
          </div>

          {/* Solução 3: Previsão Financeira */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">Visão de Raio-X dos seus Custos.</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Cada alteração na escala atualiza seu custo em tempo real. Saiba exatamente quanto vai gastar com horas extras e adicionais noturnos antes de publicar. Assuma o controle total da sua principal despesa.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200">
              {/* ANOTAÇÃO PARA O VISUAL: */}
              {/* TODO: Substituir este placeholder por um GIF de 5s mostrando o painel de "Custo Estimado" atualizando os valores à medida que um turno é adicionado ou alterado no calendário. */}
              <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <p className="text-slate-500 font-medium">Demonstração do Simulador de Custo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
