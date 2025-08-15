/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
// ESM-compatible export for Vite environment

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: ['class', '[data-theme="graphite-dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--ff-display)', 'system-ui', 'sans-serif'],
        body: ['var(--ff-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight: 'var(--tracking-tight)',
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        DEFAULT: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },
      boxShadow: {
        sm: 'var(--e-sm)',
        md: 'var(--e-md)',
        lg: 'var(--e-lg)',
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'accent': 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-5': 'var(--space-5)',
        'space-6': 'var(--space-6)',
        'space-8': 'var(--space-8)',
        'space-12': 'var(--space-12)',
        'space-24': 'var(--space-24)',
        'space-component': 'var(--space-component)',
        'space-section': 'var(--space-section)',
      },
      transitionDuration: {
        DEFAULT: 'var(--motion-duration)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--motion-easing)',
      },
    },
  },
  plugins: [],
}
