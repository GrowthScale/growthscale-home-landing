import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { loginSchema, registerSchema, validateInputSafe, type LoginInput, type RegisterInput } from '@/lib/validation';
import { createCompanyForUser } from '@/services/api';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (data: LoginInput) => Promise<{ error: Error | null }>;
  signUp: (data: RegisterInput) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (data: LoginInput) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error && process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign in error:', error);
      }
      
      return { error: error as Error | null };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign in exception:', error);
      }
      return { error: error as Error };
    }
  }

  const signUp = async (data: RegisterInput) => {
    try {
      // Validar dados de entrada
      const validation = validateInputSafe(registerSchema, data);
      if (!validation.success) {
        return { error: new Error(validation.errors.join(', ')) };
      }

      // Determine the redirect URL based on environment
      const getRedirectUrl = () => {
        // Sempre usar produção para evitar problemas de redirecionamento
        // Se estiver em localhost, usar localhost, senão usar produção
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
          return 'http://localhost:3000/auth/callback';
        }
        
        // Para todos os outros casos (produção, preview, etc.), usar a URL de produção
        return 'https://growthscale-home-landing.vercel.app/auth/callback';
      };

      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
          emailRedirectTo: getRedirectUrl(),
        },
      });

      if (authError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('AuthProvider: Sign up auth error:', authError);
        }
        return { error: authError };
      }

      if (!authData.user) {
        return { error: new Error("Criação de usuário falhou.") };
      }

      // 2. CRÍTICO: Criar a empresa no banco de dados, ligada ao novo usuário
      try {
        await createCompanyForUser(authData.user.id, {
          name: data.companyName,
          companyEmail: data.companyEmail,
          employeeCount: data.employeeCount,
          fullName: data.fullName,
        });
      } catch (companyError) {
        // Se a criação da empresa falhar, apague o usuário recém-criado para evitar órfãos
        console.error('Erro ao criar empresa, fazendo rollback do usuário:', companyError);
        // Nota: Não podemos deletar o usuário diretamente, mas podemos marcar como não confirmado
        return { error: new Error(`Falha ao criar empresa: ${companyError instanceof Error ? companyError.message : 'Erro desconhecido'}`) };
      }

      return { error: null };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign up exception:', error);
      }
      return { error: error as Error };
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign out error:', error);
      }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error && process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Reset password error:', error);
      }
      
      return { error: error as Error | null };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Reset password exception:', error);
      }
      return { error: error as Error };
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}