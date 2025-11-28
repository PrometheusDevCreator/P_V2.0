import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'cyan' | 'purple' | 'green';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  pulse?: boolean;
}

export function NeonButton({
  children,
  variant = 'cyan',
  size = 'md',
  loading = false,
  icon,
  pulse = false,
  className,
  disabled,
  ...props
}: NeonButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 border-2';

  const variants = {
    cyan: {
      base: 'border-prometheus-cyan-500 text-prometheus-cyan-400 bg-prometheus-cyan-500/5',
      hover: 'hover:bg-prometheus-cyan-500/20 hover:text-prometheus-cyan-300',
      shadow: 'shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]',
      glow: 'rgba(0, 255, 255, 0.5)',
    },
    purple: {
      base: 'border-purple-500 text-purple-400 bg-purple-500/5',
      hover: 'hover:bg-purple-500/20 hover:text-purple-300',
      shadow: 'shadow-[0_0_10px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]',
      glow: 'rgba(147, 51, 234, 0.5)',
    },
    green: {
      base: 'border-green-500 text-green-400 bg-green-500/5',
      hover: 'hover:bg-green-500/20 hover:text-green-300',
      shadow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]',
      glow: 'rgba(34, 197, 94, 0.5)',
    },
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const currentVariant = variants[variant];

  return (
    <button
      className={clsx(
        baseStyles,
        currentVariant.base,
        currentVariant.hover,
        currentVariant.shadow,
        sizes[size],
        pulse && 'animate-pulse-glow',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        !disabled && !loading && 'active:scale-95',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Animated neon border effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${currentVariant.glow}, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'border-flow 2s linear infinite',
        }}
      />

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
    </button>
  );
}
