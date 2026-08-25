/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bless: {
          navy: {
            DEFAULT: '#0A1128',
            50: '#F0F4FC',
            100: '#D9E3F8',
            200: '#B3C8F2',
            300: '#80A3E8',
            400: '#4A7ADE',
            500: '#1E52BF',
            600: '#153E96',
            700: '#0E2A6B',
            800: '#0A1C48',
            900: '#071230',
            950: '#030818',
          },
          gold: {
            DEFAULT: '#CFA758',
            light: '#EAD397',
            dark: '#9A7730',
            50: '#FDFBF7',
            100: '#F9F4E8',
            200: '#F2E4C8',
            300: '#E8D09E',
            400: '#DCB86E',
            500: '#CFA758',
            600: '#B0883C',
            700: '#876529',
            800: '#5F461D',
            900: '#3A2A12',
          },
          laser: {
            blue: '#00D4FF',
            cyan: '#06B6D4',
            orange: '#FF6B00',
            glow: '#38BDF8',
          }
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(207, 167, 88, 0.4)',
        'laser-glow': '0 0 25px -5px rgba(0, 212, 255, 0.4)',
        'card-hover': '0 20px 35px -10px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA771C 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0A1128 0%, #050B1A 100%)',
        'laser-gradient': 'linear-gradient(135deg, #00D4FF 0%, #0055FF 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
