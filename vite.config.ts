import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // Indique à Vite de générer des chemins relatifs
  plugins: [react()],
});