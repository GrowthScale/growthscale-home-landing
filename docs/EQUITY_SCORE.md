# ⚖️ Placar de Equidade

## Visão Geral

O Placar de Equidade é um sistema inteligente que analisa a distribuição justa de turnos de fim de semana entre funcionários, garantindo que todos tenham uma carga equilibrada de trabalho nos sábados e domingos.

## 🎯 Objetivo

Promover a justiça e transparência na distribuição de turnos de fim de semana, evitando sobrecarga de alguns funcionários e garantindo que todos tenham oportunidades iguais de descanso.

## 🏗️ Arquitetura

### Componentes Principais

1. **Edge Function `validate-schedule`**
   - Função `validateEquity()` para análise estatística
   - Cálculo de desvio padrão da distribuição
   - Normalização para pontuação 0-100

2. **Componente Frontend `EquityScore`**
   - Interface visual com progress bar
   - Badges coloridos por categoria
   - Mensagens contextuais

3. **Integração Dashboard**
   - Exibição proativa no dashboard principal
   - Dados em tempo real
   - Feedback visual imediato

### Algoritmo de Cálculo

```typescript
function validateEquity(shifts: Shift[], employees: Employee[]): { value: number; message: string; } {
  // 1. Conta turnos de fim de semana por funcionário
  const weekendShiftsPerEmployee: { [key: string]: number } = {};
  
  // 2. Identifica sábados (6) e domingos (0)
  shifts.forEach(shift => {
    const dayOfWeek = getDay(parseISO(shift.startTime));
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendShiftsPerEmployee[shift.employeeId]++;
    }
  });
  
  // 3. Calcula estatísticas
  const counts = Object.values(weekendShiftsPerEmployee);
  const mean = totalShifts / counts.length;
  const stdDev = Math.sqrt(counts.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / counts.length);
  
  // 4. Normaliza para pontuação 0-100
  const equityValue = Math.max(0, 100 - (stdDev * 50));
  
  return { value: Math.round(equityValue), message: getMessage(equityValue) };
}
```

## 📊 Sistema de Pontuação

### Categorias de Equidade

| Pontuação | Categoria | Cor | Status | Descrição |
|-----------|-----------|-----|--------|-----------|
| 75-100 | Excelente | Verde | ✅ | Distribuição perfeitamente equilibrada |
| 50-74 | Regular | Amarelo | ⚠️ | Distribuição pode ser melhorada |
| 0-49 | Crítico | Vermelho | ❌ | Distribuição muito desigual |

### Fatores de Análise

1. **Distribuição de Turnos de Fim de Semana**
   - Sábados e domingos
   - Contagem por funcionário
   - Análise de padrões

2. **Desvio Padrão**
   - Medida estatística de dispersão
   - Quanto menor, mais equilibrada a distribuição
   - Normalização para escala 0-100

3. **Mensagens Contextuais**
   - Feedback personalizado
   - Sugestões de melhoria
   - Reconhecimento de boas práticas

## 🎨 Interface Visual

### Componente EquityScore

```tsx
<EquityScore 
  value={85} 
  message="Distribuição de turnos de fim de semana parece justa."
  className="max-w-2xl"
/>
```

### Elementos Visuais

- **Progress Bar**: Indicador visual da pontuação
- **Badge de Status**: Categoria com ícone
- **Mensagem Contextual**: Explicação detalhada
- **Legenda**: Guia de interpretação das categorias

## 🔧 Implementação Técnica

### Backend (Edge Function)

```typescript
// supabase/functions/validate-schedule/index.ts
interface OutputData {
  riskScore: number;
  equityScore: { value: number; message: string; };
  violations: Violation[];
}
```

### Frontend (React)

```typescript
// src/components/dashboard/EquityScore.tsx
interface EquityScoreProps {
  value: number;
  message: string;
  className?: string;
}
```

### API (TypeScript)

```typescript
// src/services/api.ts
export interface ValidationResult {
  riskScore: number;
  equityScore: {
    value: number;
    message: string;
  };
  violations: ValidationViolation[];
}
```

## 📈 Benefícios

### Para Gestores
- **Transparência**: Visibilidade clara da distribuição
- **Justiça**: Garantia de tratamento equitativo
- **Decisões**: Base para ajustes na escala
- **Compliance**: Evita favoritismos e reclamações

