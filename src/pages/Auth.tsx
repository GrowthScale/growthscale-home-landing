// src/pages/Auth.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Eye, EyeOff, Mail, Lock, User, Building2, MailCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  employeeCount: string;
}

const CheckEmailCard = ({ email }: { email: string }) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {/* Logo e Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg opacity-20 blur-sm"></div>
            <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
          </div>
          <span className="font-bold text-2xl text-foreground">GrowthScale</span>
        </div>
        <p className="text-muted-foreground">
          Gestão inteligente de escalas para food service
        </p>
      </div>

      {/* Card de Verificação */}
      <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="text-center p-8">
          <MailCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Quase lá! Verifique seu e-mail.</h1>
          <p className="text-muted-foreground mb-2">
            Enviamos um link de confirmação para{' '}
            <strong className="text-foreground">{email}</strong>.
          </p>
          <p className="text-muted-foreground mb-6">
            Por favor, clique no link para ativar sua conta.
          </p>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Não recebeu o e-mail? Verifique sua pasta de spam.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Precisa de ajuda?{' '}
          <Link to="/contact" className="text-primary hover:underline">
            Entre em contato
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const [view, setView] = useState<'signIn' | 'signUp'>('signUp');
  const [emailForVerification, setEmailForVerification] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tratamento de erros de URL
  useEffect(() => {
    const urlError = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (urlError) {
      let errorMessage = '';
      
      switch (urlError) {
        case 'invalid_code':
          errorMessage = 'O link de confirmação expirou ou é inválido. Por favor, faça login para acessar sua conta.';
          // Mudar para aba de login quando for erro de código inválido
          setView('signIn');
          break;
        case 'no_code':
          errorMessage = 'Link de confirmação inválido. Tente fazer login para acessar sua conta.';
          setView('signIn');
          break;
        case 'invalid_session':
          errorMessage = 'Sessão inválida. Por favor, faça login novamente.';
          setView('signIn');
          break;
        case 'callback_error':
          errorMessage = 'Erro inesperado durante a confirmação. Tente fazer login novamente.';
          setView('signIn');
          break;
        case 'company_creation_failed':
          errorMessage = 'Erro ao configurar sua empresa. Tente fazer login novamente.';
          setView('signIn');
          break;
        default:
          errorMessage = errorDescription || 'Erro de autenticação. Tente novamente.';
      }

      setError(errorMessage);
      toast({
        title: "Erro de Autenticação",
        description: errorMessage,
        variant: "destructive",
        duration: 8000
      });

      // Limpar a URL dos parâmetros de erro
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, toast]);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    employeeCount: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(loginForm);
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : 'Tente novamente',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validações
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await signUp({
        fullName: registerForm.fullName,
        email: registerForm.email,
        password: registerForm.password,
        companyName: registerForm.companyName,
        employeeCount: registerForm.employeeCount
      });

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar a conta.",
      });

      setEmailForVerification(registerForm.email);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao criar conta');
      toast({
        title: "Erro ao criar conta",
        description: error instanceof Error ? error.message : 'Tente novamente',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailForVerification) {
    return <CheckEmailCard email={emailForVerification} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg opacity-20 blur-sm"></div>
              <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
            </div>
            <span className="font-bold text-2xl text-foreground">GrowthScale</span>
          </div>
          <p className="text-muted-foreground">
            Gestão inteligente de escalas para food service
          </p>
        </div>

        {/* Card Principal */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Acesse sua conta</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={view} onValueChange={(value) => setView(value as 'signIn' | 'signUp')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signIn">Entrar</TabsTrigger>
                <TabsTrigger value="signUp">Criar Conta</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="signIn" className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                    {searchParams.get('error') === 'invalid_code' && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Se você já se cadastrou, pode fazer login diretamente ou solicitar um novo email de confirmação.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (!loginForm.email) {
                              setError('Por favor, insira seu email abaixo e clique novamente para reenviar.');
                              return;
                            }
                            
                            setLoading(true);
                            try {
                              const { error } = await supabase.auth.resend({
                                type: 'signup',
                                email: loginForm.email,
                                options: {
                                  emailRedirectTo: `${window.location.origin}/auth/callback`,
                                }
                              });
                              
                              if (error) throw error;
                              
                              toast({
                                title: "Email reenviado!",
                                description: "Verifique sua caixa de entrada e spam.",
                                duration: 5000
                              });
                              setError(null);
                            } catch (error) {
                              toast({
                                title: "Erro ao reenviar",
                                description: error instanceof Error ? error.message : 'Tente novamente',
                                variant: "destructive"
                              });
                            } finally {
                              setLoading(false);
                            }
                          }}
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Reenviar Email de Confirmação
                        </Button>
                      </div>
                    )}
                  </Alert>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Sua senha"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Entrar
                  </Button>
                </form>

                <div className="text-center">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="signUp" className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-company">Nome da Empresa</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-company"
                        type="text"
                        placeholder="Nome da sua empresa"
                        value={registerForm.companyName}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, companyName: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-employees">Número de Funcionários</Label>
                    <select
                      id="register-employees"
                      value={registerForm.employeeCount}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, employeeCount: e.target.value }))}
                      className="w-full p-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="1-5">1-5 funcionários</option>
                      <option value="6-10">6-10 funcionários</option>
                      <option value="11-25">11-25 funcionários</option>
                      <option value="26-50">26-50 funcionários</option>
                      <option value="50+">50+ funcionários</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mínimo 6 caracteres"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Criar Conta
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <Link to="/legal" className="text-primary hover:underline">
                    Termos de Serviço
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}