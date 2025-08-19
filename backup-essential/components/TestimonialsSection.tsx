import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Quote, 
  TrendingUp, 
  Clock, 
  Shield,
  Users,
  Zap
} from 'lucide-react';

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Gerente de Operações",
    company: "Café Central",
    location: "São Paulo, SP",
    avatar: "MC",
    rating: 5,
    content: "Reduzimos 40% dos custos com horas extras e eliminamos completamente os riscos de multas CLT. O GrowthScale revolucionou nossa gestão.",
    metric: "40% redução de custos",
    icon: TrendingUp
  },
  {
    name: "Roberto Silva",
    role: "Proprietário",
    company: "Bar & Grill",
    location: "Rio de Janeiro, RJ",
    avatar: "RS",
    rating: 5,
    content: "A IA sugere escalas perfeitas em segundos. O que levava 2 horas agora é resolvido em 5 minutos. Simplesmente incrível.",
    metric: "95% menos tempo",
    icon: Clock
  },
  {
    name: "Ana Lopes",
    role: "Diretora Administrativa",
    company: "Restaurante Familiar",
    location: "Belo Horizonte, MG",
    avatar: "AL",
    rating: 5,
    content: "Finalmente temos controle total sobre nossos custos. A previsão de gastos é incrivelmente precisa e nos dá tranquilidade.",
    metric: "100% CLT compliant",
    icon: Shield
  },
  {
    name: "Carlos Mendes",
    role: "Gerente Geral",
    company: "Pizzaria Express",
    location: "Curitiba, PR",
    avatar: "CM",
    rating: 5,
    content: "A integração com WhatsApp automatizou nossa comunicação. Os funcionários confirmam presença automaticamente.",
    metric: "8h economizadas/semana",
    icon: Users
  },
  {
    name: "Fernanda Santos",
    role: "Proprietária",
    company: "Bistrô Gourmet",
    location: "Porto Alegre, RS",
    avatar: "FS",
    rating: 5,
    content: "O simulador de custos nos ajudou a otimizar nossa operação. Economizamos R$ 3.500 por mês desde a implementação.",
    metric: "R$ 3.500/mês economizados",
    icon: Zap
  },
  {
    name: "Lucas Oliveira",
    role: "Diretor de Operações",
    company: "Rede de Fast-Food",
    location: "Brasília, DF",
    avatar: "LO",
    rating: 5,
    content: "Com 12 filiais, precisávamos de uma solução escalável. O GrowthScale nos deu controle centralizado e relatórios precisos.",
    metric: "12 filiais integradas",
    icon: TrendingUp
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Star className="h-4 w-4 mr-2" />
            Depoimentos Reais
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Restaurantes que transformaram suas operações com o GrowthScale
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Metric */}
                <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <testimonial.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary">{testimonial.metric}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Avaliação Média</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Restaurantes Atendidos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30%</div>
              <div className="text-muted-foreground">Economia Média</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Taxa de Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;