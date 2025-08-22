import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface SetupData {
  companyName: string;
  cnpj?: string;
  userRole: 'owner' | 'admin' | 'manager';
  setupCompleted: boolean;
}

export interface SetupResult {
  success: boolean;
  error?: string;
  companyId?: string;
  data?: any;
}

/**
 * Configura automaticamente uma empresa para um usuário novo
 */
export async function autoSetupUserCompany(user: User, setupData: SetupData): Promise<SetupResult> {
  try {
    console.log('🚀 Iniciando setup automático para usuário:', user.id);
    
    // 1. Verificar se usuário já tem empresa
    const { data: existingCompany } = await supabase
      .from('company_users')
      .select('company_id, companies(*)')
      .eq('user_id', user.id)
      .single();

    if (existingCompany) {
      console.log('✅ Usuário já tem empresa configurada');
      return {
        success: true,
        companyId: existingCompany.company_id,
        data: existingCompany
      };
    }

    // 2. Criar nova empresa
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: setupData.companyName,
        trade_name: setupData.companyName,
        cnpj: setupData.cnpj || `TEMP_${Date.now()}`,
        status: 'active',
        contact: {
          email: user.email,
          phone: ''
        },
        settings: {
          setup_completed: setupData.setupCompleted,
          plan: 'free',
          subscription_status: 'trialing'
        }
      })
      .select()
      .single();

    if (companyError) {
      console.error('❌ Erro ao criar empresa:', companyError);
      return {
        success: false,
        error: companyError.message
      };
    }

    console.log('✅ Empresa criada:', company);

    // 3. Associar usuário à empresa
    const { error: userCompanyError } = await supabase
      .from('company_users')
      .insert({
        user_id: user.id,
        company_id: company.id,
        role: setupData.userRole
      });

    if (userCompanyError) {
      console.error('❌ Erro ao associar usuário:', userCompanyError);
      // Rollback: deletar empresa criada
      await supabase.from('companies').delete().eq('id', company.id);
      return {
        success: false,
        error: userCompanyError.message
      };
    }

    console.log('✅ Usuário associado à empresa');

    // 4. Criar dados de exemplo (opcional)
    if (setupData.setupCompleted) {
      await createSampleData(company.id);
    }

    return {
      success: true,
      companyId: company.id,
      data: company
    };

  } catch (error) {
    console.error('💥 Erro no setup automático:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

/**
 * Criar dados de exemplo para nova empresa
 */
async function createSampleData(companyId: string): Promise<void> {
  try {
    console.log('📝 Criando dados de exemplo...');

    // Criar funcionário de exemplo
    await supabase
      .from('employees')
      .insert({
        name: 'Funcionário Exemplo',
        email: 'exemplo@empresa.com',
        position: 'Atendente',
        department: 'Atendimento',
        status: 'active',
        start_date: new Date().toISOString().split('T')[0],
        company_id: companyId,
        salary: 1500,
        workload_hours: 8
      });

    console.log('✅ Dados de exemplo criados');
  } catch (error) {
    console.warn('⚠️ Erro ao criar dados de exemplo:', error);
    // Não falhar o setup por conta disso
  }
}

/**
 * Verificar se usuário precisa de setup
 */
export async function checkUserNeedsSetup(userId: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('company_users')
      .select('company_id')
      .eq('user_id', userId)
      .single();

    return !data; // Precisa de setup se não tem empresa
  } catch (error) {
    console.error('Erro ao verificar setup:', error);
    return true; // Em caso de erro, assumir que precisa de setup
  }
}

/**
 * Hook para usar o setup wizard
 */
export function useSetupWizard() {
  const setupUser = async (user: User, setupData: SetupData) => {
    return autoSetupUserCompany(user, setupData);
  };

  const checkSetup = async (userId: string) => {
    return checkUserNeedsSetup(userId);
  };

  return {
    setupUser,
    checkSetup
  };
}
