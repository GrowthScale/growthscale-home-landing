import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Zap, 
  ArrowRight, 
  X,
  TrendingUp,
  Users
} from 'lucide-react';

export const MobileUrgencyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos

  useEffect(() => {
    // Mostrar banner após 5 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) {return null;}

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden animate-fade-in-down">
      <Card className="mx-4 mt-4 bg-gradient-to-r from-accent to-primary text-white border-0 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Oferta Especial
                  </Badge>
                  <span className="text-xs opacity-90">Termina em:</span>
                </div>
                <p className="font-bold text-lg">{formatTime(timeLeft)}</p>
                <p className="text-xs opacity-90">30% de desconto no primeiro mês</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button asChild size="sm" className="bg-white text-primary hover:bg-white/90">
                <Link to="/auth" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Aproveitar
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileUrgencyBanner;
