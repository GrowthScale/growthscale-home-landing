import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { CompanyStep } from './steps/CompanyStep';
import { BranchesStep } from './steps/BranchesStep';
import { EmployeesStep } from './steps/EmployeesStep';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export interface CompanyData {
  name: string;
  cnpj: string;
  logo?: File;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  email: string;
  phone: string;
}

export interface BranchData {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  workingHours: {
    start: string;
    end: string;
  };
  status: 'active' | 'inactive';
}

export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  role: string;
  branchId: string;
  shifts: ShiftData[];
}

export interface ShiftData {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  days: string[];
}

const steps = [
  { id: 1, title: 'Empresa', description: 'Dados básicos da empresa' },
  { id: 2, title: 'Filiais', description: 'Adicionar unidades' },
  { id: 3, title: 'Colaboradores', description: 'Equipe e turnos' }
];

const SetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [branchesData, setBranchesData] = useState<BranchData[]>([]);
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleStepComplete = (stepData: CompanyData | BranchData[] | EmployeeData[]) => {
    switch (currentStep) {
      case 1:
        setCompanyData(stepData as CompanyData);
        break;
      case 2:
        setBranchesData(stepData as BranchData[]);
        break;
      case 3:
        setEmployeesData(stepData as EmployeeData[]);
        break;
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    toast({
      title: "Etapa concluída!",
      description: `${steps[currentStep - 1].title} foi salvo com sucesso.`,
    });
  };

  const handleFinishSetup = async () => {
    if (!user || !companyData) {
      toast({
        title: "Erro",
        description: "Dados incompletos para finalizar o setup.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Criar empresa
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: companyData.name,
          cnpj: companyData.cnpj,
          trade_name: companyData.name,
          address: companyData.address,
          contact: {
            email: companyData.email,
            phone: companyData.phone,
          },
          status: 'active'
        })
        .select()
        .single();

      if (companyError) {throw companyError;}

      // 2. Criar relacionamento company_users (owner)
      const { error: companyUserError } = await supabase
        .from('company_users')
        .insert({
          user_id: user.id,
          company_id: company.id,
          role: 'owner'
        });

      if (companyUserError) {throw companyUserError;}

      // 3. Criar user_profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          role: 'owner',
          tenant_id: company.id
        });

      if (profileError) {throw profileError;}

      // 4. Criar filiais
      if (branchesData.length > 0) {
        const branchesToInsert = branchesData.map(branch => ({
          ...branch,
          company_id: company.id
        }));

        const { error: branchesError } = await supabase
          .from('branches')
          .insert(branchesToInsert);

        if (branchesError) {throw branchesError;}
      }

      // 5. Criar funcionários
      if (employeesData.length > 0) {
        const employeesToInsert = employeesData.map(employee => ({
          name: employee.name,
          email: employee.email,
          position: employee.role,
          company_id: company.id,
          status: 'active',
          start_date: new Date().toISOString().split('T')[0]
        }));

        const { error: employeesError } = await supabase
          .from('employees')
          .insert(employeesToInsert);

        if (employeesError) {throw employeesError;}
      }

      toast({
        title: "Setup concluído!",
        description: "Sua empresa foi configurada com sucesso.",
      });

      // Redirecionar para dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error('Erro no setup:', error);
      toast({
        title: "Erro no setup",
        description: "Ocorreu um erro ao configurar sua empresa. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep || completedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const handleFinish = async () => {
    await handleFinishSetup();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyStep
            data={companyData}
            onComplete={handleStepComplete}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <BranchesStep
            data={branchesData}
            companyData={companyData}
            onComplete={handleStepComplete}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <EmployeesStep
            data={employeesData}
            branchesData={branchesData}
            onComplete={handleStepComplete}
            onPrev={prevStep}
            onFinish={handleFinish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao GrowthScale
          </h1>
          <p className="text-muted-foreground text-lg">
            Vamos configurar sua empresa em poucos passos
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Progresso da configuração
            </span>
            <span className="text-sm font-medium text-foreground">
              {currentStep} de {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 max-w-2xl w-full">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div 
                  className={`flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                    currentStep === step.id ? 'scale-105' : ''
                  }`}
                  onClick={() => goToStep(step.id)}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${currentStep === step.id 
                      ? 'bg-primary text-primary-foreground shadow-soft' 
                      : completedSteps.includes(step.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-foreground/80'
                    }
                  `}>
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep === step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-muted mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="max-w-4xl mx-auto p-6 shadow-elegant">
          {renderStep()}
        </Card>

        {/* Summary Badge */}
        {completedSteps.length > 0 && (
          <div className="mt-6 text-center">
            <Badge variant="secondary" className="px-4 py-2">
              {completedSteps.length} de {steps.length} etapas concluídas
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupWizard;