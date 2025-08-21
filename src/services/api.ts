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

 