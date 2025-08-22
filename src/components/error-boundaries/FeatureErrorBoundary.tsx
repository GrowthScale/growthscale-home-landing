// =====================================================
// FEATURE ERROR BOUNDARY - GROWTHSCALE
// Tratamento de erros em componentes críticos
// =====================================================

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReloadIcon, ExclamationTriangleIcon, BugIcon } from '@radix-ui/react-icons';
import { auditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES, AUDIT_SEVERITY } from '@/lib/auditLog';

interface Props {
  children: ReactNode;
  feature: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showRetry?: boolean;
  showReport?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  isRetrying: boolean;
}

export class FeatureErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log do erro para audit
    auditLogger.log({
      user_id: 'system',
      action: AUDIT_ACTIONS.SYSTEM_ERROR,
      resource_type: AUDIT_RESOURCES.SYSTEM,
      details: {
        feature: this.props.feature,
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      },
      severity: AUDIT_SEVERITY.HIGH
    });

    // Callback customizado
    this.props.onError?.(error, errorInfo);

    // Log para console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Feature Error Boundary caught an error:', {
        feature: this.props.feature,
        error,
        errorInfo
      });
    }
  }

  handleRetry = async () => {
    this.setState({ isRetrying: true });
    
    try {
      // Aguarda um pouco antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        isRetrying: false
      });
    } catch (error) {
      this.setState({ isRetrying: false });
    }
  };

  handleReport = () => {
    const { error, errorInfo } = this.state;
    const { feature } = this.props;
    
    // Em produção, enviar para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Aqui você pode integrar com Sentry, LogRocket, etc.
      if (process.env.NODE_ENV === 'development') { console.log('Error report would be sent to monitoring service:', {
        feature,
        error: error?.message,
        stack: error?.stack,
        componentStack: errorInfo?.componentStack
      }); }
    }
    
    // Log para audit
    auditLogger.log({
      user_id: 'system',
      action: AUDIT_ACTIONS.SYSTEM_ERROR,
      resource_type: AUDIT_RESOURCES.SYSTEM,
      details: {
        feature,
        action: 'error_reported',
        error: error?.message
      },
      severity: AUDIT_SEVERITY.MEDIUM
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback customizado
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <ExclamationTriangleIcon className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Erro no {this.props.feature}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Algo deu errado ao carregar esta funcionalidade
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <BugIcon className="h-4 w-4" />
              <AlertTitle>Erro Técnico</AlertTitle>
              <AlertDescription className="text-xs font-mono">
                {this.state.error?.message || 'Erro desconhecido'}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col space-y-2">
              {this.props.showRetry && (
                <Button
                  onClick={this.handleRetry}
                  disabled={this.state.isRetrying}
                  className="w-full"
                >
                  {this.state.isRetrying ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Tentando novamente...
                    </>
                  ) : (
                    'Tentar Novamente'
                  )}
                </Button>
              )}
              
              {this.props.showReport && (
                <Button
                  variant="outline"
                  onClick={this.handleReport}
                  className="w-full"
                >
                  Reportar Erro
                </Button>
              )}
            </div>

            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                  Detalhes do Erro (Desenvolvimento)
                </summary>
                <pre className="mt-2 text-xs text-muted-foreground bg-muted p-2 rounded overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Hook para usar error boundary em componentes funcionais
export const useErrorBoundary = () => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setError(new Error(event.reason));
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return { hasError, error, resetError: () => setHasError(false) };
};

// Componente wrapper para funcionalidades específicas
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  feature: string,
  options: Omit<Props, 'children'> = {}
) => {
  return (props: P) => (
    <FeatureErrorBoundary feature={feature} {...options}>
      <Component {...props} />
    </FeatureErrorBoundary>
  );
}; 