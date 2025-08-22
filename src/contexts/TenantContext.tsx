import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getUserCompanies, getCompanyDetails } from '@/services/api';
import { useSetupWizard } from '@/utils/setupWizard';

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  trade_name?: string;
  description?: string;
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
  address: any;
  contact: any;
  settings: any;
  created_at: string;
  updated_at: string;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
  needsSetup: boolean;
  switchTenant: (tenantId: string) => Promise<void>;
  refreshTenants: () => Promise<void>;
  updateTenantSettings: (settings: Partial<Tenant['settings']>) => Promise<void>;
  createTenant: (name: string, cnpj?: string) => Promise<void>;
}

const TenantContext = createContext<TenantContextType | null>(null);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { setupUser, checkSetup } = useSetupWizard();
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);

  // Load user's tenants
  const loadTenants = useCallback(async () => {
    if (!user) {
      setTenants([]);
      setCurrentTenant(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userCompanies = await getUserCompanies(user.id);
      
      if (userCompanies && userCompanies.length > 0) {
        // Extrair as empresas dos relacionamentos
        const companies = userCompanies.map(uc => uc.companies).filter(Boolean);
        setTenants(companies);
        
        // Set current tenant from localStorage or first available
        const savedTenantId = localStorage.getItem('currentTenantId');
        const savedTenant = companies.find(t => t.id === savedTenantId);
        
        if (savedTenant && savedTenant.status === 'active') {
          setCurrentTenant(savedTenant);
        } else if (companies.length > 0) {
          const firstActiveTenant = companies.find(t => t.status === 'active');
          if (firstActiveTenant) {
            setCurrentTenant(firstActiveTenant);
            localStorage.setItem('currentTenantId', firstActiveTenant.id);
          }
        }
      } else {
        setTenants([]);
        setCurrentTenant(null);
        setNeedsSetup(true);
      }
    } catch (err) {
      console.error('Error loading tenants:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar empresas');
      setTenants([]);
      setCurrentTenant(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Switch to a different tenant
  const switchTenant = useCallback(async (tenantId: string) => {
    try {
      const tenant = tenants.find(t => t.id === tenantId);
      if (tenant && tenant.status === 'active') {
        setCurrentTenant(tenant);
        localStorage.setItem('currentTenantId', tenantId);
      } else {
        throw new Error('Empresa não encontrada ou inativa');
      }
    } catch (err) {
      console.error('Error switching tenant:', err);
      setError(err instanceof Error ? err.message : 'Erro ao trocar empresa');
    }
  }, [tenants]);

  // Refresh tenants list
  const refreshTenants = useCallback(async () => {
    await loadTenants();
  }, [loadTenants]);

  // Update tenant settings
  const updateTenantSettings = useCallback(async (settings: Partial<Tenant['settings']>) => {
    if (!currentTenant) {
      throw new Error('Nenhuma empresa selecionada');
    }

    try {
      // Aqui você implementaria a atualização das configurações
      // Por enquanto, apenas atualizamos o estado local
      setCurrentTenant(prev => prev ? { ...prev, settings: { ...prev.settings, ...settings } } : null);
    } catch (err) {
      console.error('Error updating tenant settings:', err);
      setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
    }
  }, [currentTenant]);

  // Create new tenant with setup wizard
  const createTenant = useCallback(async (name: string, cnpj?: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      setLoading(true);
      const result = await setupUser(user, {
        companyName: name,
        cnpj,
        userRole: 'owner',
        setupCompleted: true
      });

      if (result.success) {
        setNeedsSetup(false);
        await loadTenants(); // Recarregar lista de empresas
      } else {
        throw new Error(result.error || 'Erro ao criar empresa');
      }
    } catch (err) {
      console.error('Error creating tenant:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar empresa');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, setupUser, loadTenants]);

  // Load tenants when user changes
  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const value: TenantContextType = {
    currentTenant,
    tenants,
    loading,
    error,
    needsSetup,
    switchTenant,
    refreshTenants,
    updateTenantSettings,
    createTenant,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}; 