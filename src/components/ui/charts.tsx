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

// Configuração global do Chart.js
ChartJS.defaults.color = '#6b7280';
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif';

interface ChartProps {
  data: ChartData<'line' | 'bar' | 'doughnut' | 'radar' | 'polarArea'>;
  options?: ChartOptions<'line' | 'bar' | 'doughnut' | 'radar' | 'polarArea'>;
  className?: string;
  height?: number;
}

// Gráfico de linha
export const LineChart: React.FC<ChartProps> = ({ data, options, className, height = 300 }) => {
  const { isDark } = useTheme();
  
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? '#374151' : '#e5e7eb'
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280'
        }
      },
      y: {
        grid: {
          color: isDark ? '#374151' : '#e5e7eb'
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280'
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
  
  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? '#374151' : '#e5e7eb'
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280'
        }
      },
      y: {
        grid: {
          color: isDark ? '#374151' : '#e5e7eb'
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280'
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
  
  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: isDark ? '#374151' : '#e5e7eb',
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
  
  const defaultOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      r: {
        grid: {
          color: isDark ? '#374151' : '#e5e7eb'
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          backdropColor: 'transparent'
        },
        pointLabels: {
          color: isDark ? '#9ca3af' : '#6b7280'
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
  
  const defaultOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: isDark ? '#374151' : '#e5e7eb',
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

interface EmployeePerformanceData {
  labels?: string[];
  performance?: number[];
}

// Componentes específicos para o dashboard

// Gráfico de horas trabalhadas por semana
export const WeeklyHoursChart: React.FC<{ data: WeeklyHoursData }> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Horas Trabalhadas',
        data: data.hours || [8, 8, 8, 8, 8, 4, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
        font: { size: 16, weight: 'bold' }
      }
    }
  };

  return <LineChart data={chartData} options={options} height={250} />;
};

// Gráfico de distribuição de funcionários por departamento
export const DepartmentDistributionChart: React.FC<{ data: DepartmentData }> = ({ data }) => {
  const chartData: ChartData<'doughnut'> = {
    labels: data.labels || ['Cozinha', 'Atendimento', 'Limpeza', 'Administrativo'],
    datasets: [
      {
        data: data.values || [12, 8, 4, 3],
        backgroundColor: [
          '#ef4444',
          '#3b82f6',
          '#10b981',
          '#f59e0b'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      title: {
        display: true,
        text: 'Distribuição por Departamento',
        font: { size: 16, weight: 'bold' }
      }
    }
  };

  return <DoughnutChart data={chartData} options={options} height={250} />;
};

// Gráfico de custos por mês
export const MonthlyCostsChart: React.FC<{ data: MonthlyCostsData }> = ({ data }) => {
  const chartData: ChartData<'bar'> = {
    labels: data.labels || ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Custos com Pessoal',
        data: data.costs || [45000, 48000, 52000, 49000, 55000, 58000],
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 2
      },
      {
        label: 'Receita',
        data: data.revenue || [60000, 65000, 70000, 68000, 75000, 80000],
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 2
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Custos vs Receita (Últimos 6 meses)',
        font: { size: 16, weight: 'bold' }
      }
    }
  };

  return <BarChart data={chartData} options={options} height={300} />;
};

// Gráfico de performance por funcionário
export const EmployeePerformanceChart: React.FC<{ data: EmployeePerformanceData }> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.labels || ['João', 'Maria', 'Pedro', 'Ana', 'Carlos'],
    datasets: [
      {
        label: 'Performance',
        data: data.performance || [85, 92, 78, 95, 88],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 244, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      title: {
        display: true,
        text: 'Performance por Funcionário',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return <LineChart data={chartData} options={options} height={250} />;
};
