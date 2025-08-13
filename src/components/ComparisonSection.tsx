import { Check, X } from 'lucide-react';

const comparisonData = [
    { feature: "Validação da CLT em tempo real", growthscale: true, old_way: false },
    { feature: "Simulador de custo instantâneo", growthscale: true, old_way: false },
    { feature: "Sugestão de escala com IA", growthscale: true, old_way: false },
    { feature: "Biblioteca de modelos prontos (12x36, 6x1...)", growthscale: true, old_way: false },
    { feature: "Placar de Equidade na distribuição", growthscale: true, old_way: false },
    { feature: "Comunicação e notificação integradas", growthscale: true, old_way: false },
    { feature: "Criação manual e propensa a erros", growthscale: false, old_way: true },
    { feature: "Risco oculto de processos trabalhistas", growthscale: false, old_way: true },
    { feature: "Gestão baseada em 'achismo'", growthscale: false, old_way: true },
];

export function ComparisonSection() {
    return (
        <section className="py-xl bg-background" aria-labelledby="comparison-title">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h2 id="comparison-title" className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
                        Chega de operar no escuro.
                    </h2>
                    <p className="text-xl text-muted-foreground mt-4">Veja por que planilhas e sistemas antigos são o maior risco para o seu negócio.</p>
                </header>
                <div className="border border-border rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-4 text-left font-semibold text-foreground">Funcionalidade</th>
                                <th className="p-4 w-40 text-center font-semibold text-foreground">O Jeito Antigo<br/><span className="text-xs font-normal text-muted-foreground">(Planilhas / Sistemas Genéricos)</span></th>
                                <th className="p-4 w-40 text-center font-semibold text-primary border-l border-border">GrowthScale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((item, index) => (
                                <tr key={index} className="border-t border-border">
                                    <td className="p-4 font-medium">{item.feature}</td>
                                    <td className="p-4 text-center">{item.old_way ? <Check className="mx-auto h-6 w-6 text-destructive" /> : <X className="mx-auto h-6 w-6 text-muted-foreground/50" />}</td>
                                    <td className="p-4 text-center bg-primary/5 border-l border-border">{item.growthscale ? <Check className="mx-auto h-6 w-6 text-primary" /> : <X className="mx-auto h-6 w-6 text-muted-foreground/50" />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default ComparisonSection;
