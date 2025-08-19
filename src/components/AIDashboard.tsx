import React, { useState, useEffect } from 'react';
import { useAI } from '@/hooks/useAI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Bell,
  RefreshCw,
  Play,
  Pause,
  BarChart,
  PieChart,
  Target,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export function AIDashboard() {
  const {
    aiAnalyses,
    anomalies,
    predictions,
    recommendations,
    smartAlerts,
    isAnalyzing,
    lastAnalysis,
    performAnalysis,
    getAIInsights,
    getRecommendationsByCategory,
    getAnomalyInsights,
    getPredictionInsights,
    getAlertInsights,
  } = useAI();

  const [activeTab, setActiveTab] = useState('overview');
  const [isAutoAnalysis, setIsAutoAnalysis] = useState(true);

  const insights = getAIInsights();
  const recommendationCategories = getRecommendationsByCategory();
  const anomalyInsights = getAnomalyInsights();
  const predictionInsights = getPredictionInsights();
  const alertInsights = getAlertInsights();

  // Simulate real-time data updates
  useEffect(() => {
    if (isAutoAnalysis) {
      const interval = setInterval(() => {
        if (!isAnalyzing) {
          performAnalysis();
        }
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoAnalysis, isAnalyzing, performAnalysis]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const predictionData = predictions.map(p => ({
    name: p.metric,
    current: p.currentValue,
    predicted: p.predictedValue,
    confidence: p.confidence * 100,
  }));

  const alertData = alertInsights ? Object.entries(alertInsights.priorityCounts).map(([priority, count]) => ({
    name: priority,
    value: count,
    color: priority === 'critical' ? '#ef4444' : priority === 'high' ? '#f97316' : priority === 'medium' ? '#eab308' : '#22c55e',
  })) : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Intelligence Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análise inteligente e previsões baseadas em IA
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={isAutoAnalysis ? 'text-green-600' : 'text-gray-600'}>
            <Brain className="w-3 h-3 mr-1" />
            {isAutoAnalysis ? 'Auto-Análise Ativa' : 'Auto-Análise Pausada'}
          </Badge>
          <Button onClick={performAnalysis} disabled={isAnalyzing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analisando...' : 'Analisar Agora'}
          </Button>
          <Button 
            onClick={() => setIsAutoAnalysis(!isAutoAnalysis)} 
            variant="outline"
          >
            {isAutoAnalysis ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAutoAnalysis ? 'Pausar' : 'Retomar'}
          </Button>
        </div>
      </div>

      {/* AI Insights Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Insights</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.totalInsights}</div>
            <p className="text-xs text-muted-foreground">
              Última análise: {lastAnalysis ? lastAnalysis.toLocaleTimeString() : 'Nunca'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{insights.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Requer atenção imediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análises Críticas</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{insights.highSeverityAnalyses}</div>
            <p className="text-xs text-muted-foreground">
              Alta severidade detectada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recomendações</CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{recommendations.length}</div>
            <p className="text-xs text-muted-foreground">
              Otimizações sugeridas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalias</TabsTrigger>
          <TabsTrigger value="predictions">Previsões</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent AI Analyses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Análises Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {aiAnalyses.slice(-5).map((analysis, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSeverityColor(analysis.severity)}>
                          {getSeverityIcon(analysis.severity)}
                          {analysis.type}
                        </Badge>
                        <span className="text-sm font-medium">{analysis.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {analysis.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Métricas de IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confiança Média</span>
                      <span>{insights.totalInsights > 0 ? (aiAnalyses.reduce((sum, a) => sum + a.confidence, 0) / aiAnalyses.length * 100).toFixed(1) : 0}%</span>
                    </div>
                    <Progress value={insights.totalInsights > 0 ? aiAnalyses.reduce((sum, a) => sum + a.confidence, 0) / aiAnalyses.length * 100 : 0} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Análises por Minuto</span>
                      <span>2.5</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Precisão das Previsões</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Anomalies Tab */}
        <TabsContent value="anomalies" className="space-y-4">
          {anomalyInsights ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Resumo de Anomalias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{anomalyInsights.count}</div>
                        <div className="text-sm text-red-600">Total</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{anomalyInsights.highImpact}</div>
                        <div className="text-sm text-orange-600">Alto Impacto</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pontuação Média</span>
                        <span>{anomalyInsights.averageScore.toFixed(1)}/100</span>
                      </div>
                      <Progress value={anomalyInsights.averageScore} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Fatores Principais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(anomalyInsights.topFactors)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([factor, count]) => (
                        <div key={factor} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm">{factor}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Brain className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma anomalia detectada ainda</p>
                <p className="text-sm text-gray-400">Execute uma análise para detectar padrões anômalos</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          {predictionInsights ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Previsões Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="current" stroke="#3b82f6" name="Atual" />
                      <Line type="monotone" dataKey="predicted" stroke="#10b981" name="Previsto" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Tendências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{predictionInsights.increasing}</div>
                        <div className="text-sm text-green-600">Crescendo</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{predictionInsights.decreasing}</div>
                        <div className="text-sm text-red-600">Diminuindo</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{predictionInsights.stable}</div>
                        <div className="text-sm text-blue-600">Estável</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Confiança Média</span>
                        <span>{(predictionInsights.averageConfidence * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={predictionInsights.averageConfidence * 100} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma previsão disponível</p>
                <p className="text-sm text-gray-400">Colete mais dados para gerar previsões</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Recomendações por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(recommendationCategories).map(([category, recs]) => (
                    <div key={category} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="font-semibold capitalize mb-2">{category}</h3>
                      <div className="space-y-2">
                        {recs.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Prioridade de Implementação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.slice(0, 5).map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{rec}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {index === 0 ? 'Alta' : index === 1 ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          {alertInsights ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Distribuição de Alertas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={alertData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {alertData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Alertas Urgentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {smartAlerts
                      .filter(alert => alert.priority === 'critical' || alert.priority === 'high')
                      .slice(0, 5)
                      .map((alert, index) => (
                        <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-red-800 dark:text-red-200">{alert.condition}</span>
                            <Badge variant="outline" className="text-red-600 border-red-600">
                              {alert.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-red-700 dark:text-red-300">{alert.action}</p>
                          <div className="flex justify-between text-xs text-red-600 mt-2">
                            <span>Atual: {alert.currentValue}</span>
                            <span>Limite: {alert.threshold}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhum alerta ativo</p>
                <p className="text-sm text-gray-400">O sistema está funcionando normalmente</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
