import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        'service-worker': resolve(__dirname, 'src/background/service-worker.ts'),
        'gmail-injector': resolve(__dirname, 'src/content/gmail-injector.ts'),
        'sidebar': resolve(__dirname, 'src/sidebar/index.tsx')
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
});
