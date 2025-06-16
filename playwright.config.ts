import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const ENVIRONMENTS = {
  local: 'http://localhost:3000',
  dev: 'https://dev.example.com',
  stage: 'https://stage.example.com',
};

const selectedEnv = process.env.TEST_ENV || 'local';
const baseURL = ENVIRONMENTS[selectedEnv] || ENVIRONMENTS.local;

export default defineConfig({
  testDir: './tests',
  globalSetup: './src/global-setup.ts',
  timeout: 10_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    actionTimeout: 0,
    trace: process.env.CI ? 'off' : 'on',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
