import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/movies/',
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://jbanghw.com/mvplnr/api',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   },
})
