import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { companyService } from '@/services/api';

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  tradeName?: string;
  description?: string;
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  settings: {
    timeZone: string;
    currency: string;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
  switchTenant: (tenantId: string) => Promise<void>;
  refreshTenants: () => Promise<void>;
  updateTenantSettings: (settings: Partial<Tenant['settings']>) => Promise<void>;
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
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      const response = await companyService.getCompanies();
      
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setTenants(response.data);
        
        // Set current tenant from localStorage or first available
        const savedTenantId = localStorage.getItem('currentTenantId');
        const savedTenant = response.data.find(t => t.id === savedTenantId);
        
        if (savedTenant && savedTenant.status === 'active') {
          setCurrentTenant(savedTenant);
        } else if (response.data.length > 0) {
          const firstActiveTenant = response.data.find(t => t.status === 'active');
          if (firstActiveTenant) {
            setCurrentTenant(firstActiveTenant);
            localStorage.setItem('currentTenantId', firstActiveTenant.id);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar empresas');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Switch to a different tenant
  const switchTenant = async (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) {
      setError('Empresa não encontrada');
      return;
    }

    if (tenant.status !== 'active') {
      setError('Empresa inativa');
      return;
    }

    setCurrentTenant(tenant);
    localStorage.setItem('currentTenantId', tenantId);
    
    // Update user preferences
    if (tenant.settings.language) {
      localStorage.setItem('language', tenant.settings.language);
    }
    
    if (tenant.settings.timeZone) {
      localStorage.setItem('timeZone', tenant.settings.timeZone);
    }
  };

  // Refresh tenants list
  const refreshTenants = async () => {
    await loadTenants();
  };

  // Update tenant settings
  const updateTenantSettings = async (settings: Partial<Tenant['settings']>) => {
    if (!currentTenant) {return;}

    try {
      const response = await companyService.updateCompany(currentTenant.id, {
        settings: { ...currentTenant.settings, ...settings }
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setCurrentTenant(response.data);
        setTenants(prev => prev.map(t => 
          t.id === response.data.id ? response.data : t
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
    }
  };

  // Load tenants when user changes
  useEffect(() => {
    loadTenants();
  }, [user, loadTenants]);

  const value: TenantContextType = {
    currentTenant,
    tenants,
    loading,
    error,
    switchTenant,
    refreshTenants,
    updateTenantSettings,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};

export default TenantProvider; 