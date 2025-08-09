# Simulador de Custo em Tempo Real

## Visão Geral

O Simulador de Custo em Tempo Real é uma funcionalidade integrada ao sistema de escalas que calcula automaticamente os custos trabalhistas baseados nos turnos e funcionários cadastrados.

## Funcionalidades

### 🧮 Cálculo Automático
- **Custo Base**: Calcula o custo normal das horas trabalhadas
- **Horas Extras**: Aplica multiplicador de 1.5x para horas além da carga horária contratada
- **Adicional Noturno**: Aplica multiplicador de 1.2x para turnos entre 22h e 5h

### 📊 Dashboard Visual
- Exibição do custo total da escala
- Breakdown detalhado por categoria de custo
- Percentuais de cada tipo de custo sobre o total
- Atualização em tempo real

### 🔄 Integração
- Conecta automaticamente com o sistema de escalas
- Atualiza custos quando turnos são modificados
- Suporte a múltiplos funcionários e turnos

### 🎯 Painel Integrado ao Editor de Escalas
- **Painel de Custo em Tempo Real**: Exibido diretamente no Editor de Escalas ao lado do painel de análise de risco
- **Atualização Automática**: Custos recalculados automaticamente a cada alteração na escala
- **Layout Responsivo**: Grid de 2 colunas em telas grandes, adaptando-se ao tamanho da tela
- **Visualização Simultânea**: Análise de risco CLT e custos financeiros lado a lado para tomada de decisão estratégica

## Como Usar

### 1. Acessar o Simulador
- **Opção 1 - Página Dedicada**: Navegue para a página **Escalas** e clique na aba **"Custos"**
- **Opção 2 - Editor Integrado**: Abra o Editor de Escalas e visualize o painel de custo ao lado do painel de análise de risco

### 2. Visualizar Custos no Editor de Escalas
- **Painel Integrado**: O painel de custo é exibido automaticamente ao lado do painel de análise de risco
- **Atualização em Tempo Real**: Os custos são recalculados automaticamente a cada alteração na escala
- **Layout Responsivo**: Em telas grandes, os painéis ficam lado a lado; em telas pequenas, empilhados

### 3. Visualizar Custos na Página Dedicada
- Os custos são calculados automaticamente baseados nos turnos ativos
- O sistema mostra:
  - Custo total da escala
  - Custo base (horas normais)
  - Custo de horas extras
  - Custo de adicional noturno

### 4. Recálculo Manual
- Use o botão **"Recalcular Custos"** para forçar uma nova análise
- Útil após modificações manuais na escala

## Configuração

### Campos Necessários nos Funcionários
Para um cálculo preciso, cada funcionário deve ter:
- **Carga Horária Semanal**: Número de horas contratadas por semana
- **Valor/Hora**: Salário por hora trabalhada

### Exemplo de Configuração
```typescript
{
  id: "func-001",
  workload: 44,        // 44 horas semanais (CLT padrão)
  hourlyRate: 15.50    // R$ 15,50 por hora
}
```

## Fórmulas de Cálculo

### Custo Base
```
Custo Base = Horas Trabalhadas × Valor/Hora
```

### Horas Extras
```
Horas Extras = (Total de Horas - Carga Horária) × Valor/Hora × 1.5
```

### Adicional Noturno
```
Adicional Noturno = Horas Noturnas × Valor/Hora × 0.2
```

### Custo Total
```
Custo Total = Custo Base + Horas Extras + Adicional Noturno
```

## Casos de Uso

### 📈 Planejamento Orçamentário
- Estime custos antes de criar escalas
- Compare diferentes cenários de alocação
- Otimize a distribuição de turnos

### 💰 Controle de Custos
- Monitore gastos trabalhistas em tempo real
- Identifique picos de custo
- Ajuste escalas para reduzir despesas

### 📋 Compliance Trabalhista
- Verifique se as escalas respeitam limites legais
- Identifique funcionários com muitas horas extras
- Planeje folgas e descansos adequados

### 🎯 Tomada de Decisão Estratégica
- **Visão Unificada**: Análise de risco CLT e impacto financeiro simultaneamente
- **Decisões Informadas**: Compare conformidade legal vs. custos antes de aplicar mudanças
- **Otimização Inteligente**: Ajuste escalas considerando tanto aspectos legais quanto financeiros
- **Feedback Imediato**: Veja o impacto de cada alteração em tempo real

## Dados de Exemplo

O sistema inclui dados mock para demonstração:

### Funcionários
- 5 funcionários com diferentes cargas horárias
- Salários variando de R$ 14,80 a R$ 20,00 por hora
- Cargas horárias de 36 a 44 horas semanais

### Turnos
- Turnos de manhã (8h às 17h)
- Turnos de tarde (14h às 23h)
- Turnos de noite (22h às 7h)
- Inclui turnos de sábado (horas extras)

## Arquitetura Técnica

### Backend (Supabase Edge Function)
- **Arquivo**: `supabase/functions/calculate-schedule-cost/index.ts`
- **Endpoint**: `/functions/v1/calculate-schedule-cost`
- **Tecnologia**: Deno + TypeScript

### Frontend (React Component)
- **Componente**: `src/components/schedules/CostSimulator.tsx`
- **Integração**: Página de Escalas, aba Custos
- **Estado**: React hooks para gerenciamento de dados

### API Service
- **Classe**: `CostCalculationService`
- **Método**: `calculateScheduleCost()`
- **Integração**: Supabase Functions

## Dependências

### Backend
- `date-fns`: Cálculos de diferença de horas
- `std/http`: Servidor HTTP Deno

### Frontend
- `@/components/ui/*`: Componentes de UI
- `@/services/api`: Serviços de API
- `@/hooks/use-toast`: Sistema de notificações

## Limitações e Considerações

### ⚠️ Simplificações Atuais
- Adicional noturno aplicado a 100% do turno quando há sobreposição
- Cálculo de horas extras baseado em semana (não período de pagamento)
- Não considera feriados ou domingos

### 🔮 Melhorias Futuras
- Cálculo por período de pagamento (quinzenal/mensal)
- Suporte a diferentes tipos de adicional noturno
- Integração com sistema de folha de pagamento
- Histórico de custos por período

## Troubleshooting

### Erro: "Dados insuficientes"
- Verifique se há funcionários cadastrados
- Confirme se há turnos ativos na escala
- Valide se os campos obrigatórios estão preenchidos

### Erro: "Erro no cálculo"
- Verifique a conexão com o Supabase
- Confirme se a Edge Function está ativa
- Valide o formato dos dados enviados

### Custos não atualizam
- Use o botão "Recalcular Custos"
- Verifique se os turnos foram salvos
- Confirme se há mudanças na escala

## Suporte

Para dúvidas ou problemas:
- Consulte a documentação técnica
- Verifique os logs do console
- Entre em contato com o suporte técnico

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro 2024  
**Desenvolvido por**: GrowthScale Team
