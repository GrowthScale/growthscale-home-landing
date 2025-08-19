import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAccessControl } from '@/hooks/useAccessControl';
import { AccessControl, OwnerOnly, ManagerOnly, EmployeeOnly } from '@/components/AccessControl';
import { 
  DollarSign, 
  Settings, 
  Users, 
  Calendar, 
  BarChart3, 
  Eye,
  AlertTriangle
} from 'lucide-react';

/**
 * Componente de exemplo demonstrando o uso do RBAC
 * Este componente mostra diferentes seções baseadas no papel do usuário
 */
export function RBACExample() {
  const { role, can } = useAccessControl();

  return (
    <div className="space-y-6 p-6">
      {/* Header com informações do usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Controle de Acesso - RBAC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Papel Atual: {role}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Este componente demonstra como o RBAC funciona na prática
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Apenas para Owners */}
      <OwnerOnly
        fallback={
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Esta seção é visível apenas para Owners
              </p>
            </CardContent>
          </Card>
        }
      >
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Settings className="h-5 w-5" />
              Configurações da Empresa (Owner Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <DollarSign className="h-6 w-6" />
                <span>Gerenciar Faturamento</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <Settings className="h-6 w-6" />
                <span>Configurações Globais</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Gerenciar Todos os Funcionários</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Como Owner, você tem acesso total a todas as funcionalidades da empresa.
            </p>
          </CardContent>
        </Card>
      </OwnerOnly>

      {/* Seção: Apenas para Managers */}
      <ManagerOnly
        fallback={
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Esta seção é visível apenas para Managers
              </p>
            </CardContent>
          </Card>
        }
      >
        <Card className="border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary-foreground">
              <Calendar className="h-5 w-5" />
              Gestão de Unidade (Manager Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Gerenciar Escalas da Unidade</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Gerenciar Funcionários da Unidade</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Como Manager, você pode gerenciar escalas e funcionários da sua unidade.
            </p>
          </CardContent>
        </Card>
      </ManagerOnly>

      {/* Seção: Apenas para Employees */}
      <EmployeeOnly
        fallback={
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Esta seção é visível apenas para Employees
              </p>
            </CardContent>
          </Card>
        }
      >
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent-foreground">
              <Eye className="h-5 w-5" />
              Minha Escala (Employee Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Ver Minha Escala</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Meus Horários</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Como Employee, você pode visualizar apenas sua própria escala e horários.
            </p>
          </CardContent>
        </Card>
      </EmployeeOnly>

      {/* Seção: Verificação condicional com AccessControl */}
      <Card>
        <CardHeader>
          <CardTitle>Verificações Condicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AccessControl permission="view:billing">
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Ver Faturamento
              </Button>
            </AccessControl>

            <AccessControl permission="manage:all_schedules">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Gerenciar Todas as Escalas
              </Button>
            </AccessControl>

            <AccessControl permission="view:full_dashboard">
              <Button variant="outline" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard Completo
              </Button>
            </AccessControl>

            <AccessControl permission="manage:unit_schedules">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Gerenciar Escalas da Unidade
              </Button>
            </AccessControl>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Informações de debug */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Debug</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Papel atual:</strong> {role}</p>
            <p><strong>Pode ver faturamento:</strong> {can('view:billing') ? 'Sim' : 'Não'}</p>
            <p><strong>Pode gerenciar configurações:</strong> {can('manage:company_settings') ? 'Sim' : 'Não'}</p>
            <p><strong>Pode ver dashboard completo:</strong> {can('view:full_dashboard') ? 'Sim' : 'Não'}</p>
            <p><strong>Pode gerenciar funcionários:</strong> {can('manage:all_employees') ? 'Sim' : 'Não'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
