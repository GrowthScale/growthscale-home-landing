import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-primary font-roboto">
                GrowthScale
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              A plataforma inteligente de gestão de escalas que transforma 
              a operação do seu food service.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Ver recursos do GrowthScale">Recursos</button></li>
              <li><button onClick={() => document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Ver preços e planos">Preços</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contato</h4>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Entre em contato conosco">Fale Conosco</button></li>
              <li><button onClick={() => document.getElementById('central-ajuda')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Acesse nossa central de ajuda">Central de Ajuda</button></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/politica-de-privacidade" className="hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Ler política de privacidade">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Ler termos de uso">Termos de Uso</Link>
            <Link to="/politica-de-cookies" className="hover:text-primary transition-smooth focus:text-primary focus:underline focus:outline-none" aria-label="Ler política de cookies">Política de Cookies</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 GrowthScale. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;