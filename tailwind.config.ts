import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      height: {
        '164': '38rem',
      },
      rotate: {
        '36': '36deg',
      },

      colors: {
        blue: {
          light: '#007bff', // Light mode accent color
          dark: '#0d6efd', // Dark mode accent color
        },
        card: {
          light: "#FFFFFF",
          dark: "#242424",
        },
        edge: {
          light: "#F3F3F3",
          dark: "#323232"
        },
        accent: {
          light: '#007bff', 
          dark: '#829ab1', 
        }
      }
    },
  },
  plugins: [],
}
export default config
