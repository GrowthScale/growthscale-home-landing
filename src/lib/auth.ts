import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Schemas de validação
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  rememberMe: z.boolean().optional()
});

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  companyName: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  acceptTerms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos')
}).refine(data => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

const twoFactorSchema = z.object({
  code: z.string().length(6, 'Código deve ter 6 dígitos')
});

// Tipos
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'employee';
  tenantId: string;
  twoFactorEnabled: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
}

export interface TwoFactorCode {
  id: string;
  userId: string;
  code: string;
  expiresAt: Date;
  used: boolean;
}

// Cliente Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL e Key são obrigatórios');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Classe de Autenticação
export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private currentSession: Session | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Resetar senha
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const emailSchema = z.string().email('Email inválido');
      const validatedEmail = emailSchema.parse(email);

      const { error } = await supabase.auth.resetPasswordForEmail(validatedEmail);
      if (error) {
        return { success: false, error: error.message };
      }

      // Log de auditoria
      await this.logAuditEvent('reset_password_requested', { email: validatedEmail });

      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Erro ao solicitar redefinição de senha' };
    }
  }

  // Login com validação
  async login(email: string, password: string, rememberMe = false): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Validar dados
      const validatedData = loginSchema.parse({ email, password, rememberMe });

      // Tentar login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Usuário não encontrado' };
      }

      // Buscar dados completos do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError || !userData) {
        return { success: false, error: 'Erro ao buscar dados do usuário' };
      }

      this.currentUser = userData as User;
      this.currentSession = {
        id: data.session?.access_token || '',
        userId: data.user.id,
        token: data.session?.access_token || '',
        expiresAt: new Date(data.session?.expires_at || Date.now()),
        ipAddress: await this.getClientIP(),
        userAgent: navigator.userAgent,
        isActive: true
      };

      // Log de auditoria
      await this.logAuditEvent('login', {
        userId: data.user.id,
        ipAddress: this.currentSession.ipAddress,
        userAgent: this.currentSession.userAgent
      });

      return { success: true, user: this.currentUser };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  // Registro com validação
  async register(userData: z.infer<typeof registerSchema>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Validar dados
      const validatedData = registerSchema.parse(userData);

      // Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Erro ao criar usuário' };
      }

      // Criar tenant
      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({
          name: validatedData.companyName,
          owner_id: data.user.id
        })
        .select()
        .single();

      if (tenantError) {
        return { success: false, error: 'Erro ao criar empresa' };
      }

      // Criar perfil do usuário
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: validatedData.email,
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          role: 'admin',
          tenant_id: tenant.id,
          two_factor_enabled: false
        })
        .select()
        .single();

      if (profileError) {
        return { success: false, error: 'Erro ao criar perfil' };
      }

      // Log de auditoria
      await this.logAuditEvent('register', {
        userId: data.user.id,
        tenantId: tenant.id,
        ipAddress: await this.getClientIP()
      });

      return { success: true, user: profile as User };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  // Logout
  async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.currentSession) {
        // Marcar sessão como inativa
        await supabase
          .from('sessions')
          .update({ is_active: false })
          .eq('id', this.currentSession.id);

        // Log de auditoria
        await this.logAuditEvent('logout', {
          userId: this.currentUser?.id,
          sessionId: this.currentSession.id
        });
      }

      // Logout do Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, error: error.message };
      }

      this.currentUser = null;
      this.currentSession = null;

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer logout' };
    }
  }

  // Verificar 2FA
  async verifyTwoFactor(code: string): Promise<{ success: boolean; error?: string }> {
    try {
      const validatedData = twoFactorSchema.parse({ code });

      if (!this.currentUser) {
        return { success: false, error: 'Usuário não autenticado' };
      }

      // Verificar código no banco
      const { data, error } = await supabase
        .from('two_factor_codes')
        .select('*')
        .eq('user_id', this.currentUser.id)
        .eq('code', validatedData.code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return { success: false, error: 'Código inválido ou expirado' };
      }

      // Marcar código como usado
      await supabase
        .from('two_factor_codes')
        .update({ used: true })
        .eq('id', data.id);

      // Log de auditoria
      await this.logAuditEvent('2fa_verified', {
        userId: this.currentUser.id,
        codeId: data.id
      });

      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  // Gerar código 2FA
  async generateTwoFactorCode(): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'Usuário não autenticado' };
      }

      // Gerar código de 6 dígitos
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

      // Salvar código no banco
      const { error } = await supabase
        .from('two_factor_codes')
        .insert({
          user_id: this.currentUser.id,
          code,
          expires_at: expiresAt.toISOString(),
          used: false
        });

      if (error) {
        return { success: false, error: 'Erro ao gerar código' };
      }

      // TODO: Enviar código por email/SMS
      // Código 2FA gerado com sucesso

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  // Ativar/Desativar 2FA
  async toggleTwoFactor(enabled: boolean): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'Usuário não autenticado' };
      }

      const { error } = await supabase
        .from('users')
        .update({ two_factor_enabled: enabled })
        .eq('id', this.currentUser.id);

      if (error) {
        return { success: false, error: 'Erro ao atualizar configuração' };
      }

      this.currentUser.twoFactorEnabled = enabled;

      // Log de auditoria
      await this.logAuditEvent('2fa_toggled', {
        userId: this.currentUser.id,
        enabled
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  // Verificar sessão atual
  async checkSession(): Promise<{ valid: boolean; user?: User; error?: string }> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        return { valid: false, error: 'Sessão inválida' };
      }

      // Verificar se sessão ainda é válida no banco
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('token', session.access_token)
        .eq('is_active', true)
        .single();

      if (sessionError || !sessionData) {
        return { valid: false, error: 'Sessão expirada' };
      }

      // Buscar dados do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError || !userData) {
        return { valid: false, error: 'Usuário não encontrado' };
      }

      this.currentUser = userData as User;
      this.currentSession = sessionData as Session;

      return { valid: true, user: this.currentUser };
    } catch (error) {
      return { valid: false, error: 'Erro ao verificar sessão' };
    }
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Obter sessão atual
  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  // Log de auditoria
  private async logAuditEvent(event: string, metadata: Record<string, unknown>): Promise<void> {
    try {
      await supabase
        .from('audit_logs')
        .insert({
          event,
          user_id: this.currentUser?.id,
          metadata,
          ip_address: await this.getClientIP(),
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      console.error('Erro ao logar evento de auditoria:', error);
    }
  }

  // Obter IP do cliente
  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  }
}

// Exportar instância singleton
export const authService = AuthService.getInstance();
