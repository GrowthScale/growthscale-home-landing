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

        console.log('🔄 Iniciando processamento do AuthCallback...');
        console.log('📍 URL atual:', window.location.href);
        console.log('🔑 Código:', code);
        console.log('❌ Erro:', error);
        console.log('📝 Descrição do erro:', errorDescription);

        if (error) {
          console.error('❌ Erro de autenticação detectado:', error, errorDescription);
          setStatus('Erro na autenticação. Redirecionando...');
          navigate('/auth?error=' + encodeURIComponent(error), { replace: true });
          return;
        }

        if (!code) {
          console.error('❌ Nenhum código de autenticação encontrado');
          setStatus('Nenhum código encontrado. Redirecionando...');
          navigate('/auth?error=no_code', { replace: true });
          return;
        }

        setStatus('Processando código de autenticação...');
        console.log('🔄 Processando código de autenticação...');

        // Trocar o código por uma sessão
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          console.error('❌ Erro ao trocar código por sessão:', exchangeError);
          setStatus('Erro ao processar código. Redirecionando...');
          navigate('/auth?error=invalid_code', { replace: true });
          return;
        }

        if (!data.session || !data.user) {
          console.error('❌ Sessão inválida após troca de código');
          setStatus('Sessão inválida. Redirecionando...');
          navigate('/auth?error=invalid_session', { replace: true });
          return;
        }

        console.log('✅ Sessão criada com sucesso:', data.user.email);
        setStatus('Verificando dados da empresa...');

        const user = data.user;
        const pendingCompany = user.user_metadata?.pending_company;

        console.log('🏢 Dados pendentes da empresa:', pendingCompany);

        if (pendingCompany) {
          setStatus('Criando sua empresa...');
          console.log('🏢 Criando empresa para usuário:', user.email);
          
          try {
            // Cria a empresa e limpa os metadados
            await createCompanyForUser(user.id, {
              name: pendingCompany.name,
              employeeCount: parseInt(pendingCompany.employee_count) || 10,
              companyEmail: user.email || '',
              fullName: user.user_metadata?.full_name || ''
            });
            
            console.log('✅ Empresa criada com sucesso');
            setStatus('Limpando dados temporários...');
            
            await supabase.auth.updateUser({ 
              data: { pending_company: null } 
            });
            
            console.log('✅ Dados temporários limpos');
            setStatus('Redirecionando para configuração...');
            navigate('/onboarding', { replace: true });
          } catch (error) {
            console.error("❌ Erro ao criar empresa no callback:", error);
            setStatus('Erro ao configurar empresa. Redirecionando...');
            navigate('/auth?error=company_creation_failed', { replace: true });
          }
        } else {
          console.log('✅ Usuário já tem empresa configurada, redirecionando para dashboard');
          setStatus('Redirecionando para o dashboard...');
          navigate('/dashboard', { replace: true });
        }

      } catch (error) {
        console.error('❌ Erro geral no callback:', error);
        setStatus('Erro inesperado. Redirecionando...');
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
