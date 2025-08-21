// src/components/FinalCtaSection.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export function FinalCtaSection() {
    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
                    Pronto para operar com 100% de segurança e tranquilidade?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Junte-se a centenas de restaurantes que já trocaram o risco das planilhas pela inteligência do GrowthScale.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/auth">Comece de Graça e Veja a Diferença</Link>
                </Button>
            </div>
        </section>
    );
}
