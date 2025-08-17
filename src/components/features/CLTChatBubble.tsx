import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CLTChatBubbleProps {
  role: 'user' | 'bot';
  content: string;
  timestamp?: string;
  isLoading?: boolean;
}

export function CLTChatBubble({ 
  role, 
  content, 
  timestamp,
  isLoading = false 
}: CLTChatBubbleProps) {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3",
        isUser 
          ? "bg-blue-600 text-white" 
          : "bg-gray-100 text-gray-900"
      )}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
            {timestamp && (
              <p className={cn(
                "text-xs mt-2",
                isUser ? "text-blue-100" : "text-gray-500"
              )}>
                {timestamp}
              </p>
            )}
          </>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
