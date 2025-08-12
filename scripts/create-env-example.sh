#!/bin/bash

# =====================================================
# SCRIPT PARA CRIAR ARQUIVO DE EXEMPLO DE CONFIGURAÇÃO
# GrowthScale - Configuração do Supabase
# =====================================================

echo "🔧 Criando arquivo de exemplo de configuração..."

# Criar arquivo .env.example
cat > .env.example << 'EOF'
# =====================================================
# CONFIGURAÇÃO SUPABASE - GROWTHSCALE
# =====================================================

# URL do projeto Supabase
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Chave anônima do Supabase
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# =====================================================
# CONFIGURAÇÕES ADICIONAIS
# =====================================================

# URL da aplicação
VITE_APP_URL=https://your-app-url.vercel.app

# Ambiente (development, staging, production)
VITE_ENV=development

# =====================================================
# INSTRUÇÕES DE CONFIGURAÇÃO
# =====================================================
# 1. Copie este arquivo para .env.local
# 2. Substitua os valores pelos reais do seu projeto Supabase
# 3. Execute o script SQL no Supabase
# 4. Configure os roles dos usuários
EOF

echo "✅ Arquivo .env.example criado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Copie .env.example para .env.local"
echo "2. Configure as variáveis do Supabase"
echo "3. Execute o script SQL no Supabase"
echo "4. Teste a aplicação"
echo ""
