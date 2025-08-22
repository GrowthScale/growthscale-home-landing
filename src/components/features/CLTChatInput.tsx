import React, { useState, useCallback } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CLTChatInputProps {
  onSendMessage: (message: string) => void;
  onAttachFile?: () => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function CLTChatInput({
  onSendMessage,
  onAttachFile,
  disabled = false,
  placeholder = "Digite sua pergunta sobre CLT...",
  maxLength = 1000
}: CLTChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  }, [message, disabled, onSendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-white">
      <div className="flex-1 relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className="min-h-[44px] max-h-32 resize-none pr-12"
          rows={1}
        />
        <div className="absolute right-2 bottom-2 text-xs text-muted-foreground">
          {message.length}/{maxLength}
        </div>
      </div>
      
      <div className="flex gap-2">
        {onAttachFile && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onAttachFile}
            disabled={disabled}
            className="flex-shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          className="flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
