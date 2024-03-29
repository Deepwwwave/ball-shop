import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[local]_[hash:base64:2]",
    }
  },
  build: {
    minify: 'terser', // Minimiser les fichiers JS
    sourcemap: false, // Désactiver la génération de sourcemap pour une meilleure performance
    // Autres options de configuration de build...
  },
})

