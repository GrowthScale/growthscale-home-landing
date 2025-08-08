# 🔧 Guia de Configuração GrowthScale

## 📋 Pré-requisitos

### Sistema Operacional
- **Windows**: 10 ou superior
- **macOS**: 10.15 ou superior
- **Linux**: Ubuntu 18.04+ ou similar

### Software Necessário
- **Node.js**: 18.0.0 ou superior
- **npm**: 8.0.0 ou superior (vem com Node.js)
- **Git**: 2.30.0 ou superior

### Verificação de Instalação
```bash
# Verificar Node.js
node --version
# Deve retornar: v18.x.x ou superior

# Verificar npm
npm --version
# Deve retornar: 8.x.x ou superior

# Verificar Git
git --version
# Deve retornar: 2.30.x ou superior
```

## 🚀 Instalação Passo a Passo

### 1. **Clone do Repositório**
```bash
# Clone o repositório
git clone <YOUR_REPOSITORY_URL>
cd growthscale-home-landing

# Verifique se está na branch correta
git branch
```

### 2. **Instalação de Dependências**
```bash
# Instale as dependências
npm install

# Verifique se não há erros
npm run lint
```

### 3. **Configuração de Ambiente**

#### Criar arquivo .env
```bash
# Copie o arquivo de exemplo
cp env.example .env
```

#### Editar variáveis de ambiente
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_NAME=GrowthScale
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Feature Flags (optional)
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=false
```

### 4. **Configuração do Supabase**

#### Criar Projeto Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Preencha as informações:
   - **Name**: GrowthScale
   - **Database Password**: (senha forte)
   - **Region**: (mais próxima)

#### Configurar Autenticação
1. No dashboard do Supabase, vá para **Authentication**
2. Configure os providers:
   - **Email**: Habilitado
   - **Google**: Opcional
   - **GitHub**: Opcional

#### Configurar Banco de Dados
1. Vá para **SQL Editor**
2. Execute os scripts de criação das tabelas (se necessário)

#### Obter Credenciais
1. Vá para **Settings** → **API**
2. Copie:
   - **Project URL**
   - **anon public** key

### 5. **Configuração do IDE**

#### VS Code (Recomendado)
```json
// settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

#### Extensões Recomendadas
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Prettier - Code formatter**
- **ESLint**

### 6. **Verificação da Instalação**

#### Testar Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra no navegador
# http://localhost:8080
```

#### Verificar Funcionalidades
- ✅ Página inicial carrega
- ✅ Navegação funciona
- ✅ Formulário de login
- ✅ PWA install prompt (se suportado)

## 🔧 Configurações Avançadas

### 1. **Configuração de Proxy (se necessário)**
```javascript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
```

### 2. **Configuração de HTTPS Local**
```bash
# Instalar mkcert
npm install -g mkcert

# Gerar certificados
mkcert -install
mkcert localhost

# Configurar Vite
# vite.config.ts
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem')
    }
  }
});
```

### 3. **Configuração de Debug**

#### VS Code Launch Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 🐛 Solução de Problemas

### Problema: "Module not found"
```bash
# Solução: Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Problema: "TypeScript errors"
```bash
# Solução: Verificar configuração
npm run lint
# Corrigir erros reportados
```

### Problema: "Supabase connection failed"
```bash
# Verificar variáveis de ambiente
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Verificar se o arquivo .env existe
ls -la .env
```

### Problema: "PWA not working"
```bash
# Verificar se HTTPS está configurado
# PWA requer HTTPS em produção

# Verificar manifest.json
cat public/manifest.json

# Verificar service worker
cat public/sw.js
```

## 📱 Configuração PWA

### 1. **Testar PWA Localmente**
```bash
# Build para produção
npm run build

# Servir build local
npm run preview

# Abrir em navegador
# https://localhost:4173
```

### 2. **Verificar PWA Features**
- ✅ Manifest carrega
- ✅ Service worker registra
- ✅ Install prompt aparece
- ✅ Offline funciona

### 3. **Configurar Ícones PWA**
```bash
# Gerar ícones (se necessário)
npm install -g pwa-asset-generator

# Gerar ícones
pwa-asset-generator logo.png ./public/icons
```

## 🔒 Configuração de Segurança

### 1. **Verificar Variáveis de Ambiente**
```bash
# NUNCA commitar .env
echo ".env" >> .gitignore

# Verificar se não há chaves hardcoded
grep -r "supabase.co" src/
grep -r "eyJ" src/
```

### 2. **Configurar CORS (se necessário)**
```javascript
// No Supabase Dashboard
// Settings → API → CORS
// Adicionar domínios permitidos
```

### 3. **Configurar Rate Limiting**
```typescript
// Já implementado em lib/utils.ts
const rateLimiter = createRateLimiter(5, 60000);
```

## 📊 Monitoramento

### 1. **Configurar Analytics (Opcional)**
```typescript
// src/lib/analytics.ts
export const initAnalytics = () => {
  if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
    // Configurar Google Analytics
  }
};
```

### 2. **Configurar Error Tracking**
```typescript
// src/lib/error-tracking.ts
export const trackError = (error: Error) => {
  console.error('Error:', error);
  // Enviar para serviço de monitoramento
};
```

## ✅ Checklist de Configuração

- ✅ **Node.js instalado** (v18+)
- ✅ **Dependências instaladas** (npm install)
- ✅ **Arquivo .env configurado**
- ✅ **Supabase configurado**
- ✅ **Servidor rodando** (npm run dev)
- ✅ **Página carrega** sem erros
- ✅ **PWA funciona** (se suportado)
- ✅ **Linting passa** (npm run lint)
- ✅ **Build funciona** (npm run build)

## 🚀 Próximos Passos

1. **Configurar Deploy**
   - Vercel/Netlify para produção
   - Configurar variáveis de ambiente

2. **Configurar Domínio**
   - DNS configuration
   - SSL certificate

3. **Configurar Monitoramento**
   - Error tracking
   - Performance monitoring

4. **Configurar CI/CD**
   - GitHub Actions
   - Automated testing

---

**🎉 Configuração concluída! O GrowthScale está pronto para desenvolvimento.** 