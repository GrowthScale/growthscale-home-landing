import { AlertTriangle, Clock, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProblemSection = () => {
  return (
    <section className="py-xl bg-background" aria-labelledby="problem-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="problem-title" className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Se a sua gestão de escalas se parece com isso, você está em risco.
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Risco Jurídico */}
          <Card>
            <CardHeader>
              <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
              <CardTitle>Medo Constante da CLT</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Cada escala criada em planilha é um campo minado de erros de intervalo, horas extras não vistas e folgas incorretas. Um único erro pode custar dezenas de milhares de reais.</p>
            </CardContent>
          </Card>
          {/* Card 2: Perda de Tempo */}
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Horas Desperdiçadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">O quebra-cabeça de montar a escala, comunicar no WhatsApp e ajustar de última hora consome o seu bem mais precioso: o tempo que você deveria usar para gerir o seu negócio.</p>
            </CardContent>
          </Card>
          {/* Card 3: Falta de Controle */}
          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-secondary mb-2" />
              <CardTitle>Gestão às Cegas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Você sabe exatamente quanto a escala desta semana vai custar ANTES dela começar? Sem um simulador, você está pilotando sua maior despesa operacional de olhos vendados.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
