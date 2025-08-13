# Design System GrowthScale
## Plataforma de Gestão de Escalas com IA + CLT para Food Service

---

## 1. BRANDING & IDENTIDADE VISUAL

### Essência de Marca
- **Confiável**: Segurança jurídica e compliance CLT
- **Inteligente**: IA que otimiza escalas automaticamente
- **Prático**: Solução simples para problemas complexos
- **Econômico**: Redução de custos e riscos trabalhistas
- **Humano**: Foco no bem-estar dos funcionários

### Tom & Voz

| **Dizer** | **Evitar Dizer** |
|-----------|------------------|
| "Crie escalas perfeitas em minutos" | "Sistema avançado de gestão de recursos humanos" |
| "Fique 100% dentro da lei" | "Compliance total com a legislação trabalhista" |
| "Economize até 30% em mão de obra" | "Otimização de custos operacionais" |
| "Simples como WhatsApp" | "Interface intuitiva e user-friendly" |
| "Sem dor de cabeça com CLT" | "Eliminação de riscos trabalhistas" |

### Paleta de Cores Oficial

#### Primária (Confiança)
- **Azul Profundo**: `#004AAD`
- **Azul Médio**: `#0066CC`
- **Azul Claro**: `#1A85FF`
- **Azul Suave**: `#E6F0FF`

#### Secundária CTA (Ação/Dopamina)
- **Laranja**: `#FF6B00`
- **Laranja Claro**: `#FF8533`
- **Laranja Suave**: `#FFE6CC`

#### Neutros
- **Fundo**: `#F5F6FA`
- **Fundo Card**: `#FFFFFF`
- **Texto Primário**: `#2C2C2C`
- **Texto Secundário**: `#6B7280`
- **Borda**: `#E5E7EB`
- **Borda Suave**: `#F3F4F6`

#### Feedback
- **Sucesso**: `#00B37E`
- **Alerta**: `#E63946`
- **Info**: `#2563EB`
- **Aviso**: `#F59E0B`

#### Escala de Cores (50→900)
```
Azul: 50:#E6F0FF, 100:#CCE0FF, 200:#99C2FF, 300:#66A3FF, 400:#3385FF, 500:#0066CC, 600:#004AAD, 700:#003380, 800:#001F52, 900:#001025
Neutro: 50:#F9FAFB, 100:#F3F4F6, 200:#E5E7EB, 300:#D1D5DB, 400:#9CA3AF, 500:#6B7280, 600:#4B5563, 700:#374151, 800:#1F2937, 900:#111827
```

### Uso Correto/Errado

#### ✅ Correto
- Texto escuro em fundo claro (contraste 4.5:1+)
- CTA laranja em fundo branco
- Azul para links e navegação
- Verde para sucessos, vermelho para erros

#### ❌ Errado
- Texto cinza claro em fundo branco
- CTA azul (perde destaque)
- Cores inconsistentes para estados
- Contraste insuficiente

### Biblioteca de Ícones
- **Estilo**: Outlined com peso médio
- **Biblioteca**: Lucide React / Heroicons
- **Tamanho padrão**: 20px (mobile), 24px (desktop)
- **Cor**: `#6B7280` (neutro)

### Banco de Imagens
- **Contexto**: Restaurantes e bares reais do Brasil
- **Evitar**: Imagens "stockadas" e genéricas
- **Foco**: Ambiente de trabalho autêntico
- **Pessoas**: Diversidade real, não modelos

---

## 2. TIPOGRAFIA & TYPE SCALE

### Famílias
- **Títulos**: Montserrat (Bold, SemiBold)
- **Corpo**: Inter (Regular, Medium, SemiBold)

### Escala Tipográfica

