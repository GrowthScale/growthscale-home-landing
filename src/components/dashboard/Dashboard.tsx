import DashboardHeader from "./DashboardHeader";
import KPICard from "./KPICard";
import ChartSection from "./ChartSection";
import NotificationsPanel from "./NotificationsPanel";
import ActivityFeed from "./ActivityFeed";
import { 
  Users, 
  Clock, 
  Shield, 
  TrendingUp, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">
                Bem-vindo ao seu Dashboard, João! 👋
              </h1>
              <p className="text-white/90 text-lg">
                Aqui está um resumo das principais métricas da sua operação.
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
        </div>

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
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 hover:border-primary/20">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Nova Escala</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 hover:border-primary/20">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Adicionar Funcionário</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 hover:border-primary/20">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Ver Alertas</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 hover:border-primary/20">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Relatórios</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;