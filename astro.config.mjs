// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    // plugins: [tailwindcss()]

  },
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["Inter", "sans-serif"],
    }]
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en']
  },

  adapter: vercel()
});