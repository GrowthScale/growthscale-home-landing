// AI Service - OpenAI Integration for Intelligent Analysis
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for client-side analysis
});

export interface AIAnalysis {
  type: 'anomaly' | 'prediction' | 'recommendation' | 'alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  title: string;
  description: string;
  insights: string[];
  recommendations: string[];
  data: Record<string, any>;
  timestamp: Date;
}

export interface AnomalyDetection {
  isAnomaly: boolean;
  score: number;
  factors: string[];
  impact: 'low' | 'medium' | 'high';
}

export interface Prediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface SmartAlert {
  condition: string;
  threshold: number;
  currentValue: number;
  action: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export class AIService {
  private static instance: AIService;
  private analysisHistory: AIAnalysis[] = [];
  private isInitialized = false;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  init() {
    if (this.isInitialized) {return;}
    
    if (!process.env.VITE_OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured. AI features will be limited.');
    }
    
    this.isInitialized = true;
    if (process.env.NODE_ENV === 'development') { console.log('AI Service initialized'); }
  }

  // Anomaly Detection
  async detectAnomalies(data: any[]): Promise<AnomalyDetection[]> {
    if (!process.env.VITE_OPENAI_API_KEY) {
      return this.simulateAnomalyDetection(data);
    }

    try {
      const prompt = `
        Analise os seguintes dados de performance e comportamento do usuário para detectar anomalias:
        
        Dados: ${JSON.stringify(data, null, 2)}
        
        Identifique:
        1. Padrões anômalos nos dados
        2. Pontuação de anomalia (0-100)
        3. Fatores que contribuem para a anomalia
        4. Impacto potencial (baixo, médio, alto)
        
        Responda em JSON:
        {
          "anomalies": [
            {
              "isAnomaly": boolean,
              "score": number,
              "factors": [string],
              "impact": "low|medium|high"
            }
          ]
        }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 1000,
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.anomalies || [];
    } catch (error) {
      console.error('AI Anomaly Detection Error:', error);
      return this.simulateAnomalyDetection(data);
    }
  }

  // Predictive Analytics
  async predictMetrics(historicalData: any[]): Promise<Prediction[]> {
    if (!process.env.VITE_OPENAI_API_KEY) {
      return this.simulatePredictions(historicalData);
    }

    try {
      const prompt = `
        Analise os dados históricos e faça previsões para os próximos 7 dias:
        
        Dados históricos: ${JSON.stringify(historicalData, null, 2)}
        
        Preveja:
        1. Taxa de conversão
        2. Tempo médio de sessão
        3. Taxa de rejeição
        4. Usuários ativos
        
        Responda em JSON:
        {
          "predictions": [
            {
              "metric": string,
              "currentValue": number,
              "predictedValue": number,
              "confidence": number,
              "timeframe": "7_days",
              "trend": "increasing|decreasing|stable"
            }
          ]
        }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 1000,
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.predictions || [];
    } catch (error) {
      console.error('AI Prediction Error:', error);
      return this.simulatePredictions(historicalData);
    }
  }

  // Smart Recommendations
  async generateRecommendations(data: any): Promise<string[]> {
    if (!process.env.VITE_OPENAI_API_KEY) {
      return this.simulateRecommendations(data);
    }

    try {
      const prompt = `
        Analise os dados de performance e comportamento do usuário e gere recomendações inteligentes para otimização:
        
        Dados: ${JSON.stringify(data, null, 2)}
        
        Gere 5 recomendações específicas e acionáveis para:
        1. Melhorar a experiência do usuário
        2. Aumentar conversões
        3. Otimizar performance
        4. Reduzir taxas de rejeição
        5. Melhorar engajamento
        
        Responda apenas com uma lista de strings, uma por linha.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 500,
      });

      const recommendations = response.choices[0].message.content
        ?.split('\n')
        .filter(rec => rec.trim().length > 0)
        .slice(0, 5) || [];

      return recommendations;
    } catch (error) {
      console.error('AI Recommendations Error:', error);
      return this.simulateRecommendations(data);
    }
  }

  // Smart Alerts
  async generateSmartAlerts(data: any): Promise<SmartAlert[]> {
    if (!process.env.VITE_OPENAI_API_KEY) {
      return this.simulateSmartAlerts(data);
    }

    try {
      const prompt = `
        Analise os dados e gere alertas inteligentes baseados em padrões e tendências:
        
        Dados: ${JSON.stringify(data, null, 2)}
        
        Gere alertas para:
        1. Performance degradada
        2. Comportamento anômalo
        3. Oportunidades de otimização
        4. Riscos potenciais
        
        Responda em JSON:
        {
          "alerts": [
            {
              "condition": string,
              "threshold": number,
              "currentValue": number,
              "action": string,
              "priority": "low|medium|high|critical"
            }
          ]
        }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 800,
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.alerts || [];
    } catch (error) {
      console.error('AI Smart Alerts Error:', error);
      return this.simulateSmartAlerts(data);
    }
  }

  // Comprehensive AI Analysis
  async performComprehensiveAnalysis(data: any): Promise<AIAnalysis[]> {
    const analyses: AIAnalysis[] = [];

    try {
      // Anomaly Detection
      const anomalies = await this.detectAnomalies(data.performance || []);
      anomalies.forEach((anomaly, index) => {
        if (anomaly.isAnomaly) {
          analyses.push({
            type: 'anomaly',
            severity: anomaly.impact === 'high' ? 'high' : anomaly.impact === 'medium' ? 'medium' : 'low',
            confidence: anomaly.score / 100,
            title: `Anomalia Detectada #${index + 1}`,
            description: `Detectada anomalia com pontuação ${anomaly.score}/100`,
            insights: anomaly.factors,
            recommendations: ['Investigar causa raiz', 'Monitorar tendências'],
            data: anomaly,
            timestamp: new Date(),
          });
        }
      });

      // Predictions
      const predictions = await this.predictMetrics(data.historical || []);
      predictions.forEach((prediction) => {
        analyses.push({
          type: 'prediction',
          severity: prediction.confidence > 0.8 ? 'high' : prediction.confidence > 0.6 ? 'medium' : 'low',
          confidence: prediction.confidence,
          title: `Previsão: ${prediction.metric}`,
          description: `${prediction.metric} previsto: ${prediction.predictedValue} (atual: ${prediction.currentValue})`,
          insights: [`Tendência: ${prediction.trend}`, `Confiança: ${(prediction.confidence * 100).toFixed(1)}%`],
          recommendations: prediction.trend === 'decreasing' ? ['Investigar causas', 'Implementar otimizações'] : ['Manter estratégia atual'],
          data: prediction,
          timestamp: new Date(),
        });
      });

      // Recommendations
      const recommendations = await this.generateRecommendations(data);
      analyses.push({
        type: 'recommendation',
        severity: 'medium',
        confidence: 0.7,
        title: 'Recomendações de Otimização',
        description: `${recommendations.length} recomendações geradas`,
        insights: recommendations.slice(0, 3),
        recommendations: recommendations,
        data: { count: recommendations.length },
        timestamp: new Date(),
      });

      // Smart Alerts
      const alerts = await this.generateSmartAlerts(data);
      alerts.forEach((alert) => {
        analyses.push({
          type: 'alert',
          severity: alert.priority,
          confidence: 0.8,
          title: `Alerta: ${alert.condition}`,
          description: `${alert.condition} - Valor atual: ${alert.currentValue}, Limite: ${alert.threshold}`,
          insights: [alert.action],
          recommendations: [alert.action],
          data: alert,
          timestamp: new Date(),
        });
      });

      // Store analysis history
      this.analysisHistory.push(...analyses);
      if (this.analysisHistory.length > 100) {
        this.analysisHistory = this.analysisHistory.slice(-100);
      }

    } catch (error) {
      console.error('Comprehensive AI Analysis Error:', error);
    }

    return analyses;
  }

  // Get Analysis History
  getAnalysisHistory(): AIAnalysis[] {
    return this.analysisHistory;
  }

  // Clear Analysis History
  clearAnalysisHistory() {
    this.analysisHistory = [];
  }

  // Simulation methods for when OpenAI is not available
  private simulateAnomalyDetection(data: any[]): AnomalyDetection[] {
    const anomalies: AnomalyDetection[] = [];
    
    if (data.length > 10) {
      const randomAnomaly = Math.random() > 0.7;
      if (randomAnomaly) {
        anomalies.push({
          isAnomaly: true,
          score: Math.floor(Math.random() * 30) + 70,
          factors: ['Pico de tráfego inesperado', 'Tempo de carregamento elevado'],
          impact: 'medium',
        });
      }
    }
    
    return anomalies;
  }

  private simulatePredictions(historicalData: any[]): Prediction[] {
    return [
      {
        metric: 'Taxa de Conversão',
        currentValue: 2.5,
        predictedValue: 2.8,
        confidence: 0.85,
        timeframe: '7_days',
        trend: 'increasing',
      },
      {
        metric: 'Tempo de Sessão',
        currentValue: 180,
        predictedValue: 175,
        confidence: 0.72,
        timeframe: '7_days',
        trend: 'decreasing',
      },
    ];
  }

  private simulateRecommendations(data: any): string[] {
    return [
      'Otimizar imagens para reduzir tempo de carregamento em 30%',
      'Implementar lazy loading para melhorar Core Web Vitals',
      'Adicionar micro-interações para aumentar engajamento',
      'Simplificar formulários para reduzir abandono',
      'Implementar cache inteligente para melhorar performance',
    ];
  }

  private simulateSmartAlerts(data: any): SmartAlert[] {
    return [
      {
        condition: 'Taxa de rejeição > 60%',
        threshold: 60,
        currentValue: 65,
        action: 'Investigar causas e otimizar landing page',
        priority: 'high',
      },
      {
        condition: 'Tempo de carregamento > 3s',
        threshold: 3000,
        currentValue: 3200,
        action: 'Otimizar assets e implementar CDN',
        priority: 'medium',
      },
    ];
  }
}

// Export singleton instance
export const ai = AIService.getInstance();
