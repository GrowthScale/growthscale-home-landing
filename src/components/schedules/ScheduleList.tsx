import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar,
  Clock,
  Users,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ScheduleItem {
  id: string;
  date: string;
  shift: {
    type: 'morning' | 'afternoon' | 'night';
    time: string;
    icon: string;
  };
  employees: {
    id: string;
    name: string;
    initials: string;
  }[];
  department: string;
  status: 'approved' | 'pending' | 'warning';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const mockSchedules: ScheduleItem[] = [
  {
    id: '1',
    date: '15/08/2024',
    shift: { type: 'morning', time: '06:00 - 14:00', icon: '☀️' },
    employees: [
      { id: '1', name: 'João Silva', initials: 'JS' },
      { id: '2', name: 'Maria Santos', initials: 'MS' }
    ],
    department: 'Vendas',
    status: 'approved',
    notes: 'Escala otimizada pela IA',
    createdAt: '14/08/2024 15:30',
    updatedAt: '14/08/2024 16:45'
  },
  {
    id: '2',
    date: '15/08/2024',
    shift: { type: 'afternoon', time: '14:00 - 22:00', icon: '🌤️' },
    employees: [
      { id: '3', name: 'Pedro Costa', initials: 'PC' },
      { id: '4', name: 'Ana Lima', initials: 'AL' }
    ],
    department: 'Vendas',
    status: 'pending',
    createdAt: '14/08/2024 10:15',
    updatedAt: '14/08/2024 10:15'
  },
  {
    id: '3',
    date: '16/08/2024',
    shift: { type: 'night', time: '22:00 - 06:00', icon: '🌙' },
    employees: [
      { id: '5', name: 'Carlos Oliveira', initials: 'CO' }
    ],
    department: 'Segurança',
    status: 'warning',
    notes: 'Equipe incompleta - necessário mais um funcionário',
    createdAt: '13/08/2024 09:20',
    updatedAt: '14/08/2024 14:30'
  },
  {
    id: '4',
    date: '17/08/2024',
    shift: { type: 'morning', time: '06:00 - 14:00', icon: '☀️' },
    employees: [
      { id: '1', name: 'João Silva', initials: 'JS' },
      { id: '3', name: 'Pedro Costa', initials: 'PC' },
      { id: '4', name: 'Ana Lima', initials: 'AL' }
    ],
    department: 'Vendas',
    status: 'approved',
    createdAt: '15/08/2024 08:45',
    updatedAt: '15/08/2024 08:45'
  }
];

export function ScheduleList() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending': return <Clock3 className="h-4 w-4 text-accent" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'warning': return 'Alerta';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'warning': return 'destructive';
      default: return 'outline';
    }
  };

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Escalas Recentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Turno</TableHead>
              <TableHead>Funcionários</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSchedules.map((schedule) => (
              <TableRow key={schedule.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{schedule.date}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{schedule.shift.icon}</span>
                    <div>
                      <p className="font-medium">{schedule.shift.time}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {schedule.shift.type}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {schedule.employees.slice(0, 3).map((employee) => (
                        <Avatar key={employee.id} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {schedule.employees.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            +{schedule.employees.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {schedule.employees.length} funcionário{schedule.employees.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{schedule.department}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(schedule.status)}
                    <span className="capitalize">{getStatusLabel(schedule.status)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {schedule.updatedAt}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderCardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockSchedules.map((schedule) => (
        <Card key={schedule.id} className="hover:shadow-soft transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{schedule.shift.icon}</span>
                <div>
                  <p className="font-semibold">{schedule.date}</p>
                  <p className="text-sm text-muted-foreground">{schedule.shift.time}</p>
                </div>
              </div>
              <Badge variant={getStatusVariant(schedule.status) as "default" | "secondary" | "destructive" | "outline"}>
                {getStatusLabel(schedule.status)}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {schedule.employees.length} funcionário{schedule.employees.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {schedule.employees.map((employee) => (
                  <Badge key={employee.id} variant="outline" className="text-xs">
                    {employee.name}
                  </Badge>
                ))}
              </div>

              {schedule.notes && (
                <p className="text-sm text-muted-foreground italic">
                  {schedule.notes}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">
                  {schedule.department}
                </span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Lista de Escalas</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Tabela
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? renderTableView() : renderCardsView()}
    </div>
  );
}