// Design Tokens da GrowthScale - Sistema Vanguarda
// Plataforma de Gestão de Escalas com IA + CLT para Food Service
// Baseado em princípios de neurodesign e psicologia de cores

export const designTokens = {
  colors: {
    primary: {
      50: '#E6F0FF',   // Confiança e estabilidade
      100: '#CCE0FF',
      200: '#99C2FF',
      300: '#66A3FF',
      400: '#3385FF',
      500: '#0066CC',  // Azul corporativo - transmite confiança
      600: '#004AAD',
      700: '#003380',
      800: '#001F52',
      900: '#001025'
    },
    secondary: {
      50: '#FFF7ED',   // Energia e otimismo
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FF6B00',  // Laranja de ação - estimula conversão
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12'
    },
    success: {
      50: '#F0FDF4',   // Crescimento e prosperidade
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',  // Verde de sucesso
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D'
    },
    warning: {
      50: '#FFFBEB',   // Atenção e cuidado
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',  // Aviso - chama atenção
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F'
    },
    error: {
      50: '#FEF2F2',   // Perigo e urgência
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',  // Vermelho de erro
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D'
    },
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    background: {
      primary: '#F5F6FA',
      secondary: '#FFFFFF',
      tertiary: '#F9FAFB',
      dark: '#0F172A'  // Para seções escuras
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF'
    },
    border: {
      primary: '#E5E7EB',
      secondary: '#F3F4F6',
      focus: '#004AAD'
    }
  },
  typography: {
    fontFamily: {
      heading: 'Inter, system-ui, sans-serif', // Moderno e confiável
      body: 'Inter, system-ui, sans-serif',    // Legível e acessível
      display: 'Inter, system-ui, sans-serif'  // Impacto visual
    },
    fontSize: {
      xs: '0.75rem',    // 12px - Micro texto
      sm: '0.875rem',   // 14px - Texto pequeno
      base: '1rem',     // 16px - Texto base
      lg: '1.125rem',   // 18px - Texto grande
      xl: '1.25rem',    // 20px - Títulos pequenos
      '2xl': '1.5rem',  // 24px - Títulos médios
      '3xl': '1.875rem', // 30px - Títulos grandes
      '4xl': '2.25rem',  // 36px - Headlines
      '5xl': '3rem',     // 48px - Hero titles
      '6xl': '3.75rem'   // 60px - Display titles
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.4',
      relaxed: '1.6',
      loose: '1.8'
    },
    letterSpacing: {
      tight: '-0.5px',
      normal: '0px',
      wide: '0.5px'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '80px'
  },
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px'
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)'
  },
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
};

// Componentes baseados em neurodesign
export const neurodesignComponents = {
  buttons: {
    primary: {
      backgroundColor: designTokens.colors.primary[600],
      color: designTokens.colors.text.inverse,
      height: '48px',
      padding: `${designTokens.spacing.md} ${designTokens.spacing['2xl']}`,
      borderRadius: designTokens.borderRadius.lg,
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      boxShadow: designTokens.shadows.md,
      transition: designTokens.transitions.normal,
      '&:hover': {
        backgroundColor: designTokens.colors.primary[700],
        transform: 'translateY(-1px)',
        boxShadow: designTokens.shadows.lg
      }
    },
    cta: {
      background: `linear-gradient(135deg, ${designTokens.colors.primary[600]} 0%, ${designTokens.colors.secondary[500]} 100%)`,
      color: designTokens.colors.text.inverse,
      height: '56px',
      padding: `${designTokens.spacing.lg} ${designTokens.spacing['3xl']}`,
      borderRadius: designTokens.borderRadius.xl,
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.bold,
      boxShadow: designTokens.shadows.xl,
      transition: designTokens.transitions.normal,
      '&:hover': {
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: designTokens.shadows['2xl']
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: designTokens.colors.primary[600],
      border: `2px solid ${designTokens.colors.primary[600]}`,
      height: '48px',
      padding: `${designTokens.spacing.md} ${designTokens.spacing['2xl']}`,
      borderRadius: designTokens.borderRadius.lg,
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      transition: designTokens.transitions.normal,
      '&:hover': {
        backgroundColor: designTokens.colors.primary[50],
        transform: 'translateY(-1px)'
      }
    }
  },
  cards: {
    feature: {
      backgroundColor: designTokens.colors.background.secondary,
      borderRadius: designTokens.borderRadius.xl,
      padding: designTokens.spacing['2xl'],
      boxShadow: designTokens.shadows.lg,
      border: `1px solid ${designTokens.colors.border.primary}`,
      transition: designTokens.transitions.normal,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: designTokens.shadows.xl
      }
    },
    pricing: {
      backgroundColor: designTokens.colors.background.secondary,
      borderRadius: designTokens.borderRadius['2xl'],
      padding: designTokens.spacing['3xl'],
      boxShadow: designTokens.shadows.xl,
      border: `2px solid ${designTokens.colors.primary[100]}`,
      transition: designTokens.transitions.normal,
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: designTokens.shadows['2xl']
      }
    },
    testimonial: {
      background: `linear-gradient(135deg, ${designTokens.colors.background.tertiary} 0%, ${designTokens.colors.background.secondary} 100%)`,
      borderRadius: designTokens.borderRadius.xl,
      padding: designTokens.spacing['2xl'],
      boxShadow: designTokens.shadows.md,
      borderLeft: `4px solid ${designTokens.colors.primary[500]}`
    }
  }
};

