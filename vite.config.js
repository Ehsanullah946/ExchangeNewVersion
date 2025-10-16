// vite.config.js - Add this only when you need to analyze
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      // Only use this when analyzing
      filename: 'dist/stats.html',
      open: process.env.ANALYZE === 'true', // Only open when ANALYZE=true
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
