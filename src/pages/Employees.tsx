import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { EmployeeFilters } from '@/components/employees/EmployeeFilters';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { EmployeeDetails } from '@/components/employees/EmployeeDetails';
import { getEmployees, deleteEmployee, type EmployeeData } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { 
  Users,
  HelpCircle,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  X
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Employees() {
  const { currentTenant: tenant } = useTenant();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Buscar funcionários
  const { data: employees, isLoading, error } = useQuery({
    queryKey: ['employees', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) throw new Error('Empresa não configurada');
      const result = await getEmployees(tenant.id);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    enabled: !!tenant?.id,
  });

  // Mutation para deletar funcionário
  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast({
        title: "Funcionário removido",
        description: "O funcionário foi removido com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['employees', tenant?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover funcionário",
        description: error.message || "Ocorreu um erro ao remover o funcionário.",
        variant: "destructive"
      });
    }
  });

  const handleEmployeeSelect = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm('Tem certeza que deseja remover este funcionário?')) {
      deleteEmployeeMutation.mutate(employeeId);
    }
  };

  // Calcular estatísticas (apenas dados reais)
  const stats = {
    active: employees?.filter(emp => emp.status === 'active').length || 0,
    newThisMonth: employees?.filter(emp => {
      const startDate = new Date(emp.start_date);
      const now = new Date();
      return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
    }).length || 0,
    inactive: employees?.filter(emp => emp.status === 'inactive').length || 0,
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar funcionários</h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <header className="border-b bg-muted/30">
          <div className="container mx-auto px-6 py-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary rounded-lg shadow-soft" role="img" aria-label="Ícone de gestão de funcionários">
                  <Users className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground font-body text-balance">Funcionários</h1>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    Gerencie e acompanhe os dados da sua equipe em tempo real
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" aria-label="Ajuda para gerenciar funcionários">
                      <HelpCircle className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <p className="font-medium">Como gerenciar funcionários:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Clique em um funcionário para ver detalhes</li>
                        <li>• Use filtros para encontrar rapidamente</li>
                        <li>• Adicione novos funcionários com o botão +</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
                <EmployeeForm />
              </div>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <main className="container mx-auto px-6 py-xl">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-labelledby="stats-section">
            <h2 id="stats-section" className="sr-only">Estatísticas rápidas da equipe</h2>
            <Card className="hover:shadow-card transition-smooth">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg" role="img" aria-label="Funcionários ativos">
                    <UserCheck className="h-5 w-5 text-success" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Funcionários Ativos</p>
                    <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Novos este Mês</p>
                    <p className="text-2xl font-bold text-foreground">{stats.newThisMonth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <UserX className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inativos</p>
                    <p className="text-2xl font-bold text-foreground">{stats.inactive}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Filters */}
            <EmployeeFilters />

            {/* Employee Table */}
            <EmployeeTable 
              employees={employees || []}
              isLoading={isLoading}
              onEmployeeSelect={handleEmployeeSelect}
              onDeleteEmployee={handleDeleteEmployee}
              selectedEmployee={selectedEmployee}
            />
          </div>
        </main>

        {/* Employee Details Side Panel */}
        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-2xl overflow-y-auto">
            <SheetHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Detalhes do Funcionário</span>
                </SheetTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseDetails}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
            
            {selectedEmployee && (
              <div className="mt-6">
                <EmployeeDetails 
                  employee={selectedEmployee} 
                  onClose={handleCloseDetails}
                />
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Footer Information */}
        <div className="border-t bg-muted/30 mt-12">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Última sincronização: há 1 minuto</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{employees?.length || 0} funcionários cadastrados</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  Central de Ajuda
                </Button>
                <Button variant="ghost" size="sm">
                  FAQs
                </Button>
                <Button variant="ghost" size="sm">
                  Suporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}