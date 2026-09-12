import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // allow the sandbox preview host (*.e2b.app)
    allowedHosts: ['.e2b.app'],
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
