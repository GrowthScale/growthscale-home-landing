import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Settings, 
  Shield, 
  Users, 
  CreditCard, 
  Bell,
  Save,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccessControl } from '@/hooks/useAccessControl';
import { AccessControl } from '@/components/AccessControl';

const CompanySettings = () => {
  const navigate = useNavigate();
  const { can, role } = useAccessControl();
  const [isLoading, setIsLoading] = useState(false);

  // Estados para os formulários
  const [companyInfo, setCompanyInfo] = useState({
    name: 'GrowthScale Demo',
    cnpj: '12.345.678/0001-90',
    tradeName: 'GrowthScale',
    description: 'Empresa de demonstração do sistema de gestão de escalas'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    push: false
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    passwordPolicy: 'strong'
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Aqui você implementaria a lógica real de salvamento
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Settings className="mr-3 h-8 w-8 text-primary" />
                Configurações da Empresa
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie as configurações da sua empresa
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Role: {role}</span>
            </Badge>
          </div>
        </div>

        <AccessControl requiredPermission="manage:company_settings">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações da Empresa */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Informações da Empresa</span>
                  </CardTitle>
                  <CardDescription>
                    Dados básicos da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input
                        id="company-name"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nome da empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-cnpj">CNPJ</Label>
                      <Input
                        id="company-cnpj"
                        value={companyInfo.cnpj}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, cnpj: e.target.value }))}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-trade-name">Nome Fantasia</Label>
                    <Input
                      id="company-trade-name"
                      value={companyInfo.tradeName}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, tradeName: e.target.value }))}
                      placeholder="Nome fantasia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Descrição</Label>
                    <Textarea
                      id="company-description"
                      value={companyInfo.description}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descrição da empresa"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notificações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Notificações</span>
                  </CardTitle>
                  <CardDescription>
                    Configure como receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por WhatsApp
                      </p>
                    </div>
                    <Switch
                      checked={notifications.whatsapp}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, whatsapp: checked }))}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações push no navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Segurança */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Segurança</span>
                  </CardTitle>
                  <CardDescription>
                    Configurações de segurança da conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação em Duas Etapas</Label>
                      <p className="text-sm text-muted-foreground">
                        Adicionar uma camada extra de segurança
                      </p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Tempo de Sessão (minutos)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 30 }))}
                      min="5"
                      max="480"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ações Rápidas */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard/employees')}
                    className="w-full"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Gerenciar Funcionários
                  </Button>
                  
                  <AccessControl requiredPermission="view:billing">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/dashboard/billing')}
                      className="w-full"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Faturamento
                    </Button>
                  </AccessControl>
                </CardContent>
              </Card>

              {/* Informações do Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Versão</span>
                    <span className="text-sm font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Última Atualização</span>
                    <span className="text-sm font-medium">Hoje</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant="default" className="text-xs">Ativo</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AccessControl>
      </div>
    </div>
  );
};

export default CompanySettings;
