import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTenant } from '@/contexts/TenantContext'
import { LoadingSpinner } from '@/components/ui/loading'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const { tenants, loading: isLoadingTenants } = useTenant()
  const location = useLocation()
  const navigate = useNavigate()

  // Verificação de setup de empresa
  useEffect(() => {
    // Espera o carregamento do usuário e dos tenants
    if (isLoadingTenants || !user) {
      return;
    }

    // Se o usuário está logado e a lista de tenants está vazia, redireciona para setup
    // Mas apenas se não estiver já na página de setup para evitar redirecionamento infinito
    if (user && !isLoadingTenants && tenants.length === 0 && location.pathname !== ROUTES.SETUP) {
      navigate(ROUTES.SETUP);
    }
  }, [user, tenants, isLoadingTenants, navigate, location.pathname]);

  if (loading || isLoadingTenants) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Verificando autenticação..." />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute