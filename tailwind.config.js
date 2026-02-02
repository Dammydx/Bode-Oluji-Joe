/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lilac: {
          50: '#f7f0f7',
          100: '#efe1ef',
          200: '#e0c4e0',
          300: '#d4b3d4',
          400: '#c8a2c8', // Main
          500: '#b38fb3',
          600: '#9c7c9c',
          700: '#856785',
          800: '#6d536d',
          900: '#564056',
        },
        plum: {
          50: '#f9f0f5',
          100: '#f2e1ec',
          200: '#e4c2d9',
          300: '#d3a3c4',
          400: '#c084ae',
          500: '#a65c91',
          600: '#883e73',
          700: '#6c2a59',
          800: '#581f46',
          900: '#580f41', // Accent
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s ease-in-out infinite',
        wave: 'wave 3s ease-in-out infinite',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};