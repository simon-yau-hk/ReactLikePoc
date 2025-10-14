import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // you can change this to any port number you want
    host: '0.0.0.0', // you can change this to any host you want
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
