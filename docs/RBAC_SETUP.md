# Configuração do RBAC (Role-Based Access Control)

Este documento explica como configurar o sistema de Controle de Acesso Baseado em Papéis no projeto GrowthScale.

## 📋 Visão Geral

O RBAC permite controlar o acesso a funcionalidades baseado no papel do usuário:
- **Owner**: Acesso total à empresa
- **Manager**: Acesso à unidade específica
- **Employee**: Acesso limitado ao próprio conteúdo

## 🗄️ Configuração no Banco de Dados

### 1. Adicionar Coluna de Role

No painel do Supabase, vá até a tabela de usuários e adicione:

```sql
-- Adicionar coluna role na tabela auth.users (via SQL Editor)
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee';

-- Ou se você tiver uma tabela profiles separada:
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee';
```

### 2. Configurar RLS (Row Level Security)

```sql
-- Ativar RLS nas tabelas
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Política para employees
CREATE POLICY "Employees can view own data" ON public.employees
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager'
  );

-- Política para schedules
CREATE POLICY "Users can view schedules based on role" ON public.schedules
  FOR SELECT USING (
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'owner' OR
    (SELECT role FROM auth.users WHERE id = auth.uid()) = 'manager' OR
    employee_id = auth.uid()
  );
```

## 🔧 Configuração no Frontend

### 1. Hook de Acesso (já implementado)

O hook `useAccessControl` está localizado em `src/hooks/useAccessControl.ts`:

```typescript
import { useAccessControl } from '@/hooks/useAccessControl';

function MyComponent() {
  const { role, can } = useAccessControl();
  
  return (
    <div>
      {can('view:billing') && <BillingSection />}
      {can('manage:employees') && <EmployeeManagement />}
    </div>
  );
}
```

### 2. Componentes de Acesso

Use os componentes de conveniência:

```typescript
import { AccessControl, OwnerOnly, ManagerOnly } from '@/components/AccessControl';

// Verificação específica de permissão
<AccessControl permission="view:billing">
  <BillingButton />
</AccessControl>

// Verificação por papel
<OwnerOnly>
  <CompanySettings />
</OwnerOnly>

<ManagerOnly>
  <UnitManagement />
</ManagerOnly>
```

## 🎯 Permissões Disponíveis

### Owner
- `view:billing` - Ver faturamento
- `manage:company_settings` - Gerenciar configurações da empresa
- `manage:all_schedules` - Gerenciar todas as escalas
- `view:full_dashboard` - Ver dashboard completo
- `manage:all_employees` - Gerenciar todos os funcionários

### Manager
- `manage:unit_schedules` - Gerenciar escalas da unidade
- `view:unit_dashboard` - Ver dashboard da unidade
- `manage:unit_employees` - Gerenciar funcionários da unidade

### Employee
- `view:own_schedule` - Ver própria escala

## 🚀 Como Usar

### 1. Verificação Simples

```typescript
const { can } = useAccessControl();

if (can('view:billing')) {
  // Mostrar seção de faturamento
}
```

### 2. Renderização Condicional

```typescript
{can('manage:employees') && (
  <Button onClick={handleAddEmployee}>
    Adicionar Funcionário
  </Button>
)}
```

### 3. Componente de Acesso

```typescript
<AccessControl permission="view:billing">
  <BillingSection />
</AccessControl>
```

### 4. Fallback para Acesso Negado

```typescript
<AccessControl 
  permission="manage:company_settings"
  fallback={<AccessDeniedMessage />}
>
  <CompanySettings />
</AccessControl>
```

## 🔒 Configuração de Usuários

### Definir Role de um Usuário

No Supabase, você pode definir o role de um usuário via SQL:

```sql
-- Definir usuário como owner
UPDATE auth.users 
SET role = 'owner' 
WHERE email = 'admin@empresa.com';

-- Definir usuário como manager
UPDATE auth.users 
SET role = 'manager' 
WHERE email = 'gerente@empresa.com';

-- Definir usuário como employee (padrão)
UPDATE auth.users 
SET role = 'employee' 
WHERE email = 'funcionario@empresa.com';
```

### Via Interface do Supabase

1. Vá para **Authentication > Users**
2. Clique no usuário
3. Em **User Metadata**, adicione:
   ```json
   {
     "role": "owner"
   }
   ```

## 🧪 Testando o RBAC

### 1. Página de Demonstração

Acesse `/rbac-demo` para ver o RBAC em ação.

### 2. Testando Diferentes Roles

1. Crie usuários com diferentes roles
2. Faça login com cada usuário
3. Verifique se as funcionalidades aparecem corretamente

### 3. Debug

Use o componente de debug para verificar permissões:

```typescript
const { role, can } = useAccessControl();

console.log('Role:', role);
console.log('Can view billing:', can('view:billing'));
```

## 🔧 Personalização

### Adicionar Novas Permissões

1. Adicione a permissão no `rolesPermissions`:

```typescript
const rolesPermissions = {
  owner: [
    'view:billing',
    'manage:company_settings',
    'manage:all_schedules',
    'view:full_dashboard',
    'manage:all_employees',
    'new:permission', // ← Nova permissão
  ],
  // ...
};
```

2. Use a permissão nos componentes:

```typescript
{can('new:permission') && <NewFeature />}
```

### Adicionar Novos Roles

1. Adicione o novo role:

```typescript
const rolesPermissions = {
  owner: [...],
  manager: [...],
  employee: [...],
  supervisor: [ // ← Novo role
    'view:unit_reports',
    'manage:unit_schedules',
  ],
};
```

2. Atualize o tipo:

```typescript
type Role = keyof typeof rolesPermissions;
```

## 🚨 Considerações de Segurança

1. **Sempre verifique no backend**: O RBAC no frontend é apenas para UX
2. **Use RLS no Supabase**: Configure políticas de segurança no banco
3. **Valide no servidor**: Sempre valide permissões nas APIs
4. **Audite regularmente**: Revise permissões periodicamente

## 📞 Suporte

Para dúvidas sobre RBAC:
1. Consulte este documento
2. Verifique os exemplos em `/rbac-demo`
3. Revise o código em `src/hooks/useAccessControl.ts`
