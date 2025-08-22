import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { createCompanyForUser } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extrair parâmetros da URL
        const urlParams = new URLSearchParams(location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        // Se há erro na URL
        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Erro na autenticação');
          return;
        }

        // Se há tokens na URL, processar a sessão
        if (accessToken && refreshToken) {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            setStatus('error');
            setMessage('Erro ao processar a sessão de autenticação');
            return;
          }

          if (data.session) {
            // Verificar se é um novo usuário que precisa criar empresa
            const pendingCompany = data.session.user.user_metadata?.pending_company;
            
            if (pendingCompany) {
              setMessage('Criando sua empresa...');
              
              try {
                // Criar a empresa para o usuário confirmado
                await createCompanyForUser(data.session.user.id, pendingCompany);
                
                // Limpar os dados pendentes dos metadados
                await supabase.auth.updateUser({
                  data: { pending_company: null }
                });
                
                setStatus('success');
                setMessage('Email confirmado e empresa criada com sucesso! Redirecionando para o dashboard...');
                
                // MELHORIA: Redirecionamento inteligente
                setTimeout(() => {
                  navigate('/dashboard');
                }, 2000);
              } catch (companyError) {
                console.error('Erro ao criar empresa:', companyError);
                setStatus('error');
                setMessage('Email confirmado, mas houve um erro ao criar sua empresa. Entre em contato com o suporte.');
                return;
              }
            } else {
              setStatus('success');
              setMessage('Email confirmado com sucesso! Redirecionando para o dashboard...');
              
              // MELHORIA: Redirecionamento inteligente
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
            }
          } else {
            setStatus('error');
            setMessage('Sessão inválida');
          }
        } else {
          // Se não há tokens, verificar se o usuário já está autenticado
          if (user) {
            setStatus('success');
            setMessage('Você já está autenticado! Redirecionando para o dashboard...');
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          } else {
            setStatus('error');
            setMessage('Link de confirmação inválido ou expirado');
          }
        }
      } catch (error) {
        console.error('Erro no callback de autenticação:', error);
        setStatus('error');
        setMessage('Erro inesperado durante a autenticação');
      }
    };

    handleAuthCallback();
  }, [location, navigate, user]);

  const handleRetry = () => {
    setStatus('loading');
    setMessage('');
    // Recarregar a página para tentar novamente
    window.location.reload();
  };

  const handleGoToLogin = () => {
    navigate('/auth');
  };

  const handleGoToDashboard = () => {
    navigate('/?confirmed=true');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === 'loading' && (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
            {status === 'error' && (
              <XCircle className="h-12 w-12 text-red-500" />
            )}
          </div>
          <CardTitle>
            {status === 'loading' && 'Processando...'}
            {status === 'success' && 'Confirmação Realizada!'}
            {status === 'error' && 'Erro na Confirmação'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>
          
          {status === 'loading' && (
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>Verificando sua confirmação...</span>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <Button onClick={handleRetry} className="w-full">
                Tentar Novamente
              </Button>
              <Button onClick={handleGoToLogin} variant="outline" className="w-full">
                Ir para Login
              </Button>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-3">
              <Button onClick={handleGoToDashboard} className="w-full">
                Ir para Página Inicial
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
