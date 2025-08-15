import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Páginas básicas
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
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
          <li>✅ Roteamento funcionando</li>
        </ul>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
