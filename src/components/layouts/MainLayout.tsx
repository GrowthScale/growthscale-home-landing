import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import RoleBasedNavigation from '@/components/RoleBasedNavigation';
import { useAccessControl } from '@/hooks/useAccessControl';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  Settings,
  FileText,
  MessageSquare,
  Shield,
  Brain,
  BarChart3,
  Zap,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
} from 'lucide-react';

export function MainLayout() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { role } = useAccessControl();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['owner', 'admin', 'manager', 'employee'],
    },
    {
      label: 'Escalas',
      href: '/schedules',
      icon: 'Calendar',
      roles: ['owner', 'admin', 'manager'],
    },
    {
      label: 'Funcionários',
      href: '/employees',
      icon: 'Users',
      roles: ['owner', 'admin', 'manager'],
    },
    {
      label: 'Empresas',
      href: '/companies',
      icon: 'Building2',
      roles: ['owner', 'admin'],
    },
    {
      label: 'Assistente CLT',
      href: '/clt-assistant',
      icon: 'MessageSquare',
      roles: ['owner', 'admin', 'manager'],
    },
    {
      label: 'Templates',
      href: '/templates',
      icon: 'FileText',
      roles: ['owner', 'admin', 'manager'],
    },
    {
      label: 'Integrações',
      href: '/integrations',
      icon: 'Zap',
      roles: ['owner', 'admin'],
    },
    {
      label: 'Compliance',
      href: '/compliance',
      icon: 'Shield',
      roles: ['owner', 'admin', 'manager'],
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: 'BarChart3',
      roles: ['owner', 'admin'],
    },
    {
      label: 'Security',
      href: '/security',
      icon: 'Shield',
      roles: ['owner', 'admin'],
    },
    {
      label: 'AI Intelligence',
      href: '/ai',
      icon: 'Brain',
      roles: ['owner', 'admin', 'manager'],
    },
    {
      label: 'Configurações',
      href: '/settings',
      icon: 'Settings',
      roles: ['owner', 'admin', 'manager'],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">GrowthScale</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems
                  .filter(item => item.roles.includes(role))
                  .map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                            location.pathname === item.href ? 'bg-accent/50' : ''
                          }`}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* User Menu & Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <Badge variant="secondary" className="w-fit">
                      {role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navigationItems
                  .filter(item => item.roles.includes(role))
                  .map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 