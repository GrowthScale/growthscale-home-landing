// =====================================================
// AUDIT LOGGING - GROWTHSCALE
// Sistema de logs detalhados para compliance e segurança
// =====================================================

import { supabase } from './supabase';

export interface AuditLogEntry {
  id?: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  company_id?: string;
}

export interface AuditLogFilter {
  user_id?: string;
  action?: string;
  resource_type?: string;
  severity?: string;
  start_date?: string;
  end_date?: string;
  company_id?: string;
}

// Ações auditáveis
export const AUDIT_ACTIONS = {
  // Autenticação
  LOGIN: 'user.login',
  LOGOUT: 'user.logout',
  LOGIN_FAILED: 'user.login_failed',
  PASSWORD_CHANGE: 'user.password_change',
  PASSWORD_RESET: 'user.password_reset',
  TWO_FACTOR_ENABLE: 'user.2fa_enable',
  TWO_FACTOR_DISABLE: 'user.2fa_disable',
  
  // Usuários
  USER_CREATE: 'user.create',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  USER_ROLE_CHANGE: 'user.role_change',
  
  // Empresas
  COMPANY_CREATE: 'company.create',
  COMPANY_UPDATE: 'company.update',
  COMPANY_DELETE: 'company.delete',
  
  // Funcionários
  EMPLOYEE_CREATE: 'employee.create',
  EMPLOYEE_UPDATE: 'employee.update',
  EMPLOYEE_DELETE: 'employee.delete',
  EMPLOYEE_STATUS_CHANGE: 'employee.status_change',
  
  // Escalas
  SCHEDULE_CREATE: 'schedule.create',
  SCHEDULE_UPDATE: 'schedule.update',
  SCHEDULE_DELETE: 'schedule.delete',
  SCHEDULE_APPROVE: 'schedule.approve',
  SCHEDULE_REJECT: 'schedule.reject',
  
  // Configurações
  SETTINGS_UPDATE: 'settings.update',
  INTEGRATION_UPDATE: 'integration.update',
  
  // Compliance
  COMPLIANCE_CHECK: 'compliance.check',
  COMPLIANCE_VIOLATION: 'compliance.violation',
  
  // Billing
  BILLING_UPDATE: 'billing.update',
  PAYMENT_PROCESSED: 'billing.payment_processed',
  PAYMENT_FAILED: 'billing.payment_failed',
  
  // Sistema
  SYSTEM_BACKUP: 'system.backup',
  SYSTEM_MAINTENANCE: 'system.maintenance',
  SYSTEM_ERROR: 'system.error'
} as const;

// Recursos auditáveis
export const AUDIT_RESOURCES = {
  USER: 'user',
  COMPANY: 'company',
  EMPLOYEE: 'employee',
  SCHEDULE: 'schedule',
  SETTINGS: 'settings',
  INTEGRATION: 'integration',
  BILLING: 'billing',
  SYSTEM: 'system'
} as const;

// Severidades
export const AUDIT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

class AuditLogger {
  private static instance: AuditLogger;
  
