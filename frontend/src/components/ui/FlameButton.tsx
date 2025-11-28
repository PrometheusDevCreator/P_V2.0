import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FlameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

export function FlameButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}: FlameButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 overflow-hidden';

  const variants = {
    primary: 'bg-gradient-to-r from-prometheus-flame-500 to-prometheus-flame-600 text-white hover:from-prometheus-flame-400 hover:to-prometheus-flame-500 shadow-glow-flame hover:shadow-glow-flame-strong',
    secondary: 'bg-prometheus-bg-tertiary text-prometheus-flame-400 border border-prometheus-flame-500/30 hover:bg-prometheus-flame-500/10 hover:border-prometheus-flame-500/50',
    outline: 'bg-transparent text-prometheus-flame-400 border-2 border-prometheus-flame-500 hover:bg-prometheus-flame-500/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        !disabled && !loading && 'active:scale-95',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Animated flame effect for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-t from-prometheus-flame-600/50 to-transparent animate-flame-flicker" />
      )}

      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
      )}

      {/* Icon */}
      {icon && !loading && <span className="relative z-10">{icon}</span>}

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Hover shine effect */}
      <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </button>
  );
}
