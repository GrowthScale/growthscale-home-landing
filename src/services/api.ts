import { supabase } from '@/lib/supabase';

// Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'vacation';
  startDate: string;
  lastUpdate: string;
  avatar?: string;
  address: string;
  salary: string;
  skills: string[];
}

export interface CreateEmployeeDto {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'vacation';
  startDate: string;
  address: string;
  salary: string;
  skills: string[];
  notes?: string;
  contractType?: string;
  preferredShift?: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {
  id: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  tradeName?: string;
  description?: string;
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  settings: {
    timeZone: string;
    currency: string;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyDto {
  name: string;
  cnpj: string;
  tradeName?: string;
  description?: string;
  logo?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  settings?: {
    timeZone?: string;
    currency?: string;
    language?: string;
  };
}

export interface Schedule {
  id: string;
  date: string;
  shift: string;
  employees: Employee[];
  notes?: string;
  status: 'draft' | 'published' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleDto {
  date: string;
  shift: string;
  employees: string[]; // employee IDs
  notes?: string;
}

// CLT Validation Types
export interface Shift {
  id: string;
  employeeId: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
}

export interface EmployeeForValidation {
  id: string;
  workload: number; // Carga horária semanal contratada
}

export interface ValidationViolation {
  code: string;
  message: string;
  severity: 'critical' | 'warning';
  employeeId: string;
  shiftIds: string[];
}

export interface ValidationResult {
  riskScore: number;    // 0-100
  violations: ValidationViolation[];
}

// Schedule Suggestion Types
export interface EmployeeForSuggestion {
  id: string;
  name: string;
  workload: number;
  constraints?: string[];
}

export interface ShiftForSuggestion {
  id: string;
  startTime: string;
  endTime: string;
  requiredSkill?: string;
}

export interface ScheduleSuggestionRequest {
  employees: EmployeeForSuggestion[];
  shiftsToFill: ShiftForSuggestion[];
  rules: string[];
}

export interface ScheduleSuggestion {
  shiftId: string;
  employeeId: string;
}

export interface ScheduleSuggestionResponse {
  suggestion: ScheduleSuggestion[];
}

// --- Interfaces para Schedule Modelos ---
export interface ScheduleTemplate {
  id: string;
  created_at: string;
  name: string;
  description?: string;
  tenant_id: string;
  template_data: {
    shifts: Array<{
      dayOfWeek: number; // 0-6 (Domingo-Sábado)
      startTime: string; // HH:mm
      endTime: string;   // HH:mm
      requiredEmployees: number;
      skills?: string[];
    }>;
    employees?: string[]; // IDs dos funcionários padrão
    notes?: string;
    // Campos adicionais do seed
    advantages?: string;
    disadvantages?: string;
    cost_profile?: string;
    common_in?: string;
    work_days?: number;
    rest_days?: number;
    total_cycle?: number;
    weekly_hours?: number;
    compliance_risk?: string;
    cost_efficiency?: string;
    employee_satisfaction?: string;
  };
}

export interface ScheduleDraft {
  id: string;
  created_at: string;
  updated_at: string;
  tenant_id: string;
  target_week_start: string;
  draft_data: any; // JSONB data from AI suggestion
  status: 'pending_review' | 'approved' | 'dismissed';
}

export interface CreateScheduleTemplateDto {
  name: string;
  description?: string;
  tenant_id: string;
  template_data: ScheduleTemplate['template_data'];
}

export interface UpdateScheduleTemplateDto extends Partial<CreateScheduleTemplateDto> {
  id: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Base API class
export class BaseApiService {
  protected async handleRequest<T>(
    request: () => Promise<{ data: T | null; error: unknown }>
  ): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await request();
      
      if (error) {
        return {
          data: null,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          loading: false
        };
      }
      
      return {
        data,
        error: null,
        loading: false
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        loading: false
      };
    }
  }
}

// Employee Service
export class EmployeeService extends BaseApiService {
  async getEmployees(): Promise<ApiResponse<Employee[]>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('name');
      
      return { data, error };
    });
  }

  async getEmployee(id: string): Promise<ApiResponse<Employee>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .single();
      
      return { data, error };
    });
  }

  async createEmployee(employee: CreateEmployeeDto): Promise<ApiResponse<Employee>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('employees')
        .insert([employee])
        .select()
        .single();
      
      return { data, error };
    });
  }

  async updateEmployee(employee: UpdateEmployeeDto): Promise<ApiResponse<Employee>> {
    const { id, ...updateData } = employee;
    
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('employees')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    });
  }

  async deleteEmployee(id: string): Promise<ApiResponse<void>> {
    return this.handleRequest(async () => {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    });
  }
}

