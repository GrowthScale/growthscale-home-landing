import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Componente simples para teste
const SimpleIndex = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">GrowthScale</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 GrowthScale
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema de Gestão de Escalas - Funcionando!
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Status do Sistema</h2>
            <ul className="text-left space-y-2">
              <li>✅ React carregado</li>
              <li>✅ Vite funcionando</li>
              <li>✅ TypeScript ativo</li>
              <li>✅ Tailwind CSS ativo</li>
              <li>✅ Deploy funcionando</li>
              <li>✅ React Router ativo</li>
              <li>✅ Contextos fornecidos</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  console.log('App component loaded - with contexts');
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<SimpleIndex />} />
            <Route path="*" element={<SimpleIndex />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
