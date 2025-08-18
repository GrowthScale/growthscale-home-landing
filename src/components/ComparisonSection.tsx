import React from 'react';
import { Check, X } from 'lucide-react';

const comparisonData = [
    { feature: "Validação da CLT em tempo real", growthscale: true, old_way: false },
    { feature: "Simulador de custo instantâneo", growthscale: true, old_way: false },
    { feature: "Sugestão de escala com IA", growthscale: true, old_way: false },
    { feature: "Biblioteca de modelos (12x36, 6x1...)", growthscale: true, old_way: false },
    { feature: "Notificação integrada à equipa", growthscale: true, old_way: false },
    { feature: "Risco oculto de processos trabalhistas", growthscale: false, old_way: true },
    { feature: "Gestão baseada em 'achismo'", growthscale: false, old_way: true },
];

export function ComparisonSection() {
    return (
        <section id="comparacao" className="py-20 md:py-28 bg-muted/30" aria-labelledby="comparison-title">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center mb-12">
                    <h2 id="comparison-title" className="text-3xl md:text-4xl font-bold text-foreground">
                        Chega de operar no escuro.
                    </h2>
                    <p className="text-lg text-muted-foreground mt-4">Veja porque planilhas e sistemas antigos são o maior risco para o seu negócio.</p>
                </header>
                <div className="border border-border rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-background">
                            <tr>
                                <th className="p-4 text-left font-semibold text-foreground">A capacidade de...</th>
                                <th className="p-4 w-40 text-center font-semibold text-foreground">O Jeito Antigo<br/><span className="text-xs font-normal text-muted-foreground">(Planilhas)</span></th>
                                <th className="p-4 w-40 text-center font-semibold text-primary">GrowthScale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((item, index) => (
                                <tr key={index} className="border-t border-border">
                                    <td className="p-4 font-medium">{item.feature}</td>
                                    <td className="p-4 text-center">{item.old_way ? <Check className="mx-auto h-6 w-6 text-destructive/50" /> : <X className="mx-auto h-6 w-6 text-muted-foreground/30" />}</td>
                                    <td className="p-4 text-center bg-primary/5">{item.growthscale ? <Check className="mx-auto h-6 w-6 text-primary" /> : <X className="mx-auto h-6 w-6 text-muted-foreground/30" />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
