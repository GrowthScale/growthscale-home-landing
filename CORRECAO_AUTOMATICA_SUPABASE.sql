-- 🔧 CORREÇÃO AUTOMÁTICA DO SUPABASE
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Verificar configuração atual
SELECT 
  'CONFIGURAÇÃO ATUAL:' as info,
  auth.config() as current_config;

-- 2. Atualizar configuração de autenticação
UPDATE auth.config 
SET 
  site_url = 'https://growthscale-home-landing-60dy6g4if.vercel.app',
  redirect_urls = ARRAY[
    'https://growthscale-home-landing-60dy6g4if.vercel.app/auth/callback',
    'https://growthscale-home-landing-60dy6g4if.vercel.app/auth',
    'http://localhost:3000/auth/callback',
    'http://localhost:3000/auth'
  ]
WHERE id = 1;

-- 3. Verificar se a atualização foi aplicada
SELECT 
  'CONFIGURAÇÃO ATUALIZADA:' as info,
  auth.config() as new_config;

-- 4. Limpar cache de configuração
SELECT auth.clear_cache();

-- 5. Verificar status final
SELECT 
  'STATUS FINAL:' as info,
  'Configuração atualizada com sucesso!' as message;
