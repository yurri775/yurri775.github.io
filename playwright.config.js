const { defineConfig, devices } = require("@playwright/test");
const { defaultBrowserType, ...iphone } = devices["iPhone 13"];

module.exports = defineConfig({
  testDir: "tests",
  timeout: process.env.CI ? 120_000 : 60_000,
  // le rendu 3D se fait sans carte graphique (logiciel) : peu de navigateurs à la fois, attentes plus longues
  workers: 1,
  expect: { timeout: process.env.CI ? 20_000 : 10_000 },
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  webServer: { command: "node scripts/serve.js", port: 4174, env: { PORT: "4174" }, reuseExistingServer: !process.env.CI },
  use: { baseURL: "http://localhost:4174", browserName: "chromium", locale: "fr-FR", timezoneId: "Europe/Paris", launchOptions: { args: ["--autoplay-policy=no-user-gesture-required", "--use-gl=angle", "--ignore-gpu-blocklist"] } },
  projects: [
    { name: "iphone", use: { ...iphone } },
    { name: "ordinateur", use: { viewport: { width: 1440, height: 900 } } },
  ],
});
