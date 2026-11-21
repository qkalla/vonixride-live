import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the same build works on GitHub Pages project paths and a
// custom domain root (vonixride.live).
export default defineConfig({
  base: './',
  plugins: [react()],
})
