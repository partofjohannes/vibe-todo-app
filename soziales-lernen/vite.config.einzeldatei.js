import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build für eine einzelne, in sich geschlossene HTML-Datei.
// Kein ES-Modul (das blockiert der Browser bei file://), kein Nachladen von
// Dateien — alles landet inline, damit ein Doppelklick genügt.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-einzeldatei',
    cssCodeSplit: false,
    assetsInlineLimit: 100 * 1024 * 1024,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: 'app.[ext]',
      },
    },
  },
})
