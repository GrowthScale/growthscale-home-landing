// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, Building, Users, ArrowRight, ArrowLeft } from 'lucide-react';

interface RegisterFormProps {
  onSwitchView: () => void;
  onSignUpSuccess: (email: string) => void;
}

interface RegisterFormData {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  employeeCount: number;
}

export function RegisterForm({ onSwitchView, onSignUpSuccess }: RegisterFormProps) {
  const { signUp } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    employeeCount: 10
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signUp(formData);
      onSignUpSuccess(formData.email);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4">
          <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">GrowthScale</h1>
        <p className="text-muted-foreground">Gestão inteligente de escalas</p>
      </div>

      {/* Card de Cadastro */}
      <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Criar Conta</CardTitle>
          <CardDescription>
            Comece sua jornada de gestão inteligente
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Alertas */}
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Nome da sua empresa"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeCount">Número de Funcionários</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="employeeCount"
                  type="number"
                  min="1"
                  max="1000"
                  placeholder="Quantos funcionários?"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', parseInt(e.target.value) || 1)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar Conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Alternar para Login */}
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={onSwitchView}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Já tem uma conta? Faça login
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p>© 2024 GrowthScale. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
