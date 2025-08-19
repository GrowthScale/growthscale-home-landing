// =====================================================
// GAMIFICAÇÃO - GROWTHSCALE
// Sistema de pontos, badges e achievements
// =====================================================

import { log } from './logger';

// Tipos de gamificação
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: 'onboarding' | 'productivity' | 'compliance' | 'social' | 'mastery';
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  achievements: Achievement[];
  badges: Badge[];
  streak: number;
  lastActivity: Date;
}

// =====================================================
// ACHIEVEMENTS PRÉ-DEFINIDOS
// =====================================================

export const ACHIEVEMENTS: Achievement[] = [
  // Onboarding
  {
    id: 'first_login',
    name: 'Primeiro Acesso',
    description: 'Realizou o primeiro login na plataforma',
    icon: '🎉',
    points: 10,
    category: 'onboarding',
    unlocked: false
  },
  {
    id: 'company_setup',
    name: 'Empresa Configurada',
    description: 'Completou a configuração inicial da empresa',
    icon: '🏢',
    points: 25,
    category: 'onboarding',
    unlocked: false
  },
  {
    id: 'first_employee',
    name: 'Primeiro Funcionário',
    description: 'Cadastrou o primeiro funcionário',
    icon: '👤',
    points: 15,
    category: 'onboarding',
    unlocked: false
  },
  
  // Productivity
  {
    id: 'first_schedule',
    name: 'Primeira Escala',
    description: 'Criou a primeira escala de trabalho',
    icon: '📅',
    points: 30,
    category: 'productivity',
    unlocked: false
  },
  {
    id: 'schedule_master',
    name: 'Mestre das Escalas',
    description: 'Criou 10 escalas',
    icon: '🎯',
    points: 100,
    category: 'productivity',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'efficiency_expert',
    name: 'Especialista em Eficiência',
    description: 'Economizou 50 horas em um mês',
    icon: '⚡',
    points: 75,
    category: 'productivity',
    unlocked: false,
    progress: 0,
    maxProgress: 50
  },
  
  // Compliance
  {
    id: 'clt_compliant',
    name: 'Compliance CLT',
    description: 'Manteve 100% de compliance por 30 dias',
    icon: '✅',
    points: 150,
    category: 'compliance',
    unlocked: false
  },
  {
    id: 'overtime_reducer',
    name: 'Redutor de Horas Extras',
    description: 'Reduziu horas extras em 80%',
    icon: '💰',
    points: 200,
    category: 'compliance',
    unlocked: false,
    progress: 0,
    maxProgress: 80
  },
  
  // Social
  {
    id: 'team_player',
    name: 'Jogador de Equipe',
    description: 'Enviou 50 mensagens via WhatsApp',
    icon: '💬',
    points: 50,
    category: 'social',
    unlocked: false,
    progress: 0,
    maxProgress: 50
  },
  {
    id: 'communication_master',
    name: 'Mestre da Comunicação',
    description: 'Manteve 100% de confirmações por 7 dias',
    icon: '📱',
    points: 100,
    category: 'social',
    unlocked: false
  },
  
  // Mastery
  {
    id: 'power_user',
    name: 'Usuário Poderoso',
    description: 'Usou a plataforma por 30 dias consecutivos',
    icon: '🔥',
    points: 300,
    category: 'mastery',
    unlocked: false,
    progress: 0,
    maxProgress: 30
  },
  {
    id: 'growth_scale_master',
    name: 'Mestre GrowthScale',
    description: 'Desbloqueou todos os achievements',
    icon: '👑',
    points: 500,
    category: 'mastery',
    unlocked: false
  }
];

// =====================================================
// BADGES PRÉ-DEFINIDOS
// =====================================================

export const BADGES: Badge[] = [
  {
    id: 'newcomer',
    name: 'Novato',
    description: 'Primeiros passos na plataforma',
    icon: '🌱',
    tier: 'bronze',
    unlocked: false
  },
  {
    id: 'scheduler',
    name: 'Agendador',
    description: 'Criou 5 escalas',
    icon: '📋',
    tier: 'bronze',
    unlocked: false
  },
  {
    id: 'efficiency_leader',
    name: 'Líder em Eficiência',
    description: 'Economizou 100 horas',
    icon: '🚀',
    tier: 'silver',
    unlocked: false
  },
  {
    id: 'compliance_champion',
    name: 'Campeão do Compliance',
    description: '100% de compliance por 60 dias',
    icon: '🏆',
    tier: 'gold',
    unlocked: false
  },
  {
    id: 'growth_scale_legend',
    name: 'Lenda GrowthScale',
    description: 'Máximo nível de domínio',
    icon: '💎',
    tier: 'platinum',
    unlocked: false
  }
];

