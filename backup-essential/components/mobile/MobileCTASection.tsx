import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Clock, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export function MobileCTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        {/* Urgency Banner */}
        <div className="mb-8">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-semibold">Apenas 23 vagas restantes</span>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Pronto para operar com 100% de segurança?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Comece grátis, sem cartão de crédito. 500+ restaurantes já economizam com o GrowthScale
          </p>
          
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[56px] animate-pulse"
            onClick={() => window.location.href = '/signup?plan=freemium'}
          >
            Começar Gratuitamente
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="font-medium">Sem cartão de crédito</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-yellow-400" />
            <span className="font-medium">Setup em 24h</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="font-medium">Garantia de 30 dias</span>
          </div>
        </div>

        {/* Oferta Limitada */}
        <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-red-300" />
            <h3 className="text-sm font-bold text-red-200">Oferta Limitada</h3>
          </div>
          <p className="text-xs text-red-100 mb-2">
            Primeiros 100 usuários ganham 30 dias de Professional grátis
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-red-200">
            <Clock className="w-4 h-4" />
            <span>Restam apenas 23 vagas</span>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-base px-6 py-4 border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 min-h-[48px]"
                          onClick={() => {
                const element = document.getElementById('precos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
          >
            Ver Todos os Planos
          </Button>
        </div>
      </div>
    </section>
  );
}
