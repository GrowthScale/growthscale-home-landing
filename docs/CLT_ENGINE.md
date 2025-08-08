# 🏛️ Motor de Regras da CLT

## Visão Geral

O **Motor de Regras da CLT** é uma Supabase Edge Function que implementa validações automáticas de compliance trabalhista para escalas de funcionários. A função analisa os dados de escalas e identifica possíveis violações da legislação trabalhista brasileira.

## 📍 Localização

```
supabase/functions/validate-schedule/index.ts
```

## 🎯 Funcionalidades

### 1. **Validação de Intervalo Interjornada (11h)**
- **Regra**: Intervalo mínimo de 11 horas entre o fim de um turno e o início do próximo
- **Código**: `ERR_INTERJORNADA_11H`
- **Severidade**: `critical`
- **Implementação**: Calcula a diferença em horas entre turnos consecutivos

### 2. **Validação de Descanso Semanal Remunerado (DSR)**
- **Regra**: Máximo de 6 dias trabalhados em um período de 7 dias
- **Código**: `ERR_DSR_7D`
- **Severidade**: `critical`
- **Implementação**: Analisa janelas de 7 dias para identificar violações

### 3. **Validação de Carga Horária Semanal**
- **Regra**: Carga horária semanal não pode exceder a contratada
- **Código**: `WARN_OVERTIME`
- **Severidade**: `warning`
- **Implementação**: Calcula média semanal e compara com workload contratado

## 📊 Interface de Dados

### Input
```typescript
interface InputData {
  shifts: Shift[];
  employees: Employee[];
}

interface Shift {
  id: string;
  employeeId: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
}

interface Employee {
  id: string;
  workload: number; // Carga horária semanal contratada
}
```

### Output
```typescript
interface OutputData {
  riskScore: number;    // 0-100
  violations: Violation[];
}

interface Violation {
  code: string;
  message: string;
  severity: 'critical' | 'warning';
  employeeId: string;
  shiftIds: string[];
}
```

## 🔧 Como Usar

### 1. **Deploy da Function**
```bash
# Na pasta do projeto
supabase functions deploy validate-schedule
```

### 2. **Chamada da API**
```typescript
const response = await fetch('/functions/v1/validate-schedule', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${supabaseKey}`
  },
  body: JSON.stringify({
    shifts: [
      {
        id: 'shift-1',
        employeeId: 'emp-1',
        startTime: '2024-01-15T08:00:00Z',
        endTime: '2024-01-15T17:00:00Z'
      }
    ],
    employees: [
      {
        id: 'emp-1',
        workload: 44 // 44 horas semanais
      }
    ]
  })
});

const result: OutputData = await response.json();
```

### 3. **Interpretação dos Resultados**
```typescript
// Risk Score
if (result.riskScore > 75) {
  console.log('⚠️ Alto risco de violações');
} else if (result.riskScore > 50) {
  console.log('⚠️ Risco moderado');
} else {
  console.log('✅ Baixo risco');
}

// Violações
result.violations.forEach(violation => {
  console.log(`${violation.severity}: ${violation.message}`);
});
```

## 🧮 Cálculo do Risk Score

O score de risco é calculado com base nas violações encontradas:

- **Violação Critical**: +25 pontos
- **Violação Warning**: +10 pontos
- **Máximo**: 100 pontos

```typescript
const riskScore = violations.reduce((score, violation) => {
  return score + (violation.severity === 'critical' ? 25 : 10);
}, 0);
```

## 📋 Códigos de Violação

| Código | Descrição | Severidade |
|--------|-----------|------------|
| `ERR_INTERJORNADA_11H` | Intervalo entre turnos < 11h | Critical |
| `ERR_DSR_7D` | Mais de 6 dias em 7 dias | Critical |
| `WARN_OVERTIME` | Carga horária semanal excedida | Warning |

## 🔄 Fluxo de Validação

1. **Recebe dados** de escalas e funcionários
2. **Filtra turnos** por funcionário
3. **Ordena cronologicamente** os turnos
4. **Aplica validações**:
   - Intervalo interjornada
   - Descanso semanal
   - Carga horária
5. **Calcula risk score**
6. **Retorna resultado** com violações detalhadas

## 🚀 Próximas Implementações

### Fase 2 - Validações Avançadas
- [ ] Validação de horas extras
- [ ] Validação de trabalho noturno
- [ ] Validação de feriados
- [ ] Validação de férias

### Fase 3 - Integração Frontend
- [ ] Hook `useScheduleValidation`
- [ ] Componente `ValidationResults`
- [ ] Integração no `ScheduleEditor`
- [ ] Dashboard de compliance

### Fase 4 - Relatórios
- [ ] Relatório mensal de compliance
- [ ] Histórico de violações
- [ ] Tendências e métricas
- [ ] Alertas automáticos

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Deno
- **HTTP Server**: std/http
- **Date Manipulation**: date-fns
- **TypeScript**: Tipagem estática
- **Supabase**: Edge Functions

## 📝 Exemplo de Uso Completo

```typescript
// Exemplo de dados de entrada
const scheduleData = {
  shifts: [
    {
      id: 'shift-1',
      employeeId: 'emp-1',
      startTime: '2024-01-15T08:00:00Z',
      endTime: '2024-01-15T17:00:00Z'
    },
    {
      id: 'shift-2',
      employeeId: 'emp-1',
      startTime: '2024-01-16T06:00:00Z', // Violação: apenas 13h de intervalo
      endTime: '2024-01-16T15:00:00Z'
    }
  ],
  employees: [
    {
      id: 'emp-1',
      workload: 44
    }
  ]
};

// Resultado esperado
const expectedResult = {
  riskScore: 25,
  violations: [
    {
      code: 'ERR_INTERJORNADA_11H',
      message: 'Intervalo entre turnos inferior a 11 horas.',
      severity: 'critical',
      employeeId: 'emp-1',
      shiftIds: ['shift-1', 'shift-2']
    }
  ]
};
```

## 🔍 Debugging

Para debugar a função localmente:

```bash
# Iniciar Supabase local
supabase start

# Deploy da function
supabase functions deploy validate-schedule

# Testar localmente
curl -X POST http://localhost:54321/functions/v1/validate-schedule \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

## 📚 Referências

- [CLT - Consolidação das Leis do Trabalho](http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [date-fns Documentation](https://date-fns.org/)
