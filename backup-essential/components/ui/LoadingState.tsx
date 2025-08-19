import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSpinner?: boolean;
}

const LoadingState = React.memo<LoadingStateProps>(({
  message = 'Carregando...',
  size = 'md',
  className = '',
  showSpinner = true
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const spinnerSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${sizeClasses[size]} ${className}`}>
      {showSpinner && (
        <RefreshCw className={`${spinnerSizes[size]} animate-spin text-muted-foreground`} />
      )}
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';

export { LoadingState };