  private constructor() {}
  
  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }
  
  /**
   * Registra uma entrada no audit log
   */
  async log(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<{ success: boolean; error?: string }> {
    try {
      const fullEntry: AuditLogEntry = {
        ...entry,
        timestamp: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('audit_logs')
        .insert(fullEntry);
      
      if (error) {
        console.error('Audit log error:', error);
        return { success: false, error: error.message };
      }
      
      // Log local para debugging
      if (process.env.NODE_ENV === 'development') {
        if (process.env.NODE_ENV === 'development') { console.log('🔍 AUDIT LOG:', {
          action: entry.action,
          user: entry.user_id,
          resource: `${entry.resource_type}${entry.resource_id ? `:${entry.resource_id}` : ''}`,
          severity: entry.severity,
          timestamp: fullEntry.timestamp
        }); }
      }
      
      return { success: true };
    } catch (error) {
      console.error('Audit logging failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  /**
   * Registra login bem-sucedido
   */
  async logLogin(userId: string, details: { ip_address?: string; user_agent?: string; company_id?: string }): Promise<void> {
    await this.log({
      user_id: userId,
      action: AUDIT_ACTIONS.LOGIN,
      resource_type: AUDIT_RESOURCES.USER,
      details: { success: true },
      ip_address: details.ip_address,
      user_agent: details.user_agent,
      severity: AUDIT_SEVERITY.LOW,
      company_id: details.company_id
    });
  }
  
  /**
   * Registra tentativa de login falhada
   */
  async logLoginFailed(email: string, details: { ip_address?: string; user_agent?: string; reason?: string }): Promise<void> {
    await this.log({
      user_id: email, // Usar email como identificador
      action: AUDIT_ACTIONS.LOGIN_FAILED,
      resource_type: AUDIT_RESOURCES.USER,
      details: { 
        email,
        reason: details.reason || 'Invalid credentials',
        success: false 
      },
      ip_address: details.ip_address,
      user_agent: details.user_agent,
      severity: AUDIT_SEVERITY.MEDIUM
    });
  }
  
  /**
   * Registra criação de funcionário
   */
  async logEmployeeCreate(userId: string, employeeId: string, employeeData: Record<string, unknown>, companyId?: string): Promise<void> {
    await this.log({
      user_id: userId,
      action: AUDIT_ACTIONS.EMPLOYEE_CREATE,
      resource_type: AUDIT_RESOURCES.EMPLOYEE,
      resource_id: employeeId,
      details: {
        employee_data: {
          name: employeeData.name,
          email: employeeData.email,
          position: employeeData.position,
          department: employeeData.department
        }
      },
      severity: AUDIT_SEVERITY.MEDIUM,
      company_id: companyId
    });
  }
  
  /**
   * Registra alteração de escala
   */
  async logScheduleUpdate(userId: string, scheduleId: string, changes: Record<string, unknown>, companyId?: string): Promise<void> {
    await this.log({
      user_id: userId,
      action: AUDIT_ACTIONS.SCHEDULE_UPDATE,
      resource_type: AUDIT_RESOURCES.SCHEDULE,
      resource_id: scheduleId,
      details: { changes },
      severity: AUDIT_SEVERITY.MEDIUM,
      company_id: companyId
    });
  }
  
  /**
   * Registra violação de compliance
   */
  async logComplianceViolation(userId: string, violation: { type: string; details: string; affected_employees?: string[] }, companyId?: string): Promise<void> {
    await this.log({
      user_id: userId,
      action: AUDIT_ACTIONS.COMPLIANCE_VIOLATION,
      resource_type: AUDIT_RESOURCES.SCHEDULE,
      details: violation,
      severity: AUDIT_SEVERITY.HIGH,
      company_id: companyId
    });
  }
  
  /**
   * Registra alteração de role de usuário
   */
  async logRoleChange(adminUserId: string, targetUserId: string, oldRole: string, newRole: string, companyId?: string): Promise<void> {
    await this.log({
      user_id: adminUserId,
      action: AUDIT_ACTIONS.USER_ROLE_CHANGE,
      resource_type: AUDIT_RESOURCES.USER,
      resource_id: targetUserId,
      details: {
        target_user: targetUserId,
        old_role: oldRole,
        new_role: newRole
      },
      severity: AUDIT_SEVERITY.HIGH,
      company_id: companyId
    });
  }
  
  /**
   * Busca logs de audit
   */
  async getLogs(filter: AuditLogFilter, limit = 100, offset = 0): Promise<{ data: AuditLogEntry[] | null; error: string | null }> {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1);
      
      if (filter.user_id) {
        query = query.eq('user_id', filter.user_id);
      }
      
      if (filter.action) {
        query = query.eq('action', filter.action);
      }
      
      if (filter.resource_type) {
        query = query.eq('resource_type', filter.resource_type);
      }
      
      if (filter.severity) {
        query = query.eq('severity', filter.severity);
      }
      
      if (filter.company_id) {
        query = query.eq('company_id', filter.company_id);
      }
      
      if (filter.start_date) {
        query = query.gte('timestamp', filter.start_date);
      }
      
      if (filter.end_date) {
        query = query.lte('timestamp', filter.end_date);
      }
      
      const { data, error } = await query;
      
      if (error) {
        return { data: null, error: error.message };
      }
      
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
  
  /**
   * Obtém estatísticas de audit log
   */
  async getStats(companyId?: string, days = 30): Promise<{ data: Record<string, number> | null; error: string | null }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      let query = supabase
        .from('audit_logs')
        .select('action, severity')
        .gte('timestamp', startDate.toISOString());
      
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        return { data: null, error: error.message };
      }
      
      const stats: Record<string, number> = {
        total_actions: 0,
        critical_events: 0,
        high_severity: 0,
        medium_severity: 0,
        low_severity: 0
      };
      
      data?.forEach(entry => {
        stats.total_actions++;
        
        switch (entry.severity) {
          case 'critical':
            stats.critical_events++;
            break;
          case 'high':
            stats.high_severity++;
            break;
          case 'medium':
            stats.medium_severity++;
            break;
          case 'low':
            stats.low_severity++;
            break;
        }
      });
      
      return { data: stats, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const auditLogger = AuditLogger.getInstance();
