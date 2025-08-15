import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-accordion', '@radix-ui/react-select'],
          'charts': ['recharts'],
          'forms': ['react-hook-form', '@hookform/resolvers'],
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          'supabase': ['@supabase/supabase-js'],
          'query': ['@tanstack/react-query']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));
