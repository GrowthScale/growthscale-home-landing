import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, Users, TrendingUp } from "lucide-react";
import { landingPageCopy } from "@/constants/neuromarketing";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden gradient-hero">
      {/* Background with overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full gradient-hero"></div>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* 🧠 URGENCY BADGE NEUROCIENTÍFICO */}
        <div className="mb-8">
          <span className="inline-flex items-center px-6 py-3 rounded-full urgency-badge text-white font-semibold text-sm shadow-lg animate-urgency-pulse">
            <Clock className="w-4 h-4 mr-2" />
            ⏰ Oferta por tempo limitado - Restam apenas 23 vagas
          </span>
        </div>

        {/* 🧠 TRUST BADGE OTIMIZADO */}
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            {landingPageCopy.hero.trustBadge}
          </span>
        </div>

        {/* 🧠 HEADLINE NEUROCIENTÍFICO */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight text-white drop-shadow-2xl animate-fade-in">
          {landingPageCopy.hero.h1}
        </h1>

        {/* 🧠 SUBTITLE OTIMIZADO */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg animate-slide-up">
          {landingPageCopy.hero.subtitle}
        </p>

        {/* 🧠 CTA BUTTONS NEUROCIENTÍFICOS */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-12">
          <Button 
            asChild 
            size="lg" 
            className="text-xl px-10 py-6 gradient-cta text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            <Link to="/auth">
              {landingPageCopy.hero.ctaPrimary}
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="text-xl px-10 py-6 border-white/50 text-white hover:bg-white hover:text-primary-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 neuro-hover"
          >
            <Link to="/#recursos">
              <PlayCircle className="mr-3 h-6 w-6" />
              {landingPageCopy.hero.ctaSecondary}
            </Link>
          </Button>
        </div>

        {/* 🧠 SOCIAL PROOF NEUROCIENTÍFICO */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-base text-white/90">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/25 border-2 border-white/40 flex items-center justify-center text-sm font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="font-semibold">500+ restaurantes confiam</span>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-white/30"></div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold">4.8/5 (500+ avaliações)</span>
          </div>
        </div>

        {/* 🧠 BENEFÍCIOS RÁPIDOS */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-white/90">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="font-medium">Economia de R$2.500/mês</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/90">
            <Clock className="w-6 h-6 text-blue-400" />
            <span className="font-medium">8h economizadas/semana</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/90">
            <Users className="w-6 h-6 text-purple-400" />
            <span className="font-medium">100% compliance CLT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
