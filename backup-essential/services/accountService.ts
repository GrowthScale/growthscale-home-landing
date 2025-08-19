import { supabase } from '@/lib/supabase';

export interface DeleteAccountRequest {
  reason?: string;
  permanent?: boolean;
}

export interface UserDataExport {
  user: {
    id: string;
    email: string;
    created_at: string;
    user_metadata: Record<string, unknown>;
  };
  companies: Array<{
    id: string;
    name: string;
    email: string;
    created_at: string;
  }>;
  employees: Array<{
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
    created_at: string;
  }>;
  schedules: Array<{
    id: string;
    date: string;
    status: string;
    created_at: string;
  }>;
  communication_logs: Array<{
    id: string;
    type: string;
    recipient: string;
    status: string;
    created_at: string;
  }>;
}

export class AccountService {
  /**
   * Exporta todos os dados do usuário em formato JSON
   */
  static async exportUserData(): Promise<UserDataExport> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuário não autenticado');
      }

      // Buscar dados do usuário
      const userData = {
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        user_metadata: user.user_metadata || {}
      };

      // Buscar empresas do usuário
      const { data: companies } = await supabase
        .from('companies')
        .select('id, name, email, created_at')
        .eq('owner_id', user.id);

      // Buscar funcionários
      const { data: employees } = await supabase
        .from('employees')
        .select('id, name, email, position, department, created_at')
        .eq('created_by', user.id);

      // Buscar escalas
      const { data: schedules } = await supabase
        .from('schedules')
        .select('id, date, status, created_at')
        .eq('created_by', user.id);

      // Buscar logs de comunicação
      const { data: communication_logs } = await supabase
        .from('communication_logs')
        .select('id, type, recipient, status, created_at')
        .eq('user_id', user.id);

      return {
        user: userData,
        companies: companies || [],
        employees: employees || [],
        schedules: schedules || [],
        communication_logs: communication_logs || []
      };
    } catch (error) {
      console.error('Erro ao exportar dados do usuário:', error);
      throw new Error('Falha ao exportar dados do usuário');
    }
  }

  /**
   * Solicita a exclusão da conta do usuário
   */
  static async deleteAccount(request: DeleteAccountRequest): Promise<{ success: boolean; message: string }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuário não autenticado');
      }

      // Chamar a Edge Function para exclusão
      const { data, error } = await supabase.functions.invoke('delete-user-account', {
        body: {
          user: {
            id: user.id,
            email: user.email || ''
          },
          reason: request.reason,
          permanent: request.permanent || false
        }
      });

      if (error) {
        console.error('Erro na Edge Function:', error);
        throw new Error(error.message || 'Erro ao excluir conta');
      }

      if (data?.success) {
        // Fazer logout após exclusão bem-sucedida
        await supabase.auth.signOut();
        return {
          success: true,
          message: data.message || 'Conta excluída com sucesso'
        };
      } else {
        throw new Error(data?.error || 'Erro desconhecido ao excluir conta');
      }
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      throw new Error(error instanceof Error ? error.message : 'Falha ao excluir conta');
    }
  }

  /**
   * Atualiza as configurações de privacidade do usuário
   */
  static async updatePrivacySettings(settings: {
    dataRetention?: number;
    marketingEmails?: boolean;
    analyticsTracking?: boolean;
  }): Promise<{ success: boolean }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuário não autenticado');
      }

      // Atualizar configurações na tabela de usuários ou user_metadata
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          data_retention_days: settings.dataRetention || 30,
          marketing_emails: settings.marketingEmails || false,
          analytics_tracking: settings.analyticsTracking || false,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw new Error('Erro ao atualizar configurações de privacidade');
      }

      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar configurações de privacidade:', error);
      throw new Error(error instanceof Error ? error.message : 'Falha ao atualizar configurações');
    }
  }

  /**
   * Solicita a anonimização dos dados do usuário (em vez de exclusão completa)
   */
  static async anonymizeUserData(): Promise<{ success: boolean; message: string }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuário não autenticado');
      }

      // Anonimizar dados pessoais mantendo a estrutura
      const { error: employeesError } = await supabase
        .from('employees')
        .update({
          name: 'Usuário Anonimizado',
          email: `anon_${user.id}@deleted.com`,
          phone: null,
          address: null,
          updated_at: new Date().toISOString()
        })
        .eq('created_by', user.id);

      if (employeesError) {
        console.error('Erro ao anonimizar funcionários:', employeesError);
      }

      // Anonimizar dados da empresa
      const { error: companiesError } = await supabase
        .from('companies')
        .update({
          name: 'Empresa Anonimizada',
          email: `anon_company_${user.id}@deleted.com`,
          phone: null,
          address: null,
          updated_at: new Date().toISOString()
        })
        .eq('owner_id', user.id);

      if (companiesError) {
        console.error('Erro ao anonimizar empresas:', companiesError);
      }

      // Log da anonimização
      const { error: auditError } = await supabase
        .from('audit_logs')
        .insert({
          action: 'USER_DATA_ANONYMIZATION',
          user_id: user.id,
          user_email: user.email || '',
          details: {
            timestamp: new Date().toISOString(),
            anonymized_tables: ['employees', 'companies']
          }
        });

      if (auditError) {
        console.error('Erro ao registrar log de anonimização:', auditError);
      }

      return {
        success: true,
        message: 'Dados anonimizados com sucesso'
      };
    } catch (error) {
      console.error('Erro ao anonimizar dados:', error);
      throw new Error(error instanceof Error ? error.message : 'Falha ao anonimizar dados');
    }
  }

  /**
   * Verifica se o usuário tem dados que podem ser exportados
   */
  static async hasUserData(): Promise<{
    hasCompanies: boolean;
    hasEmployees: boolean;
    hasSchedules: boolean;
    hasLogs: boolean;
  }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuário não autenticado');
      }

      // Verificar cada tipo de dado
      const [companies, employees, schedules, logs] = await Promise.all([
        supabase.from('companies').select('id').eq('owner_id', user.id).limit(1),
        supabase.from('employees').select('id').eq('created_by', user.id).limit(1),
        supabase.from('schedules').select('id').eq('created_by', user.id).limit(1),
        supabase.from('communication_logs').select('id').eq('user_id', user.id).limit(1)
      ]);

      return {
        hasCompanies: (companies.data?.length || 0) > 0,
        hasEmployees: (employees.data?.length || 0) > 0,
        hasSchedules: (schedules.data?.length || 0) > 0,
        hasLogs: (logs.data?.length || 0) > 0
      };
    } catch (error) {
      console.error('Erro ao verificar dados do usuário:', error);
      return {
        hasCompanies: false,
        hasEmployees: false,
        hasSchedules: false,
        hasLogs: false
      };
    }
  }
}
