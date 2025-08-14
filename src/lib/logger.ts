type Any = Record<string, unknown>;

const SENSITIVE_KEYS = [
  'password', 'pass', 'token', 'authorization', 'auth',
  'cpf', 'cnpj', 'email', 'phone', 'telefone', 'celular',
  'card', 'cartao', 'credit_card', 'debit_card',
  'account', 'conta', 'bank', 'banco', 'agency', 'agencia',
  'secret', 'key', 'api_key', 'private_key', 'secret_key'
];

function redact(obj: Any) {
  try {
    return JSON.parse(JSON.stringify(obj, (_k, v) => v));
  } catch { 
    return obj; 
  }
}

function deepRedact(input: Any): Any {
  if (!input || typeof input !== 'object') return input;
  
  const out: Any = Array.isArray(input) ? [] : {};
  
  for (const [k, v] of Object.entries(input)) {
    const keyLower = k.toLowerCase();
    
    // Verificar se a chave contém dados sensíveis
    if (SENSITIVE_KEYS.some(sensitive => keyLower.includes(sensitive))) {
      out[k] = '***REDACTED***';
    } else if (typeof v === 'object') {
      out[k] = deepRedact(v);
    } else {
      out[k] = v;
    }
  }
  
  return out;
}

function formatMessage(level: string, msg: string, data?: Any): string {
  const timestamp = new Date().toISOString();
  const dataStr = data ? ` | Data: ${JSON.stringify(deepRedact(redact(data)))}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${msg}${dataStr}`;
}

export const log = {
  info: (msg: string, data?: Any) => {
    console.info(formatMessage('info', msg, data));
  },
  
  warn: (msg: string, data?: Any) => {
    console.warn(formatMessage('warn', msg, data));
  },
  
  error: (msg: string, data?: Any) => {
    console.error(formatMessage('error', msg, data));
  },
  
  debug: (msg: string, data?: Any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('debug', msg, data));
    }
  }
};

// Log de auditoria para ações sensíveis
export const auditLog = {
  userAction: (action: string, userId: string, details?: Any) => {
    log.info(`[AUDIT] User action: ${action}`, {
      userId: '***REDACTED***', // Sempre mascarar ID do usuário
      action,
      timestamp: new Date().toISOString(),
      ...details
    });
  },
  
  securityEvent: (event: string, details?: Any) => {
    log.warn(`[SECURITY] ${event}`, {
      event,
      timestamp: new Date().toISOString(),
      ip: '***REDACTED***',
      ...details
    });
  },
  
  dataAccess: (resource: string, userId: string, operation: string) => {
    log.info(`[DATA_ACCESS] ${operation} on ${resource}`, {
      userId: '***REDACTED***',
      resource,
      operation,
      timestamp: new Date().toISOString()
    });
  }
};
