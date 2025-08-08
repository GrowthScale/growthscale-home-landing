// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  EMPLOYEES: '/funcionarios',
  SCHEDULES: '/escalas',
  COMPLIANCE: '/compliance',
  SETTINGS: '/configuracoes',
  COMPANIES: '/empresas',
  SETUP: '/setup',
  CONTACT: '/contato',
  FAQ: '/faq',
  LEGAL: {
    PRIVACY: '/politica-de-privacidade',
    TERMS: '/termos-de-uso',
    COOKIES: '/politica-de-cookies',
    HELP: '/central-de-ajuda'
  }
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  EMPLOYEES: '/employees',
  COMPANIES: '/companies',
  SCHEDULES: '/schedules',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  }
} as const;

// Status Options
export const EMPLOYEE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VACATION: 'vacation'
} as const;

export const COMPANY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
} as const;

export const SCHEDULE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  COMPLETED: 'completed'
} as const;

// Departments
export const DEPARTMENTS = [
  'Vendas',
  'Estoque',
  'Cozinha',
  'Atendimento',
  'Administrativo',
  'Segurança',
  'Limpeza',
  'Manutenção'
] as const;

// Positions
export const POSITIONS = [
  'Gerente',
  'Supervisor',
  'Atendente',
  'Cozinheiro',
  'Auxiliar de Cozinha',
  'Estoquista',
  'Caixa',
  'Auxiliar de Limpeza',
  'Segurança',
  'Manobrista'
] as const;

// Shifts
export const SHIFTS = [
  'Manhã (06:00 - 14:00)',
  'Tarde (14:00 - 22:00)',
  'Noite (22:00 - 06:00)',
  'Integral (06:00 - 22:00)'
] as const;

// Brazilian States
export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

// Currencies
export const CURRENCIES = [
  { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
  { code: 'USD', symbol: '$', name: 'Dólar Americano' },
  { code: 'EUR', symbol: '€', name: 'Euro' }
] as const;

// Time Zones
export const TIME_ZONES = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)' },
  { value: 'America/Manaus', label: 'Manaus (UTC-4)' },
  { value: 'America/Belem', label: 'Belém (UTC-3)' },
  { value: 'America/Fortaleza', label: 'Fortaleza (UTC-3)' },
  { value: 'America/Recife', label: 'Recife (UTC-3)' },
  { value: 'America/Noronha', label: 'Fernando de Noronha (UTC-2)' }
] as const;

// Languages
export const LANGUAGES = [
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Español' }
] as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100]
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  CNPJ_LENGTH: 18,
  CEP_LENGTH: 9
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW_MS: 60000, // 1 minute
  API_CALLS_PER_MINUTE: 60,
  FILE_UPLOAD_SIZE_MB: 5
} as const;

// Cache Keys
export const CACHE_KEYS = {
  EMPLOYEES: 'employees',
  COMPANIES: 'companies',
  SCHEDULES: 'schedules',
  USER_PROFILE: 'user_profile',
  DASHBOARD_DATA: 'dashboard_data'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  PWA_PROMPT_DISMISSED: 'pwa-prompt-dismissed'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique as informações.',
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente.',
  TIMEOUT_ERROR: 'Tempo limite excedido. Tente novamente.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  EMPLOYEE_CREATED: 'Funcionário criado com sucesso!',
  EMPLOYEE_UPDATED: 'Funcionário atualizado com sucesso!',
  EMPLOYEE_DELETED: 'Funcionário removido com sucesso!',
  COMPANY_CREATED: 'Empresa criada com sucesso!',
  COMPANY_UPDATED: 'Empresa atualizada com sucesso!',
  COMPANY_DELETED: 'Empresa removida com sucesso!',
  SCHEDULE_CREATED: 'Escala criada com sucesso!',
  SCHEDULE_UPDATED: 'Escala atualizada com sucesso!',
  SCHEDULE_DELETED: 'Escala removida com sucesso!',
  SETTINGS_SAVED: 'Configurações salvas com sucesso!',
  PASSWORD_CHANGED: 'Senha alterada com sucesso!'
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1536
} as const;

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080
} as const; 