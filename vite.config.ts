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
        manualChunks: (id) => {
          // React e dependências core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          
          // UI Components
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-components';
          }
          
          // Charts e visualização
          if (id.includes('recharts') || id.includes('chart')) {
            return 'charts';
          }
          
          // Forms e validação
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }
          
          // Utilitários
          if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
            return 'utils';
          }
          
          // Supabase e backend
          if (id.includes('@supabase') || id.includes('supabase')) {
            return 'supabase';
          }
          
          // Estado global
          if (id.includes('zustand') || id.includes('immer')) {
            return 'state';
          }
          
          // Páginas por categoria
          if (id.includes('/pages/Dashboard') || id.includes('/pages/Schedules')) {
            return 'dashboard-pages';
          }
          
          if (id.includes('/pages/Employees') || id.includes('/pages/Companies')) {
            return 'management-pages';
          }
          
          if (id.includes('/pages/Settings') || id.includes('/pages/Profile')) {
            return 'settings-pages';
          }
          
          // Componentes por categoria
          if (id.includes('/components/dashboard/')) {
            return 'dashboard-components';
          }
          
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          
          // Se não se encaixar em nenhuma categoria, vai para vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
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
