import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  className?: string;
  threshold?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  className,
  threshold = 300 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="outline"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-elegant bg-background/90 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-300",
        className
      )}
      aria-label="Voltar ao topo da página"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
};

export default ScrollToTop;