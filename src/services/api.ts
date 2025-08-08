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
          error: error.message || 'Erro desconhecido',
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

// Export service instances
export const employeeService = new EmployeeService();
export const companyService = new CompanyService();
export const scheduleService = new ScheduleService();
export const cltAssistantService = new CLTAssistantService();

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
  const { data, error } = await supabase.functions.invoke('suggest-schedule', {
    body: context,
  });

  if (error) {
    throw new Error(`Erro na sugestão de IA: ${error.message}`);
  }

  return data;
} 