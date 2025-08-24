// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface UserSignUpData {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  employeeCount: string;
}

interface UserSignInData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (data: UserSignUpData) => Promise<{ success: boolean; message: string }>;
  signIn: (data: UserSignInData) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  checkEmailConfirmation: (email: string, password: string) => Promise<boolean>;
  checkUserStatus: (email: string) => Promise<{ confirmed: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔧 AuthProvider: Inicializando...');
    
    // Função para atualizar estado de forma segura
    const updateAuthState = (session: Session | null) => {
      console.log('🔄 AuthProvider: Atualizando estado', {
        hasSession: !!session,
        hasUser: !!session?.user,
        userId: session?.user?.id
      });
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔔 AuthProvider: Auth state change', { event, hasSession: !!session });
      updateAuthState(session);
    });

    // Obter sessão inicial
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ AuthProvider: Erro ao obter sessão inicial', error);
        }
        
        updateAuthState(session);
      } catch (error) {
        console.error('❌ AuthProvider: Erro crítico na inicialização', error);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('🧹 AuthProvider: Limpando subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (userData: UserSignUpData): Promise<{ success: boolean; message: string }> => {
    try {
      console.log('🚀 AuthProvider: Iniciando cadastro para:', userData.email);
      
      // Validar dados de entrada
      if (!userData.email || !userData.password || !userData.fullName || !userData.companyName) {
        return { success: false, message: 'Todos os campos são obrigatórios' };
      }

      // Determinar URL de redirecionamento
      const SITE_URL = import.meta.env.VITE_SITE_URL || "https://growthscale-home-landing.vercel.app";
      const redirectUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? `${window.location.origin}/auth/callback`
        : `${SITE_URL}/auth/callback`;

      console.log('🔗 AuthProvider: URL de redirecionamento:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
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
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        console.error('❌ AuthProvider: Erro no cadastro:', error);
        
        // Tratamento específico de erros
        if (error.message.includes('User already registered')) {
          return { success: false, message: 'Este e-mail já está cadastrado. Tente fazer o login.' };
        }
        if (error.message.includes('Password should be at least')) {
          return { success: false, message: 'A senha deve ter pelo menos 6 caracteres.' };
        }
        if (error.message.includes('Invalid email')) {
          return { success: false, message: 'E-mail inválido.' };
        }
        
        return { success: false, message: error.message };
      }
      
      if (data.user && data.session) {
        console.log('✅ AuthProvider: Usuário já confirmado, sessão criada');
        return { success: true, message: 'Conta criada e confirmada automaticamente!' };
      }
      
      if (data.user && !data.session) {
        console.log('✅ AuthProvider: Usuário criado, aguardando confirmação de email');
        return { success: true, message: 'Email de confirmação enviado! Verifique sua caixa de entrada.' };
      }
      
      return { success: false, message: 'Erro desconhecido no cadastro' };
      
    } catch (error) {
      console.error('❌ AuthProvider: Erro geral no cadastro:', error);
      return { success: false, message: 'Erro interno do servidor. Tente novamente.' };
    }
  };

  const signIn = async (input: UserSignInData): Promise<{ success: boolean; message: string }> => {
    try {
      console.log('🔐 AuthProvider: Tentando login para:', input.email);
      
      if (!input.email || !input.password) {
        return { success: false, message: 'Email e senha são obrigatórios' };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        console.error('❌ AuthProvider: Erro no login:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, message: 'Email ou senha inválidos.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { success: false, message: 'Email não confirmado. Verifique sua caixa de entrada.' };
        }
        
        return { success: false, message: error.message };
      }

      if (data.user && data.session) {
        console.log('✅ AuthProvider: Login realizado com sucesso');
        return { success: true, message: 'Login realizado com sucesso!' };
      }

      return { success: false, message: 'Erro desconhecido no login' };
      
    } catch (error) {
      console.error('❌ AuthProvider: Erro geral no login:', error);
      return { success: false, message: 'Erro interno do servidor. Tente novamente.' };
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 AuthProvider: Fazendo logout...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ AuthProvider: Erro no logout:', error);
        throw error;
      }
      
      console.log('✅ AuthProvider: Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ AuthProvider: Erro geral no logout:', error);
      throw error;
    }
  };

  const checkEmailConfirmation = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔍 AuthProvider: Verificando confirmação para:', email);
      
      // Primeiro, tentar fazer login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('❌ AuthProvider: Usuário ainda não confirmado:', error.message);
        return false;
      }

      if (data.user && data.session) {
        console.log('✅ AuthProvider: Usuário confirmado e logado!');
        
        // Fazer logout para não manter a sessão
        await supabase.auth.signOut();
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ AuthProvider: Erro ao verificar confirmação:', error);
      return false;
    }
  };

  const checkUserStatus = async (email: string): Promise<{ confirmed: boolean; message: string }> => {
    try {
      console.log('🔍 AuthProvider: Verificando status do usuário:', email);
      
      // Buscar usuário por email (requer admin ou função específica)
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        console.log('❌ AuthProvider: Erro ao buscar usuários:', error.message);
        return { confirmed: false, message: 'Erro ao verificar status' };
      }
      
      const user = users?.find(u => u.email === email);
      
      if (user) {
        const confirmed = user.email_confirmed_at !== null;
        console.log('📊 AuthProvider: Status do usuário:', {
          email: user.email,
          confirmed: confirmed,
          confirmedAt: user.email_confirmed_at
        });
        
        return { 
          confirmed, 
          message: confirmed ? 'Email confirmado' : 'Email não confirmado' 
        };
      }
      
      return { confirmed: false, message: 'Usuário não encontrado' };
    } catch (error) {
      console.error('❌ AuthProvider: Erro ao verificar status:', error);
      return { confirmed: false, message: 'Erro ao verificar status' };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    checkEmailConfirmation,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
