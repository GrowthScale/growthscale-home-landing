// src/pages/Index.tsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Verificar se há código de autenticação na URL
    const code = searchParams.get('code');
    if (code) {
      console.log('🔗 Código de autenticação detectado na página inicial, redirecionando para AuthCallback...');
      console.log('📍 URL atual:', window.location.href);
      console.log('🔑 Código:', code);
      navigate(`/auth/callback?code=${code}`);
      return;
    }

    // Se não há código, verificar se há erro
    const error = searchParams.get('error');
    if (error) {
      console.log('❌ Erro detectado na URL:', error);
      navigate('/auth');
      return;
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Conteúdo da página inicial */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          GrowthScale
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Transformando a gestão empresarial
        </p>
        <div className="text-center">
          <button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
