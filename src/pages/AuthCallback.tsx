// src/pages/AuthCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe();
        
        const user = session.user;
        const pendingCompany = user?.user_metadata?.pending_company;

        if (pendingCompany) {
          try {
            // Cria a empresa e limpa os metadados
            await createCompanyForUser(user.id, pendingCompany);
            await supabase.auth.updateUser({ data: { pending_company: null } });
            navigate('/dashboard/setup'); // Redireciona para o ONBOARDING
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
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold">Autenticando sua sessão...</h1>
      <p className="text-muted-foreground">Você será redirecionado em breve.</p>
    </div>
  );
}
