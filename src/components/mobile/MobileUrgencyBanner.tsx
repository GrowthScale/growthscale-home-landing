import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Phone } from 'lucide-react';

export function MobileUrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 text-center animate-pulse">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="text-sm font-semibold">
          Oferta especial termina em: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <AlertTriangle className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
}
