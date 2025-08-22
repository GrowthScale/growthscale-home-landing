import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Alert para exibir mensagens importantes, avisos e notificações. Suporta diferentes variantes e ícones.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
      description: 'Variante visual do alerta',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Informação</AlertTitle>
      <AlertDescription>
        Esta é uma mensagem informativa padrão.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert className="border-green-200 bg-accent text-accent">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Sucesso!</AlertTitle>
      <AlertDescription>
        A escala foi salva com sucesso e todos os funcionários foram notificados.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert className="border-yellow-200 bg-accent text-accent">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Atenção</AlertTitle>
      <AlertDescription>
        Alguns funcionários têm restrições de horário que podem afetar a escala.
      </AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert variant="destructive">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Não foi possível salvar a escala. Verifique os dados e tente novamente.
      </AlertDescription>
    </Alert>
  ),
};

export const ScheduleValidation: Story = {
  render: () => (
    <Alert className="border-orange-200 bg-orange-50 text-orange-800">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Validação de Escala</AlertTitle>
      <AlertDescription>
        A escala atual viola algumas regras da CLT. Revise os intervalos e horas extras antes de publicar.
      </AlertDescription>
    </Alert>
  ),
};

export const CostAlert: Story = {
  render: () => (
    <Alert className="border-blue-200 bg-primary text-primary">
      <Info className="h-4 w-4" />
      <AlertTitle>Custo Estimado</AlertTitle>
      <AlertDescription>
        O custo total da escala é R$ 2.450,00, incluindo horas extras e adicional noturno.
      </AlertDescription>
    </Alert>
  ),
};

export const NotificationSuccess: Story = {
  render: () => (
    <Alert className="border-green-200 bg-accent text-accent">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Notificações Enviadas</AlertTitle>
      <AlertDescription>
        Todas as notificações foram enviadas com sucesso via WhatsApp para 12 funcionários.
      </AlertDescription>
    </Alert>
  ),
};

export const ComplianceWarning: Story = {
  render: () => (
    <Alert className="border-red-200 bg-destructive text-destructive">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Violação de Conformidade</AlertTitle>
      <AlertDescription>
        A escala viola o intervalo mínimo de 11 horas entre turnos para 3 funcionários.
      </AlertDescription>
    </Alert>
  ),
};

export const EmployeeLimit: Story = {
  render: () => (
    <Alert className="border-yellow-200 bg-accent text-accent">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Limite de Funcionários</AlertTitle>
      <AlertDescription>
        Você está próximo do limite de funcionários do seu plano. Considere fazer upgrade.
      </AlertDescription>
    </Alert>
  ),
};

export const SystemMaintenance: Story = {
  render: () => (
    <Alert className="border-purple-200 bg-purple-50 text-purple-800">
      <Info className="h-4 w-4" />
      <AlertTitle>Manutenção Programada</AlertTitle>
      <AlertDescription>
        O sistema estará em manutenção hoje às 23:00. As funcionalidades podem ficar indisponíveis por até 2 horas.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Mensagem sem ícone</AlertTitle>
      <AlertDescription>
        Este alerta não possui ícone, mantendo apenas o texto.
      </AlertDescription>
    </Alert>
  ),
};

export const LongDescription: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Descrição Longa</AlertTitle>
      <AlertDescription>
        Esta é uma descrição mais longa que demonstra como o componente Alert se comporta com textos extensos. 
        O componente deve manter uma boa legibilidade e espaçamento adequado, mesmo com conteúdo mais detalhado.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Padrão</AlertTitle>
        <AlertDescription>
          Alerta com variante padrão.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destrutivo</AlertTitle>
        <AlertDescription>
          Alerta com variante destrutiva para erros.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-green-200 bg-accent text-accent">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Sucesso</AlertTitle>
        <AlertDescription>
          Alerta customizado para sucesso.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-yellow-200 bg-accent text-accent">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Aviso</AlertTitle>
        <AlertDescription>
          Alerta customizado para avisos.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
