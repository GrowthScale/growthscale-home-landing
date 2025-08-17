import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { MainLayout } from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

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

// Páginas adicionais importantes
const Auth = lazy(() => import("@/pages/Auth"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const Gamification = lazy(() => import("@/pages/Gamification"));
const CompanySettings = lazy(() => import("@/pages/CompanySettings"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const DraftReviewPage = lazy(() => import("@/pages/DraftReviewPage"));
const RBACDemo = lazy(() => import("@/pages/RBACDemo"));
const ScheduleDraft = lazy(() => import("@/pages/ScheduleDraft"));
const Demo = lazy(() => import("@/pages/Demo"));
const Api = lazy(() => import("@/pages/Api"));
const Setup = lazy(() => import("@/pages/Setup"));

// Componente de loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  console.log('App.tsx: ROTEAMENTO ORGANIZADO - Rotas públicas e protegidas separadas');
  
  return (
    <div className="App">
      <Routes>
        {/* ========================================
           ROTAS PÚBLICAS - Sem autenticação
           ======================================== */}
        
        {/* Landing Page */}
        <Route path="/" element={<Index />} />
        
        {/* Páginas públicas */}
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
        
        {/* Autenticação */}
        <Route path="/auth" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Auth />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Auth />
          </Suspense>
        } />

        {/* ========================================
           ROTAS PROTEGIDAS - Com autenticação e sidebar
           ======================================== */}
        
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          {/* Dashboard e páginas principais */}
          <Route path="/dashboard" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          } />
          
          {/* Gestão de Empresas */}
          <Route path="/companies" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Companies />
            </Suspense>
          } />
          <Route path="/company-settings" element={
            <Suspense fallback={<LoadingSpinner />}>
              <CompanySettings />
            </Suspense>
          } />
          
          {/* Gestão de Funcionários */}
          <Route path="/employees" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Employees />
            </Suspense>
          } />
          
          {/* Gestão de Escalas */}
          <Route path="/schedules" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Schedules />
            </Suspense>
          } />
          <Route path="/schedule-draft" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ScheduleDraft />
            </Suspense>
          } />
          <Route path="/draft-review" element={
            <Suspense fallback={<LoadingSpinner />}>
              <DraftReviewPage />
            </Suspense>
          } />
          
          {/* Templates e Configurações */}
          <Route path="/templates" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Templates />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          } />
          
          {/* Ferramentas e Integrações */}
          <Route path="/clt-assistant" element={
            <Suspense fallback={<LoadingSpinner />}>
              <CLTAssistant />
            </Suspense>
          } />
          <Route path="/integrations" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Integrations />
            </Suspense>
          } />
          
          {/* Compliance e Gamificação */}
          <Route path="/compliance" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Compliance />
            </Suspense>
          } />
          <Route path="/gamification" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Gamification />
            </Suspense>
          } />
          
          {/* Setup e Configuração Inicial */}
          <Route path="/setup" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Setup />
            </Suspense>
          } />
          
          {/* Demonstrações e API */}
          <Route path="/demo" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Demo />
            </Suspense>
          } />
          <Route path="/api" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Api />
            </Suspense>
          } />
          <Route path="/rbac-demo" element={
            <Suspense fallback={<LoadingSpinner />}>
              <RBACDemo />
            </Suspense>
          } />
        </Route>

        {/* ========================================
           ROTA 404 - Página não encontrada
           ======================================== */}
        <Route path="*" element={
          <Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
      
      {/* Toaster para notificações */}
      <Toaster />
    </div>
  );
};

export default App;
