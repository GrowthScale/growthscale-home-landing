import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('main.tsx: Starting application...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found!');
}

console.log('main.tsx: Root element found, rendering App...');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('main.tsx: App rendered successfully');
