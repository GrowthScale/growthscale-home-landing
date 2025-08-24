import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  ShieldCheck,
  Lightbulb,
  Loader2
} from 'lucide-react';

interface ValidationViolation {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  employeeId?: string;
  shiftId?: string;
}

interface ValidationSuggestion {
  type: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
  shiftId?: string;
}

interface ValidationResult {
  data?: {
    violations?: ValidationViolation[];
    suggestions?: ValidationSuggestion[];
    summary?: {
      totalViolations: number;
      criticalViolations: number;
      warningViolations: number;
    };
  };
  isLoading?: boolean;
  error?: any;
}

interface CostResult {
  data?: {
    totalCost: number;
    breakdown: {
      employeeId: string;
      employeeName: string;
      hours: number;
      cost: number;
    }[];
    summary: {
      totalHours: number;
      averageHourlyRate: number;
    };
  };
  isLoading?: boolean;
  error?: any;
}

interface IntelligencePanelProps {
  validationResult: ValidationResult;
  costResult: CostResult;
}

export function IntelligencePanel({
  validationResult,
  costResult
}: IntelligencePanelProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'warning':
        return 'bg-yellow-500 text-yellow-900';
      case 'info':
        return 'bg-blue-500 text-blue-900';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-500 text-green-900';
      case 'medium':
        return 'bg-yellow-500 text-yellow-900';
      case 'low':
        return 'bg-blue-500 text-blue-900';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* 🧠 Painel de Validação CLT */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle>Análise de Risco CLT</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {validationResult.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Analisando escalas...</span>
            </div>
          ) : validationResult.error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Erro ao analisar escalas: {validationResult.error.message}
              </AlertDescription>
            </Alert>
          ) : validationResult.data ? (
            <div className="space-y-4">
              {/* Resumo */}
              {validationResult.data.summary && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-bold text-destructive">
                      {validationResult.data.summary.criticalViolations}
                    </div>
                    <div className="text-xs text-muted-foreground">Críticas</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-bold text-yellow-600">
                      {validationResult.data.summary.warningViolations}
                    </div>
                    <div className="text-xs text-muted-foreground">Avisos</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-bold text-primary">
                      {validationResult.data.summary.totalViolations}
                    </div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              )}

              {/* Violações */}
              {validationResult.data.violations && validationResult.data.violations.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Violações Detectadas</h4>
                  {validationResult.data.violations.slice(0, 5).map((violation, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-muted rounded">
                      {getSeverityIcon(violation.severity)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(violation.severity)}>
                            {violation.type}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{violation.message}</p>
                      </div>
                    </div>
                  ))}
                  {validationResult.data.violations.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{validationResult.data.violations.length - 5} mais violações
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhuma violação CLT detectada!
                  </p>
                </div>
              )}

              {/* Sugestões */}
              {validationResult.data.suggestions && validationResult.data.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Sugestões de Melhoria</h4>
                  {validationResult.data.suggestions.slice(0, 3).map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                      <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getImpactColor(suggestion.impact)}>
                            {suggestion.impact === 'high' ? 'Alto Impacto' : 
                             suggestion.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{suggestion.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <ShieldCheck className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">Adicione turnos para análise automática</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 💰 Simulador de Custos */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle>Simulador de Custos</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {costResult.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Calculando custos...</span>
            </div>
          ) : costResult.error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Erro ao calcular custos: {costResult.error.message}
              </AlertDescription>
            </Alert>
          ) : costResult.data ? (
            <div className="space-y-4">
              {/* Custo Total */}
              <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(costResult.data.totalCost)}
                </div>
                <p className="text-sm text-muted-foreground">Custo Total da Escala</p>
              </div>

              {/* Resumo */}
              {costResult.data.summary && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-bold">
                      {costResult.data.summary.totalHours}h
                    </div>
                    <div className="text-xs text-muted-foreground">Total Horas</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-bold">
                      {formatCurrency(costResult.data.summary.averageHourlyRate)}
                    </div>
                    <div className="text-xs text-muted-foreground">Taxa Média</div>
                  </div>
                </div>
              )}

              {/* Breakdown por Funcionário */}
              {costResult.data.breakdown && costResult.data.breakdown.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Custos por Funcionário</h4>
                  <div className="space-y-1">
                    {costResult.data.breakdown.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                        <div className="flex-1">
                          <div className="font-medium truncate">{item.employeeName}</div>
                          <div className="text-muted-foreground">{item.hours}h</div>
                        </div>
                        <div className="font-semibold">
                          {formatCurrency(item.cost)}
                        </div>
                      </div>
                    ))}
                    {costResult.data.breakdown.length > 5 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{costResult.data.breakdown.length - 5} mais funcionários
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <DollarSign className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">Adicione turnos para calcular custos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🚀 Dicas de Otimização */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Dicas de Otimização</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Distribua os turnos uniformemente</p>
                <p className="text-xs text-muted-foreground">
                  Evite sobrecarregar funcionários em dias consecutivos
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Respeite os intervalos de descanso</p>
                <p className="text-xs text-muted-foreground">
                  Mínimo 11h entre turnos conforme CLT
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Use a IA para sugestões</p>
                <p className="text-xs text-muted-foreground">
                  Nossa IA analisa padrões e sugere melhorias
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
