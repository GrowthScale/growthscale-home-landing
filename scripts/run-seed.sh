#!/bin/bash

# =====================================================
# SCRIPT AUTOMATIZADO PARA EXECUTAR SEED
# GrowthScale - Seed Automation
# =====================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

echo "🌱 Iniciando processo automatizado de seed..."

# Verificar se o Node.js está instalado
check_node() {
    log_info "Verificando Node.js..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js $NODE_VERSION encontrado"
    else
        log_error "Node.js não encontrado"
        exit 1
    fi
}

# Verificar se o arquivo seed.js existe
check_seed_file() {
    log_info "Verificando arquivo seed.js..."
    if [ -f "supabase/seed.js" ]; then
        log_success "Arquivo supabase/seed.js encontrado"
    else
        log_error "Arquivo supabase/seed.js não encontrado"
        exit 1
    fi
}

# Verificar sintaxe do arquivo seed.js
check_syntax() {
    log_info "Verificando sintaxe do arquivo seed.js..."
    if node -c supabase/seed.js 2>/dev/null; then
        log_success "Sintaxe do arquivo seed.js está correta"
    else
        log_error "Erro de sintaxe no arquivo seed.js"
        exit 1
    fi
}

# Verificar se as credenciais estão configuradas
check_credentials() {
    log_info "Verificando configuração das credenciais..."
    
    # Verificar se as credenciais padrão ainda estão no arquivo
    if grep -q "URL_DO_SEU_PROJETO" supabase/seed.js; then
        log_warning "Credenciais do Supabase não configuradas"
        log_info "Para configurar as credenciais:"
        log_info "1. Acesse o painel do Supabase"
        log_info "2. Vá em Settings > API"
        log_info "3. Copie a URL do projeto"
        log_info "4. Copie a Service Role Key"
        log_info "5. Edite o arquivo supabase/seed.js"
        log_info "6. Substitua as credenciais"
        log_info "7. Execute novamente este script"
        return 1
    fi
    
    log_success "Credenciais do Supabase configuradas"
    return 0
}

# Executar o seed
run_seed() {
    log_info "Executando script de seed..."
    
    if node supabase/seed.js; then
        log_success "Seed executado com sucesso!"
        return 0
    else
        log_error "Erro ao executar o seed"
        return 1
    fi
}

# Verificar se a tabela schedule_templates existe
check_table_exists() {
    log_info "Verificando se a tabela schedule_templates existe..."
    
    # Esta verificação seria feita pelo próprio script seed.js
    # Aqui apenas informamos o usuário
    log_info "O script verificará automaticamente se a tabela existe"
}

# Gerar relatório final
generate_report() {
    echo ""
    echo "=================================================="
    echo "🌱 RELATÓRIO DE SEED - GROWTHSCALE"
    echo "=================================================="
    echo ""
    echo "📊 Status:"
    echo "   • Node.js: ✅ Disponível"
    echo "   • Arquivo seed.js: ✅ Encontrado"
    echo "   • Sintaxe: ✅ Correta"
    echo "   • Credenciais: ⚠️  Verificar configuração"
    echo ""
    echo "📋 Modelos que serão inseridos:"
    echo "   1. 6x1 (Padrão Varejo)"
    echo "   2. 5x2 (Equilíbrio)"
    echo "   3. 12x36 (Plantão Contínuo)"
    echo "   4. Turno Parcial (Pico de Demanda)"
    echo "   5. Intermitente (Sob Demanda)"
    echo "   6. 5x1 (Operação Intensa)"
    echo "   7. 4x2 (Turnos Longos)"
    echo "   8. 6x2 (Menor Desgaste)"
    echo "   9. 24x48 (Plantão Extremo)"
    echo "   10. Horário Móvel (Eventos)"
    echo "   11. Alta Temporada (Sazonal)"
    echo ""
    echo "🔧 Próximos Passos:"
    echo "   1. Configure as credenciais no supabase/seed.js"
    echo "   2. Execute: ./scripts/run-seed.sh"
    echo "   3. Verifique os modelos na aplicação"
    echo ""
}

# Função principal
main() {
    echo "🚀 Iniciando verificação e execução do seed..."
    echo ""
    
    # Executar verificações
    check_node
    check_seed_file
    check_syntax
    check_table_exists
    
    # Verificar credenciais
    if check_credentials; then
        # Se as credenciais estão configuradas, executar o seed
        if run_seed; then
            log_success "🎉 Processo de seed concluído com sucesso!"
            echo ""
            echo "📊 11 modelos de escala foram inseridos no banco de dados"
            echo "🌐 Acesse a aplicação para verificar os modelos"
        else
            log_error "❌ Falha na execução do seed"
            exit 1
        fi
    else
        # Se as credenciais não estão configuradas, mostrar relatório
        generate_report
        exit 0
    fi
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main
fi
