/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        solar: {
          gold: '#FFD700',
          'gold-dark': '#E6C200',
          'gold-light': '#FFF0A0',
        },
        navy: {
          50: '#f0f4ff',
          100: '#dbe3ff',
          200: '#b5c5ff',
          300: '#8aa3ff',
          400: '#5f7fff',
          500: '#3b5bdb',
          600: '#2b44b0',
          700: '#1e3185',
          800: '#131f5a',
          900: '#0a1030',
          950: '#050818',
        },
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,215,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,215,0,0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,215,0,0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(255,215,0,0)' },
        },
      },
    },
  },
  plugins: [],
};