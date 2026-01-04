import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        secondversion: resolve(__dirname, 'secondversion/index.html')
      }
    }
  }
})