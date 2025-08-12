import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Users, Calendar, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Card do Design System GrowthScale. Usado para agrupar conteúdo relacionado em containers visuais.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

// Card básico
export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Básico</CardTitle>
        <CardDescription>Descrição do card com informações adicionais</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Conteúdo principal do card pode conter qualquer elemento.</p>
      </CardContent>
      <CardFooter>
        <Button>Ver Mais</Button>
      </CardFooter>
    </Card>
  ),
};

// Card de métrica/KPI
export const MetricCard: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Taxa de Rotatividade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">8.5%</div>
        <p className="text-xs text-muted-foreground">
          ↓ 2.3% vs mês anterior
        </p>
      </CardContent>
    </Card>
  ),
};

// Card de funcionário
export const EmployeeCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>João Silva</CardTitle>
            <CardDescription>Vendedor • Vendas</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Ingresso: 15/01/2023</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Última atualização: 10/08/2024 14:30</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Ver Detalhes
          </Button>
          <Button size="sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Card de alerta
export const AlertCard: Story = {
  render: () => (
    <Card className="w-[400px] border-destructive">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Alerta de Compliance</CardTitle>
        </div>
        <CardDescription>
          Violação detectada na escala de trabalho
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Funcionário:</span>
            <span className="text-sm">João Silva</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Problema:</span>
            <span className="text-sm">Excesso de horas extras</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Impacto:</span>
            <Badge variant="destructive">Alto</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Ignorar
          </Button>
          <Button size="sm">
            Resolver
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Card de escala
export const ScheduleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Escala de Vendas</CardTitle>
          <Badge variant="outline">Aprovada</Badge>
        </div>
        <CardDescription>15/08/2024 • 06:00 - 14:00</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">2 funcionários</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">8 horas • Turno Manhã</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Escala otimizada pela IA
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Visualizar
          </Button>
          <Button size="sm">
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Card com imagem
export const ImageCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5" />
      <CardHeader>
        <CardTitle>Card com Imagem</CardTitle>
        <CardDescription>
          Cards podem incluir imagens ou gradientes como elementos visuais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Este é um exemplo de card que inclui uma área de imagem ou gradiente no topo.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ação Principal</Button>
      </CardFooter>
    </Card>
  ),
};

// Card interativo
export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[300px] cursor-pointer transition-all hover:shadow-elegant hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Card Interativo</CardTitle>
        <CardDescription>
          Cards podem ser interativos com hover effects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passe o mouse sobre este card para ver os efeitos de hover.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Interagir
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Grid de cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>Primeiro card do grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo do primeiro card</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Segundo card do grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo do segundo card</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Terceiro card do grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo do terceiro card</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
