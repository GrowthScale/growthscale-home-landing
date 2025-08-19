# 🌱 Script de Seed - Modelos de Escala

Este script pré-popula a tabela `schedule_templates` com 11 modelos de escala padrão para o sistema GrowthScale.

## 📋 Modelos Incluídos

### 1. **6x1 (Padrão Varejo)**
- **Descrição:** Trabalha 6 dias e folga 1
- **Uso:** Restaurantes, fast-food, supermercados
- **Perfil de Custo:** Médio
- **Risco de Compliance:** Médio

### 2. **5x2 (Equilíbrio)**
- **Descrição:** Trabalha 5 dias e folga 2
- **Uso:** Administrativo, padarias, produção interna
- **Perfil de Custo:** Baixo
- **Risco de Compliance:** Baixo

### 3. **12x36 (Plantão Contínuo)**
- **Descrição:** Turnos de 12h de trabalho por 36h de descanso
- **Uso:** Hotéis, segurança de estoques, hospitais
- **Perfil de Custo:** Alto
- **Risco de Compliance:** Alto

### 4. **Turno Parcial (Pico de Demanda)**
- **Descrição:** Jornadas reduzidas de 4 ou 6 horas
- **Uso:** Fast-food, cafeterias, delivery
- **Perfil de Custo:** Baixo
- **Risco de Compliance:** Baixo

### 5. **Intermitente (Sob Demanda)**
- **Descrição:** Funcionário convocado conforme necessidade
- **Uso:** Eventos, buffets, reforço em picos
- **Perfil de Custo:** Baixo
- **Risco de Compliance:** Baixo

### 6. **5x1 (Operação Intensa)**
- **Descrição:** Cinco dias de trabalho por um de folga
- **Uso:** Cozinhas industriais, redes de varejo
- **Perfil de Custo:** Médio
- **Risco de Compliance:** Médio

### 7. **4x2 (Turnos Longos)**
- **Descrição:** Quatro dias de trabalho por dois de folga
- **Uso:** Hotelaria, catering, food service contínuo
- **Perfil de Custo:** Médio
- **Risco de Compliance:** Médio

### 8. **6x2 (Menor Desgaste)**
- **Descrição:** Seis dias de trabalho por dois de folga
- **Uso:** Padarias, restaurantes com folga dupla
- **Perfil de Custo:** Médio
- **Risco de Compliance:** Baixo

### 9. **24x48 (Plantão Extremo)**
- **Descrição:** Turnos de 24h de trabalho por 48h de descanso
- **Uso:** Operações logísticas especiais, emergências
- **Perfil de Custo:** Alto
- **Risco de Compliance:** Muito Alto

### 10. **Horário Móvel (Eventos)**
- **Descrição:** Horários variáveis conforme demanda
- **Uso:** Buffets, eventos, restaurantes sazonais
- **Perfil de Custo:** Baixo
- **Risco de Compliance:** Baixo

### 11. **Alta Temporada (Sazonal)**
- **Descrição:** Carga horária ampliada para picos
- **Uso:** Turismo, restaurantes em áreas sazonais
- **Perfil de Custo:** Alto
- **Risco de Compliance:** Alto

## 🚀 Como Executar

### 1. **Configure as Credenciais**
Edite o arquivo `supabase/seed.js` e substitua:
```javascript
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseKey = 'SUA_SERVICE_ROLE_KEY';
```

### 2. **Execute o Script**
```bash
# No diretório raiz do projeto
node supabase/seed.js
```

### 3. **Verifique o Resultado**
O script irá:
- ✅ Verificar se a tabela existe
- ✅ Limpar dados existentes
- ✅ Inserir os 11 modelos
- ✅ Mostrar confirmação

## 📊 Estrutura dos Dados

Cada modelo inclui:

```javascript
{
  name: 'Nome do Modelo',
  description: 'Descrição detalhada',
  template_data: {
    advantages: 'Vantagens do modelo',
    disadvantages: 'Desvantagens do modelo',
    cost_profile: 'Baixo/Médio/Alto',
    common_in: 'Setores onde é comum',
    work_days: 6, // Dias de trabalho
    rest_days: 1, // Dias de folga
    total_cycle: 7, // Ciclo total
    weekly_hours: 44, // Horas semanais
    compliance_risk: 'Baixo/Médio/Alto/Muito Alto',
    cost_efficiency: 'Baixa/Média/Alta/Muito Alta',
    employee_satisfaction: 'Baixa/Média/Alta'
  }
}
```

## ⚠️ Importante

- **Service Role Key:** Use apenas a Service Role Key, não a anon key
- **Backup:** Faça backup dos dados existentes antes de executar
- **Teste:** Execute primeiro em ambiente de desenvolvimento
- **Permissões:** Certifique-se de que a tabela `schedule_templates` existe

## 🔧 Troubleshooting

### Erro: "Tabela não encontrada"
```bash
# Execute primeiro o schema do banco
# Verifique se a tabela schedule_templates foi criada
```

### Erro: "Credenciais inválidas"
```bash
# Verifique se a URL e Service Role Key estão corretas
# Certifique-se de que a Service Role Key tem permissões adequadas
```

### Erro: "Permissão negada"
```bash
# Use a Service Role Key, não a anon key
# Verifique as políticas RLS da tabela
```

## 📈 Próximos Passos

Após executar o seed:
1. ✅ Verifique os modelos na aplicação
2. ✅ Teste a criação de escalas com os modelos
3. ✅ Personalize os modelos conforme necessário
4. ✅ Adicione novos modelos específicos do seu negócio

---

**🎯 Resultado:** 11 modelos de escala prontos para uso no sistema GrowthScale!
