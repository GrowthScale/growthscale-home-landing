# 🚀 GUIA PRÁTICO - USO DA ARQUITETURA ROBUSTA

## 📖 COMO USAR A NOVA ARQUITETURA

Este guia mostra como utilizar a nova arquitetura robusta em sua aplicação React.

## 🔧 CONFIGURAÇÃO INICIAL

### 1. **Configurar Providers no App.tsx**

```typescript
import { AuthProvider } from '@/contexts/AuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { AppStateProvider } from '@/hooks/useAppState';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <ThemeProvider>
          <AuthProvider>
            <TenantProvider>
              <AppStateProvider>
                <div className="App">
                  <AppRoutes />
                  <Toaster />
                </div>
              </AppStateProvider>
            </TenantProvider>
          </AuthProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}
```

### 2. **Configurar Rotas com Proteção**

```typescript
// src/routes/index.tsx
import { AuthRequired, OnboardingRequired, PublicOnly } from '@/components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={
        <PublicOnly>
          <LandingPage />
        </PublicOnly>
      } />
      
      {/* Rota de autenticação */}
      <Route path="/auth" element={
        <PublicOnly>
          <Auth />
        </PublicOnly>
      } />
      
      {/* Callback de autenticação */}
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Onboarding (requer autenticação) */}
      <Route path="/onboarding" element={
        <AuthRequired>
          <Onboarding />
        </AuthRequired>
      } />
      
      {/* Dashboard (requer autenticação + onboarding) */}
      <Route path="/dashboard" element={
        <OnboardingRequired>
          <Dashboard />
        </OnboardingRequired>
      } />
    </Routes>
  );
};
```

## 🎯 USO DOS HOOKS

### 1. **useAuth - Autenticação**

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await signIn(formData);
      
      if (result.success) {
        // Login bem-sucedido - redirecionamento automático
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Erro inesperado. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Seus campos de formulário */}
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

### 2. **useOnboardingStatus - Status de Onboarding**

```typescript
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

function OnboardingPage() {
  const { 
    isComplete, 
    hasCompany, 
    hasPendingCompany, 
    isLoading,
    refreshStatus 
  } = useOnboardingStatus();

  useEffect(() => {
    if (isComplete && hasCompany) {
      // Onboarding completo - redirecionamento automático para dashboard
      console.log('Onboarding completo!');
    }
  }, [isComplete, hasCompany]);

  if (isLoading) {
    return <GlobalLoading message="Verificando status..." />;
  }

  return (
    <div>
      <h1>Configurar sua empresa</h1>
      {/* Seu formulário de onboarding */}
      <button onClick={refreshStatus}>
        Atualizar Status
      </button>
    </div>
  );
}
```

### 3. **useAppState - Estado Global**

```typescript
import { useAppState } from '@/hooks/useAppState';

function AppHeader() {
  const { 
    currentStep, 
    isOnline, 
    hasError, 
    errorMessage,
    clearError 
  } = useAppState();

  return (
    <header>
      <div className="status-indicators">
        {/* Indicador de conectividade */}
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '🌐 Online' : '📡 Offline'}
        </div>
        
        {/* Indicador de erro */}
        {hasError && (
          <div className="error-banner">
            <span>{errorMessage}</span>
            <button onClick={clearError}>✕</button>
          </div>
        )}
        
        {/* Indicador de progresso */}
        <div className="progress-indicator">
          {currentStep === 'auth' && '🔐 Autenticação'}
          {currentStep === 'onboarding' && '🏢 Configuração'}
          {currentStep === 'dashboard' && '📊 Dashboard'}
        </div>
      </div>
    </header>
  );
}
```

## 🛡️ PROTEÇÃO DE ROTAS

### 1. **Proteção Básica**

```typescript
// Rota que requer apenas autenticação
<AuthRequired>
  <UserProfile />
</AuthRequired>

// Rota que requer autenticação + onboarding completo
<OnboardingRequired>
  <Dashboard />
</OnboardingRequired>

// Rota apenas para usuários não autenticados
<PublicOnly>
  <Auth />
</PublicOnly>
```

### 2. **Proteção Avançada**

```typescript
// Proteção com roles específicos
<ProtectedRoute 
  requiredAuth={true}
  allowedRoles={['admin', 'manager']}
  fallbackPath="/unauthorized"
>
  <AdminPanel />
</ProtectedRoute>

// Proteção com onboarding obrigatório
<ProtectedRoute 
  requiredAuth={true}
  requiredOnboarding={true}
>
  <CompanySettings />
</ProtectedRoute>
```

## 🔄 FLUXOS DE AUTENTICAÇÃO

### 1. **Fluxo de Cadastro**

```typescript
function SignUpForm() {
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    employeeCount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signUp(formData);
    
    if (result.success) {
      if (result.message.includes('Email de confirmação')) {
        // Usuário precisa confirmar email
        toast.success('Verifique sua caixa de entrada para confirmar o email!');
        navigate('/auth?pending=confirmation');
      } else {
        // Usuário já confirmado
        toast.success('Conta criada com sucesso!');
        // Redirecionamento automático para onboarding
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Seus campos */}
      <button type="submit" disabled={loading}>
        {loading ? 'Criando conta...' : 'Criar conta'}
      </button>
    </form>
  );
}
```

### 2. **Fluxo de Confirmação**

```typescript
// AuthCallback.tsx já está configurado automaticamente
// O usuário clica no link do email e é redirecionado para:
// /auth/callback?code=xxx

// O AuthCallback processa automaticamente e redireciona para:
// - /onboarding?verified=true (se tem dados pendentes)
// - /dashboard?verified=true (se onboarding completo)
```

