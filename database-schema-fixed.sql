-- =====================================================
-- SCHEMA COMPLETO DO BANCO DE DADOS - GROWTHSCALE (CORRIGIDO)
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. TABELA COMPANIES (TENANTS) - PRIMEIRA
-- =====================================================

CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Informações básicas
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  trade_name TEXT,
  description TEXT,
  logo TEXT,
  
  -- Status
  status TEXT CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'active',
  
  -- Endereço
  address JSONB NOT NULL DEFAULT '{}',
  
  -- Contato
  contact JSONB NOT NULL DEFAULT '{}',
  
  -- Configurações
  settings JSONB NOT NULL DEFAULT '{}'
);

-- Habilitar RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. TABELA COMPANY_USERS (Relacionamento User-Company) - SEGUNDA
-- =====================================================

CREATE TABLE company_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'admin', 'manager', 'user')) DEFAULT 'user',
  
  UNIQUE(user_id, company_id)
);

-- Habilitar RLS
ALTER TABLE company_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. TABELA BRANCHES (Filiais) - TERCEIRA
-- =====================================================

CREATE TABLE branches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  description TEXT,
  address JSONB NOT NULL DEFAULT '{}',
  contact JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL
);

-- Habilitar RLS
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. TABELA EMPLOYEES - QUARTA
-- =====================================================

CREATE TABLE employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Informações básicas
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  position TEXT NOT NULL,
  department TEXT,
  
  -- Status
  status TEXT CHECK (status IN ('active', 'inactive', 'vacation', 'sick_leave')) DEFAULT 'active',
  
  -- Datas
  start_date DATE NOT NULL,
  end_date DATE,
  
  -- Salário e carga horária
  salary DECIMAL(10,2),
  workload_hours INTEGER DEFAULT 44, -- Carga horária semanal em horas
  
  -- Habilidades
  skills TEXT[],
  
  -- Endereço
  address JSONB DEFAULT '{}',
  
  -- Avatar
  avatar TEXT,
  
  -- Relacionamentos
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL
);

-- Habilitar RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. TABELA SCHEDULES - QUINTA
-- =====================================================

CREATE TABLE schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  
  -- Status da escala
  status TEXT CHECK (status IN ('draft', 'published', 'completed', 'cancelled')) DEFAULT 'draft',
  
  -- Relacionamentos
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  
  -- Metadados
  notes TEXT,
  total_cost DECIMAL(10,2),
  total_hours DECIMAL(5,2)
);

-- Habilitar RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. TABELA SHIFTS - SEXTA
-- =====================================================

CREATE TABLE shifts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Horários
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  -- Relacionamentos
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE NOT NULL,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
  
  -- Metadados
  notes TEXT,
  cost DECIMAL(10,2),
  hours_worked DECIMAL(4,2),
  
  -- Status
  status TEXT CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled'
);

-- Habilitar RLS
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 7. TABELA SCHEDULE_TEMPLATES - SÉTIMA
-- =====================================================

CREATE TABLE schedule_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  description TEXT,
  
  -- Dados do template em JSONB
  template_data JSONB NOT NULL DEFAULT '{}',
  
  -- Relacionamentos
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE
);

-- Habilitar RLS
ALTER TABLE schedule_templates ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 8. TABELA COMMUNICATION_LOGS - OITAVA
-- =====================================================

CREATE TABLE communication_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Relacionamentos
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  
  -- Dados da comunicação
  type TEXT NOT NULL CHECK (type IN ('whatsapp', 'email', 'sms', 'push')),
  status TEXT NOT NULL CHECK (status IN ('SUCCESS', 'FAILED', 'PENDING')),
  
  -- Detalhes
  details JSONB DEFAULT '{}',
  message TEXT,
  recipient TEXT,
  error_message TEXT
);

-- Habilitar RLS
ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 9. TABELA ACTIVITY_LOGS - NONA
-- =====================================================

CREATE TABLE activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Relacionamentos
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Dados da atividade
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  
  -- Detalhes
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT
);

-- Habilitar RLS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS RLS (APÓS CRIAR TODAS AS TABELAS)
-- =====================================================

-- Políticas RLS para companies
CREATE POLICY "Users can view their own companies" ON companies
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM company_users WHERE company_id = companies.id
  ));

