# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.2.0] - 2024-12-19

### 🚀 **Novas Funcionalidades**
- **Simulador de Custo em Tempo Real**: Sistema completo de cálculo automático de custos trabalhistas
  - **Backend**: Supabase Edge Function `calculate-schedule-cost` com lógica de cálculo de horas extras (1.5x) e adicional noturno (1.2x)
  - **Frontend**: Componente `CostSimulator` com dashboard visual e breakdown de custos
  - **API Service**: `CostCalculationService` e função standalone `calculateScheduleCost`
  - **Integração UI**: Nova aba "Custos" na página de Escalas com dados mock para testes
  - **Cálculos**: Base, horas extras e adicional noturno baseados na carga horária contratada
  - **Dados Mock**: 5 funcionários com diferentes salários/hora e 15+ turnos simulando semana completa
  - **Multiplicadores Configuráveis**: Horas extras (1.5x), Adicional noturno (1.2x)
  - **Cálculo Inteligente**: Baseado na carga horária contratada vs. horas trabalhadas
  - **Performance**: Cálculos em tempo real com Edge Functions
  - **Documentação**: Guia completo de uso e configuração técnica

### 🔧 **Melhorias Técnicas**
- **API Service**: Adicionado método `calculateScheduleCost` ao arquivo `src/services/api.ts`
- **TypeScript**: Interfaces completas para cálculo de custos (`EmployeeForCostCalculation`, `ShiftForCostCalculation`)
- **Integração**: Serviço `CostCalculationService` exportado e disponível para uso
- **Build**: Aplicação compilando sem erros após implementação

### 📚 **Documentação**
- **Documentação Técnica**: Criado `docs/COST_SIMULATOR.md` com especificações completas
- **CHANGELOG**: Atualizado com detalhes da nova funcionalidade
- **Comentários**: Código documentado com explicações detalhadas

---

## [Unreleased]

### 🚀 **Novas Funcionalidades**
- **Sistema de Notificações WhatsApp para Escalas**: Implementado sistema completo de notificações automáticas via WhatsApp, incluindo:
  - **Backend**: Supabase Edge Function `send-schedule-notification` para envio de notificações
  - **Frontend**: Componente `WhatsAppNotificationManager` com interface de configuração e monitoramento
  - **API Service**: `WhatsAppNotificationService` para gerenciar notificações e logs
  - **Integração UI**: Nova aba "Notificações" na página de Escalas com configuração de webhook
  - **Logs de Comunicação**: Sistema completo de rastreamento de envios (sucesso/falha)
  - **Webhook Configurável**: Suporte a qualquer serviço de WhatsApp Business via webhooks
  - **Formatação Inteligente**: Mensagens personalizadas com horários e datas em português
  - **Multi-tenant**: Isolamento completo por tenant com Row Level Security
  - **Interface Intuitiva**: Configuração simples de webhook e monitoramento em tempo real
  - **Documentação**: Guia completo de configuração e troubleshooting

### 🔧 **Correções e Melhorias**
- **Auditoria Completa do Sistema**: Realizada auditoria completa do sistema, corrigindo todos os erros de TypeScript, problemas de linting e vulnerabilidades de segurança
  - Corrigidos todos os tipos `any` para `unknown`
  - Corrigidas interfaces vazias para tipos
  - Corrigidos escapes desnecessários em regex
  - Corrigidas dependências de useEffect e useCallback
  - Implementada validação de entrada sanitizada
  - Implementado escape de HTML
  - Implementado rate limiting
  - Otimizados hooks com useMemo e useCallback

### 🚀 **Novas Funcionalidades**
- **Aplicação de Modelos no Editor de Escalas**: Implementada funcionalidade completa para aplicar templates de escala diretamente no editor, incluindo:
  - **Modal de Aplicação**: Interface dedicada para seleção de modelo e funcionários
  - **Seleção Inteligente**: Dropdown com todos os templates disponíveis e preview da estrutura
  - **Seleção de Funcionários**: Checkboxes para escolher quais funcionários aplicar o template
  - **Geração Automática de Turnos**: Sistema que gera turnos baseados na estrutura do template (`template_data.shifts`)
  - **Cálculo de Datas**: Lógica inteligente para calcular datas da semana usando `startOfWeek` e `addDays`
  - **Integração com Formulário**: Atualização automática do estado do formulário com funcionários e observações
  - **Validação de Entrada**: Controles que previnem aplicação sem seleção completa
  - **Feedback Visual**: Toast notifications e atualização automática da interface
  - **Botão "Aplicar Modelo"**: Adicionado ao card de templates para acesso rápido
  - **Visualização da Estrutura**: Card detalhado mostrando turnos, horários e funcionários padrão do template

