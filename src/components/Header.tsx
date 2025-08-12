import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, LogOut, User, Settings, CreditCard } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAccessControl } from "@/hooks/useAccessControl";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { can } = useAccessControl();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || "Usuário";
  };

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
            {user ? (
              <>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/funcionarios')}
                  className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Funcionários
                </button>
                <button 
                  onClick={() => navigate('/escalas')}
                  className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Escalas
                </button>
                <button 
                  onClick={() => navigate('/compliance')}
                  className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Compliance
                </button>
                {can('view:billing') && (
                  <button 
                    onClick={() => navigate('/faturamento')}
                    className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    Faturamento
                  </button>
                )}
                {can('manage:company_settings') && (
                  <Button variant="ghost" size="sm" onClick={() => navigate('/configuracoes-empresa')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações da Empresa
                  </Button>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(getUserDisplayName())}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/configuracoes")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  {can('view:billing') && (
                    <DropdownMenuItem onClick={() => navigate("/faturamento")}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Faturamento</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/configuracoes")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="text-foreground hover:text-primary"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2 shadow-elegant"
                >
                  Começar Grátis
                </Button>
              </>
            )}
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
                  {user ? (
                    <>
                      <button 
                        onClick={() => {
                          navigate('/dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/funcionarios');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                      >
                        Funcionários
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/escalas');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                      >
                        Escalas
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/compliance');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                      >
                        Compliance
                      </button>
                      {can('view:billing') && (
                        <button 
                          onClick={() => {
                            navigate('/faturamento');
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted"
                        >
                          Faturamento
                        </button>
                      )}
                      {can('manage:company_settings') && (
                        <button 
                          onClick={() => {
                            navigate('/configuracoes-empresa');
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-left text-foreground hover:text-primary transition-colors font-medium p-2 rounded hover:bg-muted flex items-center"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Configurações da Empresa
                        </button>
                      )}
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </nav>

                {/* Mobile Auth Section */}
                <div className="border-t pt-6 space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 mb-4 p-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getUserInitials(getUserDisplayName())}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-foreground font-medium">{getUserDisplayName()}</p>
                          <p className="text-muted-foreground text-sm">{user.email}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          navigate('/configuracoes');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          navigate('/login');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => {
                          navigate('/login');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Começar Grátis
                      </Button>
                    </>
                  )}
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