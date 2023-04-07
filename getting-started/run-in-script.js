import fs from "node:fs";
import { remote, Key } from "webdriverio";

const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: process.env.CI ? ["headless", "disable-gpu"] : [],
    },
  },
});

await browser.url("https://www.google.com/");

const username = await browser.$("input");
await username.setValue("Selenium Webdriver");
await browser.pause(2000);
await browser.saveScreenshot("./SeleniumWebdriver.png");
await browser.pause(10000);
await browser.deleteSession();

// fails if file was not created
fs.existsSync("./SeleniumWebdriver.png");
