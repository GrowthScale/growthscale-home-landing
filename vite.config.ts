import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React e ReactDOM DEVEM ficar juntos
          'react-vendor': ['react', 'react-dom'],
          
          // UI Components
          'ui-components': ['@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'lucide-react'],
          
          // Charts
          'charts': ['chart.js', 'react-chartjs-2', 'recharts'],
          
          // Forms
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Utilitários
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          
          // Supabase
          'supabase': ['@supabase/supabase-js'],
          
          // Estado
          'state': ['zustand', 'immer'],
          
          // Router
          'router': ['react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'zustand',
      'immer'
    ]
  }
}));
