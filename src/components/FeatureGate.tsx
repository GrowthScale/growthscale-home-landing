import React from 'react';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lock, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Calendar,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
  className?: string;
}

interface FeatureInfo {
  name: string;
  description: string;
  icon: React.ReactNode;
  availableIn: string[];
  benefits: string[];
}

const featureDefinitions: Record<string, FeatureInfo> = {
  'ai_suggestions': {
    name: 'IA para Otimização de Escalas',
    description: 'Use inteligência artificial para criar escalas otimizadas automaticamente',
    icon: <Zap className="h-5 w-5" />,
    availableIn: ['starter', 'professional', 'enterprise'],
    benefits: [
      'Escalas otimizadas em segundos',
      'Redução de custos operacionais',
      'Maior satisfação dos funcionários'
    ]
  },
  'whatsapp_notifications': {
    name: 'Notificações via WhatsApp',
    description: 'Envie escalas e lembretes diretamente via WhatsApp',
    icon: <Calendar className="h-5 w-5" />,
    availableIn: ['starter', 'professional', 'enterprise'],
    benefits: [
      'Comunicação instantânea',
      'Redução de faltas',
      'Maior engajamento da equipe'
    ]
  },
  'advanced_analytics': {
    name: 'Analytics Avançados',
    description: 'Relatórios detalhados e insights para melhorar sua operação',
    icon: <Shield className="h-5 w-5" />,
    availableIn: ['professional', 'enterprise'],
    benefits: [
      'Métricas de produtividade',
      'Análise de custos',
      'Relatórios personalizados'
    ]
  },
  'custom_templates': {
    name: 'Templates Personalizados',
    description: 'Crie e salve templates de escala personalizados',
    icon: <Users className="h-5 w-5" />,
    availableIn: ['professional', 'enterprise'],
    benefits: [
      'Escalas padronizadas',
      'Economia de tempo',
      'Consistência operacional'
    ]
  },
  'api_access': {
    name: 'Acesso à API',
    description: 'Integre o GrowthScale com seus sistemas existentes',
    icon: <Star className="h-5 w-5" />,
    availableIn: ['professional', 'enterprise'],
    benefits: [
      'Integração com ERPs',
      'Automação completa',
      'Sincronização de dados'
    ]
  }
};

export function FeatureGate({ 
  feature, 
  children, 
  fallback,
  showUpgradePrompt = true,
  className = ''
}: FeatureGateProps) {
  const { canAccessFeature, isTrialing, isTrialExpired, currentPlan } = useTrialStatus();
  const navigate = useNavigate();

  // Se pode acessar a feature, renderiza normalmente
  if (canAccessFeature(feature)) {
    return <>{children}</>;
  }

  // Se não deve mostrar prompt de upgrade, renderiza fallback ou nada
  if (!showUpgradePrompt) {
    return fallback ? <>{fallback}</> : null;
  }

  const featureInfo = featureDefinitions[feature];
  if (!featureInfo) {
    return <>{children}</>; // Se não tem definição, permite acesso
  }

  const handleUpgrade = () => {
    navigate('/dashboard/billing');
  };

  return (
    <Card className={`border-2 border-dashed border-muted-foreground/20 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-muted rounded-lg">
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              {featureInfo.icon}
              <span>{featureInfo.name}</span>
              <Badge variant="secondary" className="text-xs">
                {isTrialing ? 'Trial' : 'Premium'}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {featureInfo.description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isTrialExpired && (
          <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">
              Seu trial expirou. Faça upgrade para continuar usando esta funcionalidade.
            </span>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Benefícios desta funcionalidade:</h4>
          <ul className="space-y-1">
            {featureInfo.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Disponível nos planos: {featureInfo.availableIn.join(', ')}
          </div>
          
          <Button onClick={handleUpgrade} className="bg-primary hover:bg-primary/90">
            {isTrialExpired ? 'Fazer Upgrade' : 'Ver Planos'}
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
