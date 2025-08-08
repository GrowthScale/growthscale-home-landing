# Guia Completo - Sistema de Modelos de Escala (Templates)

## 📋 Visão Geral

O sistema de templates permite criar, gerenciar e aplicar modelos pré-definidos de escalas, agilizando o processo de criação de escalas recorrentes.

## 🚀 Como Usar

### 1. Acessando o Sistema de Templates

1. **Navegue até Escalas:**
   - Acesse a aplicação
   - Vá para "Escalas" no menu
   - Clique em "Nova Escala"

2. **Abra o Gerenciador:**
   - No editor de escalas, procure o card "Modelos de Escala"
   - Clique em "Gerenciar Templates"

### 2. Criando um Novo Template

1. **Clique em "Novo Template"**
2. **Preencha os dados:**
   - **Nome:** Nome descritivo do template (ex: "Escala Padrão - Segunda a Sexta")
   - **Descrição:** Descrição detalhada do template
3. **Clique em "Criar Template"**

### 3. Editando um Template

1. **Localize o template** na lista
2. **Clique no ícone de edição** (lápis)
3. **Modifique os dados** conforme necessário
4. **Clique em "Atualizar Template"**

### 4. Aplicando um Template

1. **No gerenciador de templates:**
   - Localize o template desejado
   - Clique em "Usar Template"

2. **No editor de escalas:**
   - O template será aplicado automaticamente
   - Os funcionários padrão serão selecionados
   - As observações serão atualizadas

## 📊 Estrutura de Dados

### Template Data (JSONB)

```json
{
  "shifts": [
    {
      "dayOfWeek": 1,           // 0=Domingo, 1=Segunda, ..., 6=Sábado
      "startTime": "08:00",      // Formato HH:mm
      "endTime": "17:00",        // Formato HH:mm
      "requiredEmployees": 3,    // Número de funcionários necessários
      "skills": ["atendimento"]  // Habilidades necessárias (opcional)
    }
  ],
  "employees": ["emp-1", "emp-2"], // IDs dos funcionários padrão
  "notes": "Template para escala padrão" // Observações
}
```

### Exemplos de Templates

#### Template 1: Escala Comercial
```json
{
  "name": "Escala Comercial - Segunda a Sexta",
  "description": "Escala padrão para equipe comercial",
  "template_data": {
    "shifts": [
      {
        "dayOfWeek": 1,
        "startTime": "08:00",
        "endTime": "18:00",
        "requiredEmployees": 4,
        "skills": ["vendas", "atendimento"]
      },
      {
        "dayOfWeek": 2,
        "startTime": "08:00",
        "endTime": "18:00",
        "requiredEmployees": 4,
        "skills": ["vendas", "atendimento"]
      }
    ],
    "employees": ["emp-001", "emp-002", "emp-003", "emp-004"],
    "notes": "Escala para equipe comercial com foco em vendas"
  }
}
```

#### Template 2: Escala de Fim de Semana
```json
{
  "name": "Escala Fim de Semana",
  "description": "Escala para sábados e domingos",
  "template_data": {
    "shifts": [
      {
        "dayOfWeek": 6,
        "startTime": "09:00",
        "endTime": "17:00",
        "requiredEmployees": 2,
        "skills": ["atendimento"]
      },
      {
        "dayOfWeek": 0,
        "startTime": "10:00",
        "endTime": "16:00",
        "requiredEmployees": 1,
        "skills": ["atendimento"]
      }
    ],
    "employees": ["emp-005", "emp-006"],
    "notes": "Escala reduzida para fins de semana"
  }
}
```

## 🔧 Funcionalidades Avançadas

### Multi-tenancy
- Cada empresa tem seus próprios templates
- Templates são isolados por `tenant_id`
- Políticas RLS garantem segurança

### Preview de Turnos
- Visualização dos turnos configurados
- Estatísticas de funcionários necessários
- Informações de habilidades requeridas

### Aplicação Automática
- Templates aplicam funcionários automaticamente
- Observações são atualizadas
- Feedback visual com toasts

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Template não aparece na lista
**Solução:**
- Verifique se o usuário tem permissão
- Confirme se o `tenant_id` está correto
- Verifique as políticas RLS

#### 2. Erro ao criar template
**Solução:**
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme se o JSON está no formato correto
- Verifique a conexão com o Supabase

#### 3. Template não aplica funcionários
**Solução:**
- Verifique se os IDs dos funcionários existem
- Confirme se o `template_data.employees` está correto
- Verifique se os funcionários estão ativos

### Logs de Debug

Para debugar problemas, verifique:

1. **Console do navegador:**
   - Erros de rede
   - Erros de JavaScript

2. **Logs do Supabase:**
   - Acesse o painel do Supabase
   - Vá para "Logs"
   - Verifique as queries executadas

## 📈 Melhorias Futuras

### Planejadas
- [ ] Editor visual de templates
- [ ] Categorização de templates
- [ ] Templates padrão por setor
- [ ] Importação/exportação de templates
- [ ] Versionamento de templates

### Sugeridas
- [ ] Templates baseados em IA
- [ ] Integração com calendário
- [ ] Templates sazonais
- [ ] Compartilhamento de templates entre empresas
- [ ] Analytics de uso de templates

## 📞 Suporte

Para dúvidas ou problemas:

1. **Verifique a documentação** primeiro
2. **Teste em ambiente de desenvolvimento**
3. **Consulte os logs** de erro
4. **Entre em contato** com a equipe de desenvolvimento

---

*Última atualização: 2024-12-19*
*Versão: 1.0.0*
