import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Button } from './button-v2';
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category?: 'general' | 'technical' | 'pricing' | 'compliance';
}

interface FAQSectionV2Props {
  className?: string;
}

const faqData: FAQItem[] = [
  {
    question: "Como é que a IA garante a conformidade com a CLT?",
    answer: "A nossa IA é constantemente atualizada com as regras da CLT e analisa cada turno em tempo real, alertando sobre violações de intervalos, DSR e limites de jornada antes de a escala ser publicada. O sistema verifica automaticamente todas as regras trabalhistas e previne problemas antes que aconteçam.",
    category: "compliance"
  },
  {
    question: "Isto substitui o meu relógio de ponto?",
    answer: "Não. O GrowthScale é uma ferramenta de planeamento e prevenção. Ele integra-se com sistemas de ponto para comparar o planeado com o realizado, mas não substitui o registo oficial de ponto. O sistema trabalha em conjunto com sua solução atual de ponto.",
    category: "technical"
  },
  {
    question: "A implementação é demorada?",
    answer: "Não. O nosso onboarding guiado permite-lhe configurar a sua empresa e importar os seus funcionários em menos de 30 minutos. O nosso suporte está disponível para o ajudar durante todo o processo de migração.",
    category: "general"
  },
  {
    question: "E se eu me arrepender?",
    answer: "Oferecemos uma política de cancelamento simples e sem burocracia. Você pode cancelar a sua subscrição a qualquer momento, sem multas ou taxas escondidas. Seus dados ficam disponíveis por 30 dias após o cancelamento.",
    category: "pricing"
  },
  {
    question: "O sistema funciona offline?",
    answer: "Sim, o GrowthScale funciona offline para visualização e edição básica de escalas. As sincronizações e validações de compliance acontecem automaticamente quando a conexão é restabelecida.",
    category: "technical"
  },
  {
    question: "Posso integrar com outros sistemas?",
    answer: "Sim, o GrowthScale oferece APIs e integrações com sistemas de ponto, RH e folha de pagamento. Suportamos integrações com os principais sistemas do mercado brasileiro.",
    category: "technical"
  },
  {
    question: "Há limite de escalas que posso criar?",
    answer: "Não há limite no número de escalas. Você pode criar quantas escalas precisar, com quantos funcionários quiser, dentro do limite do seu plano. O sistema é escalável conforme seu negócio cresce.",
    category: "pricing"
  },
  {
    question: "O sistema é seguro e LGPD compliant?",
    answer: "Absolutamente. O GrowthScale é 100% LGPD compliant, com criptografia de ponta a ponta, backups automáticos e certificações de segurança. Seus dados estão protegidos e nunca são compartilhados com terceiros.",
    category: "compliance"
  }
];

export const FAQSectionV2: React.FC<FAQSectionV2Props> = ({ className }) => {
  return (
    <section className={cn("py-20 md:py-28 bg-section-alt", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <HelpCircle className="h-4 w-4" />
              Perguntas Frequentes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo o que você precisa saber
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns sobre o GrowthScale
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-16">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg bg-surface-card px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                        item.category === "compliance" && "bg-success",
                        item.category === "technical" && "bg-accent",
                        item.category === "pricing" && "bg-warning",
                        item.category === "general" && "bg-primary"
                      )} />
                      <span className="font-semibold text-foreground">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="pl-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <div className="bg-surface-card border border-border rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nossa equipe está pronta para ajudar você a implementar o GrowthScale 
                e transformar a gestão de escalas do seu negócio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" className="group">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat ao Vivo
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Email
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar Agora
                </Button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  Resposta em até 2 horas
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  Suporte 24/7
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Implementação gratuita
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
