import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { CltAssistantChat } from '@/components/features/CltAssistantChat';

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showPWAInstall?: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showPWAInstall = true,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-background font-body ${className}`}>
      {showHeader && <Header />}
      
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
      
      {showPWAInstall && <PWAInstallPrompt />}
      
      {/* CLT Assistant Chat - Available on all pages */}
      <CltAssistantChat />
    </div>
  );
};

export default MainLayout; 