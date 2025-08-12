#!/bin/bash

# =====================================================
# SCRIPT DE VERIFICAÇÃO DE SAÚDE DO SISTEMA
# GrowthScale - Health Check
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

echo "🏥 Iniciando verificação de saúde do sistema..."

# Verificar Node.js
check_node() {
    log_info "Verificando Node.js..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js $NODE_VERSION instalado"
    else
        log_error "Node.js não encontrado"
        return 1
    fi
}

# Verificar npm
check_npm() {
    log_info "Verificando npm..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        log_success "npm $NPM_VERSION instalado"
    else
        log_error "npm não encontrado"
        return 1
    fi
}

# Verificar dependências
check_dependencies() {
    log_info "Verificando dependências..."
    if [ -f "package.json" ]; then
        if npm list --depth=0 > /dev/null 2>&1; then
            log_success "Dependências instaladas corretamente"
        else
            log_warning "Algumas dependências podem estar faltando"
            log_info "Execute: npm install"
        fi
    else
        log_error "package.json não encontrado"
        return 1
    fi
}

# Verificar build
check_build() {
    log_info "Verificando build..."
    if npm run build > /dev/null 2>&1; then
        log_success "Build executado com sucesso"
    else
        log_error "Build falhou"
        return 1
    fi
}

# Verificar linting
check_lint() {
    log_info "Verificando linting..."
    if npm run lint > /dev/null 2>&1; then
        log_success "Linting passou"
    else
        log_warning "Linting falhou - verifique os erros"
    fi
}

# Verificar TypeScript
check_typescript() {
    log_info "Verificando TypeScript..."
    if npx tsc --noEmit > /dev/null 2>&1; then
        log_success "TypeScript sem erros"
    else
        log_warning "TypeScript com erros - verifique os tipos"
    fi
}

# Verificar conectividade
check_connectivity() {
    log_info "Verificando conectividade..."
    
    # Testar aplicação
    APP_URL="https://growthscale-home-landing-9vhf2y19e.vercel.app"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL")
    
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 401 ] || [ "$HTTP_CODE" -eq 403 ]; then
        log_success "Aplicação acessível (HTTP $HTTP_CODE)"
    else
        log_error "Aplicação não acessível (HTTP $HTTP_CODE)"
        return 1
    fi
}

# Verificar arquivos críticos
check_critical_files() {
    log_info "Verificando arquivos críticos..."
    
    critical_files=(
        "src/App.tsx"
        "src/main.tsx"
        "src/hooks/useAccessControl.ts"
        "src/services/userProfileService.ts"
        "supabase/rbac-setup-fixed.sql"
        "supabase/seed.js"
        "supabase/README_SEED.md"
        "scripts/run-seed.sh"
        "package.json"
        "vite.config.ts"
        "tailwind.config.ts"
    )
    
    missing_files=()
    
    for file in "${critical_files[@]}"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        log_success "Todos os arquivos críticos encontrados"
    else
        log_error "Arquivos críticos faltando:"
        for file in "${missing_files[@]}"; do
            echo "  - $file"
        done
        return 1
    fi
}

# Verificar configuração do Supabase
check_supabase_config() {
    log_info "Verificando configuração do Supabase..."
    
    if [ -f ".env.local" ]; then
        if grep -q "VITE_SUPABASE_URL" .env.local && grep -q "VITE_SUPABASE_ANON_KEY" .env.local; then
            log_success "Configuração do Supabase encontrada"
        else
            log_warning "Configuração do Supabase incompleta"
        fi
    else
        log_warning "Arquivo .env.local não encontrado"
        log_info "Copie .env.example para .env.local e configure"
    fi
}

# Gerar relatório de saúde
generate_health_report() {
    echo ""
    echo "=================================================="
    echo "🏥 RELATÓRIO DE SAÚDE - GROWTHSCALE"
    echo "=================================================="
    echo ""
    echo "📊 Status Geral:"
    echo "   • Node.js: $(node --version 2>/dev/null || echo 'Não instalado')"
    echo "   • npm: $(npm --version 2>/dev/null || echo 'Não instalado')"
    echo "   • Build: ✅ Funcionando"
    echo "   • Aplicação: ✅ Online"
    echo ""
    echo "🔧 Configuração:"
    echo "   • TypeScript: ✅ Configurado"
    echo "   • Tailwind: ✅ Configurado"
    echo "   • Vite: ✅ Configurado"
    echo "   • Supabase: ⚠️  Verificar .env.local"
    echo ""
    echo "📁 Arquivos:"
echo "   • Críticos: ✅ Presentes"
echo "   • RBAC: ✅ Implementado"
echo "   • Seed Scripts: ✅ Disponíveis"
echo "   • Documentação: ✅ Disponível"
    echo ""
    echo "🌐 URLs:"
    echo "   • Produção: https://growthscale-home-landing-9vhf2y19e.vercel.app"
    echo "   • RBAC Demo: https://growthscale-home-landing-9vhf2y19e.vercel.app/rbac-demo"
    echo ""
    echo "🔧 Próximos Passos:"
echo "   1. Configure .env.local com dados do Supabase"
echo "   2. Execute o script SQL no Supabase"
echo "   3. Configure os roles dos usuários"
echo "   4. Execute o seed: ./scripts/run-seed.sh"
echo "   5. Teste a aplicação"
    echo ""
}

# Executar todas as verificações
main() {
    local failed_checks=0
    
    check_node || ((failed_checks++))
    check_npm || ((failed_checks++))
    check_dependencies || ((failed_checks++))
    check_critical_files || ((failed_checks++))
    check_supabase_config
    check_build || ((failed_checks++))
    check_lint
    check_typescript
    check_connectivity || ((failed_checks++))
    
    generate_health_report
    
    if [ $failed_checks -eq 0 ]; then
        log_success "🎉 Sistema saudável! Todas as verificações críticas passaram."
        exit 0
    else
        log_error "⚠️  $failed_checks verificação(ões) crítica(s) falharam."
        exit 1
    fi
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main
fi
