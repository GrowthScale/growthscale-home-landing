import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessControl } from '@/hooks/useAccessControl';
import { LazyLoader, 
  LazyDashboard, 
  LazySchedules, 
  LazyEmployees, 
  LazyCompanies, 
  LazySettings, 
  LazyCLTAssistant, 
  LazyTemplates, 
  LazyIntegrations, 
  LazyCompliance, 
  LazySetup } from '@/components/LazyLoader';

// Páginas públicas
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Legal from '@/pages/Legal';
import NotFound from '@/pages/NotFound';
import Demo from '@/pages/Demo';
import Api from '@/pages/Api';
import RBACDemo from '@/pages/RBACDemo';
import Gamification from '@/pages/Gamification';
import DraftReviewPage from '@/pages/DraftReviewPage';
import ScheduleDraft from '@/pages/ScheduleDraft';
import CompanySettings from '@/pages/CompanySettings';

// Componentes de layout
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();
  const { role } = useAccessControl();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Rotas protegidas
  const protectedRoutes = [
    { path: '/dashboard', element: <LazyDashboard />, roles: ['owner', 'admin', 'manager', 'employee'] },
    { path: '/schedules', element: <LazySchedules />, roles: ['owner', 'admin', 'manager'] },
    { path: '/employees', element: <LazyEmployees />, roles: ['owner', 'admin', 'manager'] },
    { path: '/companies', element: <LazyCompanies />, roles: ['owner', 'admin'] },
    { path: '/settings', element: <LazySettings />, roles: ['owner', 'admin', 'manager'] },
    { path: '/profile', element: <LazySettings />, roles: ['owner', 'admin', 'manager', 'employee'] },
    { path: '/clt-assistant', element: <LazyCLTAssistant />, roles: ['owner', 'admin', 'manager'] },
    { path: '/templates', element: <LazyTemplates />, roles: ['owner', 'admin', 'manager'] },
    { path: '/integrations', element: <LazyIntegrations />, roles: ['owner', 'admin'] },
    { path: '/compliance', element: <LazyCompliance />, roles: ['owner', 'admin', 'manager'] },
    { path: '/setup', element: <LazySetup />, roles: ['owner', 'admin'] },
  ];

  return (
    <Router>
      <Routes>
        {/* Rota raiz */}
        <Route path="/" element={<Index />} />

        {/* Rotas públicas */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/api" element={<Api />} />
        <Route path="/rbac-demo" element={<RBACDemo />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/draft-review" element={<DraftReviewPage />} />
        <Route path="/schedule-draft" element={<ScheduleDraft />} />
        <Route path="/company-settings" element={<CompanySettings />} />

        {/* Rotas protegidas */}
        {protectedRoutes.map(({ path, element, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={roles}>
                <LazyLoader>
                  <MainLayout>{element}</MainLayout>
                </LazyLoader>
              </ProtectedRoute>
            }
          />
        ))}

        {/* Redirecionamentos */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />
          }
        />

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
