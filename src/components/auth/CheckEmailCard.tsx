// src/components/auth/CheckEmailCard.tsx
import React from 'react';
import { MailCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CheckEmailCardProps {
  email: string;
}

export function CheckEmailCard({ email }: CheckEmailCardProps) {
  return (
    <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="text-center">
            <MailCheck className="mx-auto h-12 w-12 text-green-500" />
            <CardTitle className="text-2xl font-bold mt-4">Quase lá! Verifique seu e-mail.</CardTitle>
            <CardDescription>
                Enviamos um link de confirmação mágico para <strong className="text-foreground">{email}</strong>.
            </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground">
                Por favor, clique no link para ativar sua conta e começar a usar o GrowthScale.
            </p>
            <p className="text-sm text-muted-foreground mt-6">
                Não recebeu? Verifique sua caixa de spam ou aguarde alguns minutos.
            </p>
        </CardContent>
    </Card>
  );
}
