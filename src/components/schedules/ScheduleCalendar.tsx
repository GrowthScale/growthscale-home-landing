import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleEvent {
  id: string;
  title: string;
  date: Date;
  type: 'morning' | 'afternoon' | 'night';
  status: 'approved' | 'pending' | 'warning';
  employees: string[];
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

export function ScheduleCalendar() {
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
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'morning': return '☀️';
      case 'afternoon': return '🌤️';
      case 'night': return '🌙';
      default: return '⏰';
    }
  };

  const getEventsForDay = (day: number) => {
    return mockEvents.filter(event => 
      event.date.getDate() === day && 
      event.date.getMonth() === currentDate.getMonth()
    );
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
          <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Hoje
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
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
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted">
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
                        <span className="mr-1">{getTypeIcon(event.type)}</span>
                        {event.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{events.length - 2} mais
                      </div>
                    )}
                  </div>
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
                <span className="text-xl">{getTypeIcon(selectedEvent.type)}</span>
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
              </div>
              <Badge className={getStatusColor(selectedEvent.status)}>
                {selectedEvent.status === 'approved' ? 'Aprovado' : 
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
              {selectedEvent.status === 'warning' && (
                <div className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Equipe incompleta - Necessário mais funcionários</span>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
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