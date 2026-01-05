import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro({
      preset: 'vercel',
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only apply manual chunks for client-side code
          if (id.includes('node_modules')) {
            // Three.js and related 3D libraries
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three'
            }
            // Motion libraries
            if (id.includes('framer-motion')) {
              return 'motion'
            }
            // React Router (only if not external)
            if (id.includes('@tanstack/react-router') && !id.includes('node_modules/@tanstack/start')) {
              return 'router'
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'forms'
            }
          }
        },
      },
    },
    // Increase chunk size warning limit (500kb -> 1000kb)
    chunkSizeWarningLimit: 1000,
  },
})

export default config
