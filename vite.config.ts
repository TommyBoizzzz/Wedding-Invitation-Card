import 'dotenv/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {localApiPlugin} from './server/local-api.js';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN', 'ADMIN_PIN', 'ADMIN_SESSION_SECRET']) {
    if (!process.env[key] && env[key]) {
      process.env[key] = env[key];
    }
  }

  return {
    plugins: [localApiPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
