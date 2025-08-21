// src/components/FaqSection.tsx
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqSection() {
    return (
        <section className="py-20 md:py-28 bg-secondary" aria-labelledby="faq-title">
            <div className="container mx-auto px-4 max-w-3xl">
                <header className="text-center mb-12">
                    <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-foreground">Respostas claras para as suas dúvidas.</h2>
                </header>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>O GrowthScale substitui um advogado ou contador?</AccordionTrigger>
                        <AccordionContent>Não. O GrowthScale é uma poderosa plataforma de inteligência operacional desenhada para lhe dar clareza sobre as regras da CLT e alertá-lo para potenciais riscos. Ele não fornece aconselhamento jurídico e não substitui a orientação de um profissional qualificado.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>A implementação é demorada?</AccordionTrigger>
                        <AccordionContent>Não. Nosso onboarding guiado permite que você configure sua empresa e importe seus funcionários em menos de 30 minutos. Nosso suporte está disponível para ajudá-lo em cada passo.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Meus dados estão seguros?</AccordionTrigger>
                        <AccordionContent>Sim. A segurança é nossa prioridade máxima. Utilizamos as melhores práticas do mercado, como criptografia de ponta e isolamento de dados por cliente, para garantir que suas informações estejam sempre protegidas.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}