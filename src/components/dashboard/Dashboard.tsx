import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAccessControl } from '@/hooks/useAccessControl';
import { TrialUpgradeBanner } from '@/components/TrialUpgradeBanner';
import { FeatureGate } from '@/components/FeatureGate';
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
  Button
} from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { can } = useAccessControl();
  const navigate = useNavigate();
  const { currentTenant: tenant, loading: isLoadingTenant } = useTenant();
  const { user } = useAuth();

  // LÓGICA CRÍTICA: Verificar se o utilizador já configurou a sua empresa
  useEffect(() => {
    // Aguarda o carregamento dos dados essenciais
    if (isLoadingTenant || !user) {
      return;
    }

    // Se o utilizador está logado, já não está a carregar os tenants, e não tem tenant configurado, força o redirecionamento
    if (user && !isLoadingTenant && !tenant) {
      console.log('🚨 Usuário sem empresa configurada - redirecionando para setup');
      navigate('/setup', { replace: true });
    }
  }, [user, tenant, isLoadingTenant, navigate]);

  // Buscar rascunho pendente para o card proativo (simplificado)
  const { data: pendingDraft, isLoading: isLoadingDraft } = useQuery({
    queryKey: ['pendingDraft', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) {return null;}
      // Por enquanto, retornamos null - implementaremos depois
      return null;
    },
    enabled: !!tenant?.id,
    refetchInterval: 30000, // Refetch a cada 30 segundos
  });
  const kpiData = [
    {
      title: "Taxa de Rotatividade",
      value: "8.5%",
      description: "↓ 2.3% vs mês anterior",
      icon: Users,
      trend: "down" as const,
      status: "good" as const
    },
    {
      title: "Previsão de Ausências",
      value: "12",
      description: "Para próxima semana",
      icon: Clock,
      trend: "up" as const,
      status: "warning" as const
    },
    {
      title: "Compliance Score",
      value: "98%",
      description: "↑ 5% vs mês anterior",
      icon: Shield,
      trend: "up" as const,
      status: "good" as const
    },
    {
      title: "Economia Realizada",
      value: "R$ 12.5k",
      description: "Este mês",
      icon: DollarSign,
      trend: "up" as const,
      status: "good" as const
    },
    {
      title: "Produtividade",
      value: "87%",
      description: "Média da equipe",
      icon: TrendingUp,
      trend: "up" as const,
      status: "good" as const
    },
    {
      title: "Escalas Ativas",
      value: "24",
      description: "Nesta semana",
      icon: Calendar,
      trend: "neutral" as const,
      status: "good" as const
    }
  ];

  if (isLoadingTenant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trial Upgrade Banner */}
      <TrialUpgradeBanner className="mb-6" />

      {/* Dashboard Header */}
      <DashboardHeader />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                onClick={() => navigate('/schedules')}
              >
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Nova Escala</span>
              </button>
              <button 
                className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                onClick={() => navigate('/employees')}
              >
                <Users className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Adicionar Funcionário</span>
              </button>
              <button 
                className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                onClick={() => navigate('/analytics')}
              >
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Ver Relatórios</span>
              </button>
              <button 
                className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                onClick={() => navigate('/settings')}
              >
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Configurações</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Feature Gates - Demonstrando funcionalidades premium */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureGate feature="ai_suggestions">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Sugestões de IA</h3>
                <p className="text-sm text-muted-foreground">Otimize suas escalas automaticamente</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Nossa IA analisa padrões e sugere melhorias para suas escalas, 
              economizando tempo e reduzindo custos.
            </p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Zap className="h-4 w-4 mr-2" />
              Gerar Sugestões
            </button>
          </div>
        </FeatureGate>

        <FeatureGate feature="advanced_analytics">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Analytics Avançados</h3>
                <p className="text-sm text-muted-foreground">Insights detalhados da sua operação</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Relatórios avançados com métricas de produtividade, 
              análise de custos e previsões inteligentes.
            </p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <ArrowRight className="h-4 w-4 mr-2" />
              Ver Relatórios
            </button>
          </div>
        </FeatureGate>
      </div>
    </div>
  );
};

export default Dashboard;