| Elemento | Fonte | Tamanho | Peso | Altura | Tracking |
|----------|-------|---------|------|--------|----------|
| H1 | Montserrat | 32px | Bold | 1.2 | -0.5px |
| H2 | Montserrat | 28px | SemiBold | 1.3 | -0.3px |
| H3 | Montserrat | 24px | SemiBold | 1.4 | -0.2px |
| H4 | Montserrat | 20px | Medium | 1.4 | 0px |
| H5 | Inter | 18px | SemiBold | 1.5 | 0px |
| H6 | Inter | 16px | Medium | 1.5 | 0px |
| Body | Inter | 16px | Regular | 1.6 | 0px |
| Small | Inter | 14px | Regular | 1.5 | 0px |
| Caption | Inter | 12px | Regular | 1.4 | 0.5px |

### Diretrizes de Legibilidade
- **Comprimento de linha**: Máximo 65 caracteres
- **Contraste mínimo**: 4.5:1
- **Hierarquia**: Use peso e tamanho para criar ordem visual
- **Espaçamento**: 1.5x altura da linha entre parágrafos

---

## 3. DESIGN SYSTEM (TOKENS + COMPONENTES)

### Design Tokens (JSON)
```json
{
  "colors": {
    "primary": {
      "50": "#E6F0FF",
      "500": "#004AAD",
      "600": "#0066CC",
      "700": "#1A85FF"
    },
    "secondary": {
      "500": "#FF6B00",
      "400": "#FF8533"
    },
    "neutral": {
      "50": "#F5F6FA",
      "100": "#FFFFFF",
      "500": "#6B7280",
      "900": "#2C2C2C"
    },
    "feedback": {
      "success": "#00B37E",
      "error": "#E63946",
      "warning": "#F59E0B",
      "info": "#2563EB"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "32px",
    "3xl": "48px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px"
  },
  "shadows": {
    "xs": "0 1px 2px rgba(0,0,0,0.05)",
    "sm": "0 1px 3px rgba(0,0,0,0.1)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.1)"
  }
}
```

### Componentes Obrigatórios

#### Botões
- **Primário**: Azul `#004AAD`, altura 44px
- **CTA**: Laranja `#FF6B00`, altura 48px
- **Secundário**: Contorno azul, fundo transparente
- **Estados**: Hover, Focus, Disabled, Loading

#### Inputs
- **Altura**: 44px (mobile-friendly)
- **Borda**: `#E5E7EB`, foco `#004AAD`
- **Placeholder**: `#9CA3AF`
- **Erro**: Borda vermelha + ícone

#### Tabela de Escalas
- **Colunas**: Funcionário, Turno, Horário, Status, Ações
- **Estados**: Publicada, Pendente, Em revisão
- **Paginação**: 10 itens por página

#### Cards
- **Métricas**: Valor grande + label + ícone
- **Alertas CLT**: Fundo amarelo suave + ícone
- **Economia**: Fundo verde suave + valor

#### Modal "Publicar Escala"
- **Resumo**: Funcionários, turnos, custo total
- **Compliance**: Lista de verificações CLT
- **CTA**: "Publicar e Enviar WhatsApp"

#### Stepper (Onboarding)
1. Cadastro da empresa
2. Importar funcionários
3. Configurar turnos
4. Gerar primeira escala

---

## 4. ARQUITETURA DE PÁGINAS & FLUXOS

### Mapa do Site
```
Home (Marketing)
├── Preços
├── Login
├── Cadastro
└── App Dashboard
    ├── Escalas
    ├── Funcionários
    ├── Relatórios
    ├── Configurações
    └── Ajuda/FAQ
```

### Fluxos Críticos

#### Onboarding em 5 minutos
1. **Cadastro** → Nome, email, senha
2. **Importar funcionários** → CSV ou manual
3. **Configurar turnos** → Seleção de modelos
4. **Gerar Escala 1-Click** → IA otimiza
5. **Enviar WhatsApp** → Confirmação automática

