import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Eye,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { scheduleDraftService, type ScheduleDraft } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { toast } from '@/hooks/use-toast';

interface PendingDraftCardProps {
  className?: string;
}

export function PendingDraftCard({ className }: PendingDraftCardProps) {
  const { user } = useAuth();
  const { tenant } = useTenant();
  const queryClient = useQueryClient();

  // Buscar rascunho pendente
  const { data: pendingDraft, isLoading, error } = useQuery({
    queryKey: ['pendingDraft', tenant?.id],
    queryFn: async () => {
      if (!tenant?.id) {return null;}
      const response = await scheduleDraftService.getPendingDraft(tenant.id);
      if (response.error) {throw new Error(response.error);}
      return response.data;
    },
    enabled: !!tenant?.id,
    refetchInterval: 30000, // Refetch a cada 30 segundos
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
    },
    onError: (error) => {
      toast({
        title: "Erro ao Rejeitar",
        description: error.message || "Não foi possível rejeitar o rascunho.",
        variant: "destructive",
      });
    },
  });

  // Se não há rascunho pendente, não renderizar o card
  if (!isLoading && !pendingDraft) {
    return null;
  }

  // Se está carregando, mostrar skeleton
  if (isLoading) {
    return (
      <Card className={`border-l-4 border-l-yellow-500 ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Se há erro, não renderizar
  if (error) {
    return null;
  }

  // Formatar data da semana
  const weekStart = pendingDraft?.target_week_start 
    ? format(new Date(pendingDraft.target_week_start), "dd 'de' MMMM", { locale: ptBR })
    : '';

  // Contar funcionários na sugestão
  const employeeCount = pendingDraft?.draft_data?.length || 0;

  return (
    <Card className={`border-l-4 border-l-yellow-500 bg-yellow-50/50 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-base text-yellow-800">
              Rascunho de Escala Pendente
            </CardTitle>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Aguardando Revisão
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Semana de {weekStart}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A IA gerou uma sugestão de escala com {employeeCount} alocações para a próxima semana.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              // TODO: Implementar visualização detalhada
              toast({
                title: "Visualização",
                description: "Funcionalidade de visualização será implementada em breve.",
              });
            }}
            variant="outline"
            className="flex-1"
          >
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          
          <Button
            size="sm"
            onClick={() => approveMutation.mutate(pendingDraft!.id)}
            disabled={approveMutation.isPending || dismissMutation.isPending}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {approveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Aprovar
          </Button>
          
          <Button
            size="sm"
            variant="destructive"
            onClick={() => dismissMutation.mutate(pendingDraft!.id)}
            disabled={approveMutation.isPending || dismissMutation.isPending}
          >
            {dismissMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            Rejeitar
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Gerado automaticamente em {format(new Date(pendingDraft!.created_at), "dd/MM 'às' HH:mm", { locale: ptBR })}
        </div>
      </CardContent>
    </Card>
  );
}
