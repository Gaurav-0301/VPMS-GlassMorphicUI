import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    chunkSizeWarningLimit: 1000, // optional (removes warning)

    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          react: ['react', 'react-dom'],

          // Router (if using)
          router: ['react-router-dom'],

          // Common libs (edit based on your project)
          vendor: ['axios']
        }
      }
    }
  }
})