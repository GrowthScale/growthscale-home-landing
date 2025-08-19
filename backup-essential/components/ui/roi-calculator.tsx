import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { Button } from './button-v2';
import { Input } from './input';
import { Label } from './label';
import { Calculator, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ROICalculatorProps {
  className?: string;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    employees: 10,
    hourlyWage: 15,
    hoursPerWeek: 44,
    currentTimeSpent: 8,
  });

  const calculateROI = () => {
    const { employees, hourlyWage, hoursPerWeek, currentTimeSpent } = formData;
    
    // Cálculos
    const weeklyWage = hourlyWage * hoursPerWeek;
    const monthlyWage = weeklyWage * 4.33;
    const totalMonthlyWage = monthlyWage * employees;
    
    // Tempo economizado (80% de redução)
    const timeSaved = currentTimeSpent * 0.8;
    const timeSavedValue = (timeSaved * hourlyWage * 4.33);
    
    // Redução de erros (5% de economia)
    const errorReduction = totalMonthlyWage * 0.05;
    
    // Custo do GrowthScale
    const growthscaleCost = employees <= 10 ? 49 : employees <= 25 ? 99 : 199;
    
    // ROI total
    const totalSavings = timeSavedValue + errorReduction;
    const netSavings = totalSavings - growthscaleCost;
    const roiPercentage = ((netSavings / growthscaleCost) * 100);
    
    return {
      timeSavedValue: Math.round(timeSavedValue),
      errorReduction: Math.round(errorReduction),
      totalSavings: Math.round(totalSavings),
      netSavings: Math.round(netSavings),
      roiPercentage: Math.round(roiPercentage),
      growthscaleCost
    };
  };

  const roi = calculateROI();

  return (
    <section className={cn("py-20 md:py-28 bg-section-alt", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Calculator className="h-4 w-4" />
              Calculadora de ROI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Veja quanto você pode economizar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calcule o retorno sobre investimento do GrowthScale para o seu negócio
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="animate-fade-in-down">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Dados do seu negócio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="employees">Número de funcionários</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData(prev => ({ ...prev, employees: parseInt(e.target.value) || 0 }))}
                    min="1"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyWage">Salário médio por hora (R$)</Label>
                  <Input
                    id="hourlyWage"
                    type="number"
                    value={formData.hourlyWage}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyWage: parseInt(e.target.value) || 0 }))}
                    min="5"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hoursPerWeek">Horas trabalhadas por semana</Label>
                  <Input
                    id="hoursPerWeek"
                    type="number"
                    value={formData.hoursPerWeek}
                    onChange={(e) => setFormData(prev => ({ ...prev, hoursPerWeek: parseInt(e.target.value) || 0 }))}
                    min="20"
                    max="60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentTimeSpent">Horas gastas com escalas por semana</Label>
                  <Input
                    id="currentTimeSpent"
                    type="number"
                    value={formData.currentTimeSpent}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentTimeSpent: parseInt(e.target.value) || 0 }))}
                    min="1"
                    max="40"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6 animate-fade-in-up delay-200">
              {/* ROI Card */}
              <Card className="border-success/20 bg-success/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success mb-2">
                      {roi.roiPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">ROI Mensal</div>
                    <div className="text-2xl font-bold text-foreground">
                      R$ {roi.netSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Economia líquida por mês
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detalhamento das economias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm">Tempo economizado</span>
                    </div>
                    <span className="font-semibold text-accent">
                      R$ {roi.timeSavedValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Redução de erros</span>
                    </div>
                    <span className="font-semibold text-success">
                      R$ {roi.errorReduction.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-destructive" />
                      <span className="text-sm">Custo GrowthScale</span>
                    </div>
                    <span className="font-semibold text-destructive">
                      -R$ {roi.growthscaleCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Economia total</span>
                      <span className="text-xl font-bold text-success">
                        R$ {roi.netSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Button variant="gradient" size="lg" className="w-full group">
                Começar a economizar agora
                <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
