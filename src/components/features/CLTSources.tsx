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
    if (relevance >= 0.8) {return 'bg-accent/10 text-accent';}
    if (relevance >= 0.6) {return 'bg-primary/10 text-primary';}
    if (relevance >= 0.4) {return 'bg-accent/10 text-accent';}
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="w-4 h-4 text-primary" />
        <span className="font-medium">Fontes de referência:</span>
      </div>
      
      <div className="space-y-2">
        {displayedSources.map((source, index) => {
          const Icon = getSourceIcon(source.title);
          return (
            <div
              key={index}
              className="p-3 border rounded-lg bg-muted hover:bg-muted transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-muted-foreground truncate">
                      {source.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
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
              if (process.env.NODE_ENV === 'development') { console.log('Mostrar mais fontes'); }
            }}
            className="text-primary hover:text-primary"
          >
            Ver mais {sources.length - maxSources} fontes
          </Button>
        </div>
      )}
    </div>
  );
}
