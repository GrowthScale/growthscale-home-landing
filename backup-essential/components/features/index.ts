// Exportações dos componentes do CLT Assistant
export { CLTChatBubble } from './CLTChatBubble';
export { CLTChatInput } from './CLTChatInput';
export { CLTChatHeader } from './CLTChatHeader';
export { CLTSuggestions } from './CLTSuggestions';
export { CLTSources } from './CLTSources';
export { CLTConfidence } from './CLTConfidence';

// Re-exportação dos tipos
export type {
  CLTMessage,
  CLTChatSession,
  CLTResponse,
  CLTSource,
  CLTContext,
  CLTSettings,
  CLTValidationRule,
  CLTViolation,
  CLTCalculation,
  CLTPayroll,
  CLTReport,
  CLTCompanySettings,
  CLTSuggestion,
  CLTChatConfig
} from '@/types/clt';
