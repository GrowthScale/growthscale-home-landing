// src/pages/Auth.tsx
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { CheckEmailCard } from '@/components/auth/CheckEmailCard';
import { SEOHead } from '@/components/SEOHead';

export default function AuthPage() {
  const [view, setView] = useState<'signIn' | 'signUp'>('signUp');
  const [emailForVerification, setEmailForVerification] = useState<string | null>(null);

  const handleShowCheckEmail = (email: string) => {
    setEmailForVerification(email);
  };

  const renderView = () => {
    if (emailForVerification) {
      return <CheckEmailCard email={emailForVerification} />;
    }
    switch (view) {
      case 'signIn':
        return <LoginForm onSwitchView={() => setView('signUp')} />;
      case 'signUp':
      default:
        return <RegisterForm onSwitchView={() => setView('signIn')} onSignUpSuccess={handleShowCheckEmail} />;
    }
  };

  return (
    <>
      <SEOHead 
        title="Autenticação - GrowthScale"
        description="Faça login ou cadastre-se no GrowthScale"
      />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
        {renderView()}
      </div>
    </>
  );
}
