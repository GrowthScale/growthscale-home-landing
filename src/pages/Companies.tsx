import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Search, Building2, MapPin, Users, Calendar, Filter, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CompanyForm } from '@/components/companies/CompanyForm';
import { CompanyDetails } from '@/components/companies/CompanyDetails';
import { BranchList } from '@/components/companies/BranchList';
import { CompanyFilters } from '@/components/companies/CompanyFilters';
import { getCompaniesForUser } from '@/services/api';
import PageLayout from '@/components/PageLayout';

interface Company {
  id: string;
  name: string;
  cnpj: string;
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
  branchCount: number;
  employeeCount: number;
  createdAt: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    email: string;
    phone: string;
  };
}

// Dados mock removidos - agora usando dados reais da API

const Companies = () => {
  const { user } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Buscar empresas do usuário
  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      const result = await getCompaniesForUser(user.id);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    enabled: !!user?.id,
  });

  // Filtrar empresas baseado na busca
  const filteredCompanies = companies?.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.cnpj.includes(searchTerm)
  ) || [];

  const handleCompanySelect = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowCompanyDetails(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowCompanyDetails(false);
    setSelectedCompany(null);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-foreground/80';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-foreground/80';
    }
  };

  const getStatusText = (status: Company['status']) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'inactive':
        return 'Inativa';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const breadcrumbs = [
    { label: 'Empresas' }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Minhas Empresas</h1>
              <p className="text-foreground/80 mt-1">
                Gerencie suas empresas e filiais de forma centralizada
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" aria-label="Filtros">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filtros avançados</p>
                </TooltipContent>
              </Tooltip>
              
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Empresa
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-modal-md">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Nova Empresa</DialogTitle>
                  </DialogHeader>
                  <CompanyForm onClose={() => setShowCreateDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando empresas...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar empresas</h2>
              <p className="text-muted-foreground mb-4">{error.message}</p>
              <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
            </div>
          </div>
        )}

        {/* Content when data is loaded */}
        {!isLoading && !error && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{companies?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {companies?.filter(c => c.status === 'active').length || 0} ativas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Filiais</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {companies?.reduce((acc, company) => acc + (company.branchCount || 0), 0) || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Distribuídas em {companies?.length || 0} empresas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {companies?.reduce((acc, company) => acc + (company.employeeCount || 0), 0) || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Em todas as empresas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Hoje</div>
                  <p className="text-xs text-muted-foreground">
                    Dados sincronizados
                  </p>
                </CardContent>
              </Card>
            </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar empresas por nome ou CNPJ..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <CompanyFilters onFiltersChange={() => {}} />
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
              onClick={() => handleCompanySelect(company)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {company.name}
                      </CardTitle>
                      <CardDescription>{company.cnpj}</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(company.status)}>
                      {getStatusText(company.status)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Filiais:</span>
                      <span className="font-medium">{company.branchCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Funcionários:</span>
                      <span className="font-medium">{company.employeeCount}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      {company.address.city}, {company.address.state}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhuma empresa encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar sua pesquisa.' : 'Comece cadastrando sua primeira empresa.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Primeira Empresa
              </Button>
            )}
          </div>
        )}
          </>
        )}
      </main>

      {/* Company Details Sheet */}
      <Sheet open={showCompanyDetails} onOpenChange={setShowCompanyDetails}>
        <SheetContent className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Detalhes da Empresa</SheetTitle>
          </SheetHeader>
          {selectedCompany && (
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="branches">Filiais</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <CompanyDetails company={selectedCompany} />
              </TabsContent>
              
              <TabsContent value="branches" className="mt-6">
                <BranchList companyId={selectedCompany.id} />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <CompanyForm 
                  company={selectedCompany} 
                  onClose={handleCloseDetails}
                  isEditing 
                />
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>
      </div>
    </PageLayout>
  );
};

export default Companies;