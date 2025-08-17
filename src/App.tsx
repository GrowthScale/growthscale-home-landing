import React from 'react';

const App = () => {
  console.log('App.tsx: Component loaded');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 GrowthScale
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sistema de Gestão de Escalas Inteligente
        </p>
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-semibold">✅ React carregado com sucesso!</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 font-semibold">✅ Vite funcionando!</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-purple-800 font-semibold">✅ TypeScript ativo!</p>
          </div>
        </div>
        <button 
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={() => alert('Frontend funcionando!')}
        >
          Testar Interação
        </button>
      </div>
    </div>
  );
};

export default App;
