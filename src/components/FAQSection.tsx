import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "A maioria dos nossos clientes vê economia de tempo já na primeira semana. Em 30 dias, você terá dados suficientes para comprovar a redução de custos e aumento da eficiência operacional."
  },
  {
    question: "É realmente fácil de usar?",
    answer: "Absolutamente! Nossa interface foi projetada para ser intuitiva. Se você consegue usar WhatsApp, consegue usar o GrowthScale. Setup em 5 minutos, sem treinamentos complexos."
  },
  {
    question: "E se eu não gostar?",
    answer: "Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas, sem complicações. Seu risco é zero."
  },
  {
    question: "Funciona com minha operação atual?",
    answer: "Sim! O GrowthScale se adapta a qualquer tipo de restaurante, desde pequenos estabelecimentos até grandes redes. Nossa IA aprende com seus padrões específicos."
  },
  {
    question: "O suporte é realmente bom?",
    answer: "Nossos clientes dão nota 4.9/5 para o suporte. Temos equipe brasileira, falamos português e respondemos em até 1 hora nos planos pagos. Você nunca ficará sozinho."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim! Não há contratos longos ou taxas de cancelamento. Você pode cancelar a qualquer momento pelo painel ou por email. Simples assim."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Impactante */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            Tire suas <span className="text-primary">Dúvidas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Respostas diretas para as perguntas que mais importam. Sem enrolação, só o que você precisa saber.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 hover:shadow-md transition-smooth"
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

        {/* CTA após FAQ */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Ainda tem dúvidas? Nossa equipe está pronta para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
              Falar com Especialista
            </button>
            <button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
              Agendar Demonstração
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;