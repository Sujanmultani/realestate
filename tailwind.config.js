/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF9F6',
        surface: '#FFFFFF',
        sunken: '#F0EEE9',
        primary: '#1C1C1A',
        secondary: '#6B6862',
        tertiary: '#A19E97',
        accent: {
          DEFAULT: '#1F4D3C',
          hover: '#163B2D',
          subtle: '#E8EEE9',
        },
        semantic: {
          warning: '#B8752E',
          error: '#A83A32',
        },
        border: {
          DEFAULT: '#E5E3DD',
          strong: '#D1CEC5',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-ui)', 'Inter Tight', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(28, 28, 26, 0.04)',
        md: '0 4px 12px rgba(28, 28, 26, 0.06), 0 1px 2px rgba(28, 28, 26, 0.04)',
        lg: '0 12px 32px rgba(28, 28, 26, 0.10), 0 2px 6px rgba(28, 28, 26, 0.04)',
        hover: '0 16px 40px rgba(31, 77, 60, 0.12)',
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['22px', { lineHeight: '30px' }],
        '2xl': ['28px', { lineHeight: '36px' }],
        '3xl': ['40px', { lineHeight: '46px' }],
        '5xl': ['64px', { lineHeight: '68px' }],
      },
    },
  },
  plugins: [],
}
