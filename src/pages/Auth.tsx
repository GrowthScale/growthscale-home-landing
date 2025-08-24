// src/pages/Auth.tsx
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm'; // Supondo que você tem esses componentes
import { RegisterForm } from '@/components/auth/RegisterForm';
import { CheckEmailCard } from '@/components/auth/CheckEmailCard';

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
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      {renderView()}
    </div>
  );
}