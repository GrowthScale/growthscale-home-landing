import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, CheckCircle, Loader2 } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { useToast } from '@/components/ui/use-toast';

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SetupWizard({ isOpen, onClose }: SetupWizardProps) {
  const { createTenant } = useTenant();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite o nome da sua empresa.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await createTenant(companyName.trim(), cnpj.trim() || undefined);
      
      toast({
        title: "Empresa criada com sucesso!",
        description: "Sua empresa foi configurada e você já pode começar a usar o sistema.",
      });
      
      onClose();
      
      // Limpar formulário
      setCompanyName('');
      setCnpj('');
      
    } catch (error) {
      toast({
        title: "Erro ao criar empresa",
        description: error instanceof Error ? error.message : "Tente novamente em alguns momentos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Configurar Empresa</span>
          </DialogTitle>
          <DialogDescription>
            Para começar a usar o GrowthScale, precisamos configurar sua empresa.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados da Empresa</CardTitle>
            <CardDescription>
              Insira as informações básicas da sua empresa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Digite o nome da sua empresa"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                <Input
                  id="cnpj"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  placeholder="00.000.000/0000-00"
                  disabled={loading}
                />
              </div>

              <div className="bg-primary p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary">O que você terá acesso:</h4>
                    <ul className="text-sm text-primary mt-1 space-y-1">
                      <li>• Gestão completa de funcionários</li>
                      <li>• Criação e edição de escalas</li>
                      <li>• Validação automática de turnos</li>
                      <li>• Cálculos de custos em tempo real</li>
                      <li>• Dashboard com métricas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !companyName.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    'Criar Empresa'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
