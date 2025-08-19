import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface NavigationItem {
  label: string;
  sectionId: string;
  description?: string;
}

interface AccessibleNavigationProps {
  items: NavigationItem[];
  className?: string;
  variant?: 'header' | 'footer' | 'mobile';
}

const AccessibleNavigation: React.FC<AccessibleNavigationProps> = ({ 
  items, 
  className = '', 
  variant = 'header' 
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Focus the section for screen readers
      element.setAttribute('tabindex', '-1');
      element.focus();
      
      // Announce to screen readers
      const announcement = `Navegando para a seção ${items.find(item => item.sectionId === sectionId)?.label}`;
      const ariaLive = document.createElement('div');
      ariaLive.setAttribute('aria-live', 'polite');
      ariaLive.setAttribute('aria-atomic', 'true');
      ariaLive.style.position = 'absolute';
      ariaLive.style.left = '-10000px';
      ariaLive.style.width = '1px';
      ariaLive.style.height = '1px';
      ariaLive.style.overflow = 'hidden';
      ariaLive.textContent = announcement;
      document.body.appendChild(ariaLive);
      
      setTimeout(() => {
        document.body.removeChild(ariaLive);
        element.removeAttribute('tabindex');
      }, 1000);
    }
  };

  const baseButtonClass = variant === 'mobile' 
    ? "w-full justify-start text-left" 
    : "";

  return (
    <nav className={className} role="navigation" aria-label="Navegação principal">
      <ul className={variant === 'mobile' ? "space-y-2" : "flex space-x-6"}>
        {items.map((item) => (
          <li key={item.sectionId}>
            <Button
              variant="ghost"
              onClick={() => scrollToSection(item.sectionId)}
              className={`${baseButtonClass} text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded`}
              aria-describedby={item.description ? `desc-${item.sectionId}` : undefined}
            >
              {item.label}
              {variant === 'mobile' && <ChevronDown className="ml-auto h-4 w-4" />}
            </Button>
            {item.description && (
              <span 
                id={`desc-${item.sectionId}`}
                className="sr-only"
              >
                {item.description}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccessibleNavigation;