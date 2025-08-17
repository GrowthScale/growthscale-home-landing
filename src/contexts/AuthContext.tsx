import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, type AuthUser } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: unknown }>
  signUp: (email: string, password: string, fullName: string, companyName: string, companyEmail: string, employeeCount: number) => Promise<{ error: unknown }>
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

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Attempting sign in for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
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

  const signUp = async (email: string, password: string, fullName: string, companyName: string, companyEmail: string, employeeCount: number) => {
    try {
      console.log('AuthProvider: Attempting sign up for:', email);
      
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
            company_email: companyEmail,
            employee_count: employeeCount,
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