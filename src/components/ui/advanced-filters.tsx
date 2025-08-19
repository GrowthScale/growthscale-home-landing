// =====================================================
// ADVANCED FILTERS - GROWTHSCALE
// Componente de filtros avançados reutilizável
// =====================================================

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FilterIcon, XIcon, CalendarIcon, SearchIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'number' | 'boolean';
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface FilterValue {
  key: string;
  value: string | number | boolean | Date | Date[];
  label: string;
}

interface AdvancedFiltersProps {
  filters: FilterOption[];
  onFiltersChange: (filters: FilterValue[]) => void;
  onClearAll?: () => void;
  className?: string;
  showActiveFilters?: boolean;
  maxVisibleFilters?: number;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearAll,
  className = '',
  showActiveFilters = true,
  maxVisibleFilters = 3
}) => {
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string | number | boolean | Date | Date[]>>({});

  // Aplicar filtros
  const applyFilters = (newFilters: FilterValue[]) => {
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Adicionar filtro
  const addFilter = (key: string, value: string | number | boolean | Date | Date[]) => {
    const filter = filters.find(f => f.key === key);
    if (!filter) {return;}

    const newFilter: FilterValue = {
      key,
      value,
      label: `${filter.label}: ${formatFilterValue(filter, value)}`
    };

    const updatedFilters = [...activeFilters.filter(f => f.key !== key), newFilter];
    applyFilters(updatedFilters);
  };

  // Remover filtro
  const removeFilter = (key: string) => {
    const updatedFilters = activeFilters.filter(f => f.key !== key);
    setFilterValues(prev => ({ ...prev, [key]: undefined }));
    applyFilters(updatedFilters);
  };

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilterValues({});
    onFiltersChange([]);
    onClearAll?.();
  };

  // Formatar valor do filtro para exibição
  const formatFilterValue = (filter: FilterOption, value: string | number | boolean | Date | Date[]): string => {
    switch (filter.type) {
      case 'date':
        return value instanceof Date ? format(value, 'dd/MM/yyyy', { locale: ptBR }) : '';
      case 'dateRange':
        if (Array.isArray(value) && value.length === 2) {
          const [start, end] = value;
          return `${format(start, 'dd/MM/yyyy', { locale: ptBR })} - ${format(end, 'dd/MM/yyyy', { locale: ptBR })}`;
        }
        return '';
      case 'select': {
        const option = filter.options?.find(opt => opt.value === value);
        return option?.label || String(value);
      }
      case 'boolean':
        return value ? 'Sim' : 'Não';
      default:
        return String(value);
    }
  };

  // Renderizar campo de filtro
  const renderFilterField = (filter: FilterOption) => {
    const value = filterValues[filter.key];

    switch (filter.type) {
      case 'text':
        return (
          <Input
            placeholder={filter.placeholder || `Digite ${filter.label.toLowerCase()}...`}
            value={String(value || '')}
            onChange={(e) => {
              const newValue = e.target.value;
              setFilterValues(prev => ({ ...prev, [filter.key]: newValue }));
              if (newValue) {
                addFilter(filter.key, newValue);
              } else {
                removeFilter(filter.key);
              }
            }}
          />
        );

      case 'select':
        return (
          <Select
            value={String(value || '')}
            onValueChange={(newValue) => {
              setFilterValues(prev => ({ ...prev, [filter.key]: newValue }));
              if (newValue) {
                addFilter(filter.key, newValue);
              } else {
                removeFilter(filter.key);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={filter.placeholder || `Selecione ${filter.label.toLowerCase()}...`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value instanceof Date ? format(value, 'dd/MM/yyyy', { locale: ptBR }) : filter.placeholder || 'Selecione uma data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <DatePicker
                mode="single"
                selected={value instanceof Date ? value : undefined}
                onSelect={(date) => {
                  const newValue = date?.toISOString();
                  setFilterValues(prev => ({ ...prev, [filter.key]: newValue }));
                  if (newValue && date) {
                    addFilter(filter.key, date);
                  } else {
                    removeFilter(filter.key);
                  }
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        );

      case 'dateRange':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value && Array.isArray(value) && value.length === 2
                  ? `${format(value[0], 'dd/MM/yyyy', { locale: ptBR })} - ${format(value[1], 'dd/MM/yyyy', { locale: ptBR })}`
                  : filter.placeholder || 'Selecione período'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <DatePicker
                mode="range"
                selected={value && Array.isArray(value) && value.length === 2 ? { from: value[0], to: value[1] } : undefined}
                onSelect={(range) => {
                  const newValue = range?.from && range?.to ? [range.from, range.to] : undefined;
                  setFilterValues(prev => ({ ...prev, [filter.key]: newValue }));
                  if (newValue) {
                    addFilter(filter.key, newValue);
                  } else {
                    removeFilter(filter.key);
                  }
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={filter.placeholder || `Digite ${filter.label.toLowerCase()}...`}
            min={filter.min}
            max={filter.max}
            value={String(value || '')}
            onChange={(e) => {
              const newValue = e.target.value ? Number(e.target.value) : undefined;
              setFilterValues(prev => ({ ...prev, [filter.key]: newValue }));
              if (newValue !== undefined) {
                addFilter(filter.key, newValue);
              } else {
                removeFilter(filter.key);
              }
            }}
          />
        );

      case 'boolean':
        return (
          <Select
            value={String(value || '')}
            onValueChange={(newValue) => {
              const boolValue = newValue === 'true';
              setFilterValues(prev => ({ ...prev, [filter.key]: boolValue }));
              addFilter(filter.key, boolValue);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={filter.placeholder || `Selecione ${filter.label.toLowerCase()}...`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Sim</SelectItem>
              <SelectItem value="false">Não</SelectItem>
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {/* Filtros ativos */}
      {showActiveFilters && activeFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Filtros ativos ({activeFilters.length})
            </span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Limpar todos
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => removeFilter(filter.key)}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Botão de filtros */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            Filtros Avançados
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:max-w-sm md:max-w-md p-0" align="start">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filtros Avançados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filters.slice(0, maxVisibleFilters).map((filter) => (
                <div key={filter.key} className="space-y-2">
                  <Label htmlFor={filter.key} className="text-sm font-medium">
                    {filter.label}
                  </Label>
                  {renderFilterField(filter)}
                </div>
              ))}
              
              {filters.length > maxVisibleFilters && (
                <>
                  <Separator />
                  <div className="text-center">
                    <Button variant="ghost" size="sm">
                      Ver mais filtros ({filters.length - maxVisibleFilters})
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Hook para usar filtros
export const useAdvancedFilters = (initialFilters: FilterValue[] = []) => {
  const [filters, setFilters] = useState<FilterValue[]>(initialFilters);

  const addFilter = (key: string, value: string | number | boolean | Date | Date[], label: string) => {
    setFilters(prev => [...prev.filter(f => f.key !== key), { key, value, label }]);
  };

  const removeFilter = (key: string) => {
    setFilters(prev => prev.filter(f => f.key !== key));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const getFilterValue = (key: string) => {
    return filters.find(f => f.key === key)?.value;
  };

  return {
    filters,
    addFilter,
    removeFilter,
    clearFilters,
    getFilterValue
  };
};
