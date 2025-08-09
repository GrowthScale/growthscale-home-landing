# Sistema de Notificações WhatsApp para Escalas

## Visão Geral

O sistema de notificações WhatsApp permite enviar automaticamente notificações de escala para funcionários através de webhooks configuráveis. Este sistema integra-se perfeitamente com o módulo de escalas existente.

## Funcionalidades

- ✅ Envio automático de notificações de escala via WhatsApp
- ✅ Configuração flexível de webhooks
- ✅ Logs detalhados de todas as tentativas de envio
- ✅ Interface intuitiva para gerenciamento
- ✅ Integração com sistema de tenants
- ✅ Suporte a múltiplos funcionários por notificação

## Configuração do Banco de Dados

### 1. Coluna de Telefone nos Funcionários

Certifique-se de que sua tabela `employees` possui uma coluna para o telefone:

```sql
-- Verificar se a coluna existe
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'employees' AND column_name = 'phone_number';

-- Se não existir, adicionar:
ALTER TABLE employees ADD COLUMN phone_number TEXT;
```

### 2. Tabela de Logs de Comunicação

Crie a tabela `communication_logs` no Supabase:

```sql
-- Criar tabela de logs de comunicação
CREATE TABLE communication_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  employee_id UUID REFERENCES employees(id),
  tenant_id UUID NOT NULL,
  type TEXT NOT NULL,
  status TEXT CHECK (status IN ('SUCCESS', 'FAILED')),
  details JSONB
);

-- Habilitar RLS
ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;

-- Política de RLS (ajuste conforme sua estrutura de tenants)
CREATE POLICY "Users can view their own communication logs" ON communication_logs
  FOR SELECT USING (tenant_id = auth.jwt() ->> 'tenant_id');

CREATE POLICY "Users can insert their own communication logs" ON communication_logs
  FOR INSERT WITH CHECK (tenant_id = auth.jwt() ->> 'tenant_id');
```

## Configuração do Webhook WhatsApp

### 1. Serviços de WhatsApp Business

O sistema funciona com qualquer serviço de WhatsApp Business que suporte webhooks. Algumas opções populares:

- **Twilio WhatsApp API**
- **MessageBird WhatsApp API**
- **Zenvia WhatsApp API**
- **Proprietário (usando WhatsApp Business API oficial)**

### 2. Estrutura do Webhook

O sistema envia dados no seguinte formato para seu webhook:

```json
{
  "phoneNumber": "+5511999999999",
  "message": "Olá, João Silva! Sua escala da semana está pronta:\n\n- Seg, 15/01: das 08:00 às 17:00\n- Ter, 16/01: das 08:00 às 17:00\n- Qua, 17/01: das 08:00 às 17:00"
}
```

### 3. Implementação do Webhook

Exemplo de implementação em Node.js:

```javascript
// webhook-whatsapp.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook/whatsapp', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    // Aqui você implementa a lógica para enviar via WhatsApp
    // Exemplo com Twilio:
    const twilioClient = require('twilio')(accountSid, authToken);
    
    await twilioClient.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Seu número WhatsApp Business
      to: `whatsapp:${phoneNumber}`
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Webhook rodando na porta 3000');
});
```

## Uso do Sistema

### 1. Acesso às Notificações

1. Navegue para a página **Escalas**
2. Clique na aba **Notificações**
3. Configure a URL do seu webhook WhatsApp
4. Clique em **Enviar Notificações**

### 2. Configuração do Webhook

- **URL do Webhook**: Endpoint que receberá as mensagens
- **Formato**: Deve aceitar requisições POST com JSON
- **Autenticação**: Implemente conforme necessário para seu serviço

### 3. Monitoramento

- **Logs em Tempo Real**: Visualize o status de todas as notificações
- **Histórico Completo**: Acompanhe sucessos e falhas
- **Atualizações Automáticas**: Os logs são atualizados automaticamente

## Estrutura Técnica

