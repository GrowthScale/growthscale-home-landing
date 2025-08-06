import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { EmployeeFilters } from '@/components/employees/EmployeeFilters';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { EmployeeDetails } from '@/components/employees/EmployeeDetails';
import { 
  Users,
  HelpCircle,
  UserCheck,
  UserX,
  TrendingUp,
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

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'vacation';
  startDate: string;
  lastUpdate: string;
  address: string;
  salary: string;
  skills: string[];
}

export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedEmployee(null);
  };

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
                  <h1 className="text-3xl font-bold text-foreground font-roboto text-balance">Funcionários</h1>
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
        </div>

        {/* Quick Stats */}
        <main className="container mx-auto px-6 py-xl">
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" aria-labelledby="stats-section">
            <h2 id="stats-section" className="sr-only">Estatísticas rápidas da equipe</h2>
            <Card className="hover:shadow-card transition-smooth">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg" role="img" aria-label="Funcionários ativos">
                    <UserCheck className="h-5 w-5 text-success" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Funcionários Ativos</p>
                    <p className="text-2xl font-bold text-foreground">48</p>
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
                    <p className="text-2xl font-bold text-foreground">7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Desempenho Médio</p>
                    <p className="text-2xl font-bold text-foreground">4.6</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Em Férias</p>
                    <p className="text-2xl font-bold text-foreground">3</p>
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
              onEmployeeSelect={handleEmployeeSelect}
              selectedEmployee={selectedEmployee}
            />
          </div>
        </main>

        {/* Employee Details Side Panel */}
        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <SheetContent className="w-full sm:w-[500px] lg:w-[600px] overflow-y-auto">
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
                  <span>51 funcionários cadastrados</span>
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
      </header>
    </div>
    </TooltipProvider>
  );
}