# 🔐 Implementação do Controle de Acesso Baseado em Papéis (RBAC)

## 📋 Visão Geral

Este documento descreve a implementação completa do sistema de Controle de Acesso Baseado em Papéis (RBAC) no GrowthScale, incluindo configurações de banco de dados, políticas de segurança e uso no frontend.

## 🗄️ 1. Configuração do Banco de Dados

### 1.1 Adicionar Coluna `role` na Tabela `employees`

Execute o seguinte SQL no seu banco Supabase:

```sql
-- Adicionar coluna role na tabela employees
ALTER TABLE employees 
ADD COLUMN role TEXT DEFAULT 'employee' NOT NULL;

-- Criar índice para otimizar consultas por role
CREATE INDEX idx_employees_role ON employees(role);

-- Adicionar constraint para validar roles válidos
ALTER TABLE employees 
ADD CONSTRAINT check_valid_role 
CHECK (role IN ('owner', 'manager', 'employee'));

-- Atualizar registros existentes (ajuste conforme necessário)
UPDATE employees 
SET role = 'owner' 
WHERE id IN (SELECT DISTINCT owner_id FROM companies);

UPDATE employees 
SET role = 'manager' 
WHERE position ILIKE '%gerente%' OR position ILIKE '%manager%';
```

### 1.2 Adicionar Coluna `role` na Tabela `users` (se existir)

```sql
-- Se você tiver uma tabela users separada
ALTER TABLE users 
ADD COLUMN role TEXT DEFAULT 'employee' NOT NULL;

CREATE INDEX idx_users_role ON users(role);

ALTER TABLE users 
ADD CONSTRAINT check_valid_user_role 
CHECK (role IN ('owner', 'manager', 'employee'));
```

## 🔒 2. Configuração do Supabase RLS (Row Level Security)

### 2.1 Ativar RLS nas Tabelas

```sql
-- Ativar RLS em todas as tabelas principais
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
```

### 2.2 Políticas para Tabela `employees`

```sql
-- Política: Usuários podem ver apenas funcionários do seu tenant
CREATE POLICY "Users can view employees from their tenant" ON employees
FOR SELECT USING (
  tenant_id = auth.jwt() ->> 'tenant_id'
);

-- Política: Apenas managers e owners podem inserir funcionários
CREATE POLICY "Only managers and owners can insert employees" ON employees
FOR INSERT WITH CHECK (
  tenant_id = auth.jwt() ->> 'tenant_id' AND
  EXISTS (
    SELECT 1 FROM employees 
    WHERE id = auth.uid() 
    AND role IN ('manager', 'owner')
    AND tenant_id = employees.tenant_id
  )
);

-- Política: Apenas managers e owners podem atualizar funcionários
CREATE POLICY "Only managers and owners can update employees" ON employees
FOR UPDATE USING (
  tenant_id = auth.jwt() ->> 'tenant_id' AND
  EXISTS (
    SELECT 1 FROM employees 
    WHERE id = auth.uid() 
    AND role IN ('manager', 'owner')
    AND tenant_id = employees.tenant_id
  )
);

-- Política: Apenas owners podem deletar funcionários
CREATE POLICY "Only owners can delete employees" ON employees
FOR DELETE USING (
  tenant_id = auth.jwt() ->> 'tenant_id' AND
  EXISTS (
    SELECT 1 FROM employees 
    WHERE id = auth.uid() 
    AND role = 'owner'
    AND tenant_id = employees.tenant_id
  )
);
```

### 2.3 Políticas para Tabela `schedules`

```sql
-- Política: Usuários podem ver escalas do seu tenant
CREATE POLICY "Users can view schedules from their tenant" ON schedules
FOR SELECT USING (
  tenant_id = auth.jwt() ->> 'tenant_id'
);

-- Política: Apenas managers e owners podem gerenciar escalas
CREATE POLICY "Only managers and owners can manage schedules" ON schedules
FOR ALL USING (
  tenant_id = auth.jwt() ->> 'tenant_id' AND
  EXISTS (
    SELECT 1 FROM employees 
    WHERE id = auth.uid() 
    AND role IN ('manager', 'owner')
    AND tenant_id = schedules.tenant_id
  )
);
```

