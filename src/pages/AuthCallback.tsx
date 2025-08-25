// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, AlertCircle, Building } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

// Função para criar empresa para o usuário
const createCompanyForUser = async (userId: string, companyData: any) => {
  console.log('🏢 AuthCallback: Iniciando criação da empresa...');
  console.log('📊 Dados recebidos:', { userId, companyData });

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 14);

  const companyInsertData = {
    name: companyData.name,
    cnpj: `TEMP-${Date.now()}`,
    trade_name: companyData.name,
    description: `Empresa criada automaticamente para ${companyData.name}`,
    status: 'active',
    owner_id: userId,
    plan: 'free',
    subscription_status: 'trialing',
    trial_ends_at: trialEndDate.toISOString(),
    settings: {
      employee_count: companyData.employee_count,
      created_at: new Date().toISOString()
    }
  };

  console.log('📝 Dados para inserção:', companyInsertData);

  const { data, error } = await supabase
    .from('companies')
    .insert(companyInsertData)
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao criar empresa:', error);
    throw error;
  }

  console.log('✅ Empresa criada com sucesso:', data);
  return data;
};

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processando autenticação...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        console.log('🔄 AuthCallback: Iniciando processamento...');
        console.log('🔧 AuthCallback: URL atual:', window.location.href);
        setMessage('Verificando autenticação...');

        // Obter parâmetros da URL
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        console.log('🔧 AuthCallback: Parâmetros da URL:', {
          code: code ? 'presente' : 'ausente',
          error,
          errorDescription
        });

        if (error) {
          console.error('❌ AuthCallback: Erro na URL:', error, errorDescription);
          setStatus('error');
          setMessage(`Erro de autenticação: ${errorDescription || error}`);
          setTimeout(() => {
            navigate('/auth?error=' + encodeURIComponent(errorDescription || error), { replace: true });
          }, 3000);
          return;
        }

        if (!code) {
          console.error('❌ AuthCallback: Nenhum código encontrado');
          setStatus('error');
          setMessage('Código de autenticação não encontrado');
          setTimeout(() => {
            navigate('/auth?error=' + encodeURIComponent('Código de autenticação inválido'), { replace: true });
          }, 3000);
          return;
        }

        console.log('✅ AuthCallback: Código encontrado, processando...');
        setMessage('Validando código de autenticação...');

        // Aguardar um pouco para garantir que o Supabase esteja pronto
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tentar obter a sessão atual primeiro
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          console.log('✅ AuthCallback: Sessão já existe, usando ela...');
          const user = currentSession.user;
          const pendingCompany = user.user_metadata?.pending_company;

          if (pendingCompany) {
            try {
              console.log('🏢 AuthCallback: Criando empresa para usuário...');
              setMessage('Criando sua empresa...');

              await createCompanyForUser(user.id, pendingCompany);
              await supabase.auth.updateUser({ data: { pending_company: null } });
              await supabase.auth.refreshSession();

              console.log('✅ AuthCallback: Empresa criada, redirecionando para setup');
              setStatus('success');
              setMessage('Empresa criada com sucesso! Redirecionando...');

              setTimeout(() => {
                navigate('/dashboard/setup', { replace: true });
              }, 2000);
            } catch (error: any) {
              console.error("❌ AuthCallback: Erro crítico ao criar empresa:", error);
              setStatus('error');
              setMessage(`Erro ao criar empresa: ${error.message}`);
              setTimeout(() => {
                navigate('/auth?error=' + encodeURIComponent('Erro ao configurar empresa'), { replace: true });
              }, 3000);
            }
          } else {
            console.log('✅ AuthCallback: Usuário já tem empresa, redirecionando para dashboard');
            setStatus('success');
            setMessage('Redirecionando para o dashboard...');

            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 2000);
          }
          return;
        }

        // Se não há sessão, tentar trocar o código
        console.log('🔄 AuthCallback: Tentando trocar código por sessão...');
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error('❌ AuthCallback: Erro ao trocar código:', exchangeError);
          setStatus('error');
          setMessage(`Erro na validação: ${exchangeError.message}`);
          setTimeout(() => {
            navigate('/auth?error=' + encodeURIComponent(exchangeError.message), { replace: true });
          }, 3000);
          return;
        }

        if (!data.session?.user) {
          console.error('❌ AuthCallback: Sessão não criada');
          setStatus('error');
          setMessage('Falha ao criar sessão');
          setTimeout(() => {
            navigate('/auth?error=' + encodeURIComponent('Falha ao criar sessão'), { replace: true });
          }, 3000);
          return;
        }

        console.log('✅ AuthCallback: Sessão criada com sucesso');
        console.log('👤 Usuário:', data.session.user);
        console.log('📋 Metadata:', data.session.user.user_metadata);

        const user = data.session.user;
        const pendingCompany = user.user_metadata?.pending_company;

        console.log('🏢 Dados da empresa pendente:', pendingCompany);

        if (pendingCompany) {
          try {
            console.log('🏢 AuthCallback: Criando empresa para usuário...');
            setMessage('Criando sua empresa...');

            // 1. Cria a empresa na base de dados
            await createCompanyForUser(user.id, pendingCompany);

            // 2. Limpa os metadados para não executar esta lógica novamente
            await supabase.auth.updateUser({ data: { pending_company: null } });

            // 3. Força um refresh da sessão para garantir que todos os contextos sejam atualizados
            await supabase.auth.refreshSession();

            // 4. Adiciona um delay para permitir que o contexto se atualize
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('✅ AuthCallback: Empresa criada, redirecionando para setup');
            setStatus('success');
            setMessage('Empresa criada com sucesso! Redirecionando...');

            setTimeout(() => {
              navigate('/dashboard/setup', { replace: true });
            }, 2000);

          } catch (error: any) {
            console.error("❌ AuthCallback: Erro crítico ao criar empresa:", error);
            setStatus('error');
            setMessage(`Erro ao criar empresa: ${error.message}`);
            setTimeout(() => {
              navigate('/auth?error=' + encodeURIComponent('Erro ao configurar empresa'), { replace: true });
            }, 3000);
          }
        } else {
          console.log('✅ AuthCallback: Usuário já tem empresa, redirecionando para dashboard');
          setStatus('success');
          setMessage('Redirecionando para o dashboard...');

          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        }

      } catch (error: any) {
        console.error('❌ AuthCallback: Erro geral:', error);
        setStatus('error');
        setMessage(`Erro inesperado: ${error.message}`);
        setTimeout(() => {
          navigate('/auth?error=' + encodeURIComponent('Erro inesperado'), { replace: true });
        }, 3000);
      }
    };

    // Adiciona um pequeno delay para garantir que a sessão do Supabase seja estabelecida
    const timer = setTimeout(processCallback, 500);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <>
      <SEOHead
        title="Autenticando - GrowthScale"
        description="Processando sua autenticação"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">GrowthScale</h1>
            <p className="text-muted-foreground">Processando autenticação</p>
          </div>

          {/* Status Card */}
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-xl border">
            {status === 'loading' && (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Processando...</h2>
                <p className="text-muted-foreground">{message}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-green-600">Sucesso!</h2>
                <p className="text-muted-foreground">{message}</p>
              </>
            )}

            {status === 'error' && (
              <>
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-red-600">Erro</h2>
                <p className="text-muted-foreground">{message}</p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-sm text-muted-foreground">
            <p>© 2024 GrowthScale. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </>
  );
}
