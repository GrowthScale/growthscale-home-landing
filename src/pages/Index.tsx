import React from 'react';

// Componente Header simplificado para teste
const SimpleHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">GrowthScale</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Recursos</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Preços</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contato</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Simples */}
      <SimpleHeader />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🚀 GrowthScale
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sistema de Gestão de Escalas Inteligente para Food Service. 
            Otimize escalas, reduza custos em até 30% e garanta compliance trabalhista automaticamente.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Começar Agora
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão Inteligente</h3>
              <p className="text-gray-600">IA otimiza escalas automaticamente</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compliance CLT</h3>
              <p className="text-gray-600">Garantia automática de conformidade</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Redução de Custos</h3>
              <p className="text-gray-600">Economia de até 30% em custos operacionais</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Planos e Preços</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-6">R$ 99<span className="text-lg text-gray-600">/mês</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ Até 10 funcionários</li>
                <li>✓ Gestão básica de escalas</li>
                <li>✓ Relatórios simples</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Escolher Plano
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-4xl font-bold mb-6">R$ 199<span className="text-lg text-gray-600">/mês</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ Até 50 funcionários</li>
                <li>✓ IA para otimização</li>
                <li>✓ Compliance CLT</li>
                <li>✓ Relatórios avançados</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Escolher Plano
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-6">R$ 399<span className="text-lg text-gray-600">/mês</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ Funcionários ilimitados</li>
                <li>✓ IA avançada</li>
                <li>✓ Suporte prioritário</li>
                <li>✓ Integrações personalizadas</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Escolher Plano
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
          <p className="text-xl text-gray-600 mb-8">
            Pronto para transformar a gestão da sua equipe?
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Fale Conosco
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 GrowthScale. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
