// supabase/seed.js
import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: Substitua pelas suas credenciais do Supabase. Use a Service Role Key para rodar scripts.
const supabaseUrl = 'URL_DO_SEU_PROJETO';
const supabaseKey = 'SUA_CHAVE_DE_SERVICO';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedTemplates() {
  console.log('Iniciando o processo de seeding com a lista COMPLETA de modelos...');

  const templates = [
    {
      name: '6x1 (Padrão Varejo)',
      description: 'Trabalha 6 dias e folga 1. Máxima cobertura operacional, comum em restaurantes e fast-food.',
      template_data: { 
        advantages: 'Alta disponibilidade operacional', 
        disadvantages: 'Maior desgaste do colaborador', 
        cost_profile: 'Médio', 
        common_in: 'Restaurantes, fast-food, supermercados',
        work_days: 6,
        rest_days: 1,
        total_cycle: 7,
        weekly_hours: 44,
        compliance_risk: 'Médio',
        cost_efficiency: 'Alta',
        employee_satisfaction: 'Baixa'
      }
    },
    {
      name: '5x2 (Equilíbrio)',
      description: 'Trabalha 5 dias e folga 2. Promove melhor equilíbrio e descanso, ideal para áreas de apoio.',
      template_data: { 
        advantages: 'Menor fadiga, fácil gestão', 
        disadvantages: 'Menos flexível para picos de demanda', 
        cost_profile: 'Baixo', 
        common_in: 'Administrativo, padarias, produção interna',
        work_days: 5,
        rest_days: 2,
        total_cycle: 7,
        weekly_hours: 40,
        compliance_risk: 'Baixo',
        cost_efficiency: 'Média',
        employee_satisfaction: 'Alta'
      }
    },
    {
      name: '12x36 (Plantão Contínuo)',
      description: 'Turnos de 12h de trabalho por 36h de descanso. Ideal para operações que não param.',
      template_data: { 
        advantages: 'Redução de deslocamentos, cobertura integral', 
        disadvantages: 'Cansaço físico intenso', 
        cost_profile: 'Alto', 
        common_in: 'Hotéis, segurança de estoques, hospitais',
        work_hours: 12,
        rest_hours: 36,
        total_cycle: 48,
        weekly_hours: 42,
        compliance_risk: 'Alto',
        cost_efficiency: 'Média',
        employee_satisfaction: 'Média'
      }
    },
    {
      name: 'Turno Parcial (Pico de Demanda)',
      description: 'Jornadas reduzidas de 4 ou 6 horas para cobrir horários de maior movimento com custo otimizado.',
      template_data: { 
        advantages: 'Ideal para horários de pico, custo reduzido', 
        disadvantages: 'Necessidade de mais funcionários', 
        cost_profile: 'Baixo', 
        common_in: 'Fast-food, cafeterias, delivery',
        work_hours: 4,
        rest_hours: 20,
        total_cycle: 24,
        weekly_hours: 20,
        compliance_risk: 'Baixo',
        cost_efficiency: 'Alta',
        employee_satisfaction: 'Média'
      }
    },
    {
      name: 'Intermitente (Sob Demanda)',
      description: 'O funcionário é convocado para trabalhar e recebe apenas pelas horas servidas. Perfeito para eventos.',
      template_data: { 
        advantages: 'Custo só quando há demanda, alta flexibilidade', 
        disadvantages: 'Baixa previsibilidade de renda para o funcionário', 
        cost_profile: 'Baixo', 
        common_in: 'Eventos, buffets, reforço em picos',
        work_hours: 'Variável',
        rest_hours: 'Variável',
        total_cycle: 'Variável',
        weekly_hours: 'Variável',
        compliance_risk: 'Baixo',
        cost_efficiency: 'Muito Alta',
        employee_satisfaction: 'Baixa'
      }
    },
    {
      name: '5x1 (Operação Intensa)',
      description: 'Cinco dias de trabalho por um de folga. Garante alta cobertura mas com menos descanso que a 6x1.',
      template_data: { 
        advantages: 'Boa cobertura de operação', 
        disadvantages: 'Menos previsibilidade para o funcionário', 
        cost_profile: 'Médio', 
        common_in: 'Cozinhas industriais, redes de varejo',
        work_days: 5,
        rest_days: 1,
        total_cycle: 6,
        weekly_hours: 44,
        compliance_risk: 'Médio',
        cost_efficiency: 'Alta',
        employee_satisfaction: 'Média'
      }
    },
    {
      name: '4x2 (Turnos Longos)',
      description: 'Quatro dias de trabalho, geralmente com turnos mais longos, seguidos por dois dias de folga.',
      template_data: { 
        advantages: 'Mais dias de folga consecutivos', 
        disadvantages: 'Turnos desgastantes', 
        cost_profile: 'Médio', 
        common_in: 'Hotelaria, catering, food service contínuo',
        work_days: 4,
        rest_days: 2,
        total_cycle: 6,
        weekly_hours: 44,
        compliance_risk: 'Médio',
        cost_efficiency: 'Média',
        employee_satisfaction: 'Alta'
      }
    },
    {
      name: '6x2 (Menor Desgaste)',
      description: 'Seis dias de trabalho por dois de folga. Um meio-termo equilibrado entre operação e descanso.',
      template_data: { 
        advantages: 'Equilíbrio entre operação e descanso', 
        disadvantages: 'Pode não cobrir 100% da demanda', 
        cost_profile: 'Médio', 
        common_in: 'Padarias, restaurantes com folga dupla',
        work_days: 6,
        rest_days: 2,
        total_cycle: 8,
        weekly_hours: 44,
        compliance_risk: 'Baixo',
        cost_efficiency: 'Média',
        employee_satisfaction: 'Alta'
      }
    },
    {
      name: '24x48 (Plantão Extremo)',
      description: 'Turnos de 24h de trabalho por 48h de descanso. Usado apenas em operações muito específicas.',
      template_data: { 
        advantages: 'Cobertura de plantões longos', 
        disadvantages: 'Extremamente desgastante', 
        cost_profile: 'Alto', 
        common_in: 'Operações logísticas especiais, emergências',
        work_hours: 24,
        rest_hours: 48,
        total_cycle: 72,
        weekly_hours: 56,
        compliance_risk: 'Muito Alto',
        cost_efficiency: 'Baixa',
        employee_satisfaction: 'Baixa'
      }
    },
    {
      name: 'Horário Móvel (Eventos)',
      description: 'Jornada com horários de entrada e saída variáveis, adaptada totalmente à demanda do dia.',
      template_data: { 
        advantages: 'Ótima para eventos, adaptação total', 
        disadvantages: 'Dificulta rotina do colaborador', 
        cost_profile: 'Baixo', 
        common_in: 'Buffets, eventos, restaurantes sazonais',
        work_hours: 'Variável',
        rest_hours: 'Variável',
        total_cycle: 'Variável',
        weekly_hours: 'Variável',
        compliance_risk: 'Baixo',
        cost_efficiency: 'Alta',
        employee_satisfaction: 'Média'
      }
    },
    {
      name: 'Alta Temporada (Sazonal)',
      description: 'Modelo com carga horária ampliada e regras específicas para períodos de alta demanda.',
      template_data: { 
        advantages: 'Maximiza faturamento em picos', 
        disadvantages: 'Pode gerar fadiga excessiva', 
        cost_profile: 'Alto', 
        common_in: 'Turismo, restaurantes em áreas sazonais',
        work_days: 7,
        rest_days: 0,
        total_cycle: 7,
        weekly_hours: 56,
        compliance_risk: 'Alto',
        cost_efficiency: 'Muito Alta',
        employee_satisfaction: 'Baixa'
      }
    }
  ];

  // Limpa a tabela antes de inserir para evitar duplicatas
  console.log('Limpando a tabela de modelos existente...');
  const { error: deleteError } = await supabase.from('schedule_templates').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.error('Erro ao limpar a tabela de modelos:', deleteError);
    return;
  }
  console.log('Tabela limpa. Inserindo os novos modelos...');

  const { data, error } = await supabase.from('schedule_templates').insert(templates);
  
  if (error) {
    console.error('Erro ao inserir a lista completa de modelos:', error);
  } else {
    console.log(`${data ? data.length : 0} modelos padrão foram inseridos com sucesso!`);
    console.log('\n📋 Lista de modelos inseridos:');
    templates.forEach((template, index) => {
      console.log(`${index + 1}. ${template.name} - ${template.description}`);
    });
  }
}

