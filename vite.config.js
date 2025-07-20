import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react({
        // Enable React Fast Refresh
        fastRefresh: true,
        // Include .js files for React JSX
        include: "**/*.{jsx,tsx,js,ts}",
      })
    ],
    
    // Development server configuration
    server: {
      port: 3001, // Use 3001 since 3000 is taken by Rails
      host: true, // Allow external connections (for Docker)
      hmr: {
        port: 3001,
      },
      watch: {
        usePolling: true, // Better for Docker/WSL
      }
    },

    // Preview server configuration  
    preview: {
      port: 3001,
      host: true,
    },

    // Path resolution
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@hooks': resolve(__dirname, 'src/hooks'),
      },
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            webVitals: ['web-vitals'],
          },
        },
      },
      // Optimize chunk size warnings
      chunkSizeWarningLimit: 1000,
    },

    // Environment variables - only pass VITE_ prefixed vars
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '2.0.0'),
    },

    // Vitest configuration
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
        ],
      },
    },

    // CSS configuration
    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCase',
      },
    },

    // Optimization
    optimizeDeps: {
      include: ['react', 'react-dom', 'web-vitals'],
      exclude: [],
    },

    // ESBuild configuration for JSX transform
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
  }
}) 
