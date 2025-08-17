import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar apenas a página principal por enquanto
import Index from "@/pages/Index";

const App = () => {
  console.log('App.tsx: SIMPLIFIED VERSION - React loaded:', typeof React);
  
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
