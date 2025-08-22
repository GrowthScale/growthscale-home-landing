import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { type Employee } from '@/services/api';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
}

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Inativo</Badge>;
      case 'vacation':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Férias</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'vacation':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const formatSalary = (salary?: number) => {
    if (!salary) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(salary);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAddressText = (address?: any) => {
    if (!address) return 'Não informado';
    if (typeof address === 'string') return address;
    if (typeof address === 'object' && address.full) return address.full;
    return 'Endereço não disponível';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" size="sm" className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Remover
          </Button>
        </div>
      </div>

      {/* Employee Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.position}</p>
              <div className="flex items-center space-x-2 mt-2">
                {getStatusIcon(employee.status || 'active')}
                {getStatusBadge(employee.status || 'active')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações de Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{employee.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <p className="text-sm text-muted-foreground">
                  {employee.phone_number || 'Não informado'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Endereço</p>
              <p className="text-sm text-muted-foreground">
                {getAddressText(employee.address)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Informações Profissionais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Cargo</p>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Departamento</p>
                <p className="text-sm text-muted-foreground">
                  {employee.department || 'Não informado'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data de Início</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(employee.start_date)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Carga Horária</p>
                <p className="text-sm text-muted-foreground">
                  {employee.workload_hours ? `${employee.workload_hours}h/dia` : 'Não informado'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Salário</p>
              <p className="text-sm text-muted-foreground">
                {formatSalary(employee.salary)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      {employee.skills && employee.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Habilidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Adicionais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">ID do Funcionário</p>
              <p className="text-sm text-muted-foreground font-mono">
                {employee.id}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Empresa</p>
              <p className="text-sm text-muted-foreground">
                ID: {employee.company_id}
              </p>
            </div>
          </div>

          {employee.created_at && (
            <div>
              <p className="text-sm font-medium">Data de Cadastro</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(employee.created_at)}
              </p>
            </div>
          )}

          {employee.updated_at && (
            <div>
              <p className="text-sm font-medium">Última Atualização</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(employee.updated_at)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}