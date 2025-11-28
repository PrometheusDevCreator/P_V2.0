/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Prometheus custom dark theme colors
        prometheus: {
          bg: {
            primary: '#0a0a0f',
            secondary: '#12121a',
            tertiary: '#1a1a25',
            card: '#151520',
          },
          cyan: {
            50: '#e0fffe',
            100: '#b3fffc',
            200: '#80fff9',
            300: '#4dfff6',
            400: '#1afff3',
            500: '#00e6d9',
            600: '#00b3a8',
            700: '#008077',
            800: '#004d47',
            900: '#001a17',
            glow: '#00ffff',
          },
          flame: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            glow: '#ff6b00',
          },
          text: {
            primary: '#ffffff',
            secondary: '#a0aec0',
            muted: '#718096',
          },
          border: {
            primary: '#2d3748',
            glow: '#00ffff',
          }
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
        'glow-cyan-strong': '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.2)',
        'glow-flame': '0 0 20px rgba(255, 107, 0, 0.3), 0 0 40px rgba(255, 107, 0, 0.1)',
        'glow-flame-strong': '0 0 30px rgba(255, 107, 0, 0.5), 0 0 60px rgba(255, 107, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyan': 'linear-gradient(135deg, #00ffff 0%, #0099cc 100%)',
        'gradient-flame': 'linear-gradient(135deg, #ff6b00 0%, #ff0066 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'flame-flicker': 'flame-flicker 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 255, 255, 0.5)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'flame-flicker': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
