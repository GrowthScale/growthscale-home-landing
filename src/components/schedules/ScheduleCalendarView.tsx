import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Users, 
  Clock,
  X,
  Loader2
} from 'lucide-react';

interface EditorShiftData {
  id?: string;
  schedule_id?: string;
  date: string;
  startTime: string;
  endTime: string;
  employeeId: string;
  employeeName?: string;
  employeePosition?: string;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department?: string;
  hourly_rate?: number;
}

interface ScheduleCalendarViewProps {
  shifts: EditorShiftData[];
  employees: Employee[];
  onShiftsChange: (shifts: EditorShiftData[]) => void;
  startDate: string;
  endDate: string;
}

export function ScheduleCalendarView({
  shifts,
  employees,
  onShiftsChange,
  startDate,
  endDate
}: ScheduleCalendarViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [shiftStartTime, setShiftStartTime] = useState('08:00');
  const [shiftEndTime, setShiftEndTime] = useState('17:00');
  const [shiftDate, setShiftDate] = useState(new Date().toISOString().split('T')[0]);

  // Gerar array de datas entre startDate e endDate
  const generateDateRange = () => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toISOString().split('T')[0]);
    }
    return dates;
  };

  const dates = generateDateRange();

  const handleAddShift = () => {
    if (!selectedEmployee || !shiftDate) return;

    const employee = employees.find(emp => emp.id === selectedEmployee);
    if (!employee) return;

    const newShift: EditorShiftData = {
      date: shiftDate,
      startTime: shiftStartTime,
      endTime: shiftEndTime,
      employeeId: selectedEmployee,
      employeeName: employee.name,
      employeePosition: employee.position,
    };

    onShiftsChange([...shifts, newShift]);
    setIsOpen(false);
    
    // Reset form
    setSelectedEmployee('');
    setShiftStartTime('08:00');
    setShiftEndTime('17:00');
    setShiftDate(new Date().toISOString().split('T')[0]);
  };

  const handleRemoveShift = (index: number) => {
    const newShifts = shifts.filter((_, i) => i !== index);
    onShiftsChange(newShifts);
  };

  const getShiftsForDate = (date: string) => {
    return shifts.filter(shift => shift.date === date);
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  const getDayNumber = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Calendário de Escalas</CardTitle>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Turno
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Turno</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Funcionário */}
                <div className="space-y-2">
                  <Label htmlFor="employee">Funcionário</Label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data */}
                <div className="space-y-2">
                  <Label htmlFor="shift-date">Data</Label>
                  <Input
                    id="shift-date"
                    type="date"
                    value={shiftDate}
                    onChange={(e) => setShiftDate(e.target.value)}
                    min={startDate}
                    max={endDate}
                  />
                </div>

                {/* Horário de Início */}
                <div className="space-y-2">
                  <Label htmlFor="start-time">Horário de Início</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={shiftStartTime}
                    onChange={(e) => setShiftStartTime(e.target.value)}
                  />
                </div>

                {/* Horário de Fim */}
                <div className="space-y-2">
                  <Label htmlFor="end-time">Horário de Fim</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={shiftEndTime}
                    onChange={(e) => setShiftEndTime(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddShift} disabled={!selectedEmployee}>
                    Adicionar Turno
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Grid do Calendário */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {/* Cabeçalho dos dias da semana */}
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="text-center font-medium text-sm text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Grid das datas */}
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date) => {
            const dayShifts = getShiftsForDate(date);
            const isToday = date === new Date().toISOString().split('T')[0];
            
            return (
              <div
                key={date}
                className={`min-h-[120px] p-2 border rounded-lg ${
                  isToday ? 'bg-primary/10 border-primary' : 'bg-card border-border'
                }`}
              >
                {/* Data */}
                <div className="text-center mb-2">
                  <div className="text-xs text-muted-foreground">
                    {getDayName(date)}
                  </div>
                  <div className={`font-semibold ${isToday ? 'text-primary' : ''}`}>
                    {getDayNumber(date)}
                  </div>
                </div>

                {/* Turnos do dia */}
                <div className="space-y-1">
                  {dayShifts.map((shift, index) => (
                    <div
                      key={index}
                      className="bg-primary/20 border border-primary/30 rounded p-1 text-xs"
                    >
                      <div className="font-medium truncate">
                        {shift.employeeName}
                      </div>
                      <div className="text-muted-foreground">
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 ml-auto"
                        onClick={() => handleRemoveShift(shifts.indexOf(shift))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lista de Turnos */}
        {shifts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Todos os Turnos Agendados</h3>
            <div className="space-y-2">
              {shifts.map((shift, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{shift.employeeName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(shift.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveShift(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {shifts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Nenhum turno agendado ainda.</p>
            <p className="text-sm">Clique em "Adicionar Turno" para começar.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
