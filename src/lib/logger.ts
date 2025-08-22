const isDevelopment = import.meta.env.DEV;

const formatMessage = (level: string, msg: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  
  if (data) {
    return `${prefix} ${msg} ${JSON.stringify(data, null, 2)}`;
  }
  
  return `${prefix} ${msg}`;
};

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args: any[]) => {
    console.error(...args); // Sempre logar erros
  },
  warn: (...args: any[]) => {
    console.warn(...args); // Sempre logar warnings
  },
  info: (...args: any[]) => {
    if (isDevelopment) console.info(...args);
  },
  debug: (...args: any[]) => {
    if (isDevelopment) console.debug(...args);
  }
};

// Funções de conveniência para compatibilidade
export const logInfo = (msg: string, data?: any) => {
  if (isDevelopment) {
    console.info(formatMessage('info', msg, data));
  }
};

export const logWarn = (msg: string, data?: any) => {
  console.warn(formatMessage('warn', msg, data));
};

export const logError = (msg: string, data?: any) => {
  console.error(formatMessage('error', msg, data));
};

export const logDebug = (msg: string, data?: any) => {
  if (isDevelopment) {
    console.debug(formatMessage('debug', msg, data));
  }
};
