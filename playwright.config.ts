import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory and file patterns
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  // Retry configuration for flaky tests
  retries: process.env.CI ? 2 : 1,

  // Parallelization settings
  workers: process.env.CI ? 1 : undefined,

  // Test isolation and cleanup
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Dev server configuration
  webServer: {
    command: 'yarn start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    cwd: '.',
    timeout: 120 * 1000, // 2 minutes for server startup
  },

  // Global setup
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    // Increase action timeout for slow animations
    actionTimeout: 10000,
    // Wait for network to be idle before proceeding
    navigationTimeout: 30000,
  },

  // Test timeout - increased for complex visual tests
  timeout: 60000,
  expect: {
    // Increase assertion timeout for visual elements
    timeout: 10000,
  },

  // Single desktop project for faster smoke runs
  projects: [
    {
      name: 'Desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],

  // Enhanced test reporter with better error reporting
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    // Add JSON reporter for CI integration
    ...(process.env.CI ? [(['json', { outputFile: 'test-results/results.json' }] as const)] : []),
  ],

  // Folder for test artifacts like screenshots, videos, traces
  outputDir: 'test-results/',
});
