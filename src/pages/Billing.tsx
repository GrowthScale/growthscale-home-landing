import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFeatureGating } from '@/hooks/useFeatureGating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Crown, 
  Check, 
  X, 
  Star, 
  Users, 
  Brain, 
  Shield, 
  Clock,
  Zap,
  TrendingUp,
  Building,
  ArrowRight,
  CreditCard,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  savings?: string;
}

const plans: Plan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    price: 'Grátis',
    period: '',
    description: 'Experimente sem compromisso',
    features: [
      'Até 3 funcionários',
      'Escalas básicas',
      'Validação CLT básica',
      'Suporte por email',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 'R$ 49',
    period: '/mês',
    description: 'Para restaurantes em crescimento',
    features: [
      'Até 10 funcionários',
      'IA para escalas',
      'Compliance automático',
      'App mobile',
      'Suporte prioritário',
    ],
    popular: true,
    savings: 'Economia de R$ 1.500/mês',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 'R$ 99',
    period: '/mês',
    description: 'Para operações em expansão',
    features: [
      'Até 25 funcionários',
      'IA avançada',
      'Analytics completos',
      'Integrações',
      'Suporte dedicado',
      'API personalizada',
    ],
    recommended: true,
    savings: 'Economia de R$ 3.000/mês',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Sob Consulta',
    period: '',
    description: 'Para grandes operações',
    features: [
      'Funcionários ilimitados',
      'IA personalizada',
      'Analytics avançados',
      'Integrações completas',
      'Suporte 24/7',
      'API dedicada',
      'White label',
      'Consultoria especializada',
    ],
  },
];

export default function BillingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { currentPlan, planLimits, getLimitInfo } = useFeatureGating();
  const { toast } = useToast();
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    location.state?.highlightPlan || null
  );
  const [loading, setLoading] = useState(false);

  // Se não há usuário autenticado, redirecionar
  if (!user) {
    navigate('/auth');
    return null;
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    try {
      // Aqui você implementaria a lógica de upgrade
      // Por exemplo, integração com Stripe ou outro gateway de pagamento
      
      // Simular processo de upgrade
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upgrade realizado!",
        description: `Seu plano foi atualizado para ${selectedPlan}.`,
      });
      
      // Redirecionar para dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro no upgrade",
        description: "Não foi possível processar o upgrade. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUsage = () => {
    const employeeInfo = getLimitInfo('employees');
    const branchInfo = getLimitInfo('branches');
    const scheduleInfo = getLimitInfo('schedules');

    return {
      employees: employeeInfo,
      branches: branchInfo,
      schedules: scheduleInfo,
    };
  };

  const usage = getCurrentUsage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-primary rounded-lg shadow-soft">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-body">Planos e Preços</h1>
              <p className="text-muted-foreground mt-1">
                Escolha o plano ideal para seu negócio
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Current Plan Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span>Seu Plano Atual</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                  </div>
                  <p className="text-muted-foreground">Plano atual</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    {usage.employees.current}/{usage.employees.isUnlimited ? '∞' : usage.employees.limit}
                  </div>
                  <p className="text-muted-foreground">Funcionários</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    {usage.branches.current}/{usage.branches.isUnlimited ? '∞' : usage.branches.limit}
                  </div>
                  <p className="text-muted-foreground">Filiais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {plans.map((plan) => {
              const isCurrentPlan = plan.id === currentPlan;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <Card 
                  key={plan.id}
                  className={`relative transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'ring-2 ring-primary shadow-lg scale-105' 
                      : 'hover:shadow-md hover:scale-102'
                  } ${isCurrentPlan ? 'border-primary/50' : ''}`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      Mais Popular
                    </Badge>
                  )}
                  
                  {plan.recommended && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white">
                      Recomendado
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-lg text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    
                    {plan.savings && (
                      <Badge variant="outline" className="mt-2 text-accent border-green-600">
                        {plan.savings}
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <Check className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isCurrentPlan ? (
                      <Button disabled className="w-full" variant="outline">
                        Plano Atual
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        variant={isSelected ? "default" : "outline"}
                      >
                        {isSelected ? 'Selecionado' : 'Escolher Plano'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Upgrade Section */}
          {selectedPlan && selectedPlan !== currentPlan && (
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Upgrade para {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                  </h2>
                  <p className="text-muted-foreground">
                    Desbloqueie funcionalidades avançadas e escale seu negócio
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-3">O que você ganha:</h3>
                    <ul className="space-y-2">
                      {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <Check className="h-4 w-4 text-accent" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Benefícios imediatos:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>Acesso imediato a todas as funcionalidades</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Compliance automático</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-primary" />
                        <span>IA para otimização de escalas</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span>Relatórios avançados</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleUpgrade} 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Fazer Upgrade Agora
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Posso mudar de plano a qualquer momento?</h4>
                <p className="text-muted-foreground text-sm">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As mudanças são aplicadas imediatamente e a cobrança é ajustada proporcionalmente.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Existe período de teste?</h4>
                <p className="text-muted-foreground text-sm">
                  Oferecemos 14 dias de teste gratuito para todos os planos pagos, 
                  sem necessidade de cartão de crédito. Você pode cancelar a qualquer momento.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Como funciona o suporte?</h4>
                <p className="text-muted-foreground text-sm">
                  O plano Freemium inclui suporte por email. Planos pagos incluem suporte prioritário 
                  e o plano Enterprise oferece suporte dedicado 24/7.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
