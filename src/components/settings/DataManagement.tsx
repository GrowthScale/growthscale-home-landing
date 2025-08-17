import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Trash2, 
  Eye, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Users,
  Calendar,
  MessageSquare,
  Building
} from 'lucide-react';
import { AccountService } from '@/services/accountService';
import { toast } from '@/hooks/use-toast';

export function DataManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [userDataInfo, setUserDataInfo] = useState({
    hasCompanies: false,
    hasEmployees: false,
    hasSchedules: false,
    hasLogs: false
  });

  useEffect(() => {
    loadUserDataInfo();
  }, []);

  const loadUserDataInfo = async () => {
    try {
      const dataInfo = await AccountService.hasUserData();
      setUserDataInfo(dataInfo);
    } catch (error) {
      console.error('Erro ao carregar informações dos dados:', error);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      const userData = await AccountService.exportUserData();
      
      // Criar arquivo JSON para download
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `growthscale-user-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Dados exportados com sucesso!",
        description: "O arquivo foi baixado para o seu computador.",
      });
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      toast({
        title: "Erro ao exportar dados",
        description: "Não foi possível exportar os seus dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymizeData = async () => {
    setIsLoading(true);
    try {
      await AccountService.anonymizeUserData();
      
      toast({
        title: "Dados anonimizados com sucesso!",
        description: "Seus dados pessoais foram anonimizados.",
      });
      
      setShowAnonymizeDialog(false);
      loadUserDataInfo(); // Recarregar informações
    } catch (error) {
      console.error('Erro ao anonimizar dados:', error);
      toast({
        title: "Erro ao anonimizar dados",
        description: "Não foi possível anonimizar os seus dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteReason.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, informe o motivo da exclusão da conta.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await AccountService.deleteAccount({
        reason: deleteReason,
        permanent: true
      });
      
      toast({
        title: "Conta excluída com sucesso!",
        description: "Todos os seus dados foram removidos permanentemente.",
      });
      
      // Redirecionar para página inicial após exclusão
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast({
        title: "Erro ao excluir conta",
        description: "Não foi possível excluir a sua conta. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const hasAnyData = userDataInfo.hasCompanies || userDataInfo.hasEmployees || 
                    userDataInfo.hasSchedules || userDataInfo.hasLogs;

  return (
    <div className="space-y-6">
      {/* Seção de Informações dos Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Seus Dados na Plataforma</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Empresas</p>
                <p className="text-sm text-muted-foreground">
                  {userDataInfo.hasCompanies ? 'Dados encontrados' : 'Nenhum dado'}
                </p>
              </div>
              {userDataInfo.hasCompanies && (
                <Badge variant="secondary">Presente</Badge>
              )}
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Funcionários</p>
                <p className="text-sm text-muted-foreground">
                  {userDataInfo.hasEmployees ? 'Dados encontrados' : 'Nenhum dado'}
                </p>
              </div>
              {userDataInfo.hasEmployees && (
                <Badge variant="secondary">Presente</Badge>
              )}
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Escalas</p>
                <p className="text-sm text-muted-foreground">
                  {userDataInfo.hasSchedules ? 'Dados encontrados' : 'Nenhum dado'}
                </p>
              </div>
              {userDataInfo.hasSchedules && (
                <Badge variant="secondary">Presente</Badge>
              )}
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium">Logs de Comunicação</p>
                <p className="text-sm text-muted-foreground">
                  {userDataInfo.hasLogs ? 'Dados encontrados' : 'Nenhum dado'}
                </p>
              </div>
              {userDataInfo.hasLogs && (
                <Badge variant="secondary">Presente</Badge>
              )}
            </div>
          </div>

          {!hasAnyData && (
            <div className="mt-4 p-4 bg-muted rounded-lg text-center">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Nenhum dado encontrado na sua conta.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seção de Exportação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-primary" />
            <span>Exportar Seus Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Baixe uma cópia de todos os seus dados em formato JSON. Esta ação é gratuita e 
            pode ser realizada a qualquer momento.
          </p>
          
          <Button 
            onClick={handleExportData} 
            disabled={isLoading || !hasAnyData}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar Dados
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Seção de Anonimização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Anonimizar Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium">O que acontece?</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Seus dados pessoais serão substituídos por valores anônimos</li>
                  <li>• A estrutura dos dados será mantida</li>
                  <li>• Você poderá continuar usando a plataforma</li>
                  <li>• Esta ação pode ser desfeita entrando em contato com o suporte</li>
                </ul>
              </div>
            </div>

            <Dialog open={showAnonymizeDialog} onOpenChange={setShowAnonymizeDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={!hasAnyData}>
                  <Shield className="mr-2 h-4 w-4" />
                  Anonimizar Dados
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Anonimização</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja anonimizar os seus dados? Esta ação irá substituir 
                    informações pessoais por valores anônimos, mas manterá a estrutura dos dados.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAnonymizeDialog(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAnonymizeData} 
                    disabled={isLoading}
                    variant="outline"
                  >
                    {isLoading ? 'Anonimizando...' : 'Confirmar Anonimização'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Seção de Exclusão de Conta */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <Trash2 className="h-5 w-5 text-red-600" />
            <span>Excluir Conta Permanentemente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-700">⚠️ Ação Irreversível</p>
                <ul className="text-sm text-red-600 mt-1 space-y-1">
                  <li>• Todos os seus dados serão excluídos permanentemente</li>
                  <li>• Suas empresas e funcionários serão removidos</li>
                  <li>• Todas as escalas e configurações serão perdidas</li>
                  <li>• Esta ação não pode ser desfeita</li>
                </ul>
              </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Conta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Exclusão de Conta</DialogTitle>
                  <DialogDescription>
                    Esta ação é irreversível. Todos os seus dados serão excluídos permanentemente.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deleteReason">Motivo da exclusão (obrigatório)</Label>
                    <Textarea
                      id="deleteReason"
                      placeholder="Por favor, informe o motivo da exclusão da sua conta..."
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <p className="text-sm font-medium text-red-700">Última chance</p>
                    </div>
                    <p className="text-sm text-red-600 mt-1">
                      Após confirmar, todos os seus dados serão perdidos para sempre.
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleDeleteAccount} 
                    disabled={isLoading || !deleteReason.trim()}
                    variant="destructive"
                  >
                    {isLoading ? 'Excluindo...' : 'Excluir Conta Permanentemente'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
