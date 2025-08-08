import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Download, Smartphone } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';
import { useToast } from '@/hooks/use-toast';

export const PWAInstallPrompt: React.FC = () => {
  const { canInstall, isInstalled, installPWA } = usePWA();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Show prompt after 5 seconds if can install and not installed
    if (canInstall && !isInstalled) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [canInstall, isInstalled]);

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      toast({
        title: "Aplicativo instalado!",
        description: "GrowthScale foi adicionado à sua tela inicial.",
      });
      setIsVisible(false);
    } else {
      toast({
        title: "Instalação cancelada",
        description: "Você pode instalar o app a qualquer momento através do menu do navegador.",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Hide for 24 hours
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  React.useEffect(() => {
    // Check if user dismissed recently
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismissed < 24) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <span>Instalar GrowthScale</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">
            Instale o GrowthScale no seu dispositivo para acesso rápido e funcionalidade offline.
          </p>
          <div className="flex space-x-2">
            <Button onClick={handleInstall} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Instalar
            </Button>
            <Button variant="outline" onClick={handleDismiss} className="flex-1">
              Agora não
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 