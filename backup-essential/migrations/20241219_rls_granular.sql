-- =====================================================
-- MIGRATION: RLS GRANULAR - GROWTHSCALE
-- Data: 2024-12-19
-- Objetivo: Implementar controle de acesso granular por role
-- =====================================================

-- 1. REMOVER POLÍTICAS ANTIGAS (se existirem)
DROP POLICY IF EXISTS "Users can view their own companies" ON companies;
DROP POLICY IF EXISTS "Users can insert their own companies" ON companies;
DROP POLICY IF EXISTS "Users can update their own companies" ON companies;
DROP POLICY IF EXISTS "Users can delete their own companies" ON companies;

DROP POLICY IF EXISTS "Users can view their company associations" ON company_users;
DROP POLICY IF EXISTS "Users can insert their company associations" ON company_users;
DROP POLICY IF EXISTS "Users can update their company associations" ON company_users;
DROP POLICY IF EXISTS "Users can delete their company associations" ON company_users;

DROP POLICY IF EXISTS "Users can view employees from their companies" ON employees;
DROP POLICY IF EXISTS "Users can insert employees in their companies" ON employees;
DROP POLICY IF EXISTS "Users can update employees in their companies" ON employees;
DROP POLICY IF EXISTS "Users can delete employees in their companies" ON employees;

DROP POLICY IF EXISTS "Users can view schedules from their companies" ON schedules;
DROP POLICY IF EXISTS "Users can insert schedules in their companies" ON schedules;
DROP POLICY IF EXISTS "Users can update schedules in their companies" ON schedules;
DROP POLICY IF EXISTS "Users can delete schedules in their companies" ON schedules;

DROP POLICY IF EXISTS "Users can view shifts from their companies" ON shifts;
DROP POLICY IF EXISTS "Users can insert shifts in their companies" ON shifts;
DROP POLICY IF EXISTS "Users can update shifts in their companies" ON shifts;
DROP POLICY IF EXISTS "Users can delete shifts in their companies" ON shifts;

DROP POLICY IF EXISTS "Users can view communication logs from their companies" ON communication_logs;
DROP POLICY IF EXISTS "Users can insert communication logs in their companies" ON communication_logs;

-- =====================================================
-- 2. POLÍTICAS GRANULARES PARA COMPANIES
-- =====================================================

-- Leitura: apenas membros da empresa
CREATE POLICY "company_read_members" ON companies
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = companies.id
      AND cu.user_id = auth.uid()
  )
);

-- Atualização: apenas owner/admin
CREATE POLICY "company_update_admin" ON companies
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = companies.id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

-- Inserção: apenas via service role (signup)
CREATE POLICY "company_insert_service" ON companies
FOR INSERT WITH CHECK (
  auth.role() = 'service_role'
);

-- Exclusão: apenas owner
CREATE POLICY "company_delete_owner" ON companies
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = companies.id
      AND cu.user_id = auth.uid()
      AND cu.role = 'owner'
  )
);

-- =====================================================
-- 3. POLÍTICAS GRANULARES PARA COMPANY_USERS
-- =====================================================

-- Leitura: membros da empresa
CREATE POLICY "company_user_read_members" ON company_users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
  )
);

-- Inserção: apenas owner/admin
CREATE POLICY "company_user_insert_admin" ON company_users
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

-- Atualização: apenas owner/admin
CREATE POLICY "company_user_update_admin" ON company_users
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

-- Exclusão: apenas owner/admin
CREATE POLICY "company_user_delete_admin" ON company_users
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM company_users cu
    WHERE cu.company_id = company_users.company_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

-- =====================================================
-- 4. POLÍTICAS GRANULARES PARA EMPLOYEES
-- =====================================================

-- Leitura: membros da empresa
CREATE POLICY "employee_read_members" ON employees
FOR SELECT USING (
  employees.company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  )
);