#### Gerar Escala 1-Click
1. **Regras CLT** → Verificação automática
2. **Disponibilidade** → Check funcionários
3. **Previsão demanda** → IA analisa histórico
4. **Simulador 3 cenários**:
   - Mais barato (otimiza custo)
   - Mais justo (equilibra carga)
   - Equilibrado (meio termo)
5. **Publicar** → Confirmação + WhatsApp

#### Confirmação via WhatsApp
1. **Disparo automático** → Template personalizado
2. **Captura resposta** → API WhatsApp Business
3. **Status dashboard** → Visualização em tempo real

---

## 5. UI/UX HEURÍSTICAS & DOPAMINA

### Heurísticas
- **Visibilidade do status**: Progress bars, badges de status
- **Feedback imediato**: Toasts, confete ao publicar
- **Prevenção de erro**: Validação em tempo real
- **Reconhecimento**: Ícones familiares, padrões consistentes

### Gatilhos Dopaminérgicos
- **Micro-vitórias**: Confete ao publicar escala sem infração
- **Progress bar**: Onboarding com etapas visuais
- **Badges**: "Semana 100% dentro da lei", "Economia >R$500"
- **Comparativos**: Gráficos mês a mês de economia
- **Mensagens positivas**: "Escala otimizada! 30% mais econômica"

### Diretrizes Mobile
- **Alvos de toque**: Mínimo 44px
- **Fonte mínima**: 16px
- **CTA sticky**: Sempre visível
- **Navegação**: Bottom tabs para principais seções

---

## 6. COPYWRITING (COPY DE ALTO DESEMPENHO)

### Home (Marketing)

#### H1 Principal
"Crie escalas perfeitas em minutos e fique 100% dentro da lei"

#### Prova de Valor
- "Reduza até 30% o custo de mão de obra"
- "Economize 8 horas por semana na gestão"
- "Elimine 100% dos riscos trabalhistas"

#### Prova Social
- "Usado por 500+ restaurantes no Brasil"
- "4.8/5 estrelas no Google"
- "Economia média de R$2.500/mês"

#### Seção IA + CLT
"Nosso robô entende a CLT melhor que qualquer advogado. Ele cria escalas que respeitam todos os direitos dos seus funcionários, automaticamente."

#### CTAs
- **Primário**: "Gerar minha escala agora"
- **Secundário**: "Ver demo de 3 minutos"

### App (Dashboard)

#### Empty States
- "Nenhuma escala criada ainda"
- "Clique em 'Nova Escala' para começar"
- "Sua primeira escala será criada em 2 minutos"

#### Tooltips
- "Este ícone indica que a escala está dentro da lei"
- "Clique para ver detalhes do funcionário"
- "Arraste para reordenar turnos"

#### Toasts
- "Escala publicada com sucesso! ✅"
- "WhatsApp enviado para 12 funcionários 📱"
- "Economia de R$450 detectada 💰"

### WhatsApp Templates

#### Confirmação de Turno
"Olá {nome}! Você está escalado para {dia} das {horário_início} às {horário_fim}. Confirma presença? Responda SIM ou NÃO."

#### Lembrete
"Lembrete: Seu turno começa em 2 horas. Confirma presença?"

#### Troca de Turno
"Proposta de troca: {funcionário} quer trocar turno com você. {detalhes}. Aceita? Responda SIM ou NÃO."

### Mensagens de Erro
- "Ops! Algo deu errado. Tente novamente em 30 segundos"
- "Funcionário não encontrado. Verifique o nome e tente novamente"
- "Escala com conflito CLT. Clique para ver detalhes e corrigir"

---

## 7. ACESSIBILIDADE, PERFORMANCE E QUALIDADE

### WCAG AA
- **Contraste**: Mínimo 4.5:1 para texto normal
- **Foco visível**: Outline azul em todos elementos interativos
- **Labels**: Todos inputs com labels associados
- **ARIA**: Atributos para tabelas, modais, dropdowns

