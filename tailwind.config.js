/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          leaf: {
            50: '#F2F8F4',
            100: '#E2F0E7',
            200: '#C3E0CE',
            300: '#9BCCAC',
            400: '#6FAf85',
            500: '#4A8F64', // primary leaf green
            600: '#3A7450',
            700: '#2F5C40',
            800: '#274B35',
            900: '#1F3C2B',
          },
          blush: {
            50: '#FCF5F4',
            100: '#FAECE9',
            200: '#F6D9D3',
            300: '#EEC0B7',
            400: '#E4A094',
            500: '#D87F71', // gentle blush pink
            600: '#C26253',
            700: '#A14D40',
            800: '#844237',
            900: '#6D3930',
          },
          sage: {
            50: '#F6F8F5',
            100: '#ECF0EA',
            200: '#DAE2D6',
            300: '#C1CDBD',
            400: '#A4B49E',
            500: '#879A81', // muted olive/sage
            600: '#6C7E67',
            700: '#566452',
            800: '#465143',
            900: '#3A4337',
          },
          warm: {
            white: '#FAF9F6', // soothing warm white
            cream: '#F5F3EF',
            sand: '#ECE8DF',
            stone: '#DFDACF',
          },
          charcoal: {
            DEFAULT: '#222923',
            light: '#3C453E',
            muted: '#626E65',
          },
          ivory: '#FAF9F4',
          botanical: {
            DEFAULT: '#91B978',
            hover: '#7EAA64',
            dark: '#6F9856',
          },
          forest: {
            DEFAULT: '#43583C',
            light: '#536D4B',
          },
          softPink: '#E7B8B9',
        },
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Playfair Display',
          'Georgia',
          'serif',
        ],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 2px 12px -2px rgba(47, 92, 64, 0.06)',
        'soft': '0 8px 30px -6px rgba(47, 92, 64, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 12px 35px -8px rgba(34, 41, 35, 0.07)',
        'float': '0 20px 45px -12px rgba(74, 143, 100, 0.15)',
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
