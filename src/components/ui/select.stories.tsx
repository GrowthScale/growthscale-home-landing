import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Button } from './button';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Select para escolhas de opções com dropdown. Suporta diferentes tamanhos e estados.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita o select',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
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
      <SelectTrigger className="w-[200px]">
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
      <SelectTrigger className="w-[180px]">
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
      <SelectTrigger className="w-[180px]">
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
      <SelectTrigger className="w-[180px]">
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
      <SelectTrigger className="w-[250px] h-12 text-lg">
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
      <SelectTrigger className="w-[150px] h-8 text-sm">
        <SelectValue placeholder="Select pequeno" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const InForm: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Nome do funcionário" />
      </div>
      
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
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Turno</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Escolha o turno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manha">Manhã</SelectItem>
            <SelectItem value="tarde">Tarde</SelectItem>
            <SelectItem value="noite">Noite</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full">Salvar</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Tamanhos</label>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[150px] h-8 text-sm">
              <SelectValue placeholder="Pequeno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Opção 1</SelectItem>
              <SelectItem value="option2">Opção 2</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Padrão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Opção 1</SelectItem>
              <SelectItem value="option2">Opção 2</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[200px] h-12 text-lg">
              <SelectValue placeholder="Grande" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Opção 1</SelectItem>
              <SelectItem value="option2">Opção 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Estados</label>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Normal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Opção 1</SelectItem>
              <SelectItem value="option2">Opção 2</SelectItem>
            </SelectContent>
          </Select>
          
          <Select disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Desabilitado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Opção 1</SelectItem>
              <SelectItem value="option2">Opção 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};
