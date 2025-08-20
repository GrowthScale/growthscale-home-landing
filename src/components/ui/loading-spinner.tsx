import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ 
  message = "Carregando...", 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-80">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
          <p className="text-sm text-muted-foreground text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
