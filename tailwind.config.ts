import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    // Disable arbitrary value generation to enforce design system
    arbitraryValue: false,
  },
};

export default config;
