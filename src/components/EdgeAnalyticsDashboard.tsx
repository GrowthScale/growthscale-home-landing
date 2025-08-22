import React, { useState, useEffect } from 'react';
import { useEdgeAnalytics } from '@/hooks/useEdgeAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  // TrendingDown, // Não utilizado
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  Database,
  Globe,
  Clock,
  // Users, // Não utilizado
  Eye,
  // MousePointer, // Não utilizado
  // FileText, // Não utilizado
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
        return 'text-accent bg-accent/10 dark:bg-accent';
      case 'good':
        return 'text-primary bg-primary/10 dark:bg-primary';
      case 'needsImprovement':
        return 'text-accent bg-accent/10 dark:bg-accent';
      case 'poor':
      case 'error':
        return 'text-destructive bg-destructive/10 dark:bg-destructive';
      default:
        return 'text-muted-foreground bg-muted dark:bg-muted';
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
          <p className="text-muted-foreground dark:text-muted-foreground">
            Monitoramento em tempo real com edge functions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={isOnline ? 'text-accent' : 'text-destructive'}>
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
              <div className="flex items-center justify-between p-3 bg-muted dark:bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span className="text-sm">Database</span>
                </div>
                <Badge variant="outline" className={getStatusColor(healthData?.checks?.database || 'unknown')}>
                  {getStatusIcon(healthData?.checks?.database || 'unknown')}
                  {healthData?.checks?.database || 'Unknown'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted dark:bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Fonts</span>
                </div>
                <Badge variant="outline" className={getStatusColor(healthData?.checks?.fonts || 'unknown')}>
                  {getStatusIcon(healthData?.checks?.fonts || 'unknown')}
                  {healthData?.checks?.fonts || 'Unknown'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted dark:bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Response Time</span>
                </div>
                <Badge variant="outline" className={getStatusColor(healthData?.checks?.responseTime ? 'healthy' : 'error')}>
                  {getStatusIcon(healthData?.checks?.responseTime ? 'healthy' : 'error')}
                  {healthData?.latency?.total || 0}ms
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground dark:text-muted-foreground">
              <p>Region: {healthData?.region || 'Unknown'} | Version: {healthData?.version || 'Unknown'}</p>
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
                <div className="text-2xl font-bold">{performanceData?.averageScores?.overall || 0}</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">Overall Score</div>
                <Progress value={performanceData?.averageScores?.overall || 0} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{performanceData?.averageScores?.lcp || 0}ms</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">LCP</div>
                <Progress value={Math.max(0, 100 - ((performanceData?.averageScores?.lcp || 0) - 2500) / 25)} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{performanceData?.averageScores?.fid || 0}ms</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">FID</div>
                <Progress value={Math.max(0, 100 - ((performanceData?.averageScores?.fid || 0) - 100) / 10)} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{(performanceData?.averageScores?.cls || 0).toFixed(3)}</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">CLS</div>
                <Progress value={Math.max(0, 100 - (performanceData?.averageScores?.cls || 0) * 1000)} className="mt-2" />
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-accent dark:bg-accent/20 rounded-lg">
                <div className="text-xl font-bold text-accent">{performanceData?.performanceDistribution?.excellent || 0}</div>
                <div className="text-sm text-accent">Excellent (90-100)</div>
              </div>
              
              <div className="text-center p-3 bg-primary dark:bg-primary/20 rounded-lg">
                <div className="text-xl font-bold text-primary">{performanceData?.performanceDistribution?.good || 0}</div>
                <div className="text-sm text-primary">Good (70-89)</div>
              </div>
              
              <div className="text-center p-3 bg-accent dark:bg-accent/20 rounded-lg">
                <div className="text-xl font-bold text-accent">{performanceData?.performanceDistribution?.needsImprovement || 0}</div>
                <div className="text-sm text-accent">Needs Improvement (50-69)</div>
              </div>
              
              <div className="text-center p-3 bg-destructive dark:bg-destructive/20 rounded-lg">
                <div className="text-xl font-bold text-destructive">{performanceData?.performanceDistribution?.poor || 0}</div>
                <div className="text-sm text-destructive">Poor (0-49)</div>
              </div>
            </div>

            {/* Alerts */}
            {performanceData?.alerts && performanceData.alerts.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Alerts</h3>
                {performanceData.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-accent dark:bg-accent/20 rounded">
                    <AlertTriangle className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent dark:text-accent">
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
                <div className="text-2xl font-bold">{analyticsData?.totalEvents || 0}</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">Total Events</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData?.performance?.avgResponseTime || 0}ms</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">Avg Response Time</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{((analyticsData?.performance?.errorRate || 0) * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">Error Rate</div>
              </div>
            </div>

            {/* Event Types */}
            <div className="space-y-2">
              <h3 className="font-semibold">Event Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {analyticsData?.eventsByType && Object.entries(analyticsData.eventsByType).map(([eventType, count]) => (
                  <div key={eventType} className="flex items-center justify-between p-2 bg-muted dark:bg-muted rounded">
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
                <div key={index} className="flex items-center justify-between p-2 bg-muted dark:bg-muted rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">{event.event}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.url}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
