// Advanced RBAC System - Enterprise Features
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  conditions?: PermissionCondition[];
}

export interface PermissionCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'in' | 'not_in' | 'greater_than' | 'less_than';
  value: any;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
  permissions: string[];
  inherits?: string[];
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRole {
  userId: string;
  roleId: string;
  tenantId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  conditions?: Record<string, any>;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  result: 'success' | 'failure' | 'blocked';
  reason?: string;
}

// Default System Roles
export const SYSTEM_ROLES: Role[] = [
  {
    id: 'super_admin',
    name: 'Super Administrator',
    description: 'Full system access across all tenants',
    level: 100,
    permissions: ['*'],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to tenant resources',
    level: 90,
    permissions: [
      'tenant:*',
      'users:*',
      'roles:*',
      'companies:*',
      'employees:*',
      'schedules:*',
      'reports:*',
      'integrations:*',
      'settings:*',
      'billing:*',
      'analytics:*',
      'security:*',
      'ai:*',
    ],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Administrative access to tenant resources',
    level: 80,
    permissions: [
      'users:read',
      'users:create',
      'users:update',
      'roles:read',
      'companies:*',
      'employees:*',
      'schedules:*',
      'reports:read',
      'reports:create',
      'integrations:read',
      'settings:read',
      'settings:update',
      'analytics:read',
      'security:read',
      'ai:read',
    ],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Management access to operational resources',
    level: 60,
    permissions: [
      'employees:read',
      'employees:update',
      'schedules:*',
      'reports:read',
      'reports:create',
      'settings:read',
      'analytics:read',
      'ai:read',
    ],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'hr',
    name: 'Human Resources',
    description: 'HR focused access to employee data',
    level: 50,
    permissions: [
      'employees:*',
      'schedules:read',
      'reports:read',
      'reports:create',
    ],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'employee',
    name: 'Employee',
    description: 'Basic employee access',
    level: 20,
    permissions: [
      'schedules:read:own',
      'employees:read:own',
      'reports:read:own',
    ],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access',
    level: 10,
    permissions: [
      'schedules:read',
      'employees:read',
      'reports:read',
    ],
    isSystemRole: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Default Permissions
export const SYSTEM_PERMISSIONS: Permission[] = [
  // Tenant Management
  { id: 'tenant:read', name: 'View Tenant', description: 'View tenant information', resource: 'tenant', action: 'read' },
  { id: 'tenant:update', name: 'Update Tenant', description: 'Update tenant settings', resource: 'tenant', action: 'update' },
  { id: 'tenant:delete', name: 'Delete Tenant', description: 'Delete tenant', resource: 'tenant', action: 'delete' },

  // User Management
  { id: 'users:read', name: 'View Users', description: 'View user information', resource: 'users', action: 'read' },
  { id: 'users:create', name: 'Create Users', description: 'Create new users', resource: 'users', action: 'create' },
  { id: 'users:update', name: 'Update Users', description: 'Update user information', resource: 'users', action: 'update' },
  { id: 'users:delete', name: 'Delete Users', description: 'Delete users', resource: 'users', action: 'delete' },

  // Role Management
  { id: 'roles:read', name: 'View Roles', description: 'View role information', resource: 'roles', action: 'read' },
  { id: 'roles:create', name: 'Create Roles', description: 'Create new roles', resource: 'roles', action: 'create' },
  { id: 'roles:update', name: 'Update Roles', description: 'Update role information', resource: 'roles', action: 'update' },
  { id: 'roles:delete', name: 'Delete Roles', description: 'Delete roles', resource: 'roles', action: 'delete' },

  // Company Management
  { id: 'companies:read', name: 'View Companies', description: 'View company information', resource: 'companies', action: 'read' },
  { id: 'companies:create', name: 'Create Companies', description: 'Create new companies', resource: 'companies', action: 'create' },
  { id: 'companies:update', name: 'Update Companies', description: 'Update company information', resource: 'companies', action: 'update' },
  { id: 'companies:delete', name: 'Delete Companies', description: 'Delete companies', resource: 'companies', action: 'delete' },

  // Employee Management
  { id: 'employees:read', name: 'View Employees', description: 'View employee information', resource: 'employees', action: 'read' },
  { id: 'employees:read:own', name: 'View Own Profile', description: 'View own employee profile', resource: 'employees', action: 'read', conditions: [{ field: 'userId', operator: 'equals', value: '{current_user}' }] },
  { id: 'employees:create', name: 'Create Employees', description: 'Create new employees', resource: 'employees', action: 'create' },
  { id: 'employees:update', name: 'Update Employees', description: 'Update employee information', resource: 'employees', action: 'update' },
  { id: 'employees:delete', name: 'Delete Employees', description: 'Delete employees', resource: 'employees', action: 'delete' },

  // Schedule Management
  { id: 'schedules:read', name: 'View Schedules', description: 'View schedule information', resource: 'schedules', action: 'read' },
  { id: 'schedules:read:own', name: 'View Own Schedules', description: 'View own schedules', resource: 'schedules', action: 'read', conditions: [{ field: 'employeeId', operator: 'equals', value: '{current_employee}' }] },
  { id: 'schedules:create', name: 'Create Schedules', description: 'Create new schedules', resource: 'schedules', action: 'create' },
  { id: 'schedules:update', name: 'Update Schedules', description: 'Update schedule information', resource: 'schedules', action: 'update' },
  { id: 'schedules:delete', name: 'Delete Schedules', description: 'Delete schedules', resource: 'schedules', action: 'delete' },

  // Reports
  { id: 'reports:read', name: 'View Reports', description: 'View reports', resource: 'reports', action: 'read' },
  { id: 'reports:read:own', name: 'View Own Reports', description: 'View own reports', resource: 'reports', action: 'read', conditions: [{ field: 'createdBy', operator: 'equals', value: '{current_user}' }] },
  { id: 'reports:create', name: 'Create Reports', description: 'Create new reports', resource: 'reports', action: 'create' },
  { id: 'reports:update', name: 'Update Reports', description: 'Update reports', resource: 'reports', action: 'update' },
  { id: 'reports:delete', name: 'Delete Reports', description: 'Delete reports', resource: 'reports', action: 'delete' },

  // Integrations
  { id: 'integrations:read', name: 'View Integrations', description: 'View integration settings', resource: 'integrations', action: 'read' },
  { id: 'integrations:create', name: 'Create Integrations', description: 'Create new integrations', resource: 'integrations', action: 'create' },
  { id: 'integrations:update', name: 'Update Integrations', description: 'Update integration settings', resource: 'integrations', action: 'update' },
  { id: 'integrations:delete', name: 'Delete Integrations', description: 'Delete integrations', resource: 'integrations', action: 'delete' },

  // Settings
  { id: 'settings:read', name: 'View Settings', description: 'View system settings', resource: 'settings', action: 'read' },
  { id: 'settings:update', name: 'Update Settings', description: 'Update system settings', resource: 'settings', action: 'update' },

  // Billing
  { id: 'billing:read', name: 'View Billing', description: 'View billing information', resource: 'billing', action: 'read' },
  { id: 'billing:update', name: 'Update Billing', description: 'Update billing settings', resource: 'billing', action: 'update' },

  // Analytics
  { id: 'analytics:read', name: 'View Analytics', description: 'View analytics data', resource: 'analytics', action: 'read' },

  // Security
  { id: 'security:read', name: 'View Security', description: 'View security settings', resource: 'security', action: 'read' },
  { id: 'security:update', name: 'Update Security', description: 'Update security settings', resource: 'security', action: 'update' },

  // AI
  { id: 'ai:read', name: 'View AI', description: 'View AI analytics', resource: 'ai', action: 'read' },
  { id: 'ai:update', name: 'Update AI', description: 'Update AI settings', resource: 'ai', action: 'update' },
];

export class AdvancedRBACService {
  private static instance: AdvancedRBACService;
  private auditLogs: AuditLog[] = [];

  static getInstance(): AdvancedRBACService {
    if (!AdvancedRBACService.instance) {
      AdvancedRBACService.instance = new AdvancedRBACService();
    }
    return AdvancedRBACService.instance;
  }

  // Permission Checking
  async hasPermission(
    userId: string,
    permission: string,
    resource?: any,
    context?: Record<string, any>
  ): Promise<boolean> {
    try {
      const userRoles = await this.getUserRoles(userId);
      
      for (const role of userRoles) {
        if (await this.roleHasPermission(role, permission, resource, context)) {
          await this.logAccess(userId, permission, 'success', 'Permission granted');
          return true;
        }
      }

      await this.logAccess(userId, permission, 'blocked', 'Permission denied');
      return false;
    } catch (error) {
      await this.logAccess(userId, permission, 'failure', `Error checking permission: ${error.message}`);
      return false;
    }
  }

  async roleHasPermission(
    role: Role,
    permission: string,
    resource?: any,
    context?: Record<string, any>
  ): Promise<boolean> {
    // Check wildcard permissions
    if (role.permissions.includes('*')) {
      return true;
    }

    // Check exact permission match
    if (role.permissions.includes(permission)) {
      return this.evaluatePermissionConditions(permission, resource, context);
    }

    // Check wildcard resource permissions
    const [resourceType] = permission.split(':');
    if (role.permissions.includes(`${resourceType}:*`)) {
      return this.evaluatePermissionConditions(permission, resource, context);
    }

    // Check inherited roles
    if (role.inherits) {
      for (const inheritedRoleId of role.inherits) {
        const inheritedRole = SYSTEM_ROLES.find(r => r.id === inheritedRoleId);
        if (inheritedRole && await this.roleHasPermission(inheritedRole, permission, resource, context)) {
          return true;
        }
      }
    }

    return false;
  }

  private async evaluatePermissionConditions(
    permission: string,
    resource?: any,
    context?: Record<string, any>
  ): Promise<boolean> {
    const permissionDef = SYSTEM_PERMISSIONS.find(p => p.id === permission);
    
    if (!permissionDef?.conditions || !resource) {
      return true;
    }

    for (const condition of permissionDef.conditions) {
      if (!this.evaluateCondition(condition, resource, context)) {
        return false;
      }
    }

    return true;
  }

  private evaluateCondition(
    condition: PermissionCondition,
    resource: any,
    context?: Record<string, any>
  ): boolean {
    let value = condition.value;
    
    // Replace context variables
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const varName = value.slice(1, -1);
      value = context?.[varName];
    }

    const fieldValue = this.getNestedValue(resource, condition.field);

    switch (condition.operator) {
      case 'equals':
        return fieldValue === value;
      case 'not_equals':
        return fieldValue !== value;
      case 'contains':
        return String(fieldValue).includes(String(value));
      case 'in':
        return Array.isArray(value) && value.includes(fieldValue);
      case 'not_in':
        return Array.isArray(value) && !value.includes(fieldValue);
      case 'greater_than':
        return Number(fieldValue) > Number(value);
      case 'less_than':
        return Number(fieldValue) < Number(value);
      default:
        return false;
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // User Role Management
  async getUserRoles(userId: string): Promise<Role[]> {
    // In a real app, this would fetch from database
    // For now, return a default role based on user context
    const defaultRole = SYSTEM_ROLES.find(r => r.id === 'employee');
    return defaultRole ? [defaultRole] : [];
  }

  async assignRole(
    userId: string,
    roleId: string,
    assignedBy: string,
    tenantId: string,
    expiresAt?: Date,
    conditions?: Record<string, any>
  ): Promise<void> {
    const role = SYSTEM_ROLES.find(r => r.id === roleId);
    if (!role) {
      throw new Error(`Role ${roleId} not found`);
    }

    const userRole: UserRole = {
      userId,
      roleId,
      tenantId,
      assignedBy,
      assignedAt: new Date(),
      expiresAt,
      conditions,
    };

    // In a real app, save to database
    await this.logAccess(assignedBy, 'roles:assign', 'success', `Assigned role ${roleId} to user ${userId}`);
  }

  async revokeRole(userId: string, roleId: string, revokedBy: string): Promise<void> {
    // In a real app, remove from database
    await this.logAccess(revokedBy, 'roles:revoke', 'success', `Revoked role ${roleId} from user ${userId}`);
  }

  // Custom Role Management
  async createCustomRole(role: Omit<Role, 'id' | 'isSystemRole' | 'createdAt' | 'updatedAt'>): Promise<Role> {
    const newRole: Role = {
      ...role,
      id: `custom_${Date.now()}`,
      isSystemRole: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Validate permissions
    for (const permission of newRole.permissions) {
      if (!this.isValidPermission(permission)) {
        throw new Error(`Invalid permission: ${permission}`);
      }
    }

    // In a real app, save to database
    return newRole;
  }

  private isValidPermission(permission: string): boolean {
    if (permission === '*') {return true;}
    
    const [resource, action] = permission.split(':');
    if (action === '*') {return true;}
    
    return SYSTEM_PERMISSIONS.some(p => p.id === permission);
  }

  // Audit Logging
  async logAccess(
    userId: string,
    action: string,
    result: 'success' | 'failure' | 'blocked',
    reason?: string,
    resource?: string,
    resourceId?: string,
    oldValues?: Record<string, any>,
    newValues?: Record<string, any>
  ): Promise<void> {
    const auditLog: AuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      action,
      resource: resource || action.split(':')[0],
      resourceId,
      oldValues,
      newValues,
      ipAddress: 'client_ip', // In real app, get from request
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      result,
      reason,
    };

    this.auditLogs.push(auditLog);
    
    // Keep only last 1000 logs in memory
    if (this.auditLogs.length > 1000) {
      this.auditLogs = this.auditLogs.slice(-1000);
    }

    // In a real app, save to database/logging service
    if (process.env.NODE_ENV === 'development') { console.log('Audit Log:', auditLog); }
  }

  // Get audit logs
  getAuditLogs(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    result?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): AuditLog[] {
    let logs = [...this.auditLogs];

    if (filters) {
      if (filters.userId) {
        logs = logs.filter(log => log.userId === filters.userId);
      }
      if (filters.action) {
        logs = logs.filter(log => log.action.includes(filters.action!));
      }
      if (filters.resource) {
        logs = logs.filter(log => log.resource === filters.resource);
      }
      if (filters.result) {
        logs = logs.filter(log => log.result === filters.result);
      }
      if (filters.startDate) {
        logs = logs.filter(log => log.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        logs = logs.filter(log => log.timestamp <= filters.endDate!);
      }
    }

    // Sort by timestamp descending
    logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Apply limit
    if (filters?.limit) {
      logs = logs.slice(0, filters.limit);
    }

    return logs;
  }

  // Role Hierarchy
  canManageRole(managerRole: Role, targetRole: Role): boolean {
    return managerRole.level > targetRole.level;
  }

  canAssignRole(assignerRole: Role, targetRole: Role): boolean {
    return assignerRole.level >= targetRole.level;
  }

  // Permission Matrix
  getPermissionMatrix(): { roles: Role[]; permissions: Permission[]; matrix: boolean[][] } {
    const roles = SYSTEM_ROLES.filter(r => r.isSystemRole);
    const permissions = SYSTEM_PERMISSIONS;
    
    const matrix = roles.map(role => 
      permissions.map(permission => 
        role.permissions.includes('*') || 
        role.permissions.includes(permission.id) ||
        role.permissions.includes(`${permission.resource}:*`)
      )
    );

    return { roles, permissions, matrix };
  }
}

// Export singleton instance
export const advancedRBAC = AdvancedRBACService.getInstance();
