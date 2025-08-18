import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Clock, TrendingUp, CheckCircle, Award, Users, Phone, AlertTriangle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background com overlay para melhor legibilidade */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
        {/* Padrão sutil para credibilidade */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* 🧠 URGENCY BANNER - Mobile-First */}
        <div className="mb-4 sm:mb-6">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg text-center animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <span className="animate-pulse">⚡</span>
              <span className="text-sm font-semibold">Apenas 3 vagas para demo esta semana</span>
              <span className="animate-pulse">⚡</span>
            </div>
          </div>
        </div>

        {/* 🧠 TRUST BADGE - Otimizado para Mobile */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-xs sm:text-sm shadow-lg">
            <Shield className="w-4 h-4 mr-2 text-blue-300 flex-shrink-0" />
            <span className="hidden sm:inline">Plataforma de gestão de escalas com compliance CLT</span>
            <span className="sm:hidden">Compliance CLT Garantido</span>
          </span>
        </div>

        {/* 🧠 HEADLINE - Mobile-First com Urgência */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight text-white drop-shadow-2xl animate-fade-in px-2">
          <span className="block sm:inline">Evite Multas de</span>{" "}
          <span className="text-red-400 block sm:inline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">R$ 50.000+</span>{" "}
          <span className="block sm:inline">Gestão de Escalas CLT</span>
        </h1>

        {/* 🧠 SUBTITLE - Otimizado para Mobile */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed drop-shadow-lg animate-slide-up px-2">
          <span className="block sm:inline">A plataforma com Inteligência Artificial que</span>{" "}
          <strong className="text-blue-300 block sm:inline">blinda o seu restaurante contra riscos da CLT</strong>{" "}
          <span className="block sm:inline">, otimiza a sua equipa e prevê os seus custos em tempo real.</span>
        </p>

        {/* 🧠 CTA BUTTONS - Mobile-First com Touch Targets */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 justify-center items-center mb-8 sm:mb-12 px-4">
                                <Button 
                        size="lg" 
                        className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[56px] sm:min-h-[64px] animate-pulse"
                        onClick={() => window.location.href = '/signup?plan=freemium'}
                      >
                        <span className="hidden sm:inline">Começar Gratuitamente</span>
                        <span className="sm:hidden">Começar Grátis</span>
                      </Button>
          
                                <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-white/30 text-white hover:bg-white hover:text-slate-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[56px] sm:min-h-[64px]"
                        onClick={() => window.location.href = '/#precos'}
                      >
                        <span className="hidden sm:inline">Ver Todos os Planos</span>
                        <span className="sm:hidden">Ver Planos</span>
                      </Button>
        </div>

        {/* 🧠 SOCIAL PROOF - Otimizado para Mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/80 px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <span className="font-medium">Conformidade CLT</span>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
            <span className="font-medium hidden sm:inline">Desenvolvido para restaurantes</span>
            <span className="font-medium sm:hidden">Para restaurantes</span>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            <span className="font-medium hidden sm:inline">Segurança de dados</span>
            <span className="font-medium sm:hidden">Seguro</span>
          </div>
        </div>

        {/* 🧠 BENEFÍCIOS RÁPIDOS - Mobile-First */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-white/80 text-sm sm:text-base">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <span className="font-medium text-center">Redução de riscos trabalhistas</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-white/80 text-sm sm:text-base">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            <span className="font-medium text-center">Economia de tempo na gestão</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-white/80 text-sm sm:text-base">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
            <span className="font-medium text-center">Equipe mais organizada</span>
          </div>
        </div>

        {/* 🧠 FEAR TRIGGER - Mobile-Specific */}
        <div className="mt-8 sm:mt-12 px-4">
          <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-bold text-red-300">Multas podem fechar seu restaurante</h3>
            </div>
            <p className="text-xs text-red-200">Fiscalização mais rigorosa em 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}
