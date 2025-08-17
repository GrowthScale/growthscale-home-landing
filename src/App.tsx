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

const App = () => {
  console.log('App.tsx: FULL FRONTEND RESTORED');
  
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
