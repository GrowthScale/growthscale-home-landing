import React from 'react';
import { EnterpriseDashboard } from '@/components/EnterpriseDashboard';
import { SEOHead } from '@/components/SEOHead';

export default function Enterprise() {
  return (
    <>
      <SEOHead
        title="Enterprise - GrowthScale"
        description="Dashboard enterprise com SSO, LDAP, RBAC avançado e gerenciamento de API"
        keywords="enterprise, sso, ldap, rbac, api keys, audit trails, compliance"
      />
      <div className="min-h-screen bg-background">
        <EnterpriseDashboard />
      </div>
    </>
  );
}
