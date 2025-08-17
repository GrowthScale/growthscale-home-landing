import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'highlighted' | 'outline';
}

const FeatureCard = React.memo<FeatureCardProps>(({
  title,
  description,
  icon: Icon,
  className = '',
  onClick,
  variant = 'default'
}) => {
  const baseClasses = "p-8 rounded-lg shadow-lg border transition-all duration-300 hover:shadow-xl";
  
  const variantClasses = {
    default: "bg-white border-slate-200 hover:border-blue-200",
    highlighted: "bg-white border-2 border-blue-600 hover:border-blue-700",
    outline: "bg-transparent border-2 border-slate-300 hover:border-slate-400"
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <Card 
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
});

FeatureCard.displayName = 'FeatureCard';

export { FeatureCard };
