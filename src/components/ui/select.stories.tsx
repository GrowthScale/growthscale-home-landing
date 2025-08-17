import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
        <SelectItem value="option3">Opção 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Departamento</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Escolha o departamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vendas">Vendas</SelectItem>
          <SelectItem value="estoque">Estoque</SelectItem>
          <SelectItem value="rh">Recursos Humanos</SelectItem>
          <SelectItem value="ti">Tecnologia</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const EmployeeRole: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Selecione o cargo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="gerente">Gerente</SelectItem>
        <SelectItem value="supervisor">Supervisor</SelectItem>
        <SelectItem value="vendedor">Vendedor</SelectItem>
        <SelectItem value="caixa">Caixa</SelectItem>
        <SelectItem value="repositor">Repositor</SelectItem>
        <SelectItem value="seguranca">Segurança</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const ShiftType: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Tipo de turno" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="manha">Manhã (06:00 - 14:00)</SelectItem>
        <SelectItem value="tarde">Tarde (14:00 - 22:00)</SelectItem>
        <SelectItem value="noite">Noite (22:00 - 06:00)</SelectItem>
        <SelectItem value="integral">Integral (08:00 - 18:00)</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Select desabilitado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="tarde">
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="manha">Manhã</SelectItem>
        <SelectItem value="tarde">Tarde</SelectItem>
        <SelectItem value="noite">Noite</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Large: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-60 h-12 text-lg">
        <SelectValue placeholder="Select grande" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
        <SelectItem value="option3">Opção 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-36 h-8 text-sm">
        <SelectValue placeholder="Select pequeno" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um país" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="br">🇧🇷 Brasil</SelectItem>
          <SelectItem value="us">🇺🇸 Estados Unidos</SelectItem>
          <SelectItem value="uk">🇬🇧 Reino Unido</SelectItem>
          <SelectItem value="ca">🇨🇦 Canadá</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const MultipleSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select>
        <SelectTrigger className="w-36 h-8 text-sm">
          <SelectValue placeholder="Pequeno" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Opção 1</SelectItem>
          <SelectItem value="option2">Opção 2</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Médio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Opção 1</SelectItem>
          <SelectItem value="option2">Opção 2</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-60 h-12 text-lg">
          <SelectValue placeholder="Grande" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Opção 1</SelectItem>
          <SelectItem value="option2">Opção 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Departamento</label>
      <Select>
        <SelectTrigger className="border-destructive">
          <SelectValue placeholder="Selecione um departamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vendas">Vendas</SelectItem>
          <SelectItem value="estoque">Estoque</SelectItem>
          <SelectItem value="rh">Recursos Humanos</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-destructive">Este campo é obrigatório</p>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tipo de Contrato</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Escolha o tipo de contrato" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clt">CLT</SelectItem>
          <SelectItem value="pj">PJ</SelectItem>
          <SelectItem value="estagiario">Estagiário</SelectItem>
          <SelectItem value="temporario">Temporário</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        O tipo de contrato determina as regras de trabalho aplicáveis
      </p>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Administrativo</SelectItem>
        <SelectItem value="vendas">Vendas</SelectItem>
        <SelectItem value="estoque">Estoque</SelectItem>
        <SelectItem value="rh">Recursos Humanos</SelectItem>
        <SelectItem value="ti">Tecnologia</SelectItem>
        <SelectItem value="financeiro">Financeiro</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Buscar funcionário..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="joao">João Silva</SelectItem>
        <SelectItem value="maria">Maria Santos</SelectItem>
        <SelectItem value="pedro">Pedro Oliveira</SelectItem>
        <SelectItem value="ana">Ana Costa</SelectItem>
        <SelectItem value="carlos">Carlos Ferreira</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48 h-12 text-lg">
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
        <SelectItem value="option3">Opção 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};
