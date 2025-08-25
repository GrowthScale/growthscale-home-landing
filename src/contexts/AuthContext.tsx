// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (data: any) => Promise<any>;
  signIn: (data: any) => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔧 AuthProvider: Inicializando...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔄 AuthProvider: Mudança de estado detectada', { event: _event, hasSession: !!session });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('✅ AuthProvider: Sessão inicial obtida', { hasSession: !!session });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('🧹 AuthProvider: Limpando subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (userData: any) => {
    console.log('📝 AuthProvider: Iniciando cadastro...', { email: userData.email });
    
    // Garantir que a URL de redirecionamento está limpa e válida
    const baseUrl = import.meta.env.VITE_SITE_URL?.trim();
    if (!baseUrl) {
      throw new Error('VITE_SITE_URL não está configurada');
    }
    
    const redirectURL = `${baseUrl}/auth/callback`;
    console.log('🔗 AuthProvider: URL de redirecionamento:', redirectURL);
    
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          pending_company: {
            name: userData.companyName,
            employee_count: userData.employeeCount,
          },
        },
        emailRedirectTo: redirectURL,
      },
    });
    
    if (error) {
      console.error('❌ AuthProvider: Erro no cadastro:', error);
      if (error.message.includes('User already registered')) {
        throw new Error('Este e-mail já está cadastrado. Tente fazer o login.');
      }
      throw error;
    }
    
    console.log('✅ AuthProvider: Cadastro realizado com sucesso');
  };

  const signIn = async (input: any) => {
    console.log('🔐 AuthProvider: Iniciando login...', { email: input.email });
    
    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });
    
    if (error) {
      console.error('❌ AuthProvider: Erro no login:', error);
      throw new Error('Email ou senha inválidos.');
    }
    
    console.log('✅ AuthProvider: Login realizado com sucesso');
  };

  const signOut = async () => {
    console.log('🚪 AuthProvider: Iniciando logout...');
    await supabase.auth.signOut();
    console.log('✅ AuthProvider: Logout realizado com sucesso');
  };

  const value = { user, session, loading, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
