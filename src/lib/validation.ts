import { z } from 'zod';

// =====================================================
// SCHEMAS DE AUTENTICAÇÃO
// =====================================================

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  rememberMe: z.boolean().optional().default(false)
});

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter maiúscula, minúscula e número'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  companyName: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres').max(100),
  companyEmail: z.string().email('Email da empresa inválido'),
  employeeCount: z.number().min(1, 'Número de funcionários deve ser pelo menos 1').max(10000),
  acceptTerms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos')
}).refine(data => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string()
    .min(8, 'Nova senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter maiúscula, minúscula e número'),
  confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Senhas não coincidem",
  path: ["confirmNewPassword"]
});

// =====================================================
// SCHEMAS DE EMPRESA
// =====================================================

export const companySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  tradeName: z.string().optional(),
  description: z.string().max(500).optional(),
  logo: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido')
  }),
  contact: z.object({
    email: z.string().email('Email inválido'),
    phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
    website: z.string().url().optional()
  })
});

// =====================================================
// SCHEMAS DE FUNCIONÁRIO
// =====================================================

export const employeeSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  phoneNumber: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
  position: z.string().min(1, 'Cargo é obrigatório'),
  department: z.string().optional(),
  status: z.enum(['active', 'inactive', 'vacation', 'sick_leave']).default('active'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  salary: z.number().min(0, 'Salário deve ser positivo').optional(),
  workloadHours: z.number().min(1, 'Carga horária deve ser pelo menos 1').max(168).default(44),
  skills: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    city: z.string().optional(),
    state: z.string().length(2).optional(),
    zipCode: z.string().optional()
  }).optional(),
  avatar: z.string().url().optional()
});

// =====================================================
// SCHEMAS DE ESCALA
// =====================================================

export const scheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  notes: z.string().max(500).optional(),
  companyId: z.string().uuid('ID da empresa inválido')
});

export const shiftSchema = z.object({
  employeeId: z.string().uuid('ID do funcionário inválido'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Horário de início inválido'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Horário de fim inválido'),
  breakTime: z.number().min(0).default(0),
  notes: z.string().max(200).optional()
});

// =====================================================
// SCHEMAS DE FILIAL
// =====================================================

export const branchSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido')
  }),
  workingHours: z.object({
    start: z.string().regex(/^\d{2}:\d{2}$/, 'Horário de início inválido'),
    end: z.string().regex(/^\d{2}:\d{2}$/, 'Horário de fim inválido')
  }),
  status: z.enum(['active', 'inactive']).default('active'),
  companyId: z.string().uuid('ID da empresa inválido')
});

// =====================================================
// SCHEMAS DE USUÁRIO
// =====================================================

export const userProfileSchema = z.object({
  role: z.enum(['owner', 'admin', 'manager', 'employee']).default('employee'),
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(50),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres').max(50),
  avatar: z.string().url().optional(),
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido').optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    language: z.enum(['pt-BR', 'en-US']).default('pt-BR'),
    notifications: z.boolean().default(true)
  }).optional()
});

// =====================================================
// SCHEMAS DE PAGINAÇÃO E FILTROS
// =====================================================

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

export const searchSchema = z.object({
  query: z.string().min(1, 'Query é obrigatória').max(100),
  filters: z.record(z.any()).optional()
});

// =====================================================
// TIPOS INFERIDOS
// =====================================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type CompanyInput = z.infer<typeof companySchema>;
export type EmployeeInput = z.infer<typeof employeeSchema>;
export type ScheduleInput = z.infer<typeof scheduleSchema>;
export type ShiftInput = z.infer<typeof shiftSchema>;
export type BranchInput = z.infer<typeof branchSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;

// =====================================================
// FUNÇÕES DE VALIDAÇÃO
// =====================================================

export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validação falhou: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
};

export const validateInputSafe = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(e => e.message) 
      };
    }
    return { 
      success: false, 
      errors: ['Erro interno de validação'] 
    };
  }
};
