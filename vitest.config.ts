import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.*'],
    exclude: ['src/**/node_modules/**/*', 'src/**/*.snap.*'],
    setupFiles: ['config/setupTests.ts'],
  },
})
