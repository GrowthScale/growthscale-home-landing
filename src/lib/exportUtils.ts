// =====================================================
// EXPORT UTILITIES - GROWTHSCALE
// Export de dados para PDF e Excel
// =====================================================

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Tipos para dados de export
export interface ExportData {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  filename?: string;
}

export interface ChartExportData {
  title: string;
  chartData: Record<string, unknown>;
  filename?: string;
}

// Configuração do PDF
const PDF_CONFIG = {
  fontSize: 12,
  titleFontSize: 18,
  margin: 20,
  lineHeight: 1.2
};

// Export para PDF
export const exportToPDF = (data: ExportData): void => {
  const doc = new jsPDF();
  const { title, headers, rows, filename } = data;
  
  // Título
  doc.setFontSize(PDF_CONFIG.titleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.text(title, PDF_CONFIG.margin, PDF_CONFIG.margin);
  
  // Data de geração
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const date = new Date().toLocaleDateString('pt-BR');
  doc.text(`Gerado em: ${date}`, PDF_CONFIG.margin, PDF_CONFIG.margin + 10);
  
  // Tabela
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: PDF_CONFIG.margin + 20,
    styles: {
      fontSize: PDF_CONFIG.fontSize,
      cellPadding: 5
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    }
  });
  
  // Salvar arquivo
  const finalFilename = filename || `${title.toLowerCase().replace(/\s+/g, '_')}_${date}.pdf`;
  doc.save(finalFilename);
};

// Export para Excel
export const exportToExcel = (data: ExportData): void => {
  const { title, headers, rows, filename } = data;
  
  // Criar workbook
  const wb = XLSX.utils.book_new();
  
  // Criar worksheet
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  
  // Adicionar worksheet ao workbook
  XLSX.utils.book_append_sheet(wb, ws, title);
  
  // Gerar arquivo
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Salvar arquivo
  const date = new Date().toLocaleDateString('pt-BR');
  const finalFilename = filename || `${title.toLowerCase().replace(/\s+/g, '_')}_${date}.xlsx`;
  saveAs(blob, finalFilename);
};

// Export de relatório de funcionários
export const exportEmployeesReport = (employees: Record<string, unknown>[]): void => {
  const headers = ['Nome', 'Email', 'Cargo', 'Departamento', 'Status', 'Data de Contratação', 'Salário'];
  
  const rows = employees.map(emp => [
    emp.name || '',
    emp.email || '',
    emp.position || '',
    emp.department || '',
    emp.status || '',
    emp.hireDate ? new Date(emp.hireDate).toLocaleDateString('pt-BR') : '',
    emp.salary ? `R$ ${emp.salary.toFixed(2)}` : ''
  ]);
  
  const data: ExportData = {
    title: 'Relatório de Funcionários',
    headers,
    rows,
    filename: 'relatorio_funcionarios'
  };
  
  exportToPDF(data);
};

// Export de escala
export const exportScheduleReport = (schedule: Record<string, unknown>[]): void => {
  const headers = ['Funcionário', 'Data', 'Início', 'Fim', 'Horas', 'Departamento', 'Status'];
  
  const rows = schedule.map(shift => [
    shift.employeeName || '',
    shift.date ? new Date(shift.date).toLocaleDateString('pt-BR') : '',
    shift.startTime || '',
    shift.endTime || '',
    shift.hours || '',
    shift.department || '',
    shift.status || ''
  ]);
  
  const data: ExportData = {
    title: 'Relatório de Escala',
    headers,
    rows,
    filename: 'relatorio_escala'
  };
  
  exportToPDF(data);
};

