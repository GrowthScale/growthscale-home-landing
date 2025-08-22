import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { createEmployee, type CreateEmployeeData } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  CalendarIcon, 
  Save, 
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmployeeFormData {
  name: string;
  email: string;
  phone_number: string;
  position: string;
  department: string;
  salary: string;
  start_date: Date | undefined;
  address: string;
  status: string;
  notes: string;
  contractType: string;
  preferredShift: string;
  workload_hours: string;
}

export function EmployeeForm() {
  const { currentTenant: tenant } = useTenant();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<EmployeeFormData>({
    name: '',
    email: '',
    phone_number: '',
    position: '',
    department: '',
    salary: '',
    start_date: undefined,
    address: '',
    status: 'active',
    notes: '',
    contractType: '',
    preferredShift: '',
    workload_hours: '8'
  });

  // Mutation para criar funcionário
  const createEmployeeMutation = useMutation({
    mutationFn: async (employeeData: CreateEmployeeData) => {
      if (!tenant?.id) throw new Error('Empresa não configurada');
      const result = await createEmployee(employeeData, tenant.id);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast({
        title: "Funcionário cadastrado com sucesso!",
        description: `${form.name} foi adicionado à equipe.`,
      });
      setIsOpen(false);
      resetForm();
      // Invalidar a query para atualizar a lista
      queryClient.invalidateQueries({ queryKey: ['employees', tenant?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao cadastrar funcionário",
        description: error.message || "Ocorreu um erro ao cadastrar o funcionário.",
        variant: "destructive"
      });
    }
  });

  const handleInputChange = (field: keyof EmployeeFormData, value: string | Date | undefined) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone_number', 'position', 'department'];
    const missingFields = requiredFields.filter(field => !form[field as keyof EmployeeFormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios: " + missingFields.join(', '),
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    // Validate start date
    if (!form.start_date) {
      toast({
        title: "Data de início obrigatória",
        description: "Por favor, selecione a data de início.",
        variant: "destructive"
      });
      return;
    }

    // Prepare data for API
    const employeeData: CreateEmployeeData = {
      name: form.name,
      email: form.email,
      phone_number: form.phone_number,
      position: form.position,
      department: form.department,
      status: form.status,
      start_date: form.start_date.toISOString().split('T')[0],
      salary: form.salary ? parseFloat(form.salary.replace(/[^\d,]/g, '').replace(',', '.')) : undefined,
      skills: [], // TODO: Implement skills input
      address: form.address ? { full: form.address } : undefined,
      workload_hours: form.workload_hours ? parseInt(form.workload_hours) : undefined,
    };

    createEmployeeMutation.mutate(employeeData);
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone_number: '',
      position: '',
      department: '',
      salary: '',
      start_date: undefined,
      address: '',
      status: 'active',
      notes: '',
      contractType: '',
      preferredShift: '',
      workload_hours: '8'
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Funcionário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Adicionar Novo Funcionário
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome completo"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@exemplo.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={form.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start_date">Data de Início *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal pl-10",
                          !form.start_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="absolute left-3 h-4 w-4" />
                        {form.start_date ? format(form.start_date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.start_date}
                        onSelect={(date) => handleInputChange('start_date', date)}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="position"
                      value={form.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="Ex: Vendedor, Gerente"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="department"
                      value={form.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Ex: Vendas, Administração"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salário</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="salary"
                      value={form.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="R$ 0,00"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workload_hours">Carga Horária (horas/dia)</Label>
                  <Input
                    id="workload_hours"
                    type="number"
                    value={form.workload_hours}
                    onChange={(e) => handleInputChange('workload_hours', e.target.value)}
                    placeholder="8"
                    min="1"
                    max="24"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={form.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="vacation">Férias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Rua, número, bairro, cidade - estado, CEP"
                    className="pl-10"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Informações adicionais sobre o funcionário..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancel} disabled={createEmployeeMutation.isPending}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={createEmployeeMutation.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {createEmployeeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Funcionário
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}