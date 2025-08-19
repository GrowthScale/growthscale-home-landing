// Templates de Copy da GrowthScale
// Plataforma de Gestão de Escalas com IA + CLT para Food Service

export const copyTemplates = {
  // Home (Marketing)
  home: {
    hero: {
      h1: "Crie escalas perfeitas em minutos e fique 100% dentro da lei",
      subtitle: "Reduza até 30% o custo de mão de obra automaticamente",
      ctaPrimary: "Gerar minha escala agora",
      ctaSecondary: "Ver demo de 3 minutos"
    },
    benefits: {
      title: "Por que escolher a GrowthScale?",
      items: [
        {
          title: "Economia Inteligente",
          description: "Reduza até 30% do custo de mão de obra com IA que otimiza automaticamente"
        },
        {
          title: "Segurança Jurídica",
          description: "Zero violações CLT. Nosso robô entende a lei melhor que qualquer advogado"
        },
        {
          title: "Simplicidade Total",
          description: "Crie escalas em 2 minutos. Simples como usar WhatsApp"
        },
        {
          title: "Confirmação Automática",
          description: "WhatsApp automático para confirmar presença. Sem mais ligações"
        }
      ]
    },
    proof: {
      title: "Usado por 500+ restaurantes no Brasil",
      stats: [
        "4.8/5 estrelas no Google",
        "Economia média de R$2.500/mês",
        "8h economizadas por semana"
      ]
    },
    aiSection: {
      title: "IA que entende a CLT",
      description: "Nosso robô entende a CLT melhor que qualquer advogado. Ele cria escalas que respeitam todos os direitos dos seus funcionários, automaticamente.",
      features: [
        "Detecta violações antes de publicar",
        "Sugere correções automáticas",
        "Calcula custos em tempo real",
        "Otimiza para máxima economia"
      ]
    }
  },

  // App (Dashboard)
  app: {
    emptyStates: {
      noSchedules: {
        title: "Nenhuma escala criada ainda",
        description: "Clique em 'Nova Escala' para começar",
        cta: "Criar primeira escala",
        subtext: "Sua primeira escala será criada em 2 minutos"
      },
      noEmployees: {
        title: "Nenhum funcionário cadastrado",
        description: "Adicione seus funcionários para começar a criar escalas",
        cta: "Adicionar funcionários"
      },
      noReports: {
        title: "Nenhum relatório disponível",
        description: "Crie algumas escalas para ver relatórios de economia e compliance",
        cta: "Criar escala"
      }
    },
    tooltips: {
      compliance: "Este ícone indica que a escala está dentro da lei",
      employee: "Clique para ver detalhes do funcionário",
      drag: "Arraste para reordenar turnos",
      edit: "Clique para editar esta escala",
      delete: "Clique para excluir esta escala"
    },
    toasts: {
      success: {
        schedulePublished: "Escala publicada com sucesso! ✅",
        whatsappSent: "WhatsApp enviado para {count} funcionários 📱",
        economyDetected: "Economia de R${amount} detectada 💰",
        employeeAdded: "Funcionário adicionado com sucesso 👤",
        settingsSaved: "Configurações salvas ✅"
      },
      warning: {
        cltViolation: "Violação CLT detectada. Clique para corrigir ⚠️",
        incompleteData: "Dados incompletos. Verifique e tente novamente ⚠️"
      },
      error: {
        generic: "Ops! Algo deu errado. Tente novamente em 30 segundos ❌",
        employeeNotFound: "Funcionário não encontrado. Verifique o nome ❌",
        scheduleConflict: "Conflito de horário detectado. Verifique os turnos ❌"
      }
    }
  },

  // WhatsApp Templates
  whatsapp: {
    confirmation: {
      template: "Olá {name}! Você está escalado para {day} das {startTime} às {endTime}. Confirma presença? Responda SIM ou NÃO.",
      variables: {
        name: "Nome do funcionário",
        day: "Dia da semana",
        startTime: "Horário de início",
        endTime: "Horário de fim"
      }
    },
    reminder: {
      template: "Lembrete: Seu turno começa em 2 horas. Confirma presença?",
      variables: {}
    },
    shiftSwap: {
      template: "Proposta de troca: {employeeName} quer trocar turno com você. {details}. Aceita? Responda SIM ou NÃO.",
      variables: {
        employeeName: "Nome do funcionário",
        details: "Detalhes da troca"
      }
    },
    schedulePublished: {
      template: "Nova escala publicada! Confira seus horários da semana: {scheduleLink}",
      variables: {
        scheduleLink: "Link para visualizar a escala"
      }
    },
    cltAlert: {
      template: "⚠️ Alerta CLT: Sua escala tem {violationCount} violação(ões). Clique para corrigir: {correctionLink}",
      variables: {
        violationCount: "Número de violações",
        correctionLink: "Link para correção"
      }
    }
  },

  // Mensagens de Erro
  errors: {
    generic: "Ops! Algo deu errado. Tente novamente em 30 segundos",
    employeeNotFound: "Funcionário não encontrado. Verifique o nome e tente novamente",
    scheduleConflict: "Escala com conflito CLT. Clique para ver detalhes e corrigir",
    invalidData: "Dados inválidos. Verifique as informações e tente novamente",
    networkError: "Erro de conexão. Verifique sua internet e tente novamente",
    permissionDenied: "Permissão negada. Entre em contato com o administrador",
    validationError: "Dados incorretos. Verifique os campos destacados"
  },

  // Relatórios
  reports: {
    economy: {
      title: "Relatório de Economia",
      subtitle: "Veja quanto você economizou este mês",
      metrics: {
        totalSaved: "Total economizado",
        hoursSaved: "Horas economizadas",
        percentageReduction: "Redução percentual",
        vsLastMonth: "vs. mês anterior"
      },
      empty: "Nenhuma economia registrada ainda. Crie escalas para começar a economizar."
    },
    clt: {
      title: "Relatório de Compliance CLT",
      subtitle: "Riscos CLT detectados e corrigidos",
      metrics: {
        violations: "Violações detectadas",
        corrected: "Violações corrigidas",
        riskLevel: "Nível de risco",
        complianceRate: "Taxa de compliance"
      },
      empty: "Parabéns! Nenhuma violação CLT detectada."
    }
  },

  // Onboarding
  onboarding: {
    steps: {
      company: {
        title: "Cadastro da Empresa",
        description: "Informações básicas para começar",
        cta: "Continuar"
      },
      employees: {
        title: "Importar Funcionários",
        description: "Adicione sua equipe de forma rápida",
        cta: "Importar CSV ou Adicionar Manualmente"
      },
      shifts: {
        title: "Configurar Turnos",
        description: "Defina os horários de trabalho",
        cta: "Configurar Turnos"
      },
      firstSchedule: {
        title: "Gerar Primeira Escala",
        description: "Crie sua primeira escala otimizada",
        cta: "Gerar Escala Inteligente"
      }
    },
    messages: {
      welcome: "Bem-vindo à GrowthScale! Vamos configurar sua conta em 5 minutos.",
      progress: "Passo {current} de {total}",
      success: "Configuração concluída! Sua primeira escala está pronta."
    }
  },

  // Componentes UI
  ui: {
    buttons: {
      save: "Salvar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Excluir",
      publish: "Publicar",
      generate: "Gerar",
      import: "Importar",
      export: "Exportar",
      confirm: "Confirmar",
      back: "Voltar",
      next: "Próximo",
      finish: "Finalizar"
    },
    status: {
      published: "Publicada",
      pending: "Pendente",
      draft: "Rascunho",
      archived: "Arquivada",
      confirmed: "Confirmada",
      unconfirmed: "Não confirmada",
      absent: "Ausente"
    },
    filters: {
      all: "Todos",
      thisWeek: "Esta semana",
      nextWeek: "Próxima semana",
      thisMonth: "Este mês",
      lastMonth: "Mês passado",
      published: "Publicadas",
      pending: "Pendentes"
    },
    placeholders: {
      search: "Buscar funcionários, escalas...",
      email: "seu@email.com",
      name: "Nome completo",
      phone: "(11) 99999-9999",
      company: "Nome da empresa"
    }
  },

  // Legal
  legal: {
    terms: {
      title: "Termos de Uso",
      summary: "Resumo dos termos de uso da GrowthScale",
      keyPoints: [
        "Uso da plataforma para gestão de escalas",
        "Responsabilidade pelos dados inseridos",
        "Limitação de responsabilidade",
        "Direitos e obrigações das partes"
      ]
    },
    privacy: {
      title: "Política de Privacidade",
      summary: "Como protegemos seus dados",
      keyPoints: [
        "Coleta e uso de dados pessoais",
        "Compartilhamento de informações",
        "Segurança e proteção",
        "Seus direitos como usuário"
      ]
    }
  }
};

