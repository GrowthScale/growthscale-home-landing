import React from 'react';
import { RBACExample } from '@/components/RBACExample';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Lock } from 'lucide-react';

export default function RBACDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">RBAC Demo</h1>
            <Badge variant="outline">Demonstração</Badge>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container py-8">
        {/* Introdução */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Controle de Acesso Baseado em Papéis (RBAC)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Esta página demonstra como o sistema de controle de acesso funciona na prática. 
              Diferentes seções e funcionalidades são exibidas baseadas no papel do usuário logado.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Owner
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acesso total: faturamento, configurações, todos os funcionários e escalas.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Manager
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acesso à unidade: escalas e funcionários da própria unidade.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Employee
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acesso limitado: apenas sua própria escala e horários.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Componente de exemplo do RBAC */}
        <RBACExample />
      </div>
    </div>
  );
}
