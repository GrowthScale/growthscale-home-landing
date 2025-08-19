import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
  Edit,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  FileText,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'vacation';
  startDate: string;
  lastUpdate: string;
  address: string;
  salary: string;
  skills: string[];
}

interface EmployeeDetailsProps {
  employee: Employee;
  onClose?: () => void;
}

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'vacation': return <Clock className="h-4 w-4 text-accent" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'vacation': return 'Férias';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'vacation': return 'bg-accent text-accent-foreground';
      case 'inactive': return 'bg-destructive text-destructive-foreground';
              default: return 'bg-muted text-foreground/80';
    }
  };

  // Mock data for performance metrics
  const performanceData = {
    shiftsCompleted: 142,
    punctualityRate: 96,
    performanceScore: 4.7,
    lastSchedule: '15/08/2024 - Manhã'
  };

  const recentActivities = [
    { date: '15/08/2024', activity: 'Completou turno da manhã', type: 'shift' },
    { date: '14/08/2024', activity: 'Treinamento de atendimento', type: 'training' },
    { date: '12/08/2024', activity: 'Avaliação de desempenho', type: 'evaluation' },
    { date: '10/08/2024', activity: 'Completou turno da tarde', type: 'shift' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with employee basic info */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
                <p className="text-lg text-foreground/80">{employee.position}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(employee.status)}
                  <Badge className={getStatusColor(employee.status)}>
                    {getStatusLabel(employee.status)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Funcionário
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Desativar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.address}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.department}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Desde {employee.startDate}</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.salary}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills and competencies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Habilidades e Competências</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Métricas de Desempenho</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{performanceData.shiftsCompleted}</p>
              <p className="text-sm text-muted-foreground">Turnos Completos</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-success">{performanceData.punctualityRate}%</p>
              <p className="text-sm text-muted-foreground">Pontualidade</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">{performanceData.performanceScore}</p>
              <p className="text-sm text-muted-foreground">Avaliação</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-foreground">{performanceData.lastSchedule}</p>
              <p className="text-sm text-muted-foreground">Última Escala</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Atividades Recentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'shift' ? 'bg-primary' :
                  activity.type === 'training' ? 'bg-secondary' :
                  'bg-accent'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Gerar Relatório
        </Button>
        <Button variant="outline" className="flex-1">
          <Users className="h-4 w-4 mr-2" />
          Ver Escalas
        </Button>
        <Button className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          Editar Dados
        </Button>
      </div>
    </div>
  );
}