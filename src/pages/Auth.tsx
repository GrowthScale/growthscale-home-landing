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
          alert('Cadastro realizado! Verifique seu email.')
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Sucesso!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-900">
                    Nome da Empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite o nome da empresa"
                  />
                </div>

                <div>
                  <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-900">
                    Email da Empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    required
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="empresa@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-900">
                    Número de Funcionários <span className="text-red-500">*</span>
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite o número de funcionários"
                  />
                  <div className="mt-1 text-xs text-gray-600">
                    Digite um número entre 1 e 9999
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-900">
                    Aceito os{' '}
                    <a href="/legal/termos" className="text-blue-600 hover:text-blue-500">
                      Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a href="/legal/privacidade" className="text-blue-600 hover:text-blue-500">
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
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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