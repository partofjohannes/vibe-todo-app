import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Auf GitHub Pages liegt die App unter /vibe-todo-app/, lokal unter /.
  // Der Workflow setzt VITE_BASE, sonst bleibt es beim Standard.
  base: process.env.VITE_BASE || '/',
})
