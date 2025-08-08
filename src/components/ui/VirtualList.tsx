import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight?: number;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight = 400,
  overscan = 5,
  className,
  onScroll,
  onEndReached,
  endReachedThreshold = 0.8,
  loading = false,
  loadingComponent,
  emptyComponent
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    
    return {
      start: Math.max(0, startIndex - overscan),
      end: endIndex
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  // Calculate total height
  const totalHeight = items.length * itemHeight;

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end);
  }, [items, visibleRange]);

  // Handle scroll
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrollTop(scrollTop);
    onScroll?.(scrollTop);

    // Check if we need to load more items
    if (onEndReached) {
      const scrollPercentage = scrollTop / (totalHeight - containerHeight);
      if (scrollPercentage >= endReachedThreshold) {
        onEndReached();
      }
    }
  }, [onScroll, onEndReached, totalHeight, containerHeight, endReachedThreshold]);

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Auto-scroll to top when items change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [items.length]);

  if (items.length === 0 && !loading) {
    return (
      <div className={cn("flex items-center justify-center", className)} style={{ height: containerHeight }}>
        {emptyComponent || (
          <div className="text-center text-muted-foreground">
            <p>Nenhum item encontrado</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: visibleRange.start * itemHeight,
            left: 0,
            right: 0,
            height: visibleItems.length * itemHeight
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.start + index}
              style={{
                height: itemHeight,
                position: 'absolute',
                top: index * itemHeight,
                left: 0,
                right: 0
              }}
            >
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
        
        {loading && loadingComponent && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 60
            }}
          >
            {loadingComponent}
          </div>
        )}
      </div>
    </div>
  );
}

// Specialized virtual list components
export function VirtualTable<T>({
  items,
  columns,
  itemHeight = 50,
  containerHeight = 400,
  className,
  onRowClick,
  onEdit,
  onDelete,
  loading = false,
  emptyMessage = "Nenhum dado encontrado"
}: {
  items: T[];
  columns: Array<{
    key: string;
    header: string;
    accessor: (item: T) => string | number | React.ReactNode;
    width?: string;
  }>;
  itemHeight?: number;
  containerHeight?: number;
  className?: string;
  onRowClick?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}) {
  const renderRow = useCallback((item: T, index: number) => (
    <div
      className={cn(
        "flex items-center border-b border-border hover:bg-muted/50 transition-colors",
        onRowClick && "cursor-pointer"
      )}
      onClick={() => onRowClick?.(item)}
    >
      {columns.map((column) => (
        <div
          key={column.key}
          className="flex-1 px-4 py-2"
          style={{ width: column.width }}
        >
          {column.accessor(item)}
        </div>
      ))}
      
      {(onEdit || onDelete) && (
        <div className="flex items-center space-x-2 px-4 py-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="text-sm text-primary hover:text-primary/80"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className="text-sm text-destructive hover:text-destructive/80"
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  ), [columns, onRowClick, onEdit, onDelete]);

  const renderHeader = () => (
    <div className="flex items-center border-b border-border bg-muted/50 font-medium">
      {columns.map((column) => (
        <div
          key={column.key}
          className="flex-1 px-4 py-2"
          style={{ width: column.width }}
        >
          {column.header}
        </div>
      ))}
      {(onEdit || onDelete) && (
        <div className="px-4 py-2 w-32">
          Ações
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("border border-border rounded-md", className)}>
      {renderHeader()}
      <VirtualList
        items={items}
        renderItem={renderRow}
        itemHeight={itemHeight}
        containerHeight={containerHeight - 50} // Subtract header height
        loading={loading}
        loadingComponent={
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm text-muted-foreground">Carregando...</span>
          </div>
        }
        emptyComponent={
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            {emptyMessage}
          </div>
        }
      />
    </div>
  );
}

// Virtual grid component
export function VirtualGrid<T>({
  items,
  renderItem,
  itemHeight = 200,
  itemWidth = 200,
  containerHeight = 400,
  className,
  loading = false,
  emptyMessage = "Nenhum item encontrado"
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  itemWidth?: number;
  containerHeight?: number;
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const columnsCount = Math.floor(containerWidth / itemWidth) || 1;
  const rowsCount = Math.ceil(items.length / columnsCount);

  const renderRow = useCallback((rowIndex: number) => {
    const startIndex = rowIndex * columnsCount;
    const endIndex = Math.min(startIndex + columnsCount, items.length);
    const rowItems = items.slice(startIndex, endIndex);

    return (
      <div
        key={rowIndex}
        className="flex"
        style={{ height: itemHeight }}
      >
        {rowItems.map((item, colIndex) => (
          <div
            key={startIndex + colIndex}
            className="flex-1 p-2"
            style={{ width: itemWidth }}
          >
            {renderItem(item, startIndex + colIndex)}
          </div>
        ))}
        {/* Fill empty spaces */}
        {Array.from({ length: columnsCount - rowItems.length }).map((_, colIndex) => (
          <div
            key={`empty-${colIndex}`}
            className="flex-1 p-2"
            style={{ width: itemWidth }}
          />
        ))}
      </div>
    );
  }, [items, columnsCount, itemHeight, itemWidth, renderItem]);

  const rowItems = Array.from({ length: rowsCount }, (_, index) => index);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
    >
      <VirtualList
        items={rowItems}
        renderItem={(_, index) => renderRow(index)}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        loading={loading}
        loadingComponent={
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm text-muted-foreground">Carregando...</span>
          </div>
        }
        emptyComponent={
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            {emptyMessage}
          </div>
        }
      />
    </div>
  );
} 