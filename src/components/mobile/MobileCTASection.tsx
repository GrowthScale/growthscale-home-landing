import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export function MobileCTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        {/* Urgency Banner */}
        <div className="mb-8">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-semibold">Apenas 3 vagas restantes para demo</span>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Pronto para evitar multas de R$ 50.000+?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Agende sua demonstração e descubra como proteger seu negócio
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[56px] animate-pulse"
          >
            <Link to="/demo" className="flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              Agendar Demonstração
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="font-medium">Sem compromisso</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-yellow-400" />
            <span className="font-medium">15 minutos</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="font-medium">Compliance garantido</span>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-base px-6 py-4 border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 min-h-[48px]"
          >
            <Link to="/#recursos">
              Ver Funcionalidades
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
