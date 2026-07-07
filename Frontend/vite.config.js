import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React Fast Refresh + JSX transform
    react(),
    // Tailwind CSS v4 — native Vite plugin (no PostCSS config needed)
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Allow clean imports: '@/components/...' instead of '../../components/...'
      '@': resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 5173,
    strictPort: false,
    open: false,
    // Proxy API requests to the Express backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    port: 4173,
    strictPort: false,
  },

  build: {
    // Generate source maps for production error tracking
    sourcemap: false,
    // Target modern browsers with ES2020 support
    target: 'es2020',
    rollupOptions: {
      output: {
        // Code-split vendor libs for better caching
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
