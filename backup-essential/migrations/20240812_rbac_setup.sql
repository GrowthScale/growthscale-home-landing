-- Migration: RBAC Setup
-- Description: Configuração inicial do sistema de Controle de Acesso Baseado em Papéis
-- Date: 2024-08-12

-- Adicionar coluna role na tabela auth.users
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee';

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_role ON auth.users(role);

-- Ativar Row Level Security (RLS) nas tabelas principais
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para employees
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;
CREATE POLICY "Employees can view own data" ON public.employees
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager'
  );

-- Políticas RLS para schedules
DROP POLICY IF EXISTS "Users can view schedules based on role" ON public.schedules;
CREATE POLICY "Users can view schedules based on role" ON public.schedules
  FOR SELECT USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager' OR
    employee_id = auth.uid()
  );

-- Função para atualizar role de usuário
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
