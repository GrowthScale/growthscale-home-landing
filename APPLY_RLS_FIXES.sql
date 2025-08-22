-- =====================================================
-- SCRIPT PARA APLICAR CORREÇÕES RLS - GROWTHSCALE
-- Execute este script no SQL Editor do Supabase Dashboard
-- =====================================================

-- 1. REMOVER TODAS AS POLÍTICAS CONFLITANTES
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;
DROP POLICY IF EXISTS "Employees can update own data" ON public.employees;
DROP POLICY IF EXISTS "employee_read_members" ON public.employees;
DROP POLICY IF EXISTS "employee_insert_owner_admin_manager" ON public.employees;
DROP POLICY IF EXISTS "employee_update_owner_admin_manager" ON public.employees;
DROP POLICY IF EXISTS "employee_delete_owner_admin" ON public.employees;
DROP POLICY IF EXISTS "employee_insert_manager" ON public.employees;
DROP POLICY IF EXISTS "employee_update_manager" ON public.employees;
DROP POLICY IF EXISTS "employee_delete_admin" ON public.employees;

DROP POLICY IF EXISTS "Users can view schedules based on role" ON public.schedules;
DROP POLICY IF EXISTS "Users can manage schedules based on role" ON public.schedules;
DROP POLICY IF EXISTS "schedule_read_members" ON public.schedules;
DROP POLICY IF EXISTS "schedule_insert_owner_admin_manager" ON public.schedules;
DROP POLICY IF EXISTS "schedule_update_owner_admin_manager" ON public.schedules;
DROP POLICY IF EXISTS "schedule_delete_owner_admin" ON public.schedules;

DROP POLICY IF EXISTS "Users can view companies based on role" ON public.companies;
DROP POLICY IF EXISTS "company_read_members" ON public.companies;
DROP POLICY IF EXISTS "company_insert_owner" ON public.companies;
DROP POLICY IF EXISTS "company_update_owner_admin" ON public.companies;
DROP POLICY IF EXISTS "company_delete_owner" ON public.companies;

-- 2. GARANTIR QUE RLS ESTÁ HABILITADO
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;

-- 3. CRIAR POLÍTICAS SIMPLIFICADAS E FUNCIONAIS
-- Usando apenas company_users para determinar acesso

-- EMPLOYEES: Acesso baseado em company_users
CREATE POLICY "employees_select_company_members" ON public.employees
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "employees_insert_managers" ON public.employees
FOR INSERT WITH CHECK (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "employees_update_managers" ON public.employees
FOR UPDATE USING (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "employees_delete_admins" ON public.employees
FOR DELETE USING (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin')
  )
);

-- SCHEDULES: Acesso baseado em company_users
CREATE POLICY "schedules_select_company_members" ON public.schedules
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "schedules_insert_managers" ON public.schedules
FOR INSERT WITH CHECK (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "schedules_update_managers" ON public.schedules
FOR UPDATE USING (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin', 'manager')
  )
);

CREATE POLICY "schedules_delete_admins" ON public.schedules
FOR DELETE USING (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin')
  )
);

-- SHIFTS: Acesso baseado na escala relacionada
CREATE POLICY "shifts_select_via_schedule" ON public.shifts
FOR SELECT USING (
  schedule_id IN (
    SELECT id FROM public.schedules 
    WHERE company_id IN (
      SELECT company_id FROM public.company_users WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "shifts_insert_managers" ON public.shifts
FOR INSERT WITH CHECK (
  schedule_id IN (
    SELECT id FROM public.schedules 
    WHERE company_id IN (
      SELECT company_id FROM public.company_users 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
    )
  )
);

CREATE POLICY "shifts_update_managers" ON public.shifts
FOR UPDATE USING (
  schedule_id IN (
    SELECT id FROM public.schedules 
    WHERE company_id IN (
      SELECT company_id FROM public.company_users 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
    )
  )
);

CREATE POLICY "shifts_delete_managers" ON public.shifts
FOR DELETE USING (
  schedule_id IN (
    SELECT id FROM public.schedules 
    WHERE company_id IN (
      SELECT company_id FROM public.company_users 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
    )
  )
);

-- COMPANIES: Acesso apenas para membros
CREATE POLICY "companies_select_members" ON public.companies
FOR SELECT USING (
  id IN (
    SELECT company_id FROM public.company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "companies_update_admins" ON public.companies
FOR UPDATE USING (
  id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin')
  )
);

-- COMPANY_USERS: Acesso para visualizar membros da mesma empresa
CREATE POLICY "company_users_select_same_company" ON public.company_users
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.company_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "company_users_insert_admins" ON public.company_users
FOR INSERT WITH CHECK (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "company_users_update_admins" ON public.company_users
FOR UPDATE USING (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "company_users_delete_owners" ON public.company_users
FOR DELETE USING (
  company_id IN (
    SELECT company_id FROM public.company_users 
    WHERE user_id = auth.uid() 
    AND role = 'owner'
  )
);

-- 4. COMENTÁRIOS E DOCUMENTAÇÃO
COMMENT ON POLICY "employees_select_company_members" ON public.employees IS 'Permite ver funcionários da mesma empresa';
COMMENT ON POLICY "schedules_select_company_members" ON public.schedules IS 'Permite ver escalas da mesma empresa';
COMMENT ON POLICY "companies_select_members" ON public.companies IS 'Permite ver detalhes da empresa do usuário';

-- 5. VERIFICAÇÃO FINAL
-- Criar função para verificar se as políticas estão funcionando
CREATE OR REPLACE FUNCTION check_rls_policies()
RETURNS TABLE(table_name TEXT, policy_count INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.table_name::TEXT,
    COUNT(p.policyname)::INTEGER as policy_count
  FROM information_schema.tables t
  LEFT JOIN pg_policies p ON p.tablename = t.table_name
  WHERE t.table_schema = 'public' 
    AND t.table_name IN ('employees', 'schedules', 'shifts', 'companies', 'company_users')
  GROUP BY t.table_name
  ORDER BY t.table_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Executar verificação
SELECT * FROM check_rls_policies();

-- 6. MENSAGEM DE SUCESSO
SELECT '✅ Políticas RLS aplicadas com sucesso!' as status;
