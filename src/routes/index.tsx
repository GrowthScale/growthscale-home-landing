import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy load pages
const LazyIndex = React.lazy(() => import('@/pages/Index'));
const LazyDashboard = React.lazy(() => import('@/pages/Dashboard'));
const LazySchedules = React.lazy(() => import('@/pages/Schedules'));
const LazyEmployees = React.lazy(() => import('@/pages/Employees'));
const LazyCompanies = React.lazy(() => import('@/pages/Companies'));
const LazyTemplates = React.lazy(() => import('@/pages/Templates'));
const LazySettings = React.lazy(() => import('@/pages/Settings'));
const LazyAuth = React.lazy(() => import('@/pages/Auth'));
const LazyAuthCallback = React.lazy(() => import('@/pages/AuthCallback'));
const LazySetup = React.lazy(() => import('@/pages/Setup'));
const LazyContact = React.lazy(() => import('@/pages/Contact'));
const LazyFAQ = React.lazy(() => import('@/pages/FAQ'));
const LazyLegal = React.lazy(() => import('@/pages/Legal'));
const LazyNotFound = React.lazy(() => import('@/pages/NotFound'));
const LazyCLTAssistant = React.lazy(() => import('@/pages/CLTAssistant'));
const LazyCompliance = React.lazy(() => import('@/pages/Compliance'));
const LazyIntegrations = React.lazy(() => import('@/pages/Integrations'));
const LazyAnalytics = React.lazy(() => import('@/pages/Analytics'));
const LazySecurity = React.lazy(() => import('@/pages/Security'));
const LazyAI = React.lazy(() => import('@/pages/AI'));
const LazyEnterprise = React.lazy(() => import('@/pages/Enterprise'));
const LazyBilling = React.lazy(() => import('@/pages/Billing'));
const LazyBillingPage = React.lazy(() => import('@/pages/BillingPage'));
const LazyOnboarding = React.lazy(() => import('@/pages/Onboarding'));
const LazyForgotPassword = React.lazy(() => import('@/pages/ForgotPassword'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LazyIndex />} />
        <Route path="/auth" element={<LazyAuth />} />
        <Route path="/auth/callback" element={<LazyAuthCallback />} />
        <Route path="/onboarding" element={<LazyOnboarding />} />
        <Route path="/forgot-password" element={<LazyForgotPassword />} />
        <Route path="/contact" element={<LazyContact />} />
        <Route path="/faq" element={<LazyFAQ />} />
        <Route path="/legal" element={<LazyLegal />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<LazyDashboard />} />
          <Route path="schedules" element={<LazySchedules />} />
          <Route path="employees" element={<LazyEmployees />} />
          <Route path="companies" element={<LazyCompanies />} />
          <Route path="templates" element={<LazyTemplates />} />
          <Route path="settings" element={<LazySettings />} />
          <Route path="setup" element={<LazySetup />} />
          <Route path="clt-assistant" element={<LazyCLTAssistant />} />
          <Route path="compliance" element={<LazyCompliance />} />
          <Route path="integrations" element={<LazyIntegrations />} />
          <Route path="analytics" element={<LazyAnalytics />} />
          <Route path="security" element={<LazySecurity />} />
          <Route path="ai" element={<LazyAI />} />
          <Route path="enterprise" element={<LazyEnterprise />} />
          <Route path="billing" element={<LazyBilling />} />
        </Route>

        {/* Billing Route - Protected */}
        <Route path="/billing" element={
          <ProtectedRoute>
            <LazyBillingPage />
          </ProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<LazyNotFound />} />
      </Routes>
    </Suspense>
  );
}
