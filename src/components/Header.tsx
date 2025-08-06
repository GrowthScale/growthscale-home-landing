import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-primary font-roboto">
              GrowthScale
            </span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-foreground hover:text-primary transition-colors font-medium">
              Recursos
            </a>
            <a href="#precos" className="text-foreground hover:text-primary transition-colors font-medium">
              Preços
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            variant="default" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2 shadow-elegant"
          >
            Experimente Grátis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;