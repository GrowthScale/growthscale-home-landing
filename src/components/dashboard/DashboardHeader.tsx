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
import { useState } from "react";

const DashboardHeader = () => {
  const [notifications] = useState(3);

  return (
    <header className="w-full bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary font-roboto">
                  GrowthScale
                </span>
                <div className="text-xs text-muted-foreground">Dashboard</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                <Calendar className="h-4 w-4 mr-2" />
                Escalas
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                <Users className="h-4 w-4 mr-2" />
                Funcionários
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                <Shield className="h-4 w-4 mr-2" />
                Compliance
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Welcome Message */}
            <div className="hidden lg:block text-right">
              <div className="text-sm font-medium text-foreground">Bem-vindo!</div>
              <div className="text-xs text-muted-foreground">João Silva</div>
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-accent/10 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="João Silva" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JS
                </AvatarFallback>
              </Avatar>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;