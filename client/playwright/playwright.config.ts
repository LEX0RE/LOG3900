import { defineConfig } from '@playwright/test';

// Voir https://playwright.dev/docs/test-configuration.
export default defineConfig({
    testDir: './tests',
    timeout: 120000,
    expect: {
        timeout: 30000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 1,
    workers: process.env.CI ? 4 : 2,
    reporter: [['list'], ['junit', { outputFile: './test-results/results.xml' }]],
    outputDir: './test-results',
    use: {
        actionTimeout: 30000,
    },
    webServer: [
        {
            command: 'npm start --prefix ../../server',
            port: 3000,
            timeout: 120 * 1000,
            reuseExistingServer: true,
        },
    ],
});
