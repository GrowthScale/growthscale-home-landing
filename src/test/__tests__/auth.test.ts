import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthService } from '@/lib/auth';

// Mock do Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(),
      })),
    })),
  })),
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = AuthService.getInstance();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should validate email format', async () => {
      const result = await authService.login('invalid-email', 'password123');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Email inválido');
    });

    it('should validate password length', async () => {
      const result = await authService.login('test@example.com', '123');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('pelo menos 8 caracteres');
    });

    it('should return success for valid credentials', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin' as const,
        tenantId: 'tenant-123',
        twoFactorEnabled: false,
        lastLoginAt: new Date(),
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
      });

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
      const mockSupabase = createClient as any;
      
      mockSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue({
          insert: vi.fn().mockResolvedValue({ error: null }),
        }),
      });

      const result = await authService.generateTwoFactorCode();
      
      expect(result.success).toBe(true);
    });
  });
});
