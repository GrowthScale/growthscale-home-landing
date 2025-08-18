import React from 'react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, breadcrumbs, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className}`}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="container mx-auto px-6 pt-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;