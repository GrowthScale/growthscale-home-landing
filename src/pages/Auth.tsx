import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useNotifications } from '@/hooks/useNotifications'
import { validateEmail, sanitizeInput, createRateLimiter } from '@/lib/utils';
import { ROUTES } from '@/constants';
import { useTranslation } from 'react-i18next';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Shield,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Building,
  Users
} from 'lucide-react';

// Helper function to safely extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }
  return 'Unknown error occurred';
};

const Auth = () => {
  const { t } = useTranslation();
  const { trackEvent, trackUserAction } = useAnalytics();
  const { showSuccess, showError } = useNotifications();
  
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
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [employeeCount, setEmployeeCount] = useState<number>(0)
  const [rememberMe, setRememberMe] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Rate limiting for security
  const rateLimiter = createRateLimiter(5, 60000); // 5 attempts per minute

  const { signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedFullName = sanitizeInput(fullName);
    const sanitizedCompanyName = sanitizeInput(companyName);
    const sanitizedCompanyEmail = sanitizeInput(companyEmail);

    if (!sanitizedEmail) {
      newErrors.email = t('errors.required')
    } else if (!validateEmail(sanitizedEmail)) {
      newErrors.email = t('errors.invalidEmail')
    }

    if (!isLogin && !sanitizedFullName.trim()) {
      newErrors.fullName = t('auth.fullNameRequired')
    }

    // Validações específicas para cadastro B2B
    if (!isLogin) {
      if (!sanitizedCompanyName.trim()) {
        newErrors.companyName = 'Nome da empresa é obrigatório'
      }

      if (!sanitizedCompanyEmail.trim()) {
        newErrors.companyEmail = 'Email corporativo é obrigatório'
      } else if (!validateEmail(sanitizedCompanyEmail)) {
        newErrors.companyEmail = 'Email corporativo inválido'
      }

      if (!employeeCount || employeeCount <= 0) {
        newErrors.employeeCount = 'Número de funcionários é obrigatório'
      } else if (employeeCount > 1000) {
        newErrors.employeeCount = 'Número de funcionários deve ser menor que 1000'
      }
    }

    if (!password) {
      newErrors.password = t('auth.passwordRequired')
    } else if (!isLogin && password.length < 6) {
      newErrors.password = t('auth.passwordTooShort')
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsDoNotMatch')
    }

    if (!isLogin && !acceptTerms) {
      newErrors.acceptTerms = t('auth.acceptTermsRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    // Rate limiting check
    const clientId = email || 'anonymous';
    if (!rateLimiter(clientId)) {
      showError(
        t('errors.tooManyAttempts'),
        t('errors.tooManyAttempts')
      );
      trackEvent('auth_rate_limit_exceeded', { email });
      return;
    }

    setLoading(true)

    try {
      if (isLogin) {
        trackUserAction('login_attempt', { email });
        const { error } = await signIn(email, password)
        if (error) {
          const errorMessage = getErrorMessage(error);
          showError(
            t('auth.loginError'),
            errorMessage === 'Invalid login credentials' 
              ? t('auth.loginError') 
              : errorMessage
          );
          trackEvent('auth_login_failed', { email, error: errorMessage });
        } else {
          showSuccess(
            t('auth.loginSuccess'),
            t('auth.welcomeBack')
          );
          trackEvent('auth_login_success', { email });
          navigate(from, { replace: true })
        }
      } else {
        trackUserAction('register_attempt', { email, companyName, employeeCount });
        const { error } = await signUp(email, password, fullName, companyName, companyEmail, employeeCount)
        if (error) {
          const errorMessage = getErrorMessage(error);
          showError(
            t('auth.registerError'),
            errorMessage
          );
          trackEvent('auth_register_failed', { email, error: errorMessage });
        } else {
          showSuccess(
            'Conta criada com sucesso!',
            'Verifique seu email para confirmar o cadastro e começar a usar o GrowthScale.'
          );
          trackEvent('auth_register_success', { email, companyName, employeeCount });
          setIsLogin(true)
        }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(
        t('errors.unknownError'),
        t('errors.unknownError')
      );
      trackEvent('auth_unexpected_error', { email, error: errorMessage });
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErrors({ email: t('auth.emailRequiredForReset') })
      return
    }

    if (!validateEmail(email)) {
      setErrors({ email: t('errors.invalidEmail') });
      return;
    }

    setLoading(true)

    try {
      trackUserAction('password_reset_attempt', { email });
      const { error } = await resetPassword(email)
      if (error) {
        const errorMessage = getErrorMessage(error);
        showError(
          t('auth.passwordResetError'),
          errorMessage
        );
        trackEvent('auth_password_reset_failed', { email, error: errorMessage });
      } else {
        showSuccess(
          t('auth.passwordResetSent'),
          t('auth.checkEmailForReset')
        );
        trackEvent('auth_password_reset_success', { email });
        setShowResetForm(false)
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(
        t('errors.unknownError'),
        t('errors.unknownError')
      );
      trackEvent('auth_password_reset_error', { email, error: errorMessage });
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFullName('')
    setCompanyName('')
    setCompanyEmail('')
    setEmployeeCount(0)
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
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4" role="main" aria-label="Página de recuperação de senha">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-spacing-lg">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-spacing-sm"
              aria-label="Voltar para a página inicial"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              <span className="text-2xl font-bold">GrowthScale</span>
            </Link>
          </div>

          <Card className="shadow-elegant border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                {t('auth.resetPassword')}
              </CardTitle>
              <CardDescription>
                {t('auth.resetPasswordDescription')}
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
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>{t('auth.loading')}</span>
                    </div>
                  ) : (
                    t('auth.resetPassword')
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
              {isLogin ? t('auth.loginTitle') : "Crie o Ambiente da Sua Empresa"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? t('auth.loginDescription') 
                : "Comece a transformar sua gestão. Seu primeiro passo para a tranquilidade."
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('auth.fullName')} *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t('auth.fullNamePlaceholder')}
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

              {/* Campos da Empresa - Apenas no cadastro */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Nome do seu restaurante ou bar"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="pl-10"
                        autoComplete="organization"
                      />
                    </div>
                    {errors.companyName && (
                      <Alert variant="destructive" className="py-2">
                        <AlertDescription className="text-sm">{errors.companyName}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email Corporativo *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyEmail"
                        name="companyEmail"
                        type="email"
                        placeholder="Email de contato da empresa"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className="pl-10"
                        autoComplete="email"
                      />
                    </div>
                    {errors.companyEmail && (
                      <Alert variant="destructive" className="py-2">
                        <AlertDescription className="text-sm">{errors.companyEmail}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Número de Funcionários *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employeeCount"
                        name="employeeCount"
                        type="number"
                        placeholder="Ex: 12"
                        value={employeeCount || ''}
                        onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
                        className="pl-10"
                        min="1"
                        max="1000"
                      />
                    </div>
                    {errors.employeeCount && (
                      <Alert variant="destructive" className="py-2">
                        <AlertDescription className="text-sm">{errors.employeeCount}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')} *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
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
                <Label htmlFor="password">{t('auth.password')} *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? t('auth.passwordPlaceholder') : t('auth.passwordMinLength')}
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
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
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
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')} *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t('auth.confirmPasswordPlaceholder')}
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
                      aria-label={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
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
                      {t('auth.rememberMe')}
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResetForm(true)}
                    className="text-primary hover:text-primary/80 p-0 h-auto"
                  >
                    {t('auth.forgotPassword')}
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
                      {t('auth.acceptTerms')}{' '}
                      <Link to={ROUTES.LEGAL.TERMS} className="text-primary hover:underline">
                        {t('navigation.terms')}
                      </Link>{' '}
                      {t('common.and')}{' '}
                      <Link to={ROUTES.LEGAL.PRIVACY} className="text-primary hover:underline">
                        {t('navigation.privacy')}
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
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>{t('auth.loading')}</span>
                  </div>
                ) : (
                  <>
                    {isLogin ? (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        {t('auth.login')}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Criar Conta Empresarial
                      </>
                    )}
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              {isLogin ? t('auth.newToGrowthScale') : t('auth.alreadyHaveAccount')}
            </div>
            <Button
              variant="outline"
              onClick={switchMode}
              className="w-full"
              disabled={loading}
            >
              {isLogin ? 'Criar Conta Empresarial' : t('auth.login')}
            </Button>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/80">
          <div className="flex justify-center space-x-4">
            <Link to={ROUTES.LEGAL.TERMS} className="hover:text-white transition-colors">
              {t('navigation.terms')}
            </Link>
            <Link to={ROUTES.LEGAL.PRIVACY} className="hover:text-white transition-colors">
              {t('navigation.privacy')}
            </Link>
            <Link to={ROUTES.LEGAL.HELP} className="hover:text-white transition-colors">
              {t('navigation.help')}
            </Link>
          </div>
          <div className="mt-2">
            © 2024 GrowthScale. {t('common.allRightsReserved')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth