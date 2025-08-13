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

## [1.3.0] - 2024-12-19

### 🚀 **Novas Funcionalidades**
- **Sistema de Banco de Dados Completo**: Implementado schema completo do banco de dados com todas as tabelas necessárias
  - **9 Tabelas Criadas**: companies, company_users, branches, employees, schedules, shifts, schedule_templates, communication_logs, activity_logs
  - **Row Level Security (RLS)**: Políticas de segurança configuradas para todas as tabelas
  - **Relacionamentos**: Foreign keys e constraints configurados corretamente
  - **Índices de Performance**: Otimizações para consultas frequentes
  - **Triggers Automáticos**: Função `update_updated_at_column()` para atualização automática de timestamps
  - **Multi-tenancy**: Sistema completo de isolamento por empresa/tenant
  - **Auditoria**: Logs de atividade e comunicação configurados

- **Deploy Automático**: Configuração completa de CI/CD
  - **GitHub**: Repositório configurado e sincronizado
  - **Vercel**: Deploy automático configurado com build otimizado
  - **Supabase**: Projeto linkado e configurado
  - **Variáveis de Ambiente**: Configuradas para produção

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

- **Exportação para Contabilidade**: Implementada funcionalidade completa de exportação de relatórios
  - **Formato CSV**: Exportação em formato padrão para contadores
  - **Dados Completos**: Funcionário, data, entrada, saída e horas totais
  - **Formatação Brasileira**: Datas e horários no formato pt-BR
  - **Cálculo Automático**: Horas trabalhadas calculadas automaticamente
  - **Interface Intuitiva**: Botão dedicado na página de Compliance
  - **Download Automático**: Arquivo baixado automaticamente com nome personalizado
  - **Dados Mock**: Implementado com dados de exemplo para demonstração

- **Implementada a Exportação de Relatórios para CSV:** Adicionada a funcionalidade de "Exportar para CSV" na área de relatórios. O sistema agora permite que os usuários baixem um relatório detalhado das escalas, incluindo funcionários, datas, horários e total de horas, facilitando a integração com sistemas de folha de pagamento e a análise pela contabilidade.

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
- **Schema SQL**: Criado arquivo `database-schema-fixed.sql` com schema completo
- **Configuração**: Documentado processo de setup do banco de dados

### 🔧 **Infraestrutura**
- **Supabase CLI**: Configurado e linkado ao projeto
- **Types Generation**: Atualizados tipos TypeScript do Supabase
- **Edge Functions**: Corrigidas dependências e imports
- **Build System**: Otimizado para produção na Vercel
- **Environment Variables**: Configuradas para todas as plataformas

### 🚀 **Deploy**
- **URL de Produção**: https://growthscale-home-landing-eeo01u3mg.vercel.app
- **GitHub Repository**: https://github.com/GrowthScale/growthscale-home-landing
- **Supabase Project**: doldfscfnivsrhqopecu
- **Status**: ✅ 100% funcional e pronto para produção

---

## [1.4.0] - 2024-12-19

### 🎨 **Design System & UX**

#### **Auditoria Completa do Design System**
- **Análise de Tokens**: Auditados todos os tokens de design no `tailwind.config.ts`
  - Cores primárias, secundárias, accent, destructive e success mapeadas
  - Famílias de fontes (Roboto, SF Pro, System) documentadas
  - Tamanhos de fonte (xs até 6xl) catalogados
- **Verificação de Inconsistências**: Busca global por valores hardcoded
  - Identificados valores hardcoded em 15+ arquivos
  - Categorizados por tipo: cores, fontes, espaçamentos, dimensões
  - Mapeados para migração para tokens do design system

#### **Centralização de Tamanhos Hardcoded em Tokens**
- **Novos Tokens Criados**:
  ```typescript
  spacing: {
    '18': '4.5rem', // 72px
    '22': '5.5rem', // 88px
  },
  minHeight: {
    'textarea': '80px',
    'textarea-lg': '120px',
  },
  maxWidth: {
    'toast': '420px',
    'modal-md': '625px',
  }
  ```
