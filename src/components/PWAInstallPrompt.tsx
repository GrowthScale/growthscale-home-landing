import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, RefreshCw } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { needRefresh, offlineReady, updateServiceWorker, closePrompt } = usePWA();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuário aceitou instalar o PWA');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleUpdateClick = () => {
    updateServiceWorker();
    closePrompt();
  };

  const handleClose = () => {
    setShowInstallPrompt(false);
    closePrompt();
  };

  // Não mostrar se não há prompts
  if (!showInstallPrompt && !needRefresh && !offlineReady) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {showInstallPrompt && (
              <>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Instalar GrowthScale
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  Instale o app para acesso rápido e funcionalidades offline
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleInstallClick}
                    className="flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Instalar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleClose}
                  >
                    Depois
                  </Button>
                </div>
              </>
            )}

            {needRefresh && (
              <>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Nova versão disponível
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  Uma nova versão do app está disponível
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleUpdateClick}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Atualizar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleClose}
                  >
                    Depois
                  </Button>
                </div>
              </>
            )}

            {offlineReady && (
              <>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  App pronto offline
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  O app agora funciona offline
                </p>
                <Button
                  size="sm"
                  onClick={handleClose}
                >
                  Entendi
                </Button>
              </>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 