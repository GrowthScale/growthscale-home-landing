// src/pages/AuthCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // O evento de SIGNED_IN é disparado pelo Supabase após o clique no link de confirmação.
      // Nós apenas precisamos de esperar e depois redirecionar.
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
        if (event === 'SIGNED_IN' && session) {
          // Desligamos o listener para não rodar múltiplas vezes
          subscription.unsubscribe();
          // Redirecionamos para o dashboard. A lógica de onboarding lá irá tratar do resto.
          navigate('/dashboard');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold">A autenticar a sua sessão...</h1>
      <p className="text-muted-foreground">Estamos a finalizar a sua configuração. Será redirecionado em breve.</p>
    </div>
  );
}
