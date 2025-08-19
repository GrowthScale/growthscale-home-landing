import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityEvent {
  event: string;
  category?: string;
  severity?: 'info' | 'warning' | 'error' | 'critical';
  resource?: string;
  action?: string;
  details?: Record<string, any>;
  gdprArticle?: string;
  dataSubject?: string;
  legalBasis?: string;
  retentionPeriod?: string;
}

interface SecurityAnalysis {
  isSuspicious: boolean;
  threats: string[];
  riskScore: number;
  recommendations: string[];
}

interface RateLimitData {
  requests: number;
  windowStart: number;
  remaining: number;
  resetTime: number;
}

export function useSecurity() {
  const { user } = useAuth();
  const sessionId = useRef<string>(generateSessionId());
  const isOnline = useRef<boolean>(navigator.onLine);

  // Gerar session ID único
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Detectar mudanças de conectividade
  useEffect(() => {
    const handleOnline = () => {
      isOnline.current = true;
      console.log('Security: Conexão restaurada');
    };

    const handleOffline = () => {
      isOnline.current = false;
      console.log('Security: Conexão perdida');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Analisar segurança da requisição
  const analyzeSecurity = useCallback(async (data: any): Promise<SecurityAnalysis> => {
    if (!isOnline.current) {
      return {
        isSuspicious: false,
        threats: [],
        riskScore: 0,
        recommendations: ['Offline mode - security analysis unavailable']
      };
    }

    try {
      const response = await fetch('/api/security', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Security analysis error: ${response.status}`);
      }

      const result = await response.json();
      return result.security;
    } catch (error) {
      console.error('Security Analysis Error:', error);
      return {
        isSuspicious: false,
        threats: ['analysis_failed'],
        riskScore: 0,
        recommendations: ['Security analysis service unavailable']
      };
    }
  }, []);

  // Registrar evento de auditoria
  const logAuditEvent = useCallback(async (event: SecurityEvent) => {
    if (!isOnline.current) {
      // Armazenar offline para envio posterior
      storeOfflineAuditEvent(event);
      return;
    }

    try {
      const auditData = {
        ...event,
        userId: user?.id,
        sessionId: sessionId.current,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auditData),
      });

      if (!response.ok) {
        throw new Error(`Audit logging error: ${response.status}`);
      }

      console.log('Audit Event:', auditData);
    } catch (error) {
      console.error('Audit Logging Error:', error);
      storeOfflineAuditEvent(event);
    }
  }, [user]);

  // Verificar status de segurança
  const checkSecurityStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/security');
      const securityData = await response.json();
      
      console.log('Security Status:', securityData);
      return securityData;
    } catch (error) {
      console.error('Security Status Check Error:', error);
      return { status: 'error', error: error.message };
    }
  }, []);

  // Buscar logs de auditoria
  const getAuditLogs = useCallback(async (filters?: {
    userId?: string;
    event?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) => {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
      }

      const response = await fetch(`/api/audit?${params.toString()}`);
      const auditData = await response.json();
      
      return auditData;
    } catch (error) {
      console.error('Audit Logs Fetch Error:', error);
      return null;
    }
  }, []);

  // Solicitar exclusão GDPR (Right to be Forgotten)
  const requestGDPRDeletion = useCallback(async (dataSubject?: string) => {
    try {
      const response = await fetch('/api/audit', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          dataSubject: dataSubject || user?.email,
        }),
      });

      const result = await response.json();
      console.log('GDPR Deletion Request:', result);
      return result;
    } catch (error) {
      console.error('GDPR Deletion Request Error:', error);
      return { success: false, error: error.message };
    }
  }, [user]);

  // Armazenar eventos de auditoria offline
  const storeOfflineAuditEvent = (event: SecurityEvent) => {
    try {
      const offlineAuditEvents = JSON.parse(localStorage.getItem('offline_audit_events') || '[]');
      offlineAuditEvents.push({
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: sessionId.current,
        userId: user?.id,
      });
      localStorage.setItem('offline_audit_events', JSON.stringify(offlineAuditEvents.slice(-50)));
    } catch (error) {
      console.error('Error storing offline audit event:', error);
    }
  };

  // Sincronizar dados offline
  const syncOfflineData = useCallback(async () => {
    if (!isOnline.current) return;

    try {
      // Sincronizar eventos de auditoria offline
      const offlineAuditEvents = JSON.parse(localStorage.getItem('offline_audit_events') || '[]');
      if (offlineAuditEvents.length > 0) {
        for (const event of offlineAuditEvents) {
          await fetch('/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
          });
        }
        localStorage.removeItem('offline_audit_events');
        console.log(`Synced ${offlineAuditEvents.length} offline audit events`);
      }
    } catch (error) {
      console.error('Offline sync error:', error);
    }
  }, []);

  // Sincronizar quando voltar online
  useEffect(() => {
    if (isOnline.current) {
      syncOfflineData();
    }
  }, [syncOfflineData]);

  // Eventos de segurança pré-definidos
  const logLoginAttempt = useCallback((success: boolean, details?: Record<string, any>) => {
    logAuditEvent({
      event: success ? 'login_success' : 'login_failed',
      category: 'authentication',
      severity: success ? 'info' : 'warning',
      resource: 'auth',
      action: 'login',
      details: {
        success,
        ip: 'client_ip',
        userAgent: navigator.userAgent,
        ...details
      },
      gdprArticle: '6',
      legalBasis: 'legitimate_interest',
      retentionPeriod: '7_years'
    });
  }, [logAuditEvent]);

  const logDataAccess = useCallback((resource: string, action: string, details?: Record<string, any>) => {
    logAuditEvent({
      event: 'data_access',
      category: 'data_protection',
      severity: 'info',
      resource,
      action,
      details,
      gdprArticle: '6',
      legalBasis: 'contract_performance',
      retentionPeriod: '7_years'
    });
  }, [logAuditEvent]);

  const logDataModification = useCallback((resource: string, action: string, details?: Record<string, any>) => {
    logAuditEvent({
      event: 'data_modification',
      category: 'data_protection',
      severity: 'warning',
      resource,
      action,
      details,
      gdprArticle: '6',
      legalBasis: 'contract_performance',
      retentionPeriod: '7_years'
    });
  }, [logAuditEvent]);

  const logPrivacyConsent = useCallback((consentType: string, granted: boolean) => {
    logAuditEvent({
      event: 'privacy_consent',
      category: 'gdpr',
      severity: 'info',
      resource: 'privacy',
      action: granted ? 'consent_granted' : 'consent_denied',
      details: {
        consentType,
        granted,
        timestamp: new Date().toISOString()
      },
      gdprArticle: '7',
      legalBasis: 'consent',
      retentionPeriod: '7_years'
    });
  }, [logAuditEvent]);

  const logSecurityIncident = useCallback((incident: string, severity: 'warning' | 'error' | 'critical', details?: Record<string, any>) => {
    logAuditEvent({
      event: 'security_incident',
      category: 'security',
      severity,
      resource: 'security',
      action: 'incident_detected',
      details: {
        incident,
        severity,
        ...details
      },
      gdprArticle: '32',
      legalBasis: 'legal_obligation',
      retentionPeriod: '7_years'
    });
  }, [logAuditEvent]);

  return {
    analyzeSecurity,
    logAuditEvent,
    checkSecurityStatus,
    getAuditLogs,
    requestGDPRDeletion,
    syncOfflineData,
    logLoginAttempt,
    logDataAccess,
    logDataModification,
    logPrivacyConsent,
    logSecurityIncident,
    isOnline: isOnline.current,
    sessionId: sessionId.current,
  };
}
