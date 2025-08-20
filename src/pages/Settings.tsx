import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Download,
  Trash2,
  Save,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { DataManagement } from '@/components/settings/DataManagement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { deleteUserAccount } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      scheduleUpdates: true,
      employeeChanges: true
    },
    theme: 'system',
    language: 'pt-BR',
    autoSave: true,
    dataRetention: 30
  });

  // const deleteAccountMutation = useMutation({
  //   mutationFn: deleteUserAccount,
  //   onSuccess: async () => {
  //     // Limpa a sessão e redireciona para a página inicial após a exclusão
  //     await supabase.auth.signOut();
  //     queryClient.clear();
  //     navigate('/');
  //     toast({ 
  //       title: "Conta Eliminada", 
  //       description: "A sua conta e todos os seus dados foram eliminados permanentemente." 
  //     });
  //   },
  //   onError: (error: any) => {
  //     toast({ 
  //       title: "Erro ao Eliminar a Conta", 
  //       description: error.message, 
  //       variant: 'destructive' 
  //     });
  //   }
  // });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-primary rounded-lg shadow-soft">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-body">Configurações</h1>
              <p className="text-muted-foreground mt-1">
                Personalize sua experiência no GrowthScale
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue="Admin GrowthScale" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@growthscale.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" defaultValue="GrowthScale Foods" />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Notificações por Email</Label>
                <Switch 
                  id="email-notifications" 
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Notificações Push</Label>
                <Switch 
                  id="push-notifications" 
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule-updates">Atualizações de Escala</Label>
                <Switch 
                  id="schedule-updates" 
                  checked={settings.notifications.scheduleUpdates}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, scheduleUpdates: checked }
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Aparência</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={settings.theme === 'light' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    Claro
                  </Button>
                  <Button 
                    variant={settings.theme === 'dark' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                  >
                    <Moon className="h-4 w-4 mr-1" />
                    Escuro
                  </Button>
                  <Button 
                    variant={settings.theme === 'system' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSettings(prev => ({ ...prev, theme: 'system' }))}
                  >
                    Sistema
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Português (Brasil)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Segurança</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full">
                Autenticação em Dois Fatores
              </Button>
              <Separator />
              <div className="space-y-2">
                <Label>Sessões Ativas</Label>
                <p className="text-sm text-muted-foreground">
                  Você está conectado em 2 dispositivos
                </p>
                <Button variant="destructive" size="sm">
                  Encerrar Todas as Sessões
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-primary" />
                <span>Dados</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">Salvamento Automático</Label>
                <Switch 
                  id="auto-save" 
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoSave: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* System Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferências do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Retenção de Dados (dias)</Label>
                <Input 
                  id="data-retention" 
                  type="number" 
                  value={settings.dataRetention}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, dataRetention: parseInt(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fuso Horário</Label>
                <p className="text-sm text-muted-foreground">
                  América/São_Paulo (UTC-3)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Versão</Label>
                <p className="text-sm text-muted-foreground">
                  GrowthScale v2.4.1
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Zona de Perigo</CardTitle>
              <CardDescription>
                Estas ações são permanentes e não podem ser desfeitas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Eliminar a sua conta</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Ao eliminar a sua conta, todos os seus dados, incluindo empresas, funcionários e escalas, serão removidos permanentemente.
              </p>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={deleteAccountMutation.isPending}>
                    {deleteAccountMutation.isPending ? 'A eliminar...' : 'Eliminar a Minha Conta'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a sua conta e remover os seus dados dos nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteAccountMutation.mutate()}>
                      Sim, eliminar a minha conta
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="shadow-soft">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Gestão de Dados e Privacidade</h2>
          <p className="text-muted-foreground">
            Gerencie seus dados pessoais e controle sua privacidade na plataforma
          </p>
        </div>
        
        <DataManagement />
      </div>
    </div>
  );
}