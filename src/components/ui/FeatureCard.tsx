import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from 'react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  iconClassName?: string;
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  children, 
  iconClassName = "text-primary",
  className = "",
  onClick 
}: FeatureCardProps) {
  return (
    <Card 
      className={`p-6 hover:shadow-lg transition-all duration-300 ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className={`h-6 w-6 ${iconClassName}`} />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">{children}</div>
      </CardContent>
    </Card>
  );
}
