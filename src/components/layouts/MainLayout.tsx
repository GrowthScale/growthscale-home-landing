import React from 'react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import RoleBasedNavigation from '@/components/RoleBasedNavigation';
import { useAccessControl } from '@/hooks/useAccessControl';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { role } = useAccessControl();

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
      icon: 'Bot',
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
      icon: 'Plug',
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
      label: 'Monitoring',
      href: '/monitoring',
      icon: 'Activity',
      roles: ['owner', 'admin'],
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
      <Header />
      <div className="flex flex-1">
        <RoleBasedNavigation items={navigationItems} role={role} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
} 