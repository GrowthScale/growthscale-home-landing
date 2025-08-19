import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState<'accepted' | 'rejected' | null>(null);

  useEffect(() => {
    // Verificar se já existe consentimento salvo
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShow(true);
    } else {
      setConsent(savedConsent as 'accepted' | 'rejected');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsent('accepted');
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setConsent('rejected');
    setShow(false);
  };

  if (!show || consent) {return null;}

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Utilizamos cookies</strong> para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
              Ao continuar navegando, você concorda com nossa{' '}
              <Link to="/legal" className="underline hover:text-blue-600">
                Política de Cookies
              </Link>
              {' '}e{' '}
              <Link to="/legal" className="underline hover:text-blue-600">
                Política de Privacidade
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aceitar Todos
            </button>
            <button
              onClick={() => setShow(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
