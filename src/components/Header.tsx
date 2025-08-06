import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // Se estamos em uma página diferente, navegar para home primeiro
    if (window.location.pathname !== '/') {
      navigate('/');
      // Aguardar um pouco para a página carregar antes de fazer scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-primary font-roboto">
              GrowthScale
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('recursos')}
              className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Recursos
            </button>
            <button 
              onClick={() => scrollToSection('precos')}
              className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Preços
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Contato
            </button>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-foreground hover:text-primary border-border hover:border-primary/20"
            >
              Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/escalas')}
              className="text-foreground hover:text-primary border-border hover:border-primary/20"
            >
              Escalas
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/funcionarios')}
              className="text-foreground hover:text-primary border-border hover:border-primary/20"
            >
              Funcionários
            </Button>
            <Button 
              variant="default" 
              onClick={() => scrollToSection('contato')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2 shadow-elegant"
            >
              Experimente Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <span className="text-lg font-bold text-primary font-roboto">
                    GrowthScale
                  </span>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <button 
                    onClick={() => {
                      scrollToSection('recursos');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                  >
                    Recursos
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('precos');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                  >
                    Preços
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('contato');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                  >
                    Contato
                  </button>
                </nav>

                <div className="border-t pt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/escalas');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Escalas
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/funcionarios');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Funcionários
                  </Button>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => {
                      scrollToSection('contato');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Experimente Grátis
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;