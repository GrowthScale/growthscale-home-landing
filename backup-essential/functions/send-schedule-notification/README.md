# Função de Notificações WhatsApp

## Visão Geral

Esta Supabase Edge Function envia notificações de escala para funcionários via WhatsApp através de webhooks configuráveis.

## Funcionalidades

- ✅ Envio de notificações para múltiplos funcionários
- ✅ Formatação automática de mensagens em português
- ✅ Integração com sistema de escalas existente
- ✅ Logs detalhados de todas as tentativas
- ✅ Suporte a webhooks personalizados
- ✅ Isolamento por tenant

## Configuração

### 1. Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estão configuradas no Supabase:

```bash
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima
```

### 2. Estrutura do Banco

A função espera as seguintes tabelas:

#### Tabela `employees`
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL
  -- outras colunas...
);
```

#### Tabela `shifts`
```sql
CREATE TABLE shifts (
  id UUID PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  schedule_id UUID NOT NULL,
  startTime TIMESTAMPTZ NOT NULL,
  endTime TIMESTAMPTZ NOT NULL
);
```

#### Tabela `communication_logs`
```sql
CREATE TABLE communication_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  employee_id UUID REFERENCES employees(id),
  tenant_id UUID NOT NULL,
  type TEXT NOT NULL,
  status TEXT CHECK (status IN ('SUCCESS', 'FAILED')),
  details JSONB
);
```

## Uso

### 1. Chamada da Função

```typescript
const { data, error } = await supabase.functions.invoke('send-schedule-notification', {
  body: {
    employeeIds: ['emp-001', 'emp-002'],
    scheduleId: 'schedule-001',
    webhookUrl: 'https://seu-webhook.com/whatsapp',
    tenantId: 'tenant-001'
  }
});
```

### 2. Parâmetros de Entrada

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `employeeIds` | `string[]` | Array com IDs dos funcionários |
| `scheduleId` | `string` | ID da escala |
| `webhookUrl` | `string` | URL do webhook WhatsApp |
| `tenantId` | `string` | ID do tenant |

### 3. Resposta

```json
{
  "success": true,
  "message": "Notificações enviadas."
}
```

## Formato das Mensagens

### Exemplo de Mensagem Gerada

```
Olá, João Silva! Sua escala da semana está pronta:

- Seg, 15/01: das 08:00 às 17:00
- Ter, 16/01: das 08:00 às 17:00
- Qua, 17/01: das 08:00 às 17:00
```

### Personalização

Para personalizar o formato das mensagens, edite a função:

```typescript
// Personalizar template
let message = `🏢 *${companyName}*\n`;
message += `Olá, ${employee.name}! Sua escala da semana está pronta:\n\n`;

employeeShifts.forEach(shift => {
  const date = new Date(shift.startTime).toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long' 
  });
  const start = new Date(shift.startTime).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const end = new Date(shift.endTime).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  message += `📅 *${date}*\n`;
  message += `⏰ ${start} - ${end}\n\n`;
});
```

## Webhook WhatsApp

### 1. Estrutura dos Dados Enviados

```json
{
  "phoneNumber": "+5511999999999",
  "message": "Mensagem formatada da escala"
}
```

### 2. Implementação do Webhook

Exemplo em Node.js:

```javascript
app.post('/webhook/whatsapp', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    // Implementar envio via WhatsApp Business API
    const result = await sendWhatsAppMessage(phoneNumber, message);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### 3. Serviços Recomendados

- **Twilio WhatsApp API**
- **MessageBird WhatsApp API**
- **Zenvia WhatsApp API**
- **WhatsApp Business API oficial**

## Logs e Monitoramento

### 1. Estrutura dos Logs

```json
{
  "id": "uuid",
  "employee_id": "uuid",
  "tenant_id": "uuid",
  "type": "WHATSAPP_SCHEDULE_NOTIFICATION",
  "status": "SUCCESS",
  "details": {
    "message": "Mensagem enviada",
    "responseStatus": 200
  }
}
```

### 2. Consultas Úteis

```sql
-- Logs de sucesso
SELECT * FROM communication_logs 
WHERE status = 'SUCCESS' 
ORDER BY created_at DESC;

-- Logs de falha
SELECT * FROM communication_logs 
WHERE status = 'FAILED' 
ORDER BY created_at DESC;

-- Logs por funcionário
SELECT * FROM communication_logs 
WHERE employee_id = 'emp-001' 
ORDER BY created_at DESC;
```

## Testes

### 1. Dados de Teste

Use o arquivo `test-data.json` para testar a função:

```json
{
  "employeeIds": ["emp-001", "emp-002", "emp-003"],
  "scheduleId": "schedule-001",
  "webhookUrl": "https://webhook.site/your-endpoint",
  "tenantId": "tenant-001"
}
```

### 2. Teste Local

```bash
# Instalar Supabase CLI
npm install -g supabase

# Testar função localmente
supabase functions serve send-schedule-notification

# Chamar função
curl -X POST http://localhost:54321/functions/v1/send-schedule-notification \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

## Troubleshooting

### 1. Erros Comuns

**Webhook não responde:**
- Verifique se a URL está correta
- Confirme se o servidor está rodando
- Teste com ferramentas como Postman

**Telefone inválido:**
- Verifique o formato do número
- Confirme se está cadastrado no banco

**Erro de autenticação:**
- Verifique as credenciais do Supabase
- Confirme se a função está publicada

### 2. Debug

Para debug, adicione logs na função:

```typescript
console.log('Dados recebidos:', { employeeIds, scheduleId, webhookUrl, tenantId });
console.log('Funcionários encontrados:', employeesData);
console.log('Turnos encontrados:', shiftsData);
```

## Deploy

### 1. Publicar Função

```bash
supabase functions deploy send-schedule-notification
```

### 2. Verificar Status

```bash
supabase functions list
```

## Segurança

- ✅ Row Level Security habilitado
- ✅ Validação de entrada
- ✅ Isolamento por tenant
- ✅ Logs de auditoria
- ✅ Sanitização de dados

## Suporte

Para dúvidas ou problemas:

1. Verifique os logs no Supabase
2. Consulte a documentação principal
3. Abra uma issue no repositório

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro 2025  
**Compatibilidade**: Supabase Edge Functions