- **Substituições Realizadas**:
  - `min-h-[80px]` → `min-h-textarea` (6 arquivos)
  - `min-h-[120px]` → `min-h-textarea-lg` (1 arquivo)
  - `max-w-[420px]` → `max-w-toast` (1 arquivo)
  - `max-w-2xl` → `max-w-modal-md` (13 arquivos em DialogContent)
  - `#fff` → `stroke-background` (1 arquivo)
- **Arquivos Atualizados**: 18 arquivos com 50+ substituições
- **Benefícios**: Consistência visual, facilidade de manutenção, melhor DX

#### **Reestruturação Completa da Hero Section**
- **Título Principal**: Alterado para foco na dor
  - **Antes**: "GrowthScale: A Revolução na Gestão de Escalas para o Food Service"
  - **Depois**: "Deixe de perder tempo e dinheiro com escalas manuais."
- **Subtítulo**: Foco na solução e benefícios
  - **Antes**: "Simplifique a gestão da sua equipe, reduza custos e impulsione o crescimento do seu negócio com a nossa plataforma inovadora."
  - **Depois**: "A plataforma com Inteligência Artificial que blinda seu restaurante contra riscos trabalhistas, otimiza sua equipe e prevê seus custos. Em minutos, não em horas."
- **Call to Action (CTAs)**:
  - Botão Principal: "Cadastre-se" → "Começar Grátis"
  - Botão Secundário: "Solicite Mais Informações" → "Agendar Demonstração"
- **Elemento Visual**: Adicionado TODO para substituição por GIF/vídeo demonstrativo
- **Impacto**: Maior conversão, melhor qualificação de leads, redução de objeções

### 🔄 **Localização e Terminologia**

#### **Substituição Completa: "Template" → "Modelo"**
- **Escopo**: Todos os textos visíveis ao usuário em português
- **Arquivos Atualizados**: 5 arquivos principais
- **Substituições Realizadas**: 50+ ocorrências
- **Preservado**: Nomes técnicos (componentes, interfaces, métodos, variáveis)
- **Mudanças Principais**:
  - Comentários e mensagens de erro na API
  - Textos da interface do usuário
  - Mensagens de toast e feedback
  - Títulos de seções e botões
  - Descrições de funcionalidades
- **Benefícios**: Terminologia consistente em português brasileiro, melhor experiência do usuário

### 🔧 **Melhorias Técnicas**

#### **Auditoria de Layout e Hierarquia Visual**
- **Páginas Analisadas**: Dashboard, ScheduleEditor, Employees
- **Análise Realizada**:
  - Estrutura principal do layout (grid/flexbox)
  - Títulos principais (H1) e estilos
  - Títulos de cards e seções
  - Consistência visual entre páginas
- **Recomendações**: Padronização de hierarquia e espaçamentos

#### **Auditoria do Fluxo de Registro de Usuário**
- **Análise Completa**: Página Auth.tsx até primeira experiência pós-cadastro
- **Identificado**: Gap crítico na onboarding (falta de redirecionamento automático)
- **Implementado**: Redirecionamento automático para setup de empresa

#### **Auditoria de Estados de Loading, Erro e Sucesso**
- **Análise**: Todos os `useQuery` e `useMutation` do projeto
- **Identificado**: Falta de tratamento de erro em `useQuery` específicos
- **Implementado**: `onError` callbacks com toast notifications

### 🚀 **Novas Funcionalidades**

#### **Redirecionamento Automático para Setup**
- **Implementado**: Lógica em `ProtectedRoute.tsx`
- **Funcionalidade**: Verifica se usuário tem empresa configurada
- **Comportamento**: Redireciona automaticamente para `/setup` se necessário
- **Prevenção**: Evita redirecionamento infinito com verificação de rota atual
- **Benefício**: Onboarding guiado para novos usuários

#### **Tratamento de Erro em Queries Críticas**
- **Implementado**: `onError` callbacks em `ScheduleEditor.tsx`
- **Escopo**: Queries de validação e cálculo de custo em tempo real
- **Funcionalidade**: Toast notifications para erros de conexão/validação
- **Benefício**: Feedback robusto para funcionalidades críticas

