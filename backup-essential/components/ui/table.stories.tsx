import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Badge } from './badge';
import { Button } from './button';
import { Edit, Trash2, Eye } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Table para exibir dados em formato tabular. Suporta diferentes tipos de conteúdo e ações.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const mockEmployees = [
  {
    id: '1',
    name: 'João Silva',
    department: 'Vendas',
    role: 'Vendedor',
    status: 'Ativo',
    email: 'joao.silva@empresa.com',
    phone: '(11) 99999-9999'
  },
  {
    id: '2',
    name: 'Maria Santos',
    department: 'Vendas',
    role: 'Supervisor',
    status: 'Ativo',
    email: 'maria.santos@empresa.com',
    phone: '(11) 88888-8888'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    department: 'Estoque',
    role: 'Repositor',
    status: 'Férias',
    email: 'pedro.costa@empresa.com',
    phone: '(11) 77777-7777'
  },
  {
    id: '4',
    name: 'Ana Lima',
    department: 'Vendas',
    role: 'Caixa',
    status: 'Ativo',
    email: 'ana.lima@empresa.com',
    phone: '(11) 66666-6666'
  }
];

const mockSchedules = [
  {
    id: '1',
    date: '2024-01-15',
    shift: 'Manhã',
    employees: 3,
    status: 'Publicada',
    cost: 'R$ 450,00'
  },
  {
    id: '2',
    date: '2024-01-16',
    shift: 'Tarde',
    employees: 4,
    status: 'Rascunho',
    cost: 'R$ 600,00'
  },
  {
    id: '3',
    date: '2024-01-17',
    shift: 'Noite',
    employees: 2,
    status: 'Publicada',
    cost: 'R$ 300,00'
  }
];

export const Basic: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockEmployees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>
              <Badge variant={employee.status === 'Ativo' ? 'default' : 'secondary'}>
                {employee.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockEmployees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>
              <Badge variant={employee.status === 'Ativo' ? 'default' : 'secondary'}>
                {employee.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const ScheduleTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Turno</TableHead>
          <TableHead>Funcionários</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Custo</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockSchedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell className="font-medium">
              {new Date(schedule.date).toLocaleDateString('pt-BR')}
            </TableCell>
            <TableCell>{schedule.shift}</TableCell>
            <TableCell>{schedule.employees}</TableCell>
            <TableCell>
              <Badge variant={schedule.status === 'Publicada' ? 'default' : 'secondary'}>
                {schedule.status}
              </Badge>
            </TableCell>
            <TableCell>{schedule.cost}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockEmployees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-mono text-sm">{employee.id}</TableCell>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{employee.email}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{employee.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input type="checkbox" className="rounded" />
          </TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockEmployees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <input type="checkbox" className="rounded" />
            </TableCell>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>
              <Badge variant={employee.status === 'Ativo' ? 'default' : 'secondary'}>
                {employee.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
            Nenhum funcionário encontrado
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 bg-muted rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded animate-pulse w-16" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tabela Básica</h3>
        <Basic />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Com Ações</h3>
        <WithActions />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Tabela de Escalas</h3>
        <ScheduleTable />
      </div>
    </div>
  ),
};
