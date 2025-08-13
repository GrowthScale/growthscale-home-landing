import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contato" className="py-xl bg-background">
      <div className="max-w-4xl mx-auto text-center px-4">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
          Pronto para operar com 100% de segurança e tranquilidade?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Junte-se a centenas de restaurantes que já trocaram o risco das planilhas pela inteligência do GrowthScale.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
          Comece de Graça e Veja a Diferença
        </Button>
      </div>
    </section>
  );
};

export default CTASection;