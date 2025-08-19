import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  role: 'owner' | 'manager' | 'employee';
  tenant_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserProfileDto {
  id: string;
  role?: 'owner' | 'manager' | 'employee';
  tenant_id?: string;
}

export interface UpdateUserProfileDto {
  role?: 'owner' | 'manager' | 'employee';
  tenant_id?: string;
}

export class UserProfileService {
  private tableName = 'user_profiles';

  async getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido ao buscar perfil do usuário' 
      };
    }
  }

  async createUserProfile(profile: CreateUserProfileDto): Promise<{ data: UserProfile | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert({
          id: profile.id,
          role: profile.role || 'employee',
          tenant_id: profile.tenant_id
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido ao criar perfil do usuário' 
      };
    }
  }

  async updateUserProfile(userId: string, updates: UpdateUserProfileDto): Promise<{ data: UserProfile | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar perfil do usuário' 
      };
    }
  }

  async updateUserRole(userId: string, role: 'owner' | 'manager' | 'employee'): Promise<{ data: UserProfile | null; error: string | null }> {
    return this.updateUserProfile(userId, { role });
  }

  async listUsersWithRoles(): Promise<{ data: Array<{ email: string; role: string; created_at: string }> | null; error: string | null }> {
    try {
      // Usar a função SQL que criamos
      const { data, error } = await supabase.rpc('list_users_with_roles');

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido ao listar usuários' 
      };
    }
  }

  async getCurrentUserRole(): Promise<{ data: string | null; error: string | null }> {
    try {
      const { data, error } = await supabase.rpc('get_current_user_role');

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erro desconhecido ao obter role do usuário' 
      };
    }
  }
}

export const userProfileService = new UserProfileService();
