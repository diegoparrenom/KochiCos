import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import macrosPlugin from "vite-plugin-babel-macros"

// yarn add vite-plugin-node-polyfills

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    nodePolyfills({
      protocolImports: true,
    }), macrosPlugin()],
  define: {
    'process.env': {}
  }
})
