import { AlertTriangle, Clock, BarChart3 } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Medo Constante da CLT",
      content: "Cada escala criada em planilha é um campo minado de erros de intervalo, horas extras não vistas e folgas incorretas. Um único erro pode custar dezenas de milhares de reais.",
      iconClassName: "text-red-600"
    },
    {
      icon: Clock,
      title: "Horas Desperdiçadas",
      content: "O quebra-cabeça de montar a escala, comunicar no WhatsApp e ajustar de última hora consome o seu bem mais precioso: o tempo que você deveria usar para gerir o seu negócio.",
      iconClassName: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "Gestão às Cegas",
      content: "Você sabe exatamente quanto a escala desta semana vai custar ANTES dela começar? Sem um simulador, você está pilotando sua maior despesa operacional de olhos vendados.",
      iconClassName: "text-green-600"
    }
  ];

  return (
    <Section
      id="problem-title"
      title="Se a sua gestão de escalas se parece com isso, você está em risco."
      subtitle="Identifique os problemas que estão custando caro para o seu negócio"
      className="bg-white"
      spacing="xl"
    >
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {problems.map((problem, index) => (
          <FeatureCard
            key={index}
            icon={problem.icon}
            title={problem.title}
            iconClassName={problem.iconClassName}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {problem.content}
          </FeatureCard>
        ))}
      </div>
    </Section>
  );
};

export default ProblemSection;
