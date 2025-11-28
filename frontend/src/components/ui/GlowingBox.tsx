import { ReactNode } from 'react';
import clsx from 'clsx';

interface GlowingBoxProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'flame' | 'purple';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  onClick?: () => void;
}

export function GlowingBox({
  children,
  className,
  glowColor = 'cyan',
  intensity = 'medium',
  animated = false,
  onClick,
}: GlowingBoxProps) {
  const glowStyles = {
    cyan: {
      border: 'border-prometheus-cyan-500/30',
      shadow: {
        low: 'shadow-[0_0_10px_rgba(0,255,255,0.1)]',
        medium: 'shadow-[0_0_20px_rgba(0,255,255,0.2),0_0_40px_rgba(0,255,255,0.1)]',
        high: 'shadow-[0_0_30px_rgba(0,255,255,0.3),0_0_60px_rgba(0,255,255,0.2)]',
      },
      gradient: 'from-prometheus-cyan-500/20 via-prometheus-cyan-400/10 to-transparent',
    },
    flame: {
      border: 'border-prometheus-flame-500/30',
      shadow: {
        low: 'shadow-[0_0_10px_rgba(255,107,0,0.1)]',
        medium: 'shadow-[0_0_20px_rgba(255,107,0,0.2),0_0_40px_rgba(255,107,0,0.1)]',
        high: 'shadow-[0_0_30px_rgba(255,107,0,0.3),0_0_60px_rgba(255,107,0,0.2)]',
      },
      gradient: 'from-prometheus-flame-500/20 via-prometheus-flame-400/10 to-transparent',
    },
    purple: {
      border: 'border-purple-500/30',
      shadow: {
        low: 'shadow-[0_0_10px_rgba(147,51,234,0.1)]',
        medium: 'shadow-[0_0_20px_rgba(147,51,234,0.2),0_0_40px_rgba(147,51,234,0.1)]',
        high: 'shadow-[0_0_30px_rgba(147,51,234,0.3),0_0_60px_rgba(147,51,234,0.2)]',
      },
      gradient: 'from-purple-500/20 via-purple-400/10 to-transparent',
    },
  };

  const currentGlow = glowStyles[glowColor];

  return (
    <div
      className={clsx(
        'relative rounded-xl bg-prometheus-bg-card border',
        currentGlow.border,
        currentGlow.shadow[intensity],
        animated && 'animate-pulse-glow',
        onClick && 'cursor-pointer transition-all duration-300 hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      {/* Top gradient border effect */}
      <div
        className={clsx(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r',
          currentGlow.gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents */}
      <div
        className={clsx(
          'absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 rounded-tl-xl',
          glowColor === 'cyan' && 'border-prometheus-cyan-500/50',
          glowColor === 'flame' && 'border-prometheus-flame-500/50',
          glowColor === 'purple' && 'border-purple-500/50'
        )}
      />
      <div
        className={clsx(
          'absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 rounded-tr-xl',
          glowColor === 'cyan' && 'border-prometheus-cyan-500/50',
          glowColor === 'flame' && 'border-prometheus-flame-500/50',
          glowColor === 'purple' && 'border-purple-500/50'
        )}
      />
      <div
        className={clsx(
          'absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 rounded-bl-xl',
          glowColor === 'cyan' && 'border-prometheus-cyan-500/50',
          glowColor === 'flame' && 'border-prometheus-flame-500/50',
          glowColor === 'purple' && 'border-purple-500/50'
        )}
      />
      <div
        className={clsx(
          'absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 rounded-br-xl',
          glowColor === 'cyan' && 'border-prometheus-cyan-500/50',
          glowColor === 'flame' && 'border-prometheus-flame-500/50',
          glowColor === 'purple' && 'border-purple-500/50'
        )}
      />
    </div>
  );
}
