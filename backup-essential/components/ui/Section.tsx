import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  container?: boolean;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({
  children,
  className = '',
  id,
  title,
  subtitle,
  container = true,
  spacing = 'lg'
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  };

  return (
    <section 
      id={id}
      className={cn(
        spacingClasses[spacing],
        className
      )}
    >
      {container && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      )}
      {!container && children}
    </section>
  );
}
