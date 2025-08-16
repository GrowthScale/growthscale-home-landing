import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar páginas
import Index from "@/pages/Index";

const App = () => {
  console.log('App component loaded - testing Index page');
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