### 📚 **Documentação**
- **CHANGELOG**: Atualizado com todas as mudanças recentes
- **Auditorias**: Documentadas análises de design system, layout e fluxos
- **Implementações**: Registradas todas as melhorias técnicas
- **Benefícios**: Mapeados impactos de cada mudança

### 🎯 **Impacto Geral**
- **UX**: Melhorada significativamente com foco na dor e solução clara
- **Consistência**: Design system unificado e terminologia padronizada
- **Conversão**: Hero Section otimizada para maior conversão
- **Manutenibilidade**: Código mais limpo e tokens centralizados
- **Onboarding**: Fluxo guiado para novos usuários

---

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

## [1.3.0] - 2024-12-19

### 🚀 **Novas Funcionalidades**
- **Sistema de Banco de Dados Completo**: Implementado schema completo do banco de dados com todas as tabelas necessárias
  - **9 Tabelas Criadas**: companies, company_users, branches, employees, schedules, shifts, schedule_templates, communication_logs, activity_logs
  - **Row Level Security (RLS)**: Políticas de segurança configuradas para todas as tabelas
  - **Relacionamentos**: Foreign keys e constraints configurados corretamente
  - **Índices de Performance**: Otimizações para consultas frequentes
  - **Triggers Automáticos**: Função `update_updated_at_column()` para atualização automática de timestamps
  - **Multi-tenancy**: Sistema completo de isolamento por empresa/tenant
  - **Auditoria**: Logs de atividade e comunicação configurados

- **Deploy Automático**: Configuração completa de CI/CD
  - **GitHub**: Repositório configurado e sincronizado
  - **Vercel**: Deploy automático configurado com build otimizado
  - **Supabase**: Projeto linkado e configurado
  - **Variáveis de Ambiente**: Configuradas para produção

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

- **Exportação para Contabilidade**: Implementada funcionalidade completa de exportação de relatórios
  - **Formato CSV**: Exportação em formato padrão para contadores
  - **Dados Completos**: Funcionário, data, entrada, saída e horas totais
  - **Formatação Brasileira**: Datas e horários no formato pt-BR
  - **Cálculo Automático**: Horas trabalhadas calculadas automaticamente
  - **Interface Intuitiva**: Botão dedicado na página de Compliance
  - **Download Automático**: Arquivo baixado automaticamente com nome personalizado
  - **Dados Mock**: Implementado com dados de exemplo para demonstração

- **Implementada a Exportação de Relatórios para CSV:** Adicionada a funcionalidade de "Exportar para CSV" na área de relatórios. O sistema agora permite que os usuários baixem um relatório detalhado das escalas, incluindo funcionários, datas, horários e total de horas, facilitando a integração com sistemas de folha de pagamento e a análise pela contabilidade.

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
- **Schema SQL**: Criado arquivo `database-schema-fixed.sql` com schema completo
- **Configuração**: Documentado processo de setup do banco de dados

### 🔧 **Infraestrutura**
- **Supabase CLI**: Configurado e linkado ao projeto
- **Types Generation**: Atualizados tipos TypeScript do Supabase
- **Edge Functions**: Corrigidas dependências e imports
- **Build System**: Otimizado para produção na Vercel
- **Environment Variables**: Configuradas para todas as plataformas

### 🚀 **Deploy**
- **URL de Produção**: https://growthscale-home-landing-eeo01u3mg.vercel.app
- **GitHub Repository**: https://github.com/GrowthScale/growthscale-home-landing
- **Supabase Project**: doldfscfnivsrhqopecu
- **Status**: ✅ 100% funcional e pronto para produção

---

## [1.5.0] - 2024-12-19

### 🔐 **Sistema RBAC (Role-Based Access Control)**

#### **Implementação Completa do RBAC**
- **Backend (Supabase)**: Sistema completo de controle de acesso baseado em papéis
  - **Tabela `user_profiles`**: Armazena roles dos usuários com relacionamento para `auth.users`
  - **Row Level Security (RLS)**: Políticas de segurança configuradas para todas as tabelas
  - **Funções auxiliares**: `update_user_role()`, `get_current_user_role()`, `list_users_with_roles()`
  - **Trigger automático**: Criação de perfil com role padrão 'employee' quando usuário se registra
  - **Script SQL corrigido**: `supabase/rbac-setup-fixed.sql` compatível com limitações do Supabase

