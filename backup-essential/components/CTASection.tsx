import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge de Urgência */}
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Oferta Limitada
          </Badge>
          
          {/* Título Principal */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para <span className="text-primary">Revolucionar</span> suas Escalas?
          </h2>
          
          {/* Subtítulo Persuasivo */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 500 restaurantes que já economizam tempo e dinheiro 
            com o GrowthScale. Comece gratuitamente hoje mesmo.
          </p>
          
          {/* Benefícios Rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Setup em 5 minutos</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium">100% CLT Compliant</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Economia garantida</span>
            </div>
          </div>
          
          {/* CTAs Principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl shadow-primary/25">
              <Link to="/auth" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Começar Gratuitamente
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-secondary">
              <Link to="/#demo" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Agendar Demonstração
              </Link>
            </Button>
          </div>
          
          {/* Prova Social */}
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>4.9/5</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>500+ restaurantes</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>30% economia média</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Flutuante para Mobile
export const FloatingCTA = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Comece Gratuitamente</p>
                <p className="text-xs opacity-90">Setup em 5 minutos</p>
              </div>
            </div>
            
            <Button asChild size="sm" className="bg-white text-primary hover:bg-white/90">
              <Link to="/auth">
                Começar
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTASection;