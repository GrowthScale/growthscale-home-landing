// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { createCompanyForUser } from '@/services/api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<string>('Verificando sua conta...');

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          console.error('Erro de autenticação:', error, errorDescription);
          navigate('/auth?error=' + encodeURIComponent(error), { replace: true });
          return;
        }

        if (!code) {
          console.error('Nenhum código de autenticação encontrado');
          navigate('/auth?error=no_code', { replace: true });
          return;
        }

        setStatus('Processando código de autenticação...');

        // Trocar o código por uma sessão
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          console.error('Erro ao trocar código por sessão:', exchangeError);
          navigate('/auth?error=invalid_code', { replace: true });
          return;
        }

        if (!data.session || !data.user) {
          console.error('Sessão inválida após troca de código');
          navigate('/auth?error=invalid_session', { replace: true });
          return;
        }

        setStatus('Verificando dados da empresa...');

        const user = data.user;
        const pendingCompany = user.user_metadata?.pending_company;

        if (pendingCompany) {
          setStatus('Criando sua empresa...');
          
          try {
            // Cria a empresa e limpa os metadados
            await createCompanyForUser(user.id, {
              name: pendingCompany.name,
              employeeCount: parseInt(pendingCompany.employee_count) || 10,
              companyEmail: user.email || '',
              fullName: user.user_metadata?.full_name || ''
            });
            
            setStatus('Limpando dados temporários...');
            
            await supabase.auth.updateUser({ 
              data: { pending_company: null } 
            });
            
            setStatus('Redirecionando para configuração...');
            navigate('/onboarding', { replace: true });
          } catch (error) {
            console.error("Erro ao criar empresa no callback:", error);
            navigate('/auth?error=company_creation_failed', { replace: true });
          }
        } else {
          setStatus('Redirecionando para o dashboard...');
          navigate('/dashboard', { replace: true });
        }

      } catch (error) {
        console.error('Erro geral no callback:', error);
        navigate('/auth?error=callback_error', { replace: true });
      }
    };

    processAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Verificando sua conta...</h2>
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}