// Função para verificar se a tabela existe e tem a estrutura correta
async function checkTableStructure() {
  console.log('Verificando estrutura da tabela schedule_templates...');
  
  const { data, error } = await supabase
    .from('schedule_templates')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Erro ao verificar tabela:', error);
    console.log('Certifique-se de que a tabela schedule_templates existe no seu banco de dados.');
    return false;
  }
  
  console.log('✅ Tabela schedule_templates encontrada e acessível');
  return true;
}

// Função principal que executa as verificações antes do seeding
async function main() {
  console.log('🚀 Iniciando processo de seeding dos modelos de escala...\n');
  
  // Verifica se as credenciais foram configuradas
  if (supabaseUrl === 'URL_DO_SEU_PROJETO' || supabaseKey === 'SUA_CHAVE_DE_SERVICO') {
    console.error('❌ ERRO: Configure as credenciais do Supabase no início do script!');
    console.log('📝 Instruções:');
    console.log('1. Substitua URL_DO_SEU_PROJETO pela URL do seu projeto Supabase');
    console.log('2. Substitua SUA_CHAVE_DE_SERVICO pela Service Role Key do Supabase');
    console.log('3. Execute novamente o script');
    return;
  }
  
  // Verifica a estrutura da tabela
  const tableExists = await checkTableStructure();
  if (!tableExists) {
    return;
  }
  
  // Executa o seeding
  await seedTemplates();
  
  console.log('\n✅ Processo de seeding concluído!');
  console.log('📊 Agora você tem 11 modelos de escala pré-configurados no sistema.');
}

// Executa o script
main().catch(console.error);
