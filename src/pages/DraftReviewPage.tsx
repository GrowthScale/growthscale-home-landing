import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleDraftService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTenant } from '@/contexts/TenantContext';
import { toast } from '@/hooks/use-toast';

export default function DraftReviewPage() {
  const { draftId } = useParams<{ draftId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentTenant } = useTenant();

  const { data: draft, isLoading, isError } = useQuery({
    queryKey: ['scheduleDraft', draftId],
    queryFn: async () => {
      if (!draftId) throw new Error('ID do rascunho não fornecido');
      const response = await scheduleDraftService.getDraftById(draftId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!draftId,
  });

  const approveMutation = useMutation({
    mutationFn: async (scheduleData: any) => {
      if (!draftId) throw new Error('ID do rascunho não fornecido');
      const response = await scheduleDraftService.approveDraft(draftId, scheduleData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      toast({ 
        title: "Escala Aprovada!", 
        description: "A escala foi criada e publicada com sucesso." 
      });
      queryClient.invalidateQueries({ queryKey: ['pendingDraft'] });
      navigate('/schedules'); // Navega para a lista de escalas oficiais
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao Aprovar", 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  });

  const dismissMutation = useMutation({
    mutationFn: async () => {
      if (!draftId) throw new Error('ID do rascunho não fornecido');
      const response = await scheduleDraftService.dismissDraft(draftId);
      if (response.error) throw new Error(response.error);
    },
    onSuccess: () => {
      toast({ 
        title: "Rascunho Descartado", 
        description: "O rascunho foi removido com sucesso." 
      });
      queryClient.invalidateQueries({ queryKey: ['pendingDraft'] });
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao Descartar", 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !draft) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-destructive">
              Erro ao carregar o rascunho
            </h1>
            <p className="text-muted-foreground">
              Não foi possível carregar o rascunho solicitado. Tente novamente.
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

  // Função para ser chamada pelo editor quando a escala for salva/aprovada
  const handleApprove = (finalScheduleState: any) => {
    // Formate os dados aqui para o formato da sua tabela 'schedules' oficial
    const officialScheduleData = {
      tenant_id: draft.tenant_id,
      start_date: draft.target_week_start,
      end_date: draft.target_week_start, // Ajuste conforme necessário
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // ... outros campos da tabela 'schedules'
      shifts: finalScheduleState.shifts || draft.draft_data // os turnos, possivelmente ajustados pelo gestor
    };
    approveMutation.mutate(officialScheduleData);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
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
              <h1 className="text-3xl font-bold">Revisão do Rascunho da Escala</h1>
              <p className="text-muted-foreground">
                Ajuste os detalhes da sugestão da IA e aprove para publicá-la para sua equipe.
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
              <Sparkles className="h-5 w-5 text-primary" />
              Detalhes da Sugestão da IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Semana:</span>
                <span className="font-medium">{weekStart}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Alocações:</span>
                <span className="font-medium">{employeeCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gerado em:</span>
                <span className="font-medium">
                  {format(new Date(draft.created_at), "dd/MM 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview da Escala Sugerida */}
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
              
              <div className="space-y-2">
                {draft.draft_data?.map((allocation: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                    <span className="text-sm">
                      Funcionário {allocation.employeeId || `#${index + 1}`}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Turno {allocation.shiftId || `#${index + 1}`}
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
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => dismissMutation.mutate()}
            disabled={approveMutation.isPending || dismissMutation.isPending}
          >
            {dismissMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            Descartar Rascunho
          </Button>
          
          <Button 
            size="lg"
            onClick={() => handleApprove(draft.draft_data)}
            disabled={approveMutation.isPending || dismissMutation.isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {approveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Aprovar e Publicar
          </Button>
        </div>
      </div>
    </div>
  );
}
