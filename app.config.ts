import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    port: 3000,
  },
  vite: {
    server: {
      port: 3000,
      strictPort: true,
    },
  },
})
