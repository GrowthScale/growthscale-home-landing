import React from 'react';
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Funcional */}
      <Header />

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
      <section id="recursos" className="py-20 bg-white">
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

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Importe Dados</h3>
              <p className="text-gray-600">Conecte com seu sistema atual ou importe planilhas</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Defina Regras</h3>
              <p className="text-gray-600">Configure horários, turnos e regras da CLT</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Gere e Publique</h3>
              <p className="text-gray-600">IA cria escalas otimizadas automaticamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Planos e Preços</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
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
            <div className="bg-white p-8 rounded-lg shadow-lg border">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Dizem Nossos Clientes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-semibold">João Silva</h4>
                  <p className="text-gray-600">Restaurante XYZ</p>
                </div>
              </div>
              <p className="text-gray-700">"Reduzimos nossos custos em 25% e eliminamos completamente os problemas trabalhistas. O GrowthScale é essencial para nosso negócio."</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold">Maria Santos</h4>
                  <p className="text-gray-600">Bar & Grill ABC</p>
                </div>
              </div>
              <p className="text-gray-700">"A IA realmente entende nossas necessidades. As escalas ficaram muito mais eficientes e nossa equipe está mais satisfeita."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
          <p className="text-xl text-gray-600 mb-8">
            Pronto para transformar a gestão da sua equipe?
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Fale Conosco
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Agendar Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold">GrowthScale</span>
              </div>
              <p className="text-gray-400">Transformando a gestão de escalas com IA.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Recursos</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GrowthScale. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
