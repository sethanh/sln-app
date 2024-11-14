import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@my-monorepo/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@my-monorepo/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@my-monorepo/payflash': path.resolve(__dirname, './src'),
    },
  },
})
