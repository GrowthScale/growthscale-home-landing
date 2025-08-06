import React, { useState } from 'react';
import { Trophy, Star, Gift, Target, Award, Zap, Users, TrendingUp, Medal, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: React.ElementType;
  available: boolean;
  category: 'voucher' | 'benefit' | 'experience';
}

interface RankingUser {
  id: string;
  name: string;
  points: number;
  position: number;
  avatar: string;
}

const mockUserData = {
  currentPoints: 1250,
  totalPoints: 2100,
  currentLevel: 3,
  nextLevelPoints: 1500,
  weeklyPoints: 180,
  monthlyPoints: 720,
  position: 7
};

const achievements: Achievement[] = [
  {
    id: 'punctual-hero',
    title: 'Herói da Pontualidade',
    description: 'Cumpra 20 escalas consecutivas sem atraso',
    points: 200,
    icon: Target,
    completed: true,
    progress: 20,
    maxProgress: 20
  },
  {
    id: 'team-player',
    title: 'Jogador de Equipe',
    description: 'Aceite 10 trocas de turno solicitadas por colegas',
    points: 150,
    icon: Users,
    completed: false,
    progress: 7,
    maxProgress: 10
  },
  {
    id: 'efficiency-master',
    title: 'Mestre da Eficiência',
    description: 'Mantenha 100% de presença por 3 meses',
    points: 300,
    icon: TrendingUp,
    completed: false,
    progress: 2,
    maxProgress: 3
  },
  {
    id: 'feedback-champion',
    title: 'Campeão do Feedback',
    description: 'Receba 5 avaliações positivas de supervisores',
    points: 100,
    icon: Star,
    completed: true,
    progress: 5,
    maxProgress: 5
  },
  {
    id: 'overtime-warrior',
    title: 'Guerreiro das Horas Extras',
    description: 'Complete 15 horas extras em um mês',
    points: 180,
    icon: Zap,
    completed: false,
    progress: 12,
    maxProgress: 15
  },
  {
    id: 'attendance-legend',
    title: 'Lenda da Presença',
    description: 'Mantenha 100% de presença por 6 meses',
    points: 500,
    icon: Medal,
    completed: false,
    progress: 3,
    maxProgress: 6
  }
];

const rewards: Reward[] = [
  {
    id: 'voucher-50',
    title: 'Vale-presente R$ 50',
    description: 'Vale para usar em lojas parceiras',
    cost: 500,
    icon: Gift,
    available: true,
    category: 'voucher'
  },
  {
    id: 'extra-day-off',
    title: 'Dia de Folga Extra',
    description: 'Um dia adicional de descanso',
    cost: 800,
    icon: Award,
    available: true,
    category: 'benefit'
  },
  {
    id: 'voucher-100',
    title: 'Vale-presente R$ 100',
    description: 'Vale para usar em lojas parceiras',
    cost: 1000,
    icon: Gift,
    available: true,
    category: 'voucher'
  },
  {
    id: 'parking-spot',
    title: 'Vaga de Estacionamento VIP',
    description: 'Vaga reservada por 1 mês',
    cost: 600,
    icon: Star,
    available: false,
    category: 'benefit'
  },
  {
    id: 'team-lunch',
    title: 'Almoço com a Equipe',
    description: 'Almoço especial para você e sua equipe',
    cost: 1200,
    icon: Users,
    available: true,
    category: 'experience'
  },
  {
    id: 'voucher-200',
    title: 'Vale-presente R$ 200',
    description: 'Vale para usar em lojas parceiras',
    cost: 2000,
    icon: Crown,
    available: false,
    category: 'voucher'
  }
];

const topUsers: RankingUser[] = [
  { id: '1', name: 'Ana Silva', points: 2890, position: 1, avatar: 'AS' },
  { id: '2', name: 'Carlos Santos', points: 2654, position: 2, avatar: 'CS' },
  { id: '3', name: 'Maria Oliveira', points: 2432, position: 3, avatar: 'MO' },
  { id: '4', name: 'João Pereira', points: 2201, position: 4, avatar: 'JP' },
  { id: '5', name: 'Fernanda Costa', points: 1987, position: 5, avatar: 'FC' },
  { id: '6', name: 'Rafael Lima', points: 1765, position: 6, avatar: 'RL' },
  { id: '7', name: 'Você', points: 1250, position: 7, avatar: 'VC' },
  { id: '8', name: 'Paula Rodrigues', points: 1123, position: 8, avatar: 'PR' },
];

