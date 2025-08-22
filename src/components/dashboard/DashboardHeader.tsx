import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Settings, 
  User, 
  Calendar, 
  Users, 
  Shield, 
  Menu
} from "lucide-react";
import { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = memo(() => {
  const [notifications] = useState(3);
  const navigate = useNavigate();

  // CORREÇÃO: Rotas corrigidas para usar prefixo /dashboard
  const navigateToSchedules = useCallback(() => {
    navigate('/dashboard/schedules');
  }, [navigate]);

  const navigateToEmployees = useCallback(() => {
    navigate('/dashboard/employees');
  }, [navigate]);

  const navigateToCompliance = useCallback(() => {
    navigate('/dashboard/compliance');
  }, [navigate]);

  return (
    <header 
      className="w-full bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-soft"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-spacing-sm sm:px-spacing-md lg:px-spacing-lg">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-spacing-md">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover-scale"
                role="img"
                aria-label="Logo do GrowthScale"
              >
                <span className="text-white font-bold text-xl" aria-hidden="true">G</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary font-body">
                  GrowthScale
                </span>
                <div className="text-xs text-muted-foreground">Dashboard</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Menu principal">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary hover-scale"
                onClick={navigateToSchedules}
                aria-label="Ir para página de escalas"
              >
                <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                Escalas
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary hover-scale"
                onClick={navigateToEmployees}
                aria-label="Ir para página de funcionários"
              >
                <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                Funcionários
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary hover-scale"
                onClick={navigateToCompliance}
                aria-label="Ir para página de compliance"
              >
                <Shield className="h-4 w-4 mr-2" aria-hidden="true" />
                Compliance
              </Button>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-spacing-sm">
            {/* Welcome Message */}
            <div className="hidden lg:block text-right">
              <div className="text-sm font-medium text-foreground">Bem-vindo!</div>
              <div className="text-xs text-muted-foreground">João Silva</div>
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-accent/10 transition-colors hover-scale"
              aria-label={`Notificações ${notifications > 0 ? `(${notifications} não lidas)` : ''}`}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
                  aria-label={`${notifications} notificações não lidas`}
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 hover-scale">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Foto de perfil de João Silva" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JS
                </AvatarFallback>
              </Avatar>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden hover-scale"
                aria-label="Abrir menu de navegação"
                aria-expanded="false"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;