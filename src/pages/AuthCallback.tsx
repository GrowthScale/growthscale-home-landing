// src/pages/AuthCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { createCompanyForUser } from '@/services/api';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe();
        
        const user = session.user;
        const pendingCompany = user.user_metadata?.pending_company;

        if (pendingCompany) {
          try {
            // Cria a empresa e limpa os metadados
            await createCompanyForUser(user.id, {
              name: pendingCompany.name,
              employeeCount: parseInt(pendingCompany.employee_count) || 10,
              companyEmail: user.email || '',
              fullName: user.user_metadata?.full_name || ''
            });
            
            await supabase.auth.updateUser({ 
              data: { pending_company: null } 
            });
            
            navigate('/onboarding'); // Redireciona para o onboarding
          } catch (error) {
            console.error("Erro ao criar empresa no callback:", error);
            navigate('/auth'); // Em caso de erro, volta para o login
          }
        } else {
          navigate('/dashboard'); // Se não há empresa pendente, vai para o dashboard
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Verificando sua conta...</h2>
        <p className="text-muted-foreground">Aguarde enquanto configuramos sua empresa.</p>
      </div>
    </div>
  );
}
