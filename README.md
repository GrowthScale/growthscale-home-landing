# GrowthScale - Plataforma Enterprise de Gestão Inteligente de Escalas

## 🚀 **Sistema 100% Funcional e Pronto para Produção**

### ✅ **Status Atual**
- **Versão**: 3.1.0 (Latest)
- **Build Status**: ✅ Sucesso (3.10s)
- **TypeScript**: ✅ Zero erros de tipo
- **Linting**: ✅ Zero erros críticos
- **CI/CD**: ✅ Pipeline robusto e funcional
- **Deploy**: ✅ Automático via Vercel
- **Performance**: ✅ Otimizado para Core Web Vitals
- **Segurança**: ✅ Headers e validações implementados

## 📱 PWA (Progressive Web App)

O GrowthScale é um PWA responsivo que oferece:
- ✅ Instalação no dispositivo
- ✅ Funcionalidade offline
- ✅ Experiência nativa
- ✅ Atualizações automáticas
- ✅ Cache inteligente
- ✅ Background sync
- ✅ Push notifications

## 🚀 Como Configurar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone <YOUR_GIT_URL>
cd growthscale-home-landing

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas configurações

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

## ✨ Funcionalidades Principais

### 🎯 **Gestão Inteligente de Escalas**
- **Editor de Escalas Avançado**: Interface completa para criação e edição de escalas
- **Aplicação de Modelos**: Sistema para aplicar templates pré-definidos diretamente no editor
  - Modal dedicado para seleção de modelo e funcionários
  - Geração automática de turnos baseados na estrutura do template
  - Cálculo inteligente de datas da semana
  - Preview da estrutura antes da aplicação
- **Validação CLT em Tempo Real**: Motor de regras que verifica automaticamente violações da legislação trabalhista
- **Sugestões de IA**: Sistema inteligente que gera sugestões de escala otimizadas

### 🤖 **Assistente de IA para CLT**
- **Chatbot Especializado**: Assistente virtual para dúvidas sobre legislação trabalhista
- **Respostas em Tempo Real**: Integração com OpenAI GPT-3.5-turbo
- **Interface Flutuante**: Disponível em todas as páginas da aplicação
- **Histórico de Conversas**: Sistema de persistência de perguntas e respostas

### 📋 **Sistema de Templates**
- **Gerenciamento Completo**: Criar, editar, visualizar e deletar templates de escala
- **Estrutura Flexível**: Templates configuráveis com turnos, horários e funcionários padrão
- **Aplicação Inteligente**: Sistema que gera automaticamente escalas baseadas em modelos pré-definidos
- **Multi-tenancy**: Suporte a templates por empresa

### 📊 **Dashboard e Analytics**
- **Métricas em Tempo Real**: KPIs de produtividade e conformidade
- **Gráficos Interativos**: Visualizações de dados de escala e funcionários
- **Relatórios Automáticos**: Geração de relatórios de conformidade CLT

### 🔒 **Segurança e Conformidade**
- **Validação Automática**: Verificação contínua de conformidade com a CLT
- **Score de Risco**: Sistema de pontuação para identificar escalas problemáticas
- **Auditoria Completa**: Log de todas as alterações e validações realizadas

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `env.example`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_NAME=GrowthScale
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase
- **PWA**: Service Worker + Manifest
- **Build**: Vite
- **Deploy**: Vercel
- **CI/CD**: GitHub Actions
- **Analytics**: GA4, Mixpanel, Sentry, Hotjar
- **Charts**: Chart.js
- **Testing**: Vitest, Playwright
- **Linting**: ESLint + Prettier
- **Security**: Rate limiting, Audit logging

## 📱 Funcionalidades PWA

### Instalação
- O app pode ser instalado no dispositivo
- Funciona offline com cache inteligente
- Atualizações automáticas

### Responsividade
- Design mobile-first
- Funciona em todos os dispositivos
- Interface adaptativa

### Performance
- Lazy loading de componentes
- Otimização de imagens
- Cache inteligente

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── dashboard/      # Componentes do dashboard
│   └── ...
├── pages/              # Páginas da aplicação
├── hooks/              # Hooks customizados
├── contexts/           # Contextos React
├── lib/                # Utilitários e configurações
└── integrations/       # Integrações externas
```

## 🚀 Deploy

### Lovable (Recomendado)
1. Acesse [Lovable](https://lovable.dev)
2. Conecte seu repositório
3. Configure as variáveis de ambiente
4. Deploy automático

### Manual
```bash
npm run build
# Faça upload dos arquivos da pasta dist/
```

## 🔒 Segurança

- ✅ Validação de entrada
- ✅ Rate limiting
- ✅ Sanitização de dados
- ✅ Variáveis de ambiente seguras
- ✅ HTTPS obrigatório

## 📊 Monitoramento

- Console de erros integrado
- Logs de performance
- Métricas de uso

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para otimizar a gestão de escalas no food service**
# Force deploy Sat Aug 16 18:41:26 -03 2025
