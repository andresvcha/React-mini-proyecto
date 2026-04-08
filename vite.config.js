import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const removeModuleType = {
  name: 'remove-module-type',
  transformIndexHtml(html) {
    return html
      .replace(/ type="module"/g, '')
      .replace(/ crossorigin/g, '')
      .replace(/<script src=/g, '<script defer src=')
  },
}

export default defineConfig({
  plugins: [react(), removeModuleType],
  base: './',
  build: {
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
