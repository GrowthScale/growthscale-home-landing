import React, { useState } from 'react';
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

export function EmployeeFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: '',
    status: '',
    position: '',
    startDate: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      department: '',
      status: '',
      position: '',
      startDate: ''
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const getActiveFilters = () => {
    const activeFilters = [];
    if (filters.department) activeFilters.push({ key: 'department', label: 'Departamento', value: filters.department });
    if (filters.status) activeFilters.push({ key: 'status', label: 'Status', value: filters.status });
    if (filters.position) activeFilters.push({ key: 'position', label: 'Cargo', value: filters.position });
    if (filters.startDate) activeFilters.push({ key: 'startDate', label: 'Período', value: filters.startDate });
    return activeFilters;
  };

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar funcionários, cargos, departamentos..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-2">
              <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="vacation">Férias</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.department || undefined} onValueChange={(value) => handleFilterChange('department', value)}>
                <SelectTrigger className="w-40">
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
                onClick={() => setIsExpanded(!isExpanded)}
                className={getActiveFiltersCount() > 2 ? "border-primary text-primary" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {getActiveFiltersCount() > 2 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount() - 2}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFilters().length > 0 && (
            <div className="flex items-center space-x-2 mt-3 pt-3 border-t">
              <span className="text-sm text-muted-foreground">Filtros ativos:</span>
              <div className="flex flex-wrap gap-2">
                {getActiveFilters().map((filter) => (
                  <Badge key={filter.key} variant="secondary" className="flex items-center space-x-1">
                    <span>{filter.label}: {filter.value}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleFilterChange(filter.key as keyof FilterState, '')}
                    />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-3 w-3 mr-1" />
                  Limpar todos
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cargo</label>
                <Select value={filters.position || undefined} onValueChange={(value) => handleFilterChange('position', value)}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium">Tempo na Empresa</label>
                <Select value={filters.startDate || undefined} onValueChange={(value) => handleFilterChange('startDate', value)}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium">Tipo de Contrato</label>
                <Select>
                  <SelectTrigger>
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
                <label className="text-sm font-medium">Turno Preferido</label>
                <Select>
                  <SelectTrigger>
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
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Ações da Página</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}