import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';
import { Search, Mail, Lock, User, Phone, X } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input placeholder="Digite aqui..." />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-10" placeholder="Buscar..." />
    </div>
  ),
};

export const WithIconRight: Story = {
  render: () => (
    <div className="relative">
      <Input className="pr-10" placeholder="Digite sua senha" type="password" />
      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-10 pr-10" placeholder="Email" type="email" />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="w-2 h-2 bg-accent rounded-full"></div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <Input disabled placeholder="Campo desabilitado" />,
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <Input className="border-destructive" placeholder="Campo com erro" />
      <p className="text-sm text-destructive">Este campo é obrigatório</p>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Nome de usuário</Label>
      <Input id="username" placeholder="Digite seu nome de usuário" />
      <p className="text-sm text-muted-foreground">
        Use apenas letras, números e underscores
      </p>
    </div>
  ),
};

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <Label htmlFor="text">Texto</Label>
        <Input id="text" type="text" placeholder="Digite texto" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="seu@email.com" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" placeholder="Digite sua senha" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="number">Número</Label>
        <Input id="number" type="number" placeholder="Digite um número" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tel">Telefone</Label>
        <Input id="tel" type="tel" placeholder="(11) 99999-9999" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input id="url" type="url" placeholder="https://exemplo.com" />
      </div>
    </div>
  ),
};

export const WithPrefix: Story = {
  render: () => (
    <div className="flex">
      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
        https://
      </span>
      <Input className="rounded-l-none" placeholder="exemplo.com" />
    </div>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <div className="flex">
      <Input className="rounded-r-none" placeholder="Digite o valor" />
      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-sm text-muted-foreground">
        .com
      </span>
    </div>
  ),
};

export const WithBothPrefixAndSuffix: Story = {
  render: () => (
    <div className="flex">
      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
        R$
      </span>
      <Input className="rounded-none" placeholder="0,00" />
      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-sm text-muted-foreground">
        BRL
      </span>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div className="space-y-2">
      <Input 
        className="border-green-500 focus:border-green-500" 
        placeholder="Campo válido" 
      />
      <p className="text-sm text-accent">✓ Campo válido</p>
    </div>
  ),
};

export const WithLoading: Story = {
  render: () => (
    <div className="relative">
      <Input placeholder="Carregando..." disabled />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
      </div>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div className="space-y-2">
      <Input placeholder="Digite sua mensagem" maxLength={100} />
      <p className="text-sm text-muted-foreground text-right">0/100</p>
    </div>
  ),
};

export const WithClearButton: Story = {
  render: () => (
    <div className="relative">
      <Input placeholder="Digite e limpe" />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  ),
};
