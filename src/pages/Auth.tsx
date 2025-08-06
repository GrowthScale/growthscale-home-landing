import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Shield, CheckCircle } from 'lucide-react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showResetForm, setShowResetForm] = useState(false)

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const from = location.state?.from?.pathname || '/dashboard'

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório'
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (!isLogin && password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    if (!isLogin && !acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          toast({
            variant: "destructive",
            title: "Erro no login",
            description: error.message === 'Invalid login credentials' 
              ? 'Email ou senha incorretos' 
              : error.message
          })
        } else {
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta!"
          })
          navigate(from, { replace: true })
        }
      } else {
        const { error } = await signUp(email, password, fullName)
        if (error) {
          toast({
            variant: "destructive",
            title: "Erro no cadastro",
            description: error.message
          })
        } else {
          toast({
            title: "Cadastro realizado com sucesso!",
            description: "Verifique seu email para confirmar sua conta."
          })
          setIsLogin(true)
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes."
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErrors({ email: 'Email é obrigatório para recuperação de senha' })
      return
    }

    setLoading(true)

    try {
      const { error } = await resetPassword(email)
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro na recuperação",
          description: error.message
        })
      } else {
        toast({
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada para redefinir sua senha."
        })
        setShowResetForm(false)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes."
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFullName('')
    setRememberMe(false)
    setAcceptTerms(false)
    setErrors({})
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  if (showResetForm) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-2xl font-bold">GrowthScale</span>
            </Link>
          </div>

          <Card className="shadow-elegant border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Recuperar Senha
              </CardTitle>
              <CardDescription>
                Digite seu email para receber instruções de recuperação
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Enviar Email de Recuperação'
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setShowResetForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Voltar ao login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-2xl font-bold">GrowthScale</span>
          </Link>
        </div>

        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? 'Faça seu Login' : 'Criar Conta'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Acesse sua conta para continuar' 
                : 'Comece sua jornada conosco hoje mesmo'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="João Silva"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      autoComplete="name"
                    />
                  </div>
                  {errors.fullName && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">{errors.fullName}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Sua senha" : "Mínimo 6 caracteres"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">{errors.confirmPassword}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Lembrar-me
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResetForm(true)}
                    className="text-primary hover:text-primary/80 p-0 h-auto"
                  >
                    Esqueceu a senha?
                  </Button>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal cursor-pointer leading-5"
                    >
                      Aceito os{' '}
                      <Link to="/termos-de-uso" className="text-primary hover:underline">
                        Termos de Uso
                      </Link>{' '}
                      e{' '}
                      <Link to="/politica-de-privacidade" className="text-primary hover:underline">
                        Política de Privacidade
                      </Link>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">{errors.acceptTerms}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    {isLogin ? (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Entrar
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Criar Conta
                      </>
                    )}
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              {isLogin ? 'Novo na GrowthScale?' : 'Já possui uma conta?'}
            </div>
            <Button
              variant="outline"
              onClick={switchMode}
              className="w-full"
              disabled={loading}
            >
              {isLogin ? 'Cadastre-se' : 'Fazer Login'}
            </Button>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/80">
          <div className="flex justify-center space-x-4">
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link to="/central-de-ajuda" className="hover:text-white transition-colors">
              Suporte
            </Link>
          </div>
          <div className="mt-2">
            © 2024 GrowthScale. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth