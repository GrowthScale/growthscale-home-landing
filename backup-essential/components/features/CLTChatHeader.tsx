import React from 'react';
import { Bot, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CLTChatHeaderProps {
  onReset?: () => void;
  onSettings?: () => void;
  isOnline?: boolean;
  lastUpdated?: string;
}

export function CLTChatHeader({
  onReset,
  onSettings,
  isOnline = true,
  lastUpdated
}: CLTChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Assistente CLT</h3>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isOnline ? "default" : "secondary"}
              className="text-xs"
            >
              {isOnline ? "Online" : "Offline"}
            </Badge>
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Atualizado: {lastUpdated}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        {onReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Resetar
          </Button>
        )}
        
        {onSettings && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSettings}
            className="text-xs"
          >
            <Settings className="w-3 h-3 mr-1" />
            Configurações
          </Button>
        )}
      </div>
    </div>
  );
}
