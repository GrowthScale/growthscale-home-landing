import { supabase } from '@/integrations/supabase/client';

// =====================================================
// SERVIÇOS DE EMPRESA
// =====================================================

export interface CompanyData {
  name: string;
  companyEmail: string;
  employeeCount: number;
  fullName: string;
}

export interface SetupData {
  companyName: string;
  cnpj: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    website: string;
    email?: string;
  };
  settings: {
    timezone: string;
    workDays: string[];
    defaultShiftDuration: number;
    setupCompleted: boolean;
  };
}

export async function createCompanyForUser(userId: string, companyData: CompanyData) {
  try {
    console.log('🚀 Iniciando criação da empresa para usuário:', userId);
    console.log('📋 Dados da empresa:', companyData);

    // ESTRATÉGIA 1: Tentar criar empresa diretamente (pode funcionar se RLS estiver configurado corretamente)
    try {
      console.log('📝 Tentativa 1: Criando empresa diretamente...');
      
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: companyData.name,
          cnpj: `TEMP_${Date.now()}`,
          trade_name: companyData.name,
          status: 'active',
          address: {},
          contact: {
            email: companyData.companyEmail,
            phone: '',
          },
          settings: {
            employee_count: companyData.employeeCount,
            owner_name: companyData.fullName,
            plan: 'free',
            subscription_status: 'trialing',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          }
        } as any)
        .select()
        .single();

      if (companyError) {
        console.error('❌ Erro na tentativa 1:', companyError);
        throw companyError;
      }

      console.log('✅ Empresa criada com sucesso, criando relacionamento...');

      // Criar relacionamento company_users
      const { error: companyUserError } = await supabase
        .from('company_users')
        .insert({
          user_id: userId,
          company_id: (company as any).id,
          role: 'owner'
        } as any);

      if (companyUserError) {
        console.error('❌ Erro ao criar relacionamento:', companyUserError);
        // Rollback: deletar empresa se falhar
        await supabase.from('companies').delete().eq('id', (company as any).id);
        throw companyUserError;
      }

      console.log('✅ Relacionamento criado com sucesso');
      return company;

    } catch (firstError) {
      console.log('⚠️ Tentativa 1 falhou, tentando estratégia alternativa...');
      
      // ESTRATÉGIA 2: Tentar criar company_users primeiro (se a política permitir)
      try {
        console.log('📝 Tentativa 2: Criando relacionamento primeiro...');
        
        // Criar uma empresa temporária com ID conhecido
        const tempCompanyId = `temp_${Date.now()}_${userId}`;
        
        const { error: companyUserError } = await supabase
          .from('company_users')
          .insert({
            user_id: userId,
            company_id: tempCompanyId,
            role: 'owner'
          } as any);

        if (companyUserError) {
          console.error('❌ Erro na tentativa 2:', companyUserError);
          throw companyUserError;
        }

        // Agora tentar criar a empresa
        const { data: company, error: companyError } = await supabase
          .from('companies')
          .insert({
            id: tempCompanyId,
            name: companyData.name,
            cnpj: `TEMP_${Date.now()}`,
            trade_name: companyData.name,
            status: 'active',
            address: {},
            contact: {
              email: companyData.companyEmail,
              phone: '',
            },
            settings: {
              employee_count: companyData.employeeCount,
              owner_name: companyData.fullName,
              plan: 'free',
              subscription_status: 'trialing',
              trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            }
          } as any)
          .select()
          .single();

        if (companyError) {
          console.error('❌ Erro ao criar empresa na tentativa 2:', companyError);
          // Rollback: deletar relacionamento se falhar
          await supabase.from('company_users').delete().eq('company_id', tempCompanyId as any);
          throw companyError;
        }

        console.log('✅ Estratégia 2 funcionou!');
        return company;

      } catch (secondError) {
        console.log('⚠️ Tentativa 2 falhou, tentando estratégia final...');
        
        // ESTRATÉGIA 3: Usar RPC se disponível
        try {
          console.log('📝 Tentativa 3: Usando RPC...');
          
          const { data: company, error: rpcError } = await supabase
            .rpc('create_company_with_owner', {
              p_name: companyData.name,
              p_cnpj: `TEMP_${Date.now()}`,
              p_trade_name: companyData.name,
              p_status: 'active',
              p_address: {},
              p_contact: {
                email: companyData.companyEmail,
                phone: '',
              },
              p_settings: {
                employee_count: companyData.employeeCount,
                owner_name: companyData.fullName,
                plan: 'free',
                subscription_status: 'trialing',
                trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              },
              p_user_id: userId,
              p_role: 'owner'
            });

          if (rpcError) {
            console.error('❌ Erro na tentativa 3 (RPC):', rpcError);
            throw rpcError;
          }

          console.log('✅ Estratégia 3 (RPC) funcionou!');
          return company;

        } catch (rpcError) {
          console.log('❌ Todas as estratégias falharam');
          console.error('Erro final:', rpcError);
          
          // Retornar erro detalhado para debug
          throw new Error(`Falha na criação da empresa após 3 tentativas. Último erro: ${rpcError instanceof Error ? rpcError.message : 'Erro desconhecido'}`);
        }
      }
    }

  } catch (error) {
    console.error('💥 Erro completo na criação da empresa:', error);
    throw error;
  }
}

