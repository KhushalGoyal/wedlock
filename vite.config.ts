import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// The site is published to GitHub Pages at https://<user>.github.io/wedlock/,
// so it is served from the "/wedlock/" sub-path. We use this base consistently
// across dev, preview and build so paths (and the media under <base>/media/*)
// resolve identically everywhere. If you deploy to a different path or a custom
// domain at the root, change `base` to '/'.
export default defineConfig({
  base: '/wedlock/',
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
  },
});
