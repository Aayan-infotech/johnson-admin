import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable HMR overlay for errors
    },
  },
  build: {
    rollupOptions: {
      external: ['lucide-react'], // If you want to externalize `lucide-react`
    },
  },
  resolve: {
    alias: {
      // Add alias to fix potential import resolution issues
      '@lucide/react': 'lucide-react',
    },
  },
})
