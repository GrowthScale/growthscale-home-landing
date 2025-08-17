import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Importar páginas
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Companies from "@/pages/Companies";
import Employees from "@/pages/Employees";
import Schedules from "@/pages/Schedules";
import Templates from "@/pages/Templates";
import CLTAssistant from "@/pages/CLTAssistant";
import Settings from "@/pages/Settings";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";

// Componente de fallback para erros
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen bg-red-50 flex items-center justify-center">
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-800 mb-4">Erro de Carregamento</h1>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Recarregar Página
      </button>
    </div>
  </div>
);

// Componente de loading
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Carregando GrowthScale...</p>
    </div>
  </div>
);

const App = () => {
  console.log('App component loaded - FULL INTEGRATION');
  
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/clt-assistant" element={<CLTAssistant />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
