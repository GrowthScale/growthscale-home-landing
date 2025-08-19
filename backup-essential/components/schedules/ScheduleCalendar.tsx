import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, AlertTriangle, Sparkles, Sun, Cloud, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleEvent {
  id: string;
  title: string;
  date: Date;
  type: 'morning' | 'afternoon' | 'night';
  status: 'approved' | 'pending' | 'warning';
  employees: string[];
}

interface PreviewShift {
  shiftId: string;
  employeeId: string;
}

interface ScheduleCalendarProps {
  previewShifts?: PreviewShift[] | null;
  employees?: { id: string; name: string }[];
  onPreviewClick?: (event: ScheduleEvent) => void;
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Turno Manhã - Equipe A',
    date: new Date(2024, 7, 15),
    type: 'morning',
    status: 'approved',
    employees: ['João Silva', 'Maria Santos']
  },
  {
    id: '2',
    title: 'Turno Tarde - Equipe B',
    date: new Date(2024, 7, 15),
    type: 'afternoon',
    status: 'pending',
    employees: ['Pedro Costa', 'Ana Lima']
  },
  {
    id: '3',
    title: 'Turno Noite - Equipe C',
    date: new Date(2024, 7, 16),
    type: 'night',
    status: 'warning',
    employees: ['Carlos Oliveira']
  }
];

const mockEmployees = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Santos' },
  { id: '3', name: 'Pedro Costa' },
  { id: '4', name: 'Ana Lima' },
  { id: '5', name: 'Carlos Oliveira' }
];

export function ScheduleCalendar({ 
  previewShifts = null, 
  employees = mockEmployees,
  onPreviewClick 
}: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'warning': return 'bg-destructive text-destructive-foreground';
              default: return 'bg-muted text-foreground/80';
    }
  };

  const getTypeIcon = (type: string): LucideIcon => {
    switch (type) {
      case 'morning': return Sun;
      case 'afternoon': return Cloud;
      case 'night': return Moon;
      default: return Clock;
    }
  };

  const TypeIcon = ({ type, className }: { type: string; className?: string }) => {
    const IconComponent = getTypeIcon(type);
    return <IconComponent className={className} />;
  };

  const getEventsForDay = (day: number) => {
    return mockEvents.filter(event => 
      event.date.getDate() === day && 
      event.date.getMonth() === currentDate.getMonth()
    );
  };

  const getPreviewEventsForDay = (day: number) => {
    if (!previewShifts) {return [];}
    
    // Simular eventos de preview baseados nas sugestões de IA
    const previewEvents: ScheduleEvent[] = [];
    
    previewShifts.forEach((shift, index) => {
      const employee = employees.find(emp => emp.id === shift.employeeId);
      if (employee) {
        previewEvents.push({
          id: `preview-${shift.shiftId}`,
          title: `Sugestão IA - ${employee.name}`,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
          type: 'morning', // Pode ser dinâmico baseado no turno
          status: 'pending',
          employees: [employee.name]
        });
      }
    });
    
    return previewEvents;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')} aria-label="Mês anterior">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} aria-label="Ir para hoje">
            Hoje
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth('next')} aria-label="Próximo mês">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-border">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                              <div key={day} className="p-3 text-center text-sm font-medium text-foreground/80 bg-muted">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="p-2 h-24 border-b border-r border-border" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const events = getEventsForDay(day);
              const previewEvents = getPreviewEventsForDay(day);
              const isToday = new Date().getDate() === day && 
                             new Date().getMonth() === currentDate.getMonth() &&
                             new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div 
                  key={day} 
                  className={cn(
                    "p-2 h-24 border-b border-r border-border hover:bg-muted/50 transition-colors",
                    isToday && "bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "text-sm font-medium mb-1",
                    isToday ? "text-primary font-bold" : "text-foreground"
                  )}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "px-1 py-0.5 rounded text-xs cursor-pointer truncate transition-all hover:shadow-sm",
                          getStatusColor(event.status)
                        )}
                        onClick={() => setSelectedEvent(event)}
                        title={`${event.title} - ${event.employees.join(', ')}`}
                      >
                        <TypeIcon type={event.type} className="h-3 w-3 mr-1 inline" />
                        {event.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{events.length - 2} mais
                      </div>
                    )}
                  </div>
                  
                  {/* Pré-visualização de sugestões de IA */}
                  {previewEvents.length > 0 && (
                    <div className="space-y-1 mt-1">
                      {previewEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "px-1 py-0.5 rounded text-xs cursor-pointer truncate transition-all hover:shadow-sm",
                            "border-2 border-dashed border-primary bg-primary/10 text-primary-foreground opacity-80"
                          )}
                          onClick={() => {
                            setSelectedEvent(event);
                            onPreviewClick?.(event);
                          }}
                          title={`${event.title} - Sugestão de IA`}
                        >
                          <Sparkles className="h-3 w-3 mr-1 inline" />
                          {event.title}
                        </div>
                      ))}
                      {previewEvents.length > 2 && (
                        <div className="text-xs text-primary/70">
                          +{previewEvents.length - 2} sugestões
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Tooltip/Modal */}
      {selectedEvent && (
        <Card className="border-primary shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {selectedEvent.id.startsWith('preview-') ? (
                  <Sparkles className="h-5 w-5 text-primary" />
                ) : (
                  <TypeIcon type={selectedEvent.type} className="h-5 w-5" />
                )}
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
              </div>
              <Badge className={selectedEvent.id.startsWith('preview-') ? 
                "border-2 border-dashed border-primary bg-primary/10 text-primary-foreground" : 
                getStatusColor(selectedEvent.status)}>
                {selectedEvent.id.startsWith('preview-') ? 'Sugestão IA' :
                 selectedEvent.status === 'approved' ? 'Aprovado' : 
                 selectedEvent.status === 'pending' ? 'Pendente' : 'Alerta'}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.date.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.employees.join(', ')}</span>
              </div>
              {selectedEvent.id.startsWith('preview-') && (
                <div className="flex items-center space-x-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Sugestão gerada por IA - Clique para aplicar</span>
                </div>
              )}
              {selectedEvent.status === 'warning' && !selectedEvent.id.startsWith('preview-') && (
                <div className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Equipe incompleta - Necessário mais funcionários</span>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              {selectedEvent.id.startsWith('preview-') && (
                <Button 
                  size="sm" 
                  onClick={() => {
                    onPreviewClick?.(selectedEvent);
                    setSelectedEvent(null);
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Aplicar Sugestão
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(null)}>
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}