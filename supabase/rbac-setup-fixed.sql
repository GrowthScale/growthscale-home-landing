-- =====================================================
-- SCRIPT RBAC CORRIGIDO - GROWTHSCALE
-- Versão que funciona com as limitações do Supabase
-- =====================================================

-- 1. Criar tabela de perfis de usuário (se não existir)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'employee' CHECK (role IN ('owner', 'manager', 'employee')),
  tenant_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_tenant ON public.user_profiles(tenant_id);

-- 3. Ativar Row Level Security (RLS) nas tabelas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- 4. Políticas RLS para user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5. Políticas RLS para employees (CORRIGIDO - sem user_id)
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;
CREATE POLICY "Employees can view own data" ON public.employees
  FOR SELECT USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'manager' OR
    -- Employees podem ver seus próprios dados se o email corresponder
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

DROP POLICY IF EXISTS "Employees can update own data" ON public.employees;
CREATE POLICY "Employees can update own data" ON public.employees
  FOR UPDATE USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'manager' OR
    -- Employees podem atualizar seus próprios dados se o email corresponder
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- 6. Políticas RLS para schedules (CORRIGIDO - usando company_id)
DROP POLICY IF EXISTS "Users can view schedules based on role" ON public.schedules;
CREATE POLICY "Users can view schedules based on role" ON public.schedules
  FOR SELECT USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'manager' OR
    -- Employees podem ver escalas da sua empresa
    company_id IN (
      SELECT company_id FROM public.employees 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can manage schedules based on role" ON public.schedules;
CREATE POLICY "Users can manage schedules based on role" ON public.schedules
  FOR ALL USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'manager'
  );

-- 7. Políticas RLS para companies (CORRIGIDO)
DROP POLICY IF EXISTS "Users can view companies based on role" ON public.companies;
CREATE POLICY "Users can view companies based on role" ON public.companies
  FOR SELECT USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner' OR
    id IN (
      SELECT company_id FROM public.employees 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Only owners can manage companies" ON public.companies;
CREATE POLICY "Only owners can manage companies" ON public.companies
  FOR ALL USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner'
  );

-- 8. Políticas RLS para branches (CORRIGIDO)
DROP POLICY IF EXISTS "Users can view branches based on role" ON public.branches;
CREATE POLICY "Users can view branches based on role" ON public.branches
  FOR SELECT USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'manager' OR
    company_id IN (
      SELECT company_id FROM public.employees 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- 9. Função para atualizar role de usuário
CREATE OR REPLACE FUNCTION update_user_role(user_email TEXT, new_role TEXT)
RETURNS VOID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Buscar o ID do usuário pelo email
  SELECT id INTO user_id FROM auth.users WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário com email % não encontrado', user_email;
  END IF;
  
  -- Inserir ou atualizar o perfil do usuário
  INSERT INTO public.user_profiles (id, role)
  VALUES (user_id, new_role)
  ON CONFLICT (id) 
  DO UPDATE SET 
    role = new_role,
    updated_at = NOW();
    
  RAISE NOTICE 'Role atualizado para %: %', user_email, new_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Função para obter role do usuário atual
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()),
    'employee'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role)
  VALUES (NEW.id, 'employee');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 13. Função para listar usuários e seus roles
CREATE OR REPLACE FUNCTION list_users_with_roles()
RETURNS TABLE (
  email TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.email,
    COALESCE(up.role, 'employee') as role,
    u.created_at
  FROM auth.users u
  LEFT JOIN public.user_profiles up ON u.id = up.id
  ORDER BY u.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VERIFICAÇÃO DA CONFIGURAÇÃO
-- =====================================================

-- Verificar se a tabela user_profiles foi criada
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_name = 'user_profiles' 
  AND table_schema = 'public';

-- Verificar políticas RLS criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'employees', 'schedules', 'companies', 'branches')
ORDER BY tablename, policyname;

-- Verificar funções criadas
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines 
WHERE routine_name IN ('update_user_role', 'get_current_user_role', 'handle_new_user', 'list_users_with_roles')
ORDER BY routine_name;

-- =====================================================
-- EXEMPLOS DE USO
-- =====================================================

/*
-- Definir roles de usuários (substitua pelos emails reais):
SELECT update_user_role('admin@empresa.com', 'owner');
SELECT update_user_role('gerente@empresa.com', 'manager');
SELECT update_user_role('funcionario@empresa.com', 'employee');

-- Listar todos os usuários e seus roles:
SELECT * FROM list_users_with_roles();

-- Verificar role do usuário atual:
SELECT get_current_user_role();
*/

-- =====================================================
-- INSTRUÇÕES DE USO
-- =====================================================

/*
1. Execute este script no SQL Editor do Supabase
2. Verifique se todas as tabelas, políticas e funções foram criadas
3. Use as funções para atualizar roles:

   -- Definir owner
   SELECT update_user_role('admin@empresa.com', 'owner');
   
   -- Definir manager
   SELECT update_user_role('gerente@empresa.com', 'manager');
   
   -- Definir employee
   SELECT update_user_role('funcionario@empresa.com', 'employee');

4. Teste o RBAC na aplicação acessando /rbac-demo
*/
