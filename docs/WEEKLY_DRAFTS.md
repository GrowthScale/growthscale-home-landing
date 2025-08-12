# 📅 Sistema de Rascunhos Semanais Automáticos

## Visão Geral

O sistema de rascunhos semanais é uma funcionalidade automatizada que gera sugestões de escala para todas as empresas cadastradas na plataforma, utilizando Inteligência Artificial para otimizar a alocação de funcionários.

## 🏗️ Arquitetura

### Componentes Principais

1. **Tabela `schedule_drafts`**: Armazena os rascunhos gerados
2. **Função Edge `generate-weekly-drafts`**: Executa a lógica de geração
3. **Integração com IA**: Utiliza a função `suggest-schedule` existente
4. **Sistema de Agendamento**: Execução semanal automática

### Fluxo de Funcionamento

```
1. Agendamento Semanal (Segunda-feira 6:00 AM)
   ↓
2. Buscar todas as empresas ativas
   ↓
3. Para cada empresa:
   - Verificar se já existe rascunho para a semana
   - Buscar funcionários e templates
   - Gerar sugestão com IA
   - Salvar rascunho no banco
   ↓
4. Notificar gestores sobre novos rascunhos
```

## 📊 Estrutura da Tabela

### `schedule_drafts`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `updated_at` | TIMESTAMPTZ | Data de última atualização |
| `tenant_id` | UUID | ID da empresa |
| `target_week_start` | DATE | Início da semana alvo |
| `draft_data` | JSONB | Dados da escala sugerida |
| `status` | TEXT | Status: pending_review, approved, dismissed |

### Status dos Rascunhos

- **`pending_review`**: Rascunho gerado, aguardando revisão
- **`approved`**: Rascunho aprovado pelo gestor
- **`dismissed`**: Rascunho rejeitado

## 🚀 Configuração

### 1. Criar a Tabela

Execute o script SQL no painel do Supabase:

```sql
-- Execute o conteúdo de supabase/schedule-drafts-table.sql
```

### 2. Deploy da Função

```bash
# Usar o script automatizado
./scripts/setup-weekly-drafts.sh

# Ou manualmente
supabase functions deploy generate-weekly-drafts
```

### 3. Configurar Agendamento

O Supabase não possui cron nativo. Use uma das opções:

#### Opção A: GitHub Actions

```yaml
# .github/workflows/weekly-drafts.yml
name: Weekly Schedule Drafts
on:
  schedule:
    - cron: '0 6 * * 1' # Segunda-feira 6:00 AM

jobs:
  generate-drafts:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Weekly Drafts
        run: |
          curl -X POST "https://${{ secrets.SUPABASE_PROJECT_REF }}.supabase.co/functions/v1/generate-weekly-drafts" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}" \
            -H "Content-Type: application/json"
```

#### Opção B: Vercel Cron Jobs

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/weekly-drafts",
      "schedule": "0 6 * * 1"
    }
  ]
}
```

#### Opção C: Serviço Externo

Use serviços como:
- cron-job.org
- EasyCron
- Zapier

## 🔧 Configuração Manual

### 1. Criar Tabela no Supabase

1. Acesse o painel do Supabase
2. Vá para "Table Editor"
3. Execute o script `supabase/schedule-drafts-table.sql`

### 2. Deploy da Função

1. Certifique-se de estar logado no Supabase CLI
2. Execute: `supabase functions deploy generate-weekly-drafts`

### 3. Configurar Variáveis de Ambiente

A função utiliza as seguintes variáveis:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📈 Monitoramento

### Logs da Função

Acesse os logs no painel do Supabase:
1. Vá para "Edge Functions"
2. Clique em "generate-weekly-drafts"
3. Visualize os logs de execução

### Métricas Importantes

- Número de tenants processados
- Taxa de sucesso na geração
- Tempo de execução
- Erros e exceções

## 🛠️ Manutenção

### Verificar Status

```bash
# Listar funções
supabase functions list

# Ver logs
supabase functions logs generate-weekly-drafts
```

### Teste Manual

```bash
# Testar a função
curl -X POST "https://SEU_PROJECT_REF.supabase.co/functions/v1/generate-weekly-drafts" \
  -H "Authorization: Bearer SUA_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json"
```

### Troubleshooting

#### Erro: "Chave de serviço não encontrada"
- Verifique se `SUPABASE_SERVICE_ROLE_KEY` está configurada
- Execute: `supabase secrets list`

#### Erro: "Nenhum tenant encontrado"
- Verifique se existem empresas cadastradas
- Confirme a estrutura da tabela `companies`

#### Erro: "Função suggest-schedule não encontrada"
- Deploy a função `suggest-schedule` primeiro
- Verifique se está funcionando corretamente

## 🔒 Segurança

### Row Level Security (RLS)

A tabela possui políticas RLS configuradas:
- Usuários só veem rascunhos da própria empresa
- Apenas funções do sistema podem inserir rascunhos
- Usuários podem atualizar/deletar rascunhos da própria empresa

### Validações

- Verificação de duplicatas por tenant/semana
- Validação de dados antes da inserção
- Tratamento de erros robusto

## 📱 Integração Frontend

### Serviço de Rascunhos

```typescript
// src/services/scheduleDraftService.ts
export class ScheduleDraftService {
  async getDrafts(): Promise<ApiResponse<ScheduleDraft[]>> {
    // Implementar busca de rascunhos
  }
  
  async approveDraft(id: string): Promise<ApiResponse<void>> {
    // Implementar aprovação
  }
  
  async dismissDraft(id: string): Promise<ApiResponse<void>> {
    // Implementar rejeição
  }
}
```

### Componente de Listagem

```typescript
// src/components/schedules/ScheduleDrafts.tsx
export function ScheduleDrafts() {
  // Implementar interface para visualizar rascunhos
  // Permitir aprovar/rejeitar rascunhos
  // Mostrar preview da escala sugerida
}
```

## 🎯 Benefícios

### Para Gestores
- **Automação**: Escalas geradas automaticamente
- **Otimização**: IA considera múltiplos fatores
- **Flexibilidade**: Pode aprovar, rejeitar ou modificar
- **Economia de Tempo**: Reduz trabalho manual

### Para Empresas
- **Consistência**: Padrão semanal estabelecido
- **Compliance**: Respeita regras da CLT
- **Eficiência**: Melhor alocação de recursos
- **Previsibilidade**: Planejamento antecipado

## 🔄 Próximos Passos

1. **Implementar Frontend**: Criar interface para gestores
2. **Notificações**: Alertar sobre novos rascunhos
3. **Analytics**: Métricas de uso e eficácia
4. **Personalização**: Configurações por empresa
5. **Integração**: Conectar com sistema de notificações

## 📚 Referências

- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [GitHub Actions Cron](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
