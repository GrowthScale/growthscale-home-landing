# Design System "Vanguarda" - GrowthScale

## Visão Geral

O Design System "Vanguarda" é uma fundação visual moderna e premium desenvolvida para criar experiências magneticamente persuasivas e juridicamente seguras. Focado em conversão e confiança, o sistema combina tecnologia de ponta com simplicidade de uso.

## Princípios de Design

### 1. **Confiança Premium**
- Cores azuis fortes e confiáveis
- Elementos visuais que transmitem segurança jurídica
- Tipografia clara e legível

### 2. **Persuasão Magnética**
- Gradientes sutis e elegantes
- Animações suaves e intencionais
- Hierarquia visual clara

### 3. **Simplicidade Moderna**
- Interface limpa e minimalista
- Foco na usabilidade
- Responsividade total

## Paleta de Cores

### Cores Principais
```css
--primary: 221.2 83.2% 53.3%    /* Azul forte e confiável */
--accent: 38 92% 50%            /* Laranja/Dourado para acentos */
--background: 0 0% 100%         /* Fundo principal claro */
--background-dark: 224 71% 4%   /* Azul quase preto para impacto */
```

### Cores Semânticas
```css
--foreground: 222.2 84% 4.9%    /* Texto principal escuro */
--foreground-dark: 210 40% 98%  /* Texto principal claro */
--secondary: 210 40% 96.1%      /* Cinza muito claro */
--muted: 210 40% 96.1%          /* Texto secundário */
```

## Tipografia

### Fonte Principal
- **Inter** - Fonte sans-serif moderna e legível
- Pesos: 400, 500, 600, 700, 800, 900

### Hierarquia
```css
/* Títulos */
h1: text-5xl md:text-6xl lg:text-7xl font-black
h2: text-4xl md:text-5xl font-bold
h3: text-2xl font-bold

/* Corpo */
p: text-base leading-relaxed
p.large: text-xl md:text-2xl
```

## Componentes

### Botões

#### Variantes Disponíveis
- `default`: Botão padrão azul
- `gradient`: Gradiente azul-laranja
- `premium`: Gradiente premium com efeitos
- `glass`: Efeito vidro transparente
- `outline`: Contorno com hover
- `ghost`: Transparente com hover

#### Tamanhos
- `sm`: h-8 px-3 text-xs
- `default`: h-10 px-4 py-2
- `lg`: h-12 px-8 text-base
- `xl`: h-14 px-10 text-lg
- `2xl`: h-16 px-12 text-xl

### Cards

#### Variantes Disponíveis
- `default`: Card padrão
- `premium`: Card com gradiente e hover effects
- `glass`: Efeito vidro com backdrop blur
- `gradient`: Gradiente sutil
- `dark`: Tema escuro

## Animações

### Transições
```css
transition-all duration-300
```

### Animações Personalizadas
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
```

### Efeitos Hover
- `hover:scale-105`: Escala suave
- `hover:-translate-y-0.5`: Movimento para cima
- `hover:shadow-xl`: Sombra aumentada

## Layout

### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
}
```

### Grid System
- Responsivo: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Espaçamento: `gap-8`
- Alinhamento: `items-center justify-center`

## Seções da Landing Page

### 1. Header
- Logo com gradiente
- Navegação limpa
- CTA principal destacado

### 2. Hero Section
- Título impactante com gradiente
- Badge de credibilidade
- Social proof
- Preview do dashboard

### 3. Features Section
- Cards premium com ícones coloridos
- Descrições claras e persuasivas
- Hover effects elegantes

### 4. Social Proof
- Depoimentos em cards premium
- Estatísticas impressionantes
- Avaliações em estrelas

### 5. CTA Section
- Fundo com gradiente
- Grid pattern sutil
- Botões de ação claros

### 6. Footer
- Tema escuro
- Links organizados
- Informações de compliance

## Responsividade

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile First
- Design otimizado para mobile
- Navegação adaptativa
- Botões touch-friendly

## Acessibilidade

### Contraste
- Razão de contraste mínima: 4.5:1
- Cores testadas para daltonismo
- Texto legível em todos os tamanhos

### Navegação
- Suporte completo a teclado
- Screen reader friendly
- Focus states visíveis

## Performance

### Otimizações
- CSS purged automaticamente
- Imagens otimizadas
- Lazy loading implementado
- Animações com `transform` e `opacity`

## Implementação

### Instalação
```bash
# As dependências já estão configuradas
npm install
```

### Uso dos Componentes
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Botão premium
<Button variant="premium" size="lg">
  Começar Agora
</Button>

// Card premium
<Card variant="premium" className="p-8">
  Conteúdo do card
</Card>
```

## Manutenção

### Atualizações
- Manter consistência visual
- Testar em diferentes dispositivos
- Validar acessibilidade
- Monitorar performance

### Documentação
- Atualizar este documento
- Manter exemplos de uso
- Documentar mudanças

---

**Desenvolvido para GrowthScale**  
*Transformando a gestão de escalas com design premium e tecnologia avançada.*

