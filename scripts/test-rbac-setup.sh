#!/bin/bash

# =====================================================
# SCRIPT DE TESTE AUTOMATIZADO RBAC
# GrowthScale - Teste da Configuração
# =====================================================

set -e

echo "🧪 Iniciando testes automatizados do RBAC..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
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

# Verificar se o curl está disponível
check_curl() {
    if ! command -v curl &> /dev/null; then
        log_error "curl não encontrado!"
        exit 1
    fi
    log_success "curl encontrado"
}

# Testar conectividade com a aplicação
test_app_connectivity() {
    log_info "Testando conectividade com a aplicação..."
    
    APP_URL="https://growthscale-home-landing-9vhf2y19e.vercel.app"
    
    # Testar se a aplicação responde (mesmo com 401/403 é normal)
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL")
    
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 401 ] || [ "$HTTP_CODE" -eq 403 ]; then
        log_success "Aplicação está online: $APP_URL (HTTP $HTTP_CODE)"
        return 0
    else
        log_error "Aplicação não está acessível: $APP_URL (HTTP $HTTP_CODE)"
        return 1
    fi
}

# Testar página RBAC Demo
test_rbac_demo() {
    log_info "Testando página RBAC Demo..."
    
    APP_URL="https://growthscale-home-landing-9vhf2y19e.vercel.app"
    RBAC_URL="$APP_URL/rbac-demo"
    
    # Testar se a página responde (mesmo com 401/403 é normal)
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$RBAC_URL")
    
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 401 ] || [ "$HTTP_CODE" -eq 403 ]; then
        log_success "Página RBAC Demo está acessível: $RBAC_URL (HTTP $HTTP_CODE)"
        return 0
    else
        log_warning "Página RBAC Demo pode não estar disponível (HTTP $HTTP_CODE)"
        return 0
    fi
}

# Verificar variáveis de ambiente do Supabase
check_supabase_env() {
    log_info "Verificando configuração do Supabase..."
    
    if [ -f ".env.local" ]; then
        log_success "Arquivo .env.local encontrado"
        
        if grep -q "VITE_SUPABASE_URL" .env.local; then
            log_success "VITE_SUPABASE_URL configurado"
        else
            log_warning "VITE_SUPABASE_URL não encontrado"
        fi
        
        if grep -q "VITE_SUPABASE_ANON_KEY" .env.local; then
            log_success "VITE_SUPABASE_ANON_KEY configurado"
        else
            log_warning "VITE_SUPABASE_ANON_KEY não encontrado"
        fi
    else
        log_warning "Arquivo .env.local não encontrado"
    fi
}

# Verificar arquivos do projeto
check_project_files() {
    log_info "Verificando arquivos do projeto..."
    
    # Verificar arquivos principais
    files_to_check=(
        "src/hooks/useAccessControl.ts"
        "src/services/userProfileService.ts"
        "src/components/AccessControl.tsx"
        "src/pages/RBACDemo.tsx"
        "supabase/rbac-setup-fixed.sql"
        "docs/RBAC_SETUP.md"
        "docs/RBAC_AUTOMATION.md"
    )
    
    for file in "${files_to_check[@]}"; do
        if [ -f "$file" ]; then
            log_success "✅ $file"
        else
            log_error "❌ $file (não encontrado)"
        fi
    done
}

# Verificar dependências
check_dependencies() {
    log_info "Verificando dependências..."
    
    if [ -f "package.json" ]; then
        log_success "package.json encontrado"
        
        # Verificar se @supabase/supabase-js está instalado
        if grep -q "@supabase/supabase-js" package.json; then
            log_success "Supabase JS SDK instalado"
        else
            log_warning "Supabase JS SDK pode não estar instalado"
        fi
        
        # Verificar se lucide-react está instalado
        if grep -q "lucide-react" package.json; then
            log_success "Lucide React instalado"
        else
            log_warning "Lucide React pode não estar instalado"
        fi
    else
        log_error "package.json não encontrado"
    fi
}

# Verificar build
check_build() {
    log_info "Verificando se o projeto compila..."
    
    if npm run build > /dev/null 2>&1; then
        log_success "Projeto compila sem erros"
    else
        log_error "Projeto não compila - verifique os erros"
        return 1
    fi
}

# Gerar relatório de status
generate_status_report() {
    log_info "Gerando relatório de status..."
    
    echo ""
    echo "=================================================="
    echo "📊 RELATÓRIO DE STATUS - RBAC GROWTHSCALE"
    echo "=================================================="
    echo ""
    echo "🌐 URLs:"
    echo "   • Aplicação: https://growthscale-home-landing-9vhf2y19e.vercel.app"
    echo "   • RBAC Demo: https://growthscale-home-landing-9vhf2y19e.vercel.app/rbac-demo"
    echo ""
    echo "📁 Arquivos Principais:"
    echo "   • Hook RBAC: src/hooks/useAccessControl.ts"
    echo "   • Serviço: src/services/userProfileService.ts"
    echo "   • Componentes: src/components/AccessControl.tsx"
    echo "   • Página Demo: src/pages/RBACDemo.tsx"
    echo "   • Script SQL: supabase/rbac-setup-fixed.sql"
    echo ""
    echo "📚 Documentação:"
    echo "   • Setup: docs/RBAC_SETUP.md"
    echo "   • Automação: docs/RBAC_AUTOMATION.md"
    echo ""
    echo "🔧 Próximos Passos:"
    echo "   1. Execute o script SQL no Supabase"
    echo "   2. Configure os roles dos usuários"
    echo "   3. Teste a aplicação"
    echo "   4. Acesse /rbac-demo para ver a demonstração"
    echo ""
}

# Menu principal
main_menu() {
    echo ""
    echo "=================================================="
    echo "🧪 TESTE RBAC - GROWTHSCALE"
    echo "=================================================="
    echo ""
    echo "1. Verificar conectividade"
    echo "2. Verificar arquivos do projeto"
    echo "3. Verificar dependências"
    echo "4. Testar build"
    echo "5. Executar todos os testes"
    echo "6. Gerar relatório completo"
    echo "7. Sair"
    echo ""
    read -p "Escolha uma opção: " choice
    
    case $choice in
        1)
            check_curl
            test_app_connectivity
            test_rbac_demo
            ;;
        2)
            check_project_files
            ;;
        3)
            check_dependencies
            ;;
        4)
            check_build
            ;;
        5)
            check_curl
            test_app_connectivity
            test_rbac_demo
            check_supabase_env
            check_project_files
            check_dependencies
            check_build
            generate_status_report
            ;;
        6)
            generate_status_report
            ;;
        7)
            log_info "Saindo..."
            exit 0
            ;;
        *)
            log_error "Opção inválida!"
            main_menu
            ;;
    esac
}

# Executar testes automáticos se não houver argumentos
if [ $# -eq 0 ]; then
    check_curl
    test_app_connectivity
    test_rbac_demo
    check_supabase_env
    check_project_files
    check_dependencies
    check_build
    generate_status_report
else
    main_menu
fi
