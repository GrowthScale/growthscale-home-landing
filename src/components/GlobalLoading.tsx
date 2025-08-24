// src/components/GlobalLoading.tsx
import React from 'react';

interface GlobalLoadingProps {
  message?: string;
  showSpinner?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'fullscreen';
}

export const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  message = 'Carregando...',
  showSpinner = true,
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const Spinner = () => (
    <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
  );

  const MinimalSpinner = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4">
        <MinimalSpinner />
        {message && <span className="ml-2 text-sm text-muted-foreground">{message}</span>}
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {showSpinner && <Spinner />}
          {message && (
            <h2 className="text-xl font-semibold mt-4 mb-2">{message}</h2>
          )}
          <p className="text-muted-foreground">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {showSpinner && <Spinner />}
        {message && (
          <h2 className="text-xl font-semibold mt-4 mb-2">{message}</h2>
        )}
        <p className="text-muted-foreground">Aguarde um momento</p>
      </div>
    </div>
  );
};

// Componentes específicos para diferentes contextos
export const AuthLoading: React.FC = () => (
  <GlobalLoading 
    message="Verificando autenticação..." 
    variant="fullscreen"
  />
);

export const OnboardingLoading: React.FC = () => (
  <GlobalLoading 
    message="Configurando sua empresa..." 
    variant="fullscreen"
  />
);

export const PageLoading: React.FC = () => (
  <GlobalLoading 
    message="Carregando página..." 
    variant="default"
  />
);

export const InlineLoading: React.FC<{ message?: string }> = ({ message }) => (
  <GlobalLoading 
    message={message} 
    variant="minimal"
  />
);
