import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Página principal (carregada imediatamente)
import Index from "@/pages/Index";

// Páginas com lazy loading (carregadas sob demanda)
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Companies = lazy(() => import("@/pages/Companies"));
const Employees = lazy(() => import("@/pages/Employees"));
const Schedules = lazy(() => import("@/pages/Schedules"));
const Templates = lazy(() => import("@/pages/Templates"));
const CLTAssistant = lazy(() => import("@/pages/CLTAssistant"));
const Settings = lazy(() => import("@/pages/Settings"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Componente de loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  console.log('App.tsx: LAZY LOADING IMPLEMENTED - React loaded:', typeof React);
  
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="/companies" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Companies />
                </Suspense>
              } />
              <Route path="/employees" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Employees />
                </Suspense>
              } />
              <Route path="/schedules" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Schedules />
                </Suspense>
              } />
              <Route path="/templates" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Templates />
                </Suspense>
              } />
              <Route path="/clt-assistant" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CLTAssistant />
                </Suspense>
              } />
              <Route path="/settings" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Settings />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Contact />
                </Suspense>
              } />
              <Route path="/faq" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <FAQ />
                </Suspense>
              } />
              <Route path="/legal" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Legal />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
