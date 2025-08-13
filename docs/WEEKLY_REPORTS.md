# 📊 Sistema de Relatórios Semanais

## Visão Geral

O sistema de relatórios semanais automatiza a geração e envio de relatórios executivos para todos os gestores da plataforma GrowthScale. Cada relatório contém métricas importantes da semana anterior, análise de IA e insights para tomada de decisão.

## 🏗️ Arquitetura

### Componentes Principais

1. **Edge Function `send-weekly-report`**
   - Processa todos os tenants ativos
   - Calcula métricas semanais
   - Gera resumo com IA
   - Envia e-mails personalizados

2. **Integração com IA (OpenAI)**
   - Análise automática das métricas
   - Resumo executivo personalizado
   - Insights acionáveis

3. **Sistema de E-mail (Resend)**
   - Templates HTML responsivos
   - Envio em lote para múltiplos tenants
   - Fallback para logs quando não configurado

### Fluxo de Execução

```
1. Agendamento → Execução semanal (segunda-feira 9h)
2. Busca Tenants → Lista todas as empresas ativas
3. Cálculo Métricas → Dados reais da semana anterior
4. Análise IA → Resumo executivo personalizado
5. Geração E-mail → Template HTML com métricas
6. Envio → E-mail para cada proprietário
7. Logs → Monitoramento e troubleshooting
```

## 📊 Métricas Calculadas

### Métricas Principais
- **💰 Custo Total da Escala**: Soma de todos os custos de mão de obra
- **⏰ Custo com Horas Extras**: Cálculo de horas extras (50% adicional)
- **👥 Funcionários Ativos**: Número único de funcionários na semana
- **🕒 Total de Horas Trabalhadas**: Soma de todas as horas trabalhadas
- **⚠️ Violações Críticas Evitadas**: Contagem de possíveis violações da CLT

### Detecção de Violações
- **Horas Extras**: Mais de 8 horas por dia
- **Jornada Semanal**: Mais de 44 horas por semana
- **Intervalos**: Verificação de intervalos obrigatórios

## 🤖 Integração com IA

### Prompt de Análise
```typescript
Analise as seguintes métricas semanais da escala de um restaurante:
- Custo Total: R$ ${totalCost}
- Custo com Horas Extras: R$ ${overtimeCost}
- Violações Críticas da CLT: ${criticalViolations}

Escreva um resumo executivo curto (2-3 frases) para o gestor, 
em tom profissional e informativo. Destaque um ponto positivo 
e um ponto de atenção.
```

### Exemplos de Resumos
- **Positivo**: "Excelente controle de custos com apenas 2% em horas extras"
- **Atenção**: "Atenção ao limite semanal de 44h para evitar violações da CLT"

## 📧 Template de E-mail

### Estrutura HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Relatório Semanal - GrowthScale</title>
  <style>
    /* CSS responsivo e moderno */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Relatório Semanal de Escalas</h1>
      <p>{nome_da_empresa}</p>
    </div>
    
    <div class="content">
      <div class="summary">
        <h3>🤖 Resumo da IA:</h3>
        <p><em>"{resumo_ia}"</em></p>
      </div>

      <h3>📈 Métricas da Semana:</h3>
      <!-- Métricas detalhadas -->
      
      <div class="cta">
        <a href="{dashboard_url}" class="btn">
          📊 Ver Dashboard Completo
        </a>
      </div>
    </div>
  </div>
</body>
</html>
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Configure no Supabase Dashboard > Settings > Edge Functions:

```bash
# Obrigatório
OPENAI_API_KEY=sk-...

# Opcional (para envio de e-mails)
RESEND_API_KEY=re_...

# Opcional (URL do frontend)
FRONTEND_URL=https://seu-app.vercel.app
```

### 2. Estrutura da Tabela

Adicione a coluna `owner_email` na tabela `companies`:

```sql
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS owner_email TEXT;

COMMENT ON COLUMN companies.owner_email IS 'E-mail do proprietário para envio de relatórios';
```

### 3. Deploy da Função

```bash
# Executar script automatizado
./scripts/setup-weekly-reports.sh

# Ou manualmente
supabase functions deploy send-weekly-report
```

### 4. Agendamento da Função

**No Supabase Dashboard:**
1. Acesse **Edge Functions**
2. Selecione **`send-weekly-report`**
3. Configure o **Cron Schedule**: `0 8 * * 1`
4. Salve a configuração

**Cron Schedule Explicado:**
- `0` = Minuto (0-59)
- `8` = Hora (0-23) - 8h da manhã
- `*` = Dia do mês (1-31) - qualquer dia
- `*` = Mês (1-12) - qualquer mês
- `1` = Dia da semana (0-7) - segunda-feira