### 2.4 Políticas para Tabela `companies`

```sql
-- Política: Apenas owners podem gerenciar empresas
CREATE POLICY "Only owners can manage companies" ON companies
FOR ALL USING (
  tenant_id = auth.jwt() ->> 'tenant_id' AND
  EXISTS (
    SELECT 1 FROM employees 
    WHERE id = auth.uid() 
    AND role = 'owner'
    AND tenant_id = companies.tenant_id
  )
);
```

### 2.5 Políticas para Tabela `branches`

```sql
-- Política: Usuários podem ver filiais do seu tenant
CREATE POLICY "Users can view branches from their tenant" ON branches
FOR SELECT USING (
  tenant_id = auth.jwt() ->> 'tenant_id'
);

-- Política: Apenas owners podem gerenciar filiais
CREATE POLICY "Only owners can manage branches" ON branches
FOR INSERT, UPDATE, DELETE USING (
  tenant_id = auth.jwt() ->> 'tenant_id' AND
  EXISTS (
    SELECT 1 FROM employees 
    WHERE id = auth.uid() 
    AND role = 'owner'
    AND tenant_id = branches.tenant_id
  )
);
```

## 🎯 3. Configuração do Frontend

### 3.1 Hook de Controle de Acesso

O hook `useAccessControl` já foi implementado em `src/hooks/useAccessControl.ts` com as seguintes funcionalidades:

- **Verificação de permissões**: `can(permission)`
- **Verificação de roles**: `hasRole(role)`, `hasAnyRole(roles)`
- **Helpers**: `isOwner()`, `isManager()`, `isEmployee()`
- **Informações do usuário**: `getRole()`, `user`

### 3.2 Componente de Proteção de Rotas

O `ProtectedRoute` foi atualizado para suportar:

- **Permissões específicas**: `requiredPermission`
- **Roles específicos**: `requiredRoles`
- **Mensagens de erro personalizadas**

### 3.3 Componente de Controle de Acesso

O componente `AccessControl` permite:

- **Proteção condicional de elementos**
- **Fallbacks personalizados**
- **Componentes de conveniência**: `OwnerOnly`, `ManagerOnly`, `EmployeeOnly`

## 📝 4. Exemplos de Uso

### 4.1 Proteção de Rotas

```tsx
// Rota que requer permissão específica
<Route path="/dashboard" element={
  <ProtectedRoute requiredPermission="view:full_dashboard">
    <Dashboard />
  </ProtectedRoute>
} />

// Rota que requer role específico
<Route path="/admin" element={
  <ProtectedRoute requiredRoles={['owner']}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

### 4.2 Controle de Elementos da Interface

```tsx
// Botão visível apenas para managers e owners
<AccessControl permission="manage:users">
  <Button>Gerenciar Funcionários</Button>
</AccessControl>

// Seção visível apenas para owners
<OwnerOnly>
  <div>Configurações Avançadas</div>
</OwnerOnly>

// Elemento com fallback
<AccessControl 
  permission="view:billing" 
  fallback={<p>Sem acesso ao faturamento</p>}
>
  <BillingSection />
</AccessControl>
```

### 4.3 Verificação Programática

```tsx
const { can, isOwner, getRole } = useAccessControl();

// Verificar permissão
if (can('manage:users')) {
  // Mostrar funcionalidades de gestão
}

// Verificar role
if (isOwner()) {
  // Mostrar funcionalidades exclusivas
}

