#!/bin/bash

# Script para configurar e testar o sistema de relatórios semanais
# Autor: GrowthScale
# Data: 2024-12-19

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

# Verificar se o Supabase CLI está instalado
check_supabase_cli() {
    log_info "Verificando Supabase CLI..."
    if ! command -v supabase &> /dev/null; then
        log_error "Supabase CLI não encontrado. Instale com: npm install -g supabase"
        exit 1
    fi
    log_success "Supabase CLI encontrado"
}

# Verificar login do Supabase
check_supabase_login() {
    log_info "Verificando login do Supabase..."
    if ! supabase status &> /dev/null; then
        log_warning "Não logado no Supabase. Faça login:"
        echo "supabase login"
        echo "supabase link --project-ref SEU_PROJECT_REF"
        exit 1
    fi
    log_success "Logado no Supabase"
}

# Deploy da função Edge
deploy_edge_function() {
    log_info "Deployando função Edge send-weekly-report..."
    
    if [ ! -f "supabase/functions/send-weekly-report/index.ts" ]; then
        log_error "Função send-weekly-report não encontrada"
        exit 1
    fi

    supabase functions deploy send-weekly-report
    log_success "Função send-weekly-report deployada com sucesso"
}

# Configurar variáveis de ambiente
setup_environment_variables() {
    log_info "Configurando variáveis de ambiente..."
    
    # Verificar se as variáveis necessárias estão configuradas
    local missing_vars=()
    
    if [ -z "$OPENAI_API_KEY" ]; then
        missing_vars+=("OPENAI_API_KEY")
    fi
    
    if [ -z "$RESEND_API_KEY" ]; then
        missing_vars+=("RESEND_API_KEY")
    fi
    
    if [ -z "$FRONTEND_URL" ]; then
        missing_vars+=("FRONTEND_URL")
    fi
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        log_warning "Variáveis de ambiente não configuradas:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        
        log_info "Configure as variáveis no painel do Supabase:"
        echo "  Dashboard > Settings > Edge Functions > Environment Variables"
        echo ""
        echo "Variáveis necessárias:"
        echo "  - OPENAI_API_KEY: Sua chave da API OpenAI"
        echo "  - RESEND_API_KEY: Sua chave da API Resend (opcional, para envio de e-mails)"
        echo "  - FRONTEND_URL: URL do seu frontend (ex: https://seu-app.vercel.app)"
    else
        log_success "Todas as variáveis de ambiente estão configuradas"
    fi
}

# Testar a função
test_function() {
    log_info "Testando função send-weekly-report..."
    
    # Fazer uma chamada de teste para a função
    local function_url=$(supabase functions list | grep send-weekly-report | awk '{print $2}')
    
    if [ -z "$function_url" ]; then
        log_error "URL da função não encontrada"
        return 1
    fi
    
    log_info "URL da função: $function_url"
    
    # Fazer uma requisição de teste
    local response=$(curl -s -X POST "$function_url" \
        -H "Content-Type: application/json" \
        -d '{"test": true}')
    
    if echo "$response" | grep -q "success"; then
        log_success "Função testada com sucesso"
        echo "Resposta: $response"
    else
        log_warning "Função retornou erro ou resposta inesperada"
        echo "Resposta: $response"
    fi
}

# Configurar agendamento (instruções)
setup_scheduling() {
    log_info "Configurando agendamento semanal..."
    
    echo ""
    echo "📅 Para agendar a execução semanal, configure um dos seguintes:"
    echo ""
    echo "1. Supabase Dashboard (recomendado):"
    echo "   - Acesse o Supabase Dashboard"
    echo "   - Vá para Edge Functions"
    echo "   - Selecione 'send-weekly-report'"
    echo "   - Configure Cron Schedule: 0 8 * * 1"
    echo "   - Salve a configuração"
    echo ""
    echo "2. GitHub Actions:"
    echo "   Crie .github/workflows/weekly-reports.yml:"
    echo ""
    cat << 'EOF'
name: Weekly Reports
on:
  schedule:
    - cron: '0 9 * * 1'  # Toda segunda-feira às 9h
  workflow_dispatch:  # Permite execução manual

jobs:
  send-reports:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Weekly Reports
        run: |
          curl -X POST ${{ secrets.SUPABASE_FUNCTION_URL }}/send-weekly-report \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
EOF
    echo ""
    echo "2. Vercel Cron Jobs:"
    echo "   Adicione ao vercel.json:"
    echo ""
    cat << 'EOF'
{
  "crons": [
    {
      "path": "/api/weekly-reports",
      "schedule": "0 9 * * 1"
    }
  ]
}
EOF
    echo ""
    echo "3. Serviços externos:"
    echo "   - cron-job.org"
    echo "   - EasyCron"
    echo "   - Zapier"
    echo ""
}

# Verificar estrutura da tabela companies
check_companies_table() {
    log_info "Verificando estrutura da tabela companies..."
    
    # Verificar se a coluna owner_email existe
    local has_owner_email=$(supabase db diff --schema public | grep -c "owner_email" || echo "0")
    
    if [ "$has_owner_email" -eq 0 ]; then
        log_warning "Coluna 'owner_email' não encontrada na tabela 'companies'"
        echo ""
        echo "Execute o seguinte SQL no Supabase:"
        echo ""
        cat << 'EOF'
-- Adicionar coluna owner_email se não existir
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS owner_email TEXT;

-- Adicionar comentário
COMMENT ON COLUMN companies.owner_email IS 'E-mail do proprietário para envio de relatórios';
EOF
        echo ""
    else
        log_success "Tabela companies está configurada corretamente"
    fi
}

# Função principal
main() {
    echo "🚀 Configurando Sistema de Relatórios Semanais"
    echo "=============================================="
    echo ""
    
    check_supabase_cli
    check_supabase_login
    check_companies_table
    setup_environment_variables
    deploy_edge_function
    test_function
    setup_scheduling
    
    echo ""
    echo "🎉 Configuração concluída!"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Configure as variáveis de ambiente no Supabase"
    echo "2. Configure o agendamento semanal"
    echo "3. Teste manualmente a função"
    echo "4. Monitore os logs para verificar funcionamento"
    echo ""
    echo "📚 Documentação:"
    echo "- Função: supabase/functions/send-weekly-report/index.ts"
    echo "- Script: scripts/setup-weekly-reports.sh"
    echo "- Logs: Dashboard do Supabase > Edge Functions > Logs"
}

# Executar função principal
main "$@"
