import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      // Build multiple HTML entry points so pages like `music.html`
      // are present in `dist/` (and their referenced images are bundled).
      input: {
        index: resolve(__dirname, 'index.html'),
        music: resolve(__dirname, 'music.html'),
      },
    },
  },
})

