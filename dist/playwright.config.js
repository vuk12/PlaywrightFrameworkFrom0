"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = {
    testDir: './tests',
    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000
    },
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['list'],
        ['html', { outputFolder: 'test-results/html-report',
                open: "on-failure" }],
        ['allure-playwright'],
    ],
    /*testMatch: [         //FOR LOCAL EXECUTION (ONE FILE)
      "/tests/smoke/loginPage.spec.js",
      ],*?
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 10000,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        channel: "chrome",
        video: 'on-first-retry'
        //The maximum number of retry attempts per test.
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            /* Project-specific settings. */
            use: Object.assign({}, test_1.devices['Desktop Chrome']),
        },
        /*
        {
          name: 'firefox',
          use: {
            ...devices['Desktop Firefox'],
          },
        },*/
        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },
        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
    ],
    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',
    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};
exports.default = config;
//# sourceMappingURL=playwright.config.js.map