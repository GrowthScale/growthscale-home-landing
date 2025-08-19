// =====================================================
// PORTUGUÊS BRASIL - GROWTHSCALE
// Tradução completa em português brasileiro
// =====================================================

export const ptBR = {
  // =====================================================
  // NAVEGAÇÃO E LAYOUT
  // =====================================================
  
  navigation: {
    dashboard: 'Dashboard',
    schedules: 'Escalas',
    employees: 'Funcionários',
    companies: 'Empresas',
    settings: 'Configurações',
    profile: 'Perfil',
    logout: 'Sair',
    help: 'Ajuda',
    support: 'Suporte'
  },

  // =====================================================
  // DASHBOARD
  // =====================================================
  
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Visão geral do seu negócio',
    welcome: 'Bem-vindo de volta, {name}!',
    
    kpis: {
      totalEmployees: 'Total de Funcionários',
      activeEmployees: 'Funcionários Ativos',
      monthlyCosts: 'Custos Mensais',
      monthlyRevenue: 'Receita Mensal',
      profitMargin: 'Margem de Lucro',
      complianceScore: 'Score de Compliance',
      scheduleEfficiency: 'Eficiência das Escalas',
      overtimeHours: 'Horas Extras'
    },
    
    charts: {
      weeklyHours: 'Horas Trabalhadas por Semana',
      departmentDistribution: 'Distribuição por Departamento',
      monthlyCosts: 'Custos vs Receita',
      employeePerformance: 'Performance por Funcionário',
      complianceTrends: 'Tendências de Compliance',
      scheduleUtilization: 'Utilização das Escalas'
    },
    
    recentActivity: {
      title: 'Atividade Recente',
      employeeAdded: 'Funcionário adicionado',
      scheduleCreated: 'Escala criada',
      complianceViolation: 'Violação de compliance detectada',
      costOptimization: 'Otimização de custos aplicada'
    }
  },

  // =====================================================
  // FUNCIONÁRIOS
  // =====================================================
  
  employees: {
    title: 'Funcionários',
    subtitle: 'Gerencie sua equipe',
    addEmployee: 'Adicionar Funcionário',
    editEmployee: 'Editar Funcionário',
    deleteEmployee: 'Excluir Funcionário',
    
    fields: {
      name: 'Nome',
      email: 'E-mail',
      phone: 'Telefone',
      cpf: 'CPF',
      position: 'Cargo',
      department: 'Departamento',
      hireDate: 'Data de Contratação',
      salary: 'Salário',
      status: 'Status',
      manager: 'Gerente',
      emergencyContact: 'Contato de Emergência'
    },
    
    status: {
      active: 'Ativo',
      inactive: 'Inativo',
      onLeave: 'Em Licença',
      terminated: 'Demitido'
    },
    
    departments: {
      kitchen: 'Cozinha',
      service: 'Atendimento',
      cleaning: 'Limpeza',
      administrative: 'Administrativo',
      management: 'Gerência'
    },
    
    positions: {
      chef: 'Chef',
      cook: 'Cozinheiro',
      waiter: 'Garçom',
      cashier: 'Caixa',
      cleaner: 'Auxiliar de Limpeza',
      manager: 'Gerente',
      supervisor: 'Supervisor'
    },
    
    actions: {
      view: 'Visualizar',
      edit: 'Editar',
      delete: 'Excluir',
      activate: 'Ativar',
      deactivate: 'Desativar',
      export: 'Exportar',
      import: 'Importar'
    },
    
    messages: {
      created: 'Funcionário criado com sucesso!',
      updated: 'Funcionário atualizado com sucesso!',
      deleted: 'Funcionário excluído com sucesso!',
      activated: 'Funcionário ativado com sucesso!',
      deactivated: 'Funcionário desativado com sucesso!',
      confirmDelete: 'Tem certeza que deseja excluir este funcionário?',
      bulkAction: '{count} funcionários selecionados'
    }
  },

  // =====================================================
  // ESCALAS
  // =====================================================
  
  schedules: {
    title: 'Escalas',
    subtitle: 'Gerencie os horários da equipe',
    createSchedule: 'Criar Escala',
    editSchedule: 'Editar Escala',
    deleteSchedule: 'Excluir Escala',
    
    fields: {
      employee: 'Funcionário',
      date: 'Data',
      startTime: 'Horário de Início',
      endTime: 'Horário de Fim',
      hours: 'Horas',
      department: 'Departamento',
      status: 'Status',
      notes: 'Observações',
      weekStart: 'Início da Semana',
      weekEnd: 'Fim da Semana'
    },
    
    status: {
      draft: 'Rascunho',
      published: 'Publicada',
      approved: 'Aprovada',
      rejected: 'Rejeitada',
      completed: 'Concluída'
    },
    
    actions: {
      publish: 'Publicar',
      approve: 'Aprovar',
      reject: 'Rejeitar',
      duplicate: 'Duplicar',
      export: 'Exportar',
      print: 'Imprimir',
      sendNotification: 'Enviar Notificação'
    },
    
    validation: {
      overlappingShifts: 'Horários sobrepostos detectados',
      maxHoursExceeded: 'Limite de horas excedido',
      restPeriodViolation: 'Período de descanso insuficiente',
      overtimeLimit: 'Limite de horas extras excedido'
    },
    
    messages: {
      created: 'Escala criada com sucesso!',
      updated: 'Escala atualizada com sucesso!',
      deleted: 'Escala excluída com sucesso!',
      published: 'Escala publicada com sucesso!',
      approved: 'Escala aprovada com sucesso!',
      rejected: 'Escala rejeitada com sucesso!',
      notificationSent: 'Notificação enviada com sucesso!'
    }
  },

  // =====================================================
  // COMPLIANCE
  // =====================================================
  
  compliance: {
    title: 'Compliance',
    subtitle: 'Monitore a conformidade trabalhista',
    
    violations: {
      title: 'Violações de Compliance',
      overtime: 'Horas Extras',
      restPeriod: 'Período de Descanso',
      mealBreak: 'Intervalo para Refeição',
      weeklyLimit: 'Limite Semanal',
      consecutiveDays: 'Dias Consecutivos'
    },
    
    severity: {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      critical: 'Crítica'
    },
    
    status: {
      open: 'Aberta',
      inProgress: 'Em Análise',
      resolved: 'Resolvida',
      closed: 'Fechada'
    },
    
    actions: {
      acknowledge: 'Reconhecer',
      resolve: 'Resolver',
      escalate: 'Escalar',
      ignore: 'Ignorar'
    },
    
    reports: {
      monthly: 'Relatório Mensal',
      quarterly: 'Relatório Trimestral',
      annual: 'Relatório Anual',
      custom: 'Relatório Personalizado'
    }
  },

  // =====================================================
  // CUSTOS
  // =====================================================
  
  costs: {
    title: 'Custos',
    subtitle: 'Análise e otimização de custos',
    
    categories: {
      personnel: 'Pessoal',
      overtime: 'Horas Extras',
      benefits: 'Benefícios',
      taxes: 'Impostos',
      training: 'Treinamento',
      equipment: 'Equipamentos'
    },
    
    metrics: {
      totalCost: 'Custo Total',
      costPerEmployee: 'Custo por Funcionário',
      costPerHour: 'Custo por Hora',
      laborCostRatio: 'Relação Custo-Trabalho',
      profitMargin: 'Margem de Lucro',
      efficiency: 'Eficiência'
    },
    
    optimization: {
      title: 'Otimização de Custos',
      suggestions: 'Sugestões de Otimização',
      savings: 'Economia Potencial',
      implementation: 'Implementação'
    }
  },

  // =====================================================
  // CONFIGURAÇÕES
  // =====================================================
  
  settings: {
    title: 'Configurações',
    subtitle: 'Configure sua conta e preferências',
    
    profile: {
      title: 'Perfil',
      personalInfo: 'Informações Pessoais',
      preferences: 'Preferências',
      notifications: 'Notificações',
      security: 'Segurança'
    },
    
    company: {
      title: 'Empresa',
      general: 'Geral',
      locations: 'Localizações',
      departments: 'Departamentos',
      positions: 'Cargos',
      policies: 'Políticas'
    },
    
    system: {
      title: 'Sistema',
      integrations: 'Integrações',
      api: 'API',
      backup: 'Backup',
      maintenance: 'Manutenção'
    },
    
    billing: {
      title: 'Cobrança',
      plan: 'Plano',
      usage: 'Uso',
      invoices: 'Faturas',
      payment: 'Pagamento'
    }
  },

  // =====================================================
  // NOTIFICAÇÕES
  // =====================================================
  
  notifications: {
    title: 'Notificações',
    markAllRead: 'Marcar todas como lidas',
    clearAll: 'Limpar todas',
    
    types: {
      info: 'Informação',
      success: 'Sucesso',
      warning: 'Aviso',
      error: 'Erro',
      compliance: 'Compliance',
      schedule: 'Escala',
      employee: 'Funcionário'
    },
    
    messages: {
      schedulePublished: 'Nova escala publicada',
      complianceViolation: 'Violação de compliance detectada',
      employeeAdded: 'Novo funcionário adicionado',
      costOptimization: 'Otimização de custos disponível',
      systemMaintenance: 'Manutenção do sistema programada'
    }
  },

  // =====================================================
  // FORMULÁRIOS E VALIDAÇÃO
  // =====================================================
  
  forms: {
    required: 'Campo obrigatório',
    invalidEmail: 'E-mail inválido',
    invalidPhone: 'Telefone inválido',
    invalidCPF: 'CPF inválido',
    invalidCNPJ: 'CNPJ inválido',
    minLength: 'Mínimo de {min} caracteres',
    maxLength: 'Máximo de {max} caracteres',
    passwordMismatch: 'Senhas não coincidem',
    invalidDate: 'Data inválida',
    invalidTime: 'Horário inválido',
    
    actions: {
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      confirm: 'Confirmar',
      submit: 'Enviar',
      reset: 'Limpar',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      import: 'Importar'
    }
  },

  // =====================================================
  // MENSAGENS DE ERRO
  // =====================================================
  
  errors: {
    general: 'Ocorreu um erro inesperado',
    network: 'Erro de conexão',
    unauthorized: 'Acesso não autorizado',
    forbidden: 'Acesso negado',
    notFound: 'Recurso não encontrado',
    validation: 'Dados inválidos',
    server: 'Erro do servidor',
    timeout: 'Tempo limite excedido',
    
    auth: {
      invalidCredentials: 'Credenciais inválidas',
      sessionExpired: 'Sessão expirada',
      accountLocked: 'Conta bloqueada',
      tooManyAttempts: 'Muitas tentativas de login'
    },
    
    data: {
      loadFailed: 'Falha ao carregar dados',
      saveFailed: 'Falha ao salvar dados',
      deleteFailed: 'Falha ao excluir dados',
      updateFailed: 'Falha ao atualizar dados'
    }
  },

  // =====================================================
  // MENSAGENS DE SUCESSO
  // =====================================================
  
  success: {
    saved: 'Salvo com sucesso!',
    deleted: 'Excluído com sucesso!',
    updated: 'Atualizado com sucesso!',
    created: 'Criado com sucesso!',
    sent: 'Enviado com sucesso!',
    exported: 'Exportado com sucesso!',
    imported: 'Importado com sucesso!'
  },

  // =====================================================
  // TEMPO E DATAS
  // =====================================================
  
  time: {
    today: 'Hoje',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    thisWeek: 'Esta semana',
    lastWeek: 'Semana passada',
    nextWeek: 'Próxima semana',
    thisMonth: 'Este mês',
    lastMonth: 'Mês passado',
    nextMonth: 'Próximo mês',
    
    months: {
      january: 'Janeiro',
      february: 'Fevereiro',
      march: 'Março',
      april: 'Abril',
      may: 'Maio',
      june: 'Junho',
      july: 'Julho',
      august: 'Agosto',
      september: 'Setembro',
      october: 'Outubro',
      november: 'Novembro',
      december: 'Dezembro'
    },
    
    weekdays: {
      monday: 'Segunda-feira',
      tuesday: 'Terça-feira',
      wednesday: 'Quarta-feira',
      thursday: 'Quinta-feira',
      friday: 'Sexta-feira',
      saturday: 'Sábado',
      sunday: 'Domingo'
    },
    
    weekdaysShort: {
      monday: 'Seg',
      tuesday: 'Ter',
      wednesday: 'Qua',
      thursday: 'Qui',
      friday: 'Sex',
      saturday: 'Sáb',
      sunday: 'Dom'
    }
  },

  // =====================================================
  // PWA E OFFLINE
  // =====================================================
  
  pwa: {
    install: 'Instalar App',
    update: 'Atualização Disponível',
    offline: 'Você está offline',
    online: 'Você está online novamente',
    
    messages: {
      installPrompt: 'Instale o GrowthScale para uma melhor experiência',
      updateAvailable: 'Uma nova versão está disponível',
      offlineMessage: 'Algumas funcionalidades podem não estar disponíveis offline',
      syncComplete: 'Sincronização concluída'
    }
  },

  // =====================================================
  // AJUDA E SUPORTE
  // =====================================================
  
  help: {
    title: 'Ajuda e Suporte',
    documentation: 'Documentação',
    tutorials: 'Tutoriais',
    faq: 'Perguntas Frequentes',
    contact: 'Contato',
    feedback: 'Feedback',
    
    topics: {
      gettingStarted: 'Primeiros Passos',
      employees: 'Gerenciando Funcionários',
      schedules: 'Criando Escalas',
      compliance: 'Compliance Trabalhista',
      costs: 'Análise de Custos',
      integrations: 'Integrações'
    }
  }
};
