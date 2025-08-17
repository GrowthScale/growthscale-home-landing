import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import App from './App.tsx';
import './index.css';

console.log('main.tsx: Starting application...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found!');
}

console.log('main.tsx: Root element found, rendering App...');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);

console.log('main.tsx: App rendered successfully');
