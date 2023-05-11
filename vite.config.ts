import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  test: {
    globals: true,
    env: {
      JWT_TOKEN_KEY: 'hello'
    },
  },
  plugins: [
    // Vite plugin
    swc.vite({
      tsconfigFile: './tsconfig.json'
    })
  ]
})