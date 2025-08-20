import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Building, 
  Users, 
  Settings, 
  Rocket,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

export default function SetupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTenant, updateTenantSettings } = useTenant();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: currentTenant?.name || '',
    cnpj: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    contact: {
      phone: '',
      website: '',
    },
    settings: {
      timezone: 'America/Sao_Paulo',
      workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      defaultShiftDuration: 8,
    }
  });

  const steps: SetupStep[] = [
    {
      id: 'welcome',
      title: 'Bem-vindo ao GrowthScale!',
      description: 'Vamos configurar sua empresa em poucos passos',
      icon: Rocket,
      completed: false
    },
    {
      id: 'company',
      title: 'Informações da Empresa',
      description: 'Dados básicos da sua empresa',
      icon: Building,
      completed: false
    },
    {
      id: 'compliance',
      title: 'Configuração de Compliance',
      description: 'Configure as regras trabalhistas',
      icon: Shield,
      completed: false
    },
    {
      id: 'preferences',
      title: 'Preferências',
      description: 'Personalize sua experiência',
      icon: Settings,
      completed: false
    },
    {
      id: 'complete',
      title: 'Tudo Pronto!',
      description: 'Sua empresa está configurada',
      icon: CheckCircle,
      completed: false
    }
  ];

  useEffect(() => {
    // Se não há usuário autenticado, redirecionar para login
    if (!user) {
      navigate('/auth');
      return;
    }

    // Se já há tenant configurado, verificar se precisa de setup
    if (currentTenant && currentTenant.settings?.setupCompleted) {
      navigate('/dashboard');
      return;
    }
  }, [user, currentTenant, navigate]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveCompany = async () => {
    setLoading(true);
    try {
      // Aqui você implementaria a lógica para salvar os dados da empresa
      await updateTenantSettings({
        ...currentTenant,
        ...formData,
        settings: {
          ...currentTenant?.settings,
          ...formData.settings,
          setupCompleted: true
        }
      });

      toast({
        title: "Configuração salva!",
        description: "Suas informações foram atualizadas com sucesso.",
      });

      handleNext();
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo ao GrowthScale!</h2>
              <p className="text-muted-foreground">
                Vamos configurar sua empresa para que você possa começar a usar todas as funcionalidades.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">IA Inteligente</h3>
                <p className="text-sm text-muted-foreground">Escalas otimizadas automaticamente</p>
              </div>
              <div className="text-center p-4">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Compliance Total</h3>
                <p className="text-sm text-muted-foreground">Conformidade com a CLT</p>
              </div>
              <div className="text-center p-4">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Economia de Tempo</h3>
                <p className="text-sm text-muted-foreground">Horas economizadas por mês</p>
              </div>
            </div>
          </div>
        );

      case 1: // Company Info
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Informações da Empresa</h2>
              <p className="text-muted-foreground">
                Preencha os dados básicos da sua empresa para personalizar sua experiência.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Ex: Restaurante Exemplo"
                />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.contact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.contact.website}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, website: e.target.value }
                })}
                placeholder="https://www.exemplo.com"
              />
            </div>
          </div>
        );

      case 2: // Compliance
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Configuração de Compliance</h2>
              <p className="text-muted-foreground">
                Configure as regras trabalhistas para garantir conformidade com a CLT.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Fuso Horário</Label>
                <select
                  id="timezone"
                  value={formData.settings.timezone}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, timezone: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  <option value="America/Manaus">Manaus (GMT-4)</option>
                  <option value="America/Belem">Belém (GMT-3)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="shiftDuration">Duração Padrão do Turno (horas)</Label>
                <Input
                  id="shiftDuration"
                  type="number"
                  value={formData.settings.defaultShiftDuration}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, defaultShiftDuration: parseInt(e.target.value) }
                  })}
                  min="1"
                  max="24"
                />
              </div>
            </div>

            <div>
              <Label>Dias de Trabalho</Label>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
                  const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][index];
                  const isSelected = formData.settings.workDays.includes(dayKey);
                  
                  return (
                    <Button
                      key={day}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newWorkDays = isSelected
                          ? formData.settings.workDays.filter(d => d !== dayKey)
                          : [...formData.settings.workDays, dayKey];
                        setFormData({
                          ...formData,
                          settings: { ...formData.settings, workDays: newWorkDays }
                        });
                      }}
                    >
                      {day}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 3: // Preferences
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Preferências</h2>
              <p className="text-muted-foreground">
                Personalize sua experiência no GrowthScale.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Funcionalidades Recomendadas</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>IA para otimização de escalas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Validação automática de CLT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Notificações via WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Relatórios de produtividade</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  placeholder="Alguma observação especial sobre sua operação?"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4: // Complete
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Tudo Pronto!</h2>
              <p className="text-muted-foreground">
                Sua empresa foi configurada com sucesso. Agora você pode começar a usar todas as funcionalidades do GrowthScale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold">Próximo Passo</h3>
                  <p className="text-sm text-muted-foreground">Adicione seus funcionários</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Clock className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold">Criar Primeira Escala</h3>
                  <p className="text-sm text-muted-foreground">Use a IA para otimizar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Setup da Empresa</h1>
                <p className="text-sm text-muted-foreground">
                  Passo {currentStep + 1} de {steps.length}
                </p>
              </div>
            </div>
            <Badge variant="outline">
              {Math.round(progress)}% Completo
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-2">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <steps[currentStep].icon className="h-5 w-5" />
                <span>{steps[currentStep].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}
              
              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <div className="flex space-x-2">
                  {currentStep === steps.length - 1 ? (
                    <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Finalizar Setup
                    </Button>
                  ) : currentStep === 1 ? (
                    <Button onClick={handleSaveCompany} disabled={loading}>
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          Salvar e Continuar
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      Próximo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}