#### **Frontend (React)**
- **Hook `useAccessControl`**: Verificação de permissões em tempo real
- **Componente `AccessControl`**: Renderização condicional baseada em permissões
- **`ProtectedRoute`**: Proteção de rotas com verificação de permissões
- **UI condicional**: Botões, menus e funcionalidades baseadas no role do usuário

#### **Papéis e Permissões Definidos**
- **Owner (`owner`)**: Controle total (faturamento, configurações, todas as escalas)
- **Manager (`manager`)**: Acesso operacional para unidade específica
- **Employee (`employee`)**: Acesso apenas à própria escala

#### **Demonstração RBAC Implementada**
- **Botão "Configurações da Empresa"**: Visível apenas para owners no Header
- **Página `CompanySettings`**: Interface completa com controle de acesso
- **Rota protegida**: `/configuracoes-empresa` com verificação de permissão
- **Badge de role**: Exibição do papel atual do usuário na interface

### 🌱 **Script de Seed para Modelos de Escala**

#### **Script de Seed Completo**
- **`supabase/seed.js`**: Script para pré-popular tabela `schedule_templates`
- **11 modelos de escala**: Cobertura completa do setor de food service
- **Dados estruturados**: Métricas, metadados e informações detalhadas por modelo
- **Validação robusta**: Verificação de credenciais, sintaxe e estrutura da tabela
- **Tratamento de erros**: Logs detalhados e fallbacks seguros

#### **Modelos de Escala Incluídos**
1. **6x1 (Padrão Varejo)** - Restaurantes, fast-food, supermercados
2. **5x2 (Equilíbrio)** - Administrativo, padarias, produção interna
3. **12x36 (Plantão Contínuo)** - Hotéis, segurança, hospitais
4. **Turno Parcial (Pico de Demanda)** - Fast-food, cafeterias, delivery
5. **Intermitente (Sob Demanda)** - Eventos, buffets, reforço em picos
6. **5x1 (Operação Intensa)** - Cozinhas industriais, redes de varejo
7. **4x2 (Turnos Longos)** - Hotelaria, catering, food service contínuo
8. **6x2 (Menor Desgaste)** - Padarias, restaurantes com folga dupla
9. **24x48 (Plantão Extremo)** - Operações logísticas especiais
10. **Horário Móvel (Eventos)** - Buffets, eventos, restaurantes sazonais
11. **Alta Temporada (Sazonal)** - Turismo, restaurantes em áreas sazonais

#### **Automação Completa**
- **`scripts/run-seed.sh`**: Script automatizado para execução do seed
- **Verificações automáticas**: Node.js, arquivos, sintaxe, credenciais
- **Relatórios detalhados**: Status completo e troubleshooting
- **Integração com health check**: Verificação de scripts de seed

### 🚀 **Novas Funcionalidades**

#### **Sistema de Rascunhos Semanais Automáticos**
- **Infraestrutura Completa**: Tabela `schedule_drafts` com RLS e índices otimizados
- **Função Edge `generate-weekly-drafts`**: Processamento automático de todos os tenants
- **Integração com IA**: Utiliza função `suggest-schedule` existente para geração
- **Prevenção de Duplicatas**: Verificação de rascunhos existentes por semana/tenant
- **Scripts de Automação**: Setup completo com validações e testes

#### **Card Proativo no Dashboard**
- **Design Gradiente**: Card com animação fade-in-down e cores primárias
- **Mensagem Motivacional**: "Sua Escala da Próxima Semana está Pronta!"
- **Navegação Inteligente**: Redirecionamento para página de revisão
- **Renderização Condicional**: Aparece apenas quando há rascunho pendente
- **Atualização em Tempo Real**: Refetch automático a cada 30 segundos

