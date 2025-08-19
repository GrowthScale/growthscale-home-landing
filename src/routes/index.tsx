import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MainLayout } from '@/components/layouts/MainLayout';
import PageLayout from '@/components/PageLayout';

// Lazy loading para todas as páginas
const LazyIndex = React.lazy(() => import('@/pages/Index'));
const LazyDashboard = React.lazy(() => import('@/pages/Dashboard'));
const LazySchedules = React.lazy(() => import('@/pages/Schedules'));
const LazyEmployees = React.lazy(() => import('@/pages/Employees'));
const LazyCompanies = React.lazy(() => import('@/pages/Companies'));
const LazySettings = React.lazy(() => import('@/pages/Settings'));
const LazyCLTAssistant = React.lazy(() => import('@/pages/CLTAssistant'));
const LazyTemplates = React.lazy(() => import('@/pages/Templates'));
const LazyIntegrations = React.lazy(() => import('@/pages/Integrations'));
const LazyCompliance = React.lazy(() => import('@/pages/Compliance'));
const LazySetup = React.lazy(() => import('@/pages/Setup'));
const LazyAnalytics = React.lazy(() => import('@/pages/Analytics'));
const LazySecurity = React.lazy(() => import('@/pages/Security'));
const LazyMonitoring = React.lazy(() => import('@/pages/Monitoring'));
const LazyContact = React.lazy(() => import('@/pages/Contact'));
const LazyFAQ = React.lazy(() => import('@/pages/FAQ'));
const LazyLegal = React.lazy(() => import('@/pages/Legal'));
const LazyNotFound = React.lazy(() => import('@/pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<LazyIndex />} />

        {/* Rotas protegidas com layout principal */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedules"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazySchedules />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyEmployees />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyCompanies />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazySettings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/clt-assistant"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyCLTAssistant />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyTemplates />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/integrations"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyIntegrations />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyCompliance />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazySetup />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyAnalytics />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/security"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazySecurity />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/monitoring"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LazyMonitoring />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Rotas públicas com layout de página */}
        <Route
          path="/contact"
          element={
            <PageLayout>
              <LazyContact />
            </PageLayout>
          }
        />

        <Route
          path="/faq"
          element={
            <PageLayout>
              <LazyFAQ />
            </PageLayout>
          }
        />

        <Route
          path="/legal"
          element={
            <PageLayout>
              <LazyLegal />
            </PageLayout>
          }
        />

        {/* Rota 404 */}
        <Route
          path="*"
          element={
            <PageLayout>
              <LazyNotFound />
            </PageLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}
