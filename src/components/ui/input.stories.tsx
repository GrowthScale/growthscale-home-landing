import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';
import { Search, Mail, Lock, User, Phone } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Input do Design System GrowthScale. Campo de entrada de texto com suporte a ícones e validação.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Tipo do campo de entrada',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado desabilitado',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

// Input básico
export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

// Input com label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
  ),
};

// Input com ícone
export const WithIcon: Story = {
  render: () => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Buscar..." className="pl-10" />
    </div>
  ),
};

// Input de email
export const Email: Story = {
  render: () => (
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="email" placeholder="seu@email.com" className="pl-10" />
    </div>
  ),
};

// Input de senha
export const Password: Story = {
  render: () => (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="password" placeholder="Sua senha" className="pl-10" />
    </div>
  ),
};

// Input de nome
export const Name: Story = {
  render: () => (
    <div className="relative">
      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Seu nome completo" className="pl-10" />
    </div>
  ),
};

// Input de telefone
export const Phone: Story = {
  render: () => (
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="tel" placeholder="(11) 99999-9999" className="pl-10" />
    </div>
  ),
};

// Input desabilitado
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Campo desabilitado',
  },
};

// Input com erro
export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <Input placeholder="Email inválido" className="border-destructive" />
      <p className="text-sm text-destructive">Por favor, insira um email válido.</p>
    </div>
  ),
};

// Input com sucesso
export const WithSuccess: Story = {
  render: () => (
    <div className="space-y-2">
      <Input placeholder="Email válido" className="border-success" />
      <p className="text-sm text-success">Email válido!</p>
    </div>
  ),
};

// Input de busca
export const Search: Story = {
  render: () => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Buscar funcionários..." className="pl-10" />
    </div>
  ),
};

// Input de número
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Quantidade',
  },
};

// Input de URL
export const URL: Story = {
  args: {
    type: 'url',
    placeholder: 'https://exemplo.com',
  },
};

// Todos os tipos
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <label className="text-sm font-medium">Texto</label>
        <Input placeholder="Digite seu nome" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="seu@email.com" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Senha</label>
        <Input type="password" placeholder="Sua senha" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Telefone</label>
        <Input type="tel" placeholder="(11) 99999-9999" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Número</label>
        <Input type="number" placeholder="123" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">URL</label>
        <Input type="url" placeholder="https://exemplo.com" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
