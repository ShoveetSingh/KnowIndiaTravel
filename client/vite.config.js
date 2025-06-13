import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import useDarkMode from 'use-dark-mode'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    global:{},
  }
})
