# 🚀 INSTRUÇÕES DE DEPLOY PARA RESOLVER IMPEDIMENTOS

## 1. APLICAR MIGRAÇÃO RLS (CRÍTICO)

Execute no SQL Editor do Supabase:

```sql
-- Aplicar o conteúdo do arquivo:
-- supabase/migrations/20241222_fix_rls_policies.sql
```

## 2. DEPLOY DAS EDGE FUNCTIONS

```bash
# Fazer login no Supabase CLI
supabase login

# Fazer deploy das functions
supabase functions deploy validate-schedule
supabase functions deploy calculate-schedule-cost
```

## 3. VERIFICAR CONFIGURAÇÃO

1. Confirme que as variáveis de ambiente estão corretas:
   - VITE_SUPABASE_URL=https://doldfscfnivsrhqopecu.supabase.co
   - VITE_SUPABASE_ANON_KEY=[chave confirmada]

2. Teste o fluxo de setup:
   - Crie uma nova conta
   - Verifique se o setup wizard aparece
   - Complete a criação da empresa

## 4. TESTAR FUNCIONALIDADES

Após o deploy:

1. **Gestão de Funcionários:**
   - Criar funcionário
   - Editar funcionário
   - Visualizar lista

2. **Gestão de Escalas:**
   - Criar nova escala
   - Adicionar turnos
   - Validar em tempo real
   - Calcular custos

## 5. MONITORAMENTO

- Verificar logs das Edge Functions
- Monitorar performance das queries
- Validar políticas RLS funcionando

## STATUS ATUAL

✅ Código implementado
⚠️ Aguardando deploy da migração RLS
⚠️ Aguardando deploy das Edge Functions
🔄 Pronto para testes finais
