import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, Users, Settings, BarChart3, Building2, FileText, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'Empresas', href: '/companies', icon: Building2 },
  { title: 'Funcionários', href: '/employees', icon: Users },
  { title: 'Escalas', href: '/schedules', icon: Calendar },
  { title: 'Templates', href: '/templates', icon: FileText },
  { title: 'Relatórios', href: '/reports', icon: BarChart3 },
  { title: 'CLT Assistant', href: '/clt-assistant', icon: MessageSquare },
  { title: 'Configurações', href: '/settings', icon: Settings },
];

export function MainLayout() {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-muted/40">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-foreground">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">GS</span>
            </div>
            <span className="text-lg font-semibold">GrowthScale</span>
          </NavLink>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid items-start px-4 text-sm font-medium space-y-1">
            {sidebarNavItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent',
                      isActive && 'bg-accent text-foreground font-medium'
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer da Sidebar */}
        <div className="border-t border-border p-4">
          <div className="text-xs text-muted-foreground">
            <p>© 2024 GrowthScale</p>
            <p className="mt-1">v3.7.0</p>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-muted/40 px-6 md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">GS</span>
            </div>
            <h1 className="text-lg font-semibold">GrowthScale</h1>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout; 