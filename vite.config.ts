import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import ViteImageOptimizer from 'vite-plugin-imagemin'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.vercel\.app\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'vercel-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'GrowthScale - Gestão de Escalas',
        short_name: 'GrowthScale',
        description: 'Sistema inteligente de gestão de escalas para restaurantes',
        theme_color: '#f59e0b',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    ViteImageOptimizer({
      gifsicle: {
        optimizationLevel: 3,
      },
      mozjpeg: {
        quality: 80,
        progressive: true,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeTitle: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      webp: {
        lossless: false,
        quality: 80,
      },
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
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
          // Charts separados (maior chunk)
          'charts': ['recharts'],
          // Icons separados
          'icons': ['lucide-react'],
          // Analytics separado
          'analytics': ['@tanstack/react-query'],
        }
      }
    },
    chunkSizeWarningLimit: 500,
    // Otimizações de performance
    assetsInlineLimit: 4096, // 4KB
    reportCompressedSize: true,
    // Configurações de compressão
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    // Otimizações de desenvolvimento
    hmr: {
      overlay: false,
    },
  },
  // Otimizações de preview
  preview: {
    port: 4173,
    host: true,
  },
  // Otimizações de CSS
  css: {
    devSourcemap: false,
  },
  // Otimizações de dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
    ],
    exclude: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  },
})