// Export de custos
export const exportCostsReport = (costs: Record<string, unknown>[]): void => {
  const headers = ['Mês', 'Custos com Pessoal', 'Receita', 'Margem', 'Funcionários Ativos'];
  
  const rows = costs.map(cost => [
    cost.month || '',
    cost.personnelCosts ? `R$ ${cost.personnelCosts.toFixed(2)}` : '',
    cost.revenue ? `R$ ${cost.revenue.toFixed(2)}` : '',
    cost.margin ? `${cost.margin.toFixed(1)}%` : '',
    cost.activeEmployees || ''
  ]);
  
  const data: ExportData = {
    title: 'Relatório de Custos',
    headers,
    rows,
    filename: 'relatorio_custos'
  };
  
  exportToExcel(data);
};

// Export de compliance
export const exportComplianceReport = (compliance: Record<string, unknown>[]): void => {
  const headers = ['Funcionário', 'Violação', 'Severidade', 'Data', 'Status', 'Ação Corretiva'];
  
  const rows = compliance.map(item => [
    item.employeeName || '',
    item.violation || '',
    item.severity || '',
    item.date ? new Date(item.date).toLocaleDateString('pt-BR') : '',
    item.status || '',
    item.correctiveAction || ''
  ]);
  
  const data: ExportData = {
    title: 'Relatório de Compliance',
    headers,
    rows,
    filename: 'relatorio_compliance'
  };
  
  exportToPDF(data);
};

// Export de dashboard completo
export const exportDashboardReport = (dashboardData: Record<string, unknown>): void => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('pt-BR');
  
  // Título
  doc.setFontSize(PDF_CONFIG.titleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório do Dashboard - GrowthScale', PDF_CONFIG.margin, PDF_CONFIG.margin);
  
  // Data
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Gerado em: ${date}`, PDF_CONFIG.margin, PDF_CONFIG.margin + 10);
  
  let currentY = PDF_CONFIG.margin + 30;
  
  // KPIs
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Principais Indicadores', PDF_CONFIG.margin, currentY);
  currentY += 15;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const kpis = [
    `Total de Funcionários: ${dashboardData.totalEmployees || 0}`,
    `Funcionários Ativos: ${dashboardData.activeEmployees || 0}`,
    `Custos Mensais: R$ ${(dashboardData.monthlyCosts || 0).toFixed(2)}`,
    `Receita Mensal: R$ ${(dashboardData.monthlyRevenue || 0).toFixed(2)}`,
    `Margem de Lucro: ${(dashboardData.profitMargin || 0).toFixed(1)}%`
  ];
  
  kpis.forEach(kpi => {
    doc.text(kpi, PDF_CONFIG.margin, currentY);
    currentY += 8;
  });
  
  // Tabela de funcionários recentes
  if (dashboardData.recentEmployees && dashboardData.recentEmployees.length > 0) {
    currentY += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Funcionários Recentes', PDF_CONFIG.margin, currentY);
    
    const headers = ['Nome', 'Cargo', 'Departamento', 'Data de Contratação'];
    const rows = dashboardData.recentEmployees.map((emp: Record<string, unknown>) => [
      emp.name || '',
      emp.position || '',
      emp.department || '',
      emp.hireDate ? new Date(emp.hireDate).toLocaleDateString('pt-BR') : ''
    ]);
    
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: currentY + 5,
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
  }
  
  // Salvar
  doc.save(`dashboard_report_${date}.pdf`);
};

// Export de gráfico como imagem (se necessário)
export const exportChartAsImage = (chartElement: HTMLElement, filename: string): void => {
  // Esta função pode ser implementada usando html2canvas se necessário
  console.log('Export de gráfico como imagem:', filename);
};

// Utilitário para formatar dados para export
export const formatDataForExport = (data: Record<string, unknown>[], fields: string[]): (string | number)[][] => {
  return data.map(item => 
    fields.map(field => {
      const value = item[field];
      if (value instanceof Date) {
        return value.toLocaleDateString('pt-BR');
      }
      if (typeof value === 'number') {
        return value.toFixed(2);
      }
      return value || '';
    })
  );
};

// Export múltiplo (PDF + Excel)
export const exportMultiple = (data: ExportData): void => {
  exportToPDF(data);
  exportToExcel(data);
};
