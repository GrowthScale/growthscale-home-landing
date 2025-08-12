import React, { useState, useMemo, memo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download,
  Printer,
  RefreshCw,
  X,
  Users,
  Building2,
  UserCheck
} from 'lucide-react';

interface FilterState {
  search: string;
  department: string;
  status: string;
  position: string;
  startDate: string;
}

// Memoized active filter component
const ActiveFilter = memo(({ 
  filter, 
  onRemove 
}: { 
  filter: { key: string; label: string; value: string }; 
  onRemove: (key: string) => void;
}) => {
  const handleRemove = useCallback(() => {
    onRemove(filter.key);
  }, [filter.key, onRemove]);

  return (
    <Badge variant="secondary" className="flex items-center space-x-1 animate-fade-in">
      <span>{filter.label}: {filter.value}</span>
      <X 
        className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors" 
        onClick={handleRemove}
        aria-label={`Remover filtro ${filter.label}`}
      />
    </Badge>
  );
});

ActiveFilter.displayName = 'ActiveFilter';

export const EmployeeFilters = memo(() => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: '',
    status: '',
    position: '',
    startDate: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      department: '',
      status: '',
      position: '',
      startDate: ''
    });
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter(value => value !== '').length;
  }, [filters]);

  const activeFilters = useMemo(() => {
    const activeFilters = [];
    if (filters.department) activeFilters.push({ key: 'department', label: 'Departamento', value: filters.department });
    if (filters.status) activeFilters.push({ key: 'status', label: 'Status', value: filters.status });
    if (filters.position) activeFilters.push({ key: 'position', label: 'Cargo', value: filters.position });
    if (filters.startDate) activeFilters.push({ key: 'startDate', label: 'Período', value: filters.startDate });
    return activeFilters;
  }, [filters]);

  const handleRemoveFilter = useCallback((key: string) => {
    handleFilterChange(key as keyof FilterState, '');
  }, [handleFilterChange]);

  return (
    <div className="space-y-spacing-sm">
      {/* Search and Quick Filters */}
      <Card className="animate-fade-in">
        <CardContent className="p-spacing-sm">
          <div className="flex flex-col lg:flex-row gap-spacing-xs">
            {/* Search */}
            <div className="flex-1 relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" 
                aria-hidden="true"
              />
              <Input
                placeholder="Buscar funcionários, cargos, departamentos..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
                aria-label="Campo de busca para funcionários"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Select 
                value={filters.status || undefined} 
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger className="w-40" aria-label="Filtrar por status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="vacation">Férias</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.department || undefined} 
                onValueChange={(value) => handleFilterChange('department', value)}
              >
                <SelectTrigger className="w-40" aria-label="Filtrar por departamento">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="estoque">Estoque</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="administracao">Administração</SelectItem>
                  <SelectItem value="recursos-humanos">RH</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={toggleExpanded}
                className={`hover-scale ${activeFiltersCount > 2 ? "border-primary text-primary" : ""}`}
                aria-label={`${isExpanded ? 'Ocultar' : 'Mostrar'} filtros avançados`}
                aria-expanded={isExpanded}
              >
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                Filtros
                {activeFiltersCount > 2 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount - 2}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex items-center space-x-2 mt-3 pt-3 border-t">
                              <span className="text-sm text-foreground/80">Filtros ativos:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <ActiveFilter 
                    key={filter.key} 
                    filter={filter} 
                    onRemove={handleRemoveFilter}
                  />
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="hover-scale"
                  aria-label="Limpar todos os filtros"
                >
                  <X className="h-3 w-3 mr-1" aria-hidden="true" />
                  Limpar todos
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card className="border-primary/20 animate-fade-in">
          <CardContent className="p-spacing-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-spacing-xs">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Cargo</label>
                <Select 
                  value={filters.position || undefined} 
                  onValueChange={(value) => handleFilterChange('position', value)}
                >
                  <SelectTrigger aria-label="Filtrar por cargo">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="caixa">Operador de Caixa</SelectItem>
                    <SelectItem value="estoquista">Estoquista</SelectItem>
                    <SelectItem value="seguranca">Segurança</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tempo na Empresa</label>
                <Select 
                  value={filters.startDate || undefined} 
                  onValueChange={(value) => handleFilterChange('startDate', value)}
                >
                  <SelectTrigger aria-label="Filtrar por tempo na empresa">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Novos (até 3 meses)</SelectItem>
                    <SelectItem value="medium">Experientes (3-12 meses)</SelectItem>
                    <SelectItem value="senior">Veteranos (mais de 1 ano)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de Contrato</label>
                <Select>
                  <SelectTrigger aria-label="Filtrar por tipo de contrato">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clt">CLT</SelectItem>
                    <SelectItem value="pj">PJ</SelectItem>
                    <SelectItem value="temporario">Temporário</SelectItem>
                    <SelectItem value="estagio">Estágio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Turno Preferido</label>
                <Select>
                  <SelectTrigger aria-label="Filtrar por turno preferido">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Manhã</SelectItem>
                    <SelectItem value="afternoon">Tarde</SelectItem>
                    <SelectItem value="night">Noite</SelectItem>
                    <SelectItem value="flexible">Flexível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Card className="animate-fade-in">
        <CardContent className="p-spacing-sm">
          <div className="flex items-center justify-between flex-wrap gap-spacing-xs">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-medium text-foreground">Ações da Página</span>
            </div>
            
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Button variant="outline" size="sm" className="hover-scale" aria-label="Atualizar lista de funcionários">
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm" className="hover-scale" aria-label="Exportar dados dos funcionários">
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="hover-scale" aria-label="Imprimir lista de funcionários">
                <Printer className="h-4 w-4 mr-2" aria-hidden="true" />
                Imprimir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

EmployeeFilters.displayName = 'EmployeeFilters';