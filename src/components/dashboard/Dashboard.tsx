import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAccessControl } from '@/hooks/useAccessControl';
import { TrialUpgradeBanner } from '@/components/TrialUpgradeBanner';
import { FeatureGate } from '@/components/FeatureGate';
import { FirstTimeUserCard } from './FirstTimeUserCard';
import { PlanBadge } from '@/components/PlanBadge';
import { UpgradeModal } from '@/components/UpgradeModal';
import { useUpgradeModal } from '@/hooks/useUpgradeModal';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import DashboardHeader from './DashboardHeader';
import KPICard from './KPICard';
import ActivityFeed from './ActivityFeed';
import {
  Users,
  Clock,
  Shield,
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  CheckCircle
} from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { can } = useAccessControl();
  const navigate = useNavigate();
  const { currentTenant: tenant, loading: isLoadingTenant } = useTenant();
  const { user } = useAuth();
  const { 
    isModalOpen, 
    modalTrigger, 
    modalMessage, 
    hideUpgradeModal, 
    checkAndShowUpgrade,
    showUpgradeModal
  } = useUpgradeModal();
  const { isTrialExpired } = useTrialStatus();

  // LÓGICA CRÍTICA: Verificar se o utilizador já configurou a sua empresa
  useEffect(() => {
    // Aguarda o carregamento dos dados essenciais
    if (isLoadingTenant || !user) {
      return;
    }

    // Se o utilizador está logado, já não está a carregar os tenants, e não tem tenant configurado, redirecionar para setup
    if (user && !isLoadingTenant && !tenant) {
      console.log('🚨 Usuário sem empresa configurada - redirecionando para setup');
      navigate('/dashboard/setup', { replace: true });
    }
  }, [user, tenant, isLoadingTenant, navigate]);

  // Detectar trial expirado e mostrar modal
  useEffect(() => {
    if (isTrialExpired && !isModalOpen) {
      showUpgradeModal('trial_expired', 'Seu período de teste de 14 dias expirou!');
    }
  }, [isTrialExpired, isModalOpen, showUpgradeModal]);

  // Buscar rascunho pendente para o card proativo (simplificado)
  const { data: pendingDraft } = useQuery({
    queryKey: ['pendingDraft', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) {return null;}
      // Por enquanto, retornamos null - implementaremos depois
      return null;
    },
    enabled: !!tenant?.id,
    refetchInterval: 30000, // Refetch a cada 30 segundos
  });

  // Verificar se é um usuário novo (primeira vez no dashboard)
  const isFirstTimeUser = tenant?.created_at && 
    new Date(tenant.created_at).getTime() > Date.now() - (24 * 60 * 60 * 1000); // Últimas 24 horas

  const kpiData = [
    {
      title: "Taxa de Rotatividade",
      value: "12%",
      change: "-2.5%",
      changeType: "positive",
      icon: "📈"
    },
    {
      title: "Horas Trabalhadas",
      value: "1,240h",
      change: "+5.2%",
      changeType: "positive",
      icon: "⏰"
    },
    {
      title: "Produtividade",
      value: "94%",
      change: "+1.8%",
      changeType: "positive",
      icon: "🚀"
    },
    {
      title: "Custos",
      value: "R$ 45.2k",
      change: "-3.1%",
      changeType: "positive",
      icon: "💰"
    }
  ];

  // Se ainda está carregando, mostrar loading
  if (isLoadingTenant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não tem tenant, não deveria chegar aqui (seria redirecionado)
  if (!tenant) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Bem-vindo de volta, {user?.user_metadata?.full_name || 'Usuário'}!
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <div className="text-2xl">{kpi.icon}</div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
              <span className="text-sm text-gray-600 ml-1">vs mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Card for New Users */}
      {isFirstTimeUser && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-xl font-bold mb-2">🎉 Bem-vindo ao GrowthScale!</h2>
          <p className="mb-4">
            Sua empresa {tenant.name} foi configurada com sucesso. 
            Agora você pode começar a usar todas as funcionalidades.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/dashboard/employees')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Adicionar Funcionários
            </button>
            <button 
              onClick={() => navigate('/dashboard/schedules')}
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              Criar Primeira Escala
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/dashboard/employees')}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">👥</span>
                <div>
                  <p className="font-medium">Gerenciar Funcionários</p>
                  <p className="text-sm text-gray-600">Adicionar ou editar funcionários</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard/schedules')}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">📅</span>
                <div>
                  <p className="font-medium">Criar Escala</p>
                  <p className="text-sm text-gray-600">Gerar nova escala com IA</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard/compliance')}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                <div>
                  <p className="font-medium">Verificar Compliance</p>
                  <p className="text-sm text-gray-600">Analisar conformidade CLT</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Status da Empresa</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Plano Atual</span>
              <span className="font-medium text-blue-600">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">{tenant.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Membros</span>
              <span className="font-medium">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recursos Recentes</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🤖</span>
              <div>
                <p className="font-medium">IA para Escalas</p>
                <p className="text-sm text-gray-600">Otimização automática</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">📱</span>
              <div>
                <p className="font-medium">App Mobile</p>
                <p className="text-sm text-gray-600">Disponível em breve</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔗</span>
              <div>
                <p className="font-medium">Integrações</p>
                <p className="text-sm text-gray-600">WhatsApp, ERP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;