### 1. Backend (Supabase Edge Function)

```typescript
// supabase/functions/send-schedule-notification/index.ts
export async function sendScheduleNotifications(
  employeeIds: string[],
  scheduleId: string,
  webhookUrl: string,
  tenantId: string
) {
  // 1. Buscar dados dos funcionários
  // 2. Buscar turnos da escala
  // 3. Formatar mensagens
  // 4. Enviar via webhook
  // 5. Registrar logs
}
```

### 2. Frontend (React Component)

```typescript
// src/components/WhatsAppNotificationManager.tsx
export function WhatsAppNotificationManager({
  employeeIds,
  scheduleId,
  tenantId,
  onNotificationSent
}) {
  // Interface para configuração e envio
  // Gerenciamento de logs
  // Feedback visual para o usuário
}
```

### 3. Serviço de API

```typescript
// src/services/api.ts
export class WhatsAppNotificationService extends BaseApiService {
  async sendScheduleNotifications(data: WhatsAppNotificationRequest)
  async getCommunicationLogs(tenantId: string)
}
```

## Personalização

### 1. Formato das Mensagens

Para personalizar o formato das mensagens, edite a função `send-schedule-notification`:

```typescript
// Personalizar template da mensagem
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

message += `Para dúvidas, entre em contato com o RH.`;
```

### 2. Adicionar Campos Personalizados

Para incluir informações adicionais (como local de trabalho, uniforme, etc.):

```typescript
// Adicionar campos na interface
interface WhatsAppNotificationRequest {
  employeeIds: string[];
  scheduleId: string;
  webhookUrl: string;
  tenantId: string;
  additionalInfo?: {
    location?: string;
    uniform?: string;
    notes?: string;
  };
}
```

## Troubleshooting

### 1. Erros Comuns

**Webhook não responde:**
- Verifique se a URL está correta
- Confirme se o servidor está rodando
- Teste com ferramentas como Postman

**Telefone inválido:**
- Verifique o formato do número (+55 11 99999-9999)
- Confirme se o número está cadastrado no WhatsApp Business

**Erro de autenticação:**
- Verifique as credenciais do serviço WhatsApp
- Confirme se o webhook está configurado corretamente

### 2. Logs de Debug

Os logs incluem informações detalhadas:

```json
{
  "id": "uuid",
  "employee_id": "uuid",
  "status": "FAILED",
  "details": {
    "message": "Mensagem formatada",
    "responseStatus": 500,
    "error": "Detalhes do erro"
  }
}
```

### 3. Testes

Para testar o sistema:

1. Configure um webhook de teste (ex: webhook.site)
2. Envie uma notificação de teste
3. Verifique os logs no banco de dados
4. Confirme se o webhook recebeu os dados

## Segurança

### 1. Autenticação

- Implemente autenticação no seu webhook
- Use HTTPS para todas as comunicações
- Valide tokens de acesso

### 2. Validação de Dados

- Valide números de telefone antes do envio
- Sanitize mensagens para evitar injeção
- Implemente rate limiting se necessário

### 3. Privacidade

- Os logs são isolados por tenant
- Números de telefone são tratados com cuidado
- Implemente políticas de retenção de logs

## Próximos Passos

### 1. Funcionalidades Futuras

- [ ] Agendamento automático de notificações
- [ ] Templates de mensagem personalizáveis
- [ ] Integração com outros canais (SMS, Email)
- [ ] Relatórios de entrega
- [ ] Confirmação de leitura

### 2. Melhorias Técnicas

- [ ] Retry automático para falhas
- [ ] Fila de processamento assíncrono
- [ ] Métricas de performance
- [ ] Cache de configurações

## Suporte

Para dúvidas ou problemas:

1. Verifique os logs no banco de dados
2. Consulte a documentação da API
3. Entre em contato com o suporte técnico
4. Abra uma issue no repositório

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro 2025  
**Compatibilidade**: Supabase Edge Functions, React 18+
