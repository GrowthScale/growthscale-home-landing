import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleCalendar } from '@/components/schedules/ScheduleCalendar';
import { ScheduleEditor } from '@/components/schedules/ScheduleEditor';
import { ScheduleFilters } from '@/components/schedules/ScheduleFilters';
import { ScheduleList } from '@/components/schedules/ScheduleList';
import { CostSimulator } from '@/components/schedules/CostSimulator';
import { WhatsAppNotificationManager } from '@/components/WhatsAppNotificationManager';
import { mockEmployeesForCost, mockShiftsForCost } from '@/constants/mockData';
import { 
  Calendar,
  HelpCircle,
  BarChart3,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  MessageCircle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Schedules() {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary rounded-lg shadow-soft">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground font-roboto">Escalas</h1>
                  <p className="text-muted-foreground mt-1">
                    Crie, edite e otimize as escalas da sua equipe com IA
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <p className="font-medium">Como usar as escalas:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Use o calendário para visualizar escalas</li>
                        <li>• Clique em "Nova Escala" para criar</li>
                        <li>• Use a IA para otimizar automaticamente</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
                <ScheduleEditor />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Escalas Ativas</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Otimizadas com IA</p>
                    <p className="text-2xl font-bold text-foreground">18</p>
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
                    <p className="text-sm text-muted-foreground">Eficiência</p>
                    <p className="text-2xl font-bold text-foreground">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendências</p>
                    <p className="text-2xl font-bold text-foreground">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Filters */}
            <ScheduleFilters />

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-fit">
                <TabsTrigger value="calendar" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Calendário</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Lista</span>
                </TabsTrigger>
                <TabsTrigger value="costs" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Custos</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Notificações</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-6">
                <ScheduleCalendar />
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <ScheduleList />
              </TabsContent>

              <TabsContent value="costs" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CostSimulator 
                    shifts={mockShiftsForCost} 
                    employees={mockEmployeesForCost}
                    onCostUpdate={(cost) => console.log('Custos atualizados:', cost)}
                  />
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Informações sobre Custos</h3>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>• O simulador calcula custos em tempo real baseado nos turnos</p>
                        <p>• Inclui horas extras e adicional noturno automaticamente</p>
                        <p>• Atualiza automaticamente quando a escala é modificada</p>
                        <p>• Use para otimizar custos e planejar orçamentos</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <WhatsAppNotificationManager
                  employeeIds={[]} // Será preenchido dinamicamente
                  scheduleId="" // Será preenchido dinamicamente
                  tenantId="tenant-001" // Será obtido do contexto
                  onNotificationSent={() => {
                    console.log('Notificações enviadas com sucesso!');
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer Information */}
        <div className="border-t bg-muted/30 mt-12">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Última atualização: há 2 minutos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>IA executou 5 otimizações hoje</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  Documentação
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