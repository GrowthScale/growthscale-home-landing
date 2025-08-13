import { AlertTriangle, Clock, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProblemSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="problem-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 sm:mb-20">
          <h2 id="problem-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Se a sua gestão de escalas se parece com isso, você está em risco.
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Identifique os problemas que estão custando caro para o seu negócio
          </p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Card 1: Risco Jurídico */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">Medo Constante da CLT</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Cada escala criada em planilha é um campo minado de erros de intervalo, horas extras não vistas e folgas incorretas. Um único erro pode custar dezenas de milhares de reais.
              </p>
            </CardContent>
          </Card>
          
          {/* Card 2: Perda de Tempo */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">Horas Desperdiçadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                O quebra-cabeça de montar a escala, comunicar no WhatsApp e ajustar de última hora consome o seu bem mais precioso: o tempo que você deveria usar para gerir o seu negócio.
              </p>
            </CardContent>
          </Card>
          
          {/* Card 3: Falta de Controle */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">Gestão às Cegas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Você sabe exatamente quanto a escala desta semana vai custar ANTES dela começar? Sem um simulador, você está pilotando sua maior despesa operacional de olhos vendados.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
