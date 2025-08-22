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

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  position: string;
  department?: string;
  status?: string;
  start_date: string;
  end_date?: string;
  salary?: number;
  skills?: string[];
  avatar?: string;
  address?: any;
  workload_hours?: number;
  company_id: string;
  branch_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEmployeeData {
  name: string;
  email: string;
  phone_number?: string;
  position: string;
  department?: string;
  status?: string;
  start_date: string;
  salary?: number;
  skills?: string[];
  address?: any;
  workload_hours?: number;
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: string;
}

// Buscar todos os funcionários da empresa
export async function getEmployees(companyId: string): Promise<{ data: Employee[] | null; error: string | null }> {
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

    return { data: data as any, error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar funcionários:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Criar novo funcionário
export async function createEmployee(employeeData: CreateEmployeeData, companyId: string): Promise<{ data: Employee | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert({
        ...employeeData,
        company_id: companyId,
        status: employeeData.status || 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar funcionário:', error);
      return { data: null, error: error.message };
    }

    return { data: data as any, error: null };
  } catch (error) {
    console.error('Erro inesperado ao criar funcionário:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Atualizar funcionário
export async function updateEmployee(employeeData: UpdateEmployeeData): Promise<{ data: Employee | null; error: string | null }> {
  try {
    const { id, ...updateData } = employeeData;
    
    const { data, error } = await supabase
      .from('employees')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      } as any)
      .eq('id', id as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar funcionário:', error);
      return { data: null, error: error.message };
    }

    return { data: data as any, error: null };
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

// =====================================================
// SERVIÇOS DE ESCALAS
// =====================================================

export interface Schedule {
  id: string;
  name: string;
  date: string;
  description?: string;
  notes?: string;
  status?: string;
  total_cost?: number;
  total_hours?: number;
  company_id: string;
  branch_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Shift {
  id: string;
  employee_id: string;
  schedule_id: string;
  start_time: string;
  end_time: string;
  hours_worked?: number;
  cost?: number;
  notes?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateScheduleData {
  name: string;
  date: string;
  description?: string;
  notes?: string;
  shifts: Omit<Shift, 'id' | 'schedule_id' | 'created_at' | 'updated_at'>[];
}

export interface ScheduleWithShifts extends Schedule {
  shifts: Shift[];
}

// Buscar todas as escalas da empresa
export async function getSchedules(companyId: string): Promise<{ data: ScheduleWithShifts[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        shifts (*)
      `)
      .eq('company_id', companyId as any)
      .order('date', { ascending: false });

    if (error) {
      console.error('Erro ao buscar escalas:', error);
      return { data: null, error: error.message };
    }

    return { data: data as any, error: null };
  } catch (error) {
    console.error('Erro inesperado ao buscar escalas:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Criar escala com turnos
export async function createScheduleWithShifts(scheduleData: CreateScheduleData, companyId: string): Promise<{ data: ScheduleWithShifts | null; error: string | null }> {
  try {
    // Primeiro, criar a escala
    const { data: schedule, error: scheduleError } = await supabase
      .from('schedules')
      .insert({
        name: scheduleData.name,
        date: scheduleData.date,
        description: scheduleData.description,
        notes: scheduleData.notes,
        status: 'draft',
        company_id: companyId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any)
      .select()
      .single();

    if (scheduleError) {
      console.error('Erro ao criar escala:', scheduleError);
      return { data: null, error: scheduleError.message };
    }

    // Depois, criar os turnos
    if (scheduleData.shifts.length > 0) {
      const shiftsToInsert = scheduleData.shifts.map(shift => ({
        ...shift,
        schedule_id: (schedule as any).id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error: shiftsError } = await supabase
        .from('shifts')
        .insert(shiftsToInsert as any);

      if (shiftsError) {
        console.error('Erro ao criar turnos:', shiftsError);
        // Rollback: deletar a escala se falhar ao criar turnos
        await supabase.from('schedules').delete().eq('id', (schedule as any).id as any);
        return { data: null, error: shiftsError.message };
      }
    }

    // Buscar a escala completa com turnos
    const { data: completeSchedule, error: fetchError } = await supabase
      .from('schedules')
      .select(`
        *,
        shifts (*)
      `)
      .eq('id', (schedule as any).id as any)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar escala criada:', fetchError);
      return { data: null, error: fetchError.message };
    }

    return { data: completeSchedule as any, error: null };
  } catch (error) {
    console.error('Erro inesperado ao criar escala:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Atualizar escala
export async function updateSchedule(scheduleId: string, updateData: Partial<Schedule>): Promise<{ data: Schedule | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      } as any)
      .eq('id', scheduleId as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar escala:', error);
      return { data: null, error: error.message };
    }

    return { data: data as any, error: null };
  } catch (error) {
    console.error('Erro inesperado ao atualizar escala:', error);
    return { data: null, error: 'Erro interno do servidor' };
  }
}

// Deletar escala
export async function deleteSchedule(scheduleId: string): Promise<{ error: string | null }> {
  try {
    // Primeiro deletar os turnos
    const { error: shiftsError } = await supabase
      .from('shifts')
      .delete()
      .eq('schedule_id', scheduleId as any);

    if (shiftsError) {
      console.error('Erro ao deletar turnos:', shiftsError);
      return { error: shiftsError.message };
    }

    // Depois deletar a escala
    const { error: scheduleError } = await supabase
      .from('schedules')
      .delete()
      .eq('id', scheduleId as any);

    if (scheduleError) {
      console.error('Erro ao deletar escala:', scheduleError);
      return { error: scheduleError.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Erro inesperado ao deletar escala:', error);
    return { error: 'Erro interno do servidor' };
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

 