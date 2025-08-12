# 🔐 Automação da Configuração RBAC

Este documento explica como automatizar a configuração do sistema RBAC no Supabase.

## 🚀 Opções de Automação

### **Opção 1: Script SQL Completo (Mais Fácil)**

#### **Passo 1: Execute o Script SQL**
1. Acesse o painel do Supabase
2. Vá para **SQL Editor**
3. Copie e cole o conteúdo de `supabase/rbac-setup.sql`
4. Clique em **Run**

#### **Passo 2: Configure os Roles**
Execute os seguintes comandos no SQL Editor:

```sql
-- Definir owner
SELECT update_user_role('admin@empresa.com', 'owner');

-- Definir manager
SELECT update_user_role('gerente@empresa.com', 'manager');

-- Definir employee
SELECT update_user_role('funcionario@empresa.com', 'employee');
```

### **Opção 2: Supabase CLI (Mais Avançado)**

#### **Pré-requisitos:**
```bash
# Instalar Supabase CLI
npm install -g supabase

# Fazer login
supabase login
```

#### **Executar Migração:**
```bash
# Executar migração
supabase db push

# Ou usar o script automatizado
./scripts/setup-rbac.sh
```

### **Opção 3: Script Automatizado (Recomendado)**

#### **Executar o Script:**
```bash
# Tornar executável (se necessário)
chmod +x scripts/setup-rbac.sh

# Executar script
./scripts/setup-rbac.sh
```

#### **O que o Script Faz:**
1. ✅ Verifica se o Supabase CLI está instalado
2. ✅ Verifica se está logado no Supabase
3. ✅ Executa a migração automaticamente
4. ✅ Solicita emails dos usuários
5. ✅ Gera comandos SQL para configurar roles
6. ✅ Verifica a configuração

## 📋 Scripts Disponíveis

### **1. Script SQL Completo**
- **Arquivo:** `supabase/rbac-setup.sql`
- **Função:** Configuração completa do RBAC
- **Inclui:** Colunas, índices, RLS, políticas, funções

### **2. Migração Supabase**
- **Arquivo:** `supabase/migrations/20240812_rbac_setup.sql`
- **Função:** Migração via Supabase CLI
- **Inclui:** Configuração básica do RBAC

### **3. Script Bash Automatizado**
- **Arquivo:** `scripts/setup-rbac.sh`
- **Função:** Automação completa do processo
- **Inclui:** Menu interativo e verificações

## 🔧 Configuração Manual (Fallback)

Se nenhuma das opções automáticas funcionar:

### **1. Adicionar Coluna Role:**
```sql
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee';
```

### **2. Ativar RLS:**
```sql
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
```

### **3. Criar Políticas:**
```sql
-- Política para employees
CREATE POLICY "Employees can view own data" ON public.employees
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager'
  );
```

### **4. Definir Roles:**
```sql
UPDATE auth.users SET role = 'owner' WHERE email = 'admin@empresa.com';
UPDATE auth.users SET role = 'manager' WHERE email = 'gerente@empresa.com';
UPDATE auth.users SET role = 'employee' WHERE email = 'funcionario@empresa.com';
```

## 🧪 Verificação da Configuração

### **1. Verificar Coluna Role:**
```sql
SELECT 
  column_name, 
  data_type, 
  column_default, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'auth' 
  AND column_name = 'role';
```

### **2. Verificar Políticas RLS:**
```sql
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
```

### **3. Verificar Funções:**
```sql
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines 
WHERE routine_name IN ('update_user_role', 'get_current_user_role');
```

## 🎯 Testando o RBAC

### **1. Acesse a Aplicação:**
- **URL:** https://growthscale-home-landing-cbvgjirmd.vercel.app
- **Página de Demo:** `/rbac-demo`

### **2. Teste com Diferentes Usuários:**
- **Owner:** Acesso total a todas as funcionalidades
- **Manager:** Acesso limitado à unidade
- **Employee:** Acesso apenas à própria escala

### **3. Verificar Permissões:**
- Use a seção "Informações de Debug" na página `/rbac-demo`
- Verifique se as permissões estão corretas
- Teste os componentes de acesso

## 🚨 Troubleshooting

### **Erro: "AuthContext is not exported"**
```bash
# Verificar se o AuthContext está sendo exportado
grep -n "export.*AuthContext" src/contexts/AuthContext.tsx
```

### **Erro: "Role column not found"**
```sql
-- Verificar se a coluna existe
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'role';
```

### **Erro: "RLS not enabled"**
```sql
-- Verificar RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('employees', 'schedules', 'companies');
```

### **Erro: "Policy not found"**
```sql
-- Verificar políticas
SELECT policyname FROM pg_policies 
WHERE tablename IN ('employees', 'schedules', 'companies');
```

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** do script automatizado
2. **Execute a configuração manual** como fallback
3. **Consulte a documentação** em `docs/RBAC_SETUP.md`
4. **Teste a aplicação** em `/rbac-demo`

## 🎉 Próximos Passos

Após a configuração:

1. ✅ **Teste o RBAC** na aplicação
2. ✅ **Configure usuários** com roles apropriados
3. ✅ **Implemente Empty States** (TODO comments já adicionados)
4. ✅ **Adicione GIFs** na Features Section (TODO comments já adicionados)
5. ✅ **Personalize permissões** conforme necessário
