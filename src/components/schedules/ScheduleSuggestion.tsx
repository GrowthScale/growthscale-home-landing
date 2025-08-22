import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bot, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import { type ScheduleSuggestionResponse, type ScheduleSuggestion } from '@/services/api';
import { cn } from '@/lib/utils';

interface ScheduleSuggestionProps {
  suggestion: ScheduleSuggestionResponse;
  employees: Array<{ id: string; name: string; workload: number }>;
  shifts: Array<{ id: string; startTime: string; endTime: string; requiredSkill?: string }>;
  onApplySuggestion?: (suggestion: ScheduleSuggestionResponse) => void;
  onClearSuggestion?: () => void;
  className?: string;
}

export const ScheduleSuggestion: React.FC<ScheduleSuggestionProps> = ({
  suggestion,
  employees,
  shifts,
  onApplySuggestion,
  onClearSuggestion,
  className = ''
}) => {
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.name || employeeId;
  };

  const getShiftInfo = (shiftId: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) {return { startTime: '', endTime: '', requiredSkill: '' };}
    
    const startTime = new Date(shift.startTime).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const endTime = new Date(shift.endTime).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return {
      startTime,
      endTime,
      requiredSkill: shift.requiredSkill || 'Qualquer'
    };
  };

  const getSuggestionStats = () => {
    const totalSuggestions = suggestion.suggestion.length;
    const uniqueEmployees = new Set(suggestion.suggestion.map(s => s.employeeId)).size;
    const uniqueShifts = new Set(suggestion.suggestion.map(s => s.shiftId)).size;
    const coverage = shifts.length > 0 ? (uniqueShifts / shifts.length) * 100 : 0;

    return {
      totalSuggestions,
      uniqueEmployees,
      uniqueShifts,
      coverage: Math.round(coverage)
    };
  };

  const stats = getSuggestionStats();

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle>Sugestão de Escala - IA</CardTitle>
          </div>
          {onClearSuggestion && (
            <Button variant="ghost" size="sm" onClick={onClearSuggestion}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalSuggestions}</div>
            <div className="text-xs text-muted-foreground">Alocações</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.uniqueEmployees}</div>
            <div className="text-xs text-muted-foreground">Funcionários</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.uniqueShifts}</div>
            <div className="text-xs text-muted-foreground">Turnos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.coverage}%</div>
            <div className="text-xs text-muted-foreground">Cobertura</div>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Alocações Sugeridas
          </h4>
          
          <ScrollArea className="h-64 border rounded-lg p-4">
            <div className="space-y-3">
              {suggestion.suggestion.map((item, index) => {
                const employeeName = getEmployeeName(item.employeeId);
                const shiftInfo = getShiftInfo(item.shiftId);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{employeeName}</p>
                        <p className="text-xs text-muted-foreground">
                          {shiftInfo.startTime} - {shiftInfo.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {shiftInfo.requiredSkill && shiftInfo.requiredSkill !== 'Qualquer' && (
                        <Badge variant="outline" className="text-xs">
                          {shiftInfo.requiredSkill}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        Turno {item.shiftId}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Actions */}
        {onApplySuggestion && (
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              onClick={() => onApplySuggestion(suggestion)}
              className="flex-1"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Aplicar Sugestão
            </Button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-accent border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-accent">
              Sugestão Gerada por IA
            </p>
            <p className="text-xs text-accent">
              Esta sugestão foi gerada automaticamente. Revise as alocações antes de aplicar.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Loading component
export const ScheduleSuggestionSkeleton: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-48" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <ScrollArea className="h-64 border rounded-lg p-4">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
