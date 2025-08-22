import React, { useState, useEffect } from 'react';
import { useSecurity } from '@/hooks/useSecurity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  FileText,
  Lock,
  UserCheck,
  Database,
  Globe,
  Clock,
  Users,
  Settings,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

interface SecurityStatus {
  status: string;
  threats: {
    xss: string;
    csrf: string;
    sql_injection: string;
    rate_limiting: string;
    ddos_protection: string;
  };
  headers: {
    'Content-Security-Policy': string;
    'X-Frame-Options': string;
    'X-Content-Type-Options': string;
    'Strict-Transport-Security': string;
    'X-XSS-Protection': string;
  };
  recommendations: string[];
}

interface AuditData {
  total_events: number;
  events_by_category: Record<string, number>;
  events_by_severity: Record<string, number>;
  recent_events: any[];
  compliance_summary: {
    gdpr_article_6: number;
    gdpr_article_7: number;
    gdpr_article_17: number;
    data_retention: string;
  };
}

export function SecurityDashboard() {
  const { 
    checkSecurityStatus, 
    getAuditLogs, 
    requestGDPRDeletion,
    isOnline,
    syncOfflineData 
  } = useSecurity();
  
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [gdprDeletionRequested, setGdprDeletionRequested] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [security, audit] = await Promise.all([
        checkSecurityStatus(),
        getAuditLogs({ limit: 100 }),
      ]);

      setSecurityStatus(security);
      setAuditData(audit);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGDPRDeletion = async () => {
    if (window.confirm('Tem certeza que deseja solicitar a exclusão de seus dados? Esta ação não pode ser desfeita.')) {
      setLoading(true);
      try {
        const result = await requestGDPRDeletion();
        if (result.success) {
          setGdprDeletionRequested(true);
          alert('Solicitação de exclusão GDPR registrada com sucesso. Seus dados serão revisados e excluídos conforme a legislação.');
        } else {
          alert('Erro ao solicitar exclusão: ' + result.error);
        }
      } catch (error) {
        alert('Erro ao processar solicitação de exclusão');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'protected':
      case 'secure':
        return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'error':
      case 'inactive':
        return 'text-red-600 bg-red-100 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'protected':
      case 'secure':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security & Compliance Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitoramento de segurança e compliance GDPR
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={isOnline ? 'text-green-600' : 'text-red-600'}>
            {isOnline ? <Globe className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          <Button onClick={fetchAllData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button onClick={syncOfflineData} variant="outline">
            Sincronizar
          </Button>
        </div>
      </div>

      {/* Security Status */}
      {securityStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Threat Protection */}
              <div>
                <h3 className="font-semibold mb-4">Threat Protection</h3>
                <div className="space-y-3">
                  {securityStatus?.threats && Object.entries(securityStatus.threats).map(([threat, status]) => (
                    <div key={threat} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm capitalize">{threat.replace('_', ' ')}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(status)}>
                        {getStatusIcon(status)}
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Headers */}
              <div>
                <h3 className="font-semibold mb-4">Security Headers</h3>
                <div className="space-y-3">
                  {securityStatus?.headers && Object.entries(securityStatus.headers).map(([header, status]) => (
                    <div key={header} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm font-mono">{header}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(status)}>
                        {getStatusIcon(status)}
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {securityStatus?.recommendations && securityStatus.recommendations.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {securityStatus.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800 dark:text-blue-200">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* GDPR Compliance */}
      {auditData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              GDPR Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{auditData?.compliance_summary?.gdpr_article_6 || 0}</div>
                <div className="text-sm text-green-600">Article 6 (Legal Basis)</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{auditData?.compliance_summary?.gdpr_article_7 || 0}</div>
                <div className="text-sm text-blue-600">Article 7 (Consent)</div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{auditData?.compliance_summary?.gdpr_article_17 || 0}</div>
                <div className="text-sm text-yellow-600">Article 17 (Right to be Forgotten)</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{auditData?.total_events || 0}</div>
                <div className="text-sm text-purple-600">Total Audit Events</div>
              </div>
            </div>

            {/* GDPR Actions */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleGDPRDeletion} 
                disabled={loading || gdprDeletionRequested}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {gdprDeletionRequested ? 'Exclusão Solicitada' : 'Solicitar Exclusão GDPR'}
              </Button>
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </Button>
              
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Portabilidade
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Events */}
      {auditData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Recent Audit Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Events by Category */}
              <div>
                <h3 className="font-semibold mb-3">Events by Category</h3>
                <div className="space-y-2">
                  {auditData?.events_by_category && Object.entries(auditData.events_by_category).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm capitalize">{category.replace('_', ' ')}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events by Severity */}
              <div>
                <h3 className="font-semibold mb-3">Events by Severity</h3>
                <div className="space-y-2">
                  {auditData?.events_by_severity && Object.entries(auditData.events_by_severity).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm capitalize">{severity}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Events List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {auditData?.recent_events && auditData.recent_events.slice(0, 10).map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">{event.event}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(event.severity)}>
                    {event.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Retention Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Retention Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-xl font-bold text-green-600">Compliant</div>
              <div className="text-sm text-green-600">Data Retention</div>
              <div className="text-xs text-green-500 mt-1">7 years retention</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xl font-bold text-blue-600">Active</div>
              <div className="text-sm text-blue-600">Audit Logging</div>
              <div className="text-xs text-blue-500 mt-1">Real-time monitoring</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-xl font-bold text-purple-600">Secure</div>
              <div className="text-sm text-purple-600">Data Encryption</div>
              <div className="text-xs text-purple-500 mt-1">AES-256 encryption</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
