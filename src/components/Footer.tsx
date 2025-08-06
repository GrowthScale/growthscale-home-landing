import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
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
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                📧
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                📱
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                💼
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#recursos" className="text-muted-foreground hover:text-primary transition-colors">Recursos</a></li>
              <li><a href="#precos" className="text-muted-foreground hover:text-primary transition-colors">Preços</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Integrações</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre nós</a></li>
              <li><a href="#casos" className="text-muted-foreground hover:text-primary transition-colors">Casos de Sucesso</a></li>
              <li><a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Carreira</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentação</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Cookies</a>
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