import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // NOTE: If deploying as a project page (https://<user>.github.io/personal-site/),
  // set base to '/personal-site/'. For custom domain or user site, use '/'.
  // base: '/personal-site/',
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 4000,
    open: true,
  },
  preview: {
    port: 4000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
});
