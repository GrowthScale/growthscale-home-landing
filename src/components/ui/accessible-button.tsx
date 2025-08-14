import React from 'react';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  ariaControls?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
  role?: string;
  tabIndex?: number;
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ariaLabel,
      ariaDescribedBy,
      ariaExpanded,
      ariaPressed,
      ariaControls,
      ariaLive,
      role,
      tabIndex = 0,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      'active:scale-95',
      'min-h-[44px] min-w-[44px]', // WCAG AA touch target size
      {
        // Variants
        'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800': variant === 'primary',
        'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700': variant === 'secondary',
        'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100': variant === 'outline',
        'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200': variant === 'ghost',
        'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/80': variant === 'destructive',
        
        // Sizes
        'h-9 px-3 text-sm': size === 'sm',
        'h-10 px-4 py-2 text-sm': size === 'md',
        'h-11 px-8 text-base': size === 'lg',
        'h-12 px-10 text-lg': size === 'xl',
        
        // Loading state
        'cursor-wait': loading,
      },
      className
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Handle keyboard navigation
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!disabled && !loading && onClick) {
          onClick(e as any);
        }
      }
      
      // Call original onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const renderIcon = () => {
      if (!icon) return null;
      
      const iconClasses = cn(
        'flex-shrink-0',
        {
          'mr-2': iconPosition === 'left',
          'ml-2': iconPosition === 'right',
        }
      );

      return (
        <span className={iconClasses} aria-hidden="true">
          {icon}
        </span>
      );
    };

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Carregando...</span>
          </>
        );
      }

      return (
        <>
          {iconPosition === 'left' && renderIcon()}
          <span>{children}</span>
          {iconPosition === 'right' && renderIcon()}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        aria-controls={ariaControls}
        aria-live={ariaLive}
        role={role}
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

// Variant-specific button components for convenience
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="primary" {...props} />
);
PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = React.forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="secondary" {...props} />
);
SecondaryButton.displayName = 'SecondaryButton';

export const OutlineButton = React.forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="outline" {...props} />
);
OutlineButton.displayName = 'OutlineButton';

export const GhostButton = React.forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="ghost" {...props} />
);
GhostButton.displayName = 'GhostButton';

export const DestructiveButton = React.forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="destructive" {...props} />
);
DestructiveButton.displayName = 'DestructiveButton';
