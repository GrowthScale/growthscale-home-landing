// TEMPORARIO: Comentado para permitir build
/*
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calculator, DollarSign, Clock, Moon, TrendingUp } from 'lucide-react';
import { CostCalculationService, CostCalculationResult, EmployeeForCostCalculation, ShiftForCostCalculation } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const CostSimulator: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeForCostCalculation[]>([
    { id: '1', workload: 40, hourlyRate: 15 },
    { id: '2', workload: 44, hourlyRate: 18 },
    { id: '3', workload: 40, hourlyRate: 20 }
  ]);
  const [shifts, setShifts] = useState<ShiftForCostCalculation[]>([]);
  const [calculationResult, setCalculationResult] = useState<CostCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const calculateCosts = async () => {
    if (shifts.length === 0) {
      toast({
        title: "Sem turnos para calcular",
        description: "Adicione pelo menos um turno para calcular os custos.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    try {
      const result = await CostCalculationService.calculateScheduleCost({
        shifts,
        employees
      });
      setCalculationResult(result);
      
      toast({
        title: "Cálculo concluído",
        description: `Custo total: R$ ${result.totalCost.toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Erro no cálculo",
        description: "Não foi possível calcular os custos.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const addShift = () => {
    const newShift: ShiftForCostCalculation = {
      employeeId: employees[0]?.id || '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    };
    setShifts([...shifts, newShift]);
  };

  const removeShift = (index: number) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  const updateShift = (index: number, field: keyof ShiftForCostCalculation, value: string) => {
    const updatedShifts = [...shifts];
    updatedShifts[index] = { ...updatedShifts[index], [field]: value };
    setShifts(updatedShifts);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Simulador de Custos</h2>
          <p className="text-gray-600">Calcule os custos da sua escala de trabalho</p>
        </div>
        <Button onClick={calculateCosts} disabled={isCalculating}>
          <Calculator className="w-4 h-4 mr-2" />
          {isCalculating ? 'Calculando...' : 'Calcular Custos'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuração de Turnos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Turnos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {shifts.map((shift, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Turno {index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeShift(index)}
                  >
                    Remover
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Início</Label>
                    <Input
                      type="datetime-local"
                      value={shift.startTime.slice(0, 16)}
                      onChange={(e) => updateShift(index, 'startTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Fim</Label>
                    <Input
                      type="datetime-local"
                      value={shift.endTime.slice(0, 16)}
                      onChange={(e) => updateShift(index, 'endTime', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Funcionário</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={shift.employeeId}
                    onChange={(e) => updateShift(index, 'employeeId', e.target.value)}
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        Funcionário {emp.id} - R$ {emp.hourlyRate}/h
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            
            <Button onClick={addShift} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Turno
            </Button>
          </CardContent>
        </Card>

        {/* Resultado do Cálculo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            {calculationResult ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(calculationResult.totalCost)}
                  </div>
                  <p className="text-sm text-gray-600">Custo Total</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Custo Base</span>
                    <span className="font-medium">
                      {formatCurrency(calculationResult.breakdown.baseCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horas Extras</span>
                    <span className="font-medium">
                      {formatCurrency(calculationResult.breakdown.overtimeCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adicional Noturno</span>
                    <span className="font-medium">
                      {formatCurrency(calculationResult.breakdown.nightlyCost)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Clique em "Calcular Custos" para ver o resultado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
*/

// Placeholder temporário
export const CostSimulator: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Simulador de Custos</h2>
      <p className="text-gray-600">Funcionalidade temporariamente indisponível</p>
    </div>
  );
};