// Obter role atual
console.log('Role atual:', getRole());
```

## 🔧 5. Configuração de Roles no Supabase

### 5.1 Atualizar Metadata do Usuário

Para definir o role de um usuário, atualize o `app_metadata`:

```sql
-- Via SQL (apenas para administradores)
UPDATE auth.users 
SET app_metadata = jsonb_set(
  app_metadata, 
  '{role}', 
  '"owner"'
) 
WHERE id = 'user-uuid';

-- Via Edge Function (recomendado)
-- Criar uma função para atualizar roles
```

### 5.2 Edge Function para Gerenciar Roles

```typescript
// supabase/functions/update-user-role/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { user_id, role } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { data, error } = await supabase.auth.admin.updateUserById(
    user_id,
    { app_metadata: { role } }
  )

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }

  return new Response(JSON.stringify({ success: true, user: data.user }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

## 🚀 6. Testando a Implementação

### 6.1 Verificar Permissões

```tsx
// No console do navegador
const { can, getRole } = useAccessControl();
console.log('Role:', getRole());
console.log('Can manage users:', can('manage:users'));
console.log('Can view billing:', can('view:billing'));
```

### 6.2 Testar Políticas RLS

```sql
-- Testar acesso como usuário específico
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.tenant_id" = 'tenant-uuid';
SET LOCAL "request.jwt.claim.role" = 'employee';

-- Tentar acessar dados
SELECT * FROM employees;
SELECT * FROM schedules;
```

## 📊 7. Matriz de Permissões

| Funcionalidade | Owner | Manager | Employee |
|----------------|-------|---------|----------|
| Dashboard Completo | ✅ | ❌ | ❌ |
| Dashboard Unitário | ✅ | ✅ | ❌ |
| Gerenciar Usuários | ✅ | ✅ | ❌ |
| Gerenciar Empresas | ✅ | ❌ | ❌ |
| Gerenciar Filiais | ✅ | ❌ | ❌ |
| Gerenciar Escalas | ✅ | ✅ | ❌ |
| Ver Própria Escala | ✅ | ✅ | ✅ |
| Compliance | ✅ | ✅ | ❌ |
| Configurações | ✅ | ❌ | ❌ |
| Integrações | ✅ | ❌ | ❌ |
| Faturamento | ✅ | ❌ | ❌ |

## 🔄 8. Migração de Dados Existentes

Se você já tem dados existentes, execute estas migrações:

```sql
-- 1. Adicionar colunas role
ALTER TABLE employees ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee';

-- 2. Definir roles baseados em posições existentes
UPDATE employees 
SET role = 'owner' 
WHERE position ILIKE '%proprietário%' OR position ILIKE '%owner%';

UPDATE employees 
SET role = 'manager' 
WHERE position ILIKE '%gerente%' OR position ILIKE '%manager%' OR position ILIKE '%supervisor%';

-- 3. Atualizar metadata dos usuários
-- (Execute via Edge Function ou painel do Supabase)
```

## ✅ 9. Checklist de Implementação

- [ ] Adicionar coluna `role` nas tabelas
- [ ] Configurar constraints e índices
- [ ] Ativar RLS nas tabelas
- [ ] Criar políticas de segurança
- [ ] Implementar hook `useAccessControl`
- [ ] Atualizar `ProtectedRoute`
- [ ] Criar componente `AccessControl`
- [ ] Aplicar proteções nas rotas
- [ ] Testar permissões
- [ ] Migrar dados existentes
- [ ] Documentar para a equipe

## 🆘 10. Troubleshooting

### Problema: Usuário não consegue acessar dados
**Solução**: Verificar se o `tenant_id` está correto no JWT e se as políticas RLS estão ativas.

### Problema: Permissões não funcionam no frontend
**Solução**: Verificar se o `app_metadata.role` está definido no usuário do Supabase.

### Problema: Políticas RLS muito restritivas
**Solução**: Ajustar as condições das políticas ou criar políticas mais granulares.

---

**Nota**: Esta implementação fornece uma base sólida para controle de acesso. Ajuste as permissões e políticas conforme as necessidades específicas do seu negócio.