CREATE POLICY "Users can insert their own companies" ON companies
  FOR INSERT WITH CHECK (auth.uid() IN (
    SELECT user_id FROM company_users WHERE company_id = companies.id
  ));

CREATE POLICY "Users can update their own companies" ON companies
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM company_users WHERE company_id = companies.id
  ));

CREATE POLICY "Users can delete their own companies" ON companies
  FOR DELETE USING (auth.uid() IN (
    SELECT user_id FROM company_users WHERE company_id = companies.id
  ));

-- Políticas RLS para company_users
CREATE POLICY "Users can view their company associations" ON company_users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their company associations" ON company_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their company associations" ON company_users
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their company associations" ON company_users
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para branches
CREATE POLICY "Users can view branches from their companies" ON branches
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert branches in their companies" ON branches
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update branches in their companies" ON branches
  FOR UPDATE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete branches in their companies" ON branches
  FOR DELETE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

-- Políticas RLS para employees
CREATE POLICY "Users can view employees from their companies" ON employees
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert employees in their companies" ON employees
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update employees in their companies" ON employees
  FOR UPDATE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete employees in their companies" ON employees
  FOR DELETE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

-- Políticas RLS para schedules
CREATE POLICY "Users can view schedules from their companies" ON schedules
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert schedules in their companies" ON schedules
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update schedules in their companies" ON schedules
  FOR UPDATE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete schedules in their companies" ON schedules
  FOR DELETE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

-- Políticas RLS para shifts
CREATE POLICY "Users can view shifts from their companies" ON shifts
  FOR SELECT USING (schedule_id IN (
    SELECT s.id FROM schedules s 
    JOIN company_users cu ON s.company_id = cu.company_id 
    WHERE cu.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert shifts in their companies" ON shifts
  FOR INSERT WITH CHECK (schedule_id IN (
    SELECT s.id FROM schedules s 
    JOIN company_users cu ON s.company_id = cu.company_id 
    WHERE cu.user_id = auth.uid()
  ));

CREATE POLICY "Users can update shifts in their companies" ON shifts
  FOR UPDATE USING (schedule_id IN (
    SELECT s.id FROM schedules s 
    JOIN company_users cu ON s.company_id = cu.company_id 
    WHERE cu.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete shifts in their companies" ON shifts
  FOR DELETE USING (schedule_id IN (
    SELECT s.id FROM schedules s 
    JOIN company_users cu ON s.company_id = cu.company_id 
    WHERE cu.user_id = auth.uid()
  ));

-- Políticas RLS para schedule_templates
CREATE POLICY "Users can view templates from their companies" ON schedule_templates
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert templates in their companies" ON schedule_templates
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update templates in their companies" ON schedule_templates
  FOR UPDATE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete templates in their companies" ON schedule_templates
  FOR DELETE USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

-- Políticas RLS para communication_logs
CREATE POLICY "Users can view communication logs from their companies" ON communication_logs
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert communication logs in their companies" ON communication_logs
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

-- Políticas RLS para activity_logs
CREATE POLICY "Users can view activity logs from their companies" ON activity_logs
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert activity logs in their companies" ON activity_logs
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM company_users WHERE user_id = auth.uid()
  ));

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para companies
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_cnpj ON companies(cnpj);

-- Índices para employees
CREATE INDEX idx_employees_company_id ON employees(company_id);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_email ON employees(email);

-- Índices para schedules
CREATE INDEX idx_schedules_company_id ON schedules(company_id);
CREATE INDEX idx_schedules_date ON schedules(date);
CREATE INDEX idx_schedules_status ON schedules(status);

-- Índices para shifts
CREATE INDEX idx_shifts_schedule_id ON shifts(schedule_id);
CREATE INDEX idx_shifts_employee_id ON shifts(employee_id);
CREATE INDEX idx_shifts_start_time ON shifts(start_time);

-- Índices para communication_logs
CREATE INDEX idx_communication_logs_company_id ON communication_logs(company_id);
CREATE INDEX idx_communication_logs_status ON communication_logs(status);
CREATE INDEX idx_communication_logs_created_at ON communication_logs(created_at);

-- =====================================================
-- FUNÇÕES DE TRIGGER PARA UPDATED_AT
-- =====================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shifts_updated_at BEFORE UPDATE ON shifts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedule_templates_updated_at BEFORE UPDATE ON schedule_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
