// =====================================================
// CHARTS COMPONENTS - GROWTHSCALE
// Gráficos interativos com Chart.js
// =====================================================

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import { useTheme } from '@/contexts/ThemeContext';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

// Configuração global do Chart.js usando variáveis CSS do Design System
ChartJS.defaults.color = 'hsl(var(--muted-foreground))';
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif';

// Cores do Design System para uso nos gráficos
const getThemeColors = (isDark: boolean) => ({
  // Cores de texto
  foreground: 'hsl(var(--foreground))',
  mutedForeground: 'hsl(var(--muted-foreground))',
  
  // Cores de fundo
  background: 'hsl(var(--background))',
  card: 'hsl(var(--card))',
  cardForeground: 'hsl(var(--card-foreground))',
  
  // Cores primárias
      primary: 'hsl(var(--primary))',
    primaryLight: 'hsl(var(--primary))',
    primaryDark: 'hsl(var(--primary))',
  
  // Cores secundárias
      secondary: 'hsl(var(--accent))',
    secondaryLight: 'hsl(var(--accent))',
    secondaryDark: 'hsl(var(--accent))',
  
  // Cores de feedback
      success: 'hsl(var(--accent))',
    warning: 'hsl(var(--accent))',
    destructive: 'hsl(var(--destructive))',
    info: 'hsl(var(--primary))',
  
  // Cores neutras
  border: 'hsl(var(--border))',
  muted: 'hsl(var(--muted))',
  
  // Cores específicas para gráficos
  chartColors: [
    'hsl(var(--primary))',        // Azul principal
    'hsl(var(--accent))',         // Laranja
    'hsl(var(--accent))',         // Verde/Sucesso
    'hsl(var(--accent))',         // Amarelo/Aviso
    'hsl(var(--destructive))',    // Vermelho
    'hsl(var(--primary))',        // Azul info
    'hsl(var(--primary))',        // Azul claro
    'hsl(var(--accent))',         // Laranja claro
  ]
});

interface ChartProps {
  data: ChartData<'line' | 'bar' | 'doughnut' | 'radar' | 'polarArea'>;
  options?: ChartOptions<'line' | 'bar' | 'doughnut' | 'radar' | 'polarArea'>;
  className?: string;
  height?: number;
}

// Gráfico de linha
export const LineChart: React.FC<ChartProps> = ({ data, options, className, height = 300 }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: themeColors.foreground,
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: themeColors.card,
        titleColor: themeColors.cardForeground,
        bodyColor: themeColors.mutedForeground,
        borderColor: themeColors.border,
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: themeColors.border
        },
        ticks: {
          color: themeColors.mutedForeground
        }
      },
      y: {
        grid: {
          color: themeColors.border
        },
        ticks: {
          color: themeColors.mutedForeground
        }
      }
    }
  };

  return (
    <div className={className} style={{ height }}>
      <Line data={data as ChartData<'line'>} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

// Gráfico de barras
export const BarChart: React.FC<ChartProps> = ({ data, options, className, height = 300 }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: themeColors.foreground,
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: themeColors.card,
        titleColor: themeColors.cardForeground,
        bodyColor: themeColors.mutedForeground,
        borderColor: themeColors.border,
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: themeColors.border
        },
        ticks: {
          color: themeColors.mutedForeground
        }
      },
      y: {
        grid: {
          color: themeColors.border
        },
        ticks: {
          color: themeColors.mutedForeground
        }
      }
    }
  };

  return (
    <div className={className} style={{ height }}>
      <Bar data={data as ChartData<'bar'>} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

// Gráfico de rosca
export const DoughnutChart: React.FC<ChartProps> = ({ data, options, className, height = 300 }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: themeColors.foreground,
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: themeColors.card,
        titleColor: themeColors.cardForeground,
        bodyColor: themeColors.mutedForeground,
        borderColor: themeColors.border,
        borderWidth: 1
      }
    }
  };

  return (
    <div className={className} style={{ height }}>
      <Doughnut data={data as ChartData<'doughnut'>} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

// Gráfico de radar
export const RadarChart: React.FC<ChartProps> = ({ data, options, className, height = 300 }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const defaultOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: themeColors.foreground,
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: themeColors.card,
        titleColor: themeColors.cardForeground,
        bodyColor: themeColors.mutedForeground,
        borderColor: themeColors.border,
        borderWidth: 1
      }
    },
    scales: {
      r: {
        grid: {
          color: themeColors.border
        },
        ticks: {
          color: themeColors.mutedForeground,
          backdropColor: 'transparent'
        },
        pointLabels: {
          color: themeColors.mutedForeground
        }
      }
    }
  };

  return (
    <div className={className} style={{ height }}>
      <Radar data={data as ChartData<'radar'>} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

// Gráfico de área polar
export const PolarAreaChart: React.FC<ChartProps> = ({ data, options, className, height = 300 }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const defaultOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: themeColors.foreground,
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: themeColors.card,
        titleColor: themeColors.cardForeground,
        bodyColor: themeColors.mutedForeground,
        borderColor: themeColors.border,
        borderWidth: 1
      }
    }
  };

  return (
    <div className={className} style={{ height }}>
      <PolarArea data={data as ChartData<'polarArea'>} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

// Tipos para dados específicos
interface WeeklyHoursData {
  hours?: number[];
}

interface DepartmentData {
  labels?: string[];
  values?: number[];
}

interface MonthlyCostsData {
  labels?: string[];
  costs?: number[];
  revenue?: number[];
}

// Interface removida temporariamente até implementação com dados reais
// interface EmployeePerformanceData {
//   labels?: string[];
//   performance?: number[];
// }

// Componentes específicos para o dashboard

// Gráfico de horas trabalhadas por semana
export const WeeklyHoursChart: React.FC<{ data: WeeklyHoursData }> = ({ data }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const chartData: ChartData<'line'> = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Horas Trabalhadas',
        data: data.hours || [8, 8, 8, 8, 8, 4, 0],
        borderColor: themeColors.primary,
        backgroundColor: `${themeColors.primary}20`, // 20% de opacidade
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      title: {
        display: true,
        text: 'Horas Trabalhadas por Semana',
        font: { size: 16, weight: 'bold' },
        color: themeColors.foreground
      }
    }
  };

  return <LineChart data={chartData} options={options} height={250} />;
};

