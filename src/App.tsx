import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Importar páginas essenciais
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";

const App = () => {
  console.log('App.tsx: DASHBOARD & EMPLOYEES RESTORED - React loaded:', typeof React);
  
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="*" element={<Index />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