export async function updateCompanySetup(companyId: string, setupData: SetupData) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update({
        name: setupData.companyName,
        cnpj: setupData.cnpj || `TEMP_${Date.now()}`,
        trade_name: setupData.companyName,
        address: setupData.address,
        contact: {
          ...setupData.contact,
          // Manter o email existente se não foi fornecido
          email: setupData.contact.email || undefined,
        },
        settings: {
          timezone: setupData.settings.timezone,
          work_days: setupData.settings.workDays,
          default_shift_duration: setupData.settings.defaultShiftDuration,
          setup_completed: setupData.settings.setupCompleted,
        }
      } as any)
      .eq('id', companyId as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar configuração da empresa:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro completo na atualização da empresa:', error);
    throw error;
  }
}

// =====================================================
// SERVIÇOS DE FUNCIONÁRIOS
// =====================================================

export interface EmployeeData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  hourly_rate: number;
  start_date: string;
  status: 'active' | 'inactive';
  company_id?: string;
  branch_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Buscar todos os funcionários da empresa
export async function getEmployees(companyId: string): Promise<{ data: EmployeeData[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('company_id', companyId as any)
      .order('name');

    if (error) {
      console.error('Erro ao buscar funcionários:', error);
      return { data: null, error: error.message };
    }

    return { data: data as unknown as EmployeeData[], error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar funcionários:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Criar novo funcionário
export async function createEmployee(employeeData: Omit<EmployeeData, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: EmployeeData | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert({
        ...employeeData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar funcionário:', error);
      return { data: null, error: error.message };
    }

    return { data: data as unknown as EmployeeData, error: null };
  } catch (error) {
    console.error('Erro inesperado ao criar funcionário:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Atualizar funcionário
export async function updateEmployee(employeeId: string, employeeData: Partial<EmployeeData>): Promise<{ data: EmployeeData | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .update({
        ...employeeData,
        updated_at: new Date().toISOString()
      } as any)
      .eq('id', employeeId as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar funcionário:', error);
      return { data: null, error: error.message };
    }

    return { data: data as unknown as EmployeeData, error: null };
  } catch (error) {
    console.error('Erro inesperado ao atualizar funcionário:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Deletar funcionário
export async function deleteEmployee(employeeId: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', employeeId as any);

    if (error) {
      console.error('Erro ao deletar funcionário:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Erro inesperado ao deletar funcionário:', error);
    return { error: 'Erro interno do servidor' };
  }
}

// =====================================================
// SERVIÇOS DE FILIAIS
// =====================================================

export async function createBranch(branchData: any, companyId: string) {
  const { data, error } = await supabase
    .from('branches')
    .insert({
      ...branchData,
      company_id: companyId,
      status: 'active',
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =====================================================
// SERVIÇOS DE CONSULTA
// =====================================================

export async function getUserCompanies(userId: string) {
  const { data, error } = await supabase
    .from('company_users')
    .select(`
      company_id,
      role,
      companies (*)
    `)
    .eq('user_id', userId as any);

  if (error) throw error;
  return data;
}

export async function getCompanyDetails(companyId: string) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId as any)
    .single();

  if (error) throw error;
  return data;
}

// Buscar empresas do tenant atual (para usuários que podem ter múltiplas empresas)
export async function getCompaniesForUser(userId: string): Promise<{ data: any[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('company_users')
      .select(`
        company_id,
        role,
        companies (
          id,
          name,
          cnpj,
          trade_name,
          status,
          created_at,
          updated_at,
          address,
          contact
        )
      `)
      .eq('user_id', userId as any);

    if (error) {
      console.error('Erro ao buscar empresas do usuário:', error);
      return { data: null, error: error.message };
    }

    // Transformar os dados para o formato esperado
    const companies = data?.map(item => ({
      id: item.companies?.id,
      name: item.companies?.name || item.companies?.trade_name,
      cnpj: item.companies?.cnpj || 'N/A',
      status: item.companies?.status || 'active',
      branchCount: 1, // Por enquanto, assumimos 1 filial por empresa
      employeeCount: 0, // Será calculado separadamente se necessário
      createdAt: item.companies?.created_at,
      address: item.companies?.address || {
        street: 'N/A',
        city: 'N/A',
        state: 'N/A',
        zipCode: 'N/A'
      },
      contact: item.companies?.contact || {
        email: 'N/A',
        phone: 'N/A'
      },
      role: item.role
    })) || [];

    return { data: companies, error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar empresas:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// =====================================================
// SERVIÇOS DE ESCALAS
// =====================================================

export interface ScheduleData {
  id?: string;
  name: string;
  start_date: string;
  end_date: string;
  company_id: string;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface ShiftData {
  id?: string;
  schedule_id: string;
  employee_id: string;
  start_time: string;
  end_time: string;
  date: string;
  position?: string;
  hourly_rate?: number;
  created_at?: string;
}

// Buscar todas as escalas da empresa
export async function getSchedules(companyId: string): Promise<{ data: ScheduleData[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('company_id', companyId as any)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar escalas:', error);
      return { data: null, error: error.message };
    }

    return { data: data as unknown as ScheduleData[], error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar escalas:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Criar escala com turnos
export async function createScheduleWithShifts(scheduleData: Omit<ScheduleData, 'id' | 'created_at' | 'updated_at'>, shifts: Omit<ShiftData, 'id' | 'schedule_id' | 'created_at'>[]): Promise<{ data: ScheduleData | null; error: string | null }> {
  try {
    // Criar a escala
    const { data: schedule, error: scheduleError } = await supabase
      .from('schedules')
      .insert({
        ...scheduleData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any)
      .select()
      .single();

    if (scheduleError) {
      console.error('Erro ao criar escala:', scheduleError);
      return { data: null, error: scheduleError.message };
    }

    // Criar os turnos
    if (shifts.length > 0) {
      const shiftsWithScheduleId = shifts.map(shift => ({
        ...shift,
        schedule_id: (schedule as any).id,
        created_at: new Date().toISOString()
      }));

      const { error: shiftsError } = await supabase
        .from('shifts')
        .insert(shiftsWithScheduleId as any);

      if (shiftsError) {
        console.error('Erro ao criar turnos:', shiftsError);
        // Rollback: deletar escala se falhar
        await supabase.from('schedules').delete().eq('id', (schedule as any).id);
        return { data: null, error: shiftsError.message };
      }
    }

    return { data: schedule as unknown as ScheduleData, error: null };
  } catch (error) {
    console.error('Erro inesperado ao criar escala com turnos:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Buscar turnos de uma escala
export async function getShiftsBySchedule(scheduleId: string): Promise<{ data: ShiftData[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('shifts')
      .select('*')
      .eq('schedule_id', scheduleId as any)
      .order('date, start_time');

    if (error) {
      console.error('Erro ao buscar turnos:', error);
      return { data: null, error: error.message };
    }

    return { data: data as unknown as ShiftData[], error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar turnos:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// =====================================================
// SERVIÇOS DE VALIDAÇÃO E CÁLCULO
// =====================================================

// Validar escala usando edge function
export async function validateSchedule(shifts: any[], employees: any[]): Promise<{ data: any; error: string | null }> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ shifts, employees })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao validar escala:', error);
    return { data: null, error: 'Erro ao validar escala' };
  }
}

// Calcular custo da escala usando edge function
export async function calculateScheduleCost(shifts: any[], employees: any[]): Promise<{ data: any; error: string | null }> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/calculate-schedule-cost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ shifts, employees })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao calcular custo da escala:', error);
    return { data: null, error: 'Erro ao calcular custo da escala' };
  }
}

// Sugerir escala usando edge function
export async function suggestSchedule(shifts: any[], employees: any[]): Promise<{ data: any; error: string | null }> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/suggest-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ shifts, employees })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao sugerir escala:', error);
    return { data: null, error: 'Erro ao sugerir escala' };
  }
}

// =====================================================
// SERVIÇOS DE DRAFTS DE ESCALAS (SIMULADO)
// =====================================================

export interface ScheduleDraftData {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  week_start_date: string;
  week_end_date: string;
  status: 'pending' | 'approved' | 'dismissed';
  shifts: any[];
  created_at: string;
  updated_at: string;
}

// Buscar rascunho por ID (simulado - usando schedules com status draft)
export async function getDraftById(draftId: string): Promise<{ data: ScheduleDraftData | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('id', draftId)
      .eq('status', 'draft')
      .single();

    if (error) {
      console.error('Erro ao buscar rascunho:', error);
      return { data: null, error: error.message };
    }

    // Converter para formato de draft
    const draftData: ScheduleDraftData = {
      id: data.id,
      company_id: data.company_id,
      title: data.name,
      description: data.description || '',
      week_start_date: data.date,
      week_end_date: data.date, // Simplificado
      status: 'pending',
      shifts: [],
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString()
    };

    return { data: draftData, error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar rascunho:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Aprovar rascunho e criar escala (simulado)
export async function approveDraft(draftId: string, scheduleData?: Record<string, unknown>): Promise<{ data: any; error: string | null }> {
  try {
    // Buscar o rascunho
    const { data: draft, error: draftError } = await supabase
      .from('schedules')
      .select('*')
      .eq('id', draftId)
      .eq('status', 'draft')
      .single();

    if (draftError) {
      console.error('Erro ao buscar rascunho:', draftError);
      return { data: null, error: draftError.message };
    }

    if (!draft) {
      return { data: null, error: 'Rascunho não encontrado' };
    }

    // Atualizar status para published
    const { data: schedule, error: scheduleError } = await supabase
      .from('schedules')
      .update({ 
        status: 'published',
        ...scheduleData
      })
      .eq('id', draftId)
      .select()
      .single();

    if (scheduleError) {
      console.error('Erro ao aprovar rascunho:', scheduleError);
      return { data: null, error: scheduleError.message };
    }

    return { data: schedule, error: null };
  } catch (error) {
    console.error('Erro inesperado ao aprovar rascunho:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Descartar rascunho (simulado)
export async function dismissDraft(draftId: string): Promise<{ data: any; error: string | null }> {
  try {
    const { error } = await supabase
      .from('schedules')
      .update({ status: 'archived' })
      .eq('id', draftId)
      .eq('status', 'draft');

    if (error) {
      console.error('Erro ao descartar rascunho:', error);
      return { data: null, error: error.message };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Erro inesperado ao descartar rascunho:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Serviço de drafts para compatibilidade
export const scheduleDraftService = {
  getDraftById,
  approveDraft,
  dismissDraft
};

// =====================================================
// SERVIÇOS DE COMPLIANCE
// =====================================================

export interface ComplianceData {
  schedules: any[];
  employees: any[];
  violations: ComplianceViolation[];
  statistics: ComplianceStatistics;
}

export interface ComplianceViolation {
  id: string;
  type: 'overtime' | 'rest_period' | 'weekly_limit' | 'holiday_work' | 'night_shift';
  severity: 'low' | 'medium' | 'high' | 'critical';
  employee_id: string;
  employee_name: string;
  schedule_id: string;
  schedule_name: string;
  description: string;
  date: string;
  hours_worked?: number;
  hours_limit?: number;
  rest_period_hours?: number;
  required_rest_hours?: number;
}

export interface ComplianceStatistics {
  total_violations: number;
  critical_violations: number;
  high_violations: number;
  medium_violations: number;
  low_violations: number;
  compliance_rate: number;
  total_employees: number;
  total_schedules: number;
  total_hours_worked: number;
  average_hours_per_employee: number;
}

// Buscar dados de compliance para um tenant
export async function getComplianceData(tenantId: string): Promise<{ data: ComplianceData | null; error: string | null }> {
  try {
    if (!tenantId) {
      return { 
        data: { 
          schedules: [], 
          employees: [], 
          violations: [],
          statistics: {
            total_violations: 0,
            critical_violations: 0,
            high_violations: 0,
            medium_violations: 0,
            low_violations: 0,
            compliance_rate: 100,
            total_employees: 0,
            total_schedules: 0,
            total_hours_worked: 0,
            average_hours_per_employee: 0
          }
        }, 
        error: null 
      };
    }

    // Busca todas as escalas e os seus respetivos turnos (shifts)
    const { data: schedules, error: schedulesError } = await supabase
      .from('schedules')
      .select('*, shifts(*)')
      .eq('company_id', tenantId)
      .eq('status', 'published');

    if (schedulesError) {
      console.error('Erro ao buscar escalas:', schedulesError);
      return { data: null, error: schedulesError.message };
    }

    // Busca todos os funcionários para cruzar informações
    const { data: employees, error: employeesError } = await supabase
      .from('employees')
      .select('*')
      .eq('company_id', tenantId);
    
    if (employeesError) {
      console.error('Erro ao buscar funcionários:', employeesError);
      return { data: null, error: employeesError.message };
    }

    // Analisar compliance e gerar violações
    const violations = analyzeComplianceViolations(schedules || [], employees || []);
    
    // Calcular estatísticas
    const statistics = calculateComplianceStatistics(schedules || [], employees || [], violations);

    return {
      data: {
        schedules: schedules || [],
        employees: employees || [],
        violations,
        statistics
      },
      error: null
    };

  } catch (error) {
    console.error('Erro inesperado ao buscar dados de compliance:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Analisar violações de compliance
function analyzeComplianceViolations(schedules: any[], employees: any[]): ComplianceViolation[] {
  const violations: ComplianceViolation[] = [];
  
  // Criar mapa de funcionários para acesso rápido
  const employeeMap = new Map(employees.map(emp => [emp.id, emp]));

  schedules.forEach(schedule => {
    if (!schedule.shifts) return;

    schedule.shifts.forEach((shift: any) => {
      const employee = employeeMap.get(shift.employee_id);
      if (!employee) return;

      // Verificar horas extras (mais de 8 horas por dia)
      const shiftHours = calculateShiftHours(shift.start_time, shift.end_time);
      if (shiftHours > 8) {
        violations.push({
          id: `overtime_${shift.id}`,
          type: 'overtime',
          severity: shiftHours > 12 ? 'critical' : shiftHours > 10 ? 'high' : 'medium',
          employee_id: shift.employee_id,
          employee_name: employee.name,
          schedule_id: schedule.id,
          schedule_name: schedule.name,
          description: `Funcionário trabalhou ${shiftHours} horas em um único turno (limite: 8h)`,
          date: shift.date,
          hours_worked: shiftHours,
          hours_limit: 8
        });
      }

      // Verificar período de descanso (menos de 11 horas entre turnos)
      const restViolations = checkRestPeriodViolations(schedule.shifts, shift, employee);
      violations.push(...restViolations);

      // Verificar limite semanal (mais de 44 horas por semana)
      const weeklyViolations = checkWeeklyLimitViolations(schedule.shifts, shift, employee);
      violations.push(...weeklyViolations);
    });
  });

  return violations;
}

// Calcular horas de um turno
function calculateShiftHours(startTime: string, endTime: string): number {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  // Se o turno passa da meia-noite
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }
  
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

// Verificar violações de período de descanso
function checkRestPeriodViolations(shifts: any[], currentShift: any, employee: any): ComplianceViolation[] {
  const violations: ComplianceViolation[] = [];
  
  // Encontrar turnos consecutivos do mesmo funcionário
  const employeeShifts = shifts.filter(s => s.employee_id === employee.id);
  
  for (let i = 0; i < employeeShifts.length - 1; i++) {
    const current = employeeShifts[i];
    const next = employeeShifts[i + 1];
    
    const restHours = calculateRestPeriod(current.end_time, next.start_time, current.date, next.date);
    
    if (restHours < 11) {
      violations.push({
        id: `rest_${current.id}_${next.id}`,
        type: 'rest_period',
        severity: restHours < 8 ? 'critical' : restHours < 10 ? 'high' : 'medium',
        employee_id: employee.id,
        employee_name: employee.name,
        schedule_id: current.schedule_id,
        schedule_name: 'Escala Semanal',
        description: `Período de descanso insuficiente: ${restHours.toFixed(1)}h (mínimo: 11h)`,
        date: next.date,
        rest_period_hours: restHours,
        required_rest_hours: 11
      });
    }
  }
  
  return violations;
}

// Calcular período de descanso entre turnos
function calculateRestPeriod(endTime1: string, startTime2: string, date1: string, date2: string): number {
  const end1 = new Date(`${date1}T${endTime1}`);
  const start2 = new Date(`${date2}T${startTime2}`);
  
  return (start2.getTime() - end1.getTime()) / (1000 * 60 * 60);
}

// Verificar violações de limite semanal
function checkWeeklyLimitViolations(shifts: any[], currentShift: any, employee: any): ComplianceViolation[] {
  const violations: ComplianceViolation[] = [];
  
  // Calcular horas trabalhadas na semana
  const weekStart = new Date(currentShift.date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Domingo
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // Sábado
  
  const weeklyShifts = shifts.filter(s => {
    const shiftDate = new Date(s.date);
    return s.employee_id === employee.id && 
           shiftDate >= weekStart && 
           shiftDate <= weekEnd;
  });
  
  const weeklyHours = weeklyShifts.reduce((total, shift) => {
    return total + calculateShiftHours(shift.start_time, shift.end_time);
  }, 0);
  
  if (weeklyHours > 44) {
    violations.push({
      id: `weekly_${employee.id}_${currentShift.date}`,
      type: 'weekly_limit',
      severity: weeklyHours > 50 ? 'critical' : weeklyHours > 46 ? 'high' : 'medium',
      employee_id: employee.id,
      employee_name: employee.name,
      schedule_id: currentShift.schedule_id,
      schedule_name: 'Escala Semanal',
      description: `Limite semanal excedido: ${weeklyHours.toFixed(1)}h (limite: 44h)`,
      date: currentShift.date,
      hours_worked: weeklyHours,
      hours_limit: 44
    });
  }
  
  return violations;
}

// Calcular estatísticas de compliance
function calculateComplianceStatistics(schedules: any[], employees: any[], violations: ComplianceViolation[]): ComplianceStatistics {
  const totalViolations = violations.length;
  const criticalViolations = violations.filter(v => v.severity === 'critical').length;
  const highViolations = violations.filter(v => v.severity === 'high').length;
  const mediumViolations = violations.filter(v => v.severity === 'medium').length;
  const lowViolations = violations.filter(v => v.severity === 'low').length;
  
  const totalEmployees = employees.length;
  const totalSchedules = schedules.length;
  
  // Calcular total de horas trabalhadas
  const totalHoursWorked = schedules.reduce((total, schedule) => {
    if (!schedule.shifts) return total;
    return total + schedule.shifts.reduce((shiftTotal: number, shift: any) => {
      return shiftTotal + calculateShiftHours(shift.start_time, shift.end_time);
    }, 0);
  }, 0);
  
  const averageHoursPerEmployee = totalEmployees > 0 ? totalHoursWorked / totalEmployees : 0;
  
  // Calcular taxa de compliance (100% - % de violações)
  const complianceRate = totalEmployees > 0 ? 
    Math.max(0, 100 - (totalViolations / (totalEmployees * 4)) * 100) : 100; // 4 semanas por mês
  
  return {
    total_violations: totalViolations,
    critical_violations: criticalViolations,
    high_violations: highViolations,
    medium_violations: mediumViolations,
    low_violations: lowViolations,
    compliance_rate: Math.round(complianceRate * 100) / 100,
    total_employees: totalEmployees,
    total_schedules: totalSchedules,
    total_hours_worked: Math.round(totalHoursWorked * 100) / 100,
    average_hours_per_employee: Math.round(averageHoursPerEmployee * 100) / 100
  };
}

// =====================================================
// SERVIÇOS DE ONBOARDING E IA
// =====================================================

interface EmployeeForAI {
  id: string;
  name: string;
  position: string;
  hourly_rate: number;
  workload: number;
}

interface ShiftToFill {
  id: string;
  date: string;
  requiredSkill: string;
  startTime?: string;
  endTime?: string;
}

interface FirstScheduleData {
  schedule: {
    name: string;
    start_date: string;
    end_date: string;
    company_id: string;
    status: string;
  };
  shifts: {
    employee_id: string;
    start_time: string;
    end_time: string;
    date: string;
    position: string;
    hourly_rate: number;
  }[];
}

// Gerar a primeira escala usando IA
export async function generateFirstDraftSchedule(tenantId: string, employees: EmployeeForAI[]): Promise<{ data: FirstScheduleData | null; error: string | null }> {
  try {
    if (!tenantId || !employees || employees.length === 0) {
      throw new Error("Dados insuficientes para gerar a primeira escala.");
    }

    console.log('🤖 Iniciando geração da primeira escala com IA...');
    console.log('👥 Funcionários:', employees.length);
    console.log('🏢 Tenant ID:', tenantId);

    // 1. Criar turnos placeholder para a próxima semana
    const shiftsToFill: ShiftToFill[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Começar amanhã
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // 7 dias total

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Turno da manhã (8h-16h)
      shiftsToFill.push({ 
        id: `morning_${i}`, 
        date: dateStr, 
        requiredSkill: 'any',
        startTime: '08:00',
        endTime: '16:00'
      });
      
      // Turno da tarde (16h-00h)
      shiftsToFill.push({ 
        id: `evening_${i}`, 
        date: dateStr, 
        requiredSkill: 'any',
        startTime: '16:00',
        endTime: '00:00'
      });
    }

    console.log('📅 Turnos criados:', shiftsToFill.length);

    // 2. Preparar dados para a IA
    const aiInput = {
      employees: employees.map(e => ({ 
        id: e.id, 
        name: e.name, 
        position: e.position,
        hourly_rate: e.hourly_rate,
        workload: e.workload || 44 
      })),
      shiftsToFill: shiftsToFill,
      rules: [
        "Distribua os funcionários de forma equilibrada",
        "Respeite a carga horária de 44h semanais",
        "Priorize funcionários com experiência no cargo",
        "Evite turnos consecutivos para o mesmo funcionário"
      ]
    };

    console.log('🧠 Chamando IA para sugestão...');

    // 3. Chamar a função de sugestão de IA
    const { data: aiSuggestion, error: aiError } = await supabase.functions.invoke('suggest-schedule', {
      body: aiInput
    });

    if (aiError) {
      console.error('❌ Erro na IA:', aiError);
      // Se a IA falhar, criar uma escala básica manualmente
      return generateBasicSchedule(tenantId, employees, startDate, endDate);
    }

    console.log('✅ Sugestão da IA recebida:', aiSuggestion);

    // 4. Processar a sugestão da IA
    const processedShifts = processAISuggestion(aiSuggestion, employees, shiftsToFill);

    // 5. Criar a estrutura da escala
    const scheduleData: FirstScheduleData = {
      schedule: {
        name: "Primeira Escala - Gerada por IA",
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        company_id: tenantId,
        status: 'draft'
      },
      shifts: processedShifts
    };

    console.log('📋 Escala processada:', scheduleData);

    return { data: scheduleData, error: null };

  } catch (error) {
    console.error('❌ Erro ao gerar primeira escala:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Erro interno do servidor' };
  }
}

// Gerar escala básica caso a IA falhe
function generateBasicSchedule(tenantId: string, employees: EmployeeForAI[], startDate: Date, endDate: Date): { data: FirstScheduleData | null; error: string | null } {
  try {
    const shifts: any[] = [];
    let employeeIndex = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Alternar entre manhã e tarde
      const isMorning = i % 2 === 0;
      
      employees.forEach((employee, index) => {
        if (index % 2 === (isMorning ? 0 : 1)) {
          shifts.push({
            employee_id: employee.id,
            start_time: isMorning ? '08:00' : '16:00',
            end_time: isMorning ? '16:00' : '00:00',
            date: dateStr,
            position: employee.position,
            hourly_rate: employee.hourly_rate
          });
        }
      });
    }

    return {
      data: {
        schedule: {
          name: "Primeira Escala - Básica",
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          company_id: tenantId,
          status: 'draft'
        },
        shifts
      },
      error: null
    };
  } catch (error) {
    return { data: null, error: 'Erro ao gerar escala básica' };
  }
}

// Processar sugestão da IA
function processAISuggestion(aiSuggestion: any, employees: EmployeeForAI[], shiftsToFill: ShiftToFill[]): any[] {
  try {
    const shifts: any[] = [];
    
    if (aiSuggestion && aiSuggestion.assignments) {
      aiSuggestion.assignments.forEach((assignment: any) => {
        const employee = employees.find(emp => emp.id === assignment.employeeId);
        const shift = shiftsToFill.find(s => s.id === assignment.shiftId);
        
        if (employee && shift) {
          shifts.push({
            employee_id: employee.id,
            start_time: shift.startTime || '08:00',
            end_time: shift.endTime || '16:00',
            date: shift.date,
            position: employee.position,
            hourly_rate: employee.hourly_rate
          });
        }
      });
    }

    return shifts;
  } catch (error) {
    console.error('Erro ao processar sugestão da IA:', error);
    return [];
  }
}