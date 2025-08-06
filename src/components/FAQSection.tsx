import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como a IA gera as escalas?",
    answer: "Nossa inteligência artificial analisa a disponibilidade dos funcionários, suas habilidades específicas, demanda histórica e preferências pessoais para criar escalas otimizadas automaticamente, garantindo máxima eficiência operacional."
  },
  {
    question: "Quais são os benefícios imediatos?",
    answer: "Você terá redução significativa no tempo gasto criando escalas, melhor distribuição de turnos, compliance automático com leis trabalhistas e funcionários mais satisfeitos com escalas justas e transparentes."
  },
  {
    question: "O que está incluso em cada plano?",
    answer: "O plano Freemium oferece funcionalidades básicas para até 5 funcionários. O plano Starter inclui todas as funcionalidades essenciais (escalas inteligentes, previsão de ausências e compliance automático) para até 15 funcionários."
  },
  {
    question: "Como funciona a previsão de ausências?",
    answer: "Utilizamos algoritmos preditivos que analisam padrões históricos de ausências e comportamentos da equipe para prever possíveis faltas e sugerir substituições proativas."
  },
  {
    question: "O sistema garante compliance trabalhista?",
    answer: "Sim, o GrowthScale monitora automaticamente jornadas de trabalho, intervalos obrigatórios e limites de horas extras, enviando alertas em tempo real para manter total conformidade com a legislação."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Tire suas dúvidas sobre o GrowthScale e descubra como nossa solução pode transformar sua gestão
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;