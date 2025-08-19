-- =====================================================
-- SCRIPT DE CONFIGURAÇÃO RBAC - GROWTHSCALE
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- 1. Adicionar coluna role na tabela auth.users
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee';

-- 2. Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_role ON auth.users(role);

-- 3. Ativar Row Level Security (RLS) nas tabelas principais
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- 4. Políticas RLS para employees
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;
CREATE POLICY "Employees can view own data" ON public.employees
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager'
  );

DROP POLICY IF EXISTS "Employees can update own data" ON public.employees;
CREATE POLICY "Employees can update own data" ON public.employees
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager'
  );

-- 5. Políticas RLS para schedules
DROP POLICY IF EXISTS "Users can view schedules based on role" ON public.schedules;
CREATE POLICY "Users can view schedules based on role" ON public.schedules
  FOR SELECT USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager' OR
    employee_id = auth.uid()
  );

DROP POLICY IF EXISTS "Users can manage schedules based on role" ON public.schedules;
CREATE POLICY "Users can manage schedules based on role" ON public.schedules
  FOR ALL USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager'
  );

-- 6. Políticas RLS para companies
DROP POLICY IF EXISTS "Users can view companies based on role" ON public.companies;
CREATE POLICY "Users can view companies based on role" ON public.companies
  FOR SELECT USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    tenant_id = (SELECT tenant_id FROM auth.users WHERE id = auth.uid())
  );

DROP POLICY IF EXISTS "Only owners can manage companies" ON public.companies;
CREATE POLICY "Only owners can manage companies" ON public.companies
  FOR ALL USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner'
  );

-- 7. Políticas RLS para branches
DROP POLICY IF EXISTS "Users can view branches based on role" ON public.branches;
CREATE POLICY "Users can view branches based on role" ON public.branches
  FOR SELECT USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager' OR
    company_id IN (
      SELECT id FROM public.companies 
      WHERE tenant_id = (SELECT tenant_id FROM auth.users WHERE id = auth.uid())
    )
  );

-- 8. Função para atualizar role de usuário
CREATE OR REPLACE FUNCTION update_user_role(user_email TEXT, new_role TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE auth.users 
  SET role = new_role 
  WHERE email = user_email;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Usuário com email % não encontrado', user_email;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Função para obter role do usuário atual
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM auth.users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Exemplos de uso (comente as linhas abaixo se não quiser executar)
-- SELECT update_user_role('admin@empresa.com', 'owner');
-- SELECT update_user_role('gerente@empresa.com', 'manager');
-- SELECT update_user_role('funcionario@empresa.com', 'employee');

-- =====================================================
-- VERIFICAÇÃO DA CONFIGURAÇÃO
-- =====================================================

-- Verificar se a coluna role foi criada
SELECT 
  column_name, 
  data_type, 
  column_default, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'auth' 
  AND column_name = 'role';

-- Verificar políticas RLS criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('employees', 'schedules', 'companies', 'branches');

-- Verificar funções criadas
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines 
WHERE routine_name IN ('update_user_role', 'get_current_user_role');

-- =====================================================
-- INSTRUÇÕES DE USO
-- =====================================================

/*
1. Execute este script no SQL Editor do Supabase
2. Verifique se todas as políticas foram criadas
3. Use as funções para atualizar roles:

   -- Definir owner
   SELECT update_user_role('admin@empresa.com', 'owner');
   
   -- Definir manager
   SELECT update_user_role('gerente@empresa.com', 'manager');
   
   -- Definir employee
   SELECT update_user_role('funcionario@empresa.com', 'employee');

4. Teste o RBAC na aplicação acessando /rbac-demo
*/
