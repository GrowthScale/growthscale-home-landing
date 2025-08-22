import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Building2,
  Key,
  Shield,
  Users,
  Activity,
  Settings,
  Webhook,
  Database,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Clock,
  BarChart3,
  Globe,
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { enterprise } from '@/lib/enterprise';
import { advancedRBAC, SYSTEM_ROLES, SYSTEM_PERMISSIONS } from '@/lib/rbac';

export function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [enterpriseMetrics, setEnterpriseMetrics] = useState<any>(null);
  const [enterpriseHealth, setEnterpriseHealth] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);

  // Forms state
  const [ssoForm, setSsoForm] = useState({
    name: '',
    type: 'saml',
    entityId: '',
    ssoUrl: '',
    x509cert: '',
    domains: '',
  });

  const [ldapForm, setLdapForm] = useState({
    name: '',
    server: '',
    port: 389,
    bindDN: '',
    bindPassword: '',
    baseDN: '',
    userFilter: '',
    groupFilter: '',
    tls: false,
    syncInterval: 60,
  });

  const [apiKeyForm, setApiKeyForm] = useState({
    name: '',
    permissions: [] as string[],
    rateLimit: 1000,
    expiresAt: '',
  });

  useEffect(() => {
    fetchEnterpriseData();
  }, []);

  const fetchEnterpriseData = async () => {
    setLoading(true);
    try {
      const [metrics, health, logs] = await Promise.all([
        enterprise.getEnterpriseMetrics(),
        enterprise.getEnterpriseHealth(),
        Promise.resolve(advancedRBAC.getAuditLogs({ limit: 50 })),
      ]);

      setEnterpriseMetrics(metrics);
      setEnterpriseHealth(health);
      setAuditLogs(logs);
    } catch (error) {
      console.error('Error fetching enterprise data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSSO = async () => {
    try {
      if (ssoForm.type === 'saml') {
        await enterprise.configureSAML({
          name: ssoForm.name,
          entityId: ssoForm.entityId,
          ssoUrl: ssoForm.ssoUrl,
          x509cert: ssoForm.x509cert,
          domains: ssoForm.domains.split(',').map(d => d.trim()),
        });
      }
      
      setSsoForm({
        name: '',
        type: 'saml',
        entityId: '',
        ssoUrl: '',
        x509cert: '',
        domains: '',
      });
      
      alert('SSO configurado com sucesso!');
    } catch (error) {
      alert('Erro ao configurar SSO: ' + error.message);
    }
  };

  const handleCreateLDAP = async () => {
    try {
      await enterprise.configureLDAP({
        ...ldapForm,
        attributeMapping: {
          email: 'mail',
          firstName: 'givenName',
          lastName: 'sn',
          groups: 'memberOf',
        },
      });
      
      setLdapForm({
        name: '',
        server: '',
        port: 389,
        bindDN: '',
        bindPassword: '',
        baseDN: '',
        userFilter: '',
        groupFilter: '',
        tls: false,
        syncInterval: 60,
      });
      
      alert('LDAP configurado com sucesso!');
    } catch (error) {
      alert('Erro ao configurar LDAP: ' + error.message);
    }
  };

  const handleCreateAPIKey = async () => {
    try {
      const apiKey = await enterprise.generateAPIKey({
        name: apiKeyForm.name,
        userId: 'current_user',
        tenantId: 'current_tenant',
        permissions: apiKeyForm.permissions,
        rateLimit: { requests: apiKeyForm.rateLimit, window: 3600 },
        expiresAt: apiKeyForm.expiresAt ? new Date(apiKeyForm.expiresAt) : undefined,
      });

      setApiKeys(prev => [...prev, apiKey]);
      setApiKeyForm({
        name: '',
        permissions: [],
        rateLimit: 1000,
        expiresAt: '',
      });
      
      alert('API Key criada com sucesso!');
    } catch (error) {
      alert('Erro ao criar API Key: ' + error.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para área de transferência!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-accent bg-accent/10 dark:bg-accent';
      case 'degraded': return 'text-accent bg-accent/10 dark:bg-accent';
      case 'unhealthy': return 'text-destructive bg-destructive/10 dark:bg-destructive';
      default: return 'text-muted-foreground bg-muted dark:bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'unhealthy': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const permissionMatrix = advancedRBAC.getPermissionMatrix();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Enterprise Dashboard</h1>
          <p className="text-muted-foreground dark:text-muted-foreground">
            Configuração e monitoramento de recursos enterprise
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={fetchEnterpriseData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Enterprise Metrics */}
      {enterpriseMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enterpriseMetrics.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {enterpriseMetrics.activeUsers} ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chamadas API</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enterpriseMetrics.apiCalls}</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Logins SSO</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enterpriseMetrics.ssoLogins}</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rate Limit Hits</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enterpriseMetrics.rateLimitHits}</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sso">SSO</TabsTrigger>
          <TabsTrigger value="ldap">LDAP</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="rbac">RBAC</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enterprise Health */}
            {enterpriseHealth && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Health Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Status Geral</span>
                      <Badge variant="outline" className={getStatusColor(enterpriseHealth.status)}>
                        {getStatusIcon(enterpriseHealth.status)}
                        {enterpriseHealth.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(enterpriseHealth.services).map(([service, data]: [string, any]) => (
                        <div key={service} className="flex items-center justify-between p-3 bg-muted dark:bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm capitalize">{service}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(data.status)}>
                              {getStatusIcon(data.status)}
                              {data.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {data.latency ? `${data.latency.toFixed(0)}ms` : ''}
                              {data.rateLimit ? `${data.rateLimit.toFixed(0)}/h` : ''}
                              {data.success ? `${data.success.toFixed(1)}%` : ''}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Audit Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Logs de Auditoria Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {auditLogs.slice(0, 10).map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted dark:bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          log.result === 'success' ? 'bg-accent' : 
                          log.result === 'blocked' ? 'bg-destructive' : 'bg-accent'
                        }`}></div>
                        <span className="text-sm font-medium">{log.action}</span>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <Badge variant="outline" className={
                        log.result === 'success' ? 'text-accent' : 
                        log.result === 'blocked' ? 'text-destructive' : 'text-accent'
                      }>
                        {log.result}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SSO Tab */}
        <TabsContent value="sso" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Configuração SSO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sso-name">Nome</Label>
                  <Input
                    id="sso-name"
                    value={ssoForm.name}
                    onChange={(e) => setSsoForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Azure AD SSO"
                  />
                </div>

                <div>
                  <Label htmlFor="sso-type">Tipo</Label>
                  <Select value={ssoForm.type} onValueChange={(value) => setSsoForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saml">SAML 2.0</SelectItem>
                      <SelectItem value="oidc">OpenID Connect</SelectItem>
                      <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {ssoForm.type === 'saml' && (
                  <>
                    <div>
                      <Label htmlFor="entity-id">Entity ID</Label>
                      <Input
                        id="entity-id"
                        value={ssoForm.entityId}
                        onChange={(e) => setSsoForm(prev => ({ ...prev, entityId: e.target.value }))}
                        placeholder="https://sts.windows.net/..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="sso-url">SSO URL</Label>
                      <Input
                        id="sso-url"
                        value={ssoForm.ssoUrl}
                        onChange={(e) => setSsoForm(prev => ({ ...prev, ssoUrl: e.target.value }))}
                        placeholder="https://login.microsoftonline.com/..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="x509cert">Certificado X.509</Label>
                      <Textarea
                        id="x509cert"
                        value={ssoForm.x509cert}
                        onChange={(e) => setSsoForm(prev => ({ ...prev, x509cert: e.target.value }))}
                        placeholder="-----BEGIN CERTIFICATE-----"
                        rows={4}
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <Label htmlFor="domains">Domínios (separados por vírgula)</Label>
                  <Input
                    id="domains"
                    value={ssoForm.domains}
                    onChange={(e) => setSsoForm(prev => ({ ...prev, domains: e.target.value }))}
                    placeholder="empresa.com, subsidiary.com"
                  />
                </div>
              </div>

              <Button onClick={handleCreateSSO} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Configurar SSO
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LDAP Tab */}
        <TabsContent value="ldap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Configuração LDAP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ldap-name">Nome</Label>
                  <Input
                    id="ldap-name"
                    value={ldapForm.name}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Active Directory"
                  />
                </div>

                <div>
                  <Label htmlFor="ldap-server">Servidor</Label>
                  <Input
                    id="ldap-server"
                    value={ldapForm.server}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, server: e.target.value }))}
                    placeholder="ldap.empresa.com"
                  />
                </div>

                <div>
                  <Label htmlFor="ldap-port">Porta</Label>
                  <Input
                    id="ldap-port"
                    type="number"
                    value={ldapForm.port}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, port: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ldap-tls"
                    checked={ldapForm.tls}
                    onCheckedChange={(checked) => setLdapForm(prev => ({ ...prev, tls: checked }))}
                  />
                  <Label htmlFor="ldap-tls">Usar TLS/SSL</Label>
                </div>

                <div>
                  <Label htmlFor="bind-dn">Bind DN</Label>
                  <Input
                    id="bind-dn"
                    value={ldapForm.bindDN}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, bindDN: e.target.value }))}
                    placeholder="cn=admin,dc=empresa,dc=com"
                  />
                </div>

                <div>
                  <Label htmlFor="bind-password">Bind Password</Label>
                  <Input
                    id="bind-password"
                    type="password"
                    value={ldapForm.bindPassword}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, bindPassword: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="base-dn">Base DN</Label>
                  <Input
                    id="base-dn"
                    value={ldapForm.baseDN}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, baseDN: e.target.value }))}
                    placeholder="dc=empresa,dc=com"
                  />
                </div>

                <div>
                  <Label htmlFor="sync-interval">Intervalo de Sync (min)</Label>
                  <Input
                    id="sync-interval"
                    type="number"
                    value={ldapForm.syncInterval}
                    onChange={(e) => setLdapForm(prev => ({ ...prev, syncInterval: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <Button onClick={handleCreateLDAP} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Configurar LDAP
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Criar API Key
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="api-name">Nome</Label>
                  <Input
                    id="api-name"
                    value={apiKeyForm.name}
                    onChange={(e) => setApiKeyForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Integração Mobile App"
                  />
                </div>

                <div>
                  <Label htmlFor="rate-limit">Rate Limit (req/hora)</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    value={apiKeyForm.rateLimit}
                    onChange={(e) => setApiKeyForm(prev => ({ ...prev, rateLimit: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="expires-at">Data de Expiração (opcional)</Label>
                  <Input
                    id="expires-at"
                    type="datetime-local"
                    value={apiKeyForm.expiresAt}
                    onChange={(e) => setApiKeyForm(prev => ({ ...prev, expiresAt: e.target.value }))}
                  />
                </div>

                <Button onClick={handleCreateAPIKey} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar API Key
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Keys Existentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{key.name}</span>
                        <Badge variant={key.enabled ? 'default' : 'secondary'}>
                          {key.enabled ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted dark:bg-muted p-1 rounded">
                          {showApiKey === key.id ? key.key : '••••••••••••••••••••••••••••••••••••'}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowApiKey(showApiKey === key.id ? null : key.id)}
                        >
                          {showApiKey === key.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(key.key)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Rate Limit: {key.rateLimit.requests}/hora
                        {key.expiresAt && ` • Expira: ${new Date(key.expiresAt).toLocaleDateString()}`}
                      </div>
                    </div>
                  ))}
                  
                  {apiKeys.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhuma API key criada ainda</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* RBAC Tab */}
        <TabsContent value="rbac" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Matriz de Permissões RBAC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border-b font-medium">Permissão</th>
                      {permissionMatrix.roles.map(role => (
                        <th key={role.id} className="text-center p-2 border-b font-medium min-w-[80px]">
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissionMatrix.permissions.slice(0, 20).map((permission, permIndex) => (
                      <tr key={permission.id} className="hover:bg-muted dark:hover:bg-muted">
                        <td className="p-2 border-b">
                          <div>
                            <div className="font-medium">{permission.name}</div>
                            <div className="text-muted-foreground">{permission.description}</div>
                          </div>
                        </td>
                        {permissionMatrix.roles.map((role, roleIndex) => (
                          <td key={`${role.id}-${permission.id}`} className="text-center p-2 border-b">
                            {permissionMatrix.matrix[roleIndex][permIndex] ? (
                              <CheckCircle className="w-4 h-4 text-accent mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {permissionMatrix.permissions.length > 20 && (
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Mostrando 20 de {permissionMatrix.permissions.length} permissões
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Logs de Auditoria Detalhados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {auditLogs.map((log, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          log.result === 'success' ? 'bg-accent' : 
                          log.result === 'blocked' ? 'bg-destructive' : 'bg-accent'
                        }`}></div>
                        <span className="font-medium">{log.action}</span>
                        <Badge variant="outline">{log.resource}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          log.result === 'success' ? 'text-accent' : 
                          log.result === 'blocked' ? 'text-destructive' : 'text-accent'
                        }>
                          {log.result}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <div>Usuário: {log.userId}</div>
                      <div>IP: {log.ipAddress}</div>
                      {log.reason && <div>Motivo: {log.reason}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
