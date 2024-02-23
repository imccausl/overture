import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['packages/**/*/*.test.*'],
        exclude: ['node_modules/**/*', 'packages/**/*/*.snap.*'],
        setupFiles: ['config/setupTests.ts'],
    },
})
