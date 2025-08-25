// src/pages/Index.tsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';

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
    <>
      <SEOHead 
        title="GrowthScale - Transformando a Gestão Empresarial"
        description="Plataforma inteligente para gestão de escalas, compliance CLT e otimização de recursos humanos. Automatize sua operação e reduza custos."
      />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GS</span>
                </div>
                <span className="text-xl font-bold text-gray-900">GrowthScale</span>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/auth')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Começar Grátis
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transforme sua
              <span className="text-blue-600"> Gestão Empresarial</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plataforma inteligente para gestão de escalas, compliance CLT e otimização de recursos humanos. 
              Automatize sua operação e reduza custos em até 30%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/auth')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Começar Teste Grátis
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Ver Demonstração
              </button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Problemas que Resolvemos
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Elimine os desafios mais comuns da gestão de recursos humanos
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão Manual de Escalas</h3>
                <p className="text-gray-600">
                  Elimine planilhas e processos manuais. Automatize a criação e otimização de escalas.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Não Conformidade CLT</h3>
                <p className="text-gray-600">
                  Evite multas e problemas legais. Garanta conformidade total com a legislação trabalhista.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Custos Elevados</h3>
                <p className="text-gray-600">
                  Reduza custos operacionais em até 30% com otimização inteligente de recursos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nossa Solução
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Uma plataforma completa que revoluciona a gestão de recursos humanos
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  IA Inteligente para Escalas Otimizadas
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Geração automática de escalas com IA</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Otimização de custos e produtividade</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Compliance automático com CLT</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Integração com WhatsApp e sistemas</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🤖</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">IA Avançada</h4>
                  <p className="text-gray-600">
                    Nossa inteligência artificial aprende com seus padrões e otimiza continuamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pronto para Transformar sua Operação?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já otimizaram sua gestão com o GrowthScale
            </p>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Começar Agora - Grátis por 14 dias
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GS</span>
                  </div>
                  <span className="text-xl font-bold">GrowthScale</span>
                </div>
                <p className="text-gray-400">
                  Transformando a gestão empresarial com tecnologia inteligente.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Gestão de Escalas</li>
                  <li>Compliance CLT</li>
                  <li>IA Inteligente</li>
                  <li>Integrações</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Sobre Nós</li>
                  <li>Contato</li>
                  <li>Suporte</li>
                  <li>Blog</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Termos de Uso</li>
                  <li>Privacidade</li>
                  <li>Cookies</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 GrowthScale. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