// Templates específicos para diferentes tipos de escala
export const scheduleTypeCopy = {
  '5x2': {
    name: "5x2 - Tradicional",
    description: "5 dias de trabalho, 2 de folga",
    recommendation: "Ideal para restaurantes com demanda estável",
    benefits: ["Menor fadiga", "Fácil gestão", "Previsibilidade"]
  },
  '6x1': {
    name: "6x1 - Varejo",
    description: "6 dias de trabalho, 1 de folga",
    recommendation: "Perfeito para restaurantes com alta demanda",
    benefits: ["Alta disponibilidade", "Cobertura total", "Flexibilidade"]
  },
  '4x2': {
    name: "4x2 - Intensivo",
    description: "4 dias de trabalho, 2 de folga",
    recommendation: "Para restaurantes com turnos longos",
    benefits: ["Mais folgas", "Turnos concentrados", "Eficiência"]
  },
  '12x36': {
    name: "12x36 - Plantão",
    description: "12h trabalho, 36h descanso",
    recommendation: "Para hotéis e restaurantes 24h",
    benefits: ["Cobertura integral", "Menos deslocamentos", "Economia"]
  }
};

// Mensagens de sucesso específicas
export const successMessages = {
  schedule: {
    created: "Escala criada com sucesso!",
    updated: "Escala atualizada com sucesso!",
    published: "Escala publicada e enviada via WhatsApp!",
    deleted: "Escala excluída com sucesso!"
  },
  employee: {
    added: "Funcionário adicionado com sucesso!",
    updated: "Dados do funcionário atualizados!",
    deleted: "Funcionário removido da equipe!",
    imported: "{count} funcionários importados com sucesso!"
  },
  settings: {
    saved: "Configurações salvas com sucesso!",
    updated: "Preferências atualizadas!"
  }
};

export default copyTemplates;
