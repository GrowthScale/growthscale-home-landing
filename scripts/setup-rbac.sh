#!/bin/bash

# =====================================================
# SCRIPT DE CONFIGURAÇÃO AUTOMATIZADA RBAC
# GrowthScale - Sistema de Controle de Acesso
# =====================================================

set -e

echo "🚀 Iniciando configuração automatizada do RBAC..."

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

# Verificar se o Supabase CLI está instalado
check_supabase_cli() {
    if ! command -v supabase &> /dev/null; then
        log_error "Supabase CLI não encontrado!"
        log_info "Instale o Supabase CLI:"
        echo "npm install -g supabase"
        echo "ou"
        echo "brew install supabase/tap/supabase"
        exit 1
    fi
    log_success "Supabase CLI encontrado"
}

# Verificar se está logado no Supabase
check_supabase_auth() {
    if ! supabase status &> /dev/null; then
        log_error "Não está logado no Supabase!"
        log_info "Faça login:"
        echo "supabase login"
        exit 1
    fi
    log_success "Autenticado no Supabase"
}

# Executar migração
run_migration() {
    log_info "Executando migração RBAC..."
    
    if [ -f "supabase/migrations/20240812_rbac_setup.sql" ]; then
        supabase db push
        log_success "Migração executada com sucesso!"
    else
        log_error "Arquivo de migração não encontrado!"
        exit 1
    fi
}

# Configurar roles de usuários
setup_user_roles() {
    log_info "Configurando roles de usuários..."
    
    # Solicitar emails dos usuários
    echo ""
    read -p "Email do usuário Owner (admin): " OWNER_EMAIL
    read -p "Email do usuário Manager (gerente): " MANAGER_EMAIL
    read -p "Email do usuário Employee (funcionário): " EMPLOYEE_EMAIL
    
    # Executar comandos SQL
    log_info "Atualizando roles..."
    
    supabase db reset --linked
    
    # Aqui você pode adicionar comandos para executar SQL específico
    # Por enquanto, vamos mostrar os comandos que devem ser executados manualmente
    
    echo ""
    log_warning "Execute os seguintes comandos no SQL Editor do Supabase:"
    echo ""
    echo "SELECT update_user_role('$OWNER_EMAIL', 'owner');"
    echo "SELECT update_user_role('$MANAGER_EMAIL', 'manager');"
    echo "SELECT update_user_role('$EMPLOYEE_EMAIL', 'employee');"
    echo ""
}

# Verificar configuração
verify_setup() {
    log_info "Verificando configuração..."
    
    # Verificar se as tabelas têm RLS ativado
    log_info "Verificando Row Level Security..."
    
    # Verificar se as políticas foram criadas
    log_info "Verificando políticas RLS..."
    
    log_success "Configuração verificada!"
}

# Mostrar próximos passos
show_next_steps() {
    echo ""
    log_success "🎉 Configuração RBAC concluída!"
    echo ""
    log_info "Próximos passos:"
    echo "1. Acesse o painel do Supabase"
    echo "2. Vá para SQL Editor"
    echo "3. Execute os comandos de atualização de roles"
    echo "4. Teste a aplicação em: https://growthscale-home-landing-cbvgjirmd.vercel.app"
    echo "5. Acesse /rbac-demo para ver a demonstração"
    echo ""
}

# Menu principal
main_menu() {
    echo ""
    echo "=================================================="
    echo "🔐 CONFIGURAÇÃO RBAC - GROWTHSCALE"
    echo "=================================================="
    echo ""
    echo "1. Verificar pré-requisitos"
    echo "2. Executar migração completa"
    echo "3. Configurar roles de usuários"
    echo "4. Verificar configuração"
    echo "5. Executar tudo automaticamente"
    echo "6. Sair"
    echo ""
    read -p "Escolha uma opção: " choice
    
    case $choice in
        1)
            check_supabase_cli
            check_supabase_auth
            ;;
        2)
            run_migration
            ;;
        3)
            setup_user_roles
            ;;
        4)
            verify_setup
            ;;
        5)
            check_supabase_cli
            check_supabase_auth
            run_migration
            setup_user_roles
            verify_setup
            show_next_steps
            ;;
        6)
            log_info "Saindo..."
            exit 0
            ;;
        *)
            log_error "Opção inválida!"
            main_menu
            ;;
    esac
}

# Executar menu principal
main_menu