### 3. **Fluxo de Onboarding**

```typescript
function OnboardingPage() {
  const { user } = useAuth();
  const { refreshStatus } = useOnboardingStatus();
  
  const handleCompleteOnboarding = async (companyData: any) => {
    try {
      // Criar empresa no banco
      const { data, error } = await supabase
        .from('companies')
        .insert([companyData])
        .select()
        .single();

      if (error) throw error;

      // Atualizar status de onboarding
      await refreshStatus();
      
      // Redirecionamento automático para dashboard
      toast.success('Empresa configurada com sucesso!');
    } catch (error) {
      toast.error('Erro ao configurar empresa. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Configure sua empresa</h1>
      <p>Olá, {user?.user_metadata?.full_name}!</p>
      
      {/* Seu formulário de configuração */}
      <OnboardingForm onSubmit={handleCompleteOnboarding} />
    </div>
  );
}
```

## 🎨 COMPONENTES DE LOADING

### 1. **Loading States**

```typescript
import { 
  GlobalLoading, 
  AuthLoading, 
  OnboardingLoading,
  PageLoading,
  InlineLoading 
} from '@/components/GlobalLoading';

// Loading padrão
<GlobalLoading message="Carregando dados..." />

// Loading específico para autenticação
<AuthLoading />

// Loading específico para onboarding
<OnboardingLoading />

// Loading inline
<InlineLoading message="Salvando..." />

// Loading fullscreen
<GlobalLoading 
  variant="fullscreen" 
  message="Verificando autenticação..." 
/>
```

### 2. **Loading em Formulários**

```typescript
function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Sua lógica de submissão
      await submitData(data);
      toast.success('Dados salvos com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Seus campos */}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <InlineLoading message="Salvando..." />
        ) : (
          'Salvar'
        )}
      </button>
    </form>
  );
}
```

## 🐛 DEBUGGING E LOGS

### 1. **Logs Automáticos**

A arquitetura já inclui logs detalhados. Para ver:

```typescript
// Abra o console do navegador e procure por:
// 🚀 AuthProvider: Iniciando cadastro
// ✅ AuthCallback: Sessão criada com sucesso
// 🔍 useOnboardingStatus: Verificando status
// 🎯 AppState: Passo atual determinado
```

### 2. **Debug Manual**

```typescript
function DebugPanel() {
  const { user, session, loading } = useAuth();
  const { isComplete, hasCompany, hasPendingCompany } = useOnboardingStatus();
  const { currentStep, isOnline } = useAppState();

  const debugInfo = {
    user: user?.email,
    session: !!session,
    loading,
    onboarding: { isComplete, hasCompany, hasPendingCompany },
    appState: { currentStep, isOnline }
  };

  console.log('🐛 Debug Info:', debugInfo);

  return (
    <div className="debug-panel">
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
    </div>
  );
}
```

## 🚀 DEPLOYMENT

### 1. **Variáveis de Ambiente**

```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_VERSION=1.0.0
```

### 2. **Configuração do Supabase**

1. **Authentication > URL Configuration:**
   - Site URL: `https://your-domain.vercel.app`
   - Additional Redirect URLs: `https://your-domain.vercel.app/auth/callback`

2. **Authentication > Email Templates:**
   - Personalizar template de confirmação
   - Incluir URL de redirecionamento

### 3. **Vercel Deployment**

```bash
# Build e deploy
npm run build
vercel --prod
```

## 📊 MONITORAMENTO

### 1. **Métricas de Performance**

```typescript
// Os logs já incluem métricas de performance
// Procure por logs com timestamps para medir:
// - Tempo de carregamento dos contextos
// - Tempo de processamento do callback
// - Tempo de redirecionamento
```

### 2. **Tratamento de Erros**

```typescript
// Erros são automaticamente capturados e logados
// Para tratamento customizado:

const { setError } = useAppState();

try {
  // Sua operação
} catch (error) {
  setError('Mensagem de erro customizada');
  console.error('Erro detalhado:', error);
}
```

## 🎯 BOAS PRÁTICAS

### 1. **Sempre use os hooks fornecidos**

```typescript
// ✅ Correto
const { user, signIn } = useAuth();
const { isComplete } = useOnboardingStatus();

// ❌ Evite
const [user, setUser] = useState(null);
```

### 2. **Use os componentes de proteção**

```typescript
// ✅ Correto
<AuthRequired>
  <ProtectedComponent />
</AuthRequired>

// ❌ Evite
if (!user) return <Navigate to="/auth" />;
```

### 3. **Use os componentes de loading**

```typescript
// ✅ Correto
if (loading) return <GlobalLoading message="Carregando..." />;

// ❌ Evite
if (loading) return <div>Loading...</div>;
```

### 4. **Trate erros adequadamente**

```typescript
// ✅ Correto
const result = await signIn(data);
if (!result.success) {
  toast.error(result.message);
}

// ❌ Evite
try {
  await signIn(data);
} catch (error) {
  console.error(error);
}
```

## 🔮 PRÓXIMOS PASSOS

1. **Implementar testes** para os componentes
2. **Adicionar analytics** para métricas de uso
3. **Otimizar performance** com lazy loading
4. **Implementar cache** para dados frequentes
5. **Adicionar PWA** features

---

**Esta arquitetura está pronta para uso em produção e oferece uma base sólida para crescimento futuro!**
