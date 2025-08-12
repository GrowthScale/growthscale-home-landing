import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, DollarSign, Clock, Moon, TrendingUp } from 'lucide-react';
import { CostCalculationService, CostCalculationResult, EmployeeForCostCalculation, ShiftForCostCalculation } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface CostSimulatorProps {
  shifts: ShiftForCostCalculation[];
  employees: EmployeeForCostCalculation[];
  onCostUpdate?: (cost: CostCalculationResult) => void;
}

export const CostSimulator: React.FC<CostSimulatorProps> = ({
  shifts,
  employees,
  onCostUpdate
}) => {
  const [costResult, setCostResult] = useState<CostCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const costService = useMemo(() => new CostCalculationService(), []);

  const calculateCosts = useCallback(async () => {
    if (shifts.length === 0 || employees.length === 0) {
      toast({
        title: "Dados insuficientes",
        description: "É necessário ter turnos e funcionários para calcular os custos.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    try {
      const response = await costService.calculateScheduleCost({ shifts, employees });
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setCostResult(response.data);
        setLastUpdated(new Date());
        onCostUpdate?.(response.data);
        
        toast({
          title: "Custos calculados",
          description: `Custo total: R$ ${response.data.totalCost.toFixed(2)}`,
        });
      }
    } catch (error) {
      toast({
        title: "Erro no cálculo",
        description: error instanceof Error ? error.message : "Erro desconhecido ao calcular custos",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  }, [shifts, employees, onCostUpdate, costService, toast]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number, total: number) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  useEffect(() => {
    if (shifts.length > 0 && employees.length > 0) {
      calculateCosts();
    }
  }, [shifts, employees, calculateCosts]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Simulador de Custo em Tempo Real
        </CardTitle>
        <CardDescription>
          Cálculo automático de custos baseado nos turnos e funcionários da escala
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Botão de Cálculo Manual */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={calculateCosts} 
            disabled={isCalculating || shifts.length === 0 || employees.length === 0}
            className="flex items-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            {isCalculating ? 'Calculando...' : 'Recalcular Custos'}
          </Button>
          
          {lastUpdated && (
            <Badge variant="secondary" className="text-xs">
              Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
            </Badge>
          )}
        </div>

        {/* Resumo dos Dados */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{shifts.length} turnos</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>{employees.length} funcionários</span>
          </div>
        </div>

        <Separator />

        {/* Resultados do Cálculo */}
        {costResult && (
          <div className="space-y-4">
            {/* Custo Total */}
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(costResult.totalCost)}
              </div>
              <div className="text-sm text-gray-600">Custo Total da Escala</div>
            </div>

            {/* Breakdown dos Custos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Custo Base */}
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-lg font-semibold text-blue-600">
                    {formatCurrency(costResult.breakdown.baseCost)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatPercentage(costResult.breakdown.baseCost, costResult.totalCost)} do total
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Custo Base</div>
                </CardContent>
              </Card>

              {/* Horas Extras */}
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-lg font-semibold text-orange-600">
                    {formatCurrency(costResult.breakdown.overtimeCost)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatPercentage(costResult.breakdown.overtimeCost, costResult.totalCost)} do total
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Horas Extras</div>
                </CardContent>
              </Card>

              {/* Adicional Noturno */}
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-lg font-semibold text-purple-600">
                    {formatCurrency(costResult.breakdown.nightlyCost)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatPercentage(costResult.breakdown.nightlyCost, costResult.totalCost)} do total
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Adicional Noturno</div>
                </CardContent>
              </Card>
            </div>

            {/* Informações Adicionais */}
            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-3 w-3" />
                <span className="font-medium">Informações do Cálculo:</span>
              </div>
              <ul className="space-y-1 ml-4">
                <li>• Horas extras: multiplicador de 1.5x sobre o valor base</li>
                <li>• Adicional noturno: multiplicador de 1.2x para turnos entre 22h e 5h</li>
                <li>• Cálculo baseado na carga horária contratada de cada funcionário</li>
                <li>• Atualização automática quando a escala é modificada</li>
              </ul>
            </div>
          </div>
        )}

        {/* Estado de Carregamento */}
        {isCalculating && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Calculando custos da escala...</p>
          </div>
        )}

        {/* Estado sem dados */}
        {!costResult && !isCalculating && (shifts.length === 0 || employees.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            {/* TODO: Substituir por EmptyStateIllustration com:
              - Imagem: Calculadora com gráficos de custos vazios
              - Título: "Configure para calcular custos"
              - Descrição: "Adicione turnos e funcionários para calcular os custos da escala"
              - Botão: "Adicionar Turnos" ou "Adicionar Funcionários"
              - Ação: Navegar para configurações */}
            <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Adicione turnos e funcionários para calcular os custos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
