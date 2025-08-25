// src/pages/AuthCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Função para criar empresa para o usuário
const createCompanyForUser = async (userId: string, companyData: any) => {
    console.log('🏢 createCompanyForUser: Iniciando criação da empresa...');
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

  useEffect(() => {
    const processCallback = async () => {
      try {
        console.log('🔄 AuthCallback: Iniciando processamento...');
        
        // O Supabase já lida com a troca do código pela sessão automaticamente no background
        // quando o AuthProvider é inicializado. O nosso trabalho aqui é garantir que a lógica
        // de criação da empresa seja executada no momento certo.

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('❌ AuthCallback: Erro ao obter sessão:', error);
          navigate('/auth?error=session_failed', { replace: true });
          return;
        }

        if (!session?.user) {
          console.error('❌ AuthCallback: Sessão não encontrada');
          navigate('/auth?error=session_failed', { replace: true });
          return;
        }

        console.log('✅ AuthCallback: Sessão obtida com sucesso');
        console.log('👤 Usuário:', session.user);
        console.log('📋 Metadata:', session.user.user_metadata);

        const user = session.user;
        const pendingCompany = user.user_metadata?.pending_company;

        console.log('🏢 Dados da empresa pendente:', pendingCompany);

        if (pendingCompany) {
          try {
            console.log('🏢 AuthCallback: Criando empresa para usuário...');
            
            // 1. Cria a empresa na base de dados
            await createCompanyForUser(user.id, pendingCompany);
            
            // 2. Limpa os metadados para não executar esta lógica novamente
            await supabase.auth.updateUser({ data: { pending_company: null } });

            // 3. Força um refresh da sessão para garantir que todos os contextos sejam atualizados
            await supabase.auth.refreshSession();

            // 4. Adiciona um delay para permitir que o contexto se atualize
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('✅ AuthCallback: Empresa criada, redirecionando para setup');
            navigate('/dashboard/setup', { replace: true });

          } catch (error) {
            console.error("❌ AuthCallback: Erro crítico ao criar empresa:", error);
            // Em caso de erro, envie o usuário de volta para o login com uma mensagem de erro
            navigate('/auth?error=setup_failed', { replace: true });
          }
        } else {
          console.log('✅ AuthCallback: Usuário já tem empresa, redirecionando para dashboard');
          // Se não há empresa pendente, o usuário é antigo. Vai para o dashboard.
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('❌ AuthCallback: Erro geral:', error);
        navigate('/auth?error=unexpected_error', { replace: true });
      }
    };
    
    // Adiciona um pequeno delay para garantir que a sessão do Supabase seja estabelecida
    const timer = setTimeout(processCallback, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold">A finalizar a sua configuração...</h1>
      <p className="text-muted-foreground">Estamos a preparar o seu ambiente. Será redirecionado em breve.</p>
    </div>
  );
}
