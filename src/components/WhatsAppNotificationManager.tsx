// TEMPORARIO: Comentado para permitir build
/*
import React, { useState, useEffect, useCallback } from 'react';
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
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-accent" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <Badge variant="default" className="bg-accent/10 text-accent">Enviado</Badge>;
      case 'FAILED':
        return <Badge variant="destructive">Falhou</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Configuração de Notificações WhatsApp
          </CardTitle>
          <CardDescription>
            Configure o webhook para enviar notificações automáticas via WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL do Webhook WhatsApp</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://api.whatsapp.com/webhook/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Configure a URL do webhook do WhatsApp Business API
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

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Comunicação</CardTitle>
          <CardDescription>
            Logs das últimas notificações enviadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingLogs ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Carregando logs...</span>
            </div>
          ) : communicationLogs.length > 0 ? (
            <div className="space-y-4">
              {communicationLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <p className="font-medium">{log.employeeName}</p>
                      <p className="text-sm text-muted-foreground">{log.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(log.status)}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(log.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p>Nenhum log de comunicação encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
*/

// Placeholder temporário
export function WhatsAppNotificationManager() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Gerenciador de Notificações WhatsApp</h2>
      <p className="text-muted-foreground">Funcionalidade temporariamente indisponível</p>
    </div>
  );
}