### 🐛 **Correções de Bugs**
- Corrigido regex de validação de telefone em `src/lib/utils.ts`
- Corrigidos tipos inseguros em todos os componentes
- Corrigidas dependências de hooks em `TenantContext.tsx` e `useNavigation.ts`

### 📚 **Documentação**
- Atualizada documentação com resultados da auditoria completa
- Adicionado registro detalhado de todas as correções realizadas
- Documentada nova funcionalidade de aplicação de modelos no Editor de Escalas

### Adicionado
- **Integração do Motor de Regras da CLT ao Frontend:** Implementada integração completa do Motor de Regras da CLT ao frontend, incluindo:
  - Hook `useScheduleValidation` para gerenciar validações
  - Componente `ValidationResults` para exibir resultados
  - Integração no `ScheduleEditor` com botão "Validar CLT"
  - Interface visual com score de risco, violações e ações
  - Analytics tracking e toast notifications
  - Estados de loading e feedback visual

- **Integrado Motor de Regras ao Editor de Escalas (`ScheduleEditor.tsx`):** A tela de edição de escalas agora exibe um painel de "Análise de Risco em Tempo Real". O painel é atualizado automaticamente a cada alteração, mostrando um score de risco com um indicador visual (barra de progresso) e uma lista detalhada de todas as violações da CLT identificadas pela nova função de backend.

- **Implementado Assistente de IA para Dúvidas CLT:** Adicionada a função de backend `clt-assistant` que se conecta à API da OpenAI com um prompt seguro e especializado. Criado o componente de frontend `CltAssistantChat`, um chatbot flutuante disponível em toda a plataforma, permitindo que gestores tirem dúvidas sobre a CLT em tempo real. O assistente inclui:
  - Supabase Edge Function (`clt-assistant`) integrada com OpenAI GPT-3.5-turbo
  - Interface de chat com histórico de conversas e timestamps
  - Perguntas sugeridas para facilitar o uso
  - Respostas em linguagem simples e objetiva
  - Disclaimer legal obrigatório
  - Página dedicada (`/assistente-clt`) com design responsivo
  - **Componente de Chat Flutuante** (`CltAssistantChat`) disponível em todas as páginas via MainLayout
  - Integração completa com React Query para cache e performance
  - Analytics tracking de perguntas e respostas
  - Design responsivo e acessível

- **Implementada Sugestão de Escala com IA:** Criada a função de backend `suggest-schedule`, que utiliza um prompt avançado para instruir a IA (GPT) a gerar uma alocação de escala otimizada em formato JSON. No frontend, um novo fluxo foi adicionado ao Editor de Escalas: um botão "Sugerir com IA" abre um modal que exibe o status do processamento e apresenta a escala sugerida para aprovação e aplicação pelo gestor. O sistema inclui:
  - Supabase Edge Function (`suggest-schedule`) com prompt especializado em logística e alocação de pessoal
  - Hook `useScheduleSuggestion` para gerenciar sugestões
  - Componente `ScheduleSuggestion` para exibir sugestões com estatísticas e interface moderna
  - Integração completa no `ScheduleEditor` com botão "Sugerir com IA"
  - **Modal de Sugestão**: Novo modal com preview das sugestões e aplicação automática
  - **Pré-visualização Visual**: Calendário com preview das sugestões de IA usando `ScheduleCalendar`
  - **Fluxo de Aplicação Melhorado**: Sistema otimizado para aplicar sugestões diretamente no estado do formulário
  - **Melhoria na UX da Sugestão de IA**: A escala sugerida pela IA agora é exibida diretamente no componente do calendário principal com um estilo visual de "pré-visualização" (borda tracejada e destaque), em vez de ser mostrada como dados brutos. Isso permite que o gestor analise o impacto da sugestão visualmente antes de confirmar sua aplicação na escala definitiva
  - Aplicação automática de sugestões com confirmação
  - Analytics tracking de sugestões geradas e aplicadas
  - Validação de dados de entrada e tratamento de erros
  - Interface responsiva com loading states e feedback visual
  - **Método standalone `suggestSchedule`** para uso direto sem service layer

