import { useState, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

interface PWAState {
  needRefresh: boolean;
  offlineReady: boolean;
  updateServiceWorker: () => void;
  closePrompt: () => void;
}

export function usePWA(): PWAState {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  const updateServiceWorker = registerSW({
    onNeedRefresh() {
      setNeedRefresh(true);
    },
    onOfflineReady() {
      setOfflineReady(true);
    },
  });

  const closePrompt = () => {
    setNeedRefresh(false);
    setOfflineReady(false);
  };

  useEffect(() => {
    // Verificar se o app está instalado
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isInstalled && process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV === 'development') { console.log('GrowthScale PWA está instalado'); }
    }
  }, []);

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker,
    closePrompt,
  };
}
