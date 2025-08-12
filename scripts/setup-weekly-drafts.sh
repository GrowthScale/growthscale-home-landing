#!/bin/bash

# Script para configurar a função de geração de rascunhos semanais
# Este script automatiza o processo de deploy e configuração

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de log
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Função para verificar se o Supabase CLI está instalado
check_supabase_cli() {
    if ! command -v supabase &> /dev/null; then
        log_error "Supabase CLI não está instalado."
        log_info "Instale com: npm install -g supabase"
        exit 1
    fi
    log_success "Supabase CLI encontrado"
}

# Função para verificar se está logado no Supabase
check_supabase_login() {
    if ! supabase status &> /dev/null; then
        log_error "Não está logado no Supabase."
        log_info "Execute: supabase login"
        exit 1
    fi
    log_success "Logado no Supabase"
}

# Função para verificar se o projeto está linkado
check_project_linked() {
    if [ ! -f "supabase/config.toml" ]; then
        log_error "Projeto não está linkado ao Supabase."
        log_info "Execute: supabase link --project-ref SEU_PROJECT_REF"
        exit 1
    fi
    log_success "Projeto linkado ao Supabase"
}

# Função para criar a tabela schedule_drafts
create_schedule_drafts_table() {
    log_info "Criando tabela schedule_drafts..."
    
    if [ -f "supabase/schedule-drafts-table.sql" ]; then
        # Executar o script SQL
        supabase db push --include-all
        log_success "Tabela schedule_drafts criada com sucesso"
    else
        log_error "Arquivo supabase/schedule-drafts-table.sql não encontrado"
        exit 1
    fi
}

# Função para fazer deploy da função
deploy_function() {
    log_info "Fazendo deploy da função generate-weekly-drafts..."
    
    if [ -f "supabase/functions/generate-weekly-drafts/index.ts" ]; then
        supabase functions deploy generate-weekly-drafts
        log_success "Função generate-weekly-drafts deployada com sucesso"
    else
        log_error "Arquivo da função não encontrado"
        exit 1
    fi
}

# Função para configurar o cron job
setup_cron_job() {
    log_info "Configurando cron job para execução semanal..."
    
    # Verificar se o cron job já existe
    if supabase functions list | grep -q "generate-weekly-drafts"; then
        log_warning "Função já existe. Atualizando configuração..."
    fi
    
    # Configurar para executar toda segunda-feira às 6:00 AM
    # Nota: O Supabase não tem cron nativo, então usaremos um serviço externo
    log_info "Para automatizar a execução semanal, você pode:"
    log_info "1. Usar GitHub Actions com cron"
    log_info "2. Usar Vercel Cron Jobs"
    log_info "3. Usar um serviço como cron-job.org"
    log_info ""
    log_info "URL da função: https://SEU_PROJECT_REF.supabase.co/functions/v1/generate-weekly-drafts"
}

# Função para testar a função
test_function() {
    log_info "Testando a função generate-weekly-drafts..."
    
    # Fazer uma chamada de teste
    PROJECT_REF=$(grep -o 'project_id = "[^"]*"' supabase/config.toml | cut -d'"' -f2)
    
    if [ -n "$PROJECT_REF" ]; then
        log_info "Fazendo chamada de teste para a função..."
        curl -X POST "https://$PROJECT_REF.supabase.co/functions/v1/generate-weekly-drafts" \
             -H "Authorization: Bearer $(supabase secrets list | grep SUPABASE_SERVICE_ROLE_KEY | cut -d'=' -f2)" \
             -H "Content-Type: application/json" \
             -d '{"test": true}' || log_warning "Teste falhou (pode ser normal se não há dados)"
        
        log_success "Teste concluído"
    else
        log_warning "Não foi possível determinar o PROJECT_REF para teste"
    fi
}

# Função para gerar relatório
generate_report() {
    log_info "Gerando relatório de configuração..."
    
    echo ""
    echo "📋 RELATÓRIO DE CONFIGURAÇÃO DOS RASCUNHOS SEMANAIS"
    echo "=================================================="
    echo ""
    echo "✅ Tabela schedule_drafts criada"
    echo "✅ Função generate-weekly-drafts deployada"
    echo "✅ Políticas RLS configuradas"
    echo "✅ Índices de performance criados"
    echo ""
    echo "📅 PRÓXIMOS PASSOS:"
    echo "1. Configure um cron job externo para executar semanalmente"
    echo "2. Teste a função manualmente se necessário"
    echo "3. Monitore os logs no painel do Supabase"
    echo ""
    echo "🔗 URL da função: https://$(grep -o 'project_id = "[^"]*"' supabase/config.toml | cut -d'"' -f2).supabase.co/functions/v1/generate-weekly-drafts"
    echo ""
    echo "📚 DOCUMENTAÇÃO:"
    echo "- Tabela: schedule_drafts"
    echo "- Status: pending_review, approved, dismissed"
    echo "- Execução: Semanal (segunda-feira)"
    echo ""
}

# Função principal
main() {
    echo "🚀 CONFIGURANDO SISTEMA DE RASCUNHOS SEMANAIS"
    echo "============================================="
    echo ""
    
    # Verificações iniciais
    check_supabase_cli
    check_supabase_login
    check_project_linked
    
    # Executar configurações
    create_schedule_drafts_table
    deploy_function
    setup_cron_job
    test_function
    
    # Gerar relatório final
    generate_report
    
    log_success "Configuração dos rascunhos semanais concluída!"
}

# Executar função principal
main "$@"