- **Implementado Sistema de Modelos de Escala (Templates):** Criado sistema completo para gerenciar templates de escala, permitindo criar, editar, deletar e aplicar modelos pré-definidos. O sistema inclui:
  - **Service Layer**: `ScheduleTemplateService` com métodos CRUD completos
  - **Interfaces TypeScript**: `ScheduleTemplate`, `CreateScheduleTemplateDto`, `UpdateScheduleTemplateDto`
  - **Componente Principal**: `ScheduleTemplateManager` com interface moderna e responsiva
  - **Integração no Editor**: Botão "Gerenciar Templates" no `ScheduleEditor`
  - **Funcionalidades**: Criar, editar, deletar e aplicar templates
  - **Preview de Turnos**: Visualização dos turnos configurados em cada template
  - **Estatísticas**: Contagem de turnos e funcionários por template
  - **Aplicação Automática**: Templates podem ser aplicados diretamente no editor de escalas
  - **Multi-tenancy**: Suporte a templates por empresa (tenant_id)
  - **Validação**: Tratamento de erros e feedback visual
  - **UX Otimizada**: Loading states, confirmações e toasts informativos
  - **Aplicação Direta no Editor**: Nova funcionalidade para aplicar modelos diretamente no `ScheduleEditor` com seleção de funcionários e geração automática de turnos
  - **Modal de Aplicação**: Interface dedicada para seleção de template e funcionários específicos
  - **Geração Automática de Turnos**: Sistema que gera automaticamente todos os turnos baseados na estrutura do template (`template_data.shifts`)
  - **Cálculo Inteligente de Datas**: Lógica para calcular datas da semana usando `startOfWeek` e `addDays`
  - **Seleção de Funcionários**: Checkboxes para escolher quais funcionários aplicar o template
  - **Preview da Estrutura**: Card detalhado mostrando turnos, horários e funcionários padrão antes da aplicação
  - **Integração com Formulário**: Atualização automática do estado do formulário com funcionários e observações
  - **Botão "Aplicar Modelo"**: Adicionado ao card de templates para acesso rápido à funcionalidade

- **Motor de Regras da CLT (`/functions/validate-schedule`):** Implementada a primeira versão da Supabase Edge Function para validação de escalas. A função atualmente verifica violações de intervalo interjornada (11h), descanso semanal remunerado (DSR) e excesso de carga horária semanal. Ela recebe os dados da escala e retorna um score de risco e uma lista detalhada de violações.

- Sistema de documentação completo
- Estrutura de pastas docs/
- Histórico de auditoria técnica
- Guias de configuração e deploy

## [1.1.1] - 2024-12-19

### Corrigido
- **i18n**: Removidas chaves duplicadas `installDescription` nas traduções em português, inglês e espanhol
- **useNotifications**: Corrigido método duplicado `isSupported()` na classe `NotificationService`
- **TypeScript**: Resolvidos erros de linter relacionados a módulos não encontrados (`react-router-dom`, `react-i18next`)
- **Dependências**: Realizada reinstalação limpa de `node_modules` para resolver problemas de tipos

### Melhorado
- **Build**: Otimizado processo de build com correção de warnings
- **Performance**: Melhorada detecção de suporte a notificações push

### Técnico
- **Linting**: Configuração TypeScript balanceada para contexto no-code
- **Dependências**: Verificação e reinstalação de todas as dependências do projeto

## [1.1.0] - 2024-12-19

### Adicionado
- **PWA**: Implementação completa de Progressive Web App
  - Service Worker (`public/sw.js`)
  - Manifest (`public/manifest.json`)
  - Hook `usePWA` para gerenciamento de instalação
  - Componente `PWAInstallPrompt` para prompt de instalação
  - Meta tags PWA no `index.html`
  - Registro automático do Service Worker em `main.tsx`

