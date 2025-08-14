import { z } from 'zod';

// Schemas de validação para segurança e integridade de dados

// User schemas
export const userSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter letra maiúscula, minúscula e número'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  phone: z.string().optional(),
  role: z.enum(['admin', 'manager', 'employee']).default('employee'),
  companyId: z.string().uuid().optional(),
});

export const userUpdateSchema = userSchema.partial().omit({ password: true });

export const userLoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Company schemas
export const companySchema = z.object({
  name: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres').max(100),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  address: z.object({
    street: z.string().min(5),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string().length(2),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  }),
  phone: z.string(),
  email: z.string().email('Email inválido'),
  industry: z.string().optional(),
  employeeCount: z.number().min(1).max(1000),
});

// Employee schemas
export const employeeSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido').optional(),
  phone: z.string().optional(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  position: z.string().min(2, 'Cargo deve ter pelo menos 2 caracteres'),
  department: z.string().optional(),
  hireDate: z.string().datetime(),
  salary: z.number().positive('Salário deve ser positivo'),
  workHours: z.number().min(1).max(24, 'Horas de trabalho inválidas'),
  cltType: z.enum(['CLT', 'PJ', 'Temporário', 'Estagiário']),
  companyId: z.string().uuid(),
});

// Schedule schemas
export const scheduleSchema = z.object({
  employeeId: z.string().uuid('ID do funcionário inválido'),
  date: z.string().date('Data inválida'),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário de início inválido'),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário de fim inválido'),
  breakTime: z.number().min(0).max(480, 'Tempo de pausa inválido (máximo 8h)').default(0),
  type: z.enum(['regular', 'overtime', 'holiday', 'sick']).default('regular'),
  notes: z.string().max(500, 'Notas muito longas').optional(),
  companyId: z.string().uuid(),
});

export const scheduleBatchSchema = z.object({
  schedules: z.array(scheduleSchema).min(1, 'Pelo menos uma escala deve ser fornecida'),
  weekStart: z.string().date('Data de início da semana inválida'),
  weekEnd: z.string().date('Data de fim da semana inválida'),
});

// CLT Compliance schemas
export const cltComplianceSchema = z.object({
  employeeId: z.string().uuid(),
  date: z.string().date(),
  totalHours: z.number().min(0).max(24),
  overtimeHours: z.number().min(0).max(12),
  nightShiftHours: z.number().min(0).max(8),
  holidayHours: z.number().min(0).max(24),
  restPeriod: z.number().min(11, 'Período de descanso mínimo não respeitado'),
  weeklyRest: z.number().min(24, 'Descanso semanal mínimo não respeitado'),
  violations: z.array(z.object({
    type: z.enum(['overtime_limit', 'rest_period', 'weekly_rest', 'night_shift', 'holiday_work']),
    description: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    cltArticle: z.string(),
  })).default([]),
});

// Report schemas
export const reportSchema = z.object({
  type: z.enum(['economy', 'compliance', 'productivity', 'overtime']),
  startDate: z.string().date(),
  endDate: z.string().date(),
  companyId: z.string().uuid(),
  filters: z.object({
    departments: z.array(z.string()).optional(),
    employees: z.array(z.string().uuid()).optional(),
    scheduleTypes: z.array(z.string()).optional(),
  }).optional(),
});

// Notification schemas
export const notificationSchema = z.object({
  type: z.enum(['schedule_confirmation', 'clt_alert', 'overtime_warning', 'system']),
  recipientId: z.string().uuid(),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  channel: z.enum(['email', 'sms', 'whatsapp', 'in_app']).default('in_app'),
  scheduledAt: z.string().datetime().optional(),
});

// WhatsApp template schemas
export const whatsappTemplateSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['confirmation', 'reminder', 'alert', 'custom']),
  message: z.string().min(1).max(1000),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  companyId: z.string().uuid(),
});

// Settings schemas
export const companySettingsSchema = z.object({
  cltSettings: z.object({
    maxDailyHours: z.number().min(1).max(12).default(8),
    maxWeeklyHours: z.number().min(1).max(60).default(44),
    maxOvertimeHours: z.number().min(0).max(12).default(2),
    restPeriodHours: z.number().min(11).max(24).default(11),
    weeklyRestHours: z.number().min(24).max(48).default(24),
  }),
  notificationSettings: z.object({
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    whatsappNotifications: z.boolean().default(true),
    cltAlerts: z.boolean().default(true),
    overtimeWarnings: z.boolean().default(true),
  }),
  scheduleSettings: z.object({
    autoGenerate: z.boolean().default(false),
    aiOptimization: z.boolean().default(true),
    conflictDetection: z.boolean().default(true),
    approvalRequired: z.boolean().default(false),
  }),
});

// Form validation helpers
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Erro de validação desconhecido'] };
  }
};

// Sanitization helpers
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/\D/g, ''); // Remove non-digits
};

// Rate limiting helpers
export const rateLimitConfig = {
  login: { maxAttempts: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  registration: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts per hour
  api: { maxAttempts: 100, windowMs: 15 * 60 * 1000 }, // 100 requests per 15 minutes
};

// Export all schemas
export const schemas = {
  user: userSchema,
  userUpdate: userUpdateSchema,
  userLogin: userLoginSchema,
  company: companySchema,
  employee: employeeSchema,
  schedule: scheduleSchema,
  scheduleBatch: scheduleBatchSchema,
  cltCompliance: cltComplianceSchema,
  report: reportSchema,
  notification: notificationSchema,
  whatsappTemplate: whatsappTemplateSchema,
  companySettings: companySettingsSchema,
};

// Type exports
export type User = z.infer<typeof userSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type Company = z.infer<typeof companySchema>;
export type Employee = z.infer<typeof employeeSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type ScheduleBatch = z.infer<typeof scheduleBatchSchema>;
export type CLTCompliance = z.infer<typeof cltComplianceSchema>;
export type Report = z.infer<typeof reportSchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type WhatsAppTemplate = z.infer<typeof whatsappTemplateSchema>;
export type CompanySettings = z.infer<typeof companySettingsSchema>;