## 📅 Agendamento

### Opção 1: Supabase Dashboard (Recomendado)

No painel do Supabase, agende a função `send-weekly-report` para rodar toda segunda-feira às 08:00 da manhã:

1. **Acesse o Supabase Dashboard**
2. **Vá para Edge Functions**
3. **Selecione `send-weekly-report`**
4. **Configure o agendamento:**
   - **Cron Schedule**: `0 8 * * 1`
   - **Frequência**: Semanal (segunda-feira)
   - **Horário**: 08:00 (manhã)

### Opção 2: GitHub Actions

Crie `.github/workflows/weekly-reports.yml`:

```yaml
name: Weekly Reports
on:
  schedule:
    - cron: '0 9 * * 1'  # Toda segunda-feira às 9h
  workflow_dispatch:  # Permite execução manual

jobs:
  send-reports:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Weekly Reports
        run: |
          curl -X POST ${{ secrets.SUPABASE_FUNCTION_URL }}/send-weekly-report \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

### Opção 2: Vercel Cron Jobs

Adicione ao `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/weekly-reports",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

### Opção 3: Serviços Externos
- **cron-job.org**: Interface web para agendamento
- **EasyCron**: API para cron jobs
- **Zapier**: Integração com outros serviços

## 🔍 Monitoramento

### Logs da Função
Acesse no Supabase Dashboard:
- **Edge Functions** > **send-weekly-report** > **Logs**

### Métricas de Sucesso
- ✅ E-mails enviados com sucesso
- ✅ Tenants processados
- ✅ Tempo de execução
- ✅ Erros e exceções

### Troubleshooting

#### Erro: "OPENAI_API_KEY não configurada"
```bash
# Configure no Supabase Dashboard
Dashboard > Settings > Edge Functions > Environment Variables
```

#### Erro: "RESEND_API_KEY não configurada"
```bash
# E-mails não serão enviados, mas aparecerão nos logs
# Configure para envio real de e-mails
```

#### Erro: "Coluna owner_email não encontrada"
```sql
-- Execute no SQL Editor do Supabase
ALTER TABLE companies ADD COLUMN IF NOT EXISTS owner_email TEXT;
```

## 🧪 Testes

### Teste Manual
```bash
# Executar script de teste
./scripts/setup-weekly-reports.sh

# Ou testar diretamente
curl -X POST https://seu-projeto.supabase.co/functions/v1/send-weekly-report \
  -H "Authorization: Bearer sua-anon-key"
```

### Teste de E-mail
```bash
# Verificar logs para ver conteúdo do e-mail
# (quando RESEND_API_KEY não está configurada)
```

## 📈 Benefícios

### Para Gestores
- **📊 Visibilidade**: Métricas semanais automáticas
- **🤖 Insights IA**: Análise inteligente dos dados
- **⏰ Economia de Tempo**: Relatórios gerados automaticamente
- **📧 Comunicação**: E-mails profissionais e informativos

### Para a Plataforma
- **🔄 Engajamento**: Mantém usuários informados
- **📈 Retenção**: Valor contínuo demonstrado
- **🤖 Diferencial**: IA integrada como vantagem competitiva
- **📊 Dados**: Insights sobre uso da plataforma

## 🔮 Melhorias Futuras

### Funcionalidades Planejadas
- **📊 Gráficos**: Visualizações interativas no e-mail
- **🎯 Personalização**: Templates por tipo de negócio
- **📱 Notificações**: Push notifications para relatórios
- **📈 Comparativos**: Comparação com semanas anteriores
- **🎨 Temas**: Múltiplos temas visuais

### Integrações
- **📊 Power BI**: Exportação para dashboards empresariais
- **📧 Outlook**: Integração com calendário corporativo
- **💬 Slack**: Notificações em canais de equipe
- **📱 WhatsApp**: Relatórios via WhatsApp Business

## 📚 Recursos Adicionais

### Documentação Relacionada
- [Sistema RBAC](./ARCHITECTURE.md#arquitetura-de-acesso-e-permissões-rbac)
- [Rascunhos Semanais](./WEEKLY_DRAFTS.md)
- [Edge Functions](./EDGE_FUNCTIONS.md)

### Scripts de Suporte
- `scripts/setup-weekly-reports.sh`: Configuração automatizada
- `scripts/test-weekly-reports.sh`: Testes automatizados
- `scripts/monitor-weekly-reports.sh`: Monitoramento

### APIs e Endpoints
- `POST /functions/v1/send-weekly-report`: Execução manual
- `GET /functions/v1/send-weekly-report`: Status da função
