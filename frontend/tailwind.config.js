/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', 'Inter', 'sans-serif'],
        display: ['"Libre Baskerville"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Libre Baskerville"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        orenda: {
          bg: '#f8f4ec',
          card: '#ffffff',
          dark: '#1c1917',
          body: '#292929',
          muted: '#666666',
          border: 'rgba(0, 0, 0, 0.08)',
          'border-dark': 'rgba(0, 0, 0, 0.15)',
          primary: '#4a1c00',
          'primary-hover': '#2e1100',
          surface: '#f2f3f7',
          accent: '#bd8e00',
        },
        cream: {
          50: '#FEFDFB',
          100: '#FBF8F3',
          200: '#F8F4EC',
          300: '#EDE6D8',
          400: '#E0D5C1',
          500: '#D4C8AE',
        },
        'warm-brown': {
          DEFAULT: '#4a1c00',
          50: '#FAF5F0',
          100: '#F3E8DE',
          200: '#E5CEBD',
          300: '#D4AF96',
          400: '#7E3606',
          500: '#4a1c00',
          600: '#3D1700',
          700: '#2F1100',
          800: '#200B00',
          900: '#120600',
        },
        'warm-gold': {
          DEFAULT: '#C4943A',
          light: '#E8C87A',
          dark: '#8B6A2A',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'zoom-in': 'zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}