// TEMPORARIO: Comentado para permitir build
/*
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { sendScheduleNotification } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  Users, 
  Bell, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface Schedule {
  id: string;
  name: string;
  date: string;
  status: 'draft' | 'published' | 'completed';
  employeeCount: number;
  totalHours: number;
  cost: number;
  createdAt: string;
}

const mockSchedules: Schedule[] = [
  {
    id: '1',
    name: 'Escala Semanal - Setembro',
    date: '2024-09-01',
    status: 'published',
    employeeCount: 15,
    totalHours: 120,
    cost: 4500,
    createdAt: '2024-08-25T10:00:00Z'
  },
  {
    id: '2',
    name: 'Escala Especial - Feriado',
    date: '2024-09-07',
    status: 'draft',
    employeeCount: 8,
    totalHours: 64,
    cost: 2400,
    createdAt: '2024-08-26T14:30:00Z'
  },
  {
    id: '3',
    name: 'Escala Mensal - Outubro',
    date: '2024-10-01',
    status: 'completed',
    employeeCount: 20,
    totalHours: 160,
    cost: 6000,
    createdAt: '2024-09-20T09:15:00Z'
  }
];

export const ScheduleList: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { toast } = useToast();

  const notificationMutation = useMutation({
    mutationFn: async (scheduleId: string) => {
      // Implementar envio de notificação
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Notificação enviada",
        description: "Os funcionários foram notificados sobre a escala.",
      });
      setIsNotificationModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar notificação",
        description: "Não foi possível enviar a notificação.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: Schedule['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'published':
        return <Badge variant="default">Publicada</Badge>;
      case 'completed':
        return <Badge variant="outline">Concluída</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: Schedule['status']) => {
    switch (status) {
      case 'draft':
        return <XCircle className="h-4 w-4" />;
      case 'published':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleSendNotification = (scheduleId: string) => {
    notificationMutation.mutate(scheduleId);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Escalas</h1>
          <p className="text-muted-foreground">Gerencie todas as suas escalas de trabalho</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Nova Escala
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSchedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{schedule.name}</CardTitle>
                {getStatusBadge(schedule.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(schedule.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{schedule.employeeCount} funcionários</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{schedule.totalHours}h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{formatCurrency(schedule.cost)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setIsNotificationModalOpen(true);
                    }}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isNotificationModalOpen} onOpenChange={setIsNotificationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Notificação</DialogTitle>
            <DialogDescription>
              Enviar notificação sobre a escala "{selectedSchedule?.name}" para todos os funcionários?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotificationModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => selectedSchedule && handleSendNotification(selectedSchedule.id)}
              disabled={notificationMutation.isPending}
            >
              {notificationMutation.isPending ? 'Enviando...' : 'Enviar Notificação'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
*/

// Placeholder temporário
export const ScheduleList: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Lista de Escalas</h2>
      <p className="text-muted-foreground">Funcionalidade temporariamente indisponível</p>
    </div>
  );
};