/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0a0a0a',
        surface2: '#111827',
        accent: '#06b6d4',
        'accent-dim': '#0891b2',
        border: '#1f2937',
        muted: '#4b5563',
        secondary: '#9ca3af',
        primary: '#f9fafb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
