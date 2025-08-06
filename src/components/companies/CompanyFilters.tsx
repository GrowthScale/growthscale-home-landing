import React, { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface CompanyFiltersProps {
  onFiltersChange: (filters: CompanyFilters) => void;
}

interface CompanyFilters {
  status?: string;
  state?: string;
  branchCount?: string;
  employeeCount?: string;
  createdAt?: string;
}

const statusOptions = [
  { value: 'active', label: 'Ativa' },
  { value: 'inactive', label: 'Inativa' },
  { value: 'pending', label: 'Pendente' }
];

const stateOptions = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const branchCountOptions = [
  { value: '1-5', label: '1-5 filiais' },
  { value: '6-10', label: '6-10 filiais' },
  { value: '11-20', label: '11-20 filiais' },
  { value: '20+', label: 'Mais de 20 filiais' }
];

const employeeCountOptions = [
  { value: '1-50', label: '1-50 funcionários' },
  { value: '51-100', label: '51-100 funcionários' },
  { value: '101-500', label: '101-500 funcionários' },
  { value: '500+', label: 'Mais de 500 funcionários' }
];

const createdAtOptions = [
  { value: 'last-month', label: 'Último mês' },
  { value: 'last-3-months', label: 'Últimos 3 meses' },
  { value: 'last-6-months', label: 'Últimos 6 meses' },
  { value: 'last-year', label: 'Último ano' }
];

export const CompanyFilters: React.FC<CompanyFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<CompanyFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof CompanyFilters, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value !== '').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filtros</h4>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-8 px-2 text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={filters.status || ''}
                onValueChange={(value) => updateFilter('status', value || undefined)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Estado</Label>
              <Select
                value={filters.state || ''}
                onValueChange={(value) => updateFilter('state', value || undefined)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos os estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os estados</SelectItem>
                  {stateOptions.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Número de Filiais</Label>
              <Select
                value={filters.branchCount || ''}
                onValueChange={(value) => updateFilter('branchCount', value || undefined)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Qualquer quantidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Qualquer quantidade</SelectItem>
                  {branchCountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Número de Funcionários</Label>
              <Select
                value={filters.employeeCount || ''}
                onValueChange={(value) => updateFilter('employeeCount', value || undefined)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Qualquer quantidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Qualquer quantidade</SelectItem>
                  {employeeCountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Data de Criação</Label>
              <Select
                value={filters.createdAt || ''}
                onValueChange={(value) => updateFilter('createdAt', value || undefined)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Qualquer período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Qualquer período</SelectItem>
                  {createdAtOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <>
              <Separator />
              <div className="text-xs text-muted-foreground">
                {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} aplicado{activeFiltersCount !== 1 ? 's' : ''}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};