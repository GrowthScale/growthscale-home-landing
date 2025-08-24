// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface CompanyData {
  name: string;
  employee_count: string;
}

interface CreateCompanyData {
  name: string;
  cnpj: string;
  trade_name?: string;
  description?: string;
  status?: string;
  settings?: any;
}

// Crie esta função no seu service layer (`api.ts`)
const createCompanyForUser = async (userId: string, companyData: CompanyData) => {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);
    
    const companyInsertData: CreateCompanyData = {
        name: companyData.name,
        cnpj: `TEMP-${Date.now()}`, // CNPJ temporário, pode ser atualizado depois
        trade_name: companyData.name,
        description: `Empresa criada automaticamente para ${companyData.name}`,
        status: 'active',
        settings: {
            plan: 'free',
            subscription_status: 'trialing',
            trial_ends_at: trialEndDate.toISOString(),
            employee_count: companyData.employee_count,
            owner_id: userId
        }
    };
    
    const { data, error } = await supabase
        .from('companies')
        .insert(companyInsertData)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Iniciando autenticação...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 AuthCallback: Iniciando processamento...');
        setStatus('Processando código de autenticação...');

        // Pegar o código da URL
        const code = searchParams.get('code');
        if (!code) {
          console.error('❌ AuthCallback: Código não encontrado na URL');
          setStatus('Erro: Código de autenticação não encontrado');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        console.log('🔑 AuthCallback: Código encontrado, trocando por sessão...');
        setStatus('Trocando código por sessão...');

        // Trocar o código por uma sessão
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
          console.error('❌ AuthCallback: Erro ao trocar código:', error);
          setStatus('Erro na autenticação');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        if (!data.session || !data.user) {
          console.error('❌ AuthCallback: Sessão não criada');
          setStatus('Erro: Sessão não criada');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        console.log('✅ AuthCallback: Sessão criada com sucesso');
        setStatus('Sessão criada, verificando dados da empresa...');

        const user = data.user;
        const pendingCompany = user?.user_metadata?.pending_company;

        if (pendingCompany) {
          console.log('🏢 AuthCallback: Criando empresa para usuário...');
          setStatus('Criando sua empresa...');
          
          try {
            // Cria a empresa e limpa os metadados
            await createCompanyForUser(user.id, pendingCompany);
            await supabase.auth.updateUser({ data: { pending_company: null } });
            
            console.log('✅ AuthCallback: Empresa criada, redirecionando para setup');
            setStatus('Empresa criada! Redirecionando...');
            navigate('/dashboard/setup'); // Redireciona para o ONBOARDING
          } catch (error) {
            console.error("❌ AuthCallback: Erro ao criar empresa:", error);
            setStatus('Erro ao criar empresa');
            setTimeout(() => navigate('/auth'), 3000);
          }
        } else {
          console.log('✅ AuthCallback: Usuário já tem empresa, redirecionando para dashboard');
          setStatus('Redirecionando para o dashboard...');
          navigate('/dashboard'); 
        }

      } catch (error) {
        console.error('❌ AuthCallback: Erro geral:', error);
        setStatus('Erro inesperado');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    // Processar imediatamente
    handleAuthCallback();

    // Também escutar mudanças de estado de auth como backup
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 AuthCallback: Evento de auth detectado:', event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('✅ AuthCallback: Usuário assinado via evento');
        subscription.unsubscribe();
        
        const user = session.user;
        const pendingCompany = user?.user_metadata?.pending_company;

        if (pendingCompany) {
          try {
            await createCompanyForUser(user.id, pendingCompany);
            await supabase.auth.updateUser({ data: { pending_company: null } });
            navigate('/dashboard/setup');
          } catch (error) {
            console.error("Erro ao criar empresa no callback:", error);
            navigate('/auth'); 
          }
        } else {
          navigate('/dashboard'); 
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold">Autenticando sua sessão...</h1>
      <p className="text-muted-foreground">{status}</p>
    </div>
  );
}
