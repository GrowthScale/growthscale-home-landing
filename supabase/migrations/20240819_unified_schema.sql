-- =====================================================
-- MIGRATION: SCHEMA UNIFICADO - GROWTHSCALE
-- Data: 2024-08-19
-- Objetivo: Unificar e corrigir inconsistências do schema
-- =====================================================

-- 1. REMOVER COLUNA ROLE DE AUTH.USERS (se existir)
ALTER TABLE auth.users DROP COLUMN IF EXISTS role;

-- 2. CRIAR TABELA USER_PROFILES (se não existir)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'employee' CHECK (role IN ('owner', 'admin', 'manager', 'employee')),
  tenant_id UUID,
  first_name TEXT,
  last_name TEXT,
  avatar TEXT,
  phone TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CRIAR ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_tenant ON public.user_profiles(tenant_id);

-- 4. HABILITAR RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS RLS PARA USER_PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 6. REMOVER POLÍTICAS ANTIGAS CONFLITANTES
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;
DROP POLICY IF EXISTS "Users can view schedules based on role" ON public.schedules;
DROP POLICY IF EXISTS "company_read_members" ON companies;
DROP POLICY IF EXISTS "company_update_admin" ON companies;
DROP POLICY IF EXISTS "company_insert_service" ON companies;
DROP POLICY IF EXISTS "company_delete_owner" ON companies;
DROP POLICY IF EXISTS "company_user_read_members" ON company_users;
DROP POLICY IF EXISTS "company_user_insert_admin" ON company_users;
DROP POLICY IF EXISTS "company_user_update_admin" ON company_users;
DROP POLICY IF EXISTS "company_user_delete_admin" ON company_users;
DROP POLICY IF EXISTS "employee_read_members" ON employees;
DROP POLICY IF EXISTS "employee_insert_manager" ON employees;
DROP POLICY IF EXISTS "employee_update_manager" ON employees;
DROP POLICY IF EXISTS "employee_delete_admin" ON employees;
DROP POLICY IF EXISTS "schedule_read_members" ON schedules;
DROP POLICY IF EXISTS "schedule_insert_manager" ON schedules;
DROP POLICY IF EXISTS "schedule_update_manager" ON schedules;
DROP POLICY IF EXISTS "schedule_delete_admin" ON schedules;

-- 7. POLÍTICAS RLS UNIFICADAS PARA COMPANIES
CREATE POLICY "company_read_members" ON companies
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = companies.id
      AND cu.user_id = auth.uid()
  )
);

CREATE POLICY "company_update_owner_admin" ON companies
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = companies.id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

CREATE POLICY "company_insert_service" ON companies
FOR INSERT WITH CHECK (
  auth.role() = 'service_role'
);

CREATE POLICY "company_delete_owner" ON companies
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = companies.id
      AND cu.user_id = auth.uid()
      AND cu.role = 'owner'
  )
);

-- 8. POLÍTICAS RLS UNIFICADAS PARA COMPANY_USERS
CREATE POLICY "company_user_read_members" ON company_users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
  )
);

CREATE POLICY "company_user_insert_owner_admin" ON company_users
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

CREATE POLICY "company_user_update_owner_admin" ON company_users
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

CREATE POLICY "company_user_delete_owner_admin" ON company_users
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

-- 9. POLÍTICAS RLS UNIFICADAS PARA EMPLOYEES
CREATE POLICY "employee_read_members" ON employees
FOR SELECT USING (
  employees.company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "employee_insert_owner_admin_manager" ON employees
FOR INSERT WITH CHECK (
  employees.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "employee_update_owner_admin_manager" ON employees
FOR UPDATE USING (
  employees.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "employee_delete_owner_admin" ON employees
FOR DELETE USING (
  employees.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

-- 10. POLÍTICAS RLS UNIFICADAS PARA SCHEDULES
CREATE POLICY "schedule_read_members" ON schedules
FOR SELECT USING (
  schedules.company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "schedule_insert_owner_admin_manager" ON schedules
FOR INSERT WITH CHECK (
  schedules.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "schedule_update_owner_admin_manager" ON schedules
FOR UPDATE USING (
  schedules.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "schedule_delete_owner_admin" ON schedules
FOR DELETE USING (
  schedules.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

-- 11. POLÍTICAS RLS UNIFICADAS PARA BRANCHES
CREATE POLICY "branch_read_members" ON branches
FOR SELECT USING (
  branches.company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "branch_insert_owner_admin" ON branches
FOR INSERT WITH CHECK (
  branches.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "branch_update_owner_admin" ON branches
FOR UPDATE USING (
  branches.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "branch_delete_owner_admin" ON branches
FOR DELETE USING (
  branches.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

-- 12. FUNÇÃO PARA ATUALIZAR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 13. TRIGGERS PARA UPDATED_AT
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON public.user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_companies_updated_at ON public.companies;
CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON public.companies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_employees_updated_at ON public.employees;
CREATE TRIGGER update_employees_updated_at 
    BEFORE UPDATE ON public.employees 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_schedules_updated_at ON public.schedules;
CREATE TRIGGER update_schedules_updated_at 
    BEFORE UPDATE ON public.schedules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 14. FUNÇÃO PARA CRIAR USER_PROFILE AUTOMATICAMENTE
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role)
  VALUES (NEW.id, 'employee');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 15. TRIGGER PARA CRIAR USER_PROFILE
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 16. COMENTÁRIOS PARA DOCUMENTAÇÃO
COMMENT ON TABLE public.user_profiles IS 'Perfis de usuário com roles e informações adicionais';
COMMENT ON COLUMN public.user_profiles.role IS 'Role do usuário: owner, admin, manager, employee';
COMMENT ON COLUMN public.user_profiles.tenant_id IS 'ID da empresa (tenant) do usuário';
COMMENT ON TABLE public.company_users IS 'Relacionamento entre usuários e empresas com roles';
COMMENT ON COLUMN public.company_users.role IS 'Role do usuário na empresa: owner, admin, manager, employee';
