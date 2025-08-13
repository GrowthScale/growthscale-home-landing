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
        <section className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="comparison-title">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16 sm:mb-20">
                    <h2 id="comparison-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Chega de operar no escuro.
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Veja por que planilhas e sistemas antigos são o maior risco para o seu negócio.
                    </p>
                </header>
                
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-6 text-left font-bold text-slate-900 text-lg">Funcionalidade</th>
                                    <th className="p-6 w-48 text-center font-bold text-slate-900 text-lg">
                                        O Jeito Antigo
                                        <br/>
                                        <span className="text-sm font-normal text-slate-600">(Planilhas / Sistemas Genéricos)</span>
                                    </th>
                                    <th className="p-6 w-48 text-center font-bold text-blue-600 text-lg border-l border-slate-200">
                                        GrowthScale
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((item, index) => (
                                    <tr key={index} className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                                        <td className="p-6 font-semibold text-slate-900">{item.feature}</td>
                                        <td className="p-6 text-center">
                                            {item.old_way ? 
                                                <Check className="mx-auto h-8 w-8 text-red-500" /> : 
                                                <X className="mx-auto h-8 w-8 text-slate-300" />
                                            }
                                        </td>
                                        <td className="p-6 text-center bg-blue-50 border-l border-slate-200">
                                            {item.growthscale ? 
                                                <Check className="mx-auto h-8 w-8 text-blue-600" /> : 
                                                <X className="mx-auto h-8 w-8 text-slate-300" />
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ComparisonSection;