// Company Service
export class CompanyService extends BaseApiService {
  async getCompanies(): Promise<ApiResponse<Company[]>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');
      
      return { data, error };
    });
  }

  async getCompany(id: string): Promise<ApiResponse<Company>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();
      
      return { data, error };
    });
  }

  async createCompany(company: CreateCompanyDto): Promise<ApiResponse<Company>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('companies')
        .insert([company])
        .select()
        .single();
      
      return { data, error };
    });
  }

  async updateCompany(id: string, company: Partial<CreateCompanyDto>): Promise<ApiResponse<Company>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('companies')
        .update(company)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    });
  }

  async deleteCompany(id: string): Promise<ApiResponse<void>> {
    return this.handleRequest(async () => {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    });
  }
}

// Schedule Service
export class ScheduleService extends BaseApiService {
  async getSchedules(): Promise<ApiResponse<Schedule[]>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('date', { ascending: false });
      
      return { data, error };
    });
  }

  async getSchedule(id: string): Promise<ApiResponse<Schedule>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('id', id)
        .single();
      
      return { data, error };
    });
  }

  async createSchedule(schedule: CreateScheduleDto): Promise<ApiResponse<Schedule>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedules')
        .insert([schedule])
        .select()
        .single();
      
      return { data, error };
    });
  }

  async updateSchedule(id: string, schedule: Partial<CreateScheduleDto>): Promise<ApiResponse<Schedule>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedules')
        .update(schedule)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    });
  }

  async deleteSchedule(id: string): Promise<ApiResponse<void>> {
    return this.handleRequest(async () => {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    });
  }

  async validateSchedule(scheduleData: { shifts: Shift[]; employees: EmployeeForValidation[] }): Promise<ApiResponse<ValidationResult>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.functions.invoke('validate-schedule', {
        body: scheduleData,
      });

      if (error) {
        return { data: null, error: `Erro na validação da escala: ${error.message}` };
      }

      return { data, error: null };
    });
  }

  async suggestSchedule(suggestionData: ScheduleSuggestionRequest): Promise<ApiResponse<ScheduleSuggestionResponse>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.functions.invoke('suggest-schedule', {
        body: suggestionData,
      });

      if (error) {
        return { data: null, error: `Erro na sugestão de escala: ${error.message}` };
      }

      return { data, error: null };
    });
  }
}

// CLT Assistant Service
export class CLTAssistantService extends BaseApiService {
  async askQuestion(question: string): Promise<ApiResponse<{ answer: string }>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.functions.invoke('clt-assistant', {
        body: { question },
      });

      if (error) {
        return { data: null, error: `Erro no assistente de IA: ${error.message}` };
      }

      return { data, error: null };
    });
  }
}

// --- Schedule Modelo Service ---
export class ScheduleTemplateService extends BaseApiService {
  async getTemplates(): Promise<ApiResponse<ScheduleTemplate[]>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedule_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { data: null, error: `Erro ao buscar modelos: ${error.message}` };
      }

      return { data, error: null };
    });
  }

  async getTemplate(id: string): Promise<ApiResponse<ScheduleTemplate>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedule_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { data: null, error: `Erro ao buscar modelo: ${error.message}` };
      }

      return { data, error: null };
    });
  }

  async createTemplate(template: CreateScheduleTemplateDto): Promise<ApiResponse<ScheduleTemplate>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedule_templates')
        .insert([template])
        .select()
        .single();

      if (error) {
        return { data: null, error: `Erro ao criar modelo: ${error.message}` };
      }

      return { data, error: null };
    });
  }

  async updateTemplate(id: string, updates: UpdateScheduleTemplateDto): Promise<ApiResponse<ScheduleTemplate>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedule_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { data: null, error: `Erro ao atualizar modelo: ${error.message}` };
      }

      return { data, error: null };
    });
  }

  async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    return this.handleRequest(async () => {
      const { error } = await supabase
        .from('schedule_templates')
        .delete()
        .eq('id', id);

      if (error) {
        return { data: null, error: `Erro ao deletar modelo: ${error.message}` };
      }

      return { data: null, error: null };
    });
  }
}

// --- Tipos para Cálculo de Custo ---
export interface EmployeeForCostCalculation {
  id: string;
  workload: number;
  hourlyRate: number; // Valor da hora do funcionário
}

export interface ShiftForCostCalculation {
  employeeId: string;
  startTime: string; // Formato ISO 8601
  endTime: string;
}

export interface CostCalculationRequest {
  shifts: ShiftForCostCalculation[];
  employees: EmployeeForCostCalculation[];
}

export interface CostCalculationResult {
  totalCost: number;
  breakdown: {
    baseCost: number;
    overtimeCost: number;
    nightlyCost: number;
  };
}

