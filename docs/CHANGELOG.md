# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

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

### 🐛 **Correções de Bugs**
- Corrigido regex de validação de telefone em `src/lib/utils.ts`
- Corrigidos tipos inseguros em todos os componentes
- Corrigidas dependências de hooks em `TenantContext.tsx` e `useNavigation.ts`

### 📚 **Documentação**
- Atualizada documentação com resultados da auditoria completa
- Adicionado registro detalhado de todas as correções realizadas

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