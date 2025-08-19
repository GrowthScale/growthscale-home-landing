import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading';

interface LoadingScreenProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Carregando...", 
  size = "lg",
  fullScreen = true 
}) => {
  const containerClass = fullScreen 
    ? "min-h-screen flex items-center justify-center bg-background"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="text-center space-y-4">
        <LoadingSpinner size={size} />
        <p className="text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;