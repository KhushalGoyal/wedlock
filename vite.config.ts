import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // Media lives in public/media and is served from the site root as /media/*
    assetsInlineLimit: 4096,
  },
});
