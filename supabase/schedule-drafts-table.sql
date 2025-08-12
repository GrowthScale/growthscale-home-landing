-- Script para criar a tabela schedule_drafts
-- Execute este script no SQL Editor do Supabase

-- Criar a tabela schedule_drafts
CREATE TABLE IF NOT EXISTS public.schedule_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    target_week_start DATE NOT NULL,
    draft_data JSONB NOT NULL,
    status TEXT DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'dismissed')),
    
    -- Índices para performance
    CONSTRAINT unique_tenant_week UNIQUE (tenant_id, target_week_start)
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.schedule_drafts ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para schedule_drafts
-- Política para visualizar rascunhos do próprio tenant
CREATE POLICY "Users can view schedule drafts from their company" ON public.schedule_drafts
    FOR SELECT USING (
        tenant_id IN (
            SELECT company_id FROM public.employees 
            WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Política para inserir rascunhos (apenas para funções do sistema)
CREATE POLICY "System can insert schedule drafts" ON public.schedule_drafts
    FOR INSERT WITH CHECK (true);

-- Política para atualizar rascunhos do próprio tenant
CREATE POLICY "Users can update schedule drafts from their company" ON public.schedule_drafts
    FOR UPDATE USING (
        tenant_id IN (
            SELECT company_id FROM public.employees 
            WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Política para deletar rascunhos do próprio tenant
CREATE POLICY "Users can delete schedule drafts from their company" ON public.schedule_drafts
    FOR DELETE USING (
        tenant_id IN (
            SELECT company_id FROM public.employees 
            WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_schedule_drafts_updated_at 
    BEFORE UPDATE ON public.schedule_drafts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_schedule_drafts_tenant_id ON public.schedule_drafts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_schedule_drafts_target_week_start ON public.schedule_drafts(target_week_start);
CREATE INDEX IF NOT EXISTS idx_schedule_drafts_status ON public.schedule_drafts(status);
CREATE INDEX IF NOT EXISTS idx_schedule_drafts_created_at ON public.schedule_drafts(created_at);

-- Comentários para documentação
COMMENT ON TABLE public.schedule_drafts IS 'Tabela para armazenar rascunhos de escala gerados automaticamente pela IA';
COMMENT ON COLUMN public.schedule_drafts.tenant_id IS 'ID da empresa/tenant que possui este rascunho';
COMMENT ON COLUMN public.schedule_drafts.target_week_start IS 'Data de início da semana para a qual o rascunho foi gerado';
COMMENT ON COLUMN public.schedule_drafts.draft_data IS 'Dados completos da escala sugerida pela IA em formato JSONB';
COMMENT ON COLUMN public.schedule_drafts.status IS 'Status do rascunho: pending_review, approved, dismissed';
