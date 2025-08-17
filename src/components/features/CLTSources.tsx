import React from 'react';
import { ExternalLink, FileText, BookOpen, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CLTSource } from '@/types/clt';

interface CLTSourcesProps {
  sources: CLTSource[];
  className?: string;
  maxSources?: number;
}

export function CLTSources({ 
  sources, 
  className = '',
  maxSources = 3 
}: CLTSourcesProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  const displayedSources = sources.slice(0, maxSources);

  const getSourceIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('artigo') || lowerTitle.includes('clt')) {
      return Scale;
    }
    if (lowerTitle.includes('manual') || lowerTitle.includes('guia')) {
      return BookOpen;
    }
    return FileText;
  };

  const getSourceColor = (relevance: number) => {
    if (relevance >= 0.8) return 'bg-green-100 text-green-800';
    if (relevance >= 0.6) return 'bg-blue-100 text-blue-800';
    if (relevance >= 0.4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FileText className="w-4 h-4 text-blue-500" />
        <span className="font-medium">Fontes de referência:</span>
      </div>
      
      <div className="space-y-2">
        {displayedSources.map((source, index) => {
          const Icon = getSourceIcon(source.title);
          return (
            <div
              key={index}
              className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {source.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {source.content}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", getSourceColor(source.relevance))}
                  >
                    {Math.round(source.relevance * 100)}% relevante
                  </Badge>
                  
                  {source.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(source.url, '_blank')}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {sources.length > maxSources && (
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Implementar lógica para mostrar mais fontes
              console.log('Mostrar mais fontes');
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            Ver mais {sources.length - maxSources} fontes
          </Button>
        </div>
      )}
    </div>
  );
}
