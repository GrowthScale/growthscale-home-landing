import { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCallback } from 'react';

// Lazy loading de todas as páginas
const Index = lazy(() => import('@/pages/Index'));
const Auth = lazy(() => import('@/pages/Auth'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Schedules = lazy(() => import('@/pages/Schedules'));
const Employees = lazy(() => import('@/pages/Employees'));
const Companies = lazy(() => import('@/pages/Companies'));
const Settings = lazy(() => import('@/pages/Settings'));
const Profile = lazy(() => import('@/pages/Profile'));
const CLTAssistant = lazy(() => import('@/pages/CLTAssistant'));
const Templates = lazy(() => import('@/pages/Templates'));
const Integrations = lazy(() => import('@/pages/Integrations'));
const Compliance = lazy(() => import('@/pages/Compliance'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Legal = lazy(() => import('@/pages/Legal'));
const Demo = lazy(() => import('@/pages/Demo'));
const Api = lazy(() => import('@/pages/Api'));
const Setup = lazy(() => import('@/pages/Setup'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Componente de loading otimizado
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingScreen />
  </div>
);

// Rotas públicas
const publicRoutes = [
  { path: '/', element: <Index /> },
  { path: '/auth', element: <Auth /> },
  { path: '/demo', element: <Demo /> },
  { path: '/api', element: <Api /> },
  { path: '/contact', element: <Contact /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/legal', element: <Legal /> },
];

// Rotas protegidas
const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard />, roles: ['owner', 'admin', 'manager', 'employee'] },
  { path: '/schedules', element: <Schedules />, roles: ['owner', 'admin', 'manager'] },
  { path: '/employees', element: <Employees />, roles: ['owner', 'admin', 'manager'] },
  { path: '/companies', element: <Companies />, roles: ['owner', 'admin'] },
  { path: '/settings', element: <Settings />, roles: ['owner', 'admin', 'manager'] },
  { path: '/profile', element: <Profile />, roles: ['owner', 'admin', 'manager', 'employee'] },
  { path: '/clt-assistant', element: <CLTAssistant />, roles: ['owner', 'admin', 'manager'] },
  { path: '/templates', element: <Templates />, roles: ['owner', 'admin', 'manager'] },
  { path: '/integrations', element: <Integrations />, roles: ['owner', 'admin'] },
  { path: '/compliance', element: <Compliance />, roles: ['owner', 'admin', 'manager'] },
  { path: '/setup', element: <Setup />, roles: ['owner', 'admin'] },
];

// Componente principal de rotas
export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rotas públicas */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        
        {/* Rotas protegidas */}
        {protectedRoutes.map(({ path, element, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute roles={roles}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

// Hook para navegação programática com lazy loading
export const useLazyNavigation = () => {
  const navigate = useNavigate();
  
  const navigateTo = useCallback((path: string) => {
    // Pré-carregar a página antes de navegar
    const route = [...publicRoutes, ...protectedRoutes].find(r => r.path === path);
    if (route) {
      // Trigger lazy loading
      const component = route.element.type;
      if (component && typeof component === 'function') {
        component();
      }
    }
    navigate(path);
  }, [navigate]);
  
  return { navigateTo };
};

export default AppRoutes;
