// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { createCompanyForUser } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const { toast } = useToast();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando sua conta...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Aguardar um momento para garantir que a sessão foi estabelecida
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          throw new Error('Sessão não encontrada');
        }

        // Verificar se o usuário tem dados pendentes de empresa
        const pendingCompany = session.user.user_metadata?.pending_company;
        
        if (pendingCompany) {
          setMessage('Criando sua empresa...');
          
          // Criar empresa automaticamente
          await createCompanyForUser(session.user.id, {
            name: pendingCompany.name,
            employeeCount: parseInt(pendingCompany.employee_count) || 10,
            companyEmail: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || ''
          });

          // Limpar dados pendentes
          await supabase.auth.updateUser({
            data: { pending_company: null }
          });

          setStatus('success');
          setMessage('Empresa criada com sucesso!');
          
          toast({
            title: "Bem-vindo ao GrowthScale!",
            description: "Sua empresa foi configurada automaticamente.",
          });

          // Redirecionar para dashboard após um breve delay
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        } else {
          // Usuário já tem empresa ou não tem dados pendentes
          setStatus('success');
          setMessage('Login realizado com sucesso!');
          
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 1500);
        }
      } catch (error) {
        console.error('Erro no callback de autenticação:', error);
        setStatus('error');
        setMessage('Erro ao processar autenticação. Tente novamente.');
        
        toast({
          title: "Erro na autenticação",
          description: "Ocorreu um erro ao processar seu login. Tente novamente.",
          variant: "destructive"
        });

        // Redirecionar para login após erro
        setTimeout(() => {
          navigate('/auth', { replace: true });
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, user, currentTenant, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Processando...</h2>
              <p className="text-muted-foreground">{message}</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold mb-2">Sucesso!</h2>
              <p className="text-muted-foreground">{message}</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <h2 className="text-xl font-semibold mb-2">Erro</h2>
              <p className="text-muted-foreground">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
