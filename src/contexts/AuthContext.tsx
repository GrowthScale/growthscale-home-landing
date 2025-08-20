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
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('AuthProvider: Error getting session:', error);
          }
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ? {
          id: session.user.id,
          email: session.user.email!,
          user_metadata: session.user.user_metadata
        } : null);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('AuthProvider: Error initializing auth:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error && process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign in error:', error);
      }
      
      return { error };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign in exception:', error);
      }
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

      // Determine the redirect URL based on environment
      const getRedirectUrl = () => {
        const isProduction = import.meta.env.VITE_APP_ENVIRONMENT === 'production' || 
                            import.meta.env.PROD || 
                            window.location.hostname !== 'localhost';
        
        if (isProduction) {
          return 'https://growthscale-home-landing.vercel.app/auth/callback';
        }
        return 'http://localhost:3000/auth/callback';
      };

      
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
          emailRedirectTo: getRedirectUrl(),
        },
      });

      if (authError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('AuthProvider: Sign up auth error:', authError);
        }
        return { error: authError };
      }

      return { error: null };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Sign up exception:', error);
      }
      return { error };
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
      
      return { error };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('AuthProvider: Reset password exception:', error);
      }
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



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}