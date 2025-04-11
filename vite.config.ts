import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5000,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'src/assets/images',
  plugins: [react()],
  base: '/EcoAlpha',
});
