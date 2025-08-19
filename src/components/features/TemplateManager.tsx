import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleTemplateService, ScheduleTemplate, CreateScheduleTemplateDto } from '@/services/api';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Calendar, 
  Users, 
  Clock,
  FileText,
  Loader2,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TemplateManagerProps {
  onTemplateSelect?: (template: ScheduleTemplate) => void;
}

export function TemplateManager({ onTemplateSelect }: TemplateManagerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ScheduleTemplate | null>(null);
  const [formData, setFormData] = useState<CreateScheduleTemplateDto>({
    name: '',
    description: '',
    tenant_id: 'default', // TODO: Get from context
    template_data: {
      shifts: [],
      employees: [],
      notes: ''
    }
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch modelos
  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['scheduleTemplates'],
    queryFn: async () => {
      const response = await scheduleTemplateService.getTemplates();
      if (response.error) {throw new Error(response.error);}
      return response.data || [];
    }
  });

  // Create modelo mutation
  const createMutation = useMutation({
    mutationFn: async (template: CreateScheduleTemplateDto) => {
      const response = await scheduleTemplateService.createTemplate(template);
      if (response.error) {throw new Error(response.error);}
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduleTemplates'] });
      setIsCreateModalOpen(false);
      setFormData({
        name: '',
        description: '',
        tenant_id: 'default',
        template_data: {
          shifts: [],
          employees: [],
          notes: ''
        }
      });
      toast({
        title: "Modelo criado!",
        description: "O modelo foi salvo com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar modelo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update modelo mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CreateScheduleTemplateDto> }) => {
      const response = await scheduleTemplateService.updateTemplate(id, { ...updates, id });
      if (response.error) {throw new Error(response.error);}
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduleTemplates'] });
      setIsEditModalOpen(false);
      setSelectedTemplate(null);
      toast({
        title: "Modelo atualizado!",
        description: "O modelo foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar modelo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete modelo mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await scheduleTemplateService.deleteTemplate(id);
      if (response.error) {throw new Error(response.error);}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduleTemplates'] });
      toast({
        title: "Modelo deletado!",
        description: "O modelo foi removido com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao deletar modelo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateTemplate = () => {
    createMutation.mutate(formData);
  };

  const handleUpdateTemplate = () => {
    if (!selectedTemplate) {return;}
    updateMutation.mutate({
      id: selectedTemplate.id,
      updates: formData
    });
  };

  const handleDeleteTemplate = (template: ScheduleTemplate) => {
    if (confirm(`Tem certeza que deseja deletar o modelo "${template.name}"?`)) {
      deleteMutation.mutate(template.id);
    }
  };

  const handleEditTemplate = (template: ScheduleTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || '',
      tenant_id: template.tenant_id,
      template_data: template.template_data
    });
    setIsEditModalOpen(true);
  };

  const handleViewTemplate = (template: ScheduleTemplate) => {
    setSelectedTemplate(template);
    setIsViewModalOpen(true);
  };

  const handleUseTemplate = (template: ScheduleTemplate) => {
    onTemplateSelect?.(template);
    toast({
              title: "Modelo aplicado!",
      description: `O modelo "${template.name}" foi selecionado.`,
    });
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[dayOfWeek];
  };

  // DataTable columns
  const columns = [
    {
      key: 'name',
      header: 'Nome',
      accessor: (item: Record<string, unknown>) => (
        <div className="font-medium">{item.name as string}</div>
      ),
    },
    {
      key: 'description',
      header: 'Descrição',
      accessor: (item: Record<string, unknown>) => (
        <div className="text-sm text-muted-foreground max-w-xs truncate">
          {(item.description as string) || 'Sem descrição'}
        </div>
      ),
    },
    {
      key: 'shifts',
      header: 'Turnos',
      accessor: (item: Record<string, unknown>) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{(item.template_data as { shifts?: unknown[] })?.shifts?.length || 0}</span>
        </div>
      ),
    },
    {
      key: 'employees',
      header: 'Funcionários',
      accessor: (item: Record<string, unknown>) => (
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{(item.template_data as { employees?: unknown[] })?.employees?.length || 0}</span>
        </div>
      ),
    },
    {
      key: 'created_at',
      header: 'Criado em',
      accessor: (item: Record<string, unknown>) => (
        <div className="text-sm text-muted-foreground">
          {format(new Date(item.created_at as string), 'dd/MM/yyyy', { locale: ptBR })}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Ações',
      accessor: (item: Record<string, unknown>) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewTemplate(item as unknown as ScheduleTemplate)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditTemplate(item as unknown as ScheduleTemplate)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUseTemplate(item as unknown as ScheduleTemplate)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteTemplate(item as unknown as ScheduleTemplate)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">Erro ao carregar modelos: {error.message}</p>
        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Modelos de Escala</h1>
          <p className="text-muted-foreground">
            Gerencie modelos para criar escalas rapidamente
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Novo Modelo
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Modelo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Modelo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Escala Padrão - Segunda a Sexta"
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o modelo..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleCreateTemplate}
                  disabled={!formData.name || createMutation.isPending}
                >
                  {createMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Criar Modelo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* DataTable */}
      <DataTable<Record<string, unknown>>
        columns={columns} 
        data={(templates || []) as unknown as Record<string, unknown>[]}
        searchPlaceholder="Buscar modelos..."
        emptyMessage="Nenhum modelo encontrado"
      />

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-modal-md">
          <DialogHeader>
            <DialogTitle>Editar Modelo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nome do Modelo *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Escala Padrão - Segunda a Sexta"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o modelo..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdateTemplate}
                disabled={!formData.name || updateMutation.isPending}
              >
                {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Atualizar Modelo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-modal-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Modelo</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <Label>Nome</Label>
                <p className="font-medium">{selectedTemplate.name}</p>
              </div>
              {selectedTemplate.description && (
                <div>
                  <Label>Descrição</Label>
                  <p className="text-muted-foreground">{selectedTemplate.description}</p>
                </div>
              )}
              <div>
                <Label>Turnos Configurados</Label>
                <div className="space-y-2 mt-2">
                  {selectedTemplate.template_data.shifts.map((shift, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{getDayName(shift.dayOfWeek)}</span>
                      <span className="text-muted-foreground">
                        {shift.startTime} - {shift.endTime}
                      </span>
                      <Badge variant="outline">
                        {shift.requiredEmployees} pessoas
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              {selectedTemplate.template_data.notes && (
                <div>
                  <Label>Observações</Label>
                  <p className="text-muted-foreground">{selectedTemplate.template_data.notes}</p>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Fechar
                </Button>
                <Button onClick={() => {
                  handleUseTemplate(selectedTemplate);
                  setIsViewModalOpen(false);
                }}>
                  <Copy className="h-4 w-4 mr-2" />
                  Usar Modelo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
