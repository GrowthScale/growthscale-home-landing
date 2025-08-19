import React, { useState, useEffect } from 'react';
import { useEdgeAnalytics } from '@/hooks/useEdgeAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  Database,
  Globe,
  Clock,
  Users,
  Eye,
  MousePointer,
  FileText,
  AlertCircle
} from 'lucide-react';

interface AnalyticsData {
  totalEvents: number;
  eventsByType: Record<string, number>;
  recentEvents: any[];
  performance: {
    avgResponseTime: number;
    errorRate: number;
  };
}

interface PerformanceData {
  averageScores: {
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
    overall: number;
  };
  performanceDistribution: {
    excellent: number;
    good: number;
    needsImprovement: number;
    poor: number;
  };
  recentMetrics: any[];
  alerts: Array<{
    type: string;
    metric: string;
    message: string;
    severity: string;
  }>;
}

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  region: string;
  latency: {
    total: number;
    supabase: number;
  };
  externalApis: {
    googleFonts: string;
    supabase: string;
  };
  checks: {
    database: string;
    fonts: string;
    responseTime: boolean;
  };
}

export function EdgeAnalyticsDashboard() {
  const { 
    getAnalytics, 
    getPerformanceMetrics, 
    checkHealth, 
    isOnline,
    syncOfflineData 
  } = useEdgeAnalytics();
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [analytics, performance, health] = await Promise.all([
        getAnalytics(),
        getPerformanceMetrics(),
        checkHealth(),
      ]);

      setAnalyticsData(analytics);
      setPerformanceData(performance);
      setHealthData(health);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'excellent':
        return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'good':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'needsImprovement':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'poor':
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'excellent':
        return <CheckCircle className="w-4 h-4" />;
      case 'good':
        return <TrendingUp className="w-4 h-4" />;
      case 'needsImprovement':
        return <AlertTriangle className="w-4 h-4" />;
      case 'poor':
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edge Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitoramento em tempo real com edge functions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={isOnline ? 'text-green-600' : 'text-red-600'}>
            {isOnline ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          <Button onClick={fetchAllData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button onClick={syncOfflineData} variant="outline">
            Sincronizar
          </Button>
        </div>
      </div>

      {/* Health Status */}
      {healthData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span className="text-sm">Database</span>
                </div>
                <Badge variant="outline" className={getStatusColor(healthData.checks.database)}>
                  {getStatusIcon(healthData.checks.database)}
                  {healthData.checks.database}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Fonts</span>
                </div>
                <Badge variant="outline" className={getStatusColor(healthData.checks.fonts)}>
                  {getStatusIcon(healthData.checks.fonts)}
                  {healthData.checks.fonts}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Response Time</span>
                </div>
                <Badge variant="outline" className={getStatusColor(healthData.checks.responseTime ? 'healthy' : 'error')}>
                  {getStatusIcon(healthData.checks.responseTime ? 'healthy' : 'error')}
                  {healthData.latency.total}ms
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Region: {healthData.region} | Version: {healthData.version}</p>
              <p>Last Update: {lastUpdate?.toLocaleTimeString()}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {performanceData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{performanceData.averageScores.overall}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
                <Progress value={performanceData.averageScores.overall} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{performanceData.averageScores.lcp}ms</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">LCP</div>
                <Progress value={Math.max(0, 100 - (performanceData.averageScores.lcp - 2500) / 25)} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{performanceData.averageScores.fid}ms</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">FID</div>
                <Progress value={Math.max(0, 100 - (performanceData.averageScores.fid - 100) / 10)} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{performanceData.averageScores.cls.toFixed(3)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">CLS</div>
                <Progress value={Math.max(0, 100 - performanceData.averageScores.cls * 1000)} className="mt-2" />
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-xl font-bold text-green-600">{performanceData.performanceDistribution.excellent}</div>
                <div className="text-sm text-green-600">Excellent (90-100)</div>
              </div>
              
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{performanceData.performanceDistribution.good}</div>
                <div className="text-sm text-blue-600">Good (70-89)</div>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-xl font-bold text-yellow-600">{performanceData.performanceDistribution.needsImprovement}</div>
                <div className="text-sm text-yellow-600">Needs Improvement (50-69)</div>
              </div>
              
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-xl font-bold text-red-600">{performanceData.performanceDistribution.poor}</div>
                <div className="text-sm text-red-600">Poor (0-49)</div>
              </div>
            </div>

            {/* Alerts */}
            {performanceData.alerts.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Alerts</h3>
                {performanceData.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800 dark:text-yellow-200">
                      {alert.message}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Analytics */}
      {analyticsData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData.totalEvents}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData.performance.avgResponseTime}ms</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{(analyticsData.performance.errorRate * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Error Rate</div>
              </div>
            </div>

            {/* Event Types */}
            <div className="space-y-2">
              <h3 className="font-semibold">Event Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(analyticsData.eventsByType).map(([eventType, count]) => (
                  <div key={eventType} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm capitalize">{eventType.replace('_', ' ')}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Events */}
      {analyticsData?.recentEvents && analyticsData.recentEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analyticsData.recentEvents.slice(0, 10).map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">{event.event}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{event.url}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
