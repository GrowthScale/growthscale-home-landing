import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  sizes = '100vw',
  quality = 80,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) {return;}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  // Gerar srcset para diferentes tamanhos
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  };

  // Detectar suporte a formatos modernos
  const supportsWebP = () => {
    if (typeof window === 'undefined') {return false;}
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  const supportsAVIF = () => {
    if (typeof window === 'undefined') {return false;}
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  };

  // Gerar source elements para diferentes formatos
  const renderPictureSources = () => {
    const sources = [];

    // AVIF (mais moderno)
    if (supportsAVIF()) {
      sources.push(
        <source
          key="avif"
          type="image/avif"
          srcSet={generateSrcSet(src.replace(/\.[^/.]+$/, '.avif'))}
          sizes={sizes}
        />
      );
    }

    // WebP (suporte amplo)
    if (supportsWebP()) {
      sources.push(
        <source
          key="webp"
          type="image/webp"
          srcSet={generateSrcSet(src.replace(/\.[^/.]+$/, '.webp'))}
          sizes={sizes}
        />
      );
    }

    return sources;
  };

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-sm">Erro ao carregar imagem</div>
          <div className="text-xs">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Skeleton loading */}
      {isLoading && (
        <Skeleton className="absolute inset-0" />
      )}

      {/* Imagem otimizada */}
      {isInView && (
        <picture>
          {renderPictureSources()}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            sizes={sizes}
          />
        </picture>
      )}

      {/* Placeholder para lazy loading */}
      {!isInView && !priority && (
        <div
          className="bg-gray-100 dark:bg-gray-800 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

// Hook para pré-carregar imagens
export function useImagePreload(srcs: string[]) {
  useEffect(() => {
    srcs.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [srcs]);
}

// Hook para detectar suporte a formatos
export function useImageFormatSupport() {
  const [supports, setSupports] = useState({
    webp: false,
    avif: false,
  });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    setSupports({
      webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
      avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0,
    });
  }, []);

  return supports;
}
