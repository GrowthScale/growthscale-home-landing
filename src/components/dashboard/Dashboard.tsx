import DashboardHeader from "./DashboardHeader";
import KPICard from "./KPICard";
import ChartSection from "./ChartSection";
import NotificationsPanel from "./NotificationsPanel";
import ActivityFeed from "./ActivityFeed";
import PendingDraftCard from "./PendingDraftCard";
import EquityScore from "./EquityScore";
import { useAccessControl } from "@/hooks/useAccessControl";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  Shield, 
  TrendingUp, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { scheduleDraftService } from '@/services/api';
import { useTenant } from '@/contexts/TenantContext';

const Dashboard = () => {
  const { can } = useAccessControl();
  const navigate = useNavigate();
  const { tenant } = useTenant();

  // Buscar rascunho pendente para o card proativo
  const { data: pendingDraft, isLoading: isLoadingDraft } = useQuery({
    queryKey: ['pendingDraft', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) return null;
      const response = await scheduleDraftService.getPendingDraft(tenant.id);
      if (response.error) throw new Error(response.error);
      return response.data;
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
      status: "neutral" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background font-roboto">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-xl">
        {/* Welcome Section */}
        <section className="mb-8" aria-labelledby="welcome-title">
          <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>
            <div className="relative z-10">
              <h1 id="welcome-title" className="text-2xl font-bold mb-2 text-balance">
                Bem-vindo ao seu Dashboard, João! <span role="img" aria-label="Emoji de mão acenando">👋</span>
              </h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Aqui está um resumo das principais métricas da sua operação.
              </p>
              
              {/* Botões de Ação com Controle de Permissão */}
              <div className="flex flex-wrap gap-3 mt-4">
                {can('view:billing') && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Relatórios Avançados
                  </Button>
                )}
                
                {can('manage:users') && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Gerenciar Usuários
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Card Proativo Condicional */}
        {pendingDraft && (
          <Card className="mb-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none animate-fade-in-down">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-6 w-6" />
                Sua Escala da Próxima Semana está Pronta!
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Nossa IA analisou sua equipe e preparou um rascunho otimizado. Revise e aprove para economizar horas de trabalho.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="secondary" 
                onClick={() => navigate(`/schedules/draft/${pendingDraft.id}`)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Revisar e Aprovar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* KPI Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" aria-labelledby="kpi-title">
          <h2 id="kpi-title" className="sr-only">Indicadores principais de desempenho</h2>
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              description={kpi.description}
              icon={kpi.icon}
              trend={kpi.trend}
              status={kpi.status}
            />
          ))}
        </section>

        {/* Placar de Equidade */}
        <section className="mb-8" aria-labelledby="equity-title">
          <h2 id="equity-title" className="sr-only">Placar de Equidade</h2>
          <EquityScore 
            value={85} 
            message="Distribuição de turnos de fim de semana parece justa. Todos os funcionários têm uma carga equilibrada de finais de semana."
            className="max-w-2xl"
          />
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Charts Section - Takes 3/4 of the space */}
          <div className="lg:col-span-3">
            <ChartSection />
          </div>
          
          {/* Right Sidebar - Takes 1/4 of the space */}
          <div className="space-y-6">
            <NotificationsPanel />
            <ActivityFeed />
          </div>
        </div>

        {/* Quick Actions Bar */}
        <section className="bg-card border border-border rounded-lg p-6" aria-labelledby="quick-actions-title">
          <h3 id="quick-actions-title" className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20 focus:ring-2 focus:ring-primary"
              aria-label="Criar nova escala de trabalho"
            >
              <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">Nova Escala</span>
            </button>
            <button 
              className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20 focus:ring-2 focus:ring-primary"
              aria-label="Adicionar novo funcionário"
            >
              <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">Adicionar Funcionário</span>
            </button>
            <button 
              className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20 focus:ring-2 focus:ring-primary"
              aria-label="Visualizar alertas pendentes"
            >
              <AlertTriangle className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">Ver Alertas</span>
            </button>
            <button 
              className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-card transition-smooth hover:border-primary/20 focus:ring-2 focus:ring-primary"
              aria-label="Acessar relatórios detalhados"
            >
              <CheckCircle className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">Relatórios</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;