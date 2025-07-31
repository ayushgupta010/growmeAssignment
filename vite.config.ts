import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL || 'https://api.artic.edu/api/v1/artworks'),
      VITE_APP_TITLE: JSON.stringify(process.env.VITE_APP_TITLE || 'Art Gallery')
    }
  }
}) 