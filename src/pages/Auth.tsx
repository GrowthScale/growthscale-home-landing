import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Checkbox } from '@/components/ui/checkbox'
import { type LoginInput, type RegisterInput } from '@/lib/validation'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [employeeCount, setEmployeeCount] = useState<number>(10)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Capturar mensagem de sucesso do estado de navegação
  useEffect(() => {
    if (location.state?.message && location.state?.type === 'success') {
      setSuccessMessage(location.state.message)
      // Limpar o estado para evitar que a mensagem apareça novamente
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage(null) // Limpar mensagem ao submeter
    
    try {
      if (isLogin) {
        const loginData: LoginInput = { email, password, rememberMe: false }
        const { error } = await signIn(loginData)
        if (!error) {
          navigate('/dashboard')
        } else {
          alert('Erro no login: ' + error)
        }
      } else {
        // Validação para campos obrigatórios no cadastro
        if (!fullName.trim()) {
          alert('Por favor, preencha o nome completo')
          setLoading(false)
          return
        }
        if (!companyName.trim()) {
          alert('Por favor, preencha o nome da empresa')
          setLoading(false)
          return
        }
        if (!companyEmail.trim()) {
          alert('Por favor, preencha o email da empresa')
          setLoading(false)
          return
        }
        if (!employeeCount || employeeCount < 1) {
          alert('Por favor, preencha o número de funcionários (mínimo 1)')
          setLoading(false)
          return
        }
        if (!acceptedTerms) {
          alert('Por favor, aceite os termos de uso')
          setLoading(false)
          return
        }

        const registerData: RegisterInput = {
          email,
          password,
          confirmPassword: password, // Assumindo que não há campo de confirmação separado
          fullName,
          companyName,
          companyEmail,
          employeeCount,
          acceptTerms: acceptedTerms
        }
        const { error } = await signUp(registerData)
        if (!error) {
          alert('Cadastro realizado com sucesso! Verifique seu email para confirmar a conta e criar sua empresa.')
          setIsLogin(true)
        } else {
          alert('Erro no cadastro: ' + error)
        }
      }
    } catch (error) {
      alert('Erro: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          {isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {successMessage && (
            <div className="bg-accent/10 border border-accent text-accent-foreground px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Sucesso!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                    Nome Completo <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
                    Nome da Empresa <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Digite o nome da empresa"
                  />
                </div>

                <div>
                  <label htmlFor="companyEmail" className="block text-sm font-medium text-foreground">
                    Email da Empresa <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    required
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="mt-1 block w-full border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="empresa@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="employeeCount" className="block text-sm font-medium text-foreground">
                    Número de Funcionários <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="employeeCount"
                    name="employeeCount"
                    type="number"
                    min="1"
                    max="9999"
                    required
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Digite o número de funcionários"
                  />
                  <div className="mt-1 text-xs text-muted-foreground">
                    Digite um número entre 1 e 9999
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Senha <span className="text-destructive">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Digite sua senha"
              />
            </div>

            {!isLogin && (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-foreground">
                    Aceito os{' '}
                    <a href="/legal/termos" className="text-primary hover:text-primary/80">
                      Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a href="/legal/privacidade" className="text-primary hover:text-primary/80">
                      Política de Privacidade
                    </a>
                  </label>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || (!isLogin && !acceptedTerms)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">ou</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLogin ? 'Criar nova conta' : 'Já tenho uma conta'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;