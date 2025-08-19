import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Scale, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EquityScoreProps {
  value: number;
  message: string;
  className?: string;
}

export function EquityScore({ value, message, className = '' }: EquityScoreProps) {
  const getEquityColor = (score: number) => {
    if (score >= 75) {return 'text-green-600';}
    if (score >= 50) {return 'text-yellow-600';}
    return 'text-red-600';
  };

  const getEquityBadgeVariant = (score: number) => {
    if (score >= 75) {return 'default';}
    if (score >= 50) {return 'secondary';}
    return 'destructive';
  };

  const getEquityIcon = (score: number) => {
    if (score >= 75) {return <TrendingUp className="h-4 w-4" />;}
    if (score >= 50) {return <Minus className="h-4 w-4" />;}
    return <TrendingDown className="h-4 w-4" />;
  };

  const getEquityStatus = (score: number) => {
    if (score >= 75) {return 'Excelente';}
    if (score >= 50) {return 'Regular';}
    return 'Crítico';
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Placar de Equidade</CardTitle>
          </div>
          <Badge variant={getEquityBadgeVariant(value)} className="flex items-center gap-1">
            {getEquityIcon(value)}
            {getEquityStatus(value)}
          </Badge>
        </div>
        <CardDescription>
          Distribuição justa de turnos de fim de semana entre funcionários
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pontuação de Equidade</span>
            <span className={`font-semibold ${getEquityColor(value)}`}>
              {value}/100
            </span>
          </div>
          <Progress value={value} className="h-2" />
        </div>
        
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-semibold text-green-600">75-100</div>
            <div className="text-muted-foreground">Excelente</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-yellow-600">50-74</div>
            <div className="text-muted-foreground">Regular</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-red-600">0-49</div>
            <div className="text-muted-foreground">Crítico</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EquityScore;
