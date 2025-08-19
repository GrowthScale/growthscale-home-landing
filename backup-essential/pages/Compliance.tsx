import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield,
  AlertTriangle,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Activity,
  Users,
  Calendar,
  BarChart3,
  FileDown,
  Check,
  Play
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ComplianceAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  department: string;
  impact: 'high' | 'medium' | 'low';
  status: 'open' | 'resolved';
}

// Dados mock para exportação
interface MockShift {
  id: string;
  employee_id: string;
  startTime: string;
  endTime: string;
}

interface MockEmployee {
  id: string;
  name: string;
}

const mockAlerts: ComplianceAlert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Excesso de Horas Extras',
    description: 'Funcionário João Silva excedeu 2h extras permitidas',
    timestamp: '2024-08-15 14:30',
    department: 'Vendas',
    impact: 'high',
    status: 'open'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Intervalo Mínimo não Respeitado',
    description: 'Turno de 6h sem intervalo mínimo de 15min',
    timestamp: '2024-08-15 12:15',
    department: 'Estoque',
    impact: 'medium',
    status: 'open'
  }
];

const mockShifts: MockShift[] = [
  {
    id: '1',
    employee_id: '1',
    startTime: '2024-12-19T08:00:00Z',
    endTime: '2024-12-19T17:00:00Z'
  },
  {
    id: '2',
    employee_id: '2',
    startTime: '2024-12-19T09:00:00Z',
    endTime: '2024-12-19T18:00:00Z'
  },
  {
    id: '3',
    employee_id: '1',
    startTime: '2024-12-20T08:00:00Z',
    endTime: '2024-12-20T17:00:00Z'
  },
  {
    id: '4',
    employee_id: '3',
    startTime: '2024-12-20T10:00:00Z',
    endTime: '2024-12-20T19:00:00Z'
  }
];

const mockEmployees: MockEmployee[] = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Santos' },
  { id: '3', name: 'Pedro Oliveira' }
];

export default function CompliancePage() {
  const [selectedAlert, setSelectedAlert] = useState<ComplianceAlert | null>(null);

  const kpiData = {
    conformityRate: 94,
    activeAlerts: 3,
    overtimeHours: 45,
    riskLevel: 'low'
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-accent" />;
      default: return <CheckCircle className="h-5 w-5 text-success" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  const handleExportToCSV = () => {
    // Assumindo que você tem os dados de 'shifts' e 'employees' disponíveis nesta página
    if (!mockShifts || !mockEmployees) {
      alert("Não há dados para exportar.");
      return;
    }

    // 1. Cabeçalho do CSV
    let csvContent = "data:text/csv;charset=utf-8,Funcionário,Data,Entrada,Saída,Horas Totais\n";

    // 2. Processar cada turno
    mockShifts.forEach(shift => {
      const employee = mockEmployees.find(e => e.id === shift.employee_id);
      if (!employee) {return;}

      const startDate = new Date(shift.startTime);
      const endDate = new Date(shift.endTime);
      
      const date = startDate.toLocaleDateString('pt-BR');
      const startTime = startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const endTime = endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const totalHours = ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)).toFixed(2);

      const row = [employee.name, date, startTime, endTime, totalHours].join(",");
      csvContent += row + "\n";
    });

    // 3. Criar e disparar o download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_de_escala_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-xl">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-primary rounded-lg shadow-soft" role="img" aria-label="Ícone de compliance trabalhista">
              <Shield className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-body text-balance">Compliance Trabalhista</h1>
              <p className="text-foreground/80 mt-1 leading-relaxed">
                Mantenha-se alinhado com as normas trabalhistas e evite riscos em tempo real
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-xl">
        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" aria-labelledby="kpi-section">
          <h2 id="kpi-section" className="sr-only">Indicadores principais de compliance</h2>
          <Card className="hover:shadow-card transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conformidade Atual</p>
                  <p className="text-3xl font-bold text-success">{kpiData.conformityRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" aria-hidden="true" />
              </div>
              <Progress value={kpiData.conformityRate} className="mt-4" aria-label={`Conformidade atual: ${kpiData.conformityRate}%`} />
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertas Ativos</p>
                  <p className="text-3xl font-bold text-destructive">{kpiData.activeAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">2 críticos, 1 aviso</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Horas Extra (mês)</p>
                  <p className="text-3xl font-bold text-accent">{kpiData.overtimeHours}h</p>
                </div>
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Dentro do limite</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nível de Risco</p>
                  <p className="text-3xl font-bold text-success">Baixo</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Situação controlada</p>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Alertas Ativos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>Alertas em Tempo Real</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAlerts.map((alert) => (
                <Alert key={alert.id} className="border-l-4 border-l-destructive">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{alert.department}</Badge>
                          <Badge className={getImpactColor(alert.impact)}>
                            Impacto {alert.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{alert.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p>{alert.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Departamento:</strong> {alert.department}
                            </div>
                            <div>
                              <strong>Horário:</strong> {alert.timestamp}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm">
                              <Check className="mr-2 h-4 w-4" />
                              Marcar como Resolvido
                            </Button>
                            <Button variant="outline" size="sm">
                              <Play className="mr-2 h-4 w-4" />
                              Executar Ação
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* Gráfico de Conformidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Tendência de Conformidade</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Gráfico de tendências</p>
                  <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Recomendadas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Ações Recomendadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Revisar Escalas de Vendas</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Ajustar turnos para evitar excesso de horas extras
                </p>
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Executar Ação
                </Button>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Configurar Intervalos Automáticos</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Garantir intervalos mínimos obrigatórios
                </p>
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Executar Ação
                </Button>
              </div>
            </div>
            
            {/* Botão de Exportação */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-1">Exportar Relatório para Contabilidade</h4>
                  <p className="text-sm text-muted-foreground">
                    Gere um relatório CSV com todos os turnos e horas trabalhadas para envio ao contador
                  </p>
                </div>
                <Button onClick={handleExportToCSV} className="bg-primary hover:bg-primary/90">
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar para CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}