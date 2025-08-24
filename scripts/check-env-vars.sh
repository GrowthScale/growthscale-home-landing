#!/bin/bash

echo "🔧 VERIFICANDO VARIÁVEIS DE AMBIENTE NO VERCEL"
echo "=============================================="

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não está instalado. Instale com: npm i -g vercel"
    exit 1
fi

echo ""
echo "📋 VARIÁVEIS NECESSÁRIAS:"
echo "1. VITE_SITE_URL = https://growthscale-home-landing.vercel.app"
echo "2. VITE_SUPABASE_URL = [sua-url-do-supabase]"
echo "3. VITE_SUPABASE_ANON_KEY = [sua-chave-anonima]"
echo ""

echo "🔍 Verificando variáveis atuais..."
vercel env ls

echo ""
echo "⚠️  AÇÃO MANUAL NECESSÁRIA:"
echo ""
echo "1. Vá para: https://vercel.com/dashboard"
echo "2. Selecione o projeto: growthscale-home-landing"
echo "3. Vá para: Settings > Environment Variables"
echo "4. Adicione/atualize as seguintes variáveis:"
echo ""
echo "   Nome: VITE_SITE_URL"
echo "   Valor: https://growthscale-home-landing.vercel.app"
echo "   Environment: Production, Preview, Development"
echo ""
echo "   Nome: VITE_SUPABASE_URL"
echo "   Valor: [sua-url-do-supabase]"
echo "   Environment: Production, Preview, Development"
echo ""
echo "   Nome: VITE_SUPABASE_ANON_KEY"
echo "   Valor: [sua-chave-anonima]"
echo "   Environment: Production, Preview, Development"
echo ""
echo "5. Clique em 'Save'"
echo "6. Faça um novo deploy: vercel --prod"
echo ""

echo "🎯 PROBLEMA ATUAL:"
echo "O redirecionamento está indo para localhost:3000 porque a variável"
echo "VITE_SITE_URL não está configurada corretamente no Vercel."
echo ""

echo "✅ APÓS CONFIGURAR AS VARIÁVEIS:"
echo "- O cadastro funcionará corretamente"
echo "- Os redirecionamentos serão para a URL de produção"
echo "- O AuthCallback processará a confirmação de email"
echo "- A empresa será criada automaticamente"
echo ""
