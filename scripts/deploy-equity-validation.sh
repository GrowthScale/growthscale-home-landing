#!/bin/bash

# Script para deploy da função de validação com placar de equidade
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

# Verificar se a função existe
check_function_exists() {
    log_info "Verificando função validate-schedule..."
    
    if [ ! -f "supabase/functions/validate-schedule/index.ts" ]; then
        log_error "Função validate-schedule não encontrada"
        exit 1
    fi
    
    log_success "Função validate-schedule encontrada"
}

# Deploy da função Edge
deploy_edge_function() {
    log_info "Deployando função Edge validate-schedule com placar de equidade..."
    
    supabase functions deploy validate-schedule
    log_success "Função validate-schedule deployada com sucesso"
}

# Testar a função
test_function() {
    log_info "Testando função validate-schedule..."
    
    # Fazer uma chamada de teste para a função
    local function_url=$(supabase functions list | grep validate-schedule | awk '{print $2}')
    
    if [ -z "$function_url" ]; then
        log_error "URL da função não encontrada"
        return 1
    fi
    
    log_info "URL da função: $function_url"
    
    # Dados de teste para validar a equidade
    local test_data='{
      "shifts": [
        {
          "id": "shift1",
          "employeeId": "emp1",
          "startTime": "2024-12-21T08:00:00Z",
          "endTime": "2024-12-21T16:00:00Z"
        },
        {
          "id": "shift2",
          "employeeId": "emp2",
          "startTime": "2024-12-22T08:00:00Z",
          "endTime": "2024-12-22T16:00:00Z"
        },
        {
          "id": "shift3",
          "employeeId": "emp1",
          "startTime": "2024-12-28T08:00:00Z",
          "endTime": "2024-12-28T16:00:00Z"
        }
      ],
      "employees": [
        {
          "id": "emp1",
          "name": "João Silva",
          "workload": 44
        },
        {
          "id": "emp2",
          "name": "Maria Santos",
          "workload": 44
        }
      ]
    }'
    
    # Fazer uma requisição de teste
    local response=$(curl -s -X POST "$function_url" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $(supabase status --output json | jq -r '.api_keys.anon')" \
        -d "$test_data")
    
    if echo "$response" | grep -q "equityScore"; then
        log_success "Função testada com sucesso - Placar de Equidade funcionando!"
        echo "Resposta: $response"
    else
        log_warning "Função retornou resposta inesperada"
        echo "Resposta: $response"
    fi
}

# Verificar dependências
check_dependencies() {
    log_info "Verificando dependências..."
    
    # Verificar se jq está instalado para parsing JSON
    if ! command -v jq &> /dev/null; then
        log_warning "jq não encontrado. Instale para melhor parsing de JSON:"
        echo "  macOS: brew install jq"
        echo "  Ubuntu: sudo apt-get install jq"
        echo "  Windows: choco install jq"
    else
        log_success "jq encontrado"
    fi
    
    # Verificar se curl está disponível
    if ! command -v curl &> /dev/null; then
        log_error "curl não encontrado"
        exit 1
    fi
    log_success "curl encontrado"
}

# Mostrar informações sobre a nova funcionalidade
show_feature_info() {
    log_info "Informações sobre o Placar de Equidade:"
    echo ""
    echo "🎯 Funcionalidade Implementada:"
    echo "  - Análise de distribuição de turnos de fim de semana"
    echo "  - Cálculo de equidade baseado em desvio padrão"
    echo "  - Pontuação de 0-100 (100 = perfeita equidade)"
    echo "  - Mensagens personalizadas baseadas na pontuação"
    echo ""
    echo "📊 Categorias de Equidade:"
    echo "  - 75-100: Excelente (Verde)"
    echo "  - 50-74:  Regular (Amarelo)"
    echo "  - 0-49:   Crítico (Vermelho)"
    echo ""
    echo "🔧 Componentes Atualizados:"
    echo "  - Edge Function: validate-schedule"
    echo "  - Frontend: EquityScore component"
    echo "  - API: ValidationResult interface"
    echo "  - Dashboard: Integração do componente"
    echo ""
}

# Função principal
main() {
    echo "🎯 Deploy do Placar de Equidade"
    echo "================================"
    echo ""
    
    check_dependencies
    check_supabase_cli
    check_supabase_login
    check_function_exists
    deploy_edge_function
    test_function
    show_feature_info
    
    echo ""
    echo "🎉 Deploy concluído!"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Verifique o componente EquityScore no Dashboard"
    echo "2. Teste a validação de escalas com dados reais"
    echo "3. Monitore os logs para verificar funcionamento"
    echo ""
    echo "📚 Documentação:"
    echo "- Função: supabase/functions/validate-schedule/index.ts"
    echo "- Componente: src/components/dashboard/EquityScore.tsx"
    echo "- Dashboard: src/components/dashboard/Dashboard.tsx"
    echo "- API: src/services/api.ts"
}

# Executar função principal
main "$@"