- **Internacionalização (i18n)**: Sistema completo de traduções
  - Configuração `i18next` com `react-i18next`
  - Suporte a português (pt-BR), inglês (en-US) e espanhol (es-ES)
  - Traduções completas para todas as interfaces
  - Integração em `Auth.tsx` e outros componentes

- **Analytics**: Sistema de rastreamento de eventos
  - Hook `useAnalytics` com `AnalyticsService`
  - Rastreamento de eventos de usuário, performance e erros
  - Integração com Google Analytics e endpoint customizado
  - Persistência local de eventos

- **Notificações Push**: Sistema nativo de notificações
  - Hook `useNotifications` com `NotificationService`
  - Gerenciamento de permissões e assinaturas VAPID
  - Notificações in-app e push nativas
  - Integração com analytics e multi-tenancy

- **Multi-tenancy**: Suporte a múltiplas empresas
  - Context `TenantProvider` e hook `useTenant`
  - Gerenciamento de tenant ativo e configurações
  - Integração com autenticação e analytics

- **Virtualização**: Otimização para grandes listas
  - Componentes `VirtualList`, `VirtualTable`, `VirtualGrid`
  - Renderização eficiente de grandes datasets
  - Configurável via feature flags

- **Service Layer**: Arquitetura de serviços
  - `BaseApiService` para operações comuns
  - Serviços específicos: `EmployeeService`, `CompanyService`, `ScheduleService`
  - Tipos TypeScript para modelos e DTOs

- **Constantes Centralizadas**: Sistema de constantes
  - Arquivo `src/constants/index.ts`

## 🚀 Feature - Funcionalidades Principais

### **Sistema de Modelos de Escala (Templates):**
- **Implementado Sistema de Modelos de Escala (Templates):** Adicionada a capacidade de criar, gerenciar e aplicar modelos de escala pré-definidos (ex: 6x1, 12x36). Foi criada uma nova seção de gerenciamento de modelos e, no editor de escalas, agora é possível aplicar um modelo a um grupo de funcionários, gerando automaticamente todos os turnos e simplificando drasticamente o processo de criação de escala.

### **Funcionalidades Implementadas:**
- **Página de Gerenciamento**: Nova página `/templates` com interface completa para gerenciar templates
- **Componente TemplateManager**: Interface robusta com DataTable, modais de criação/edição/visualização
- **Funcionalidades CRUD**: Criar, editar, visualizar, deletar e aplicar templates
- **Integração com Rotas**: Página protegida e integrada ao sistema de navegação
- **Visualização Detalhada**: Modal para visualizar detalhes completos dos templates
- **Aplicação de Templates**: Botão para aplicar template diretamente na página de escalas
- **Aplicação Direta no Editor**: Nova funcionalidade para aplicar modelos diretamente no `ScheduleEditor` com seleção de funcionários e geração automática de turnos
- **Modal de Aplicação**: Interface dedicada para seleção de template e funcionários específicos
- **Geração Automática de Turnos**: Sistema que gera automaticamente todos os turnos baseados na estrutura do template
- **Cálculo Inteligente de Datas**: Lógica para calcular datas da semana usando funções de data
- **Seleção de Funcionários**: Checkboxes para escolher quais funcionários aplicar o template
- **Preview da Estrutura**: Card detalhado mostrando turnos, horários e funcionários padrão antes da aplicação
- **Integração com Formulário**: Atualização automática do estado do formulário com funcionários e observações

### **Simulador de Custo em Tempo Real:**
- **Implementado o Simulador de Custo em Tempo Real:** Criada a função de backend `calculate-schedule-cost` para analisar os custos de uma escala, incluindo horas extras e adicional noturno. No Editor de Escalas, um novo painel exibe o custo total estimado da escala, atualizado em tempo real a cada alteração, permitindo que gestores tomem decisões com base em impacto financeiro imediato.

### **Sistema de Notificações WhatsApp para Escalas:**
- **Implementado Envio de Escalas por WhatsApp:** Criada a função de backend `send-schedule-notification` que formata a escala de cada funcionário e a envia para um webhook configurável (compatível com Make/Zapier). Uma nova tabela `communication_logs` foi adicionada para rastrear o status de cada envio. No frontend, a página de Integrações agora permite configurar a URL do webhook, e a página de Escalas possui uma nova ação para "Notificar Equipe".