const Gamification = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const getRewardsByCategory = (category: string) => 
    rewards.filter(reward => reward.category === category);

  const getLevelProgress = () => {
    const currentLevelMin = (mockUserData.currentLevel - 1) * 500;
    const nextLevelMin = mockUserData.currentLevel * 500;
    const progress = ((mockUserData.currentPoints - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-roboto">
              Sistema de <span className="text-primary">Gamificação</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
              Descubra como a competição saudável e as recompensas podem impulsionar o desempenho da sua equipe
            </p>
          </div>

          {/* How It Works Section */}
          <div className="mb-12">
            <Card className="bg-gradient-primary text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold mb-4">Como Funciona</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Target className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ganhe Pontos</h3>
                    <p className="text-white/90">
                      Cumprindo escalas, sendo pontual, ajudando colegas e superando metas
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Desbloqueie Conquistas</h3>
                    <p className="text-white/90">
                      Complete desafios específicos e ganhe badges especiais
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Gift className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Troque por Recompensas</h3>
                    <p className="text-white/90">
                      Use seus pontos para obter benefícios, vouchers e experiências únicas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              <TabsTrigger value="rewards">Recompensas</TabsTrigger>
              <TabsTrigger value="ranking">Ranking</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* User Stats */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Seu Desempenho
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{mockUserData.currentPoints}</div>
                        <div className="text-sm text-muted-foreground">Pontos Atuais</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">#{mockUserData.position}</div>
                        <div className="text-sm text-muted-foreground">Posição</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent">{mockUserData.currentLevel}</div>
                        <div className="text-sm text-muted-foreground">Nível</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-success">{mockUserData.weeklyPoints}</div>
                        <div className="text-sm text-muted-foreground">Esta Semana</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progresso para o Nível {mockUserData.currentLevel + 1}</span>
                        <span className="text-sm text-muted-foreground">
                          {mockUserData.currentPoints}/{mockUserData.nextLevelPoints}
                        </span>
                      </div>
                      <Progress value={getLevelProgress()} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Conquistas Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.filter(a => a.completed).slice(0, 3).map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{achievement.title}</div>
                            <div className="text-xs text-muted-foreground">+{achievement.points} pontos</div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={achievement.id} className={`relative ${achievement.completed ? 'bg-primary/5 border-primary/20' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-lg ${achievement.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            <CardDescription>{achievement.description}</CardDescription>
                          </div>
                          {achievement.completed && (
                            <Badge variant="default" className="bg-primary">
                              <Trophy className="h-3 w-3 mr-1" />
                              Completo
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2"
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Recompensa</span>
                            <Badge variant="secondary">+{achievement.points} pontos</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Vouchers</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getRewardsByCategory('voucher').map((reward) => {
                      const Icon = reward.icon;
                      const canAfford = mockUserData.currentPoints >= reward.cost;
                      return (
                        <Card key={reward.id} className={`${!reward.available ? 'opacity-60' : ''}`}>
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="bg-accent/10 p-3 rounded-lg">
                                <Icon className="h-6 w-6 text-accent" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg">{reward.title}</CardTitle>
                                <CardDescription>{reward.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-bold text-primary">{reward.cost} pontos</div>
                              <Button 
                                size="sm"
                                disabled={!canAfford || !reward.available}
                                variant={canAfford && reward.available ? "default" : "outline"}
                              >
                                {!reward.available ? 'Indisponível' : !canAfford ? 'Pontos Insuficientes' : 'Resgatar'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Benefícios</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getRewardsByCategory('benefit').map((reward) => {
                      const Icon = reward.icon;
                      const canAfford = mockUserData.currentPoints >= reward.cost;
                      return (
                        <Card key={reward.id} className={`${!reward.available ? 'opacity-60' : ''}`}>
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="bg-secondary/10 p-3 rounded-lg">
                                <Icon className="h-6 w-6 text-secondary" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg">{reward.title}</CardTitle>
                                <CardDescription>{reward.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-bold text-primary">{reward.cost} pontos</div>
                              <Button 
                                size="sm"
                                disabled={!canAfford || !reward.available}
                                variant={canAfford && reward.available ? "default" : "outline"}
                              >
                                {!reward.available ? 'Indisponível' : !canAfford ? 'Pontos Insuficientes' : 'Resgatar'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Experiências</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getRewardsByCategory('experience').map((reward) => {
                      const Icon = reward.icon;
                      const canAfford = mockUserData.currentPoints >= reward.cost;
                      return (
                        <Card key={reward.id} className={`${!reward.available ? 'opacity-60' : ''}`}>
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-3 rounded-lg">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg">{reward.title}</CardTitle>
                                <CardDescription>{reward.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-bold text-primary">{reward.cost} pontos</div>
                              <Button 
                                size="sm"
                                disabled={!canAfford || !reward.available}
                                variant={canAfford && reward.available ? "default" : "outline"}
                              >
                                {!reward.available ? 'Indisponível' : !canAfford ? 'Pontos Insuficientes' : 'Resgatar'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Ranking Tab */}
            <TabsContent value="ranking" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Ranking Geral
                  </CardTitle>
                  <CardDescription>
                    Veja como você se compara com outros funcionários
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topUsers.map((user, index) => (
                      <div 
                        key={user.id} 
                        className={`flex items-center gap-4 p-4 rounded-lg ${
                          user.name === 'Você' ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index < 3 ? <Crown className="h-4 w-4" /> : user.position}
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.points} pontos</div>
                        </div>
                        {index < 3 && (
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gamification;