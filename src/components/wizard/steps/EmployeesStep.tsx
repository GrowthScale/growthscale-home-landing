import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Users, Plus, Clock, Calendar as CalendarIcon, ArrowLeft, CheckCircle, Save } from 'lucide-react';
import { BranchData, EmployeeData, ShiftData } from '../SetupWizard';

const employeeSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  role: z.string().min(1, 'Cargo é obrigatório'),
  branchId: z.string().min(1, 'Filial é obrigatória'),
});

const shiftSchema = z.object({
  name: z.string().min(1, 'Nome do turno é obrigatório'),
  startTime: z.string().min(1, 'Horário inicial é obrigatório'),
  endTime: z.string().min(1, 'Horário final é obrigatório'),
  days: z.array(z.string()).min(1, 'Selecione pelo menos um dia'),
});

interface EmployeesStepProps {
  data: EmployeeData[];
  branchesData: BranchData[];
  onComplete: (data: EmployeeData[]) => void;
  onPrev: () => void;
  onFinish: () => void;
}

const daysOfWeek = [
  { id: 'monday', label: 'Segunda' },
  { id: 'tuesday', label: 'Terça' },
  { id: 'wednesday', label: 'Quarta' },
  { id: 'thursday', label: 'Quinta' },
  { id: 'friday', label: 'Sexta' },
  { id: 'saturday', label: 'Sábado' },
  { id: 'sunday', label: 'Domingo' },
];

const roles = [
  'Gerente',
  'Supervisor',
  'Atendente',
  'Vendedor',
  'Caixa',
  'Operador',
  'Analista',
  'Coordenador',
];