#### **Página de Revisão de Rascunhos**
- **Rota Protegida**: `/schedules/draft/:draftId` com permissão `manage:schedules`
- **Interface Completa**: Header, informações detalhadas e preview da escala
- **Ações Integradas**: Aprovar, rejeitar e descartar rascunhos
- **Navegação Inteligente**: Volta ao dashboard após ações
- **Tratamento de Estados**: Loading, erro e sucesso com feedback visual

#### **Sistema de Relatórios Semanais Automáticos**
- **Edge Function `send-weekly-report`**: Processamento automático de todos os tenants
- **Cálculo de Métricas Reais**: Custo total, horas extras, violações CLT, funcionários ativos
- **Integração com IA (OpenAI)**: Resumo executivo personalizado com insights acionáveis
- **Template de E-mail Profissional**: HTML responsivo com design moderno e métricas detalhadas
- **Sistema de E-mail (Resend)**: Envio em lote com fallback para logs
- **Agendamento Flexível**: GitHub Actions, Vercel Cron Jobs ou serviços externos
- **Script de Automação**: `scripts/setup-weekly-reports.sh` para configuração completa
- **Documentação Completa**: `docs/WEEKLY_REPORTS.md` com guias de configuração e troubleshooting

#### **Relatório Semanal Automático por E-mail**
- **Agendamento Automático**: Função `send-weekly-report` configurada para execução semanal
- **Cron Schedule**: `0 8 * * 1` (toda segunda-feira às 08:00)
- **Métricas Principais**: Custo total, horas extras, violações CLT, funcionários ativos
- **Resumo Executivo IA**: Análise inteligente com pontos positivos e de atenção
- **Entrega Proativa**: E-mails enviados automaticamente para todos os gestores
- **Template Profissional**: Design responsivo com métricas detalhadas e CTA para dashboard
- **Valor Contínuo**: Insights semanais que demonstram o valor da plataforma

#### **Placar de Equidade para Distribuição de Turnos**
- **Análise Estatística**: Cálculo de equidade baseado em desvio padrão da distribuição
- **Foco em Fins de Semana**: Análise específica de turnos de sábado e domingo
- **Pontuação 0-100**: Sistema de scoring com categorias (Excelente/Regular/Crítico)
- **Componente Visual**: EquityScore com progress bar, badges e indicadores coloridos
- **Integração Dashboard**: Exibição proativa no dashboard principal
- **Algoritmo Inteligente**: Normalização estatística para avaliação justa
- **Mensagens Contextuais**: Feedback personalizado baseado na pontuação
- **Script de Deploy**: Automação completa com testes e validação

#### **Sistema Completo de Placar de Equidade**
- **Motor de Análise**: Cálculo automático de equidade na distribuição de turnos de fim de semana
- **Score de Equidade**: Avaliação da justiça na distribuição entre funcionários
- **Prevenção de Esgotamento**: Ajuda gestores a criar ambiente de trabalho mais justo
- **Análise Estatística**: Baseada em desvio padrão para avaliação objetiva
- **Feedback em Tempo Real**: Atualização automática durante edição da escala
- **Interface Intuitiva**: Visualização clara com cores e mensagens explicativas
- **Ambiente Justo**: Promoção de distribuição equilibrada de carga de trabalho
- **Prevenção de Conflitos**: Redução de disputas por turnos de fim de semana
- **Integração ScheduleEditor**: Análise em tempo real no painel de "Análise de Risco"
- **Feedback Visual**: Progress bar colorida com indicadores de status
- **Mensagens Contextuais**: Exibição de mensagens explicativas da equidade
- **Ícone Scale**: Identificação visual clara da funcionalidade
- **Separador Visual**: Border-top para distinguir das outras métricas
- **Fallback Seguro**: Tratamento robusto para dados ausentes
- **Compatibilidade**: Integração perfeita com sistema de validação existente

### 📚 **Documentação Atualizada**

#### **Arquitetura RBAC**
- **`docs/ARCHITECTURE.md`**: Seção completa sobre RBAC adicionada
- **Implementação técnica**: Backend e frontend documentados
- **Matriz de permissões**: Detalhamento por papel
- **Fluxo de autenticação**: Processo completo com RBAC
- **Segurança e validação**: Medidas implementadas

