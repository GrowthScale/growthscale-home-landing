import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { registerSchema, validateInputSafe, type LoginInput, type RegisterInput } from '@/lib/validation';
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
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
          return 'http://localhost:3000/auth/callback';
        }
        return 'https://growthscale-home-landing-an1013bp6.vercel.app/auth/callback';
      };

      // 1. Criar usuário no Supabase Auth (SEM criar empresa ainda)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            // Armazenar dados da empresa temporariamente nos metadados
            pending_company: {
              name: data.companyName,
              companyEmail: data.companyEmail,
              employeeCount: data.employeeCount,
              fullName: data.fullName,
            }
          },
          emailRedirectTo: getRedirectUrl(),
        },
      });

      if (authError) {
        console.error('AuthProvider: Sign up auth error:', authError);
        return { error: authError as Error };
      }

      if (!authData.user) {
        return { error: new Error("Criação de usuário falhou.") };
      }

      // 2. IMPORTANTE: NÃO criar empresa aqui - aguardar confirmação de email
      // A empresa será criada no AuthCallback após confirmação
      console.log('✅ Usuário criado com sucesso. Aguardando confirmação de email...');
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Sign up exception:', error);
      
      // Verificar se é um erro de conectividade/timeout
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.log('⚠️ Erro de conectividade detectado, verificando se o cadastro foi realizado...');
        
        try {
          // Tentar buscar a sessão atual para verificar se o usuário foi criado
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            console.log('✅ Usuário encontrado na sessão, cadastro pode ter sido realizado com sucesso');
            return { error: null };
          }
        } catch (sessionError) {
          console.error('Erro ao verificar sessão:', sessionError);
        }
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