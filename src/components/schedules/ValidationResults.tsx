import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  X,
  Info,
  Shield
} from 'lucide-react';
import { type ValidationResult, type ValidationViolation } from '@/services/api';

interface ValidationResultsProps {
  result: ValidationResult;
  onClose?: () => void;
  onFixViolations?: () => void;
  className?: string;
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({
  result,
  onClose,
  onFixViolations,
  className = ''
}) => {
  const { riskScore, violations } = result;

  const criticalViolations = violations.filter(v => v.severity === 'critical');
  const warningViolations = violations.filter(v => v.severity === 'warning');

  const getRiskColor = (score: number) => {
    if (score > 75) {return 'text-destructive';}
    if (score > 50) {return 'text-accent';}
    return 'text-accent';
  };

  const getRiskLabel = (score: number) => {
    if (score > 75) {return 'Alto Risco';}
    if (score > 50) {return 'Risco Moderado';}
    return 'Baixo Risco';
  };

  const getRiskIcon = (score: number) => {
    if (score > 75) {return <AlertTriangle className="h-4 w-4" />;}
    if (score > 50) {return <Clock className="h-4 w-4" />;}
    return <CheckCircle className="h-4 w-4" />;
  };

  const getViolationIcon = (severity: 'critical' | 'warning') => {
    return severity === 'critical' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />;
  };

  const getViolationColor = (severity: 'critical' | 'warning') => {
    return severity === 'critical' ? 'destructive' : 'default';
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Resultado da Validação</CardTitle>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          Análise de conformidade com a legislação trabalhista
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Risk Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Score de Risco</span>
            <div className="flex items-center space-x-2">
              {getRiskIcon(riskScore)}
              <span className={`font-bold ${getRiskColor(riskScore)}`}>
                {getRiskLabel(riskScore)}
              </span>
            </div>
          </div>
          <Progress value={riskScore} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{riskScore}/100</span>
            <span>100</span>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-sm font-medium">{criticalViolations.length}</p>
              <p className="text-xs text-muted-foreground">Violações Críticas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-accent" />
            <div>
              <p className="text-sm font-medium">{warningViolations.length}</p>
              <p className="text-xs text-muted-foreground">Avisos</p>
            </div>
          </div>
        </div>

        {/* Violations */}
        {violations.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Violações Encontradas</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {violations.map((violation, index) => (
                <Alert key={index} variant={getViolationColor(violation.severity)}>
                  <div className="flex items-start space-x-2">
                    {getViolationIcon(violation.severity)}
                    <div className="flex-1">
                      <AlertTitle className="text-sm">
                        {violation.code}
                      </AlertTitle>
                      <AlertDescription className="text-sm">
                        {violation.message}
                      </AlertDescription>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          Funcionário: {violation.employeeId}
                        </Badge>
                        {violation.shiftIds.length > 0 && (
                          <Badge variant="outline" className="text-xs ml-1">
                            Turnos: {violation.shiftIds.length}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Nenhuma violação encontrada!</AlertTitle>
            <AlertDescription>
              A escala está em conformidade com a legislação trabalhista.
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        {violations.length > 0 && onFixViolations && (
          <div className="flex space-x-2">
            <Button 
              onClick={onFixViolations}
              variant={criticalViolations.length > 0 ? "destructive" : "default"}
              className="flex-1"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Corrigir Violações
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
