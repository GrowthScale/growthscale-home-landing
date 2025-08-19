import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  UserPlus, 
  Settings, 
  FileText,
  Clock
} from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  details: string;
  time: string;
  type: "schedule" | "user" | "system" | "report";
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    {
      id: "1",
      user: "João Santos",
      action: "criou uma nova escala",
      details: "Escala da semana 15-21 Dezembro",
      time: "5 min atrás",
      type: "schedule"
    },
    {
      id: "2",
      user: "Sistema",
      action: "corrigiu inconsistência de compliance",
      details: "Ajuste automático na escala de Maria Silva",
      time: "12 min atrás", 
      type: "system"
    },
    {
      id: "3",
      user: "Ana Costa",
      action: "adicionou novo funcionário",
      details: "Pedro Mendes - Auxiliar de Cozinha",
      time: "25 min atrás",
      type: "user"
    },
    {
      id: "4",
      user: "Sistema",
      action: "gerou relatório de produtividade",
      details: "Relatório semanal disponível",
      time: "45 min atrás",
      type: "report"
    },
    {
      id: "5",
      user: "Carlos Oliveira",
      action: "atualizou configurações",
      details: "Alteração nos horários de funcionamento",
      time: "1 hora atrás",
      type: "system"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "schedule":
        return <Calendar className="h-4 w-4 text-primary" />;
      case "user":
        return <UserPlus className="h-4 w-4 text-success" />;
      case "system":
        return <Settings className="h-4 w-4 text-accent" />;
      case "report":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getUserInitials = (name: string) => {
    if (name === "Sistema") {return "S";}
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getUserInitials(activity.user)}
                </AvatarFallback>
              </Avatar>
              {index < activities.length - 1 && (
                <div className="absolute top-10 left-4 w-0.5 h-8 bg-border"></div>
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {getActivityIcon(activity.type)}
                    <span className="text-sm font-medium text-foreground">
                      {activity.user}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {activity.action}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    {activity.details}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Ver histórico completo →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;