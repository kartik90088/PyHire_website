import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // The contact form posts to /api/contact, which in production nginx
      // proxies to pyhire-site-api on 127.0.0.1:8060. Mirror that here so the
      // form can be exercised in dev — run `cd server && npm start` alongside.
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8060',
          changeOrigin: true,
        },
      },
    },
  };
});
