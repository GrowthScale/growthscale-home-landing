import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'vacation';
  startDate: string;
  lastUpdate: string;
  avatar?: string;
  address: string;
  salary: string;
  skills: string[];
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@growthscale.com',
    phone: '(11) 99999-1234',
    position: 'Vendedor',
    department: 'Vendas',
    status: 'active',
    startDate: '15/01/2023',
    lastUpdate: '10/08/2024 14:30',
    address: 'São Paulo, SP',
    salary: 'R$ 3.500,00',
    skills: ['Atendimento', 'Caixa', 'Vendas']
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@growthscale.com',
    phone: '(11) 99999-5678',
    position: 'Supervisora',
    department: 'Vendas',
    status: 'active',
    startDate: '03/05/2022',
    lastUpdate: '09/08/2024 16:45',
    address: 'São Paulo, SP',
    salary: 'R$ 5.200,00',
    skills: ['Liderança', 'Supervisão', 'Treinamento']
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@growthscale.com',
    phone: '(11) 99999-9012',
    position: 'Estoquista',
    department: 'Estoque',
    status: 'vacation',
    startDate: '20/11/2023',
    lastUpdate: '05/08/2024 09:15',
    address: 'Guarulhos, SP',
    salary: 'R$ 2.800,00',
    skills: ['Organização', 'Conferência', 'Logística']
  },
  {
    id: '4',
    name: 'Ana Lima',
    email: 'ana.lima@growthscale.com',
    phone: '(11) 99999-3456',
    position: 'Gerente',
    department: 'Administração',
    status: 'active',
    startDate: '12/08/2021',
    lastUpdate: '11/08/2024 11:20',
    address: 'São Paulo, SP',
    salary: 'R$ 8.500,00',
    skills: ['Gestão', 'Planejamento', 'Estratégia']
  },
  {
    id: '5',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@growthscale.com',
    phone: '(11) 99999-7890',
    position: 'Segurança',
    department: 'Segurança',
    status: 'inactive',
    startDate: '30/07/2024',
    lastUpdate: '01/08/2024 08:00',
    address: 'São Paulo, SP',
    salary: 'R$ 2.200,00',
    skills: ['Vigilância', 'Primeiros Socorros']
  }
];

interface EmployeeTableProps {
  onEmployeeSelect: (employee: Employee) => void;
  selectedEmployee: Employee | null;
}

export function EmployeeTable({ onEmployeeSelect, selectedEmployee }: EmployeeTableProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'vacation': return <Clock className="h-4 w-4 text-accent" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'vacation': return 'Férias';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'vacation': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'outline';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Lista de Funcionários</span>
          <Badge variant="outline" className="ml-auto">
            {mockEmployees.length} funcionários
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Funcionário</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ingresso</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEmployees.map((employee) => (
              <TableRow 
                key={employee.id} 
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedEmployee?.id === employee.id ? 'bg-primary/5 border-primary/20' : ''
                }`}
                onClick={() => onEmployeeSelect(employee)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.position}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{employee.department}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(employee.status)}
                    <span className="capitalize">{getStatusLabel(employee.status)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.startDate}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {employee.lastUpdate}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEmployeeSelect(employee)}>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {mockEmployees.map((employee) => (
        <Card 
          key={employee.id} 
          className={`hover:shadow-soft transition-all cursor-pointer ${
            selectedEmployee?.id === employee.id ? 'border-primary shadow-elegant' : ''
          }`}
          onClick={() => onEmployeeSelect(employee)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
              </div>
              <Badge variant={getStatusVariant(employee.status) as any}>
                {getStatusLabel(employee.status)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="truncate">{employee.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span>Desde {employee.startDate}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <Badge variant="outline" className="text-xs">
                  {employee.department}
                </Badge>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEmployeeSelect(employee); }}>
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
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
        <h3 className="text-lg font-semibold">Funcionários</h3>
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