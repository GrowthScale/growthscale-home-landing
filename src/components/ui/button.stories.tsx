import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { ChevronRight, Plus, Save, Play, Check, Trash2, Eye, Edit } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de botão principal do Design System GrowthScale. Suporta múltiplas variantes, tamanhos e pode incluir ícones.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'accent', 'success', 'warning', 'gradient'],
      description: 'Variante visual do botão',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado desabilitado',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Renderiza como elemento filho',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

// Histórias básicas
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Botão Primário',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Ação Destrutiva',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botão Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Botão Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Botão Link',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Sucesso',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Aviso',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Botão Gradiente',
  },
};

// Histórias com ícones
export const WithIcon: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        <ChevronRight className="mr-2 h-4 w-4" />
        Botão com Ícone
      </>
    ),
  },
};

export const AddButton: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar
      </>
    ),
  },
};

export const SaveButton: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <Save className="mr-2 h-4 w-4" />
        Salvar
      </>
    ),
  },
};

export const ExecuteButton: Story = {
  args: {
    variant: 'accent',
    children: (
      <>
        <Play className="mr-2 h-4 w-4" />
        Executar Ação
      </>
    ),
  },
};

export const CheckButton: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <Check className="mr-2 h-4 w-4" />
        Marcar como Resolvido
      </>
    ),
  },
};

export const DeleteButton: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <Trash2 className="mr-2 h-4 w-4" />
        Excluir
      </>
    ),
  },
};

export const ViewButton: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        <Eye className="mr-2 h-4 w-4" />
        Visualizar
      </>
    ),
  },
};

export const EditButton: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Edit className="mr-2 h-4 w-4" />
        Editar
      </>
    ),
  },
};

// Histórias de tamanhos
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Pequeno',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Grande',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Grande',
  },
};

// Histórias de ícones apenas
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Plus />,
  },
};

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: <Eye />,
  },
};

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: <Edit />,
  },
};

// Histórias de estados
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Desabilitado',
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: 'Carregando...',
  },
};

// História de demonstração de todas as variantes
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="gradient">Gradient</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de todas as variantes disponíveis do componente Button.',
      },
    },
  },
};

// História de demonstração de todos os tamanhos
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-6">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon-sm"><Plus /></Button>
      <Button size="icon"><Plus /></Button>
      <Button size="icon-lg"><Plus /></Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de todos os tamanhos disponíveis do componente Button.',
      },
    },
  },
};
