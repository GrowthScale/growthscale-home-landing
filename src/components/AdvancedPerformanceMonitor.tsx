import React, { useState, useEffect } from 'react';
import { usePerformance } from '@/hooks/usePerformance';
import { useBundleOptimization } from '@/hooks/useBundleOptimization';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Clock, 
  HardDrive, 
  Network, 
  Smartphone,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw
} from 'lucide-react';

interface PerformanceScore {
  overall: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  bundle: number;
}

export function AdvancedPerformanceMonitor() {
  const { metrics, getPerformanceScore, logMetrics } = usePerformance();
  const { metrics: bundleMetrics } = useBundleOptimization();
  const [isVisible, setIsVisible] = useState(false);
  const [scores, setScores] = useState<PerformanceScore>({
    overall: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    bundle: 0,
  });

  useEffect(() => {
    if (metrics && bundleMetrics) {
      const lcpScore = metrics.lcp ? Math.max(0, 100 - (metrics.lcp - 2500) / 25) : 0;
      const fidScore = metrics.fid ? Math.max(0, 100 - (metrics.fid - 100) / 10) : 0;
      const clsScore = metrics.cls ? Math.max(0, 100 - metrics.cls * 1000) : 0;
      const ttfbScore = metrics.ttfb ? Math.max(0, 100 - (metrics.ttfb - 600) / 6) : 0;
      const bundleScore = bundleMetrics.totalSize ? Math.max(0, 100 - (bundleMetrics.totalSize - 500000) / 5000) : 0;

      setScores({
        overall: Math.round((lcpScore + fidScore + clsScore + ttfbScore + bundleScore) / 5),
        lcp: Math.round(lcpScore),
        fid: Math.round(fidScore),
        cls: Math.round(clsScore),
        ttfb: Math.round(ttfbScore),
        bundle: Math.round(bundleScore),
      });
    }
  }, [metrics, bundleMetrics]);

  const getScoreColor = (score: number) => {
    if (score >= 90) {return 'text-accent bg-accent/10 dark:bg-accent';}
    if (score >= 70) {return 'text-accent bg-accent/10 dark:bg-accent';}
    return 'text-destructive bg-destructive/10 dark:bg-destructive';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) {return <CheckCircle className="w-4 h-4" />;}
    if (score >= 70) {return <AlertTriangle className="w-4 h-4" />;}
    return <X className="w-4 h-4" />;
  };

  const getMetricStatus = (value: number | null, threshold: number, unit: string) => {
    if (!value) {return { status: 'unknown', color: 'text-muted-foreground' };}
    
    const isGood = value <= threshold;
    return {
      status: isGood ? 'good' : 'poor',
      color: isGood ? 'text-accent' : 'text-destructive',
      value: `${value.toFixed(1)}${unit}`,
    };
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-50"
      >
        <Activity className="w-4 h-4 mr-2" />
        Performance
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Performance Monitor
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={logMetrics}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsVisible(false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Overall Score */}
          <div className="text-center p-4 bg-muted dark:bg-muted rounded-lg">
            <div className="text-2xl font-bold mb-2">
              {scores.overall}/100
            </div>
            <Progress value={scores.overall} className="h-2" />
            <div className="text-sm text-muted-foreground dark:text-muted-foreground mt-2">
              Overall Performance Score
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Core Web Vitals
            </h3>

            {/* LCP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">LCP</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getScoreColor(scores.lcp)}>
                  {getScoreIcon(scores.lcp)}
                  {scores.lcp}
                </Badge>
                <span className={`text-xs ${getMetricStatus(metrics?.lcp, 2500, 'ms').color}`}>
                  {getMetricStatus(metrics?.lcp, 2500, 'ms').value}
                </span>
              </div>
            </div>

            {/* FID */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-accent" />
                <span className="text-sm">FID</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getScoreColor(scores.fid)}>
                  {getScoreIcon(scores.fid)}
                  {scores.fid}
                </Badge>
                <span className={`text-xs ${getMetricStatus(metrics?.fid, 100, 'ms').color}`}>
                  {getMetricStatus(metrics?.fid, 100, 'ms').value}
                </span>
              </div>
            </div>

            {/* CLS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm">CLS</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getScoreColor(scores.cls)}>
                  {getScoreIcon(scores.cls)}
                  {scores.cls}
                </Badge>
                <span className={`text-xs ${getMetricStatus(metrics?.cls, 0.1, '').color}`}>
                  {metrics?.cls?.toFixed(3) || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Metrics */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Technical Metrics
            </h3>

            {/* TTFB */}
            <div className="flex items-center justify-between">
              <span className="text-sm">TTFB</span>
              <span className={`text-xs ${getMetricStatus(metrics?.ttfb, 600, 'ms').color}`}>
                {getMetricStatus(metrics?.ttfb, 600, 'ms').value}
              </span>
            </div>

            {/* Bundle Size */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Bundle Size</span>
              <span className={`text-xs ${getMetricStatus(bundleMetrics?.totalSize, 500000, 'B').color}`}>
                {bundleMetrics?.totalSize ? `${(bundleMetrics.totalSize / 1024).toFixed(1)}KB` : 'N/A'}
              </span>
            </div>

            {/* Chunks */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Chunks</span>
              <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                {bundleMetrics?.chunkCount || 'N/A'}
              </span>
            </div>

            {/* Load Time */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Load Time</span>
              <span className={`text-xs ${getMetricStatus(metrics?.loadTime, 3000, 'ms').color}`}>
                {getMetricStatus(metrics?.loadTime, 3000, 'ms').value}
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Recommendations</h3>
            <div className="text-xs space-y-1">
              {scores.lcp < 90 && (
                <div className="text-accent">• Optimize LCP: Reduce largest contentful paint time</div>
              )}
              {scores.fid < 90 && (
                <div className="text-accent">• Improve FID: Reduce first input delay</div>
              )}
              {scores.cls < 90 && (
                <div className="text-accent">• Fix CLS: Prevent cumulative layout shifts</div>
              )}
              {scores.bundle < 90 && (
                <div className="text-accent">• Reduce bundle size: Implement code splitting</div>
              )}
              {scores.overall >= 90 && (
                <div className="text-accent">• Excellent performance! Keep it up!</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
