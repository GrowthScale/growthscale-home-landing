import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // React sempre primeiro
          'react-vendor': ['react', 'react-dom'],
          // Router separado
          'router': ['react-router-dom'],
          // Supabase separado
          'supabase': ['@supabase/supabase-js'],
          // UI components separados
          'ui-core': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'ui-forms': ['@radix-ui/react-checkbox', '@radix-ui/react-radio-group', '@radix-ui/react-switch'],
          'ui-layout': ['@radix-ui/react-accordion', '@radix-ui/react-collapsible', '@radix-ui/react-separator'],
          // Utilitários separados
          'utils': ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority'],
          // Formulários separados
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Charts separados
          'charts': ['recharts'],
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  server: {
    port: 3000,
    host: true
  }
})