// =====================================================
// SISTEMA DE PONTOS E NÍVEIS
// =====================================================

export function calculateLevel(points: number): number {
  // Fórmula: level = floor(sqrt(points / 10)) + 1
  return Math.floor(Math.sqrt(points / 10)) + 1;
}

export function calculatePointsToNextLevel(points: number): number {
  const currentLevel = calculateLevel(points);
  const nextLevelPoints = Math.pow(currentLevel, 2) * 10;
  return nextLevelPoints - points;
}

export function calculateProgressToNextLevel(points: number): number {
  const currentLevel = calculateLevel(points);
  const currentLevelPoints = Math.pow(currentLevel - 1, 2) * 10;
  const nextLevelPoints = Math.pow(currentLevel, 2) * 10;
  const levelPoints = nextLevelPoints - currentLevelPoints;
  const userLevelPoints = points - currentLevelPoints;
  
  return Math.min((userLevelPoints / levelPoints) * 100, 100);
}

// =====================================================
// GESTÃO DE ACHIEVEMENTS
// =====================================================

export class GamificationManager {
  private userStats: UserStats;
  
  constructor(initialStats?: Partial<UserStats>) {
    this.userStats = {
      totalPoints: 0,
      level: 1,
      achievements: [...ACHIEVEMENTS],
      badges: [...BADGES],
      streak: 0,
      lastActivity: new Date(),
      ...initialStats
    };
  }
  
  // Verificar e desbloquear achievements
  checkAchievements(action: string, data?: Record<string, unknown>): Achievement[] {
    const newlyUnlocked: Achievement[] = [];
    
    this.userStats.achievements.forEach(achievement => {
      if (!achievement.unlocked && this.shouldUnlockAchievement(achievement, action, data)) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
        this.userStats.totalPoints += achievement.points;
        newlyUnlocked.push(achievement);
        
        log.info('[GAMIFICATION] Achievement unlocked', {
          achievement: achievement.name,
          points: achievement.points,
          totalPoints: this.userStats.totalPoints
        });
      }
    });
    
    // Atualizar nível
    this.userStats.level = calculateLevel(this.userStats.totalPoints);
    
    // Verificar badges
    this.checkBadges();
    