### Para Funcionários
- **Confiança**: Sistema transparente e justo
- **Satisfação**: Distribuição equilibrada de carga
- **Motivação**: Reconhecimento de boas práticas
- **Redução de Conflitos**: Menos disputas por turnos

### Para a Empresa
- **Retenção**: Maior satisfação dos funcionários
- **Produtividade**: Ambiente de trabalho mais harmonioso
- **Compliance**: Evita problemas trabalhistas
- **Reputação**: Empresa justa e transparente

## 🚀 Deploy e Configuração

### Script Automatizado

```bash
# Executar deploy completo
./scripts/deploy-equity-validation.sh
```

### Verificações Automáticas

- ✅ Supabase CLI instalado
- ✅ Login configurado
- ✅ Função existe
- ✅ Deploy realizado
- ✅ Teste funcional

### Teste Manual

```bash
# Testar função diretamente
curl -X POST https://seu-projeto.supabase.co/functions/v1/validate-schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sua-anon-key" \
  -d '{
    "shifts": [
      {
        "id": "shift1",
        "employeeId": "emp1",
        "startTime": "2024-12-21T08:00:00Z",
        "endTime": "2024-12-21T16:00:00Z"
      }
    ],
    "employees": [
      {
        "id": "emp1",
        "name": "João Silva",
        "workload": 44
      }
    ]
  }'
```

## 🔍 Monitoramento

### Logs da Função
- Acesse no Supabase Dashboard
- Edge Functions > validate-schedule > Logs

### Métricas de Sucesso
- ✅ Função executada com sucesso
- ✅ Pontuação calculada corretamente
- ✅ Mensagens geradas adequadamente
- ✅ Interface atualizada

### Troubleshooting

#### Erro: "Função não encontrada"
```bash
# Verificar se a função foi deployada
supabase functions list
```

#### Erro: "Componente não renderiza"
```bash
# Verificar se o componente foi importado
# Verificar se os dados estão chegando corretamente
```

#### Erro: "Pontuação sempre 100"
```bash
# Verificar se há turnos de fim de semana nos dados
# Verificar se há pelo menos 2 funcionários
```

## 🔮 Melhorias Futuras

### Funcionalidades Planejadas
- **Histórico**: Evolução da equidade ao longo do tempo
- **Alertas**: Notificações quando equidade cai
- **Sugestões**: Recomendações automáticas de ajustes
- **Comparativos**: Comparação entre períodos
- **Relatórios**: Exportação de dados de equidade

### Integrações
- **Dashboard Avançado**: Gráficos de tendência
- **Notificações**: Alertas em tempo real
- **Mobile**: Visualização em dispositivos móveis
- **API Externa**: Integração com outros sistemas

## 📚 Recursos Adicionais

### Documentação Relacionada
- [Sistema de Validação](./VALIDATION_SYSTEM.md)
- [Dashboard](./DASHBOARD.md)
- [Edge Functions](./EDGE_FUNCTIONS.md)

### Scripts de Suporte
- `scripts/deploy-equity-validation.sh`: Deploy automatizado
- `scripts/test-equity.sh`: Testes específicos
- `scripts/monitor-equity.sh`: Monitoramento

### APIs e Endpoints
- `POST /functions/v1/validate-schedule`: Validação com equidade
- `GET /functions/v1/validate-schedule`: Status da função

## 🎯 Casos de Uso

### Cenário 1: Distribuição Perfeita
- **Situação**: Todos os funcionários têm 2 turnos de fim de semana
- **Resultado**: Pontuação 100, status "Excelente"
- **Mensagem**: "Distribuição perfeitamente equilibrada"

### Cenário 2: Distribuição Desigual
- **Situação**: Um funcionário tem 5 turnos, outros têm 1
- **Resultado**: Pontuação baixa, status "Crítico"
- **Mensagem**: "A distribuição de turnos de fim de semana está muito desigual"

### Cenário 3: Sem Turnos de Fim de Semana
- **Situação**: Nenhum funcionário trabalha nos fins de semana
- **Resultado**: Pontuação 100, status "Excelente"
- **Mensagem**: "Distribuição perfeitamente equilibrada (sem turnos de fim de semana)"
