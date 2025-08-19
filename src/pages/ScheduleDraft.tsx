import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Clock,
  Users,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { scheduleDraftService, type ScheduleDraft } from '@/services/api';
import { useTenant } from '@/contexts/TenantContext';
import { toast } from '@/hooks/use-toast';

export default function ScheduleDraft() {
  const { draftId } = useParams<{ draftId: string }>();
  const navigate = useNavigate();
  const { currentTenant } = useTenant();
  const queryClient = useQueryClient();

  // Buscar detalhes do rascunho
  const { data: draft, isLoading, error } = useQuery({
    queryKey: ['scheduleDraft', draftId],
    queryFn: async () => {
      if (!draftId) {throw new Error('ID do rascunho não fornecido');}
      
      // Como não temos um método específico para buscar por ID, vamos buscar todos e filtrar
      const response = await scheduleDraftService.getDrafts(currentTenant?.id || '');
      if (response.error) {throw new Error(response.error);}
      
      const foundDraft = response.data?.find(d => d.id === draftId);
      if (!foundDraft) {throw new Error('Rascunho não encontrado');}
      
      return foundDraft;
    },
    enabled: !!draftId && !!currentTenant?.id,
  });

  // Mutação para aprovar rascunho
  const approveMutation = useMutation({
    mutationFn: async (draftId: string) => {
      const response = await scheduleDraftService.approveDraft(draftId);
      if (response.error) {throw new Error(response.error);}
    },
    onSuccess: () => {
      toast({
        title: "Rascunho Aprovado!",
        description: "A escala foi aprovada e está pronta para uso.",
      });
      queryClient.invalidateQueries({ queryKey: ['pendingDraft'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: "Erro ao Aprovar",
        description: error.message || "Não foi possível aprovar o rascunho.",
        variant: "destructive",
      });
    },
  });

  // Mutação para rejeitar rascunho
  const dismissMutation = useMutation({
    mutationFn: async (draftId: string) => {
      const response = await scheduleDraftService.dismissDraft(draftId);
      if (response.error) {throw new Error(response.error);}
    },
    onSuccess: () => {
      toast({
        title: "Rascunho Rejeitado",
        description: "O rascunho foi descartado.",
      });
      queryClient.invalidateQueries({ queryKey: ['pendingDraft'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: "Erro ao Rejeitar",
        description: error.message || "Não foi possível rejeitar o rascunho.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !draft) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-destructive">
              Rascunho não encontrado
            </h1>
            <p className="text-muted-foreground">
              O rascunho que você está procurando não existe ou foi removido.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Formatar data da semana
  const weekStart = draft.target_week_start 
    ? format(new Date(draft.target_week_start), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : '';

  // Contar funcionários na sugestão
  const employeeCount = draft.draft_data?.length || 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Revisar Rascunho de Escala</h1>
              <p className="text-muted-foreground">
                Semana de {weekStart}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Aguardando Revisão
          </Badge>
        </div>

        {/* Informações do Rascunho */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Detalhes da Escala Sugerida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Funcionários:</span>
                <span className="font-medium">{employeeCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gerado em:</span>
                <span className="font-medium">
                  {format(new Date(draft.created_at), "dd/MM 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="outline">{draft.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview da Escala */}
        <Card>
          <CardHeader>
            <CardTitle>Preview da Escala Sugerida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-4">
                A IA gerou uma sugestão de escala otimizada para a próxima semana. 
                Abaixo está um preview das alocações sugeridas:
              </p>
              
              {/* Aqui você pode implementar uma visualização mais detalhada */}
              <div className="space-y-2">
                {draft.draft_data?.map((allocation: Record<string, unknown>, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                    <span className="text-sm">
                      Funcionário {(allocation.employeeId as string) || `#${index + 1}`}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Turno {(allocation.shiftId as string) || `#${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Dica:</strong> Esta escala foi otimizada considerando a carga de trabalho, 
                  habilidades dos funcionários e compliance com a CLT.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Cancelar
          </Button>
          
          <Button
            variant="destructive"
            onClick={() => dismissMutation.mutate(draft.id)}
            disabled={approveMutation.isPending || dismissMutation.isPending}
          >
            {dismissMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            Rejeitar
          </Button>
          
          <Button
            onClick={() => approveMutation.mutate(draft.id)}
            disabled={approveMutation.isPending || dismissMutation.isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {approveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Aprovar Escala
          </Button>
        </div>
      </div>
    </div>
  );
}
