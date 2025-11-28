import { Flame, Settings, HelpCircle, Bell } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

export function Header() {
  return (
    <header className="relative border-b border-prometheus-border-primary bg-prometheus-bg-secondary/80 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-prometheus-cyan-500/50 to-transparent" />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prometheus-flame-500 to-prometheus-flame-600 flex items-center justify-center shadow-glow-flame">
                <Flame className="w-7 h-7 text-white" />
              </div>
              {/* Animated glow ring */}
              <div className="absolute inset-0 rounded-xl bg-prometheus-flame-500/30 blur-md animate-pulse-glow -z-10" />
            </div>

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-prometheus-text-secondary bg-clip-text text-transparent">
                Prometheus
              </h1>
              <p className="text-sm text-prometheus-text-muted">
                Course Generation System <span className="text-prometheus-cyan-400">v2.0</span>
              </p>
            </div>
          </div>

          {/* Center - System Status */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-prometheus-bg-tertiary border border-prometheus-border-primary">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-prometheus-text-secondary">System Online</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-prometheus-bg-tertiary border border-prometheus-border-primary">
              <div className="w-2 h-2 rounded-full bg-prometheus-cyan-500 animate-pulse" />
              <span className="text-sm text-prometheus-text-secondary">AI Ready</span>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg text-prometheus-text-muted hover:text-prometheus-cyan-400 hover:bg-prometheus-bg-tertiary transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              className="p-2 rounded-lg text-prometheus-text-muted hover:text-prometheus-cyan-400 hover:bg-prometheus-bg-tertiary transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            <button
              className="p-2 rounded-lg text-prometheus-text-muted hover:text-prometheus-cyan-400 hover:bg-prometheus-bg-tertiary transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <NeonButton variant="cyan" size="sm">
              New Course
            </NeonButton>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-prometheus-cyan-500/30 to-transparent" />
    </header>
  );
}