// Estados de escala baseados no CSV fornecido
export const scheduleTypes = {
  '5x2': {
    name: '5x2',
    description: '5 dias de trabalho / 2 de folga',
    characteristics: 'Horários fixos e previsíveis',
    advantages: 'Menor fadiga, fácil gestão',
    disadvantages: 'Menos flexível para picos de demanda',
    cost: 'Baixo',
    commonIn: 'Setores administrativos, padarias, produção interna'
  },
  '6x1': {
    name: '6x1',
    description: '6 dias de trabalho / 1 de folga',
    characteristics: 'Jornada comum no varejo',
    advantages: 'Alta disponibilidade operacional',
    disadvantages: 'Maior desgaste do colaborador',
    cost: 'Médio',
    commonIn: 'Supermercados, restaurantes, fast-food'
  },
  '5x1': {
    name: '5x1',
    description: '5 dias de trabalho / 1 de folga',
    characteristics: 'Horários podem mudar semanalmente',
    advantages: 'Boa cobertura de operação',
    disadvantages: 'Menos previsibilidade para o funcionário',
    cost: 'Médio',
    commonIn: 'Cozinhas industriais, redes de varejo'
  },
  '4x2': {
    name: '4x2',
    description: '4 dias de trabalho / 2 de folga',
    characteristics: 'Turnos longos, ciclo curto',
    advantages: 'Mais folgas',
    disadvantages: 'Turnos desgastantes',
    cost: 'Médio',
    commonIn: 'Hotelaria, catering, food service contínuo'
  },
  '6x2': {
    name: '6x2',
    description: '6 dias de trabalho / 2 de folga',
    characteristics: 'Menos desgastante que 6x1',
    advantages: 'Equilíbrio entre operação e descanso',
    disadvantages: 'Pode não cobrir 100% da demanda',
    cost: 'Médio',
    commonIn: 'Padarias, restaurantes, supermercados'
  },
  '12x36': {
    name: '12x36',
    description: '12h trabalho / 36h descanso',
    characteristics: 'Cobertura integral em 2 turnos',
    advantages: 'Redução de deslocamentos',
    disadvantages: 'Cansaço físico intenso',
    cost: 'Alto',
    commonIn: 'Hotéis, hospitais, segurança de estoques'
  },
  '24x48': {
    name: '24x48',
    description: '24h trabalho / 48h descanso',
    characteristics: 'Turnos muito longos',
    advantages: 'Cobertura de plantões longos',
    disadvantages: 'Extremamente desgastante',
    cost: 'Alto',
    commonIn: 'Operações logísticas especiais'
  },
  'parcial': {
    name: 'Parcial 4h/6h',
    description: 'Jornada parcial',
    characteristics: 'Custo reduzido',
    advantages: 'Ideal para horários de pico',
    disadvantages: 'Necessidade de mais funcionários',
    cost: 'Baixo',
    commonIn: 'Fast-food, cafeterias, delivery'
  },
  'intermitente': {
    name: 'Intermitente',
    description: 'Trabalha quando convocado',
    characteristics: 'Alta flexibilidade',
    advantages: 'Custo só quando há demanda',
    disadvantages: 'Baixa previsibilidade de renda',
    cost: 'Baixo',
    commonIn: 'Eventos, sazonalidade, reforço em picos'
  },
  'movel': {
    name: 'Horário móvel',
    description: 'Entrada/saída variáveis',
    characteristics: 'Adaptação total à demanda',
    advantages: 'Ótima para eventos',
    disadvantages: 'Dificulta rotina do colaborador',
    cost: 'Baixo',
    commonIn: 'Buffets, eventos, restaurantes sazonais'
  },
  'alta_temporada': {
    name: 'Alta temporada',
    description: 'Carga ampliada em datas específicas',
    characteristics: 'Maximiza operação em picos',
    advantages: 'Garante faturamento',
    disadvantages: 'Pode gerar fadiga excessiva',
    cost: 'Alto',
    commonIn: 'Turismo, restaurantes em áreas sazonais'
  }
};

export default designTokens;
