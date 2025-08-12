import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import LoadingScreen from "@/components/LoadingScreen";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import MainLayout from "@/components/layouts/MainLayout";
import { ROUTES } from "@/constants";
import "@/i18n"; // Initialize i18n

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Schedules = React.lazy(() => import("./pages/Schedules"));
const Employees = React.lazy(() => import("./pages/Employees"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Compliance = React.lazy(() => import("./pages/Compliance"));
const Legal = React.lazy(() => import("./pages/Legal"));
const Contact = React.lazy(() => import("./pages/Contact"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Gamification = React.lazy(() => import("./pages/Gamification"));
const Integrations = React.lazy(() => import("./pages/Integrations"));
const Companies = React.lazy(() => import("./pages/Companies"));
const Setup = React.lazy(() => import("./pages/Setup"));
const CLTAssistant = React.lazy(() => import("./pages/CLTAssistant"));
const Auth = React.lazy(() => import("./pages/Auth"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Templates = React.lazy(() => import("./pages/Templates"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TenantProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Skip to main content link for screen readers */}
              <a href="#main-content" className="skip-to-content">
                Pular para o conteúdo principal
              </a>
              <Suspense fallback={<LoadingScreen message="Carregando aplicação..." />}>
                <Routes>
                  <Route path={ROUTES.HOME} element={<Index />} />
                  <Route path={ROUTES.LOGIN} element={<Auth />} />
                  <Route path={ROUTES.DASHBOARD} element={
                    <ProtectedRoute requiredPermission="view:full_dashboard">
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.SCHEDULES} element={
                    <ProtectedRoute requiredPermission="manage:schedules">
                      <MainLayout>
                        <Schedules />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.EMPLOYEES} element={
                    <ProtectedRoute requiredPermission="manage:users">
                      <MainLayout>
                        <Employees />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.COMPLIANCE} element={
                    <ProtectedRoute requiredPermission="view:compliance">
                      <MainLayout>
                        <Compliance />
                    </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.SETTINGS} element={
                    <ProtectedRoute requiredPermission="manage:settings">
                      <MainLayout>
                        <Settings />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.LEGAL.PRIVACY} element={<Legal />} />
                  <Route path={ROUTES.LEGAL.TERMS} element={<Legal />} />
                  <Route path={ROUTES.LEGAL.COOKIES} element={<Legal />} />
                  <Route path={ROUTES.LEGAL.HELP} element={<Legal />} />
                  <Route path={ROUTES.CONTACT} element={<Contact />} />
                  <Route path={ROUTES.FAQ} element={<FAQ />} />
                  <Route path="/gamificacao" element={<Gamification />} />
                  <Route path="/integracoes" element={
                    <ProtectedRoute requiredPermission="manage:integrations">
                      <MainLayout>
                        <Integrations />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/assistente-clt" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CLTAssistant />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.COMPANIES} element={
                    <ProtectedRoute requiredPermission="manage:companies">
                      <MainLayout>
                        <Companies />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path={ROUTES.SETUP} element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Setup />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/templates" element={
                    <ProtectedRoute requiredPermission="manage:schedules">
                      <MainLayout>
                        <Templates />
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              {/* PWA Install Prompt */}
              <PWAInstallPrompt />
            </BrowserRouter>
          </TooltipProvider>
        </TenantProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
