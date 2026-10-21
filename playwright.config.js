const { defineConfig, devices } = require("@playwright/test");
const { defaultBrowserType, ...iphone } = devices["iPhone 13"];

module.exports = defineConfig({
  testDir: "tests",
  timeout: 60_000,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { browserName: "chromium", locale: "fr-FR", timezoneId: "Europe/Paris", launchOptions: { args: ["--autoplay-policy=no-user-gesture-required"] } },
  projects: [
    { name: "iphone", use: { ...iphone } },
    { name: "ordinateur", use: { viewport: { width: 1440, height: 900 } } },
  ],
});
