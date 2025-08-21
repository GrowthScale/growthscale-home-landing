import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function TestimonialsSection() {
    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                    Não acredite apenas na nossa palavra.
                </h2>
                <Card className="p-8 text-center shadow-lg bg-secondary">
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-foreground">
                        "O GrowthScale devolveu-me as minhas noites de domingo. A paz de saber que a escala está 100% correta e que a equipe foi notificada não tem preço. Mudou o jogo para nós."
                    </blockquote>
                    <footer className="mt-6">
                        <p className="font-semibold">Joana Silva</p>
                        <p className="text-muted-foreground">Dona, Bistrô Sabor & Arte</p>
                    </footer>
                </Card>
            </div>
        </section>
    );
}