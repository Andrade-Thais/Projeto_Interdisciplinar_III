import {ViteImageOptimizer} from 'vite-plugin-image-optimizer'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    ViteImageOptimizer({
      cache: true,
      cacheLocation: '/public/optimized/photos'
    })
  ],

})
