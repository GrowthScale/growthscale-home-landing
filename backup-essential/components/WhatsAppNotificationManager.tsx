import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { whatsAppNotificationService, CommunicationLog } from '@/services/api';
import { Loader2, MessageCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface WhatsAppNotificationManagerProps {
  employeeIds: string[];
  scheduleId: string;
  tenantId: string;
  onNotificationSent?: () => void;
}

export function WhatsAppNotificationManager({
  employeeIds,
  scheduleId,
  tenantId,
  onNotificationSent
}: WhatsAppNotificationManagerProps) {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const { toast } = useToast();

  // Carregar logs de comunicação ao montar o componente
  useEffect(() => {
    loadCommunicationLogs();
  }, [tenantId, loadCommunicationLogs]);

  const loadCommunicationLogs = useCallback(async () => {
    setIsLoadingLogs(true);
    try {
      const response = await whatsAppNotificationService.getCommunicationLogs(tenantId);
      if (response.data) {
        setCommunicationLogs(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
    } finally {
      setIsLoadingLogs(false);
    }
  }, [tenantId]);

  const handleSendNotifications = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, configure a URL do webhook WhatsApp",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await whatsAppNotificationService.sendScheduleNotifications({
        employeeIds,
        scheduleId,
        webhookUrl: webhookUrl.trim(),
        tenantId
      });

      if (response.data?.success) {
        toast({
          title: "Sucesso",
          description: "Notificações enviadas com sucesso!",
        });
        
        // Recarregar logs
        await loadCommunicationLogs();
        
        // Callback para notificar componente pai
        onNotificationSent?.();
      } else {
        throw new Error(response.error || 'Erro ao enviar notificações');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: `Falha ao enviar notificações: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <Badge variant="default" className="bg-green-100 text-green-800">Enviado</Badge>;
      case 'FAILED':
        return <Badge variant="destructive">Falhou</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuração do Webhook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Configuração de Notificações WhatsApp
          </CardTitle>
          <CardDescription>
            Configure o webhook para enviar notificações de escala via WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL do Webhook WhatsApp</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://api.whatsapp.com/webhook/your-endpoint"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Configure a URL do webhook que receberá as mensagens para envio via WhatsApp
            </p>
          </div>
          
          <Button
            onClick={handleSendNotifications}
            disabled={isLoading || !webhookUrl.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar Notificações
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Logs de Comunicação */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Notificações</CardTitle>
          <CardDescription>
            Logs de todas as tentativas de envio de notificações
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingLogs ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : communicationLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {/* TODO: Substituir por EmptyStateIllustration com:
                - Imagem: WhatsApp vazio com balões de mensagem
                - Título: "Nenhuma comunicação registrada"
                - Descrição: "Os logs de notificações aparecerão aqui quando você enviar mensagens"
                - Botão: "Enviar Primeira Notificação"
                - Ação: Focar no botão de envio */}
              Nenhum log de comunicação encontrado
            </div>
          ) : (
            <div className="space-y-3">
              {communicationLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <p className="font-medium">
                        {log.type === 'WHATSAPP_SCHEDULE_NOTIFICATION' 
                          ? 'Notificação de Escala' 
                          : log.type
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(log.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {communicationLogs.length > 0 && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={loadCommunicationLogs}
                disabled={isLoadingLogs}
              >
                {isLoadingLogs ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Atualizar Logs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
