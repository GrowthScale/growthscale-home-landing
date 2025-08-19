import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Impactante */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Tire suas <span className="text-blue-600">Dúvidas</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Respostas diretas para as perguntas que mais importam. Sem enrolação, só o que você precisa saber.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-slate-200 rounded-xl px-6 hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA após FAQ */}
        <div className="text-center mt-16 sm:mt-20">
          <p className="text-lg sm:text-xl text-slate-600 mb-8">
            Ainda tem dúvidas? Nossa equipe está pronta para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Falar com Especialista
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;