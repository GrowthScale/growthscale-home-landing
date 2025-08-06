import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Gerente de Operações",
    company: "Restaurante Dom Pedro",
    content: "O GrowthScale transformou completamente nossa gestão de escalas. Reduzimos 70% do tempo gasto organizando turnos e nossa equipe está muito mais satisfeita.",
    rating: 5,
    image: "👩‍💼"
  },
  {
    name: "João Santos",
    role: "Proprietário",
    company: "Café Central",
    content: "Desde que implementamos o GrowthScale, nossa produtividade aumentou 45% e conseguimos reduzir significativamente os custos com horas extras.",
    rating: 5,
    image: "👨‍💼"
  },
  {
    name: "Ana Costa",
    role: "Diretora de RH",
    company: "Rede FastFood Plus",
    content: "A funcionalidade de compliance automático é incrível. Nunca mais tivemos problemas com a legislação trabalhista. Recomendo totalmente!",
    rating: 5,
    image: "👩‍💻"
  },
  {
    name: "Carlos Oliveira",
    role: "Gerente Geral",
    company: "Pizzaria Bella Vista",
    content: "O sistema de gamificação motivou nossa equipe de forma surpreendente. O engajamento dos funcionários nunca esteve tão alto.",
    rating: 5,
    image: "👨‍🍳"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-roboto">
            O que Nossos <span className="text-primary">Clientes</span> Estão Dizendo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
            Veja como o GrowthScale está transformando negócios como o seu todos os dias
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-soft transition-all duration-300 border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground text-lg font-roboto">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                  <p className="text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <blockquote className="text-card-foreground font-roboto leading-relaxed text-lg">
                "{testimonial.content}"
              </blockquote>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-4 font-roboto">
              Empresas que Confiam no GrowthScale
            </h3>
            <p className="text-muted-foreground">
              Junte-se a centenas de estabelecimentos que já transformaram sua gestão
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['🍕 Pizzaria Roma', '🍔 Burger King', '☕ Café Expresso', '🥗 Green Salads'].map((brand, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{brand.split(' ')[0]}</div>
                <div className="text-sm text-muted-foreground font-medium">
                  {brand.split(' ').slice(1).join(' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;