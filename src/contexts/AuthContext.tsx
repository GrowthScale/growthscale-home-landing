import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, type AuthUser } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { companyService } from '@/services/api'

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        user_metadata: session.user.user_metadata
      } : null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        user_metadata: session.user.user_metadata
      } : null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string, companyName: string, companyEmail: string, employeeCount: number) => {
    try {
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
      })

      if (authError) {
        return { error: authError }
      }

      // 2. Se o usuário foi criado com sucesso, criar a empresa
      if (authData.user) {
        const companyData = {
          name: companyName,
          cnpj: '', // Será preenchido posteriormente no setup
          tradeName: companyName,
          description: `Restaurante com ${employeeCount} funcionários`,
          status: 'active' as const,
          address: {
            street: '',
            number: '',
            complement: '',
            district: '',
            city: '',
            state: '',
            zipCode: '',
          },
          contact: {
            email: companyEmail,
            phone: '',
            website: '',
          },
          settings: {
            timeZone: 'America/Sao_Paulo',
            currency: 'BRL',
            language: 'pt-BR',
          },
        }

        const { error: companyError } = await companyService.createCompany(companyData)
        
        if (companyError) {
          console.error('Erro ao criar empresa:', companyError)
          // Não retornamos erro aqui para não impedir o cadastro do usuário
          // A empresa pode ser criada posteriormente no setup
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Erro no signUp:', error)
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
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