### Performance
- **Lazy-load**: Imagens e componentes pesados
- **Compressão**: WebP/AVIF para imagens
- **Fontes**: `display=swap` para carregamento rápido
- **Bundle**: Code splitting por rota

### Estados Offline
- **Cache**: Dados essenciais em localStorage
- **Sync**: Sincronização quando online
- **Indicador**: Badge "offline" quando sem conexão

### Checklist UX
- [ ] Tarefa completa em ≤3 cliques?
- [ ] Leitura de informação em ≤5s?
- [ ] CTA sempre visível?
- [ ] Feedback imediato em todas ações?
- [ ] Estados de loading claros?

---

## 8. MÓDULOS "PÉ NO CHÃO"

### Escala 1-Click (M0)
**Objetivo**: Gerar escala otimizada em um clique
**Telas**: Dashboard → Gerar → Resultado
**Componentes**: Botão grande, progress bar, cards de resultado
**Copy**: "Gerar Escala Inteligente"
**Dados**: Funcionários, turnos, regras CLT
**Métrica**: Tempo <30s para gerar escala

### Simulador de Cenários (M1)
**Objetivo**: Mostrar 3 opções de escala
**Telas**: Comparativo lado a lado
**Componentes**: Cards comparativos, toggle de cenários
**Copy**: "Escolha o cenário ideal para seu negócio"
**Dados**: Custos, carga de trabalho, compliance
**Métrica**: 80% escolhem cenário equilibrado

### Confirmação via WhatsApp (M0)
**Objetivo**: Automatizar confirmação de presença
**Telas**: Dashboard com status em tempo real
**Componentes**: Lista de funcionários, status badges
**Copy**: "Confirmações automáticas via WhatsApp"
**Dados**: Respostas WhatsApp, status de presença
**Métrica**: 90% de confirmação em 2h

### Relatório de Economia (M1)
**Objetivo**: Mostrar ROI da plataforma
**Telas**: Dashboard com gráficos e métricas
**Componentes**: Cards de métricas, gráficos, comparativos
**Copy**: "Veja quanto você economizou este mês"
**Dados**: Horas extras evitadas, custos reduzidos
**Métrica**: Economia visível >R$500/mês

### Relatório de Risco CLT (M1)
**Objetivo**: Alertar sobre violações CLT
**Telas**: Lista de alertas com sugestões
**Componentes**: Alertas coloridos, botões de correção
**Copy**: "Riscos CLT detectados e corrigidos"
**Dados**: Artigos CLT violados, sugestões
**Métrica**: 0 violações CLT por mês

---

## 9. VARIAÇÕES DE TESTE A/B (CRO)

### Teste 1: Hero H1
**Hipótese**: Foco em ROI vs. segurança jurídica
**Variação A**: "Crie escalas perfeitas em minutos e fique 100% dentro da lei"
**Variação B**: "Reduza 30% do custo de mão de obra com escalas inteligentes"
**Métrica**: Conversão para demo
**Critério**: 15% mais conversões

### Teste 2: CTA Principal
**Hipótese**: Texto específico vs. genérico
**Variação A**: "Gerar minha escala agora"
**Variação B**: "Começar grátis"
**Métrica**: Cliques no CTA
**Critério**: 20% mais cliques

### Teste 3: Prova Social
**Hipótese**: Logos vs. números
**Variação A**: Logos de restaurantes conhecidos
**Variação B**: "500+ restaurantes economizam R$2.500/mês"
**Métrica**: Conversão para cadastro
**Critério**: 10% mais conversões

---

## 10. ENTREGÁVEIS FINAIS

### 10.1 Resumo Executivo

#### Paleta de Cores
| Categoria | Cor | Uso |
|-----------|-----|-----|
| Primária | #004AAD | Links, navegação, elementos principais |
| CTA | #FF6B00 | Botões de ação, destaque |
| Sucesso | #00B37E | Confirmações, economia |
| Alerta | #E63946 | Erros, violações CLT |
| Neutro | #6B7280 | Texto secundário, ícones |

