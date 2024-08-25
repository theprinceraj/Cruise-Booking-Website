import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        // Add global CSS files here, these will be prepended to all components
        additionalData: `
          @import "./src/styles/Fix_Style.css";
          @import "./src/styles/React_Calendar_Style.css";
        `
      }
    }
  }
})
