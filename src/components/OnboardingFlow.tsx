import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, Building2, Users, Calendar, Shield } from 'lucide-react';
import { createCompanyForUser } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
}

const CompanySetupStep: React.FC<{ onNext: (data: any) => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    employeeCount: '',
    industry: 'food_service'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validar dados
      if (!formData.companyName.trim() || !formData.employeeCount) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      onNext(formData);
    } catch (error) {
      console.error('Erro na validação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Configure sua Empresa</CardTitle>
        <p className="text-sm text-muted-foreground">
          Vamos configurar sua empresa para começar a usar o GrowthScale
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Ex: Restaurante Exemplo"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employeeCount">Número de Funcionários *</Label>
            <select
              id="employeeCount"
              value={formData.employeeCount}
              onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: e.target.value }))}
              className="w-full p-2 border border-input rounded-md bg-background"
              required
            >
              <option value="">Selecione...</option>
              <option value="1-5">1-5 funcionários</option>
              <option value="6-10">6-10 funcionários</option>
              <option value="11-25">11-25 funcionários</option>
              <option value="26-50">26-50 funcionários</option>
              <option value="50+">50+ funcionários</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Voltar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continuar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const WelcomeStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle>Bem-vindo ao GrowthScale!</CardTitle>
        <p className="text-sm text-muted-foreground">
          Sua conta foi criada com sucesso. Agora vamos configurar sua empresa.
        </p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Conta verificada</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Email confirmado</span>
          </div>
        </div>
        
        <Button onClick={onNext} className="w-full">
          Começar Configuração
        </Button>
      </CardContent>
    </Card>
  );
};

const SuccessStep: React.FC<{ companyName: string }> = ({ companyName }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle>Tudo Pronto!</CardTitle>
        <p className="text-sm text-muted-foreground">
          Sua empresa {companyName} foi configurada com sucesso.
        </p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Empresa criada</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Sistema configurado</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Pronto para usar</span>
          </div>
        </div>
        
        <Button onClick={() => navigate('/dashboard')} className="w-full">
          Ir para o Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};

export const OnboardingFlow: React.FC = () => {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Se já tem tenant, redirecionar para dashboard
  if (currentTenant) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Bem-vindo',
      description: 'Configuração inicial da sua conta',
      icon: CheckCircle,
      component: WelcomeStep
    },
    {
      id: 'company',
      title: 'Empresa',
      description: 'Configure os dados da sua empresa',
      icon: Building2,
      component: CompanySetupStep
    },
    {
      id: 'success',
      title: 'Sucesso',
      description: 'Configuração concluída',
      icon: CheckCircle,
      component: SuccessStep
    }
  ];

  const handleNext = async (data?: any) => {
    if (data) {
      setCompanyData(data);
    }

    if (currentStep === 1 && data) {
      // Criar empresa
      setLoading(true);
      try {
        await createCompanyForUser(user!.id, {
          name: data.companyName,
          employee_count: data.employeeCount,
          industry: data.industry
        });
        
        toast({
          title: "Empresa criada com sucesso!",
          description: "Sua empresa foi configurada e está pronta para uso.",
        });
        
        setCurrentStep(2);
      } catch (error) {
        console.error('Erro ao criar empresa:', error);
        toast({
          title: "Erro ao criar empresa",
          description: "Tente novamente ou entre em contato com o suporte.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Step Content */}
        {loading ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Configurando sua empresa...</p>
            </CardContent>
          </Card>
        ) : (
          <CurrentStepComponent 
            onNext={handleNext}
            onBack={handleBack}
            companyName={companyData?.companyName}
          />
        )}
      </div>
    </div>
  );
};