export const EmployeesStep: React.FC<EmployeesStepProps> = ({ 
  data, 
  branchesData, 
  onComplete, 
  onPrev, 
  onFinish 
}) => {
  const [employees, setEmployees] = useState<EmployeeData[]>(data);
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [isFinishing, setIsFinishing] = useState(false);

  const employeeForm = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      branchId: '',
    },
  });

  const shiftForm = useForm<z.infer<typeof shiftSchema>>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      name: '',
      startTime: '08:00',
      endTime: '17:00',
      days: [],
    },
  });

  const handleAddEmployee = () => {
    employeeForm.reset();
    setIsEmployeeDialogOpen(true);
  };

  const handleAddShift = () => {
    shiftForm.reset();
    setIsShiftDialogOpen(true);
  };

  const onEmployeeSubmit = (values: z.infer<typeof employeeSchema>) => {
    const newEmployee: EmployeeData = {
      ...values as EmployeeData,
      id: `employee-${Date.now()}`,
      shifts: [],
    };
    setEmployees([...employees, newEmployee]);
    setIsEmployeeDialogOpen(false);
    employeeForm.reset();
  };

  const onShiftSubmit = (values: z.infer<typeof shiftSchema>) => {
    const newShift: ShiftData = {
      ...values as ShiftData,
      id: `shift-${Date.now()}`,
    };
    setShifts([...shifts, newShift]);
    setIsShiftDialogOpen(false);
    shiftForm.reset();
  };

  const assignShiftToEmployee = (employeeId: string, shiftId: string) => {
    setEmployees(employees.map(emp => {
      if (emp.id === employeeId) {
        const shift = shifts.find(s => s.id === shiftId);
        if (shift && !emp.shifts.find(s => s.id === shiftId)) {
          return { ...emp, shifts: [...emp.shifts, shift] };
        }
      }
      return emp;
    }));
  };

  const removeShiftFromEmployee = (employeeId: string, shiftId: string) => {
    setEmployees(employees.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, shifts: emp.shifts.filter(s => s.id !== shiftId) };
      }
      return emp;
    }));
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    onComplete(employees);
    await onFinish();
  };

  const employeesByBranch = employees.reduce((acc, employee) => {
    if (!acc[employee.branchId]) {
      acc[employee.branchId] = [];
    }
    acc[employee.branchId].push(employee);
    return acc;
  }, {} as Record<string, EmployeeData[]>);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Colaboradores e Turnos
        </h2>
        <p className="text-muted-foreground">
          Configure sua equipe e os turnos de trabalho
        </p>
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employees" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Colaboradores</span>
          </TabsTrigger>
          <TabsTrigger value="shifts" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Turnos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Colaboradores por Filial</h3>
            <Button onClick={handleAddEmployee}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Colaborador
            </Button>
          </div>

          {branchesData.map((branch) => {
            const branchEmployees = employeesByBranch[branch.id] || [];
            return (
              <Card key={branch.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{branch.name}</span>
                    <Badge variant="secondary">
                      {branchEmployees.length} colaborador{branchEmployees.length !== 1 ? 'es' : ''}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {branchEmployees.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum colaborador cadastrado nesta filial
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {branchEmployees.map((employee) => (
                        <div 
                          key={employee.id}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{employee.name}</h4>
                            <Badge variant="outline">{employee.role}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                          
                          {/* Assign Shifts */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Turnos:</label>
                            <div className="flex flex-wrap gap-1">
                              {shifts.map((shift) => (
                                <Badge 
                                  key={shift.id}
                                  variant={employee.shifts.find(s => s.id === shift.id) ? "default" : "outline"}
                                  className="cursor-pointer text-xs"
                                  onClick={() => {
                                    if (employee.shifts.find(s => s.id === shift.id)) {
                                      removeShiftFromEmployee(employee.id, shift.id);
                                    } else {
                                      assignShiftToEmployee(employee.id, shift.id);
                                    }
                                  }}
                                >
                                  {shift.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Turnos de Trabalho</h3>
            <Button onClick={handleAddShift}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Turno
            </Button>
          </div>

          {shifts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Nenhum turno criado ainda
                </p>
                <Button variant="outline" onClick={handleAddShift} className="mt-4">
                  Criar Primeiro Turno
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shifts.map((shift) => (
                <Card key={shift.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{shift.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{shift.startTime} às {shift.endTime}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Dias da semana:</p>
                        <div className="flex flex-wrap gap-1">
                          {shift.days.map((day) => {
                            const dayLabel = daysOfWeek.find(d => d.id === day)?.label;
                            return (
                              <Badge key={day} variant="secondary" className="text-xs">
                                {dayLabel}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Employee Form Dialog */}
      <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Colaborador</DialogTitle>
          </DialogHeader>

          <Form {...employeeForm}>
            <form onSubmit={employeeForm.handleSubmit(onEmployeeSubmit)} className="space-y-4">
              <FormField
                control={employeeForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={employeeForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="joao@empresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={employeeForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={employeeForm.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filial *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a filial" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branchesData.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsEmployeeDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Shift Form Dialog */}
      <Dialog open={isShiftDialogOpen} onOpenChange={setIsShiftDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Turno</DialogTitle>
          </DialogHeader>

          <Form {...shiftForm}>
            <form onSubmit={shiftForm.handleSubmit(onShiftSubmit)} className="space-y-4">
              <FormField
                control={shiftForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Turno *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Manhã, Tarde, Noite" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={shiftForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário Inicial *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={shiftForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário Final *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={shiftForm.control}
                name="days"
                render={() => (
                  <FormItem>
                    <FormLabel>Dias da Semana *</FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {daysOfWeek.map((day) => (
                        <FormField
                          key={day.id}
                          control={shiftForm.control}
                          name="days"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={day.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(day.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, day.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== day.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {day.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsShiftDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Criar Turno
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        
        <Button 
          onClick={handleFinish}
          disabled={isFinishing}
          className="bg-accent hover:bg-accent"
        >
          {isFinishing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Finalizando...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalizar Configuração
            </>
          )}
        </Button>
      </div>
    </div>
  );
};