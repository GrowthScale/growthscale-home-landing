import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Save, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const branchFormSchema = z.object({
  name: z.string().min(2, 'Nome da filial deve ter pelo menos 2 caracteres'),
  code: z.string().min(2, 'Código deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
  address: z.object({
    street: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    district: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP deve estar no formato XXXXX-XXX')
  }),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email('Email inválido').optional().or(z.literal(''))
  }),
  manager: z.object({
    name: z.string().optional(),
    email: z.string().email('Email inválido').optional().or(z.literal(''))
  }).optional(),
  workingHours: z.object({
    open: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:MM'),
    close: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:MM')
  })
});

type BranchFormData = z.infer<typeof branchFormSchema>;

interface BranchFormProps {
  companyId: string;
  branch?: any;
  onClose: () => void;
  isEditing?: boolean;
}

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const statusOptions = [
  { value: 'active', label: 'Ativa' },
  { value: 'inactive', label: 'Inativa' },
  { value: 'maintenance', label: 'Manutenção' }
];

export const BranchForm: React.FC<BranchFormProps> = ({ 
  companyId,
  branch, 
  onClose, 
  isEditing = false 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: branch?.name || '',
      code: branch?.code || '',
      description: branch?.description || '',
      status: branch?.status || 'active',
      address: {
        street: branch?.address?.street || '',
        number: branch?.address?.number || '',
        complement: branch?.address?.complement || '',
        district: branch?.address?.district || '',
        city: branch?.address?.city || '',
        state: branch?.address?.state || '',
        zipCode: branch?.address?.zipCode || ''
      },
      contact: {
        phone: branch?.contact?.phone || '',
        email: branch?.contact?.email || ''
      },
      manager: {
        name: branch?.manager?.name || '',
        email: branch?.manager?.email || ''
      },
      workingHours: {
        open: branch?.workingHours?.open || '08:00',
        close: branch?.workingHours?.close || '18:00'
      }
    }
  });

  const onSubmit = async (data: BranchFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditing ? 'Filial atualizada' : 'Filial criada',
        description: isEditing 
          ? 'As informações da filial foram atualizadas com sucesso.'
          : 'A nova filial foi cadastrada com sucesso.',
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a filial. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código da Filial *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: F001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve descrição da filial"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logradouro *</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, Avenida, etc." {...field} />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Sala, Andar, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do bairro" {...field} />
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
                          <SelectValue placeholder="UF" />
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
                        placeholder="XXXXX-XXX"
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
          </CardContent>
        </Card>

        {/* Contact & Working Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="filial@empresa.com.br" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="workingHours.open"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abertura *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workingHours.close"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fechamento *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Manager */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gerente da Filial</CardTitle>
            <CardDescription>
              Opcional: Defina um responsável pela filial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="manager.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Gerente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manager.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email do Gerente</FormLabel>
                    <FormControl>
                      <Input placeholder="gerente@empresa.com.br" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar Filial')}
          </Button>
        </div>
      </form>
    </Form>
  );
};