    return newlyUnlocked;
  }
  
  // Verificar se achievement deve ser desbloqueado
  private shouldUnlockAchievement(achievement: Achievement, action: string, data?: Record<string, unknown>): boolean {
    switch (achievement.id) {
      case 'first_login':
        return action === 'login';
        
      case 'company_setup':
        return action === 'company_created';
        
      case 'first_employee':
        return action === 'employee_added';
        
      case 'first_schedule':
        return action === 'schedule_created';
        
      case 'schedule_master':
        if (action === 'schedule_created' && data && typeof data === 'object' && 'totalSchedules' in data) {
          const totalSchedules = data.totalSchedules as number;
          achievement.progress = totalSchedules;
          return totalSchedules >= 10;
        }
        return false;
        
              case 'efficiency_expert': {
          if (action === 'hours_saved' && data && typeof data === 'object' && 'hoursSaved' in data) {
            const hoursSaved = data.hoursSaved as number;
            achievement.progress = hoursSaved;
            return hoursSaved >= 50;
          }
          return false;
        }
        
      case 'clt_compliant':
        return action === 'compliance_check' && data?.compliant === true;
        
              case 'overtime_reducer': {
          if (action === 'overtime_reduction' && data && typeof data === 'object' && 'reductionPercentage' in data) {
            const reductionPercentage = data.reductionPercentage as number;
            achievement.progress = reductionPercentage;
            return reductionPercentage >= 80;
          }
          return false;
        }
        
              case 'team_player': {
          if (action === 'whatsapp_sent' && data && typeof data === 'object' && 'totalMessages' in data) {
            const totalMessages = data.totalMessages as number;
            achievement.progress = totalMessages;
            return totalMessages >= 50;
          }
          return false;
        }
        
      case 'communication_master':
        return action === 'confirmation_rate' && data?.rate === 100;
        
      case 'power_user':
        if (action === 'daily_login') {
          achievement.progress = (achievement.progress || 0) + 1;
          return (achievement.progress || 0) >= 30;
        }
        return false;
        
      case 'growth_scale_master': {
        const unlockedCount = this.userStats.achievements.filter(a => a.unlocked).length;
        return unlockedCount >= ACHIEVEMENTS.length - 1; // -1 para não contar ele mesmo
      }
        
      default:
        return false;
    }
  }
  
  // Verificar badges
  private checkBadges(): void {
    this.userStats.badges.forEach(badge => {
      if (!badge.unlocked && this.shouldUnlockBadge(badge)) {
        badge.unlocked = true;
        badge.unlockedAt = new Date();
        
        log.info('[GAMIFICATION] Badge unlocked', {
          badge: badge.name,
          tier: badge.tier
        });
      }
    });
  }
  
  // Verificar se badge deve ser desbloqueado
  private shouldUnlockBadge(badge: Badge): boolean {
    switch (badge.id) {
      case 'newcomer':
        return this.userStats.totalPoints >= 50;
        
      case 'scheduler': {
        const scheduleAchievement = this.userStats.achievements.find(a => a.id === 'schedule_master');
        return scheduleAchievement?.progress ? scheduleAchievement.progress >= 5 : false;
      }
        
      case 'efficiency_leader': {
        const efficiencyAchievement = this.userStats.achievements.find(a => a.id === 'efficiency_expert');
        return efficiencyAchievement?.progress ? efficiencyAchievement.progress >= 100 : false;
      }
        
      case 'compliance_champion':
        return this.userStats.achievements.find(a => a.id === 'clt_compliant')?.unlocked || false;
        
      case 'growth_scale_legend':
        return this.userStats.level >= 10;
        
      default:
        return false;
    }
  }
  
  // Atualizar streak
  updateStreak(): void {
    const now = new Date();
    const lastActivity = this.userStats.lastActivity;
    const daysDiff = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      this.userStats.streak++;
    } else if (daysDiff > 1) {
      this.userStats.streak = 1;
    }
    
    this.userStats.lastActivity = now;
  }
  
  // Obter estatísticas do usuário
  getUserStats(): UserStats {
    return { ...this.userStats };
  }
  
  // Obter achievements desbloqueados
  getUnlockedAchievements(): Achievement[] {
    return this.userStats.achievements.filter(a => a.unlocked);
  }
  
  // Obter badges desbloqueados
  getUnlockedBadges(): Badge[] {
    return this.userStats.badges.filter(b => b.unlocked);
  }
  
  // Obter progresso para próximo nível
  getLevelProgress(): { current: number; next: number; progress: number } {
    return {
      current: this.userStats.level,
      next: this.userStats.level + 1,
      progress: calculateProgressToNextLevel(this.userStats.totalPoints)
    };
  }
  
  // Obter ranking de achievements por categoria
  getAchievementsByCategory(): Record<string, Achievement[]> {
    return this.userStats.achievements.reduce((acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = [];
      }
      acc[achievement.category].push(achievement);
      return acc;
    }, {} as Record<string, Achievement[]>);
  }
}

// =====================================================
// HOOKS PARA REACT
// =====================================================

export function useGamification() {
  // Implementar hook React para gamificação
  // Isso seria integrado com o contexto da aplicação
  
  return {
    checkAchievements: (action: string, data?: Record<string, unknown>) => {
      // Implementar verificação de achievements
    },
    getUserStats: () => {
      // Implementar obtenção de estatísticas
    },
    getUnlockedAchievements: () => {
      // Implementar achievements desbloqueados
    }
  };
}

// =====================================================
// UTILITÁRIOS
// =====================================================

// Gerar mensagem de achievement
export function generateAchievementMessage(achievement: Achievement): string {
  const messages = {
    onboarding: `🎉 Parabéns! Você desbloqueou "${achievement.name}" e ganhou ${achievement.points} pontos!`,
    productivity: `⚡ Incrível! "${achievement.name}" desbloqueado! +${achievement.points} pontos!`,
    compliance: `✅ Excelente! "${achievement.name}" conquistado! +${achievement.points} pontos!`,
    social: `💬 Ótimo trabalho! "${achievement.name}" desbloqueado! +${achievement.points} pontos!`,
    mastery: `👑 Lendário! "${achievement.name}" conquistado! +${achievement.points} pontos!`
  };
  
  return messages[achievement.category] || `🎯 Achievement desbloqueado: ${achievement.name}!`;
}

// Calcular pontos por ação
export function getPointsForAction(action: string): number {
  const pointsMap: Record<string, number> = {
    login: 1,
    schedule_created: 5,
    employee_added: 3,
    whatsapp_sent: 2,
    compliance_check: 10,
    hours_saved: 1, // 1 ponto por hora economizada
    daily_streak: 5 // bônus por streak
  };
  
  return pointsMap[action] || 0;
}
