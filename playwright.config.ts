import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "https://www.airalo.com",
    headless: true,
    screenshot: "on",
    trace: "retain-on-failure",
    video: "on",
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
