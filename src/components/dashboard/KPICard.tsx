import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  status?: "good" | "warning" | "critical" | "neutral";
  className?: string;
}

const KPICard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend = "neutral",
  status = "neutral",
  className 
}: KPICardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-success border-success/20 bg-success/5";
      case "warning":
        return "text-accent border-accent/20 bg-accent/5";
      case "critical":
        return "text-destructive border-destructive/20 bg-destructive/5";
      default:
        return "text-primary border-primary/20 bg-primary/5";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      default:
        return "→";
    }
  };

  return (
    <Card className={cn(
      "group hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer border-2",
      getStatusColor(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{title}</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-card-foreground">{value}</div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">{description}</span>
                <span className="text-xs">{getTrendIcon()}</span>
              </div>
            </div>
          </div>
          <div className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
            status === "good" && "bg-success/10",
            status === "warning" && "bg-accent/10", 
            status === "critical" && "bg-destructive/10",
            status === "neutral" && "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              status === "good" && "text-success",
              status === "warning" && "text-accent",
              status === "critical" && "text-destructive", 
              status === "neutral" && "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;