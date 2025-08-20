import React from 'react';
import { useAccessControl } from '@/hooks/useAccessControl';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FeatureGate } from '@/components/FeatureGate';
import { 
  Zap, 
  Shield, 
  Users, 
  Calendar, 
  Brain, 
  TrendingUp, 
  Star,
  Lock,
  Clock
} from 'lucide-react';

export function FeatureGatingDemo() {
  const { 
    role, 
    plan, 
    isTrialActive, 
    can, 
    getTrialStatus,
    canAccessFeature 
  } = useAccessControl();
  
  const { 
    daysLeftInTrial, 
    isTrialExpired 
  } = useTrialStatus();

  const trialStatus = getTrialStatus();

  return (
    <div className="space-y-6">
      {/* Status do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Status do Usuário</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Role</h3>
              <Badge variant="outline" className="mt-2">
                {role}
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Plano</h3>
              <Badge variant={plan === 'free' ? 'secondary' : 'default'} className="mt-2">
                {plan}
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Trial</h3>
              <Badge variant={isTrialActive ? 'default' : 'secondary'} className="mt-2">
                {isTrialActive ? 'Ativo' : 'Inativo'}
              </Badge>
              {isTrialActive && (
                <p className="text-sm text-muted-foreground mt-1">
                  {daysLeftInTrial} dias restantes
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teste de Permissões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Teste de Permissões</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Permissões de Role</h4>
              <div className="space-y-2">
                {['view:billing', 'manage:company_settings', 'manage:all_schedules'].map(permission => (
                  <div key={permission} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{permission}</span>
                    <Badge variant={can(permission) ? 'default' : 'secondary'}>
                      {can(permission) ? 'Permitido' : 'Negado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Permissões de Plano</h4>
              <div className="space-y-2">
                {['use:ai_suggestion', 'view:advanced_analytics', 'use:api_access'].map(permission => (
                  <div key={permission} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{permission}</span>
                    <Badge variant={can(permission) ? 'default' : 'secondary'}>
                      {can(permission) ? 'Permitido' : 'Negado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Gates Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureGate feature="ai_suggestions">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-green-600" />
                <span>IA para Otimização</span>
                <Badge variant="default" className="bg-green-600">Disponível</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Use inteligência artificial para otimizar suas escalas automaticamente.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Zap className="h-4 w-4 mr-2" />
                Gerar Sugestões
              </Button>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate feature="advanced_analytics">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Analytics Avançados</span>
                <Badge variant="default" className="bg-green-600">Disponível</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Relatórios detalhados e insights para melhorar sua operação.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate feature="whatsapp_notifications">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Notificações WhatsApp</span>
                <Badge variant="default" className="bg-green-600">Disponível</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Envie escalas e lembretes diretamente via WhatsApp.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Calendar className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate feature="api_access">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-green-600" />
                <span>Acesso à API</span>
                <Badge variant="default" className="bg-green-600">Disponível</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Integre o GrowthScale com seus sistemas existentes.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Star className="h-4 w-4 mr-2" />
                Ver Documentação
              </Button>
            </CardContent>
          </Card>
        </FeatureGate>
      </div>

      {/* Informações do Trial */}
      {isTrialActive && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span>Status do Trial</span>
              <Badge variant="default" className="bg-yellow-600">Trial Ativo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium">Dias Restantes</h4>
                <p className="text-2xl font-bold text-yellow-600">{trialStatus.daysLeftInTrial}</p>
              </div>
              <div>
                <h4 className="font-medium">Data de Expiração</h4>
                <p className="text-sm text-muted-foreground">
                  {trialStatus.trialEndsAt?.toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Acesso Atual</h4>
                <p className="text-sm text-muted-foreground">
                  Funcionalidades do plano Starter
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isTrialExpired && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <span>Trial Expirado</span>
              <Badge variant="destructive">Expirado</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Seu período de teste expirou. Faça upgrade para continuar usando todas as funcionalidades.
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              Fazer Upgrade Agora
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
