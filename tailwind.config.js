/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',
        clay: 'rgb(var(--c-clay) / <alpha-value>)',
        charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        champagne: 'rgb(var(--c-champagne) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        rose: 'rgb(var(--c-rose) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.28em',
        wide2: '0.14em',
      },
      maxWidth: {
        content: '1280px',
        prose2: '68ch',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.0) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.12) translate3d(0,-1.5%,0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        kenburns: 'kenburns 12s ease-out forwards',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};
