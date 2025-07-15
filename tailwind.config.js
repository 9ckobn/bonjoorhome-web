/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'modal-enter': 'modalEnter 0.3s ease-out',
        'modal-exit': 'modalExit 0.3s ease-in',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-out-right': 'slideOutRight 0.4s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        modalEnter: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.9) translateY(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1) translateY(0)' 
          },
        },
        modalExit: {
          '0%': { 
            opacity: '1', 
            transform: 'scale(1) translateY(0)' 
          },
          '100%': { 
            opacity: '0', 
            transform: 'scale(0.9) translateY(-20px)' 
          },
        },
        slideInRight: {
          '0%': { 
            transform: 'translateX(100%)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
        },
        slideOutRight: {
          '0%': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateX(100%)', 
            opacity: '0' 
          },
        },
      },
    },
  },
  plugins: [],
}
