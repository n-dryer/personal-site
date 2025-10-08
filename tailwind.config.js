/** @type {import('tailwindcss').Config} */
// ESM-compatible export for Vite environment

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="aurora-dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--ff-display)', 'serif'],
        body: ['var(--ff-body)', 'sans-serif'],
        mono: ['var(--ff-mono)', 'monospace'],
        sans: ['var(--ff-body)', 'sans-serif'],
        instrument: ['var(--ff-display)', 'serif'],
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
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-electric': 'var(--accent-electric)',
        'accent-cosmic': 'var(--accent-cosmic)',
        'resume-overlay': 'var(--resume-overlay)',
        'resume-card': 'var(--resume-card)',
        'resume-card-border': 'var(--resume-card-border)',
        'resume-text-primary': 'var(--resume-text-primary)',
        'resume-text-secondary': 'var(--resume-text-secondary)',
        'resume-text-muted': 'var(--resume-text-muted)',
        'resume-text-subtle': 'var(--resume-text-subtle)',
        'resume-accent': 'var(--resume-accent)',
        'resume-accent-light': 'var(--resume-accent-light)',
        'resume-bullet': 'var(--resume-bullet)',
        'resume-ring': 'var(--resume-ring)',
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
  plugins: [require('@tailwindcss/container-queries')],
};
