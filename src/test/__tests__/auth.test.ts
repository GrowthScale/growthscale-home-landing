import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../../lib/auth';

// Mock do Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should validate email format', async () => {
      const result = await authService.login('invalid-email', 'password123');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Email inválido');
    });

    it('should validate password length (min 8)', async () => {
      const result = await authService.login('test@example.com', '123');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('pelo menos 8 caracteres');
    });

    it('should handle successful login', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        full_name: 'John Doe',
        company_id: 'company-123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { createClient } = await import('@supabase/supabase-js');
      const mockSupabase = createClient as any;
      
      mockSupabase.mockReturnValue({
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue({
            data: { user: { id: 'user-123' }, session: { access_token: 'token' } },
            error: null,
          }),
        },
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockUser, error: null }),
            }),
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockUser, error: null }),
            }),
          }),
        }),
      } as any);

      const result = await authService.login('test@example.com', 'password123');
      
      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUser);
    });
  });

  describe('register', () => {
    it('should validate required fields', async () => {
      const result = await authService.register({
        email: '',
        password: '123',
        confirmPassword: '123',
        firstName: '',
        lastName: '',
        companyName: '',
        acceptTerms: false,
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Email inválido');
    });

    it('should validate password confirmation', async () => {
      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different',
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Test Company',
        acceptTerms: true,
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Senhas não coincidem');
    });

    it('should validate terms acceptance', async () => {
      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Test Company',
        acceptTerms: false,
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('aceitar os termos');
    });
  });

  describe('twoFactor', () => {
    it('should validate 2FA code length', async () => {
      const result = await authService.verifyTwoFactor('123');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('6 dígitos');
    });

    it('should generate 2FA code', async () => {
      const { createClient } = await import('@supabase/supabase-js');
      const mockSupabase = createClient as vi.MockedFunction<typeof createClient>;
      
      mockSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue({
          insert: vi.fn().mockResolvedValue({ error: null }),
        }),
      } as unknown as ReturnType<typeof createClient>);

      const result = await authService.generateTwoFactorCode();
      
      expect(result.success).toBe(true);
    });
  });

  describe('resetPassword', () => {
    it('should validate email format', async () => {
      const result = await authService.resetPassword('invalid-email');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Email inválido');
    });

    it('should handle successful password reset', async () => {
      const { createClient } = await import('@supabase/supabase-js');
      const mockSupabase = createClient as vi.MockedFunction<typeof createClient>;
      
      mockSupabase.mockReturnValue({
        auth: {
          resetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
        },
      } as unknown as ReturnType<typeof createClient>);

      const result = await authService.resetPassword('test@example.com');
      
      expect(result.success).toBe(true);
    });
  });
});
