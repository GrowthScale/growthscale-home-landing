import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Clock,
  X
} from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "success" | "info" | "warning";
  title: string;
  message: string;
  time: string;
  priority: "high" | "medium" | "low";
}

const NotificationsPanel = () => {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "alert",
      title: "Compliance Alert",
      message: "Funcionário João Santos excedeu limite de horas semanais",
      time: "2 min atrás",
      priority: "high"
    },
    {
      id: "2", 
      type: "warning",
      title: "Ausência Detectada",
      message: "Maria Oliveira não compareceu ao turno das 08:00",
      time: "15 min atrás",
      priority: "medium"
    },
    {
      id: "3",
      type: "success",
      title: "Escala Otimizada",
      message: "Sistema ajustou automaticamente a escala de amanhã",
      time: "1 hora atrás",
      priority: "low"
    },
    {
      id: "4",
      type: "info",
      title: "Relatório Disponível",
      message: "Relatório mensal de produtividade está pronto",
      time: "2 horas atrás",
      priority: "low"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <Clock className="h-4 w-4 text-accent" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 border-destructive/20";
      case "medium":
        return "bg-accent/10 border-accent/20";
      default:
        return "bg-muted/50 border-border";
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notificações e Alertas</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {notifications.length} novas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-soft ${getPriorityColor(notification.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 ml-2 hover:bg-background"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
          >
            Ver Todas as Notificações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;