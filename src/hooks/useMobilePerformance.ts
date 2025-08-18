import { useState, useEffect } from 'react';

export function useMobilePerformance() {
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast' | 'unknown'>('unknown');
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    // Detectar velocidade de conexão
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        setConnectionSpeed('slow');
      } else {
        setConnectionSpeed('fast');
      }
    }

    // Detectar modo de baixa energia (iOS)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setIsLowPowerMode(battery.level < 0.2);
      });
    }
  }, []);

  return {
    connectionSpeed,
    isLowPowerMode,
    shouldOptimizeForPerformance: connectionSpeed === 'slow' || isLowPowerMode
  };
}
