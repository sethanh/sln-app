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
      '@my-monorepo/management/constants': path.resolve(__dirname, './src/Constants'),
      '@my-monorepo/management/contexts': path.resolve(__dirname, './src/Contexts'),
      '@my-monorepo/management/layouts': path.resolve(__dirname, './src/Layouts'),
      '@my-monorepo/management/routes': path.resolve(__dirname, './src/Routes'),
      '@my-monorepo/management/pages': path.resolve(__dirname, './src/Pages'),
    },
  },
})
