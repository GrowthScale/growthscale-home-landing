import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, MapPin, Clock, Edit2, Trash2, Building, ArrowLeft } from 'lucide-react';
import { BranchData, CompanyData } from '../SetupWizard';

const branchSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    zipCode: z.string().min(8, 'CEP deve ter 8 dígitos'),
  }),
  workingHours: z.object({
    start: z.string().min(1, 'Horário inicial é obrigatório'),
    end: z.string().min(1, 'Horário final é obrigatório'),
  }),
  status: z.enum(['active', 'inactive']),
});

interface BranchesStepProps {
  data: BranchData[];
  companyData?: CompanyData | null;
  onComplete: (data: BranchData[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const BranchesStep: React.FC<BranchesStepProps> = ({ 
  data, 
  companyData, 
  onComplete, 
  onNext, 
  onPrev 
}) => {
  const [branches, setBranches] = useState<BranchData[]>(data);
  const [editingBranch, setEditingBranch] = useState<BranchData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      address: {
        street: '',
        number: '',
        city: '',
        state: '',
        zipCode: '',
      },
      workingHours: {
        start: '08:00',
        end: '18:00',
      },
      status: 'active',
    },
  });

  const formatCEP = (value: string) => {
    const nums = value.replace(/\D/g, '');
    return nums.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleAddBranch = () => {
    form.reset();
    setEditingBranch(null);
    setIsDialogOpen(true);
  };

  const handleEditBranch = (branch: BranchData) => {
    setEditingBranch(branch);
    form.reset(branch);
    setIsDialogOpen(true);
  };

  const handleDeleteBranch = (branchId: string) => {
    setBranches(branches.filter(b => b.id !== branchId));
  };

  const onSubmit = (values: z.infer<typeof branchSchema>) => {
    if (editingBranch) {
      // Editar filial existente
        setBranches(branches.map(b => 
          b.id === editingBranch.id 
            ? { ...values as BranchData, id: editingBranch.id }
            : b
        ));
    } else {
      // Adicionar nova filial
      const newBranch: BranchData = {
        ...values as BranchData,
        id: `branch-${Date.now()}`,
      };
      setBranches([...branches, newBranch]);
    }
    
    setIsDialogOpen(false);
    form.reset();
  };

  const handleContinue = () => {
    onComplete(branches);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Filiais da {companyData?.name}
        </h2>
        <p className="text-muted-foreground">
          Adicione as unidades da sua empresa
        </p>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Add New Branch Card */}
        <Card 
          className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={handleAddBranch}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 h-48">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
              Adicionar Nova Filial
            </p>
          </CardContent>
        </Card>

        {/* Existing Branches */}
        {branches.map((branch) => (
          <Card key={branch.id} className="relative group hover:shadow-elegant transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{branch.name}</CardTitle>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditBranch(branch)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteBranch(branch.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                {branch.status === 'active' ? 'Ativa' : 'Inativa'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {branch.address.street}, {branch.address.number} - {branch.address.city}/{branch.address.state}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {branch.workingHours.start} às {branch.workingHours.end}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branch Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-modal-md">
          <DialogHeader>
            <DialogTitle>
              {editingBranch ? 'Editar Filial' : 'Nova Filial'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Filial *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Filial Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da rua" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address.number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número *</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="00000-000"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatCEP(e.target.value);
                            field.onChange(formatted);
                          }}
                          maxLength={9}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="workingHours.start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário de Abertura *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingHours.end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário de Fechamento *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Ativa</SelectItem>
                          <SelectItem value="inactive">Inativa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingBranch ? 'Salvar' : 'Adicionar'}
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
          onClick={handleContinue}
          disabled={branches.length === 0}
        >
          Continuar
          {branches.length === 0 && (
            <span className="ml-2 text-xs">(Adicione pelo menos 1 filial)</span>
          )}
        </Button>
      </div>
    </div>
  );
};
