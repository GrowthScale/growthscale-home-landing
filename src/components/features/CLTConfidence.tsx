import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CLTConfidenceProps {
  confidence: number;
  className?: string;
  showProgress?: boolean;
  showIcon?: boolean;
}

export function CLTConfidence({ 
  confidence, 
  className = '',
  showProgress = true,
  showIcon = true 
}: CLTConfidenceProps) {
  const getConfidenceLevel = (value: number) => {
    if (value >= 0.9) {return { level: 'Muito Alta', color: 'text-accent', bgColor: 'bg-accent/10' };}
    if (value >= 0.7) {return { level: 'Alta', color: 'text-primary', bgColor: 'bg-primary/10' };}
    if (value >= 0.5) {return { level: 'Média', color: 'text-accent', bgColor: 'bg-accent/10' };}
    if (value >= 0.3) {return { level: 'Baixa', color: 'text-orange-600', bgColor: 'bg-orange-100' };}
    return { level: 'Muito Baixa', color: 'text-destructive', bgColor: 'bg-destructive/10' };
  };

  const getConfidenceIcon = (value: number) => {
    if (value >= 0.8) {return CheckCircle;}
    if (value >= 0.6) {return TrendingUp;}
    if (value >= 0.4) {return Info;}
    return AlertTriangle;
  };

  const confidenceInfo = getConfidenceLevel(confidence);
  const ConfidenceIcon = getConfidenceIcon(confidence);

  return (
    <div className={cn("flex items-center gap-3 p-3 border rounded-lg", className)}>
      {showIcon && (
        <div className={cn("p-2 rounded-full", confidenceInfo.bgColor)}>
          <ConfidenceIcon className={cn("w-4 h-4", confidenceInfo.color)} />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-muted-foreground">
            Confiança da resposta
          </span>
          <Badge 
            variant="secondary" 
            className={cn("text-xs", confidenceInfo.bgColor, confidenceInfo.color)}
          >
            {confidenceInfo.level}
          </Badge>
        </div>
        
        {showProgress && (
          <div className="space-y-1">
            <Progress 
              value={confidence * 100} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>{Math.round(confidence * 100)}%</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