#### Type Scale
| Elemento | Tamanho | Uso |
|----------|---------|-----|
| H1 | 32px | Títulos principais |
| H2 | 28px | Seções |
| H3 | 24px | Subseções |
| Body | 16px | Texto principal |
| Small | 14px | Texto secundário |

#### Componentes Principais
- **Botões**: 3 variações (primário, CTA, secundário)
- **Inputs**: Altura 44px, validação em tempo real
- **Tabelas**: Paginação, filtros, ações inline
- **Cards**: Métricas, alertas, economia
- **Modais**: Confirmação, detalhes, configurações

#### Páginas Essenciais
1. **Home**: Marketing, benefícios, CTA
2. **Login/Cadastro**: Onboarding simples
3. **Dashboard**: Visão geral, métricas
4. **Escalas**: Lista, criação, edição
5. **Funcionários**: Gestão de equipe
6. **Relatórios**: Economia, riscos CLT

#### Fluxos Críticos
1. **Onboarding**: 5 passos em 5 minutos
2. **Geração de Escala**: 1-clique com IA
3. **Confirmação**: WhatsApp automático
4. **Relatórios**: Economia e compliance

#### Copy Principal
- **H1**: "Crie escalas perfeitas em minutos e fique 100% dentro da lei"
- **CTA**: "Gerar minha escala agora"
- **Prova**: "Reduza até 30% o custo de mão de obra"

#### WhatsApp Templates
- Confirmação de turno
- Lembrete de presença
- Proposta de troca

#### Mockups ASCII

**Hero Section**
```
┌─────────────────────────────────────┐
│  Crie escalas perfeitas em minutos  │
│     e fique 100% dentro da lei     │
│                                     │
│  Reduza até 30% o custo de mão     │
│        de obra automaticamente      │
│                                     │
│  [Gerar minha escala agora] [Demo]  │
└─────────────────────────────────────┘
```

**Tabela de Escalas**
```
┌─────────────────────────────────────┐
│ Funcionário │ Turno │ Horário │Status│
├─────────────────────────────────────┤
│ João Silva  │ Manhã │ 08-16h  │ ✅   │
│ Maria Costa │ Tarde │ 16-24h  │ ⏳   │
│ Pedro Lima  │ Noite │ 00-08h  │ ❌   │
└─────────────────────────────────────┘
```

**Modal Publicar**
```
┌─────────────────────────────────────┐
│        Publicar Escala              │
│                                     │
│  ✅ 12 funcionários escalados       │
│  ✅ Sem violações CLT               │
│  ✅ Economia de R$450/mês           │
│                                     │
│  [Publicar e Enviar WhatsApp]       │
└─────────────────────────────────────┘
```

**Relatório Economia**
```
┌─────────────────────────────────────┐
│        Economia Gerada              │
│                                     │
│  💰 R$2.450 este mês               │
│  📈 +15% vs. mês anterior          │
│  ⏰ 32h economizadas                │
│                                     │
│  [Ver relatório completo]           │
└─────────────────────────────────────┘
```

---

## Premissas Assumidas

1. **Público-alvo**: Donos/gestores de bares e restaurantes com 5-50 funcionários
2. **Conhecimento técnico**: Básico a intermediário
3. **Dispositivo principal**: Mobile (60%), Desktop (40%)
4. **Conectividade**: 4G/5G estável na maioria dos casos
5. **Tempo disponível**: 5-10 minutos por sessão
6. **Objetivo principal**: Reduzir custos e riscos trabalhistas
7. **Barreiras**: Medo de tecnologia, falta de tempo, resistência à mudança
8. **Gatilhos**: Economia, segurança jurídica, simplicidade
9. **Prova social**: Fundamental para conversão
10. **Suporte**: WhatsApp como canal principal

Este design system está otimizado para conversão, usabilidade e crescimento da plataforma GrowthScale no mercado brasileiro de food service.
