import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Importar apenas a página principal por enquanto
import Index from "@/pages/Index";

const App = () => {
  console.log('App.tsx: AUTH PROVIDER RESTORED - React loaded:', typeof React);
  
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<Index />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
