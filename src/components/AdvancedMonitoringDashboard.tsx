import React, { useState, useEffect } from 'react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Eye,
  MousePointer,
  Zap,
  Download,
  Play,
  Pause,
  BarChart,
  Target,
  UserCheck,
  Globe
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface MonitoringData {
  realTimeUsers: number;
  activeSessions: number;
  errorRate: number;
  avgResponseTime: number;
  conversionRate: number;
  pageViews: number;
  interactions: number;
  performance: {
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
  };
}

export function AdvancedMonitoringDashboard() {
  const {
    userBehavior,
    getEngagementMetrics,
    getPerformanceInsights,
    calculateFunnel,
    calculateCohorts,
    startTracking,
    stopTracking,
    exportUserBehavior,
  } = useAdvancedAnalytics();

  const [monitoringData, setMonitoringData] = useState<MonitoringData>({
    realTimeUsers: 0,
    activeSessions: 0,
    errorRate: 0,
    avgResponseTime: 0,
    conversionRate: 0,
    pageViews: 0,
    interactions: 0,
    performance: {
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
    },
  });

  const [isTracking, setIsTracking] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringData(prev => ({
        ...prev,
        realTimeUsers: Math.floor(Math.random() * 100) + 50,
        activeSessions: Math.floor(Math.random() * 200) + 100,
        errorRate: Math.random() * 2,
        avgResponseTime: Math.random() * 500 + 100,
        conversionRate: Math.random() * 10 + 2,
        pageViews: prev.pageViews + Math.floor(Math.random() * 10),
        interactions: prev.interactions + Math.floor(Math.random() * 20),
        performance: {
          lcp: Math.random() * 2000 + 500,
          fid: Math.random() * 100 + 10,
          cls: Math.random() * 0.1,
          ttfb: Math.random() * 300 + 50,
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const engagementMetrics = getEngagementMetrics();
  const performanceInsights = getPerformanceInsights();
  const funnelData = calculateFunnel(['home', 'pricing', 'signup', 'dashboard']);
  const cohortData = calculateCohorts(30);

  const performanceData = [
    { name: 'LCP', value: monitoringData.performance.lcp, target: 2500 },
    { name: 'FID', value: monitoringData.performance.fid, target: 100 },
    { name: 'CLS', value: monitoringData.performance.cls, target: 0.1 },
    { name: 'TTFB', value: monitoringData.performance.ttfb, target: 200 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#3b82f6' },
    { name: 'Mobile', value: 25, color: '#10b981' },
    { name: 'Tablet', value: 10, color: '#f59e0b' },
  ];

  const pageViewsData = userBehavior.pageViews.slice(-10).map((pv, index) => ({
    name: pv.title.substring(0, 20),
    views: index + 1,
    timeSpent: pv.timeSpent / 1000,
  }));

  const handleToggleTracking = () => {
    if (isTracking) {
      stopTracking();
      setIsTracking(false);
    } else {
      startTracking();
      setIsTracking(true);
    }
  };

  const handleExportData = () => {
    const data = exportUserBehavior();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-behavior-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Advanced Monitoring & APM</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitoramento avançado, analytics e performance tracking
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={isTracking ? 'text-green-600' : 'text-red-600'}>
            {isTracking ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
            {isTracking ? 'Tracking Ativo' : 'Tracking Pausado'}
          </Badge>
          <Button onClick={handleToggleTracking} variant="outline">
            {isTracking ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isTracking ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button onClick={handleExportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monitoringData.realTimeUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10)}% desde a última hora
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monitoringData.activeSessions}</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor(Math.random() * 20)} novas sessões
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monitoringData.errorRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {monitoringData.errorRate < 1 ? 'Excelente' : 'Atenção necessária'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monitoringData.avgResponseTime.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground">
              {monitoringData.avgResponseTime < 200 ? 'Ótimo' : 'Pode melhorar'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Core Web Vitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.name}</span>
                        <span className={metric.value <= metric.target ? 'text-green-600' : 'text-red-600'}>
                          {metric.value.toFixed(metric.name === 'CLS' ? 3 : 0)}
                          {metric.name === 'CLS' ? '' : 'ms'}
                        </span>
                      </div>
                      <Progress 
                        value={(metric.value / metric.target) * 100} 
                        className={metric.value <= metric.target ? 'bg-green-100' : 'bg-red-100'}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Distribuição de Dispositivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: device.color }}
                      />
                      <span className="text-sm">{device.name}: {device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Page Views Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Page Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={pageViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tempo Médio de Carregamento</span>
                    <span className="font-semibold">{performanceInsights.avgLoadTime.toFixed(0)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo Médio de Renderização</span>
                    <span className="font-semibold">{performanceInsights.avgRenderTime.toFixed(0)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Páginas Lentas</span>
                    <span className="font-semibold">{performanceInsights.slowPages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total de Métricas</span>
                    <span className="font-semibold">{performanceInsights.totalMetrics}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Métricas de Engajamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Duração da Sessão</span>
                    <span className="font-semibold">{(engagementMetrics.sessionDuration / 1000 / 60).toFixed(1)}min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Page Views</span>
                    <span className="font-semibold">{engagementMetrics.pageViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interações</span>
                    <span className="font-semibold">{engagementMetrics.interactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Conversão</span>
                    <span className="font-semibold">{engagementMetrics.conversionRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Erro</span>
                    <span className="font-semibold">{engagementMetrics.errorRate.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Behavior */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5" />
                  Comportamento do Usuário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Interações por Página</span>
                    <span className="font-semibold">{engagementMetrics.interactionRate.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo por Página</span>
                    <span className="font-semibold">{(engagementMetrics.avgTimePerPage / 1000).toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversões</span>
                    <span className="font-semibold">{engagementMetrics.conversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Erros</span>
                    <span className="font-semibold">{engagementMetrics.errors}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Funnel Tab */}
        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Análise de Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </RechartsBarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {funnelData.map((step) => (
                  <div key={step.name} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="font-medium">{step.name}</span>
                    <div className="flex gap-4">
                      <span>Usuários: {step.count}</span>
                      <span>Conversão: {step.conversionRate.toFixed(1)}%</span>
                      <span>Dropoff: {step.dropoffRate.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cohorts Tab */}
        <TabsContent value="cohorts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Análise de Cohorts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Cohort</th>
                      <th className="text-left p-2">Tamanho</th>
                      <th className="text-left p-2">Semana 1</th>
                      <th className="text-left p-2">Semana 2</th>
                      <th className="text-left p-2">Semana 3</th>
                      <th className="text-left p-2">Semana 4</th>
                      <th className="text-left p-2">Churn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.slice(0, 5).map((cohort) => (
                      <tr key={cohort.cohort} className="border-b">
                        <td className="p-2">{cohort.cohort}</td>
                        <td className="p-2">{cohort.size}</td>
                        {cohort.retention.map((ret, index) => (
                          <td key={index} className="p-2">{ret.toFixed(1)}%</td>
                        ))}
                        <td className="p-2">{cohort.churn.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
