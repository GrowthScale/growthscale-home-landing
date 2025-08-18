import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Clock, TrendingUp, CheckCircle, Award, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background com overlay para melhor legibilidade */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
        {/* Padrão sutil para credibilidade */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* 🧠 TRUST BADGE - Gatilho de Autoridade */}
        <div className="mb-8">
          <span className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-sm shadow-lg">
            <Shield className="w-4 h-4 mr-2 text-blue-300" />
            Plataforma de gestão de escalas com compliance CLT
          </span>
        </div>

        {/* 🧠 HEADLINE NEUROCIENTÍFICO - Gatilho de Dor + Solução */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-white drop-shadow-2xl animate-fade-in">
          Gestão de Escalas{" "}
          <span className="text-blue-300">Simplificada</span>{" "}
          e Conforme a Lei
        </h1>

        {/* 🧠 SUBTITLE OTIMIZADO - Gatilho de Benefício Claro */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg animate-slide-up">
          Crie escalas otimizadas, garanta conformidade com a CLT e{" "}
          <strong className="text-blue-300">reduza riscos trabalhistas</strong> com uma plataforma 
          desenvolvida especificamente para o setor de alimentação.
        </p>

        {/* 🧠 CTA BUTTONS NEUROCIENTÍFICOS - Gatilho de Reciprocidade */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-12">
          <Button 
            asChild 
            size="lg" 
            className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/demo">
              Agendar Demonstração Gratuita
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white hover:text-slate-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/#recursos">
              Conhecer Funcionalidades
            </Link>
          </Button>
        </div>

        {/* 🧠 SOCIAL PROOF - Gatilho de Consenso (Real) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="font-medium">Conformidade CLT</span>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-medium">Desenvolvido para restaurantes</span>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-400 mr-2" />
              <span className="font-medium">Segurança de dados</span>
            </div>
          </div>
        </div>

        {/* 🧠 BENEFÍCIOS RÁPIDOS - Gatilho de Resultados */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-white/80">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="font-medium">Redução de riscos trabalhistas</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Economia de tempo na gestão</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="font-medium">Equipe mais organizada</span>
          </div>
        </div>
      </div>
    </section>
  );
}
