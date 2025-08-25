// src/components/auth/CheckEmailCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface CheckEmailCardProps {
  email: string;
}

export function CheckEmailCard({ email }: CheckEmailCardProps) {
  const handleResendEmail = async () => {
    // Implementar reenvio de email se necessário
    console.log('Reenviando email para:', email);
  };

  const handleBackToSignUp = () => {
    window.location.reload();
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

      {/* Card de Verificação de Email */}
      <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-600">Verifique seu e-mail</CardTitle>
          <CardDescription className="text-base">
            Enviamos um link de confirmação para
          </CardDescription>
          <div className="mt-2">
            <span className="font-semibold text-foreground">{email}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Instruções */}
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Clique no link no seu e-mail para confirmar sua conta e começar a usar o GrowthScale.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Conta criada com sucesso!</span>
            </div>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail}
              variant="outline" 
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reenviar e-mail
            </Button>
            
            <Button 
              onClick={handleBackToSignUp}
              variant="ghost" 
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao cadastro
            </Button>
          </div>

          {/* Dicas */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="font-medium text-blue-900 mb-2">Dicas:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Verifique sua pasta de spam</li>
              <li>• Aguarde alguns minutos</li>
              <li>• Use o mesmo e-mail do cadastro</li>
            </ul>
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