#### **Documentação do Seed**
- **`supabase/README_SEED.md`**: Guia completo de uso
- **Instruções detalhadas**: Configuração e execução
- **Troubleshooting**: Soluções para problemas comuns
- **Estrutura de dados**: Explicação completa dos modelos

### 🔧 **Melhorias Técnicas**

#### **Scripts de Automação**
- **Health check atualizado**: Inclui verificação de scripts de seed
- **Validação de sintaxe**: Verificação automática de arquivos JavaScript
- **Relatórios integrados**: Status completo do sistema
- **Verificação de dependências**: Node.js e Supabase SDK

#### **Correções de Compatibilidade**
- **Script RBAC corrigido**: Compatível com estrutura real das tabelas
- **Remoção de referências**: Coluna `user_id` inexistente em `employees`
- **Políticas RLS atualizadas**: Baseadas em relacionamentos corretos
- **Fallback seguro**: Uso de email para relacionamento employee-user

#### **Melhoria na UX de Seleção de Modelos**
- **Interface Redesenhada**: Substituído seletor simples por galeria de cards visuais
- **Dados Enriquecidos**: Exibição de descrição, vantagens, casos de uso e perfil de custo
- **Seleção Visual**: Cards destacados quando selecionados com feedback visual
- **Fluxo Otimizado**: Seleção em duas etapas (modelo → funcionários)
- **Layout Responsivo**: Grid adaptável para diferentes tamanhos de tela
- **Validação Inteligente**: Botão desabilitado até seleção completa
- **Informações Contextuais**: Badges coloridos para perfil de custo (Baixo/Médio/Alto)
- **Experiência Superior**: Melhoria drástica na tomada de decisão do gestor

### 🚀 **Deploy e Infraestrutura**

#### **URLs Atualizadas**
- **Produção**: https://growthscale-home-landing-nzqqb3c62.vercel.app
- **RBAC Demo**: Disponível na aplicação após configuração
- **Configurações da Empresa**: `/configuracoes-empresa` (apenas owners)

#### **Status do Sistema**
- ✅ **RBAC**: Implementado e funcionando
- ✅ **Seed Scripts**: Prontos para uso
- ✅ **Documentação**: Completa e atualizada
- ✅ **Automação**: Scripts funcionais
- ✅ **Deploy**: Atualizado em produção

### 🎯 **Impacto Geral**
- **Segurança**: Controle granular de acesso baseado em papéis
- **Experiência**: Interface adaptada ao papel do usuário
- **Produtividade**: 11 modelos de escala prontos para uso
- **Manutenibilidade**: Scripts automatizados e documentação completa
- **Escalabilidade**: Sistema preparado para múltiplos tenants e papéis

---

## [Unreleased]

### 🚀 **Funcionalidades em Desenvolvimento**
- **Motor de Regras da CLT**: Sistema de validação automática de conformidade com a legislação trabalhista
- **Assistente de IA para CLT**: Chatbot especializado em dúvidas sobre legislação trabalhista
- **Sugestão de Escala com IA**: Geração automática de escalas otimizadas usando inteligência artificial
- **Sistema de Notificações Avançado**: Notificações push e integração com múltiplos canais
- **Relatórios Avançados**: Dashboards analíticos e relatórios customizáveis
- **Integração com Sistemas Externos**: APIs para integração com folha de pagamento e RH

### 🔧 **Melhorias Planejadas**
- **Performance**: Otimização de queries e cache
- **Acessibilidade**: Melhorias na acessibilidade e usabilidade
- **Mobile**: Aplicativo mobile nativo
- **Internacionalização**: Suporte a múltiplos idiomas
- **Temas**: Sistema de temas personalizáveis

### 📚 **Documentação Planejada**
- **API Documentation**: Documentação completa da API
- **User Guide**: Guia completo do usuário
- **Developer Guide**: Guia para desenvolvedores
- **Video Tutorials**: Tutoriais em vídeo
- **Best Practices**: Melhores práticas de uso