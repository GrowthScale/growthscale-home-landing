# GrowthScale - PWA de Gestão Inteligente de Escalas

## 📱 PWA (Progressive Web App)

O GrowthScale é um PWA responsivo que oferece:
- ✅ Instalação no dispositivo
- ✅ Funcionalidade offline
- ✅ Experiência nativa
- ✅ Atualizações automáticas

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
- **Deploy**: Lovable

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
