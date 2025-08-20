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

export async function createCompanyForUser(userId: string, companyData: CompanyData) {
  try {
    // 1. Criar a empresa
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyData.name,
        cnpj: `TEMP_${Date.now()}`, // CNPJ temporário, será atualizado no setup
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
      companies (
        id,
        name,
        status,
        created_at
      )
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

 