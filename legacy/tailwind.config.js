import { defineConfig } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'zarion-dark': '#0f0f0f',
        'zarion-surface': '#181818',
        'zarion-surface-hover': '#222222',
        'zarion-border': '#333333',
        'zarion-border-light': '#555555',
        'zarion-accent': '#3b82f6',
        'zarion-accent-hover': '#2563eb',
        'zarion-gold': '#d4af37',
        'zarion-gray': '#888888',
        'zarion-gray-400': '#a3a3a3',
        'zarion-purple': '#a855f7',
        'zarion-blue': '#3b82f6',
        'zarion-green': '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
