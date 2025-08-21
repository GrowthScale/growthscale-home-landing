// src/components/PricingSection.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function PricingSection() {
    return (
        <section id="precos" className="py-20 md:py-28 bg-secondary" aria-labelledby="pricing-title">
            <div className="container mx-auto px-4">
                <header className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground">Um plano para cada tamanho de ambição.</h2>
                    <p className="text-lg text-muted-foreground mt-4">Comece de graça e cresça sem medo. Sem taxas escondidas, sem surpresas.</p>
                </header>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="flex flex-col"><CardHeader><CardTitle>Free</CardTitle><CardDescription>Para equipes pequenas começando.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$0</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 5 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Criação de escalas básica</li></ul></CardContent><Button asChild variant="outline" className="m-6"><Link to="/auth">Começar de Graça</Link></Button></Card>
                    <Card className="flex flex-col border-primary ring-2 ring-primary"><CardHeader><div className="flex justify-between items-center"><CardTitle>Business</CardTitle><Badge className="bg-accent text-accent-foreground">Mais Popular</Badge></div><CardDescription>Para operações que precisam de poder total.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">R$97<span className="text-sm font-normal text-muted-foreground">/mês</span></p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Até 25 funcionários</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Sugestões de Escala com IA</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Alertas de Risco CLT</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Simulador de Custos</li></ul></CardContent><Button asChild className="m-6"><Link to="/auth">Escolher Business</Link></Button></Card>
                    <Card className="flex flex-col"><CardHeader><CardTitle>Enterprise</CardTitle><CardDescription>Para redes e grandes operações.</CardDescription></CardHeader><CardContent className="flex-1 space-y-4"><p className="text-4xl font-bold">Contato</p><ul className="space-y-2 text-muted-foreground"><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Funcionários ilimitados</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Múltiplas filiais</li><li><Check className="inline-block mr-2 h-4 w-4 text-primary" />Suporte dedicado</li></ul></CardContent><Button asChild variant="outline" className="m-6"><Link to="/contact">Agendar Demonstração</Link></Button></Card>
                </div>
            </div>
        </section>
    );
}