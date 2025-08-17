// Tipos para o CLT Assistant
export interface CLTMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
  isLoading?: boolean;
}

export interface CLTChatSession {
  id: string;
  messages: CLTMessage[];
  createdAt: string;
  updatedAt: string;
  title?: string;
}

export interface CLTResponse {
  message: string;
  confidence: number;
  sources?: CLTSource[];
  suggestions?: string[];
}

export interface CLTSource {
  title: string;
  url?: string;
  content: string;
  relevance: number;
}

export interface CLTContext {
  companySize: 'small' | 'medium' | 'large';
  industry: string;
  employeeCount: number;
  currentIssues: string[];
}

export interface CLTSettings {
  language: 'pt-BR' | 'en-US';
  responseLength: 'short' | 'medium' | 'long';
  includeSources: boolean;
  includeSuggestions: boolean;
  autoSave: boolean;
}

// Tipos para validação CLT
export interface CLTValidationRule {
  id: string;
  name: string;
  description: string;
  category: 'workload' | 'overtime' | 'breaks' | 'holidays' | 'payroll';
  severity: 'low' | 'medium' | 'high' | 'critical';
  cltArticle: string;
  penalty?: string;
}

export interface CLTViolation {
  ruleId: string;
  rule: CLTValidationRule;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedAction: string;
  deadline?: string;
}

// Tipos para cálculos CLT
export interface CLTCalculation {
  type: 'overtime' | 'holiday' | 'night_shift' | 'dangerous_work';
  baseSalary: number;
  hours: number;
  rate: number;
  total: number;
  description: string;
}

export interface CLTPayroll {
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  additions: CLTCalculation[];
  deductions: CLTCalculation[];
  netSalary: number;
  period: string;
}

// Tipos para relatórios CLT
export interface CLTReport {
  id: string;
  title: string;
  type: 'compliance' | 'payroll' | 'violations' | 'summary';
  period: string;
  data: Record<string, unknown>;
  generatedAt: string;
  status: 'draft' | 'final' | 'archived';
}

// Tipos para configurações de empresa
export interface CLTCompanySettings {
  companyId: string;
  workSchedule: {
    regularHours: number;
    overtimeLimit: number;
    nightShiftStart: string;
    nightShiftEnd: string;
  };
  benefits: {
    mealAllowance: boolean;
    transportAllowance: boolean;
    healthInsurance: boolean;
    dentalInsurance: boolean;
  };
  compliance: {
    autoValidation: boolean;
    notificationThreshold: 'low' | 'medium' | 'high';
    requiredApprovals: string[];
  };
}
