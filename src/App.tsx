// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { MainLayout } from '@/components/layouts/MainLayout'; // O nosso novo layout principal
import { ProtectedRoute } from '@/components/ProtectedRoute'; // O nosso guarda
import { Toaster } from "@/components/ui/toaster";

// Páginas Públicas
const Index = lazy(() => import("@/pages/Index"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Legal = lazy(() => import("@/pages/Legal"));

// Páginas Protegidas
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Schedules = lazy(() => import("@/pages/Schedules"));
const Employees = lazy(() => import("@/pages/Employees"));
const Companies = lazy(() => import("@/pages/Companies"));
const Templates = lazy(() => import("@/pages/Templates"));
const Settings = lazy(() => import("@/pages/Settings"));
const Setup = lazy(() => import("@/pages/Setup"));
const CLTAssistant = lazy(() => import("@/pages/CLTAssistant"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Security = lazy(() => import("@/pages/Security"));
const AI = lazy(() => import("@/pages/AI"));
const Enterprise = lazy(() => import("@/pages/Enterprise"));
const Billing = lazy(() => import("@/pages/Billing"));
const BillingPage = lazy(() => import("@/pages/BillingPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/legal" element={<Legal />} />

        {/* Rotas Protegidas que usam o MainLayout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/schedules" element={<Schedules />} />
          <Route path="/dashboard/employees" element={<Employees />} />
          <Route path="/dashboard/companies" element={<Companies />} />
          <Route path="/dashboard/templates" element={<Templates />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/clt-assistant" element={<CLTAssistant />} />
          <Route path="/dashboard/compliance" element={<Compliance />} />
          <Route path="/dashboard/integrations" element={<Integrations />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/security" element={<Security />} />
          <Route path="/dashboard/ai" element={<AI />} />
          <Route path="/dashboard/enterprise" element={<Enterprise />} />
          <Route path="/dashboard/billing" element={<Billing />} />
        </Route>
        
        {/* Rota de Onboarding, que é protegida mas não usa o layout principal */}
        <Route path="/dashboard/setup" element={<ProtectedRoute><Setup /></ProtectedRoute>} />

        {/* Rota de Billing - Protegida mas sem MainLayout */}
        <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Suspense>
  );
}
