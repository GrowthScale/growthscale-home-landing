import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Calendar, 
  Users, 
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

interface ScheduleHeaderProps {
  scheduleName: string;
  onScheduleNameChange: (name: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  status: 'draft' | 'published' | 'archived';
  onStatusChange: (status: 'draft' | 'published' | 'archived') => void;
  onSave: () => void;
  isSaving: boolean;
  shiftsCount: number;
  employeesCount: number;
}

export function ScheduleHeader({
  scheduleName,
  onScheduleNameChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  status,
  onStatusChange,
  onSave,
  isSaving,
  shiftsCount,
  employeesCount
}: ScheduleHeaderProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">Editor de Escalas</CardTitle>
              <p className="text-muted-foreground">
                Crie e gerencie escalas inteligentes para sua equipe
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={status === 'published' ? 'default' : 'secondary'}>
              {status === 'draft' ? 'Rascunho' : status === 'published' ? 'Publicado' : 'Arquivado'}
            </Badge>
            <Button 
              onClick={onSave} 
              disabled={isSaving}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar e Publicar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nome da Escala */}
          <div className="space-y-2">
            <Label htmlFor="schedule-name">Nome da Escala</Label>
            <Input
              id="schedule-name"
              value={scheduleName}
              onChange={(e) => onScheduleNameChange(e.target.value)}
              placeholder="Ex: Escala Semanal"
            />
          </div>

          {/* Data de Início */}
          <div className="space-y-2">
            <Label htmlFor="start-date">Data de Início</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
            />
          </div>

          {/* Data de Fim */}
          <div className="space-y-2">
            <Label htmlFor="end-date">Data de Fim</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: 'draft' | 'published' | 'archived') => onStatusChange(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="flex items-center space-x-6 mt-6 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {employeesCount} funcionários
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {shiftsCount} turnos agendados
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
