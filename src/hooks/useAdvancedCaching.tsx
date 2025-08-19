import { useState, useEffect, useCallback } from 'react';

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  staleWhileRevalidate?: number; // Time to serve stale while revalidating
  maxRetries?: number;
  retryDelay?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  staleAt: number;
}

class AdvancedCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultOptions: Required<CacheOptions> = {
    ttl: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: 60 * 1000, // 1 minute
    maxRetries: 3,
    retryDelay: 1000,
  };

  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const opts = { ...this.defaultOptions, ...options };
    const now = Date.now();

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + opts.ttl,
      staleAt: now + opts.staleWhileRevalidate,
    });
  }

  get<T>(key: string): CacheEntry<T> | null {
    const entry = this.cache.get(key);
    if (!entry) {return null;}

    const now = Date.now();
    
    // Entry is expired
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  isStale(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {return true;}

    const now = Date.now();
    return now > entry.staleAt;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Cache global
const globalCache = new AdvancedCache();

export function useAdvancedCaching<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isStale, setIsStale] = useState(false);

  const fetchData = useCallback(async (forceRefresh = false) => {
    const cached = globalCache.get<T>(key);
    const stale = globalCache.isStale(key);

    // Se temos dados em cache e não é stale, usar cache
    if (cached && !stale && !forceRefresh) {
      setData(cached.data);
      setIsStale(false);
      return;
    }

    // Se temos dados stale, usar enquanto revalida
    if (cached && stale && !forceRefresh) {
      setData(cached.data);
      setIsStale(true);
    }

    setLoading(true);
    setError(null);

    try {
      const newData = await fetcher();
      globalCache.set(key, newData, options);
      setData(newData);
      setIsStale(false);
    } catch (err) {
      setError(err as Error);
      
      // Se falhou mas temos dados stale, manter dados stale
      if (cached && stale) {
        setData(cached.data);
      }
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, options]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const clearCache = useCallback(() => {
    globalCache.clear();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isStale,
    refresh,
    clearCache,
  };
}

// Hook para cache com retry automático
export function useCachedFetch<T>(
  url: string,
  options: CacheOptions & RequestInit = {}
) {
  const { ttl, staleWhileRevalidate, maxRetries, retryDelay, ...fetchOptions } = options;

  const fetcher = useCallback(async (): Promise<T> => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= (maxRetries || 3); attempt++) {
      try {
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (err) {
        lastError = err as Error;
        
        if (attempt < (maxRetries || 3)) {
          await new Promise(resolve => setTimeout(resolve, retryDelay || 1000));
        }
      }
    }
    
    throw lastError!;
  }, [url, fetchOptions, maxRetries, retryDelay]);

  return useAdvancedCaching(url, fetcher, { ttl, staleWhileRevalidate });
}

// Hook para cache de múltiplas chaves
export function useMultiCache<T>(
  keys: string[],
  fetcher: (key: string) => Promise<T>,
  options: CacheOptions = {}
) {
  const [data, setData] = useState<Record<string, T>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, Error>>({});

  const fetchKey = useCallback(async (key: string) => {
    const cached = globalCache.get<T>(key);
    const stale = globalCache.isStale(key);

    if (cached && !stale) {
      setData(prev => ({ ...prev, [key]: cached.data }));
      setLoading(prev => ({ ...prev, [key]: false }));
      return;
    }

    if (cached && stale) {
      setData(prev => ({ ...prev, [key]: cached.data }));
    }

    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null as any }));

    try {
      const newData = await fetcher(key);
      globalCache.set(key, newData, options);
      setData(prev => ({ ...prev, [key]: newData }));
    } catch (err) {
      setErrors(prev => ({ ...prev, [key]: err as Error }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [fetcher, options]);

  useEffect(() => {
    keys.forEach(key => fetchKey(key));
  }, [keys, fetchKey]);

  return {
    data,
    loading,
    errors,
    fetchKey,
  };
}

// Hook para cache com background sync
export function useBackgroundSync<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions & { syncInterval?: number } = {}
) {
  const { syncInterval = 5 * 60 * 1000, ...cacheOptions } = options;

  const result = useAdvancedCaching(key, fetcher, cacheOptions);

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        result.refresh();
      }
    }, syncInterval);

    // Sync quando a página volta a ficar visível
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        result.refresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [syncInterval, result]);

  return result;
}
