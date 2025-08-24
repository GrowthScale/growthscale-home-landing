// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface CompanyData {
  name: string;
  employee_count: string;
}

const createCompanyForUser = async (userId: string, companyData: CompanyData) => {
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
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Iniciando autenticação...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 AuthCallback: Iniciando processamento...');
        setStatus('Processando código de autenticação...');

        const code = searchParams.get('code');
        if (!code) {
          console.error('❌ AuthCallback: Código não encontrado na URL');
          setStatus('Erro: Código de autenticação não encontrado');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        console.log('🔑 AuthCallback: Código encontrado, trocando por sessão...');
        setStatus('Trocando código por sessão...');

        // Usar o método correto para trocar o código por sessão
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
        console.log('👤 Usuário:', data.user);
        console.log('📋 Metadata:', data.user.user_metadata);
        setStatus('Sessão criada, verificando dados da empresa...');

        const user = data.user;
        const pendingCompany = user?.user_metadata?.pending_company;

        console.log('🏢 Dados da empresa pendente:', pendingCompany);

        if (pendingCompany) {
          console.log('🏢 AuthCallback: Criando empresa para usuário...');
          setStatus('Criando sua empresa...');
          
          try {
            await createCompanyForUser(user.id, pendingCompany);
            await supabase.auth.updateUser({ data: { pending_company: null } });
            
            console.log('✅ AuthCallback: Empresa criada, redirecionando para setup');
            setStatus('Empresa criada! Redirecionando...');
            navigate('/dashboard/setup');
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

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold">Autenticando sua sessão...</h1>
      <p className="text-muted-foreground">{status}</p>
    </div>
  );
}
