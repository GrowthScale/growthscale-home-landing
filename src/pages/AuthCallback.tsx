import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processando confirmação...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extrair parâmetros da URL
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(`Erro na confirmação: ${errorDescription || error}`);
          return;
        }

        if (accessToken && refreshToken) {
          // Definir a sessão manualmente
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            setStatus('error');
            setMessage(`Erro ao configurar sessão: ${sessionError.message}`);
            return;
          }

          if (data.session) {
            setStatus('success');
            setMessage('Email confirmado com sucesso! Redirecionando para login...');
            
            // IMPORTANTE: Redirecionar para a página de login, não para o dashboard
            setTimeout(() => {
              navigate('/auth', { 
                state: { 
                  message: 'Email confirmado com sucesso! Faça login para continuar.',
                  type: 'success'
                }
              });
            }, 2000);
          } else {
            setStatus('error');
            setMessage('Não foi possível confirmar o email. Tente novamente.');
          }
        } else {
          setStatus('error');
          setMessage('Link de confirmação inválido.');
        }
      } catch (error) {
        console.error('Erro no callback de autenticação:', error);
        setStatus('error');
        setMessage('Erro inesperado. Tente novamente.');
      }
    };

    handleAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status === 'loading' && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            )}
            
            {status === 'success' && (
              <div className="text-green-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            
            {status === 'error' && (
              <div className="text-red-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {status === 'loading' && 'Confirmando Email...'}
              {status === 'success' && 'Email Confirmado!'}
              {status === 'error' && 'Erro na Confirmação'}
            </h2>
            
            <p className="text-muted-foreground mb-6">{message}</p>
            
            {status === 'error' && (
              <button
                onClick={() => navigate('/auth')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Voltar para Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
