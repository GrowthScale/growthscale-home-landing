import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, type AuthUser } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { loginSchema, registerSchema, validateInputSafe, type LoginInput, type RegisterInput } from '@/lib/validation'

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signIn: (data: LoginInput) => Promise<{ error: unknown }>
  signUp: (data: RegisterInput) => Promise<{ error: unknown }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: unknown }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export { AuthContext }

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AuthProvider: Initializing...');
    
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ? {
          id: session.user.id,
          email: session.user.email!,
          user_metadata: session.user.user_metadata
        } : null);
        
        console.log('AuthProvider: Session initialized:', !!session);
      } catch (error) {
        console.error('AuthProvider: Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AuthProvider: Auth state changed:', _event);
      setSession(session);
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        user_metadata: session.user.user_metadata
      } : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (data: LoginInput) => {
    try {
      // Validar dados de entrada
      const validation = validateInputSafe(loginSchema, data);
      if (!validation.success) {
        return { error: new Error(validation.errors.join(', ')) };
      }

      console.log('AuthProvider: Attempting sign in for:', data.email);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        console.error('AuthProvider: Sign in error:', error);
      } else {
        console.log('AuthProvider: Sign in successful');
      }
      
      return { error };
    } catch (error) {
      console.error('AuthProvider: Sign in exception:', error);
      return { error };
    }
  }

  const signUp = async (data: RegisterInput) => {
    try {
      // Validar dados de entrada
      const validation = validateInputSafe(registerSchema, data);
      if (!validation.success) {
        return { error: new Error(validation.errors.join(', ')) };
      }

      console.log('AuthProvider: Attempting sign up for:', data.email);
      
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            company_name: data.companyName,
            company_email: data.companyEmail,
            employee_count: data.employeeCount,
          },
        },
      });

      if (authError) {
        console.error('AuthProvider: Sign up auth error:', authError);
        return { error: authError };
      }

      console.log('AuthProvider: Sign up successful');
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Sign up exception:', error);
      return { error };
    }
  }

  const signOut = async () => {
    try {
      console.log('AuthProvider: Signing out...');
      await supabase.auth.signOut();
      console.log('AuthProvider: Sign out successful');
    } catch (error) {
      console.error('AuthProvider: Sign out error:', error);
    }
  }

  const resetPassword = async (email: string) => {
    try {
      console.log('AuthProvider: Resetting password for:', email);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        console.error('AuthProvider: Reset password error:', error);
      } else {
        console.log('AuthProvider: Reset password email sent');
      }
      
      return { error };
    } catch (error) {
      console.error('AuthProvider: Reset password exception:', error);
      return { error };
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

  console.log('AuthProvider: Rendering with user:', !!user, 'loading:', loading);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}