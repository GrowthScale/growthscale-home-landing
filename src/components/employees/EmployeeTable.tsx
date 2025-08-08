import React, { useState, useMemo, memo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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

// Memoized status icon component
const StatusIcon = memo(({ status }: { status: string }) => {
  switch (status) {
    case 'active': return <CheckCircle className="h-4 w-4 text-success" aria-label="Funcionário ativo" />;
    case 'vacation': return <Clock className="h-4 w-4 text-accent" aria-label="Funcionário em férias" />;
    case 'inactive': return <XCircle className="h-4 w-4 text-destructive" aria-label="Funcionário inativo" />;
    default: return null;
  }
});

StatusIcon.displayName = 'StatusIcon';

// Memoized employee row component
const EmployeeRow = memo(({ 
  employee, 
  isSelected, 
  onSelect 
}: { 
  employee: Employee; 
  isSelected: boolean; 
  onSelect: (employee: Employee) => void;
}) => {
  const getInitials = useCallback((name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }, []);

  const getStatusLabel = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'vacation': return 'Férias';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  }, []);

  const handleClick = useCallback(() => {
    onSelect(employee);
  }, [employee, onSelect]);

  const handleMenuClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <TableRow 
      className={`cursor-pointer hover:bg-muted/50 transition-colors animate-fade-in ${
        isSelected ? 'bg-primary/5 border-primary/20' : ''
      }`}
      onClick={handleClick}
      role="row"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Funcionário ${employee.name}, clique para ver detalhes`}
    >
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 hover-scale">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground truncate">{employee.name}</p>
            <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="truncate">{employee.position}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="truncate">{employee.department}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <StatusIcon status={employee.status} />
          <span className="capitalize truncate">{getStatusLabel(employee.status)}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {employee.startDate}
      </TableCell>
      <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">
        {employee.lastUpdate}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={handleMenuClick}>
            <Button 
              variant="ghost" 
              size="sm"
              aria-label={`Ações para ${employee.name}`}
              className="hover-scale"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleClick}>
              <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

EmployeeRow.displayName = 'EmployeeRow';

// Memoized employee card component
const EmployeeCard = memo(({ 
  employee, 
  isSelected, 
  onSelect 
}: { 
  employee: Employee; 
  isSelected: boolean; 
  onSelect: (employee: Employee) => void;
}) => {
  const getInitials = useCallback((name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }, []);

  const getStatusLabel = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'vacation': return 'Férias';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  }, []);

  const getStatusVariant = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'vacation': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'outline';
    }
  }, []);

  const handleClick = useCallback(() => {
    onSelect(employee);
  }, [employee, onSelect]);

  const handleActionClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(employee);
  }, [employee, onSelect]);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Card 
      className={`hover:shadow-soft transition-all cursor-pointer animate-fade-in hover-scale ${
        isSelected ? 'border-primary shadow-elegant' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Funcionário ${employee.name}, clique para ver detalhes`}
    >
      <CardContent className="p-spacing-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Avatar className="h-12 w-12 hover-scale">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground truncate">{employee.name}</p>
              <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant(employee.status) as "default" | "secondary" | "destructive" | "outline"} className="shrink-0">
            {getStatusLabel(employee.status)}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="truncate">{employee.email}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="truncate">{employee.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="truncate">Desde {employee.startDate}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              {employee.department}
            </Badge>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleActionClick}
                aria-label={`Ver detalhes de ${employee.name}`}
                className="hover-scale"
              >
                <Eye className="h-3 w-3" aria-hidden="true" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEditClick}
                aria-label={`Editar ${employee.name}`}
                className="hover-scale"
              >
                <Edit className="h-3 w-3" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

EmployeeCard.displayName = 'EmployeeCard';

export const EmployeeTable = memo(({ onEmployeeSelect, selectedEmployee }: EmployeeTableProps) => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Memoize employees to prevent unnecessary re-renders
  const employees = useMemo(() => mockEmployees, []);

  // Memoize handlers
  const handleTableViewClick = useCallback(() => setViewMode('table'), []);
  const handleCardsViewClick = useCallback(() => setViewMode('cards'), []);

  const renderTableView = useMemo(() => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Lista de Funcionários</span>
          <Badge variant="outline" className="ml-auto">
            {employees.length} funcionários
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="w-max">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-60">Funcionário</TableHead>
                      <TableHead className="w-32">Cargo</TableHead>
                      <TableHead className="w-32">Departamento</TableHead>
                      <TableHead className="w-24">Status</TableHead>
                      <TableHead className="w-20">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <EmployeeRow
                        key={employee.id}
                        employee={employee}
                        isSelected={selectedEmployee?.id === employee.id}
                        onSelect={onEmployeeSelect}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>

          {/* Desktop: Normal table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Ingresso</TableHead>
                  <TableHead className="hidden lg:table-cell">Atualizado</TableHead>
                  <TableHead className="w-12" aria-label="Ações"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <EmployeeRow
                    key={employee.id}
                    employee={employee}
                    isSelected={selectedEmployee?.id === employee.id}
                    onSelect={onEmployeeSelect}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  ), [employees, selectedEmployee, onEmployeeSelect]);

  const renderCardsView = useMemo(() => (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-spacing-sm"
      role="grid"
      aria-label="Lista de funcionários em formato de cartões"
    >
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          isSelected={selectedEmployee?.id === employee.id}
          onSelect={onEmployeeSelect}
        />
      ))}
    </div>
  ), [employees, selectedEmployee, onEmployeeSelect]);

  return (
    <div className="space-y-spacing-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground" id="employees-section">
          Funcionários
        </h3>
        <div className="flex items-center space-x-2" role="tablist" aria-labelledby="employees-section">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={handleTableViewClick}
            role="tab"
            aria-selected={viewMode === 'table'}
            aria-label="Visualizar em formato de tabela"
            className="hover-scale"
          >
            Tabela
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={handleCardsViewClick}
            role="tab"
            aria-selected={viewMode === 'cards'}
            aria-label="Visualizar em formato de cartões"
            className="hover-scale"
          >
            Cards
          </Button>
        </div>
      </div>

      <div role="tabpanel" aria-label={`Lista de funcionários em formato de ${viewMode === 'table' ? 'tabela' : 'cartões'}`}>
        {viewMode === 'table' ? renderTableView : renderCardsView}
      </div>
    </div>
  );
});

EmployeeTable.displayName = 'EmployeeTable';