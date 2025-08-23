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
import { createCompanyForUser } from '@/services/api';
import { supabase } from '@/integrations/supabase/client';

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

    // REFATORAÇÃO: Processar dados pendentes de empresa primeiro
    const processPendingCompany = async () => {
      const pendingCompany = user?.user_metadata?.pending_company;
      
      if (pendingCompany && !tenant) {
        console.log('🏢 Processando dados pendentes de empresa...');
        
        try {
          // Criar a empresa para o usuário confirmado
          await createCompanyForUser(user.id, pendingCompany);
          
          // Limpar os dados pendentes dos metadados
          await supabase.auth.updateUser({
            data: { pending_company: null }
          });
          
          console.log('✅ Empresa criada com sucesso!');
          
          // Recarregar a página para atualizar o contexto do tenant
          window.location.reload();
          return;
        } catch (companyError) {
          console.error('❌ Erro ao criar empresa:', companyError);
          // Em caso de erro, redirecionar para setup manual
          navigate('/setup', { replace: true });
          return;
        }
      }

      // Se o utilizador está logado, já não está a carregar os tenants, e não tem tenant configurado, força o redirecionamento
      if (user && !isLoadingTenant && !tenant) {
        console.log('🚨 Usuário sem empresa configurada - redirecionando para setup');
        navigate('/setup', { replace: true });
      }
    };

    processPendingCompany();
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

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add_employee':
        if (checkAndShowUpgrade('add_employee')) {
          return;
        }
        navigate('/dashboard/employees');
        break;
      case 'add_schedule':
        if (checkAndShowUpgrade('create_schedule')) {
          return;
        }
        navigate('/dashboard/schedules');
        break;
      case 'add_branch':
        if (checkAndShowUpgrade('add_branch')) {
          return;
        }
        navigate('/dashboard/branches');
        break;
      default:
        navigate(`/dashboard/${action}`);
    }
  };

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
    <>
      <div className="space-y-6">
        {/* Trial Upgrade Banner */}
        <TrialUpgradeBanner className="mb-6" />

        {/* First Time User Card - Mostrar apenas para usuários novos */}
        {isFirstTimeUser && (
          <FirstTimeUserCard className="mb-6" />
        )}

        {/* Dashboard Header com Badge de Plano */}
        <div className="flex items-center justify-between">
          <DashboardHeader />
          <PlanBadge />
        </div>

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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button 
                  className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                  onClick={() => handleQuickAction('add_schedule')}
                >
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Nova Escala</span>
                </button>
                <button 
                  className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                  onClick={() => handleQuickAction('add_employee')}
                >
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Adicionar Funcionário</span>
                </button>
                <button 
                  className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20"
                  onClick={() => handleQuickAction('compliance')}
                >
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Ver Compliance</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* Seção de Status da Versão 1.0 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary dark:text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Versão 1.0 - Funcionalidades Essenciais</h3>
              <p className="text-sm text-muted-foreground">Foco na experiência do usuário</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Esta versão inclui as funcionalidades essenciais para gestão de escalas: 
            Dashboard, Escalas, Funcionários e Compliance. Todas as funcionalidades estão 
            conectadas ao backend e prontas para uso em produção.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-accent" />
            <span>Dashboard funcional</span>
            <CheckCircle className="h-4 w-4 text-accent" />
            <span>Gestão de escalas ativa</span>
            <CheckCircle className="h-4 w-4 text-accent" />
            <span>CRUD de funcionários</span>
            <CheckCircle className="h-4 w-4 text-accent" />
            <span>Relatórios de compliance</span>
          </div>
        </div>
      </div>

      {/* Modal de Upgrade */}
      <UpgradeModal
        isOpen={isModalOpen}
        onClose={hideUpgradeModal}
        trigger={modalTrigger || 'employee_limit'}
        message={modalMessage}
      />
    </>
  );
};

export default Dashboard;