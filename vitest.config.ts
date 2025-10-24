import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/core': '/src/core',
      '@/ui': '/src/ui',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/main.tsx', 'src/App.tsx', '**/models/**'],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'coverage',
      enabled: true,
    },
  },
});