export class CostCalculationService extends BaseApiService {
  async calculateScheduleCost(costData: CostCalculationRequest): Promise<ApiResponse<CostCalculationResult>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.functions.invoke('calculate-schedule-cost', {
        body: costData,
      });

      if (error) {
        throw new Error(`Erro no cálculo de custo: ${error instanceof Error ? error.message : String(error)}`);
      }

      return { data, error: null };
    });
  }
}

// Export service instances
export const employeeService = new EmployeeService();
export const companyService = new CompanyService();
export const scheduleService = new ScheduleService();
export const cltAssistantService = new CLTAssistantService();
export const scheduleTemplateService = new ScheduleTemplateService();
export const costCalculationService = new CostCalculationService();

// Standalone function for CLT Assistant (alternative to service method)
export async function askCltAssistant(question: string): Promise<{ answer: string }> {
  const { data, error } = await supabase.functions.invoke('clt-assistant', {
    body: { question },
  });

  if (error) {
    throw new Error(`Erro no assistente de IA: ${error.message}`);
  }

  return data;
}

// Standalone function for Schedule Suggestion (alternative to service method)
export async function suggestSchedule(context: ScheduleSuggestionRequest): Promise<{ suggestion: { shiftId: string; employeeId: string }[] }> {
  try {
    const response = await fetch('/api/suggest-schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    });

    if (!response.ok) {
      throw new Error('Failed to get schedule suggestion');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting schedule suggestion:', error);
    throw error;
  }
}

// Standalone function for Cost Calculation (alternative to service method)
export async function calculateScheduleCost(context: { shifts: ShiftForCostCalculation[], employees: EmployeeForCostCalculation[] }): Promise<CostCalculationResult> {
  const { data, error } = await supabase.functions.invoke('calculate-schedule-cost', {
    body: context,
  });
  if (error) throw error;
  return data;
}

// Standalone function for WhatsApp Schedule Notifications (alternative to service method)
export async function sendScheduleNotification(payload: { 
  employeeIds: string[], 
  scheduleId: string, 
  webhookUrl: string, 
  tenantId: string 
}): Promise<WhatsAppNotificationResponse> {
  const { data, error } = await supabase.functions.invoke('send-schedule-notification', { 
    body: payload 
  });
  if (error) throw error;
  return data;
}

// Interfaces para notificações WhatsApp
export interface WhatsAppNotificationRequest {
  employeeIds: string[];
  scheduleId: string;
  webhookUrl: string;
  tenantId: string;
}

export interface CommunicationLog {
  id: string;
  created_at: string;
  employee_id: string;
  tenant_id: string;
  type: string;
  status: 'SUCCESS' | 'FAILED';
  details: Record<string, unknown>;
}

export interface WhatsAppNotificationResponse {
  success: boolean;
  message: string;
}

export class WhatsAppNotificationService extends BaseApiService {
  async sendScheduleNotifications(notificationData: WhatsAppNotificationRequest): Promise<ApiResponse<WhatsAppNotificationResponse>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.functions.invoke('send-schedule-notification', {
        body: notificationData,
      });
      
      if (error) throw error;
      return { data, error: null };
    });
  }

  async getCommunicationLogs(tenantId: string): Promise<ApiResponse<CommunicationLog[]>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('communication_logs')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    });
  }
}

// Instância do serviço WhatsApp
export const whatsAppNotificationService = new WhatsAppNotificationService();

export class ScheduleDraftService extends BaseApiService {
  async getPendingDraft(tenantId: string): Promise<ApiResponse<ScheduleDraft | null>> {
    return this.handleRequest(async () => {
      if (!tenantId) {
        return { data: null, error: null };
      }

      const { data, error } = await supabase
        .from('schedule_drafts')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('status', 'pending_review')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignora o erro "nenhuma linha encontrada"
        console.error('Erro ao buscar rascunho pendente:', error);
        return { data: null, error };
      }

      return { data, error: null };
    });
  }

  async approveDraft(draftId: string): Promise<ApiResponse<void>> {
    return this.handleRequest(async () => {
      const { error } = await supabase
        .from('schedule_drafts')
        .update({ status: 'approved' })
        .eq('id', draftId);
      
      return { data: null, error };
    });
  }

  async dismissDraft(draftId: string): Promise<ApiResponse<void>> {
    return this.handleRequest(async () => {
      const { error } = await supabase
        .from('schedule_drafts')
        .update({ status: 'dismissed' })
        .eq('id', draftId);
      
      return { data: null, error };
    });
  }

  async getDrafts(tenantId: string): Promise<ApiResponse<ScheduleDraft[]>> {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('schedule_drafts')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      
      return { data, error };
    });
  }
}

// Instância do serviço de rascunhos
export const scheduleDraftService = new ScheduleDraftService();

 