import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '768px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        'main-background': '#F9F1F9',
        'main-orange': '#FE8D13',
        'main-light-violet': '#BD7DC1',
        'main-dark-violet': '#6F1490',
        'main-text': '#440E62',
      },
    },
  },
  plugins: [],
};
export default config;
