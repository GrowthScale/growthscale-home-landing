import { Component, ReactNode } from 'react';
import { log } from '@/lib/logger';

type State = { 
  hasError: boolean; 
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

type Props = { 
  children: ReactNode;
  fallback?: (error?: Error, errorInfo?: React.ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log do erro para monitoramento
    log.error('[UI_ERROR_BOUNDARY] Component error caught', {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo: {
        componentStack: errorInfo.componentStack
      }
    });

    // Callback personalizado se fornecido
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined 
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback personalizado
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo);
      }

      // Fallback padrão
      return (
        <div 
          role="alert" 
          className="p-6 rounded-lg bg-red-50 border border-red-200 text-red-700 max-w-md mx-auto mt-8"
          aria-live="polite"
        >
          <div className="flex items-center mb-4">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <h3 className="text-lg font-semibold">Algo deu errado</h3>
          </div>
          
          <p className="mb-4 text-sm">
            Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
          </p>
          
          <div className="flex gap-2">
            <button 
              onClick={this.handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              aria-label="Tentar novamente"
            >
              Tentar novamente
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              aria-label="Recarregar página"
            >
              Recarregar
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 text-xs">
              <summary className="cursor-pointer hover:text-red-800">
                Detalhes do erro (desenvolvimento)
              </summary>
              <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
                {this.state.error.message}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar ErrorBoundary em componentes funcionais
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: React.ErrorInfo) => {
    log.error('[HOOK_ERROR] Error in functional component', {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo
    });
  };

  return { handleError };
};