// Gráfico de distribuição de funcionários por departamento
export const DepartmentDistributionChart: React.FC<{ data: DepartmentData }> = ({ data }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const chartData: ChartData<'doughnut'> = {
    labels: data.labels || ['Cozinha', 'Atendimento', 'Limpeza', 'Administrativo'],
    datasets: [
      {
        data: data.values || [12, 8, 4, 3],
        backgroundColor: [
          themeColors.destructive,    // Vermelho para cozinha
          themeColors.primary,        // Azul para atendimento
          themeColors.success,        // Verde para limpeza
          themeColors.warning         // Amarelo para administrativo
        ],
        borderWidth: 2,
        borderColor: themeColors.background
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      title: {
        display: true,
        text: 'Distribuição por Departamento',
        font: { size: 16, weight: 'bold' },
        color: themeColors.foreground
      }
    }
  };

  return <DoughnutChart data={chartData} options={options} height={250} />;
};

// Gráfico de custos por mês
export const MonthlyCostsChart: React.FC<{ data: MonthlyCostsData }> = ({ data }) => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  
  const chartData: ChartData<'bar'> = {
    labels: data.labels || ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Custos com Pessoal',
        data: data.costs || [45000, 48000, 52000, 49000, 55000, 58000],
        backgroundColor: themeColors.destructive,
        borderColor: themeColors.destructive,
        borderWidth: 2
      },
      {
        label: 'Receita',
        data: data.revenue || [60000, 65000, 70000, 68000, 75000, 80000],
        backgroundColor: themeColors.success,
        borderColor: themeColors.success,
        borderWidth: 2
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Custos vs Receita (Últimos 6 meses)',
        font: { size: 16, weight: 'bold' },
        color: themeColors.foreground
      }
    }
  };

  return <BarChart data={chartData} options={options} height={300} />;
};

// Gráfico de performance por funcionário - Removido temporariamente até implementação com dados reais
// export const EmployeePerformanceChart: React.FC<{ data: EmployeePerformanceData }> = ({ data }) => {
//   const { isDark } = useTheme();
//   const themeColors = getThemeColors(isDark);
//   
//   const chartData: ChartData<'line'> = {
//     labels: data.labels || ['João', 'Maria', 'Pedro', 'Ana', 'Carlos'],
//     datasets: [
//       {
//         label: 'Performance',
//         data: data.performance || [85, 92, 78, 95, 88],
//         borderColor: themeColors.info,
//         backgroundColor: `${themeColors.info}20`, // 20% de opacidade
//         fill: true,
//         tension: 0.4
//       }
//     ]
//   };
//
//   const options: ChartOptions<'line'> = {
//     plugins: {
//       title: {
//         display: true,
//         text: 'Performance por Funcionário',
//         font: { size: 16, weight: 'bold' },
//         color: themeColors.foreground
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100
//       }
//     }
//   };
//
//   return <LineChart data={chartData} options={options} height={250} />;
// };
