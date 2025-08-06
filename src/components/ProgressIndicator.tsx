import React, { useState, useEffect } from 'react';

interface ProgressIndicatorProps {
  className?: string;
  color?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  className = '',
  color = 'hsl(var(--primary))'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-1 bg-border/30 z-50 ${className}`}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso de leitura da página"
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default ProgressIndicator;