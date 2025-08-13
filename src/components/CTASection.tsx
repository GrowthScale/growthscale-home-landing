import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <ShieldCheck className="h-16 w-16 text-white mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Pronto para operar com 100% de segurança e tranquilidade?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
          Junte-se a centenas de restaurantes que já trocaram o risco das planilhas pela inteligência do GrowthScale.
        </p>
        <Button 
          size="lg" 
          className="bg-white hover:bg-gray-100 text-blue-600 text-lg sm:text-xl px-10 py-6 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Comece de Graça e Veja a Diferença
        </Button>
      </div>
    </section>
  );
};

export default CTASection;