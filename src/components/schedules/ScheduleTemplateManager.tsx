import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleTemplateService, ScheduleTemplate, CreateScheduleTemplateDto } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ScheduleTemplateManagerProps {
  onTemplateSelect?: (template: ScheduleTemplate) => void;
  onApplyTemplate?: (template: ScheduleTemplate) => void;
  onClose?: () => void;
}

export function ScheduleTemplateManager({ onTemplateSelect }: ScheduleTemplateManagerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-destructive">Erro ao carregar modelos: {error.message}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Modelos de Escala</h2>
          <p className="text-muted-foreground">
            Gerencie modelos para criar escalas rapidamente
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Modelo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-modal-md">
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

      {/* Modelos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {template.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Modelo Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{template.template_data.shifts.length} turnos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{template.template_data.employees?.length || 0} funcionários</span>
                  </div>
                </div>

                {/* Shifts Preview */}
                {template.template_data.shifts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Turnos:</p>
                    <div className="space-y-1">
                      {template.template_data.shifts.slice(0, 3).map((shift, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{getDayName(shift.dayOfWeek)}</span>
                          <span className="text-muted-foreground">
                            {shift.startTime} - {shift.endTime}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {shift.requiredEmployees} pessoas
                          </Badge>
                        </div>
                      ))}
                      {template.template_data.shifts.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{template.template_data.shifts.length - 3} mais turnos
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {template.template_data.notes && (
                  <div className="flex items-start space-x-2 text-xs">
                    <FileText className="h-3 w-3 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{template.template_data.notes}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Usar Modelo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {templates?.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            {/* TODO: Substituir por EmptyStateIllustration com:
              - Imagem: Calendário vazio com ícones de turnos
              - Título: "Nenhum modelo criado"
              - Descrição: "Crie seu primeiro modelo para agilizar a criação de escalas"
              - Botão: "Criar Primeiro Modelo" com ícone Plus
              - Ação: Abrir modal de criação */}
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum modelo criado</h3>
            <p className="text-muted-foreground mb-4">
              Crie seu primeiro modelo para agilizar a criação de escalas
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Modelo
            </Button>
          </CardContent>
        </Card>
      )}

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
    </div>
  );
}
