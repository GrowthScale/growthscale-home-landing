// Tipos base reutilizáveis
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipos para usuários
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
}

export type UserRole = 'admin' | 'manager' | 'employee' | 'viewer';

// Tipos para funcionários
export interface Employee extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: EmployeeStatus;
  startDate: string;
  skills: string[];
  workload?: number;
  avatar?: string;
  address?: string;
  salary?: string;
}

export type EmployeeStatus = 'active' | 'inactive' | 'vacation' | 'sick_leave';

// Tipos para empresas
export interface Company extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  industry?: string;
  size?: CompanySize;
  isActive: boolean;
}

export type CompanySize = 'small' | 'medium' | 'large' | 'enterprise';

// Tipos para escalas
export interface Schedule extends BaseEntity {
  date: string;
  shift: ShiftType;
  employees: Employee[];
  notes?: string;
  status: ScheduleStatus;
  validated?: boolean;
  cost?: number;
}

export type ShiftType = 'morning' | 'afternoon' | 'night';
export type ScheduleStatus = 'draft' | 'published' | 'completed' | 'cancelled';

// Tipos para validação
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  riskScore: number;
}

export interface ValidationError {
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  field?: string;
}

export interface ValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
}

// Tipos para notificações
export interface Notification extends BaseEntity {
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  action?: NotificationAction;
  expiresAt?: string;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export interface NotificationAction {
  label: string;
  url?: string;
  onClick?: () => void;
}

// Tipos para analytics
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

// Tipos para configurações
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR' | 'en-US';
  notifications: NotificationSettings;
  preferences: UserPreferences;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  whatsapp: boolean;
}

export interface UserPreferences {
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
}

// Tipos para formulários
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: FormOption[];
  validation?: ValidationRule[];
}

export interface FormOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'custom';
  value?: string | number;
  message: string;
}

// Tipos para paginação
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Tipos para API responses
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Tipos para componentes
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Tipos para eventos
export interface EventHandler<T = unknown> {
  (event: T): void;
}

// Tipos para estados de loading
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  retry?: () => void;
}

// Tipos para modais
export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Tipos para breadcrumbs
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Tipos para tabs
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ElementType;
}

// Tipos para dropdowns
export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}
