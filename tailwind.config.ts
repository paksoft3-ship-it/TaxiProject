import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f2cc0d',
          dark: '#dcb700',
          light: '#fef3c2',
        },
        secondary: {
          DEFAULT: '#0f172a',
          blue: '#0f4c81',
          light: '#1e3a8a',
        },
        background: {
          light: '#f8f8f5',
          dark: '#221f10',
        },
        surface: {
          grey: '#f8f9fa',
        },
        sidebar: {
          bg: '#0f172a',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
