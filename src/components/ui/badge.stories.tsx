import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { CheckCircle, AlertTriangle, Clock, Users, TrendingUp } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Badge do Design System GrowthScale. Usado para exibir status, contadores e labels.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Variante visual do badge',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

// Badges básicos
export const Default: Story = {
  args: {
    children: 'Badge Padrão',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Badge Secundário',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Badge Destrutivo',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Badge Outline',
  },
};

// Badges com ícones
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CheckCircle className="mr-1 h-3 w-3" />
        Aprovado
      </>
    ),
  },
};

export const WarningWithIcon: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <AlertTriangle className="mr-1 h-3 w-3" />
        Alerta
      </>
    ),
  },
};

export const PendingWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Clock className="mr-1 h-3 w-3" />
        Pendente
      </>
    ),
  },
};

// Badges de status
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <CheckCircle className="mr-1 h-3 w-3" />
        Ativo
      </Badge>
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" />
        Pendente
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Inativo
      </Badge>
      <Badge variant="outline">
        <Users className="mr-1 h-3 w-3" />
        Em Revisão
      </Badge>
    </div>
  ),
};

// Badges de contador
export const CounterBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>5</Badge>
      <Badge variant="secondary">12</Badge>
      <Badge variant="destructive">3</Badge>
      <Badge variant="outline">8</Badge>
    </div>
  ),
};

// Badges de métricas
export const MetricBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <TrendingUp className="mr-1 h-3 w-3" />
        +15%
      </Badge>
      <Badge variant="destructive">
        <TrendingUp className="mr-1 h-3 w-3" />
        -8%
      </Badge>
      <Badge variant="secondary">
        <Users className="mr-1 h-3 w-3" />
        24 funcionários
      </Badge>
    </div>
  ),
};

// Badges de departamento
export const DepartmentBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Vendas</Badge>
      <Badge variant="secondary">Estoque</Badge>
      <Badge variant="outline">Administração</Badge>
      <Badge variant="destructive">Segurança</Badge>
    </div>
  ),
};

// Badges de prioridade
export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">Alta</Badge>
      <Badge variant="secondary">Média</Badge>
      <Badge variant="outline">Baixa</Badge>
    </div>
  ),
};

// Badges de compliance
export const ComplianceBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <CheckCircle className="mr-1 h-3 w-3" />
        Em Conformidade
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Violação CLT
      </Badge>
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" />
        Em Análise
      </Badge>
    </div>
  ),
};

// Todos os tipos
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Variantes</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Com Ícones</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <CheckCircle className="mr-1 h-3 w-3" />
            Sucesso
          </Badge>
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Aguardando
          </Badge>
          <Badge variant="destructive">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Erro
          </Badge>
          <Badge variant="outline">
            <Users className="mr-1 h-3 w-3" />
            Grupo
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
