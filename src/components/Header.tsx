import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              GrowthScale
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <button 
                  onClick={() => scrollToSection('recursos')}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Recursos
                </button>
                <button 
                  onClick={() => scrollToSection('precos')}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Preços
                </button>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Contato
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/employees')}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Funcionários
                </button>
                <button 
                  onClick={() => navigate('/schedules')}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Escalas
                </button>
              </>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/auth')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Entrar
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Começar Grátis
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {isHomePage ? (
                <>
                  <button 
                    onClick={() => {
                      scrollToSection('recursos');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Recursos
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('precos');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Preços
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('contato');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Contato
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/employees');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Funcionários
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/schedules');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Escalas
                  </button>
                </>
              )}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <button 
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md mt-2"
                >
                  Começar Grátis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;