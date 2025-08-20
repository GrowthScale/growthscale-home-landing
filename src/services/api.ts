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
    // Calcula a data de fim do trial (14 dias a partir de agora)
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);

    // 1. Criar a empresa
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyData.name,
        cnpj: `TEMP_${Date.now()}`, // CNPJ temporário, será atualizado no setup
        trade_name: companyData.name,
        status: 'active',
        plan: 'free', // Começa no plano 'free'
        subscription_status: 'trialing', // Mas com o status de 'trialing'
        trial_ends_at: trialEndDate.toISOString(), // Define a data de fim
        address: {},
        contact: {
          email: companyData.companyEmail,
          phone: '',
        },
        settings: {
          employee_count: companyData.employeeCount,
          owner_name: companyData.fullName,
        }
      } as any)
      .select()
      .single();

    if (companyError) {
      console.error('Erro ao criar empresa:', companyError);
      throw companyError;
    }

    // 2. Criar relacionamento company_users (owner)
    const { error: companyUserError } = await supabase
      .from('company_users')
      .insert({
        user_id: userId,
        company_id: (company as any).id,
        role: 'owner'
      } as any);

    if (companyUserError) {
      console.error('Erro ao criar relacionamento company_users:', companyUserError);
      // Rollback: deletar empresa se falhar
      await supabase.from('companies').delete().eq('id', (company as any).id);
      throw companyUserError;
    }

    return company;
  } catch (error) {
    console.error('Erro completo na criação da empresa:', error);
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

export async function createEmployee(employeeData: any, companyId: string) {
  const { data, error } = await supabase
    .from('employees')
    .insert({
      ...employeeData,
      company_id: companyId,
      status: 'active',
      start_date: new Date().toISOString().split('T')[0],
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data;
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

 