-- Inserção: apenas manager/admin/owner
CREATE POLICY "employee_insert_manager" ON employees
FOR INSERT WITH CHECK (
  employees.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

-- Atualização: apenas manager/admin/owner
CREATE POLICY "employee_update_manager" ON employees
FOR UPDATE USING (
  employees.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

-- Exclusão: apenas admin/owner
CREATE POLICY "employee_delete_admin" ON employees
FOR DELETE USING (
  employees.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

-- =====================================================
-- 5. POLÍTICAS GRANULARES PARA SCHEDULES
-- =====================================================

-- Leitura: membros da empresa
CREATE POLICY "schedule_read_members" ON schedules
FOR SELECT USING (
  schedules.company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  )
);

-- Inserção: apenas manager/admin/owner
CREATE POLICY "schedule_insert_manager" ON schedules
FOR INSERT WITH CHECK (
  schedules.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

-- Atualização: apenas manager/admin/owner
CREATE POLICY "schedule_update_manager" ON schedules
FOR UPDATE USING (
  schedules.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

-- Exclusão: apenas admin/owner
CREATE POLICY "schedule_delete_admin" ON schedules
FOR DELETE USING (
  schedules.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
);

-- =====================================================
-- 6. POLÍTICAS GRANULARES PARA SHIFTS
-- =====================================================

-- Leitura: membros da empresa (via schedule)
CREATE POLICY "shift_read_members" ON shifts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN company_users cu ON cu.company_id = s.company_id
    WHERE s.id = shifts.schedule_id 
      AND cu.user_id = auth.uid()
  )
);

-- Inserção: apenas manager/admin/owner (via schedule)
CREATE POLICY "shift_insert_manager" ON shifts
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN company_users cu ON cu.company_id = s.company_id
    WHERE s.id = shifts.schedule_id 
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin', 'manager')
  )
);

-- Atualização: apenas manager/admin/owner (via schedule)
CREATE POLICY "shift_update_manager" ON shifts
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN company_users cu ON cu.company_id = s.company_id
    WHERE s.id = shifts.schedule_id 
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin', 'manager')
  )
);

-- Exclusão: apenas admin/owner (via schedule)
CREATE POLICY "shift_delete_admin" ON shifts
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN company_users cu ON cu.company_id = s.company_id
    WHERE s.id = shifts.schedule_id 
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin')
  )
);

-- =====================================================
-- 7. POLÍTICAS GRANULARES PARA COMMUNICATION_LOGS
-- =====================================================

-- Leitura: membros da empresa
CREATE POLICY "communication_log_read_members" ON communication_logs
FOR SELECT USING (
  communication_logs.company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  )
);

-- Inserção: apenas manager/admin/owner
CREATE POLICY "communication_log_insert_manager" ON communication_logs
FOR INSERT WITH CHECK (
  communication_logs.company_id IN (
    SELECT company_id FROM company_users 
    WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
  )
);

-- =====================================================
-- 8. ÍNDICES DE PERFORMANCE
-- =====================================================

-- Índices para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_schedules_company_date ON schedules(company_id, date);
CREATE INDEX IF NOT EXISTS idx_employees_company_status ON employees(company_id, status);
CREATE INDEX IF NOT EXISTS idx_shifts_schedule_id ON shifts(schedule_id);
CREATE INDEX IF NOT EXISTS idx_communication_logs_company_date ON communication_logs(company_id, created_at);
CREATE INDEX IF NOT EXISTS idx_company_users_role ON company_users(role);
CREATE INDEX IF NOT EXISTS idx_company_users_user_company ON company_users(user_id, company_id);

-- =====================================================
-- 9. FUNÇÃO DE AUDITORIA
-- =====================================================

-- Função para registrar acesso a dados sensíveis
CREATE OR REPLACE FUNCTION audit_data_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO communication_logs (
    company_id,
    user_id,
    action,
    entity_type,
    entity_id,
    details
  ) VALUES (
    COALESCE(NEW.company_id, OLD.company_id),
    auth.uid(),
    TG_OP, -- INSERT, UPDATE, DELETE
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'operation', TG_OP,
      'table', TG_TABLE_NAME,
      'timestamp', NOW()
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers de auditoria para tabelas sensíveis
CREATE TRIGGER audit_employees_access
  AFTER INSERT OR UPDATE OR DELETE ON employees
  FOR EACH ROW EXECUTE FUNCTION audit_data_access();

CREATE TRIGGER audit_schedules_access
  AFTER INSERT OR UPDATE OR DELETE ON schedules
  FOR EACH ROW EXECUTE FUNCTION audit_data_access();

CREATE TRIGGER audit_shifts_access
  AFTER INSERT OR UPDATE OR DELETE ON shifts
  FOR EACH ROW EXECUTE FUNCTION audit_data_access();

-- =====================================================
-- FIM DA MIGRATION
-- =====================================================
