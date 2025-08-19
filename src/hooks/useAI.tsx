import { useCallback, useEffect, useState } from 'react';
import { useAdvancedAnalytics } from './useAdvancedAnalytics';
import { ai, AIAnalysis, AnomalyDetection, Prediction, SmartAlert } from '@/lib/ai';

export function useAI() {
  const { userBehavior, getEngagementMetrics, getPerformanceInsights } = useAdvancedAnalytics();
  
  const [aiAnalyses, setAiAnalyses] = useState<AIAnalysis[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [smartAlerts, setSmartAlerts] = useState<SmartAlert[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null);

  // Initialize AI service
  useEffect(() => {
    ai.init();
  }, []);

  // Perform comprehensive AI analysis
  const performAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    
    try {
      const engagementMetrics = getEngagementMetrics();
      const performanceInsights = getPerformanceInsights();
      
      const analysisData = {
        performance: userBehavior.performance,
        historical: userBehavior.pageViews.slice(-30), // Last 30 page views
        engagement: engagementMetrics,
        insights: performanceInsights,
        userBehavior: {
          sessionDuration: engagementMetrics.sessionDuration,
          pageViews: engagementMetrics.pageViews,
          interactions: engagementMetrics.interactions,
          errors: engagementMetrics.errors,
          conversions: engagementMetrics.conversions,
        },
      };

      const analyses = await ai.performComprehensiveAnalysis(analysisData);
      
      setAiAnalyses(analyses);
      setLastAnalysis(new Date());

      // Extract specific analysis types
      const anomalyAnalyses = analyses.filter(a => a.type === 'anomaly');
      const predictionAnalyses = analyses.filter(a => a.type === 'prediction');
      const recommendationAnalyses = analyses.filter(a => a.type === 'recommendation');
      const alertAnalyses = analyses.filter(a => a.type === 'alert');

      // Update state
      if (anomalyAnalyses.length > 0) {
        setAnomalies(anomalyAnalyses.map(a => a.data as AnomalyDetection));
      }
      
      if (predictionAnalyses.length > 0) {
        setPredictions(predictionAnalyses.map(a => a.data as Prediction));
      }
      
      if (recommendationAnalyses.length > 0) {
        setRecommendations(recommendationAnalyses[0].recommendations);
      }
      
      if (alertAnalyses.length > 0) {
        setSmartAlerts(alertAnalyses.map(a => a.data as SmartAlert));
      }

    } catch (error) {
      console.error('AI Analysis Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [userBehavior, getEngagementMetrics, getPerformanceInsights]);

  // Auto-analyze every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (userBehavior.pageViews.length > 5) { // Only analyze if we have enough data
        performAnalysis();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [performAnalysis, userBehavior.pageViews.length]);

  // Get AI insights summary
  const getAIInsights = useCallback(() => {
    const criticalAlerts = smartAlerts.filter(alert => alert.priority === 'critical').length;
    const highSeverityAnalyses = aiAnalyses.filter(analysis => analysis.severity === 'high' || analysis.severity === 'critical').length;
    const totalInsights = aiAnalyses.length;
    
    return {
      criticalAlerts,
      highSeverityAnalyses,
      totalInsights,
      lastAnalysis: lastAnalysis,
      hasAnomalies: anomalies.length > 0,
      hasPredictions: predictions.length > 0,
      hasRecommendations: recommendations.length > 0,
    };
  }, [smartAlerts, aiAnalyses, lastAnalysis, anomalies, predictions, recommendations]);

  // Get recommendations by category
  const getRecommendationsByCategory = useCallback(() => {
    const categories = {
      performance: recommendations.filter(rec => 
        rec.toLowerCase().includes('performance') || 
        rec.toLowerCase().includes('carregamento') ||
        rec.toLowerCase().includes('otimizar')
      ),
      ux: recommendations.filter(rec => 
        rec.toLowerCase().includes('experiência') || 
        rec.toLowerCase().includes('engajamento') ||
        rec.toLowerCase().includes('interação')
      ),
      conversion: recommendations.filter(rec => 
        rec.toLowerCase().includes('conversão') || 
        rec.toLowerCase().includes('formulário') ||
        rec.toLowerCase().includes('abandono')
      ),
      technical: recommendations.filter(rec => 
        rec.toLowerCase().includes('cache') || 
        rec.toLowerCase().includes('cdn') ||
        rec.toLowerCase().includes('lazy')
      ),
    };

    return categories;
  }, [recommendations]);

  // Get anomaly insights
  const getAnomalyInsights = useCallback(() => {
    if (anomalies.length === 0) {return null;}

    const highImpactAnomalies = anomalies.filter(a => a.impact === 'high');
    const avgScore = anomalies.reduce((sum, a) => sum + a.score, 0) / anomalies.length;
    
    return {
      count: anomalies.length,
      highImpact: highImpactAnomalies.length,
      averageScore: avgScore,
      topFactors: anomalies
        .flatMap(a => a.factors)
        .reduce((acc, factor) => {
          acc[factor] = (acc[factor] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
    };
  }, [anomalies]);

  // Get prediction insights
  const getPredictionInsights = useCallback(() => {
    if (predictions.length === 0) {return null;}

    const increasingTrends = predictions.filter(p => p.trend === 'increasing');
    const decreasingTrends = predictions.filter(p => p.trend === 'decreasing');
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;

    return {
      total: predictions.length,
      increasing: increasingTrends.length,
      decreasing: decreasingTrends.length,
      stable: predictions.filter(p => p.trend === 'stable').length,
      averageConfidence: avgConfidence,
      highConfidence: predictions.filter(p => p.confidence > 0.8).length,
    };
  }, [predictions]);

  // Get alert insights
  const getAlertInsights = useCallback(() => {
    if (smartAlerts.length === 0) {return null;}

    const priorityCounts = {
      critical: smartAlerts.filter(a => a.priority === 'critical').length,
      high: smartAlerts.filter(a => a.priority === 'high').length,
      medium: smartAlerts.filter(a => a.priority === 'medium').length,
      low: smartAlerts.filter(a => a.priority === 'low').length,
    };

    const urgentAlerts = smartAlerts.filter(a => 
      a.priority === 'critical' || a.priority === 'high'
    );

    return {
      total: smartAlerts.length,
      urgent: urgentAlerts.length,
      priorityCounts,
      topActions: smartAlerts
        .map(a => a.action)
        .reduce((acc, action) => {
          acc[action] = (acc[action] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
    };
  }, [smartAlerts]);

  return {
    // State
    aiAnalyses,
    anomalies,
    predictions,
    recommendations,
    smartAlerts,
    isAnalyzing,
    lastAnalysis,

    // Actions
    performAnalysis,

    // Insights
    getAIInsights,
    getRecommendationsByCategory,
    getAnomalyInsights,
    getPredictionInsights,
    getAlertInsights,

    // Analysis history
    getAnalysisHistory: ai.getAnalysisHistory,
    clearAnalysisHistory: ai.clearAnalysisHistory,
  };
}
